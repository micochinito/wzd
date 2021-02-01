let baseDeDatos = [
	{
		id: 1,
		nombre: 'Gummies',
		precio: 100,
		gr:'Bag w/9 pieces',
		imagen: 'images/Gummies1.jpg'
	},
	{
		id: 2,
		nombre: 'Bites',
		precio: 500,
		gr:'Bag w/8 pieces',
		imagen: 'images/Bites.jpg'
	},
	{
		id: 3,
		nombre: 'Tintc',
		precio: 1000,
		gr:'Dropper w/30 ml (600 drops proxy)',
		imagen: 'images/Tintc1.jpg'
	},
	{
		id: 4,
		nombre: 'Kit (Gummies, Bites y Tintc)',
		precio: 200,
		gr:'50gm',
		imagen: 'images/Tinct.jpg'
	}

];

let $items = document.querySelector('#items');
let carrito = [];
let total = 0;
let $carrito = document.querySelector('#carrito');
let $total = document.querySelector('#total');
let $botonVaciar = document.querySelector('#boton-vaciar');

// Funciones
function renderItems() {
	for (let info of baseDeDatos) {
		// Estructura
		let miNodo = document.createElement('div');
		miNodo.classList.add('card', 'col-sm-4');
		// Body
		let miNodoCardBody = document.createElement('div');
		miNodoCardBody.classList.add('card-body');
		// Titulo
		let miNodoTitle = document.createElement('h5');
		miNodoTitle.classList.add('card-title');
		miNodoTitle.textContent = info['nombre'];
		// Imagen
		let miNodoImagen = document.createElement('img');
		miNodoImagen.classList.add('img-fluid');
		miNodoImagen.setAttribute('src', info['imagen']);
		// Precio
		let miNodoPrecio = document.createElement('p');
		miNodoPrecio.classList.add('card-text');
		miNodoPrecio.textContent = '$' + info['precio'] ;
		//especificacion
		let miNodoespecificar = document.createElement('p');
	miNodoespecificar.classList.add('card-text');
		miNodoespecificar.textContent = info['gr'] ;
		// Boton 
		let miNodoBoton = document.createElement('button');
		miNodoBoton.classList.add('btn', 'btn-primary' , 'btn-morado');
		miNodoBoton.textContent = '+';
		miNodoBoton.setAttribute('marcador', info['id']);
		miNodoBoton.addEventListener('click', anyadirCarrito);
		// Insertamos
		miNodoCardBody.appendChild(miNodoImagen);
		miNodoCardBody.appendChild(miNodoTitle);
		miNodoCardBody.appendChild(miNodoespecificar);
		miNodoCardBody.appendChild(miNodoPrecio);
		miNodoCardBody.appendChild(miNodoBoton);
		miNodo.appendChild(miNodoCardBody);
		$items.appendChild(miNodo);
	}
}

function anyadirCarrito() {
	// Anyadimos el Nodo a nuestro carrito
	carrito.push(this.getAttribute('marcador'))
	// Calculo el total
	calcularTotal();
	// Renderizamos el carrito 
	renderizarCarrito();

}

function renderizarCarrito() {
	// Vaciamos todo el html
	$carrito.textContent = '';
	// Quitamos los duplicados
	let carritoSinDuplicados = [...new Set(carrito)];
	// Generamos los Nodos a partir de carrito
	carritoSinDuplicados.forEach(function (item, indice) {
		// Obtenemos el item que necesitamos de la variable base de datos
		let miItem = baseDeDatos.filter(function(itemBaseDatos) {
			return itemBaseDatos['id'] == item;
		});
		// Cuenta el número de veces que se repite el producto
		let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
			return itemId === item ? total += 1 : total;
		}, 0);
		// Creamos el nodo del item del carrito
		let miNodo = document.createElement('li');
		miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
		miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
		// Boton de borrar
		let miBoton = document.createElement('button');
		miBoton.classList.add('btn', 'btn-danger', 'mx-5' ,'btn-morado');
		miBoton.textContent = 'X';
		miBoton.style.marginLeft = '1rem';
		miBoton.setAttribute('item', item);
		miBoton.addEventListener('click', borrarItemCarrito);
		// Mezclamos nodos
		miNodo.appendChild(miBoton);
		$carrito.appendChild(miNodo);
	});
}

function borrarItemCarrito() {
	// Obtenemos el producto ID que hay en el boton pulsado
	let id = this.getAttribute('item');
	// Borramos todos los productos
	carrito = carrito.filter(function (carritoId) {
		return carritoId !== id;
	});
	// volvemos a renderizar
	renderizarCarrito();
	// Calculamos de nuevo el precio
	calcularTotal();
}

function calcularTotal() {
	// Limpiamos precio anterior
	total = 0;
	// Recorremos el array del carrito
	for (let item of carrito) {
		// De cada elemento obtenemos su precio
		let miItem = baseDeDatos.filter(function(itemBaseDatos) {
			return itemBaseDatos['id'] == item;
		});
		total = total + miItem[0]['precio'];
	}
	// Renderizamos el precio en el HTML
	$total.textContent = total.toFixed(2);
}

function vaciarCarrito() {
	// Limpiamos los productos guardados
	carrito = [];
	// Renderizamos los cambios
	renderizarCarrito();
	calcularTotal();
}

// Eventos
$botonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderItems();