// ========================
// MODAL DE PRODUCTOS
// ========================

// 🔹 Referencias seguras al modal (si existe)
const modal = document.getElementById('modal');
if (modal) {

  const modalImg = document.getElementById('modal-img');      // Imagen del modal
  const modalTitle = document.getElementById('modal-title');  // Título del modal
  const modalContent = modal.querySelector('.modal-content'); // Contenedor interno

  // Crear flechas y contador solo una vez
  const prevBtn = document.createElement('div');
  prevBtn.textContent = '<';
  prevBtn.classList.add('prev');

  const nextBtn = document.createElement('div');
  nextBtn.textContent = '>';
  nextBtn.classList.add('next');

  const contador = document.createElement('span');
  contador.classList.add('contador');

  modalContent.appendChild(prevBtn);
  modalContent.appendChild(nextBtn);
  modalContent.appendChild(contador);

  // ========================
  // IMÁGENES POR PRODUCTO
  // ========================
  const imagenesProducto = {
    "Alcancías con gelatinas": ["img/alcancias.jpg","img/tigre.jpg","img/osito.jpg","img/piguin.jpg","img/rosa.jpg"],
    "Gomitas blandas Ojos (30u)": ["img/ojos.jpg","img/gomitasblandas1.jpg","img/gomitasblandas2.jpg","img/gomitasblandas3.jpg","img/gomitasblandas4.jpg","img/gomitasblandas5.jpg","img/gomitasblandas7.jpg","img/gomitasblandas9.jpg","img/gomitasblandas8fantasma.jpg"],
    "Chupetín Merlina": ["img/merlina.jpg","img/merliina.jpg"],
    "Transformers": ["img/tr.jpg","img/transformer.jpg","img/2.jpg","img/3.jpg","img/2ss.jpg","img/ddd.jpg"],
    "Gomitas Bull dog": ["img/bull_dog_frutillaa.jpg","img/bull_dog_sandia.jpg"],
    "Chupetín con polvo ácido Brain(30u)": ["img/chupetinBrain.jpg","img/cajaBrain.jpg"],
    "Chupetín con polvo ácido (30u)": ["img/chupetinConAcido.jpg","img/cajaChupetinAcido.jpg"],
    "Burbujeros (24u)": ["img/burbujero3.jpg","img/burbujero.jpg", "img/burbujero2.jpg", "img/burbujero4.jpg"],
    "Autos de carrera con chicles(30u)": ["img/carrera.jpg","img/reversacarrera.jpg"],
    "Brochetas de ojos (x30 brochetas)": ["img/brochetas3.jpg","img/brochetas.jpg"],
    "Remera pimball + chicles(x30)": ["img/pimballremera.jpg","img/reversaremera.jpg"],
    "Celu + chicles(x30)": ["img/pimballip.jpg","img/reversaip.jpg"],
    "Chupetín Calabaza conpolvo ácido (30u)": ["img/chupetinCalabaza.jpg","img/chupetincalabaza1.jpg", "img/chupetincalabaza2.jpg"],
    "Chupetines con formas (x30)": ["img/chupetinesconformas1.jpg", "img/chupetinesconformas2.jpg",],
    "🎃 Halloween chupetines (30u)": ["img/halloween1.jpg","img/halloween2.jpg","img/halloween3.jpg","img/halloween4.jpg",],
    "Gelatinas con formas (30u)": ["img/gelatinaDiferentesSabores2.jpg", "img/gelatinaDiferentesSabores3.jpg", "img/gelatinaDiferentesSabores4.jpg", "img/gelatinaDiferentesSabores5.jpg"],
  };

  

  // Variables de control
  let currentImages = [];
  let currentIndex = 0;
  let currentTitle = "";

  // ========================
  // FUNCIÓN: Abrir modal
  // ========================
  function abrirModal(card) {
    const img = card.querySelector('img');
    const title = card.querySelector('h3');

    currentTitle = title ? title.textContent : "Producto";
    currentImages = imagenesProducto[currentTitle] || [img.src];
    currentIndex = 0;

    modal.style.display = 'flex';
    actualizarModal();
  }

  // ========================
  // FUNCIÓN: Actualizar modal
  // ========================
  function actualizarModal() {
    modalImg.src = currentImages[currentIndex];
    modalTitle.textContent = currentTitle;

    if (currentImages.length > 1) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
      contador.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      contador.textContent = '';
    }
  }

  // ========================
  // NAVEGACIÓN ENTRE IMÁGENES
  // ========================
  prevBtn.onclick = () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      actualizarModal();
    }
  };

  nextBtn.onclick = () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      actualizarModal();
    }
  };

  // ========================
  // ZOOM PARA IMAGEN ÚNICA
  // ========================
  modalImg.onclick = () => {
    if (currentImages.length === 1) {
      modalImg.classList.toggle('zoomed');
    }
  };

  // ========================
  // CERRAR MODAL
  // ========================
  modal.querySelector('.close').onclick = () => {
    modal.style.display = 'none';
    modalImg.classList.remove('zoomed');
  };

  window.onclick = e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalImg.classList.remove('zoomed');
    }
  };

  // ========================
  // ABRIR MODAL AL TOCAR CARD
  // ========================
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => abrirModal(card));
  });
}


// ========================
// BUSCADOR DE PRODUCTOS
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const cards = document.querySelectorAll(".card");
  const noResults = document.getElementById("no-results");

  // Si no hay buscador o cards, no hace nada (evita errores en otras páginas)
  if (!searchInput || cards.length === 0) return;

  // Función general de filtrado
  function filtrarProductos() {
    const filter = searchInput.value.toLowerCase().trim();
    let matches = 0;

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const desc = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";

      if (title.includes(filter) || desc.includes(filter)) {
        card.style.display = "block";
        matches++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) {
      if (matches === 0 && filter.length > 0) {
        noResults.textContent = "😔 No encontramos tu producto, escribinos 💬";
        noResults.style.display = "block";
      } else {
        noResults.style.display = "none";
      }
    }
  }

  // Escucha en móviles y PC
  searchInput.addEventListener("input", filtrarProductos);
  searchInput.addEventListener("keyup", filtrarProductos);
});
