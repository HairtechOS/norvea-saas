#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Chemins
const prismaSchema = path.resolve(__dirname, '../backend/prisma/schema.prisma');
const routesDir = path.resolve(__dirname, '../backend/src/routes');
const componentsDir = path.resolve(__dirname, '../frontend/src/components');
const conventionsFile = path.resolve(__dirname, '../CONVENTIONS.md');
const tokensFile = path.resolve(__dirname, '../frontend/src/styles/tokens.css');

// 1. Vérifier que chaque modèle Prisma est dans CONVENTIONS.md
function getPrismaModels() {
  const schema = fs.readFileSync(prismaSchema, 'utf-8');
  return [...schema.matchAll(/^model (\w+) /gm)].map(m => m[1]);
}

// 2. Vérifier que chaque route REST est dans CONVENTIONS.md
function getRouteFiles() {
  if (!fs.existsSync(routesDir)) return [];
  return fs.readdirSync(routesDir).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
}

// 3. Vérifier que chaque composant React est dans CONVENTIONS.md
function getComponentFiles() {
  if (!fs.existsSync(componentsDir)) return [];
  return fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'));
}

// 4. Vérifier que chaque composant frontend n'utilise que des tokens design
function checkComponentTokens() {
  const tokens = fs.readFileSync(tokensFile, 'utf-8');
  const tokenVars = [...tokens.matchAll(/--([\w-]+):/g)].map(m => m[1]);
  const errors = [];
  getComponentFiles().forEach(file => {
    const content = fs.readFileSync(path.join(componentsDir, file), 'utf-8');
    const colorRegex = /#[0-9a-fA-F]{3,6}|rgb\(|hsl\(|var\(--([\w-]+)\)/g;
    let match;
    while ((match = colorRegex.exec(content))) {
      if (match[0].startsWith('var(')) {
        if (!tokenVars.includes(match[1])) {
          errors.push(`${file} utilise un token CSS inconnu : --${match[1]}`);
        }
      } else {
        errors.push(`${file} utilise une couleur interdite : ${match[0]}`);
      }
    }
  });
  return errors;
}

// 5. Vérifier la présence dans CONVENTIONS.md
function checkInConventions(section, items) {
  const content = fs.readFileSync(conventionsFile, 'utf-8');
  return items.filter(item => !content.includes(item));
}

// Exécution
let errors = [];

const prismaModels = getPrismaModels();
const missingModels = checkInConventions('Modèles Prisma', prismaModels);
if (missingModels.length) errors.push('Modèles Prisma manquants dans CONVENTIONS.md : ' + missingModels.join(', '));

const routeFiles = getRouteFiles().map(f => f.replace(/\.(js|ts)$/, ''));
const missingRoutes = checkInConventions('Routes REST', routeFiles);
if (missingRoutes.length) errors.push('Routes REST manquantes dans CONVENTIONS.md : ' + missingRoutes.join(', '));

const componentFiles = getComponentFiles().map(f => f.replace(/\.tsx$/, ''));
const missingComponents = checkInConventions('Composants React', componentFiles);
if (missingComponents.length) errors.push('Composants React manquants dans CONVENTIONS.md : ' + missingComponents.join(', '));

const tokenErrors = checkComponentTokens();
if (tokenErrors.length) errors = errors.concat(tokenErrors);

if (errors.length) {
  console.error('❌ Vérification conventions/design system échouée :\n' + errors.join('\n'));
  process.exit(1);
} else {
  console.log('✅ Toutes les conventions et le design system sont respectés.');
} 