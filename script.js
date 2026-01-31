// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Date and Time in Header
    function updateDateTime() {
        const now = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const dateString = now.toLocaleDateString(undefined, dateOptions);
        const timeString = now.toLocaleTimeString(undefined, timeOptions);
        const datetimeDiv = document.getElementById('datetime');
        if (datetimeDiv) {
            datetimeDiv.innerHTML = `<span>${dateString}</span><span>${timeString}</span>`;
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Sticky Header (unchanged)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Contact Form Submission (existing code below remains unchanged)
    // ...existing code...
});
// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Date and Time in Header
    function updateDateTime() {
        const now = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const dateString = now.toLocaleDateString(undefined, dateOptions);
        const timeString = now.toLocaleTimeString(undefined, timeOptions);
        document.getElementById('datetime').innerHTML = `<span>${dateString}</span><span>${timeString}</span>`;
    }

    // Initial call to set the time and date immediately
    updateDateTime();

    // Update the date and time every second
    setInterval(updateDateTime, 1000);

    // Fade-in effect (unchanged)
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element) => {
        element.classList.remove('opacity-0');
    });

    // Sticky Header (unchanged)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(this);

            fetch(this.action, { // Use the form's 'action' attribute for the URL
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Or 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Message sent successfully!';
                    contactForm.reset(); // Clear the form
                } else {
                    // Error
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'There was an error sending your message.';
                }
            })
            .catch(error => {
                // Network error
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Network error. Please try again later.';
                console.error('Fetch error:', error);
            });
        });
    }
});