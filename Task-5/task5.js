 const products = [
      { id: 1, name: "Sunflower Oil", quantity: "1L", price: 120, image: "https://cdn-icons-png.flaticon.com/128/5037/5037447.png" },
      { id: 2, name: "Sugar", quantity: "1kg", price: 50, image: "https://cdn-icons-gif.flaticon.com/14324/14324578.gif" },
      { id: 3, name: "Wheat Flour", quantity: "5kg", price: 200, image: "https://cdn-icons-gif.flaticon.com/17904/17904980.gif" },
      { id: 4, name: "Milk", quantity: "500ml", price: 30, image: "https://cdn-icons-gif.flaticon.com/17904/17904980.gif" },
      { id: 1, name: "Wireless Headphones", price: 1999, image: "https://cdn-icons-gif.flaticon.com/8720/8720250.gif" },
      { id: 2, name: "Smartwatch", price: 2499, image: "https://cdn-icons-gif.flaticon.com/19003/19003912.gif" },
      { id: 3, name: "Bluetooth Speaker", price: 1599, image: "https://cdn-icons-png.flaticon.com/128/2743/2743475.png" },
      { id: 4, name: "USB-C Cable", price: 299, image: "https://cdn-icons-gif.flaticon.com/18998/18998175.gif" },
      { id: 5, name: "Gaming Mouse", price: 799, image: "https://cdn-icons-gif.flaticon.com/18830/18830737.gif" },
      { id: 6, name: "LED Monitor", price: 7999, image: "https://cdn-icons-png.flaticon.com/128/512/512960.png" }
    ];

    let cart = [];

    const cartIcon = document.getElementById('cartIcon');
    const cartDiv = document.getElementById('cart');
    const productList = document.getElementById('productList');
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cart-summary');
    const loginPopup = document.getElementById('loginPopup');
    const userGreeting = document.getElementById('userGreeting');

    // On Load
    window.onload = () => {
      if (!localStorage.getItem("username")) {
        loginPopup.classList.remove("hidden");
      } else {
        userGreeting.innerText = `Hi, ${localStorage.getItem("username")}`;
      }
      renderProducts();
    };

    function renderProducts() {
      productList.innerHTML = '';
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${p.image}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p>Quantity: ${p.quantity}</p>
          <p>Price: ₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
      });
    }

    function addToCart(id) {
      const product = products.find(p => p.id === id);
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      updateCart();
    }

    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          ${item.name} x ${item.qty} = ₹${item.price * item.qty}
          <button onclick="removeItem(${item.id})">Remove</button>
        `;
        cartItems.appendChild(div);
      });
      cartSummary.innerText = `Total: ₹${total}`;
      cartIcon.setAttribute('data-count', cart.reduce((sum, i) => sum + i.qty, 0));
    }

    function removeItem(id) {
      cart = cart.filter(i => i.id !== id);
      updateCart();
    }

    cartIcon.onclick = () => {
      cartDiv.classList.toggle('hidden');
    };

    let isLogin = true;
    document.getElementById("toggleForm").onclick = () => {
      isLogin = !isLogin;
      document.getElementById("formTitle").innerText = isLogin ? "Login" : "Create Account";
      document.getElementById("toggleForm").innerText = isLogin ? "Create Account" : "Already have an account? Login";
    };

    function submitForm() {
      const username = document.getElementById("username").value;
      if (username.trim() !== "") {
        localStorage.setItem("username", username);
        userGreeting.innerText = `Hi, ${username}`;
        loginPopup.classList.add("hidden");
      } else {
        alert("Please enter a valid username");
      }
    }