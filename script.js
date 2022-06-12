const cartBtn = document.querySelector(".cart-cart");
const cartModal = document.querySelector(".cart");
const cartClose = document.querySelector("#close-cart");
const addToCartBtns = Array.from(document.querySelectorAll(".product-cart"));
const cartContent = document.querySelector(".cart-content");
const totalBox = document.querySelector(".total-price");
const buyBtn = document.querySelector(".btn-buy");
const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
// OPEN / CLOSE CART

cartBtn.addEventListener("click", () => {
  cartModal.classList.remove("cart-hidden");
});

cartClose.addEventListener("click", () => {
  cartModal.classList.add("cart-hidden");
});

// ADD TO CART

addToCartBtns.forEach((e) => {
  e.addEventListener("click", addToCart);
});

function addToCart(e) {
  btn = e.target;
  let productCard = btn.closest(".product-card");
  let productTitle =
    productCard.getElementsByClassName("product-title")[0].innerText;
  let productImg = productCard.firstElementChild.src;
  let price = parseFloat(
    productCard
      .getElementsByClassName("product-price")[0]
      .innerText.replace("$", "")
  );

  let uniqueArr = Array.from(document.querySelectorAll(".cart-product-title"));
  for (let i = 0; i < uniqueArr.length; i++) {
    if (uniqueArr[i].innerText.toLowerCase() == productTitle.toLowerCase()) {
      alert("Already Added");
      return;
    }
  }

  const markup = `
        <div class="cart-box">
        <img src="${productImg}" alt="" class="cart-img" />
        <div class="detail-box">
          <div class="cart-product-title">${productTitle}</div>
          <div class="cart-price">$${price}</div>
          <input type="number" value="1" class="cart-quantity" />
        </div>
        <i class="fa-solid fa-x cart-remove"></i>
      </div>
  `;
  cartContent.insertAdjacentHTML("beforeend", markup);

  const removeBtn = Array.from(document.querySelectorAll(".cart-remove"));
  removeBtn.forEach((e) => {
    e.addEventListener("click", removeFromCart);
  });
  const quantityBtns = document.querySelectorAll(".cart-quantity");

  quantityBtns.forEach((e) => {
    e.addEventListener("change", quantityChanged);
  });
  updateTotal();
}

// REMOVE FROM CART

function removeFromCart(e) {
  let btn = e.target;
  btn.closest(".cart-box").remove();
  updateTotal();
}

// UPDATE TOTAL

function updateTotal() {
  let cartBoxes = Array.from(document.querySelectorAll(".cart-box"));
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    quantity = quantityElement.value;

    total = total + price * quantity;
  }
  totalBox.innerHTML = `$${total.toFixed(2)}`;
}
updateTotal();

// QUANTITY CHANGED

function quantityChanged(e) {
  btnValue = parseFloat(e.target.value);

  if (btnValue < 1 || isNaN(btnValue)) {
    e.target.value = 1;
  }
  updateTotal();
}

// BUY ALL

buyBtn.addEventListener("click", buyItems);

function buyItems() {
  let cartBoxes = Array.from(document.querySelectorAll(".cart-box"));
  if (cartBoxes.length === 0) return;
  renderSpinner();
  let spinner = document.querySelector(".fa-spinner");

  setTimeout(() => {
    cartBoxes.forEach((e) => e.remove());
    updateTotal();
    modal.classList.remove("modal-hidden");
    modalBg.classList.remove("modal-hidden");
    spinner.style.display = "none";
    console.log(spinner);
  }, 1000);
  window.addEventListener("click", clicked);
}

function modalHidden() {
  modal.classList.add("modal-hidden");
  modalBg.classList.add("modal-hidden");
}

modalClose.addEventListener("click", closeModal);
function closeModal() {
  modalHidden();
}

function clicked(e) {
  let position = e.target;
  if (position.className != "modal") {
    modalHidden();
  }
}

function renderSpinner() {
  const markup = `
      <i class="fa-solid fa-spinner"></i>
`;
  buyBtn.insertAdjacentHTML("afterend", markup);
}
