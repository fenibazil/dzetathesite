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

export default CartStorage;