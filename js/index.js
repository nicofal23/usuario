function verificarLogin() {
    console.log('Formulario enviado');
    
    // Get the values entered by the user
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    // Check if the entered username and password are correct
    if (usuario === 'admin' && contrasena === 'admin') {
      // If correct, replace the current page with home.html
      window.location.replace('home.html');
    } else {
      // If incorrect, show an error message (you can customize this part)
      alert('Usuario o contraseña incorrectos');
    }
}
