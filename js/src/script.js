"use strict";
import func from './functions.js';
import modalInit from './modal.js';
import formInit from './form.js';
import cartInit from './cart/cartInit.js';

func.onDocumentReady(function() {
    modalInit();
    formInit();
    cartInit();
});