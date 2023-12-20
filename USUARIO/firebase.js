import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Get a reference to the storage service
const storage = getStorage(app);

const loginForm = document.getElementById('login-form');
const productContainer = document.querySelector('.product-container');
const productForm = document.getElementById('product-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin') {
    loginForm.style.display = 'none';
    productContainer.style.display = 'block';
  } else {
    alert('Incorrect username or password.');
  }
});

// Add event listener to the product form
productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the product data from the form
  const data = {
    productName: document.getElementById('product-name').value,
    purchasePrice: Number(document.getElementById('purchase-price').value),
    percentage: Number(document.getElementById('percentage').value),
    salePrice: Number(document.getElementById('purchase-price').value) * (1 + Number(document.getElementById('percentage').value) / 100),
  };

  // Get the product image from the form
  const productImage = document.getElementById('product-image').files[0];

  // Create a reference to the product in the Firestore database
  const productRef = doc(db, 'products', data.productName);

  // Upload the product image to Firebase Storage
  const imageRef = ref(storage, `product-images/${productImage.name}`);
  uploadBytes(imageRef, productImage).then((snapshot) => {
  // Get the URL of the uploaded image
  return snapshot.ref.getDownloadURL();
}).then((downloadURL) => {
  // Add the product image URL to the product data
  data.productImageURL = downloadURL;

  // Save the product data to the Firestore database
  setDoc(productRef, data)
    .then(() => {
      alert('Product added successfully.');
      window.location.reload();
    })
    .catch((error) => {
      alert('Error adding product: ' + error);
    });
  });
});