class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.hoverRadius = 100;
        
        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 10000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 0.5,
                originalRadius: Math.random() * 2 + 0.5,
                color: `rgba(${Math.random() * 50 + 100}, 0, ${Math.random() * 200 + 55}, ${Math.random() * 0.4 + 0.3})`,
                speed: Math.random() * 0.5 + 0.2,
                angle: Math.random() * Math.PI * 2,
                spin: Math.random() * 0.2 - 0.1
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mousePosition.x = 0;
            this.mousePosition.y = 0;
        });
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;
        this.ctx.fill();
    }
    
    connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(112, 0, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticles() {
        for (let particle of this.particles) {
            // Move particles
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            particle.angle += particle.spin;
            
            // Check mouse interaction
            if (this.mousePosition.x && this.mousePosition.y) {
                const dx = this.mousePosition.x - particle.x;
                const dy = this.mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.hoverRadius) {
                    const force = (this.hoverRadius - distance) / this.hoverRadius;
                    particle.radius = particle.originalRadius * (1 + force);
                    
                    const angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * force * 2;
                    particle.y -= Math.sin(angle) * force * 2;
                } else {
                    particle.radius = particle.originalRadius;
                }
            }
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.connectParticles();
        
        for (let particle of this.particles) {
            this.drawParticle(particle);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
});