"use strict";
import Cart from './cart.js';
import CartModal from './cartModal.js';
import CartUI from './cartUI.js';

function cartInit() {
    // Создаем экземпляр корзины
    const cart = new Cart();
    
    // Создаем и инициализируем модули
    const cartModal = new CartModal(cart);
    const cartUI = new CartUI(cart);
    
    // Делаем доступными глобально (для обработчиков событий в HTML)
    window.cartModal = cartModal;
    
    // Инициализируем UI
    cartUI.initCartUI();
}

export default cartInit;