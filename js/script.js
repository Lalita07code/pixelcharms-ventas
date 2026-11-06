"use strict";

// =====================================================
// PROYECTO FINAL - PIXELCHARMS ACCESORIOS
// =====================================================
// Autor: PixelCharms - Laura Rocha

// Este archivo contendrá las funcionalidades
// interactivas de nuestra tienda online.

// ==============================================
// CONFIGURACIÓN DE LA API DE PIXELCHARMS
// ==============================================

// Se guarda la dirección de la API de MockAPI.
// Esta dirección contiene los productos de PixelCharms.
const API_URL = "https://6aeb6319ee39618d7bf8455d.mockapi.io/api/v1/productos";


 // ==============================================
 // ALMACENAMIENTO TEMPORAL DE PRODUCTOS
 // ==============================================

 // Creamos un array vacío para guardar los productos
 // que recibiremos desde nuestra API.
 let listaProductos = [];

 
 // ==============================================
 // CARRITO DE COMPRAS DE PIXELCHARMS
 // ==============================================

 // Creamos un array vacío para almacenar los
 // productos que el cliente agregue al carrito.
 let carrito = [];

 // Mostramos el carrito en la consola para
 // comprobar que inicialmente está vacío.
 console.log("Carrito inicial:", carrito);

 
 // ==============================================
 // MOSTRAR PRODUCTOS EN EL CATÁLOGO
 // ==============================================

 // Esta función recibe un array de productos
 // y los muestra en nuestro HTML.
 function mostrarProductos(productos) {

     // Seleccionamos el contenedor del catálogo.
     const contenedor = document.querySelector("#catalogo-productos");

     // Limpiamos el contenido anterior.
     contenedor.innerHTML = "";

    // ==============================================
    // VALIDAR SI EXISTEN PRODUCTOS
    // ==============================================

    // Comprobamos si el array está vacío.
    if (productos.length === 0) {

        // Mostramos un mensaje cuando no hay productos.
        contenedor.innerHTML = `
            <p class="mensaje-sin-productos">
                💜 Próximamente tendremos nuevos productos
                en esta colección. ¡Volvé pronto!
            </p>
        `;

        // Finalizamos la función para no crear tarjetas.
        return;
    }


     // Recorremos los productos recibidos.
     productos.forEach(function(producto) {

         // Construimos una tarjeta HTML para cada producto.
         const tarjeta = `
             <article class="producto-card">

                 <img src="${producto.imagen}" alt="${producto.nombre}">

                 <h3>${producto.nombre}</h3>

                <!-- Descripción del producto -->
                <p class="producto-descripcion">${producto.descripcion}</p>


                <!-- Agrupamos el precio y el stock del producto -->
                <div class="producto-detalles">

                    <!-- Mostramos el precio con formato argentino -->
                    <p class="producto-precio">
                        <strong>Precio: $${Number(producto.precio).toLocaleString("es-AR")}</strong>
                    </p>

                    <!-- Mostramos la cantidad disponible -->
                    <p class="producto-stock">
                        Stock disponible: ${producto.stock}
                    </p>


                <!-- Cerramos el contenedor del precio y stock -->
                </div>

                <!-- Botón para añadir el producto al carrito -->
                <button
                    type="button"
                    class="boton-agregar-carrito"
                    data-id="${producto.id}"
                >
                    🛒 Añadir al carrito
                </button>

            </article>

         `;

         // Agregamos la tarjeta al catálogo.
         contenedor.innerHTML += tarjeta;

     });

 }

// Función asíncrona para consultar nuestra API.
 async function obtenerProductos() {

     // Solicitamos los productos al servidor.
     const respuesta = await fetch(API_URL);

     // Convertimos la respuesta JSON en un array de JavaScript.
     const productos = await respuesta.json();
     
    // Guardamos los productos recibidos en nuestro array general.
    listaProductos = productos;

    // Comprobamos cuántos productos almacenamos.
    console.log("Productos guardados:", listaProductos.length);

    // Mostramos los productos en consola para verificar.
     console.log("Productos recibidos desde MockAPI:", productos);
     
    // ==============================================
    // MOSTRAR LOS PRODUCTOS RECIBIDOS
    // ==============================================

    // Llamamos a nuestra función reutilizable.
    // Le enviamos los productos obtenidos desde MockAPI.
    
    // ==============================================
    // CATÁLOGO INICIAL SIN PRODUCTOS VISIBLES
    // ==============================================

    // Al cargar la página, no mostramos todas las tarjetas.
    // Esperamos a que el visitante seleccione una colección.
    // mostrarProductos(productos);

 }

 // Ejecutamos la función al cargar nuestra página.
 obtenerProductos();

 
 // ==============================================
 // FILTRAR PRODUCTOS POR CATEGORÍA
 // ==============================================

 // Esta función recibe el nombre de una categoría.
 function filtrarProductos(categoria) {
     // Recorremos el array general y seleccionamos
     // solamente los productos de la categoría indicada.
     const productosFiltrados = listaProductos.filter(function(producto) {

         // Comparamos la categoría de cada producto
         // con la categoría que queremos mostrar.
         return producto.categoria === categoria;

     });

     // Mostramos los resultados en consola para comprobar.
     console.log("Categoría seleccionada:", categoria);
     console.log("Productos filtrados:", productosFiltrados);
     
    // ==============================================
    // MOSTRAR LOS RESULTADOS DEL FILTRO
    // ==============================================

    // Enviamos los productos filtrados a la función
    // que se encarga de construir las tarjetas HTML.
    mostrarProductos(productosFiltrados);

 }
 
 // ==============================================
 // EVENTOS DE LOS BOTONES DE COLECCIONES
 // ==============================================

 // Seleccionamos todos los botones "Ver colección".
 const botonesColeccion = document.querySelectorAll(".boton-coleccion");

 // Recorremos cada uno de los botones encontrados.
 botonesColeccion.forEach(function(boton) {

     // Escuchamos cuando el usuario hace clic.
     boton.addEventListener("click", function() {

         // Obtenemos la categoría guardada en el HTML.
         const categoria = boton.dataset.categoria;

         // Mostramos la categoría seleccionada en consola.
         console.log("Botón seleccionado:", categoria);

         // Filtramos los productos de esa colección.
         filtrarProductos(categoria);

     });

 });

 // ==============================================
 // EVENTOS DE LOS BOTONES DEL CARRITO
 // ==============================================

 // Seleccionamos el contenedor del catálogo.
 const catalogo = document.querySelector("#catalogo-productos");

 // Escuchamos los clics dentro del catálogo.
 catalogo.addEventListener("click", function(evento) {

     // Comprobamos si el clic fue sobre un botón
     // que tenga la clase "boton-agregar-carrito".
     const boton = evento.target.closest(".boton-agregar-carrito");

     // Si el clic no fue sobre un botón del carrito,
     // terminamos la ejecución.
     if (!boton) {
         return;
     }

     // Obtenemos el ID del producto seleccionado.
     const idProducto = boton.dataset.id;

    // Revisamos qué datos contiene el botón.
    console.log("Datos del botón:", boton.dataset);

     // Mostramos el ID en la consola.
     console.log("Producto seleccionado:", idProducto);
     
    // ==============================================
    // BUSCAR Y AGREGAR EL PRODUCTO AL CARRITO
    // ==============================================

    // Buscamos en nuestra lista general el producto
    // cuyo ID coincide con el botón seleccionado.
    const productoSeleccionado = listaProductos.find(function(producto) {

        // Comparamos los identificadores.
        return producto.id === idProducto;

    });

    // Comprobamos que encontramos el producto.
    if (!productoSeleccionado) {

        // Mostramos un aviso si el producto no existe.
        console.log("No se encontró el producto.");

        // Detenemos la ejecución.
        return;
    }

    // Agregamos el producto encontrado al array carrito.
    carrito.push(productoSeleccionado);

    // Mostramos el carrito actualizado en la consola.
    console.log("Carrito actualizado:", carrito);

    // ==============================================
    // CONTAR LOS PRODUCTOS DEL CARRITO
    // ==============================================

    // Obtenemos la cantidad de elementos guardados
    // dentro de nuestro array carrito.
    const cantidadProductos = carrito.length;

    // Mostramos la cantidad en la consola.
    console.log("Cantidad de productos en el carrito:", cantidadProductos);

    
    // ==============================================
    // ACTUALIZAR EL CONTADOR VISIBLE DEL CARRITO
    // ==============================================

    // Buscamos en el HTML el elemento que muestra
    // la cantidad de productos del carrito.
    const contadorCarrito = document.querySelector("#contador-carrito");

    // Actualizamos el texto del contador con la
    // cantidad de productos almacenados en el array.
    contadorCarrito.textContent = cantidadProductos;

    
    // ==============================================
    // CALCULAR EL TOTAL DEL CARRITO
    // ==============================================

    // Recorremos todos los productos del carrito
    // y sumamos sus precios.
    const totalCarrito = carrito.reduce(function(acumulador, producto) {

        // Sumamos el precio del producto al total anterior.
        return acumulador + Number(producto.precio);

    }, 0);

    // Mostramos el total con formato de pesos argentinos.
    console.log(
        "Total del carrito: $" + totalCarrito.toLocaleString("es-AR")
    );

    // ==============================================
    // ACTUALIZAR EL TOTAL VISIBLE DEL CARRITO
    // ==============================================

    // Buscamos en el HTML el elemento que muestra
    // el total acumulado de nuestra compra.
    const totalCarritoHTML = document.querySelector("#total-carrito");

    // Actualizamos el texto del elemento HTML.
    // Usamos el formato argentino para separar los miles.
    totalCarritoHTML.textContent =
        "$" + totalCarrito.toLocaleString("es-AR");


 });

