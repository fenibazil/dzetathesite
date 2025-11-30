import { slideUp, slideDown, slideToggle } from './animations.js';

function formSubmitListener(e) {
    e.preventDefault();
    const form = e.target;
    slideUp(form);
    const modal = form.closest('.modal');
    if(modal) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('service_tc0fgps', 'template_x64v6v1', this)
            .then(() => {
                console.log('SUCCESS!');
                const closeButton = modal.querySelector('.modal-close');
                slideDown(closeButton);
                const formResult = modal.querySelector('.form-result');
                formResult.innerHTML = formResult.dataset.defaultText;
                slideDown(formResult);
            }, (error) => {
                console.log('FAILED...', error);
                formResult.innerHTML = "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.";
            });
    }
}

export default function formInit() {
    const formSubmit = document.querySelectorAll('form');
    formSubmit.forEach((element) => {
        element.addEventListener('submit', formSubmitListener);
    });
}
