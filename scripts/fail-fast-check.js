#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// FRONTEND : chaque composant React doit avoir une story
const componentsDir = path.resolve(__dirname, '../frontend/src/components');
const stories = fs.readdirSync(componentsDir).filter(f => f.endsWith('.stories.tsx'));
const components = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'));
const missingStories = components.filter(c => !stories.includes(c.replace('.tsx', '.stories.tsx')));

// BACKEND : chaque route doit avoir un test unitaire associé
const routesDir = path.resolve(__dirname, '../backend/src/routes');
const testsDir = path.resolve(__dirname, '../backend/tests');
const routeFiles = fs.existsSync(routesDir) ? fs.readdirSync(routesDir).filter(f => f.endsWith('.js') || f.endsWith('.ts')) : [];
const testFiles = fs.existsSync(testsDir) ? fs.readdirSync(testsDir) : [];
const missingTests = routeFiles.filter(r => !testFiles.some(t => t.includes(r.replace(/\.(js|ts)$/, ''))));

let errors = [];
if (missingStories.length) errors.push('Composants sans story : ' + missingStories.join(', '));
if (missingTests.length) errors.push('Routes backend sans test : ' + missingTests.join(', '));

if (errors.length) {
  console.error('❌ Fail Fast :\n' + errors.join('\n'));
  process.exit(1);
} else {
  console.log('✅ Tous les composants ont une story et toutes les routes ont un test.');
} 