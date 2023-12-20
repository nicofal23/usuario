function verificarLogin() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Verifica si el usuario y la contraseña ingresados coinciden con los valores especificados
    if (usuario === "admin" && contrasena === "1234") {
        // Redirige a la página home.html
        window.location.href = "home.html";
    } else {
        // Agrega cualquier lógica adicional para credenciales incorrectas si es necesario
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }

    // Evita que el formulario se envíe de la manera tradicional
    return false;
}