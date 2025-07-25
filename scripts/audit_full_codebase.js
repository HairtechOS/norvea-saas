#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const conventionsFile = path.join(root, 'CONVENTIONS.md');
const designSystemFile = path.join(root, 'design-system-norvea.md');
const envFiles = [path.join(root, 'backend/.env.example'), path.join(root, 'frontend/.env.example')];

function readAllFiles(dir, ext) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(readAllFiles(filePath, ext));
    } else if (!ext || file.endsWith(ext)) {
      results.push(filePath);
    }
  });
  return results;
}

function checkNamingConventions() {
  const content = fs.readFileSync(conventionsFile, 'utf-8');
  let errors = [];
  // Vérifie que chaque modèle, route, composant listé existe réellement
  const modelMatches = [...content.matchAll(/model (\w+)/g)].map(m => m[1]);
  modelMatches.forEach(model => {
    const found = fs.existsSync(path.join(root, 'backend/prisma/schema.prisma')) &&
      fs.readFileSync(path.join(root, 'backend/prisma/schema.prisma'), 'utf-8').includes(`model ${model} `);
    if (!found) errors.push(`Modèle manquant dans schema.prisma : ${model}`);
  });
  // Vérifie les routes backend
  const routeDir = path.join(root, 'backend/src/routes');
  if (fs.existsSync(routeDir)) {
    const routeFiles = fs.readdirSync(routeDir).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
    routeFiles.forEach(f => {
      if (!content.includes(f.replace(/\.(ts|js)$/, ''))) {
        errors.push(`Route ${f} non référencée dans CONVENTIONS.md`);
      }
    });
  }
  // Vérifie les composants frontend
  const compDir = path.join(root, 'frontend/src/components');
  if (fs.existsSync(compDir)) {
    const compFiles = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'));
    compFiles.forEach(f => {
      if (!content.includes(f.replace(/\.tsx$/, ''))) {
        errors.push(`Composant ${f} non référencé dans CONVENTIONS.md`);
      }
    });
  }
  return errors;
}

function checkTestsAndStories() {
  let errors = [];
  // Pour chaque composant, vérifier test et story
  const compDir = path.join(root, 'frontend/src/components');
  if (fs.existsSync(compDir)) {
    const compFiles = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'));
    compFiles.forEach(f => {
      const base = f.replace(/\.tsx$/, '');
      if (!fs.existsSync(path.join(compDir, '__tests__', `${base}.test.tsx`))) {
        errors.push(`Test manquant pour composant : ${f}`);
      }
      if (!fs.existsSync(path.join(compDir, `${base}.stories.tsx`))) {
        errors.push(`Storybook manquant pour composant : ${f}`);
      }
    });
  }
  // Pour chaque route backend, vérifier test
  const routeDir = path.join(root, 'backend/src/routes');
  const testDir = path.join(root, 'backend/tests');
  if (fs.existsSync(routeDir) && fs.existsSync(testDir)) {
    const routeFiles = fs.readdirSync(routeDir).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
    routeFiles.forEach(f => {
      const base = f.replace(/\.(ts|js)$/, '');
      const hasTest = fs.readdirSync(testDir).some(t => t.includes(base));
      if (!hasTest) errors.push(`Test manquant pour route backend : ${f}`);
    });
  }
  return errors;
}

function checkEnvVariables() {
  let errors = [];
  // Vérifie que les variables sensibles ne sont pas en dur dans le code
  const sensitive = ['JWT_SECRET', 'REFRESH_SECRET', 'SENTRY_DSN', 'REDIS_URL', 'DATABASE_URL', 'LAUNCHDARKLY_SDK_KEY'];
  const files = readAllFiles(path.join(root, 'backend/src'), '.ts').concat(readAllFiles(path.join(root, 'frontend/src'), '.ts'));
  files.forEach(f => {
    const content = fs.readFileSync(f, 'utf-8');
    sensitive.forEach(v => {
      if (content.includes(`'${v}'`) || content.includes(`"${v}"`)) {
        errors.push(`Variable sensible potentiellement en dur dans ${f} : ${v}`);
      }
    });
  });
  // Vérifie la présence dans .env.example
  envFiles.forEach(envFile => {
    if (fs.existsSync(envFile)) {
      const envContent = fs.readFileSync(envFile, 'utf-8');
      sensitive.forEach(v => {
        if (!envContent.includes(v)) {
          errors.push(`Variable ${v} manquante dans ${envFile}`);
        }
      });
    }
  });
  return errors;
}

function checkDesignSystemRespect() {
  let errors = [];
  // Vérifie que les tokens design sont utilisés dans les composants (pas de couleur en dur)
  const compDir = path.join(root, 'frontend/src/components');
  if (fs.existsSync(compDir)) {
    const compFiles = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx'));
    compFiles.forEach(f => {
      const content = fs.readFileSync(path.join(compDir, f), 'utf-8');
      if (/#([0-9a-fA-F]{3,6})/.test(content)) {
        errors.push(`Couleur en dur détectée dans ${f}`);
      }
    });
  }
  return errors;
}

function checkDocsAndGovernance() {
  let errors = [];
  const mustHave = ['README.md', 'CONVENTIONS.md', 'CONTRIBUTING.md', 'ONBOARDING.md', 'GOUVERNANCE.md', 'design-system-norvea.md'];
  mustHave.forEach(f => {
    if (!fs.existsSync(path.join(root, f))) {
      errors.push(`Fichier documentation manquant : ${f}`);
    }
  });
  return errors;
}

function main() {
  let report = [];
  report.push('---\nAUDIT DE COHERENCE NORVEA SAAS\n---');
  report.push('1. Cohérence des noms et conventions :');
  report = report.concat(checkNamingConventions());
  report.push('\n2. Présence des tests, stories, docs :');
  report = report.concat(checkTestsAndStories());
  report.push('\n3. Variables sensibles et .env :');
  report = report.concat(checkEnvVariables());
  report.push('\n4. Respect du design system :');
  report = report.concat(checkDesignSystemRespect());
  report.push('\n5. Documentation et gouvernance :');
  report = report.concat(checkDocsAndGovernance());
  report.push('\n---\nFin de l’audit.');
  const output = report.join('\n');
  console.log(output);
  fs.writeFileSync(path.join(root, 'audit_report.md'), output);
}

main(); 