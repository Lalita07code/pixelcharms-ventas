# 💜 PixelCharms Accesorios

Sitio web desarrollado para **PixelCharms Accesorios**, una marca de accesorios artesanales y personalizados.

> ✨ Charms que suben tu nivel.

🌐 **Sitio web:** https://lalita07code.github.io/pixelcharms-ventas/

---

## 📌 Descripción del proyecto

PixelCharms Accesorios es una tienda web responsive desarrollada como parte del curso de **Front-End JS**.

El proyecto comenzó como una página estática construida con HTML y CSS y evolucionó hacia una tienda interactiva mediante JavaScript.

Actualmente permite explorar colecciones, consultar productos obtenidos desde una API, seleccionar cantidades, gestionar un carrito de compras y enviar consultas mediante un formulario de contacto.

El diseño está inspirado en la identidad visual de PixelCharms, utilizando sus colores, tipografía y elementos gráficos.

---

## 🛍️ Colecciones

La tienda presenta cinco categorías principales:

- 🌈 **Kids:** accesorios divertidos y coloridos.
- 💖 **Cute:** diseños delicados y llenos de personalidad.
- 🎮 **Gamer:** accesorios inspirados en el mundo gamer y geek.
- 💎 **Piedras:** accesorios elaborados con piedras naturales.
- ✨ **Elegancy:** diseños elegantes para diferentes ocasiones.

Cada colección cuenta con un botón **Ver colección**, que permite visualizar los productos correspondientes.

---

## 💻 Tecnologías utilizadas

- **HTML5:** estructura semántica de la página.
- **CSS3:** estilos y personalización visual.
- **JavaScript:** interactividad y lógica de la tienda.
- **DOM:** creación y actualización dinámica de elementos.
- **Eventos:** interacción con botones, formularios y carrito.
- **Fetch API:** consulta de productos y envío de formularios.
- **MockAPI:** almacenamiento y consulta de productos.
- **JSON:** intercambio de información de productos.
- **localStorage:** persistencia del carrito de compras.
- **Flexbox:** distribución de elementos.
- **CSS Grid:** organización de tarjetas.
- **Media Queries:** adaptación a diferentes pantallas.
- **Google Fonts:** tipografía Poppins.
- **Formspree:** recepción de mensajes del formulario.
- **Git y GitHub:** control de versiones.
- **GitHub Pages:** publicación del sitio.

---

## ✨ Funcionalidades implementadas

### 1. Catálogo dinámico de productos

Los productos se obtienen desde MockAPI mediante JavaScript y se muestran dinámicamente en la página.

Cada tarjeta presenta:

- Imagen del producto.
- Nombre.
- Descripción.
- Precio.
- Stock disponible.
- Selector de cantidad.
- Botón **Añadir al carrito**.

Los productos pueden visualizarse según la colección seleccionada.

### Carga asincrónica y manejo de errores

La consulta de productos a MockAPI se realiza con `fetch` y `async/await`. Se utiliza `try...catch...finally` para controlar el resultado de la solicitud y finalizar el estado de carga tanto si la respuesta es exitosa como si ocurre un error.

- Mientras se esperan los productos, el catálogo puede mostrar un mensaje de carga.
- Si la consulta falla, se muestra un aviso diferente al de una colección sin productos.
- La aplicación recuerda la última colección seleccionada para volver a filtrarla cuando termina la carga correctamente.
- Se comprueba el resultado de la solicitud para gestionar respuestas fallidas de la API.

La selección de colecciones y la carga normal de productos se verificaron en el navegador. La simulación de una conexión lenta quedó pendiente de prueba.

### 2. Selector de cantidad

Cada producto incluye controles para aumentar o disminuir la cantidad deseada.

Se implementaron las siguientes validaciones:

- La cantidad mínima es una unidad.
- No se permite superar el stock disponible.
- Se muestra un aviso personalizado cuando se alcanza el límite.
- La cantidad seleccionada se utiliza al agregar el producto al carrito.

### 3. Carrito de compras lateral

Se desarrolló un carrito lateral deslizante que permite visualizar y gestionar los productos seleccionados.

Sus funcionalidades incluyen:

- Apertura y cierre del panel lateral.
- Visualización de imagen, nombre y precio.
- Incremento y disminución de cantidades.
- Eliminación individual de productos.
- Cálculo automático del subtotal y total.
- Actualización del contador del encabezado.
- Botón para seguir comprando.
- Opción para vaciar el carrito.
- Ventana de confirmación antes de vaciarlo.
- Opción para finalizar el pedido por WhatsApp.

### 4. Validación de stock

La tienda controla las cantidades solicitadas para evitar que se agreguen más unidades de las disponibles.

La validación contempla tanto la cantidad seleccionada en el catálogo como las unidades que ya se encuentran en el carrito.

Cuando se alcanza el límite, aparece un mensaje personalizado dentro de la tarjeta del producto.

### 5. Persistencia del carrito

Se implementó `localStorage` para conservar los productos seleccionados.

De esta manera, al actualizar la página o volver a ingresar desde el mismo navegador, el carrito puede recuperar su contenido.

### 6. Notificaciones personalizadas

La tienda muestra mensajes visuales para mejorar la experiencia de compra.

Entre ellos:

- Confirmación al agregar productos al carrito.
- Avisos cuando se alcanza el stock disponible.
- Mensajes relacionados con las acciones del carrito.

La confirmación de producto agregado aparece como una notificación flotante que desaparece automáticamente después de **5 segundos**.

### 7. Formulario de contacto funcional

El formulario está integrado con **Formspree** y permite enviar consultas desde la propia página.

Incluye:

- Nombre.
- Correo electrónico.
- Mensaje.
- Validación de campos obligatorios.
- Envío mediante JavaScript y `fetch`.
- Confirmación visual de envío exitoso.
- Mensaje de error cuando el envío falla.
- Limpieza de los campos después de un envío exitoso.

El usuario permanece en la tienda durante el proceso.

### 8. Redes sociales

Se incorporaron enlaces directos a las redes oficiales de PixelCharms:

- Instagram: https://www.instagram.com/pixelcharmsaccesorios/
- TikTok: https://www.tiktok.com/@pixelcharmsacceso

Los enlaces se abren en una nueva pestaña.

### 9. Animaciones e interacción visual

Se incorporaron efectos para mejorar la presentación del catálogo:

- Aparición animada de tarjetas.
- Efectos hover en botones.
- Transición del carrito lateral.
- Notificaciones con la identidad visual de la marca.
- Alineación uniforme de los elementos de las tarjetas.

---

## 📱 Diseño responsive

La página fue diseñada para adaptarse a diferentes tamaños de pantalla:

- 📱 Celulares.
- 📱 Tablets.
- 💻 Computadoras de escritorio.

Para lograrlo se utilizaron **Media Queries, Flexbox y CSS Grid**.

Se trabajó especialmente en la distribución de las tarjetas, la navegación, el encabezado, las imágenes y el formulario de contacto.

---

## ♿ Accesibilidad y SEO

Para facilitar la navegación y mejorar la comprensión del sitio por parte de usuarios y buscadores, se incorporaron las siguientes prácticas:

- **HTML semántico:** organización del contenido con elementos como `header`, `nav`, `main`, `section` y `footer`.
- **Textos alternativos (`alt`):** descripción de imágenes para mejorar su accesibilidad.
- **Navegación por teclado:** uso de controles interactivos accesibles, incluido el botón de apertura del carrito.
- **Metaetiquetas:** descripción del sitio y configuración de visualización adaptable en el `head`.
- **Encabezados y contenido:** títulos organizados y descripciones de productos claras.

Estas medidas forman parte de las mejoras de accesibilidad y SEO.

---

## 📂 Estructura del proyecto

```text
pixelcharms-ventas/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── img/
    └── imágenes utilizadas en el sitio
```

### Descripción de los archivos principales

- `index.html`: contiene la estructura de la tienda.
- `css/style.css`: define los estilos, animaciones y diseño responsive.
- `js/script.js`: contiene la lógica de JavaScript, catálogo, eventos, carrito y formulario.
- `img/`: almacena las imágenes y recursos gráficos.

---

## 📦 Estructura de los productos

Los productos almacenados en MockAPI utilizan los siguientes campos:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | String | Identificador único del producto |
| `nombre` | String | Nombre del accesorio |
| `descripcion` | String | Descripción del producto |
| `precio` | Number | Precio unitario |
| `categoria` | String | Colección a la que pertenece |
| `imagen` | String | Ruta o URL de la imagen |
| `stock` | Number | Unidades disponibles |

Esta estructura permite que JavaScript recupere y represente los productos dinámicamente.

---

## 🧩 Secciones de la página

1. **Inicio:** presentación de la marca e imagen principal.
2. **Productos:** colecciones y catálogo dinámico.
3. **Reseñas:** sección visual de testimonios.
4. **Contacto:** información de redes sociales y formulario.
5. **Footer:** identidad y datos de la marca.
6. **Carrito lateral:** gestión interactiva de productos seleccionados.

---

## 🚀 Ejecución del proyecto

Para ejecutar el proyecto localmente:

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Verificar que se mantenga la estructura de archivos.
4. Abrir `index.html` mediante Live Server.
5. Comprobar la conexión con MockAPI para cargar los productos.

No se requiere instalar dependencias mediante npm para la versión actual.

---

## 🎓 Proyecto académico

Este proyecto fue desarrollado como parte del curso de **Front-End JS**.

Su objetivo es aplicar progresivamente los conocimientos adquiridos durante las clases, incluyendo:

- Estructuración semántica con HTML.
- Diseño visual con CSS.
- Maquetación responsive.
- Variables, funciones, objetos y arrays.
- Manipulación del DOM.
- Eventos e interacción con el usuario.
- Consumo de APIs.
- Manejo de datos en formato JSON.
- Almacenamiento local.
- Validación de datos.
- Organización y mantenimiento del código.
- Control de versiones con Git y GitHub.

El desarrollo se realiza de manera incremental, incorporando y probando cada funcionalidad antes de continuar con la siguiente.

---

## 🔧 Estado del proyecto

**Versión académica funcional: Entrega final.**

Se encuentran implementados el catálogo dinámico, el carrito de compras, las validaciones de stock, las notificaciones y el formulario de contacto.

Se realizaron revisiones del diseño responsive, el catálogo, el carrito y el manejo de errores de la API. La versión final se publicará en GitHub Pages tras confirmar los cambios en Git.

---

## 👩‍💻 Autor

**Laura Virginia Rocha Malaver**

Proyecto inspirado en mi emprendimiento **PixelCharms Accesorios**.

💜 *Hecho con dedicación, creatividad y muchas ganas de aprender.*
