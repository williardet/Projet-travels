// Menu responsive toggle
var toggle_menu = document.querySelector('.responsive-menu');
var menu = document.querySelector('.menu');

if (toggle_menu) {
    toggle_menu.onclick = function() {
        toggle_menu.classList.toggle('active');
        menu.classList.toggle('responsive');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('header ul.menu li a');
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });

    if (menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                toggle_menu.classList.remove('active');
                menu.classList.remove('responsive');
            });
        });
    }
});

function showNotification(message) {
    let toast = document.querySelector('.notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'notification';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 500); // Attend la fin de la transition CSS pour supprimer l'élément
    }, 4500);
}

// Gestion avancée des formulaires
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêche l'envoi réel pour la démonstration

            const inputs = form.querySelectorAll('input, textarea, select');
            let isValid = true;
            let firstErrorField = null;

            // Supprimer les anciens messages d'erreur
            form.querySelectorAll('.error-text').forEach(msg => msg.remove());

            inputs.forEach(input => {
                const value = input.value.trim();
                let fieldValid = true;

                // Validation des champs requis
                if (input.hasAttribute('required') && value === '') {
                    fieldValid = false;
                } 
                // Validation spécifique de l'email
                else if (input.type === 'email' && value !== '') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        fieldValid = false;
                    }
                }

                // Application visuelle des erreurs
                if (!fieldValid) {
                    input.classList.add('error');
                    input.style.borderColor = '#ff4444';
                    isValid = false;
                    if (!firstErrorField) firstErrorField = input;
                    
                    // Ajouter le message sous le champ
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-text';
                    errorMsg.innerText = 'Ce champ est invalide';
                    input.parentNode.appendChild(errorMsg);
                } else {
                    input.classList.remove('error');
                    input.style.borderColor = '';
                }
            });

            if (!isValid) {
                if (firstErrorField) firstErrorField.focus();
            } else {
                // Simulation d'envoi réussi
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                const originalText = submitBtn.value || submitBtn.textContent;
                
                if (submitBtn.tagName === 'INPUT') submitBtn.value = 'Envoi en cours...';
                else submitBtn.textContent = 'Envoi en cours...';

                setTimeout(() => {
                    showNotification('Merci ! Votre message a été envoyé avec succès.');
                    form.reset();
                    if (submitBtn.tagName === 'INPUT') submitBtn.value = originalText;
                    else submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach(arrow => {
        arrow.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
});
