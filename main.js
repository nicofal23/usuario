import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import { get } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  databaseURL: "https://cumplemia-a876f-default-rtdb.firebaseio.com/",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

document.getElementById('enviarBtn').addEventListener('click', () => {
  const textoInput = document.getElementById('textoInput').value;
  guardarEnFirebase(textoInput);
});

function guardarEnFirebase(texto) {
  const newDataRef = push(ref(database, 'mensajes'));
  set(newDataRef, {
    mensaje: texto
  })
  .then(() => {
    console.log("Mensaje guardado correctamente en Firebase.");
    mostrarMensajes(); // Llamar a la función para mostrar mensajes después de guardar uno nuevo
  })
  .catch((error) => {
    console.error("Error al guardar el mensaje: ", error);
  });
}

function mostrarMensajes() {
  const listaMensajes = document.getElementById('mostrarLista');
  listaMensajes.innerHTML = ''; // Limpiar la lista antes de agregar mensajes nuevos

  // Obtener los mensajes de Firebase y mostrarlos en el elemento listaMensajes
  const mensajesRef = ref(database, 'mensajes');
  onValue(mensajesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      Object.values(data).forEach((mensaje) => {
        const listItem = document.createElement('p');
        listItem.textContent = mensaje.mensaje;
        listaMensajes.appendChild(listItem);
      });
    } else {
      console.log("No hay mensajes en Firebase.");
    }
  }, (error) => {
    console.error("Error al obtener los mensajes: ", error);
  });
}

// Llamar a la función mostrarMensajes al cargar la página para mostrar los mensajes existentes
mostrarMensajes();








document.getElementById('iniciarSesionBtn').addEventListener('click', iniciarSesion);

function iniciarSesion() {
  const nombreUsuario = document.getElementById('nombreUsuario').value;
  const contrasena = document.getElementById('contrasena').value;

  // Realiza una consulta a la base de datos para verificar las credenciales
  const usuarioRef = ref(database, 'usuario');
  get(usuarioRef).then((snapshot) => {
    if (snapshot.exists()) {
      const usuario = snapshot.val().usuario;
      const clave = snapshot.val().clave;

      // Verifica si las credenciales son correctas
      if (nombreUsuario === usuario && contrasena === clave) {
        // Muestra el contenido deseado (en este caso, la lista) en un modal
        mostrarModal();
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } else {
      alert('Usuario no encontrado');
    }
  }).catch((error) => {
    console.error("Error al obtener el usuario: ", error);
  });
}

function mostrarModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}