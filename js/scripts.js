document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Merci pour votre message ! Nous vous répondrons bientôt.');
        contactForm.reset();
    });
});
