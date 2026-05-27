document.addEventListener('DOMContentLoaded', () => {

    // ── Live clock in hero stats ──
    function updateClock() {
        const hmEl = document.getElementById('clock-hm');
        const ssEl = document.getElementById('clock-ss');
        const apEl = document.getElementById('clock-ap');
        if (!hmEl) return;
        const now  = new Date();
        let h      = now.getHours();
        const m    = String(now.getMinutes()).padStart(2, '0');
        const s    = String(now.getSeconds()).padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        hmEl.textContent = `${String(h).padStart(2,'0')}:${m}`;
        ssEl.textContent = `:${s}`;
        apEl.textContent = ampm;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ── Sticky header shadow ──
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ── Active nav link on scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));

    // ── Hamburger menu ──
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    hamburger.addEventListener('click', () => {
        const open = hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ── Contact form ──
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-submit');
            btn.textContent = 'Sending…';
            btn.disabled = true;

            fetch(this.action || '#', {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = '✓ Message sent! I\'ll be in touch soon.';
                    contactForm.reset();
                } else {
                    throw new Error('Server error');
                }
            })
            .catch(() => {
                formMessage.className = 'form-message error';
                formMessage.textContent = '✗ Something went wrong. Try emailing me directly.';
            })
            .finally(() => {
                btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                btn.disabled = false;
            });
        });
    }

    // ── Scroll-reveal for section elements ──
    const revealEls = document.querySelectorAll(
        '.skill-card, .project-card, .exp-item, .badge-card, .about-grid'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
    });
});
