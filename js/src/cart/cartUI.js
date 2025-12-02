"use strict";

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

export default CartUI;