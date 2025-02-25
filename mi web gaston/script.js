// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initScrollAnimations();
    initBurgerMenu();
    initSmoothScroll();
    initHoverEffects();
    initFormValidation();
    initScrollProgress();
});

// Animaciones al scroll con Intersection Observer
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-entrance').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Menú hamburguesa
function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if(burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}

// Smooth scroll para los enlaces
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efectos hover para tarjetas
function initHoverEffects() {
    document.querySelectorAll('.project-card, .testimonial-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xAxis = (rect.width / 2 - x) / 25;
            const yAxis = (rect.height / 2 - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    });
}

// Validación de formulario de contacto
function initFormValidation() {
    const form = document.querySelector('#contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = form.querySelector('input[name="name"]');
            const email = form.querySelector('input[name="email"]');
            const message = form.querySelector('textarea[name="message"]');
            let isValid = true;

            // Validar nombre
            if(name.value.trim() === '') {
                isValid = false;
                name.classList.add('input-error');
            } else {
                name.classList.remove('input-error');
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email.value)) {
                isValid = false;
                email.classList.add('input-error');
            } else {
                email.classList.remove('input-error');
            }

            // Validar mensaje
            if(message.value.trim() === '') {
                isValid = false;
                message.classList.add('input-error');
            } else {
                message.classList.remove('input-error');
            }

            if(isValid) {
                // Enviar formulario
                form.reset();
                showNotification('¡Mensaje enviado con éxito!');
            }
        });
    }
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-20 opacity-0 transition-all duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Barra de progreso del scroll
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'fixed top-0 left-0 h-1 bg-purple-500 z-50';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}