document.addEventListener('DOMContentLoaded', function () {
  // Botones de navegación de secciones
  const lyfeButton = document.getElementById('lyfe-button');
  const backButton = document.getElementById('back-button');
  const mainSection = document.getElementById('main-section');
  const secondarySection = document.getElementById('secondary-section');

  lyfeButton.addEventListener('click', function () {
    mainSection.classList.add('hidden');
    secondarySection.classList.remove('hidden');
  });

  backButton.addEventListener('click', function () {
    secondarySection.classList.add('hidden');
    mainSection.classList.remove('hidden');
  });

  // Modal de productos
  const productos = document.querySelectorAll('.producto');
  const modal = document.getElementById('modalProducto');
  const cerrar = document.querySelector('.cerrar-modal');
  const imagenPrincipal = document.getElementById('imagenPrincipal');
  const titulo = document.getElementById('tituloProducto');
  const precio = document.getElementById('precioProducto');
  const descripcion = document.getElementById('descripcionProducto');
  const contenedorRelacionados = document.getElementById('contenedorRelacionados');
  const flechaIzq = document.getElementById('flechaIzquierda');
  const flechaDer = document.getElementById('flechaDerecha');

  let indiceActual = 0;
  let productosArray = [];

  productos.forEach((producto, i) => {
    productosArray.push(producto);

    producto.addEventListener('click', () => {
      mostrarProducto(i);
    });
  });

  function mostrarProducto(indice) {
    indiceActual = indice;
    const producto = productosArray[indice];
    const img = producto.querySelector('.carrusel img');
    const tituloTexto = producto.querySelector('h2').textContent;
    const precioTexto = producto.querySelectorAll('p')[0].textContent;
    const descTexto = producto.querySelectorAll('p')[1]?.textContent || '';

    imagenPrincipal.src = img.src;
    titulo.textContent = tituloTexto;
    precio.textContent = precioTexto;
    descripcion.textContent = descTexto;

    // Mostrar productos relacionados
    contenedorRelacionados.innerHTML = '';
    productosArray.forEach((p, idx) => {
      if (idx !== indice) {
        const imgRel = p.querySelector('.carrusel img');
        const mini = document.createElement('img');
        mini.src = imgRel.src;
        mini.addEventListener('click', () => mostrarProducto(idx));
        contenedorRelacionados.appendChild(mini);
      }
    });

    modal.classList.remove('oculto');
  }

  cerrar.addEventListener('click', () => {
    modal.classList.add('oculto');
  });

  flechaIzq.addEventListener('click', () => {
    let nuevo = (indiceActual - 1 + productosArray.length) % productosArray.length;
    mostrarProducto(nuevo);
  });

  flechaDer.addEventListener('click', () => {
    let nuevo = (indiceActual + 1) % productosArray.length;
    mostrarProducto(nuevo);
  });
});
