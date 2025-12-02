/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/src/animations.js":
/*!******************************!*\
  !*** ./js/src/animations.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* SLIDE UP */
let slideUp = (target, duration=300) => {

    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
          target.style.display = 'none';
          target.style.removeProperty('height');
          target.style.removeProperty('padding-top');
          target.style.removeProperty('padding-bottom');
          target.style.removeProperty('margin-top');
          target.style.removeProperty('margin-bottom');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
          //alert("!");
    }, duration);
}

/* SLIDE DOWN */
let slideDown = (target, duration=300) => {

    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
}

/* TOOGLE */
var slideToggle = (target, duration = 300) => {
    if (window.getComputedStyle(target).display === 'none') {
      return slideDown(target, duration);
    } else {
      return slideUp(target, duration);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    slideUp,
    slideDown,
    slideToggle
});


/***/ }),

/***/ "./js/src/cart/cart.js":
/*!*****************************!*\
  !*** ./js/src/cart/cart.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cartStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cartStorage.js */ "./js/src/cart/cartStorage.js");



class Cart {
    constructor() {
        this.storage = new _cartStorage_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.currentProduct = null;
    }

    setCurrentProduct(product) {
        this.currentProduct = product;
    }

    addToCart(quantity) {
        if (!this.currentProduct) {
            console.error('Товар не выбран');
            return false;
        }
        
        const cartItems = this.storage.getCart();
        const existingItem = cartItems.find(item => item.id === this.currentProduct.id);
        
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cartItems.push({
                ...this.currentProduct,
                quantity: parseInt(quantity)
            });
        }
        
        this.storage.saveCart(cartItems);
        this.updateCartBadge();
        return true;
    }

    removeFromCart(productId) {
        const cartItems = this.storage.getCart();
        const filteredItems = cartItems.filter(item => item.id !== productId);
        this.storage.saveCart(filteredItems);
        this.updateCartBadge();
        return filteredItems;
    }

    updateQuantity(productId, newQuantity) {
        const cartItems = this.storage.getCart();
        const itemIndex = cartItems.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            if (newQuantity <= 0) {
                cartItems.splice(itemIndex, 1);
            } else {
                cartItems[itemIndex].quantity = newQuantity;
            }
            this.storage.saveCart(cartItems);
        }
        
        this.updateCartBadge();
        return cartItems;
    }

    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.storage.getItemCount();
        
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        });
    }

    getCartItems() {
        return this.storage.getCart();
    }

    getCartTotal() {
        return this.storage.getTotalPrice();
    }

    clearCart() {
        this.storage.clearCart();
        this.updateCartBadge();
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cart);

/***/ }),

/***/ "./js/src/cart/cartInit.js":
/*!*********************************!*\
  !*** ./js/src/cart/cartInit.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart.js */ "./js/src/cart/cart.js");
/* harmony import */ var _cartModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cartModal.js */ "./js/src/cart/cartModal.js");
/* harmony import */ var _cartUI_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cartUI.js */ "./js/src/cart/cartUI.js");





function cartInit() {
    // Создаем экземпляр корзины
    const cart = new _cart_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    
    // Создаем и инициализируем модули
    const cartModal = new _cartModal_js__WEBPACK_IMPORTED_MODULE_1__["default"](cart);
    const cartUI = new _cartUI_js__WEBPACK_IMPORTED_MODULE_2__["default"](cart);
    
    // Делаем доступными глобально (для обработчиков событий в HTML)
    window.cartModal = cartModal;
    
    // Инициализируем UI
    cartUI.initCartUI();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cartInit);

/***/ }),

/***/ "./js/src/cart/cartModal.js":
/*!**********************************!*\
  !*** ./js/src/cart/cartModal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


class CartModal {
    constructor(cartInstance) {
        this.cart = cartInstance;
        this.initModals();
    }

    initModals() {
        // Создаем модальное окно успешного добавления
        this.createAddToCartModal();
        // Создаем модальное окно корзины
        this.createCartModal();
        // Создаем модальное окно оформления заказа
        this.createCartSendModal();
    }

    createAddToCartModal() {
        const modalHTML = `
            <div id="add-to-cart-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <span class="modal-close">Закрыть</span>
                    <h3>Товар успешно добавлен в корзину!</h3>
                    <div class="modal-buttons">
                        <button id="go-to-cart-btn" class="">Перейти в корзину</button>
                    </div>
                </div>
            </div>
        `;
        
        if (!document.getElementById('add-to-cart-modal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.bindAddToCartModalEvents();
        }
    }

    createCartModal() {
        const modalHTML = `
            <div id="cart-modal" class="modal" style="display: none;">
                <div class="modal-content cart-modal-content">
                    <span class="modal-close">Закрыть</span>
                    <h2>Корзина</h2>
                    <div id="cart-items-container"></div>
                    <div id="cart-total" class="cart-total">
                        <h3>Итого: <span id="total-price">0</span> руб.</h3>
                    </div>
                    <button id="checkout-btn" class="">Оформить заказ</button>
                </div>
            </div>
        `;
        
        if (!document.getElementById('cart-modal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.bindCartModalEvents();
        }
    }

    createCartSendModal() {
        const modalHTML = `
            <div id="cart-send-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <span class="modal-close">Закрыть</span>
                    <h2>Оформление заказа</h2>
                    <div id="cart-order-summary"></div>
                    <form id="cart-order-form">
                        <div class="group-item">
                            <label for="cart-order-name">ФИО *</label>
                            <input type="text" id="cart-order-name" name="name" placeholder="Введите ваше ФИО" required>
                        </div>
                        <div class="group-item">
                            <label for="cart-order-phone">Телефон *</label>
                            <input type="tel" id="cart-order-phone" name="phone" placeholder="+7 999 999 99 99" required>
                        </div>
                        <div class="group-item">
                            <label for="cart-order-email">Email *</label>
                            <input type="email" id="cart-order-email" name="email" placeholder="example@mail.ru" required>
                        </div>
                        <div class="group-item">
                            <label for="cart-order-comment">Комментарий к заказу</label>
                            <textarea id="cart-order-comment" name="comment" placeholder="Дополнительные пожелания..." rows="3"></textarea>
                        </div>
                        <button type="submit" class="js_order-send-button">Отправить заказ</button>
                    </form>
                </div>
            </div>
        `;
        
        if (!document.getElementById('cart-send-modal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.bindCartSendModalEvents();
        }
    }

    bindAddToCartModalEvents() {
        const modal = document.getElementById('add-to-cart-modal');
        const closeBtn = modal.querySelector('.modal-close');
        const goToCartBtn = document.getElementById('go-to-cart-btn');

        closeBtn.onclick = () => this.hideModal('add-to-cart-modal');
        goToCartBtn.onclick = () => {
            this.hideModal('add-to-cart-modal');
            this.showModal('cart-modal');
            this.updateCartModal();
        };

        modal.onclick = (e) => {
            if (e.target === modal) this.hideModal('add-to-cart-modal');
        };
    }

    bindCartModalEvents() {
        const modal = document.getElementById('cart-modal');
        const closeBtn = modal.querySelector('.modal-close');
        const checkoutBtn = document.getElementById('checkout-btn');

        closeBtn.onclick = () => this.hideModal('cart-modal');
        checkoutBtn.onclick = () => {
            this.hideModal('cart-modal');
            this.showCartSendModal();
        };

        modal.onclick = (e) => {
            if (e.target === modal) this.hideModal('cart-modal');
        };
    }

    bindCartSendModalEvents() {
        const modal = document.getElementById('cart-send-modal');
        const closeBtn = modal.querySelector('.modal-close');
        const form = document.getElementById('cart-order-form');

        closeBtn.onclick = () => this.hideModal('cart-send-modal');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitOrder(form);
        });

        modal.onclick = (e) => {
            if (e.target === modal) this.hideModal('cart-send-modal');
        };
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
        if (modalId === 'cart-modal') {
            this.updateCartModal();
        } else if (modalId === 'cart-send-modal') {
            this.updateCartSendModal();
        }
    }

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    showCartSendModal() {
        this.showModal('cart-send-modal');
    }

    updateCartModal() {
        const container = document.getElementById('cart-items-container');
        const totalPrice = document.getElementById('total-price');
        const items = this.cart.getCartItems();
        
        if (items.length === 0) {
            container.innerHTML = '<p>Корзина пуста</p>';
            totalPrice.textContent = '0';
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image || './images/product-default.jpg'}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">Цена: ${item.price} руб./кг</div>
                    <div class="cart-item-quantity">
                        <input type="number" value="${item.quantity}" min="1" 
                               onchange="window.cartModal.updateQuantity(${item.id}, parseInt(this.value))">
                        <span class="cart-item-unit">кг</span>
                        <button class="button quantity-btn minus" onclick="window.cartModal.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <button class="button quantity-btn plus" onclick="window.cartModal.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <div class="cart-item-sum">${item.price * item.quantity} руб.</div>
                    <button class="button remove-button" onclick="window.cartModal.removeItem(${item.id})">×</button>
                </div>
            </div>
        `).join('');

        totalPrice.textContent = this.cart.getCartTotal();
    }

    updateCartSendModal() {
        const summaryContainer = document.getElementById('cart-order-summary');
        const items = this.cart.getCartItems();
        
        if (items.length === 0) {
            summaryContainer.innerHTML = '<p>Корзина пуста</p>';
            return;
        }

        summaryContainer.innerHTML = `
            <div class="cart-summary">
                <h3>Состав заказа:</h3>
                <div class="cart-summary-items">
                    ${items.map(item => `
                        <div class="cart-summary-item">
                            <div class="cart-summary-name">${item.name} <span>${item.quantity} кг.</span></div>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary-total">
                    <strong>Итого: ${this.cart.getCartTotal()} руб.</strong>
                </div>
            </div>
        `;
    }

    updateQuantity(productId, newQuantity) {
        this.cart.updateQuantity(productId, newQuantity);
        this.updateCartModal();
    }

    removeItem(productId) {
        this.cart.removeFromCart(productId);
        this.updateCartModal();
    }

    submitOrder(form) {
        const cartItems = this.cart.getCartItems();
        
        if (cartItems.length === 0) {
            alert('Корзина пуста. Добавьте товары перед оформлением заказа.');
            return;
        }

        const formData = new FormData(form);
        
        // Формируем детали заказа
        const orderDetails = this.generateOrderDetails(cartItems);
        
        const orderData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            comment: formData.get('comment') || '',
            cart: orderDetails,
            order_details: orderDetails,
            total_amount: this.cart.getCartTotal(),
            date: new Date().toLocaleString('ru-RU'),
            products: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            }))
        };

        // Отправка через EmailJS
        this.sendOrderEmail(orderData, form);
    }

    generateOrderDetails(cartItems) {
        let details = "Детали заказа:\n\n";
        
        cartItems.forEach((item, index) => {
            details += `${index + 1}. ${item.name}\n`;
            details += `   Количество: ${item.quantity} кг\n`;
            details += `   Цена за кг: ${item.price} руб.\n`;
            details += `   Сумма: ${item.price * item.quantity} руб.\n\n`;
        });
        
        details += `Общая сумма заказа: ${this.cart.getCartTotal()} руб.`;
        
        return details;
    }

    sendOrderEmail(orderData, form) {
        // Замените на свои реальные ID из EmailJS
        const serviceID = 'service_tc0fgps';
        const templateID = 'template_x64v6v1';
        
        emailjs.send(serviceID, templateID, orderData)
            .then(() => {
                this.showSuccessMessage();
                this.cart.clearCart();
                form.reset();
                this.hideModal('cart-send-modal');
                this.hideModal('cart-modal');
                this.updateCartModal();
            })
            .catch(error => {
                console.error('Ошибка отправки заказа:', error);
                alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
            });
    }

    showSuccessMessage() {
        const successModal = document.getElementById('cart-success-modal');
        
        if (!successModal) {
            const successHTML = `
                <div id="cart-success-modal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <span class="modal-close" onclick="this.parentElement.parentElement.style.display='none'">Закрыть</span>
                        <h3>Заказ успешно сформирован!</h3>
                        <p>С вами свяжутся в ближайшее время для подтверждения заказа.</p>
                        <button onclick="this.parentElement.parentElement.style.display='none'">OK</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', successHTML);
        }
        
        document.getElementById('cart-success-modal').style.display = 'flex';
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartModal);

/***/ }),

/***/ "./js/src/cart/cartStorage.js":
/*!************************************!*\
  !*** ./js/src/cart/cartStorage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class CartStorage {
    constructor() {
        this.key = 'dzetaflux_cart';
    }

    getCart() {
        const cart = localStorage.getItem(this.key);
        return cart ? JSON.parse(cart) : [];
    }

    saveCart(cartItems) {
        localStorage.setItem(this.key, JSON.stringify(cartItems));
        console.log(cartItems);
    }

    clearCart() {
        localStorage.removeItem(this.key);
    }

    getItemCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartStorage);

/***/ }),

/***/ "./js/src/cart/cartUI.js":
/*!*******************************!*\
  !*** ./js/src/cart/cartUI.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });


class CartUI {
    constructor(cartInstance) {
        this.cart = cartInstance;
    }

    initCartUI() {
        this.addCartIconToPage();
        this.bindAddToCartButton();
        this.updateCartBadge();
    }

    addCartIconToPage() {
        // Проверяем, не добавлена ли уже иконка корзины
        if (!document.querySelector('.cart-icon-container')) {
            const cartIconHTML = `
                <div class="cart-icon-container">
                    <div class="cart-icon" onclick="window.cartModal.showModal('cart-modal')">
                        🛒
                        <span class="cart-badge">0</span>
                    </div>
                </div>
            `;
            
            // Вставляем перед последним элементом
            document.body.insertAdjacentHTML('beforeend', cartIconHTML);
        }
    }

    bindAddToCartButton() {
        const addButton = document.querySelector('.js_add-to-cart');
        const quantityInput = document.querySelector('.js_add-to-cart-quantity');
        const productIdElement = document.querySelector('.js_add-to-cart-id');
        const productNameElement = document.querySelector('.js_product-name');
        const productPriceElement = document.querySelector('.js_product-price');
        const productImageElement = document.querySelector('.js_product-image');
        
        if (!addButton || !quantityInput) return;
        
        addButton.addEventListener('click', () => {
            const quantity = quantityInput.value || 1;
            
            // Получаем данные о товаре с помощью маяков
            const productData = this.getProductData(
                productIdElement,
                productNameElement,
                productPriceElement,
                productImageElement
            );
            
            if (!productData) {
                console.error('Не удалось получить данные о товаре');
                return;
            }
            
            // Устанавливаем текущий товар в корзине
            this.cart.setCurrentProduct(productData);
            
            if (this.cart.addToCart(quantity)) {
                this.showAddToCartModal();
            }
        });
    }

    getProductData(idElement, nameElement, priceElement, imageElement) {
        // Получаем ID товара
        let productId = 1; // значение по умолчанию
        
        if (idElement) {
            // Пробуем получить из data-атрибута или текста
            productId = idElement.dataset.productId || 
                        idElement.textContent.trim() || 
                        idElement.value;
            
            // Парсим как число, если возможно
            productId = isNaN(parseInt(productId)) ? productId : parseInt(productId);
        }
        
        // Получаем название товара
        let productName = 'Товар';
        if (nameElement) {
            productName = nameElement.textContent.trim();
        }
        
        // Получаем цену товара
        let productPrice = 1000; // значение по умолчанию
        if (priceElement) {
            let priceText = priceElement.textContent.trim();
            // Извлекаем только числа из текста
            const priceMatch = priceText.match(/\d+/g);
            if (priceMatch && priceMatch.length > 0) {
                productPrice = parseInt(priceMatch[0]);
            }
            
            // Пробуем получить из data-атрибута
            if (priceElement.dataset.price) {
                productPrice = parseInt(priceElement.dataset.price);
            }
        }
        
        // Получаем изображение товара
        let productImage = './images/product-default.jpg';
        if (imageElement) {
            productImage = imageElement.src || 
                          imageElement.dataset.src || 
                          imageElement.getAttribute('data-image');
        }
        
        return {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        };
    }

    showAddToCartModal() {
        if (window.cartModal) {
            window.cartModal.showModal('add-to-cart-modal');
        }
    }

    updateCartBadge() {
        this.cart.updateCartBadge();
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartUI);

/***/ }),

/***/ "./js/src/form.js":
/*!************************!*\
  !*** ./js/src/form.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formInit)
/* harmony export */ });
/* harmony import */ var _animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations.js */ "./js/src/animations.js");


function formSubmitListener(e) {
    e.preventDefault();
    const form = e.target;
    const modal = form.closest('.modal');
    if(modal && modal.classList.contains('')) {
        event.preventDefault();
        _animations_js__WEBPACK_IMPORTED_MODULE_0__["default"].slideUp(form);
        // these IDs from the previous steps
        emailjs.sendForm('service_tc0fgps', 'template_x64v6v1', this)
            .then(() => {
                console.log('SUCCESS!');
                const closeButton = modal.querySelector('.modal-close');
                _animations_js__WEBPACK_IMPORTED_MODULE_0__["default"].slideDown(closeButton);
                const formResult = modal.querySelector('.form-result');
                formResult.innerHTML = formResult.dataset.defaultText;
                _animations_js__WEBPACK_IMPORTED_MODULE_0__["default"].slideDown(formResult);
            }, (error) => {
                console.log('FAILED...', error);
                formResult.innerHTML = "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.";
            });
    }
}

function formInit() {
    const formSubmit = document.querySelectorAll('form');
    formSubmit.forEach((element) => {
        element.addEventListener('submit', formSubmitListener);
    });
}


/***/ }),

/***/ "./js/src/functions.js":
/*!*****************************!*\
  !*** ./js/src/functions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function onDocumentReady(callback) {
    if (document.readyState === "loading") {
        // Если документ еще загружается, ждем события DOMContentLoaded
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        // Если документ уже загружен, выполняем сразу
        callback();
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    onDocumentReady
});

/***/ }),

/***/ "./js/src/modal.js":
/*!*************************!*\
  !*** ./js/src/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modalInit)
/* harmony export */ });
function openModal(e) {
    if(e.target.dataset.modal) {
        let modal = document.getElementById(e.target.dataset.modal);
        if(e.target.dataset.modalTitle) {
            modal.querySelector('.modal-title').innerHTML = e.target.dataset.modalTitle;
        }
        modal.style.display = "flex";
    }
}
function closeModal(e) {
    let modal = e.target.closest('.modal');
    if(modal) {
        modal.style.display = "none";
    }
}
function closeModalButton(e) {
    closeModal(e);
}
function closeModalWindow(e) {
    if(!e.target.closest('.modal-content')) {
        closeModal(e);
    }
}

function modalInit() {
    const orderButton = document.querySelectorAll('.js_order-button');
    orderButton.forEach((element) => {
        element.addEventListener('click', openModal);
    });
    const modalWindow = document.querySelectorAll('.modal');
    modalWindow.forEach((element) => {
        element.addEventListener('click', closeModalWindow);
    });
    const modalClose = document.querySelectorAll('.modal-close');
    modalClose.forEach((element) => {
        element.addEventListener('click', closeModalButton);
    });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./js/src/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions.js */ "./js/src/functions.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./js/src/modal.js");
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form.js */ "./js/src/form.js");
/* harmony import */ var _cart_cartInit_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart/cartInit.js */ "./js/src/cart/cartInit.js");






_functions_js__WEBPACK_IMPORTED_MODULE_0__["default"].onDocumentReady(function() {
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_form_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_cart_cartInit_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=scripts.js.map