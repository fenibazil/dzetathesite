"use strict";
import CartStorage from './cartStorage.js';

class Cart {
    constructor() {
        this.storage = new CartStorage();
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

export default Cart;