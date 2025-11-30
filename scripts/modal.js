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

export default function modalInit() {
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