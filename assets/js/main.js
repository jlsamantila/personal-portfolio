document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.className = 'cursor';
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    // Custom cursor movement
    document.addEventListener('mousemove', function(e) {
        cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        cursorFollower.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    });

    // Cursor hover effect
    document.querySelectorAll('a, button, input, textarea').forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        elem.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);

    // Text scramble effect for hero title
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += char;
                } else {
                    output += from;
                }
            }
            this.el.innerText = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Initialize text scramble effect
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const fx = new TextScramble(heroTitle);
        fx.setText(heroTitle.textContent);
    }

    // Glitch effect on hover for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.02) translateY(-5px)';
            card.style.boxShadow = '0 15px 30px rgba(112, 0, 255, 0.2)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});