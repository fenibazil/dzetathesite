"use strict";
import func from './functions.js';
import modalInit from './modal.js';
import formInit from './form.js';

console.log(111);
func.onDocumentReady(function() {
    modalInit();
    formInit();
});