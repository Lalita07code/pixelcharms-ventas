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

// Buscamos si existe un carrito guardado en el navegador.
const carritoGuardado = localStorage.getItem("pixelcharms_carrito");

// Si encontramos productos guardados, los convertimos
// nuevamente en un array de JavaScript.
// Si no hay nada guardado, comenzamos con un array vacío.
let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];



// ==============================================
// GUARDAR CARRITO EN LOCALSTORAGE
// ==============================================

// Creamos una función para guardar los productos.
    function guardarCarrito() {

        // Convertimos el array carrito a formato JSON.
        const carritoJSON = JSON.stringify(carrito);

        // Guardamos los productos en el navegador.
        localStorage.setItem("pixelcharms_carrito", carritoJSON);

        // Verificamos el guardado desde la consola.
        console.log("Carrito guardado:", carritoJSON);

    }

 // Mostramos el carrito en la consola para
 // comprobar que inicialmente está vacío.
 console.log("Carrito inicial:", carrito);

 
 // ==============================================
 //     ACTUALIZAR RESUMEN DEL CARRITO
 // ==============================================

 // Creamos una función para actualizar el encabezado.
 function actualizarResumenCarrito() {

     // Sumamos las unidades de todos los productos.
     const cantidadTotal = carrito.reduce(function(acumulador, producto) {

         // Agregamos la cantidad de cada producto.
         return acumulador + Number(producto.cantidad);

     }, 0);

     // Calculamos el importe total de la compra.
     const importeTotal = carrito.reduce(function(acumulador, producto) {

         // Multiplicamos el precio por la cantidad.
         return acumulador + Number(producto.precio) * Number(producto.cantidad);

     }, 0);

     // Buscamos el contador del encabezado.
     const contadorHTML = document.querySelector("#contador-carrito");

     // Buscamos el importe del encabezado.
     const totalHTML = document.querySelector("#total-carrito");

     // Mostramos la cantidad total de unidades.
     contadorHTML.textContent = cantidadTotal;

     // Mostramos el importe en pesos argentinos.
     totalHTML.textContent = "$" + importeTotal.toLocaleString("es-AR");

 }

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
   
    // Buscamos si el producto ya existe en el carrito.
    const productoExistente = carrito.find(function(producto) {

        // Comparamos los identificadores de los productos.
        return producto.id === productoSeleccionado.id;

    });

    // Comprobamos si el producto ya está agregado.
    if (productoExistente) {

        // Si existe, verificamos que haya stock disponible.
        if (productoExistente.cantidad < Number(productoExistente.stock)) {

            // Aumentamos su cantidad en una unidad.
            productoExistente.cantidad++;

        } else {

            // Avisamos que alcanzamos el stock disponible.
            mostrarNotificacionCarrito(
                "💜 Alcanzaste el stock disponible de este producto."
            );

        }

    } else {

        // Si no existe, comprobamos que haya stock.
        if (Number(productoSeleccionado.stock) <= 0) {

            // Mostramos un aviso y detenemos la operación.
            mostrarNotificacionCarrito("💜 Este producto no tiene stock.");
            return;
        }

        // Creamos una copia del producto original.
        const productoParaCarrito = {

            // Copiamos sus propiedades.
            ...productoSeleccionado,

            // Establecemos la cantidad inicial.
            cantidad: 1

        };

        // Agregamos el nuevo producto al carrito.
        carrito.push(productoParaCarrito);

    }

    // Guardamos el carrito actualizado en el navegador.
    guardarCarrito();

    // Actualizamos los productos visibles del carrito.
    mostrarCarrito();

    // Mostramos el carrito actualizado en la consola.
    console.log("Carrito actualizado:", carrito);

    // ==============================================
    // ACTUALIZAR EL RESUMEN DEL CARRITO
    // ==============================================

    // Llamamos a la función que creamos en el paso 64.
    // Esta suma las unidades y calcula el importe total.
    actualizarResumenCarrito();

 });

 
/* ==========================================
        ABRIR EL CARRITO LATERAL
========================================== */

// Seleccionamos la cestita violeta del encabezado.
const botonAbrirCarrito = document.querySelector(".carrito-resumen");

// Seleccionamos el panel lateral.
const panelCarrito = document.querySelector("#panel-carrito");

// Seleccionamos el fondo semitransparente.
const fondoCarrito = document.querySelector("#fondo-carrito");

// Detectamos el clic sobre la cestita del encabezado.
botonAbrirCarrito.addEventListener("click", function () {

    // Agregamos la clase que muestra el panel.
    panelCarrito.classList.add("abierto");

    // Activamos el fondo detrás del panel.
    fondoCarrito.classList.add("activo");

});


/* ==========================================
       CERRAR EL CARRITO LATERAL
========================================== */

// Seleccionamos el botón X del carrito.
const botonCerrarCarrito = document.querySelector("#cerrar-carrito");

// Seleccionamos el botón "Seguir comprando".
const botonSeguirComprando = document.querySelector("#seguir-comprando");

// Creamos una función para cerrar el carrito.
function cerrarCarrito() {

    // Quitamos la clase que mantiene visible el panel.
    panelCarrito.classList.remove("abierto");

    // Ocultamos el fondo semitransparente.
    fondoCarrito.classList.remove("activo");

}

// Cerramos el carrito al presionar la X.
botonCerrarCarrito.addEventListener("click", cerrarCarrito);

// Cerramos el carrito al presionar "Seguir comprando".
botonSeguirComprando.addEventListener("click", cerrarCarrito);

// Cerramos el carrito al hacer clic fuera del panel.
fondoCarrito.addEventListener("click", cerrarCarrito);

/* =========================================================
     CONFIGURACIÓN DE WHATSAPP: PIXELCHARMS
========================================================= */

// Número donde PixelCharms recibirá los pedidos.
// Se escribe sin el símbolo +, espacios ni guiones.
const numeroWhatsApp = "5491173596862";

/* =========================================================
    BOTÓN FINALIZAR PEDIDO POR WHATSAPP
========================================================= */

// Buscamos en el HTML el botón para finalizar el pedido.
// querySelector selecciona el elemento que tenga este ID.
const botonFinalizarWhatsApp = document.querySelector("#finalizar-whatsapp");

// Mostramos el elemento en la consola para verificar
// que JavaScript encontró correctamente el botón.
console.log("Botón finalizar por WhatsApp:", botonFinalizarWhatsApp);

/* =========================================================
    CREAR EL MENSAJE DEL PEDIDO
========================================================= */

// Creamos una función para preparar el mensaje de WhatsApp.
function generarMensajeWhatsApp() {

    // Iniciamos el mensaje con el nombre de nuestra tienda.
    let mensaje = "*Nuevo pedido - PixelCharms Accesorios*\n\n";

    // Agregamos una breve presentación.
    mensaje += "¡Hola! Quiero realizar el siguiente pedido:\n\n";

    // Recorremos cada producto que está dentro del carrito.
    carrito.forEach(function(producto) {

        // Calculamos el subtotal del producto.
        // Multiplicamos su precio por la cantidad seleccionada.
        const subtotalProducto = producto.precio * producto.cantidad;

        // Incorporamos el nombre del producto en negrita.
        mensaje += "*Producto: " + producto.nombre + "*\n";

        // Agregamos la cantidad seleccionada.
        mensaje += "Cantidad: " + producto.cantidad + "\n";

        // Agregamos el subtotal con formato de pesos argentinos.
        mensaje += "Subtotal: $" + subtotalProducto.toLocaleString("es-AR") + "\n\n";

    });


    // Finalizamos el recorrido de los productos.

    // ==============================================
    // CALCULAR EL TOTAL GENERAL DEL PEDIDO
    // ==============================================

    // Creamos una variable para acumular el total.
    let totalPedido = 0;

    // Recorremos todos los productos del carrito.
    carrito.forEach(function(producto) {

        // Calculamos el subtotal de cada producto.
        const subtotal = Number(producto.precio) * Number(producto.cantidad);

        // Sumamos el subtotal al total general.
        totalPedido += subtotal;

    });

    // Agregamos una línea divisoria al mensaje.
    mensaje += "--------------------------\n";

    // Mostramos el importe total de la compra.
    mensaje += "*TOTAL DEL PEDIDO: $" +
    totalPedido.toLocaleString("es-AR") + "*\n\n";

    // Cerramos el mensaje con un agradecimiento.
    mensaje += "¡Muchas gracias!";

    // Devolvemos el mensaje completo.
    return mensaje;

} //Cerramos la función generarMensajeWhatsapp()

console.log(generarMensajeWhatsApp());

/* =========================================================
     ENVIAR PEDIDO POR WHATSAPP
========================================================= */

// Escuchamos cuando el cliente presiona el botón verde.
botonFinalizarWhatsApp.addEventListener("click", function() {

    // Comprobamos si el carrito está vacío.
    if (carrito.length === 0) {

        // Avisamos que primero debe seleccionar productos.
        mostrarNotificacionCarrito(
            "💜 Agregá algunos charms antes de finalizar tu pedido."
        );

        // Detenemos la ejecución.
        return;
    }

    // Generamos el mensaje con los productos y el total.
    const mensajePedido = generarMensajeWhatsApp();

    // Codificamos el mensaje para utilizarlo dentro de una URL.
    // Esto permite conservar emojis, espacios y saltos de línea.
    const mensajeCodificado = encodeURIComponent(mensajePedido);

    // Construimos el enlace con el número de PixelCharms.
    const enlaceWhatsApp =
        "https://wa.me/" + numeroWhatsApp + "?text=" + mensajeCodificado;

    // Abrimos WhatsApp en una pestaña nueva.
    window.open(enlaceWhatsApp, "_blank", "noopener,noreferrer");

});

// ==============================================
// BOTÓN VACIAR CARRITO
// ==============================================

// Buscamos el botón "Vaciar carrito" en nuestro HTML.
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");

// Comprobamos en consola si encontramos el botón.
console.log("Botón vaciar carrito:", botonVaciarCarrito);

// ==============================================
// ELEMENTOS DEL MODAL DE CONFIRMACIÓN
// ==============================================

// Buscamos la ventana personalizada en nuestro HTML.
const modalConfirmacion = document.querySelector("#modal-confirmacion");

// Buscamos el fondo oscuro de la ventana.
const fondoConfirmacion = document.querySelector("#fondo-confirmacion");

// Buscamos el botón para conservar los productos.
const botonCancelarVaciado = document.querySelector("#cancelar-vaciado");

// Buscamos el botón para confirmar el vaciado.
const botonConfirmarVaciado = document.querySelector("#confirmar-vaciado");

// ==============================================
// VALIDAR LOS ELEMENTOS DEL MODAL
// ==============================================

// Verificamos que encontramos la ventana personalizada.
console.log("Modal de confirmación:", modalConfirmacion);

// Verificamos que encontramos el fondo oscuro.
console.log("Fondo del modal:", fondoConfirmacion);

// Verificamos que encontramos el botón para cancelar.
console.log("Botón cancelar:", botonCancelarVaciado);

// Verificamos que encontramos el botón para confirmar.
console.log("Botón confirmar:", botonConfirmarVaciado);

/* ==============================================
   ABRIR LA CONFIRMACIÓN PARA VACIAR EL CARRITO
============================================== */

// Escuchamos cuando el cliente presiona "Vaciar carrito".
botonVaciarCarrito.addEventListener("click", function() {

    // Comprobamos si el carrito ya está vacío.
    if (carrito.length === 0) {

        // Mostramos un aviso sin abrir la ventana.
        mostrarNotificacionCarrito("💜 Tu carrito ya está vacío.");

        // Detenemos la ejecución.
        return;
    }

    // Mostramos el fondo oscuro de la ventana.
    fondoConfirmacion.hidden = false;

    // Mostramos nuestra ventana personalizada.
    modalConfirmacion.hidden = false;

});
/* ==============================================
   CERRAR LA VENTANA DE CONFIRMACIÓN
============================================== */

// Creamos una función reutilizable para cerrar el modal.
function cerrarModalConfirmacion() {

    // Ocultamos la ventana personalizada.
    modalConfirmacion.hidden = true;

    // Ocultamos el fondo oscuro.
    fondoConfirmacion.hidden = true;
}
/* ==============================================
   BOTÓN CONSERVAR MIS CHARMS
============================================== */

// Escuchamos cuando el cliente decide cancelar.
botonCancelarVaciado.addEventListener("click", function() {

    // Cerramos la ventana sin modificar el carrito.
    cerrarModalConfirmacion();

});
/* ==============================================
   BOTÓN SÍ, VACIAR
============================================== */

// Escuchamos cuando el cliente confirma la eliminación.
botonConfirmarVaciado.addEventListener("click", function() {

    // Eliminamos todos los productos del array.
    carrito = [];

    // Guardamos el carrito vacío en localStorage.
    guardarCarrito();

    // Actualizamos los productos del carrito lateral.
    mostrarCarrito();

    // Actualizamos el contador y el total del encabezado.
    actualizarResumenCarrito();

    // Cerramos nuestra ventana personalizada.
    cerrarModalConfirmacion();

    // Mostramos una notificación de PixelCharms.
    mostrarNotificacionCarrito("💜 Tu carrito se vació correctamente.");

    // Verificamos el resultado en la consola.
    console.log("Carrito vaciado:", carrito);

});

/* ==========================================
      MOSTRAR PRODUCTOS DEL CARRITO
========================================== */

// Creamos una función para mostrar los productos
// que el cliente agregó al carrito.
function mostrarCarrito() {

    // Buscamos el contenedor donde aparecerán
    // los productos seleccionados.
    const contenedor = document.querySelector(".carrito-productos");

    // Limpiamos el contenido anterior.
    contenedor.innerHTML = "";

    // Comprobamos si el carrito está vacío.
    if (carrito.length === 0) {

        // Mostramos un mensaje personalizado.
        contenedor.innerHTML = `
            <p class="carrito-vacio">
                Tu carrito está esperando sus primeros charms 💜
            </p>
        `;

        // Buscamos el subtotal del carrito.
        const subtotalHTML = document.querySelector("#carrito-subtotal");

        // Buscamos el total del carrito.
        const totalHTML = document.querySelector("#carrito-total");

        // Reiniciamos el subtotal a cero.
        subtotalHTML.textContent = "$0";

        // Reiniciamos el total a cero.
        totalHTML.textContent = "$0";

        // Finalizamos la función porque no hay productos.
        return;
    }
    
    // Recorremos los productos agregados al carrito.
    carrito.forEach(function(producto) {

        // Creamos una tarjeta para cada producto.
        const elemento = document.createElement("div");

        // Asignamos una clase para darle estilos con CSS.
        elemento.classList.add("carrito-item");

        // Creamos la imagen del producto.
        const imagen = document.createElement("img");

        // Obtenemos la dirección de la imagen desde MockAPI.
        imagen.src = producto.imagen;

        // Agregamos un texto alternativo a la imagen.
        imagen.alt = producto.nombre;

        // Creamos un elemento para mostrar el nombre.
        const nombre = document.createElement("p");

        // Escribimos el nombre del producto.
        nombre.textContent = producto.nombre;

        // Creamos un elemento para mostrar el precio.
        const precio = document.createElement("p");

        // Asignamos una clase para personalizarlo con CSS.
        precio.classList.add("carrito-item-precio");

        // Convertimos el precio a número y aplicamos
        // el formato argentino con separador de miles.
        precio.textContent =
            "$" + Number(producto.precio).toLocaleString("es-AR");
    
        // Creamos un contenedor para agrupar
        // el nombre y el precio del producto.
        const detalles = document.createElement("div");

        // Asignamos una clase para personalizarlo con CSS.
        detalles.classList.add("carrito-item-detalles");
        
        // Agregamos el nombre al contenedor.
        detalles.appendChild(nombre);

        // ==============================================
        // CONTROLES DE CANTIDAD DEL PRODUCTO
        // ==============================================

        // Creamos un contenedor para los botones de cantidad.
        const controlesCantidad = document.createElement("div");

        // Le asignamos una clase para darle estilos con CSS.
        controlesCantidad.classList.add("carrito-cantidad");

        // Creamos el botón para disminuir la cantidad.
        const botonMenos = document.createElement("button");

        // Indicamos que es un botón común.
        botonMenos.type = "button";

        // Mostramos el símbolo de restar.
        botonMenos.textContent = "−";

        // Escuchamos cuando el usuario presiona el botón −.
        botonMenos.addEventListener("click", function() {

            // Comprobamos que la cantidad sea mayor que 1.
            if (producto.cantidad > 1) {

                // Disminuimos la cantidad en una unidad.
                producto.cantidad--;

                // Guardamos la nueva cantidad en localStorage.
                guardarCarrito();

                // Actualizamos visualmente el carrito.
                mostrarCarrito();

                // Actualizamos el contador y el importe del encabezado.
                // La función recalcula las unidades y el total.
                actualizarResumenCarrito();

                // Mostramos la cantidad actualizada en la consola.
                console.log("Cantidad actualizada:", producto.cantidad);

            } else {

                // Evitamos que la cantidad sea menor que 1.
                // Mostramos una notificación personalizada de PixelCharms.
                mostrarNotificacionCarrito("💜 La cantidad mínima es 1. Para eliminar el producto, utilizá la papelera.");

            }

        });

        // Creamos un elemento para mostrar la cantidad.
        const cantidad = document.createElement("span");

        // Mostramos la cantidad guardada en el producto.
        // Inicialmente será 1, pero después podrá aumentar o disminuir.
        cantidad.textContent = producto.cantidad;


        // Creamos el botón para aumentar la cantidad.
        const botonMas = document.createElement("button");

        // Indicamos que es un botón común.
        botonMas.type = "button";

        // Mostramos el símbolo de sumar.
        botonMas.textContent = "+";
        
        // Escuchamos cuando el usuario presiona el botón +.
        botonMas.addEventListener("click", function() {

            // Convertimos el stock disponible a número.
            const stockDisponible = Number(producto.stock);

            // Comprobamos que todavía haya unidades disponibles.
            if (producto.cantidad < stockDisponible) {

                // Aumentamos la cantidad del producto en una unidad.
                producto.cantidad++;

                // Guardamos la nueva cantidad en localStorage.
                guardarCarrito();

                // Actualizamos visualmente el contenido del carrito.
                mostrarCarrito();

                // Actualizamos el contador y el total del encabezado.
                actualizarResumenCarrito();


                // Mostramos el resultado en la consola.
                console.log("Cantidad actualizada:", producto.cantidad);

            } else {

                // Avisamos cuando se alcanza el stock disponible.
                alert("No hay más unidades disponibles de este producto.");

            }

        });


        // ==========================================
        // BOTÓN PARA ELIMINAR UN PRODUCTO
        // ==========================================

        // Creamos un botón para eliminar este producto.
        const botonEliminar = document.createElement("button");

        // Indicamos que es un botón normal.
        botonEliminar.type = "button";

        // Agregamos una clase para diseñarlo con CSS.
        botonEliminar.className = "carrito-eliminar";

        // Mostramos el ícono de la papelera.
        botonEliminar.textContent = "🗑️";

        // Agregamos una descripción para accesibilidad.
        botonEliminar.setAttribute(
            "aria-label",
            "Eliminar " + producto.nombre + " del carrito"
        );

        // Escuchamos cuando el usuario presiona la papelera.
        botonEliminar.addEventListener("click", function() {

            // Buscamos la posición exacta de este producto en el carrito.
            const posicion = carrito.indexOf(producto);

            // Comprobamos que el producto exista en el carrito.
            if (posicion !== -1) {

                // Eliminamos únicamente el producto seleccionado.
                carrito.splice(posicion, 1);

                // Guardamos la eliminación del producto en localStorage.
                guardarCarrito();
                
                // Volvemos a dibujar los productos del carrito lateral.
                mostrarCarrito();

                // Actualizamos el contador y el importe del encabezado.
                // Esta función recalcula el resumen después de eliminar.
                actualizarResumenCarrito();

                // Mostramos en consola qué producto eliminamos.
                console.log("Producto eliminado:", producto.nombre);

            }

        });

        // Agregamos el botón de restar.
        controlesCantidad.appendChild(botonMenos);

        // Agregamos el número de unidades.
        controlesCantidad.appendChild(cantidad);

        // Agregamos el botón de sumar.
        controlesCantidad.appendChild(botonMas);

        // Agregamos la papelera junto a los controles de cantidad.
        controlesCantidad.appendChild(botonEliminar);

        // Incorporamos los controles al contenedor de detalles.
        detalles.appendChild(controlesCantidad);

        // Agregamos el precio al contenedor.
        detalles.appendChild(precio);

        // Incorporamos la imagen a la tarjeta.
        elemento.appendChild(imagen);

        // Incorporamos los detalles a la tarjeta.
        elemento.appendChild(detalles);

        // Incorporamos la tarjeta al carrito.
        contenedor.appendChild(elemento);

    });

    
    // ==========================================
    // CALCULAR EL TOTAL DEL CARRITO
    // ==========================================

    // Creamos una variable para acumular el total.
    let totalCarrito = 0;

    // Recorremos todos los productos del carrito.
    carrito.forEach(function(producto) {

        // Convertimos el precio y la cantidad a números.
        const precio = Number(producto.precio);
        const cantidad = Number(producto.cantidad);

        // Calculamos el subtotal de este producto.
        const subtotalProducto = precio * cantidad;

        // Sumamos el subtotal al total del carrito.
        totalCarrito += subtotalProducto;

    });

    // Mostramos el total calculado en la consola.
    console.log("Total calculado del carrito:", totalCarrito);

    // Buscamos los elementos del HTML donde mostramos los importes.
    const subtotalHTML = document.querySelector("#carrito-subtotal");
    const totalHTML = document.querySelector("#carrito-total");

    // Actualizamos el subtotal con formato de pesos argentinos.
    subtotalHTML.textContent = "$" + totalCarrito.toLocaleString("es-AR");

    // Actualizamos el total de la compra.
    totalHTML.textContent = "$" + totalCarrito.toLocaleString("es-AR");

}


/* ==========================================
    NOTIFICACIONES DE PIXELCHARMS
========================================== */

// Guardamos el temporizador fuera de la función.
// Así podremos cancelarlo si aparece otro mensaje.
let temporizadorNotificacion;

// Creamos una función para mostrar mensajes personalizados.
function mostrarNotificacionCarrito(mensaje) {

    // Buscamos el contenedor de notificaciones en el HTML.
    const notificacion = document.querySelector("#notificacion-carrito");

    // Colocamos el mensaje recibido dentro del contenedor.
    notificacion.textContent = mensaje;

    // Mostramos la notificación.
    notificacion.hidden = false;

    // Cancelamos el temporizador anterior, si existe.
    clearTimeout(temporizadorNotificacion);

    // Creamos un temporizador de 7 segundos.
    temporizadorNotificacion = setTimeout(function() {

        // Ocultamos la notificación.
        notificacion.hidden = true;

        // Limpiamos el contenido del mensaje.
        notificacion.textContent = "";

    }, 7000);

}

// ==============================================
// RESTAURAR EL CARRITO AL CARGAR LA PÁGINA
// ==============================================

// Mostramos los productos recuperados de localStorage.
mostrarCarrito();

// Actualizamos la cantidad y el importe del encabezado.
actualizarResumenCarrito();

// Verificamos en consola que el carrito se restauró.
console.log("Carrito restaurado correctamente:", carrito);


