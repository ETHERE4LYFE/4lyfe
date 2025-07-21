document.addEventListener('DOMContentLoaded', function() {
    const lyfeButton = document.getElementById('lyfe-button');
    const backButton = document.getElementById('back-button');
    const mainSection = document.getElementById('main-section');
    const secondarySection = document.getElementById('secondary-section');

    // Ir a sección secundaria
    lyfeButton.addEventListener('click', function() {
        mainSection.classList.add('hidden');
        secondarySection.classList.remove('hidden');
    });

    // Volver a sección principal
    backButton.addEventListener('click', function() {
        secondarySection.classList.add('hidden');
        mainSection.classList.remove('hidden');
    });
});