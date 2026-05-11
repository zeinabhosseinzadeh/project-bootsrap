'use strict'
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const bars = entry.target.querySelectorAll('.bar-fill');
        if (entry.isIntersecting) {
            bars.forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        } else {
            bars.forEach(bar => {
                bar.style.width = "0%";
            });
        }
    });
}, { threshold: 0.3 });

const skillSection = document.querySelector("#skills");
observer.observe(skillSection);

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.work-filter-btn');
    const cards = document.querySelectorAll('.work-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-filter');

            cards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

(() => {
    const counters = document.querySelectorAll('.count-num');
    const section = document.querySelector('.count-section');
    let activated = false;

    function runCounters() {
        counters.forEach(counter => {
            counter.textContent = '0';
            const target = +counter.dataset.target;
            let current = 0;
            const step = target / 100;

            function update() {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            update();
        });
    }

    window.addEventListener('scroll', () => {
        const top = section.getBoundingClientRect().top;
        const viewHeight = window.innerHeight;

        if (top < viewHeight - 100) {
            if (!activated) {
                runCounters();
                activated = true;
            }
        } else {
            activated = false;
            counters.forEach(c => (c.textContent = '0'));
        }
    });
})();

document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const pricingBox = e.target.closest('.pricing-box');
        const planTitle = pricingBox.querySelector('.plan-title').textContent;
        document.getElementById('modal-plan-title').textContent = planTitle + " Plan Selected";
        document.getElementById('modal').style.display = 'flex';
    });
});

document.querySelectorAll('.modal-close').forEach(el => {
    el.addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });
});

document.getElementById('modal').addEventListener('click', e => {
    if (e.target.id === 'modal') {
        document.getElementById('modal').style.display = 'none';
    }
});

document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    });
});

document.querySelectorAll('.modal .close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

document.querySelector('.contact-form').addEventListener('submit', e => {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }


    alert('Thank you for contacting us! We will get back to you soon.');

    form.reset();
});

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});