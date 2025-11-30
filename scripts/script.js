import onDocumentReady from './functions.js';
import modalInit from './modal.js';
import formInit from './form.js';
import { slideUp, slideDown, slideToggle } from './animations.js';


onDocumentReady(function() {
    modalInit();
    formInit();
});