// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5QoROuHqFKvIgUNvcVL3NUK3Ajdklx0w",
  authDomain: "miacumple-7f700.firebaseapp.com",
  projectId: "miacumple-7f700",
  databaseURL: "https://cumplemia-a876f-default-rtdb.firebaseio.com/",
  storageBucket: "miacumple-7f700.appspot.com",
  messagingSenderId: "776132427622",
  appId: "1:776132427622:web:bb9cfe9a675c0d2689d2a7"
};

// Initialize Firebase
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
  })
  .catch((error) => {
    console.error("Error al guardar el mensaje: ", error);
  });
}
