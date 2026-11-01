const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'frontend');
const port = process.env.PORT || 3000;
const types = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const requested = urlPath === '/' ? '/pages/index.html' : urlPath;
  const directFile = path.normalize(path.join(root, requested));
  const pageFile = path.normalize(path.join(root, 'pages', requested.replace(/^\//, '')));
  const file = fs.existsSync(directFile) ? directFile : pageFile;

  if (!file.startsWith(root)) return res.writeHead(403).end('Acesso negado');
  fs.readFile(file, (error, content) => {
    if (error) return res.writeHead(error.code === 'ENOENT' ? 404 : 500).end(error.code === 'ENOENT' ? 'Página não encontrada' : 'Erro interno');
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(content);
  });
}).listen(port, () => console.log(`Marmitas com Amor em http://localhost:${port}`));
