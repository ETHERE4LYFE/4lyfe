document.addEventListener('DOMContentLoaded', function() {
  // Tu código original para navegar entre secciones
  const lyfeButton = document.getElementById('lyfe-button');
  const backButton = document.getElementById('back-button');
  const mainSection = document.getElementById('main-section');
  const secondarySection = document.getElementById('secondary-section');

  lyfeButton?.addEventListener('click', function() {
    mainSection?.classList.add('hidden');
    secondarySection?.classList.remove('hidden');
  });

  backButton?.addEventListener('click', function() {
    secondarySection?.classList.add('hidden');
    mainSection?.classList.remove('hidden');
  });

  // --------- Modal Productos ------------

  let productos = [];
  let productoActual = 0;
  let imagenActual = 0;

  function cargarProductos() {
    productos = Array.from(document.querySelectorAll('.producto')).map(prod => ({
      nombre: prod.dataset.nombre,
      precio: prod.dataset.precio,
      medida: prod.dataset.medida,
      imagenes: JSON.parse(prod.dataset.imagenes),
      elemento: prod
    }));
  }

  function mostrarModal(indProducto, indImagen = 0) {
    productoActual = indProducto;
    imagenActual = indImagen;

    const modal = document.getElementById('modalProducto');
    const imgGrande = document.getElementById('imagenGrande');
    const nombre = document.getElementById('nombreProducto');
    const precio = document.getElementById('precioProducto');
    const medida = document.getElementById('medidaProducto');
    const miniaturasCont = document.getElementById('miniaturasContainer');

    const producto = productos[productoActual];
    imgGrande.src = producto.imagenes[imagenActual];
    nombre.textContent = producto.nombre;
    precio.textContent = producto.precio;
    medida.textContent = producto.medida;

    // Miniaturas todos productos
    miniaturasCont.innerHTML = '';
    productos.forEach((prod, i) => {
      const mini = document.createElement('img');
      mini.src = prod.imagenes[0];
      mini.classList.add('miniatura');
      if (i === productoActual) mini.classList.add('activo');
      mini.title = prod.nombre;
      mini.onclick = () => mostrarModal(i, 0);
      miniaturasCont.appendChild(mini);
    });

    modal.style.display = 'flex';
  }

  function cambiarImagen(dir) {
    const producto = productos[productoActual];
    imagenActual += dir;
    if (imagenActual < 0) imagenActual = producto.imagenes.length - 1;
    if (imagenActual >= producto.imagenes.length) imagenActual = 0;
    document.getElementById('imagenGrande').src = producto.imagenes[imagenActual];
  }

  function cambiarProducto(dir) {
    productoActual += dir;
    if (productoActual < 0) productoActual = productos.length - 1;
    if (productoActual >= productos.length) productoActual = 0;
    mostrarModal(productoActual, 0);
  }

  function cerrarModal() {
    document.getElementById('modalProducto').style.display = 'none';
  }

  // Iniciar modal
  cargarProductos();

  productos.forEach((prod, i) => {
    prod.elemento.addEventListener('click', () => mostrarModal(i, 0));
  });

  document.getElementById('prevImagen').addEventListener('click', () => cambiarImagen(-1));
  document.getElementById('nextImagen').addEventListener('click', () => cambiarImagen(1));
  document.getElementById('prevProducto').addEventListener('click', () => cambiarProducto(-1));
  document.getElementById('nextProducto').addEventListener('click', () => cambiarProducto(1));
  document.getElementById('cerrarModal').addEventListener('click', cerrarModal);

  // Cerrar modal al hacer click fuera del contenido
  document.getElementById('modalProducto').addEventListener('click', e => {
    if (e.target === e.currentTarget) cerrarModal();
  });

  // Validar pantalla acceso (tu función original)
  window.validar = function() {
    const clave = document.getElementById("clave").value.toUpperCase();
    const acceso = document.getElementById("acceso");
    const mensaje = document.getElementById("mensaje");

    if (clave === "ETHERE4LYFE") {
      acceso.style.display = "none";
    } else {
      mensaje.textContent = "Contraseña incorrecta.";
    }
  };
});
