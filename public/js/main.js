// Menú móvil
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav ul');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        }
    });
});

// FORMULARIO DE CONTACTO - VERSIÓN CORREGIDA
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const datos = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        if (!datos.nombre || !datos.email) {
            formMessage.textContent = '⚠️ Nombre y correo son obligatorios';
            formMessage.style.color = '#f97316';
            return;
        }
        
        try {
            // ✅ RUTA CORRECTA: api/contactos (con "os", NO "s")
            const response = await fetch('/api/contactos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            
            if (response.ok) {
                formMessage.textContent = '✅ ¡Mensaje enviado! Te contactaremos pronto.';
                formMessage.style.color = '#4ade80';
                form.reset();
                console.log('Mensaje guardado correctamente');
            } else {
                const error = await response.json();
                formMessage.textContent = '❌ Error: ' + (error.error || 'Intenta de nuevo');
                formMessage.style.color = '#ef4444';
                console.error('Error del servidor:', error);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            formMessage.textContent = '❌ Error de conexión con el servidor.';
            formMessage.style.color = '#ef4444';
        }
        
        setTimeout(() => {
            formMessage.textContent = '';
        }, 4000);
    });
} else {
    console.error('No se encontró el formulario');
}