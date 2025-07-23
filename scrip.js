document.addEventListener('DOMContentLoaded', () => {
  const productos = document.querySelectorAll('.producto');
  const modal = document.getElementById('productModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalSize = document.getElementById('modalSize');
  const modalDescription = document.getElementById('modalDescription');
  const relatedList = document.getElementById('relatedList');
  const closeBtn = document.querySelector('.modal-close');
  const prevBtn = document.querySelector('.modal-nav.prev');
  const nextBtn = document.querySelector('.modal-nav.next');

  let currentIndex = 0;
  let productData = [];

  productos.forEach((producto, index) => {
    const images = Array.from(producto.querySelectorAll('.carrusel img')).map(img => img.src);
    const title = producto.querySelector('h2')?.innerText || '';
    const price = producto.querySelectorAll('p')[0]?.innerText || '';
    const size = producto.querySelectorAll('p')[1]?.innerText || '';
    const description = 'Descripción del producto';
    productData.push({ images, title, price, size, description, index });

    producto.addEventListener('click', () => {
      openModal(index);
    });
  });

  function openModal(index) {
    currentIndex = index;
    const data = productData[index];
    modalImage.src = data.images[0];
    modalTitle.textContent = data.title;
    modalPrice.textContent = data.price;
    modalSize.textContent = data.size;
    modalDescription.textContent = data.description;

    renderRelated(index);
    modal.classList.add('show');
  }

  function renderRelated(current) {
    relatedList.innerHTML = '';
    productData.forEach((prod, i) => {
      if (i !== current) {
        const thumb = document.createElement('img');
        thumb.src = prod.images[0];
        thumb.alt = prod.title;
        thumb.addEventListener('click', () => openModal(i));
        relatedList.appendChild(thumb);
      }
    });
  }

  closeBtn.addEventListener('click', () => modal.classList.remove('show'));

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + productData.length) % productData.length;
    openModal(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % productData.length;
    openModal(currentIndex);
  });
});


