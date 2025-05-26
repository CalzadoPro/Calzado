document.addEventListener("DOMContentLoaded", function() {
    mostrarCarrito();
    mostrarUsuario();
});

// 🔹 Guarda el usuario al iniciar sesión
function guardarUsuario(event) {
    event.preventDefault();
    let usuario = document.getElementById("usuario").value;
    localStorage.setItem("usuario", usuario);
    alert("Usuario guardado: " + usuario);
    window.location.href = "index.html"; // Redirige al inicio
}

// 🔹 Muestra el usuario en el ticket de compra
function mostrarUsuario() {
    let usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
        document.getElementById("usuario-ticket").innerText = usuarioGuardado;
    }
}

// 🔹 Manejo del Carrito de Compras
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// 🔹 Muestra los productos agregados al carrito
function mostrarCarrito() {
    let listaCarrito = document.getElementById("lista-carrito");
    let total = 0;

    listaCarrito.innerHTML = "";
    carrito.forEach((item, index) => {
        listaCarrito.innerHTML += `<p>${item.nombre} - $${item.precio} MXN 
        <button onclick="eliminarProducto(${index})">Eliminar</button></p>`;
        total += item.precio;
    });

    document.getElementById("total-carrito").innerText = total;
}

// 🔹 Elimina un producto específico del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// 🔹 Vacía el carrito por completo
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    carrito = [];
    mostrarCarrito();
}

// 🔹 Genera el ticket de compra con usuario, fecha y productos
function imprimirTicket() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let usuario = localStorage.getItem("usuario") || "Invitado";
    let fechaHora = new Date().toLocaleString();
    let total = 0;

    let listaTicket = document.getElementById("lista-ticket");
    listaTicket.innerHTML = "";
    carrito.forEach(item => {
        listaTicket.innerHTML += `<p>${item.nombre} - $${item.precio} MXN</p>`;
        total += item.precio;
    });

    document.getElementById("fecha-hora").innerText = fechaHora;
    document.getElementById("usuario-ticket").innerText = usuario;
    document.getElementById("total-ticket").innerText = total;

    document.getElementById("ticket").style.display = "block";
}

// 🔹 Imprime el ticket y muestra mensaje de agradecimiento
function imprimirTicketFinal() {
    let usuario = localStorage.getItem("usuario") || "Invitado";

    let nuevaVentana = window.open("", "_blank", "width=400,height=300");
    nuevaVentana.document.write(`
        <html>
        <head><title>Elite Shoes © - Confirmación</title></head>
        <body style="text-align:center; padding:50px;">
            <h1>¡Gracias por tu compra!</h1>
            <h2>${usuario}</h2>
            <p>Esperamos verte pronto en Elite Shoes ©</p>
        </body>
        </html>
    `);
    nuevaVentana.document.close();
}

function imprimirTicketFinal() {
    let ticket = document.getElementById("ticket").innerHTML;
    let usuario = localStorage.getItem("usuario") || "Invitado";

    // Abrimos una nueva ventana y mostramos solo el contenido del ticket
    let nuevaVentana = window.open("", "_blank");
    nuevaVentana.document.write(`
        <html>
        <head><title>Elite Shoes © - Ticket de Compra</title></head>
        <body style="text-align:center; padding:50px;">
            ${ticket}
            <script>
                setTimeout(() => {
                    window.print();
                    setTimeout(() => {
                        window.close();
                        let mensajeVentana = window.open("", "_blank", "width=400,height=300");
                        mensajeVentana.document.write(\`
                            <html>
                            <head><title>Elite Shoes © - Confirmación</title></head>
                            <body style="text-align:center; padding:50px;">
                                <h1>¡Gracias por tu compra!</h1>
                                <h2>${usuario}</h2>
                                <p>Esperamos verte pronto en Elite Shoes ©</p>
                            </body>
                            </html>\`);
                        mensajeVentana.document.close();
                    }, 1000);
                }, 500);
            </script>
        </body>
        </html>
    `);
    nuevaVentana.document.close();
}


function darLike(index) {
    alert("Has dado Like al comentario #" + (index + 1));
}

function darDislike(index) {
    alert("Has dado Dislike al comentario #" + (index + 1));
}

function responder(index) {
    let respuesta = prompt("Escribe tu respuesta:");
    if (respuesta) {
        alert("Respuesta enviada: " + respuesta);
    }
}
