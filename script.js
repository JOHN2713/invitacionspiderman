// Variables globales
let selectedHoddie = '';
let selectedDate = '';
let userEmail = '';
let noClickCount = 0;

// Elementos del DOM
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');
const finalMessage = document.getElementById('finalMessage');

const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const btnHoddies = document.querySelectorAll('.btn-hoddie');
const btnDates = document.querySelectorAll('.btn-date');
const btnConfirm = document.getElementById('btnConfirm');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');

// PASO 1: Efecto del botón NO
btnNo.addEventListener('click', function() {
    noClickCount++;
    
    // Hacer el botón SÍ cada vez más grande
    const newScale = 1 + (noClickCount * 0.3);
    btnYes.style.transform = `scale(${newScale})`;
    btnYes.style.transition = 'transform 0.5s ease';
    
    // Hacer el botón NO cada vez más pequeño
    const noScale = Math.max(0.1, 1 - (noClickCount * 0.2));
    btnNo.style.transform = `scale(${noScale})`;
    
    // Mover el botón NO a una posición aleatoria
    const maxX = window.innerWidth - btnNo.offsetWidth - 100;
    const maxY = window.innerHeight - btnNo.offsetHeight - 100;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    
    // Cambiar el texto del botón NO con mensajes divertidos
    const noMessages = [
        'No',
        '¿Segura? 🥺',
        'Piénsalo bien',
        'Dale una oportunidad',
        'Por favor 🙏',
        'Anda sí...',
        'Te lo pido 💕',
        'Mira el botón SÍ',
        'Es Spider-Man 🕷️',
        'Ya casi...'
    ];
    
    if (noClickCount < noMessages.length) {
        btnNo.querySelector('span').textContent = noMessages[noClickCount];
    }
    
    // Después de 5 clics, esconder el botón NO
    if (noClickCount >= 5) {
        btnNo.style.opacity = '0';
        btnNo.style.pointerEvents = 'none';
        
        // Añadir un mensaje especial
        const specialMsg = document.createElement('p');
        specialMsg.className = 'special-message';
        specialMsg.style.cssText = `
            color: #ffd700;
            font-size: 1.3em;
            text-align: center;
            margin-top: 20px;
            animation: fadeIn 0.5s ease;
        `;
        specialMsg.textContent = '¡Sabía que dirías que sí! 💕';
        document.querySelector('#step1 .container').appendChild(specialMsg);
    }
});

// PASO 1: Botón SÍ - Avanzar al paso 2
btnYes.addEventListener('click', function() {
    // Efecto de confeti
    createConfetti();
    
    setTimeout(() => {
        step1.classList.remove('active');
        step2.classList.add('active');
    }, 500);
});

// PASO 2: Selección de hoddie
btnHoddies.forEach(btn => {
    btn.addEventListener('click', function() {
        const hoddieCard = this.closest('.hoddie-option');
        selectedHoddie = hoddieCard.dataset.color;
        
        // Efecto visual de selección
        document.querySelectorAll('.hoddie-card').forEach(card => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '0.6';
        });
        
        this.closest('.hoddie-card').style.transform = 'scale(1.1)';
        this.closest('.hoddie-card').style.opacity = '1';
        
        // Avanzar al paso 3 después de un momento
        setTimeout(() => {
            step2.classList.remove('active');
            step3.classList.add('active');
        }, 800);
    });
});

// PASO 3: Selección de fecha
btnDates.forEach(btn => {
    btn.addEventListener('click', function() {
        const dateCard = this.closest('.date-card');
        selectedDate = dateCard.dataset.date;
        
        // Efecto visual de selección
        document.querySelectorAll('.date-card').forEach(card => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '0.6';
        });
        
        dateCard.style.transform = 'scale(1.1)';
        dateCard.style.opacity = '1';
        
        // Actualizar los valores en el paso 4
        document.getElementById('selectedHoddie').textContent = 
            selectedHoddie.charAt(0).toUpperCase() + selectedHoddie.slice(1);
        document.getElementById('selectedDate').textContent = selectedDate;
        
        // Avanzar al paso 4
        setTimeout(() => {
            step3.classList.remove('active');
            step4.classList.add('active');
        }, 800);
    });
});

// PASO 4: Confirmación final
btnConfirm.addEventListener('click', function() {
    // Validar correo electrónico
    userEmail = emailInput.value.trim();
    
    if (!validateEmail(userEmail)) {
        emailError.classList.add('show');
        emailInput.style.borderColor = '#ff4545';
        emailInput.focus();
        return;
    }
    
    emailError.classList.remove('show');
    emailInput.style.borderColor = 'rgba(212, 21, 21, 0.5)';
    
    // Guardar datos
    const invitationData = {
        email: userEmail,
        hoddie: selectedHoddie,
        fecha: selectedDate,
        timestamp: new Date().toISOString()
    };
    
    // Guardar en localStorage
    localStorage.setItem('invitacionSpiderman', JSON.stringify(invitationData));
    
    // Mostrar en consola
    console.log('📧 Datos de la invitación:', invitationData);
    
    // Efecto de fuegos artificiales
    createFireworks();
    
    setTimeout(() => {
        step4.classList.remove('active');
        finalMessage.classList.add('active');
        
        // Efecto de corazones cayendo
        createFallingHearts();
    }, 1000);
});

// Función para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Limpiar error al escribir
emailInput.addEventListener('input', function() {
    if (emailError.classList.contains('show')) {
        emailError.classList.remove('show');
        emailInput.style.borderColor = 'rgba(212, 21, 21, 0.5)';
    }
});

// FUNCIÓN: Crear confeti
function createConfetti() {
    const colors = ['#d41515', '#ffd700', '#fff', '#ff4545'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${2 + Math.random() * 3}s ease-out forwards;
            z-index: 9999;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Animación de confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            top: 100vh;
            opacity: 0;
            transform: rotate(${Math.random() * 720}deg) translateX(${Math.random() * 200 - 100}px);
        }
    }
    
    @keyframes firework {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes heartFall {
        to {
            top: 100vh;
            opacity: 0;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(style);

// FUNCIÓN: Crear fuegos artificiales
function createFireworks() {
    const colors = ['#d41515', '#ffd700', '#1e90ff', '#ff4545'];
    const fireworksCount = 10;
    
    for (let i = 0; i < fireworksCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 20px currentColor;
                animation: firework 1s ease-out forwards;
                z-index: 9999;
            `;
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 200);
    }
}

// FUNCIÓN: Crear corazones cayendo
function createFallingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓'];
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                font-size: ${20 + Math.random() * 30}px;
                left: ${Math.random() * 100}%;
                top: -50px;
                opacity: 1;
                animation: heartFall ${3 + Math.random() * 3}s ease-out forwards;
                z-index: 9999;
                pointer-events: none;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 6000);
        }, i * 100);
    }
}

// Easter Egg: Efecto hover en el logo de Spider-Man
document.querySelectorAll('.spiderman-logo').forEach(logo => {
    logo.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'swing 3s ease-in-out infinite';
        }, 10);
        
        // Sonido de telaraña (visual)
        const web = document.createElement('div');
        web.textContent = '🕸️';
        web.style.cssText = `
            position: fixed;
            font-size: 3em;
            left: ${this.getBoundingClientRect().left}px;
            top: ${this.getBoundingClientRect().top}px;
            animation: webShoot 1s ease-out forwards;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(web);
        
        setTimeout(() => web.remove(), 1000);
    });
});

// Animación de disparo de telaraña
const webShootStyle = document.createElement('style');
webShootStyle.textContent = `
    @keyframes webShoot {
        to {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(webShootStyle);

// Prevenir zoom en dispositivos móviles
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Efecto de partículas al mover el mouse
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.textContent = '✨';
        particle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 12px;
            pointer-events: none;
            opacity: 1;
            animation: particleFade 1s ease-out forwards;
            z-index: 9998;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
});

// Animación de partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFade {
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

console.log('🕷️ Spider-Man dice: ¡Con grandes poderes vienen grandes responsabilidades... y grandes citas! 💕');
