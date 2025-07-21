document.addEventListener('DOMContentLoaded', function() {
    // Validación de contraseña mejorada para móviles
    const claveInput = document.getElementById("clave");
    
    claveInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validar();
        }
    });
});

function validar() {
    const clave = document.getElementById("clave").value.toUpperCase();
    const acceso = document.getElementById("acceso");
    const mensaje = document.getElementById("mensaje");

    if (clave === "ETHERE4LYFE") {
        acceso.style.display = "none";
        // Restaurar el scroll después de quitar la pantalla de acceso
        document.body.style.overflow = "auto";
    } else {
        mensaje.textContent = "Contraseña incorrecta.";
        // Agregar animación de vibración para feedback
        acceso.style.animation = "shake 0.5s";
        setTimeout(() => {
            acceso.style.animation = "";
        }, 500);
    }
}

// Agregar esto al CSS para la animación de shake
/*
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
*/