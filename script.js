document.getElementById('search-add-btn').addEventListener('click', searchOrAddProduct);
document.getElementById('checkout-btn').addEventListener('click', showCheckout);
document.getElementById('confirm-btn').addEventListener('click', confirmOrder);

const products = [
  { id: 1, name: 'Apple', price: 15.0 },
  { id: 2, name: 'Banana', price: 5.0 },
  { id: 3, name: 'Carrot', price: 8.0 },
  { id: 4, name: 'Milk', price: 12.0 },
  { id: 5, name: 'Bread', price: 20.0 },
  { id: 6, name: 'Eggs', price: 25.0 },
  { id: 7, name: 'Cheese', price: 30.0 },
  { id: 8, name: 'Orange', price: 10.0 },
  { id: 9, name: 'Tomato', price: 7.0 },
  { id: 10, name: 'Potato', price: 4.0 },
  { id: 11, name: 'Chicken', price: 50.0 },
  { id: 12, name: 'Beef', price: 70.0 },
  { id: 13, name: 'Fish', price: 60.0 },
  { id: 14, name: 'Rice', price: 10.0 },
  { id: 15, name: 'Pasta', price: 12.0 },
  { id: 16, name: 'Cereal', price: 25.0 },
  { id: 17, name: 'Coffee', price: 35.0 },
  { id: 18, name: 'Tea', price: 15.0 },
  { id: 19, name: 'Juice', price: 20.0 },
  { id: 20, name: 'Water', price: 5.0 },
  { id: 21, name: 'Soda', price: 10.0 },
  { id: 22, name: 'Chips', price: 15.0 },
  { id: 23, name: 'Cookies', price: 20.0 },
  { id: 24, name: 'Ice Cream', price: 30.0 },
  { id: 25, name: 'Yogurt', price: 10.0 },
  // Add more products as needed
];

let cart = [];

function searchOrAddProduct() {
  const searchTerm = document.getElementById('product-search').value.trim();
  const productPrice = parseFloat(document.getElementById('product-price').value.trim());

  if (searchTerm && !isNaN(productPrice) && productPrice > 0) {
    // Check if the product already exists
    const existingProduct = products.find(product => product.name.toLowerCase() === searchTerm.toLowerCase());

    if (!existingProduct) {
      // Add the new product
      const newProduct = {
        id: products.length + 1,
        name: searchTerm,
        price: productPrice
      };
      products.push(newProduct);
      alert(`Product "${newProduct.name}" added with price ₹${newProduct.price.toFixed(2)}`);
    }
  } 

  // Perform search
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredProducts.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - ₹${product.price.toFixed(2)}`;
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.addEventListener('click', () => addToCart(product));
    li.appendChild(button);
    productList.appendChild(li);
  });

  document.getElementById('product-search').value = '';
  document.getElementById('product-price').value = '';
}

function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';
  let totalAmount = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.addEventListener('click', () => removeFromCart(item.id));
    li.appendChild(button);
    cartList.appendChild(li);
    totalAmount += item.price * item.quantity;
  });

  document.getElementById('total-amount').textContent = `Total: ₹${totalAmount.toFixed(2)}`;
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function showCheckout() {
  document.getElementById('checkout-section').classList.remove('hidden');
}

function confirmOrder() {
  const name = document.getElementById('customer-name').value;
  const email = document.getElementById('customer-email').value;

  if (name && email) {
    alert('Order confirmed!');
    cart = [];
    updateCart();
    document.getElementById('checkout-section').classList.add('hidden');
  } else {
    alert('Please fill in all fields.');
  }
}
