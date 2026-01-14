const fs = require('fs');
const path = require('path');

// Lista de todos os arquivos HTML no site/
const htmlFiles = [
  'site/index.html',
  'site/blog.html',
  'site/cart.html',
  'site/checkout.html',
  'site/confirmation.html',
  'site/contact.html',
  'site/faq.html',
  'site/hoteis.html',
  'site/mapa.html',
  'site/pagamento.html',
  'site/register.html',
  'site/restaurantes.html',
  'site/single_info.html',
  'site/sobre.html',
  'site/wishlist.html'
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    console.log(`🔧 Processando: ${file}`);
    
    // Substituir TODOS os caminhos relativos por absolutos com /site/
    
    // 1. CSS
    content = content.replace(/href="css\//g, 'href="/site/css/');
    content = content.replace(/href='css\//g, "href='/site/css/");
    
    // 2. JS
    content = content.replace(/src="js\//g, 'src="/site/js/');
    content = content.replace(/href="js\//g, 'href="/site/js/');
    content = content.replace(/src='js\//g, "src='/site/js/");
    content = content.replace(/href='js\//g, "href='/site/js/");
    
    // 3. Imagens
    content = content.replace(/src="img\//g, 'src="/site/img/');
    content = content.replace(/href="img\//g, 'href="/site/img/');
    content = content.replace(/src='img\//g, "src='/site/img/");
    content = content.replace(/href='img\//g, "href='/site/img/");
    
    // 4. Vídeo
    content = content.replace(/src="video\//g, 'src="/site/video/');
    content = content.replace(/src='video\//g, "src='/site/video/");
    
    // 5. URL no CSS (url())
    content = content.replace(/url\(img\//g, 'url(/site/img/');
    content = content.replace(/url\("img\//g, 'url("/site/img/');
    content = content.replace(/url\('img\//g, "url('/site/img/");
    content = content.replace(/url\(\.\.\/img\//g, 'url(/site/img/');
    
    // 6. Site launch (se houver)
    content = content.replace(/href="site_launch\//g, 'href="/site/site_launch/');
    content = content.replace(/src="site_launch\//g, 'src="/site/site_launch/');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Corrigido: ${file}`);
  } else {
    console.log(`⚠️  Arquivo não encontrado: ${file}`);
  }
});

console.log('🎉 Processamento concluído!');