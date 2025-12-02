"use strict";

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

export default CartModal;