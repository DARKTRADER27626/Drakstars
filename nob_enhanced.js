// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Hero Animation
const heroTl = gsap.timeline();

heroTl.to('.hero-title', {
    opacity: 1,
    duration: 1.8,
    ease: "power4.out",
    delay: 0.2
})
    .to('.hero-subtitle', {
        opacity: 1,
        duration: 1.5,
        ease: "power4.out"
    }, "-=1.4")
    .to('.hero-desc', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=1");

// Hero Parallax
gsap.to('.hero-bg img', {
    y: '20%',
    scale: 1.1,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Text Reveal - Letter by Letter (Simplified to words due to structure)
const textEl = document.querySelector('.big-text');
// Only apply if element exists to prevent errors
if (textEl) {
    gsap.from('.big-text', {
        backgroundPositionX: "0%",
        opacity: 0.3,
        y: 30,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: '.narrative',
            start: 'top 75%',
            end: 'bottom bottom',
            scrub: 1
        },
        stagger: 0.1
    });

    // Animate highlight span specifically
    gsap.to('.big-text .highlight', {
        color: "#fff",
        textShadow: "0 0 20px rgba(255,255,255,0.5)",
        scrollTrigger: {
            trigger: '.narrative',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true
        }
    });
}

// Showcase Side Profile
gsap.from('.parallax-img', {
    x: -100,
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
        trigger: '.showcase',
        start: 'top 70%',
        end: 'top 40%',
        scrub: 1
    }
});

gsap.from('.spec-item', {
    x: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.showcase-specs',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Interior Parallax
gsap.to('.interior-img img', {
    scale: 1.15,
    y: '10%',
    scrollTrigger: {
        trigger: '.interior-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// Features Stagger
gsap.from('.feature-card', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.features',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    }
});

// Performance Grid Animation
gsap.from('.perf-item', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
        trigger: '.performance',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    }
});

// Testimonials Animation
gsap.from('.testimonial-card', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// Customization Section Animation
gsap.from('.custom-option', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
        trigger: '.customization',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    }
});

// CTA Section Scale Animation
gsap.from('.cta-section h2, .cta-section p', {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    }
});

// Button Hover Effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', function () {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Section Title Reveal
gsap.from('.section-title', {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '.features',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Technology Cards Animation
gsap.from('.tech-card', {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
        trigger: '.technology',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// Advanced Specs Animation
gsap.from('.spec-row', {
    x: -50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.advanced-specs',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    }
});

// Exterior Details Animation
gsap.from('.exterior-item', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
        trigger: '.exterior-details',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// Warranty Service Animation
gsap.from('.benefit-card', {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    scrollTrigger: {
        trigger: '.warranty-service',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// Financing Cards Animation
gsap.from('.fin-card', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
        trigger: '.financing',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    }
});

// Video Showcase Animation
gsap.from('.video-placeholder', {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '.video-showcase',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// FAQ Items Animation
gsap.from('.faq-item', {
    x: -80,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.faq',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    }
});

// Interior Features Animation
gsap.from('.interior-feature', {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '.interior-features',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Interactive card hover effects with light glow
document.querySelectorAll('.tech-card, .benefit-card, .fin-card, .exterior-item, .faq-item').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(this, {
            '--mouse-x': x + 'px',
            '--mouse-y': y + 'px',
            duration: 0.3,
            overwrite: 'auto'
        });
    });

    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            '--mouse-x': '50%',
            '--mouse-y': '50%',
            duration: 0.3,
            overwrite: 'auto'
        });
    });
});

// Staggered text animation on section titles
document.querySelectorAll('h2').forEach(heading => {
    gsap.from(heading, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Enhanced parallax for interior features
gsap.to('.interior-features', {
    y: -30,
    scrollTrigger: {
        trigger: '.interior-section',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    }
});
