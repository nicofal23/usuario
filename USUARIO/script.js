  const loginForm = document.getElementById('login-form');
  const productContainer = document.querySelector('.product-container');
  const productForm = document.getElementById('product-form');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
      loginForm.style.display = 'none';
      productContainer.style.display = 'block';
    } else {
      alert('Incorrect username or password.');
    }
  });

  productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = document.getElementById('product-name').value;
    const purchasePrice = document.getElementById('purchase-price').value;
    const percentage = document.getElementById('percentage').value;
    const salePrice = purchasePrice * (1 + percentage / 100);
    const productImage = document.getElementById('product-image').files[0];

    const data = {
      productName,
      purchasePrice,
      percentage,
      salePrice,
    };

    // Agrega la información del producto a Firebase Storage y Firestore
    addProductToFirebase(data, productImage);
  });

  import { collection, ref, put } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


  function addProductToFirebase(data, image) {
  // Guarda la información del producto en Firestore
  collection(db, 'products').add(data)
    .then((docRef) => {
      // Sube la imagen a Firebase Storage
      const storageRef = ref(storage, `product-images/${docRef.id}`);
      put(storageRef, image).then(() => {
        alert('Product added successfully.');
        window.location.reload();
      });
    })
    .catch((error) => {
      alert('Error adding product: ' + error);
    });
}
