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
    "Alcancias con gelatinas": ["img/alcancias1.jpg","img/alcancias2.jpg","img/alcancias3.jpg"],
    "Chupetín Merlina": ["img/merlina.jpg","img/merliina.jpg"],
    "Chupetin con polvo acido Brain(30u)": ["img/chupetinBrain.jpg","img/cajaBrain.jpg"],
    "Chupetin con polvo acido skull (30u)": ["img/chupetinConAcido.jpg","img/cajaChupetinAcido.jpg"],
    "Autos de carrera con chicles(30u)": ["img/carrera.jpg","img/reversacarrera.jpg"],
    "Brochetas de ojos (x30 brochetas)": ["img/brochetas3.jpg","img/brochetas.jpg"],
    "Remera pimball + chicles(x30)": ["img/pimballremera.jpg","img/reversaremera.jpg"],
    "Celu + chicles(x30)": ["img/pimballip.jpg","img/reversaip.jpg"],
    "Chupetin Calabaza conpolvo ácido (30u)": ["img/chupetinCalabaza.jpg","img/chupetincalabaza1.jpg", "img/chupetincalabaza2.jpg"],
    "Chupetines con formas (x30) ": ["img/chupetinesconformas1.jpg", "img/chupetinesconformas2.jpg",],
    "🎃 Halloween chupetines (30u)": ["img/halloween1.jpg","img/halloween2.jpg","img/halloween3.jpg","img/halloween4.jpg",],
    "Gelatinas con formas (30u)": ["img/gelatinaDiferentesSabores2.jpg", "img/gelatinaDiferentesSabores3.jpg", "img/gelatinaDiferentesSabores4.jpg", "img/gelatinaDiferentesSabores5.jpg"],
    "Chupetines de Corona con LED (x30u)": ["img/chupetinesconled1.jpg", "img/corona2.jpg"],
    "Gomitas (30u)": ["img/gomitablandaCara3.jpg","img/gomitablandaCara2.jpg"],
    "Gomitas blandas Selección Argentina (30u)": ["img/seleccion.jpg", "img/seleccion1.jpg", "img/seleccion2.jpg",],
    "Cool Mint sabores frutales (x30u)": ["img/coolmint.jpg","img/coolmint2.jpg"],
    "Trompetas con chupetin y sonido (30u)": ["img/trompeta1.jpg", "img/trompetas.jpg"],

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
  const titulo = card.querySelector('h3').textContent;
  const cantidadImgs = imagenesProducto[titulo]?.length || 1;

  if (cantidadImgs > 1) {
    const overlay = document.createElement('span');
    overlay.className = 'mas-fotos';
    overlay.textContent = `+${cantidadImgs - 1} fotos`;
    card.appendChild(overlay);
  }
});
  cards.forEach(card => {
    card.onclick = () => abrirModal(card);
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

/*
// ========================
// CARRITO DE COMPRAS
// ========================

// Referencias a elementos del carrito


const carritoBtn = document.getElementById('carrito-btn');  // Botón del carrito  
const carritoDropdown = document.getElementById('carrito-dropdown');    // Dropdown del carrito
const carritoItems = document.getElementById('carrito-items');  // Lista de items en el carrito                                           
const carritoCount = document.getElementById('carrito-count');             // Contador de items   
const carritoTotal = document.getElementById('carrito-total');         // Total del carrito
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');           // Botón para vaciar carrito  


let carrito = []; // Array para almacenar productos

// Mostrar u ocultar dropdown
carritoBtn.addEventListener('click', () => {
  carritoDropdown.style.display = carritoDropdown.style.display === 'block' ? 'none' : 'block';
});                               

// Función para agregar productos
// Animación cuando se agrega producto
function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(p => p.nombre === nombre);
  if(productoExistente) {
    productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();

  // Animación del contador
  carritoCount.classList.add('animar-carrito');
  setTimeout(() => carritoCount.classList.remove('animar-carrito'), 300);
}

// Actualizar carrito con + y -
function actualizarCarrito() {
  carritoItems.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('carrito-item');

    const nombre = document.createElement('span');
    nombre.textContent = item.nombre;
    nombre.classList.add('carrito-nombre');

    const precio = document.createElement('span');
    precio.textContent = `$${item.precio}`;
    precio.classList.add('carrito-precio');

    const cantidadContainer = document.createElement('div');
    cantidadContainer.classList.add('cantidad-container');

    const btnMenos = document.createElement('button');
    btnMenos.textContent = '-';
    btnMenos.classList.add('cantidad-btn');
    btnMenos.onclick = () => {
      if(item.cantidad > 1) {
        item.cantidad--;
      } else {
        carrito.splice(index, 1);
      }
      actualizarCarrito();
    };

    const cantidad = document.createElement('span');
    cantidad.textContent = item.cantidad || 1;
    cantidad.classList.add('cantidad');

    const btnMas = document.createElement('button');
    btnMas.textContent = '+';
    btnMas.classList.add('cantidad-btn');
    btnMas.onclick = () => {
      item.cantidad = (item.cantidad || 1) + 1;
      actualizarCarrito();
    };

    cantidadContainer.appendChild(btnMenos);
    cantidadContainer.appendChild(cantidad);
    cantidadContainer.appendChild(btnMas);

    const totalProducto = document.createElement('span');
    totalProducto.textContent = `$${item.precio * (item.cantidad || 1)}`;
    totalProducto.classList.add('total-producto');

    li.appendChild(nombre);
    li.appendChild(precio);
    li.appendChild(cantidadContainer);
    li.appendChild(totalProducto);

    carritoItems.appendChild(li);

    total += item.precio * (item.cantidad || 1);
  });

  carritoCount.textContent = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
  carritoTotal.textContent = `Total: $${total}`;
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
}); 

// Inicializar carrito
actualizarCarrito();

// Cerrar dropdown al hacer clic fuera
window.addEventListener('click', (e) => {
  if (!carritoBtn.contains(e.target) && !carritoDropdown.contains(e.target)) {
    carritoDropdown.style.display = 'none';
  }
}); */

// Número de WhatsApp
const numero = "542236010443";

const botones = document.querySelectorAll('.btn-carrito');

botones.forEach(boton => {
  boton.addEventListener('click', (event) => {
    event.stopPropagation();

    const card = boton.closest('.card');
    const nombre = card.querySelector('h3').innerText;
    const precioFormateado = card.querySelector('p').innerText.trim();

    let mensaje = '';

    // Pasamos todo a minúsculas para evitar errores por espacios o mayúsculas
    const textoBoton = boton.innerText.toLowerCase();

    if (textoBoton.includes('agregar')) {
      mensaje = `Quiero agregar esto: *${nombre}* que cuesta: ${precioFormateado}.`;
    } else if (textoBoton.includes('consulta')) {
      mensaje = `Vengo del catálogo y quiero hacer una consulta sobre este producto: *${nombre}*.`;
    }

    if (mensaje) { // solo abre si hay mensaje válido
      const url = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    } else {
      console.warn('⚠️ No se generó mensaje. Texto del botón:', boton.innerText);
    }
  });
});

