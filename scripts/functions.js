function onDocumentReady(callback) {
    if (document.readyState === "loading") {
        // Если документ еще загружается, ждем события DOMContentLoaded
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        // Если документ уже загружен, выполняем сразу
        callback();
    }
}

export default {
    onDocumentReady
};