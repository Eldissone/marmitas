document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.topbar');
  if (!header) return;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = [['index.html', 'Início'], ['sobre.html', 'Sobre'], ['gastronomia.html', 'Gastronomia'], ['catering.html', 'Catering'], ['chef-particular.html', 'Chef particular'], ['academia.html', 'Academia'], ['galeria.html', 'Galeria']];
  const navigation = links.map(([file, label]) => `<a href="/${file}"${file === currentPage ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  header.innerHTML = `<a class="brand" href="/">Marmitas <span>com Amor</span></a><nav class="nav" aria-label="Navegação principal">${navigation}</nav><div class="topbar-actions"><a class="button button--dark" href="/contacto.html">Encomendar<span class="arrow">→</span></a></div>`;
});
