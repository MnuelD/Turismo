// Script para verificar estrutura
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando estrutura do projeto...\n');

const requiredPaths = [
  'site/index.html',
  'admin/index.html',
  'assets/',
  'netlify.toml',
  'package.json',
  '.github/workflows/deploy.yml'
];

let allOk = true;

requiredPaths.forEach(filePath => {
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${filePath}`);
  
  if (!exists) {
    allOk = false;
    if (filePath.includes('/')) {
      console.log(`   Criando: ${filePath}`);
      if (filePath.endsWith('/')) {
        fs.mkdirSync(filePath, { recursive: true });
      } else {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, '');
      }
    }
  }
});

// Verificar links em HTML
console.log('\n📄 Verificando arquivos HTML...');
['site/index.html', 'admin/index.html'].forEach(htmlFile => {
  if (fs.existsSync(htmlFile)) {
    const content = fs.readFileSync(htmlFile, 'utf8');
    const hasAssets = content.includes('assets/');
    console.log(`${htmlFile}: ${hasAssets ? '✅' : '⚠️'} Referências a assets/`);
  }
});

console.log(allOk ? '\n🎉 Estrutura OK!' : '\n⚠️  Alguns arquivos faltando');