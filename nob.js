// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Helper function to safely animate elements
function animateIfExists(selector, fromVars, toVars, position) {
    if (!document.querySelector(selector)) return;
    if (fromVars) {
        gsap.from(selector, {...fromVars, position});
    } else {
        gsap.to(selector, {...toVars, position});
    }
}

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

// Ensure all hero content is visible immediately (no hidden initial state)
gsap.set(['.hero-title', '.hero-subtitle', '.hero-desc', '.logo-subtitle'], { opacity: 1 });

// ==================== HERO CAR JUMP AND LANDING ANIMATION ====================
// Hero car jump animation with landing impact
if (document.querySelector('.hero-car-container')) {
    const heroCarTl = gsap.timeline({ delay: 0.3 });

    heroCarTl.to('.hero-car-container', {
        y: -150,
        duration: 1,
        ease: 'power1.out'
    }, 0)
        .to('.hero-car-container', {
            y: 0,
            duration: 1,
            ease: 'bounce.out'
        }, 1)
        // Wheel damage crack effect on impact
        .to('.wheel-damage-effect', {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        }, 2)
        // Shake effect on landing impact
        .to('.hero-car-container', {
            x: -5,
            duration: 0.1,
            ease: 'sine.inOut'
        }, 2)
        .to('.hero-car-container', {
            x: 5,
            duration: 0.1,
            ease: 'sine.inOut'
        })
        .to('.hero-car-container', {
            x: -3,
            duration: 0.1,
            ease: 'sine.inOut'
        })
        .to('.hero-car-container', {
            x: 0,
            duration: 0.1,
            ease: 'sine.inOut'
        });

    // Wheel damage cracks animation - individual lines fracturing
    gsap.from('.wheel-damage-left', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: 'back.out',
        delay: 2.1
    });

    gsap.from('.wheel-damage-right', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: 'back.out',
        delay: 2.15
    });

    // Animate shattering particles for additional effect
    if (document.querySelector('.wheel-damage-left .shard-1')) {
        gsap.to(['.wheel-damage-left .shard-1', '.wheel-damage-right .shard-1'], {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in',
            delay: 2.1,
            stagger: 0.05
        });
    }

    if (document.querySelector('.wheel-damage-left .shard-2')) {
        gsap.to(['.wheel-damage-left .shard-2', '.wheel-damage-right .shard-2'], {
            y: -20,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.in',
            delay: 2.12,
            stagger: 0.05
        });
    }

    // Pulsing cracks glow effect
    if (document.querySelector('.wheel-damage-left line')) {
        gsap.to(['.wheel-damage-left line', '.wheel-damage-right line'], {
            opacity: 0.4,
            duration: 0.5,
            ease: 'sine.inOut',
            repeat: 3,
            yoyo: true,
            delay: 2.2
        });
    }
}

// Logo subtitle entrance animation
gsap.from('.logo-subtitle', {
    opacity: 0,
    x: -10,
    duration: 1.5,
    ease: 'power2.out',
    delay: 0.5
});

// Hero Animation (smooth entrance from visible state - no delay)
const heroTl = gsap.timeline({ delay: 0 });

heroTl.from('.hero-title', {
    opacity: 0,
    y: 20,
    duration: 1.2,
    ease: "power4.out"
}, 0)
    .from('.hero-subtitle', {
        opacity: 0,
        y: 15,
        duration: 1,
        ease: "power4.out"
    }, 0.15)
    .from('.hero-desc', {
        opacity: 0,
        y: 10,
        duration: 0.8,
        ease: "power2.out"
    }, 0.3);

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

// Ultra Realistic Smoke Effect Animation
if (document.querySelector('.smoke-left')) {
    const smokeTl = gsap.timeline({ repeat: -1 });

    // Animate smoke entrance and drift
    smokeTl.to('.smoke-left', {
        y: -200,
        opacity: 0,
        x: -40,
        duration: 4.5,
        ease: 'power1.inOut'
    }, 0)
        .to('.smoke-center', {
            y: -220,
            opacity: 0,
            x: 50,
            duration: 5,
            ease: 'power1.inOut'
        }, 0.3)
        .to('.smoke-right', {
            y: -200,
            opacity: 0,
            x: 35,
            duration: 4.7,
            ease: 'power1.inOut'
        }, 0.1);

    // Reset for next cycle
    smokeTl.set(['.smoke-left', '.smoke-center', '.smoke-right'], {
        y: 0,
        opacity: 1,
        x: 0
    }, '+=0.5');
}

// ==================== BUSY BACKGROUND ANIMATIONS ====================
// Animated lane markings flowing effect
if (document.querySelector('.lane-markings')) {
    const laneMarkingsTl = gsap.timeline({ repeat: -1 });
    laneMarkingsTl.to('.lane-markings', {
        strokeDashoffset: -100,
        duration: 2,
        ease: 'none'
    }, 0);
}

// Far background cars - slow movement (depth effect)
if (document.querySelector('.car-far-1')) {
    gsap.to('.car-far-1', {
        x: 1920,
        duration: 18,
        ease: 'none',
        repeat: -1,
        repeatDelay: 3
    });
}

if (document.querySelector('.car-far-2')) {
    gsap.to('.car-far-2', {
        x: 1920,
        duration: 16,
        ease: 'none',
        repeat: -1,
        repeatDelay: 5,
        delay: 2
    });
}

// Mid-distance cars - medium speed movement
if (document.querySelector('.car-mid-1')) {
    gsap.to('.car-mid-1', {
        x: -1600,
        duration: 14,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 4
    });
}

if (document.querySelector('.car-mid-2')) {
    gsap.to('.car-mid-2', {
        x: 1600,
        duration: 15,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 3,
        delay: 3
    });
}

// Foreground cars - fast movement with pulsing headlights
if (document.querySelector('.car-foreground-1')) {
    gsap.to('.car-foreground-1', {
        x: -1500,
        duration: 10,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 5
    });
}

if (document.querySelector('.car-foreground-2')) {
    gsap.to('.car-foreground-2', {
        x: 1500,
        duration: 11,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 4,
        delay: 2
    });
}

// Headlight glow pulsing
if (document.querySelector('.vehicle circle[fill*="headlight"]')) {
    gsap.to('.vehicle circle[fill*="headlight"]', {
        opacity: 0.5,
        duration: 0.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });
}

// Neon signs flickering and pulsing
if (document.querySelector('.neon-signs circle')) {
    gsap.to('.neon-signs circle', {
        opacity: 0.8,
        duration: 0.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.2
    });
}

// Street lights glowing effect
if (document.querySelector('.street-lights')) {
    gsap.to('.street-lights', {
        opacity: 0.8,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.3
    });
}

// Building windows flickering effect
if (document.querySelector('.window-light')) {
    const windowFlickerTl = gsap.timeline({ repeat: -1 });
    windowFlickerTl.to('.window-light', {
        opacity: 0.3,
        duration: 0.4,
        ease: 'sine.inOut',
        stagger: { each: 0.1, repeat: 1, yoyo: true }
    }, 0);
}

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
if (document.querySelector('.parallax-img')) {
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
}

if (document.querySelector('.spec-item')) {
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
}

// Interior Parallax
if (document.querySelector('.interior-img img')) {
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
}

// Features Stagger - immediate, fast animation
if (document.querySelector('.feature-card')) {
    gsap.from('.feature-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.features',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Cayenne showcase animation - immediate start, no delay
if (document.querySelector('.cayenne-showcase')) {
    gsap.from('.cayenne-showcase', {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.features',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Performance Grid Animation - immediate stagger
if (document.querySelector('.perf-item')) {
    gsap.from('.perf-item', {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.performance',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Engine showcase animation - immediate
if (document.querySelector('.perf-image')) {
    gsap.from('.perf-image', {
        scale: 0.8,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
            trigger: '.perf-showcase',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Testimonials Animation
if (document.querySelector('.testimonial-card')) {
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
}

// Customization Section Animation
if (document.querySelector('.custom-option')) {
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
}

// CTA Section Scale Animation
if (document.querySelector('.cta-section h2')) {
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
}

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

// Specs category title animation
gsap.from('.specs-category-title', {
    opacity: 0,
    x: -30,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.advanced-specs',
        start: 'top 65%',
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

// Exterior angle showcase animation
gsap.from('.exterior-angle', {
    x: (i) => i % 2 === 0 ? -100 : 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    scrollTrigger: {
        trigger: '.exterior-showcase',
        start: 'top 75%',
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

/* ============================================
   BHARAT FOOTER ANIMATION
   ============================================ */

// BHARAT text entrance animation
gsap.from('.bharat-text', {
    opacity: 0,
    y: 30,
    scale: 0.95,
    duration: 1.5,
    ease: 'back.out',
    scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// BHARAT subtitle animation
gsap.from('.bharat-subtitle', {
    opacity: 0,
    y: 15,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
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
/* ============================================
   IMAGE SHOWCASE ANIMATIONS
   ============================================ */

// Color showcase image animation - fast load
gsap.fromTo('.color-image', 
    { opacity: 0, scale: 0.9, y: 20 },
    {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.customization',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Warranty image animation - immediate display
gsap.fromTo('.warranty-image',
    { opacity: 0, scale: 0.95, rotateY: -10 },
    {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.9,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.warranty-service',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Financing image animation - no delay
gsap.fromTo('.financing-image',
    { opacity: 0, scale: 0.9, x: -30 },
    {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.8,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.financing',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Tech image staggered animations - immediate start
gsap.fromTo('.tech-image',
    { opacity: 0, scale: 0.85, y: 20 },
    {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.technology',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    }
);

/* ============================================
   VIDEO SHOWCASE ANIMATIONS
   ============================================ */

// Featured showcase image - fast load
gsap.fromTo('.featured-showcase',
    { opacity: 0, scale: 0.95, y: 30 },
    {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.video-showcase',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Video play icon - immediate appearance
gsap.fromTo('.video-play-icon',
    { opacity: 0, scale: 0.9 },
    {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.video-placeholder',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Video info text - no artificial delay
gsap.fromTo('.video-info',
    { opacity: 0, y: 20 },
    {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.video-placeholder',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Pulsing animation for play button
const playBtn = document.querySelector('.play-btn');
const videoPlayIcon = document.querySelector('.video-play-icon');

if (playBtn) {
    const pulseAnimation = gsap.timeline({ repeat: -1 });
    pulseAnimation.to(playBtn, {
        boxShadow: '0 0 0 10px rgba(213, 0, 28, 0.3)',
        duration: 1.5,
        ease: 'power1.inOut'
    })
    .to(playBtn, {
        boxShadow: '0 10px 30px rgba(213, 0, 28, 0.4)',
        duration: 1.5,
        ease: 'power1.inOut'
    }, 0);
}

// Featured showcase floating effect
gsap.to('.featured-showcase', {
    y: -15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Play button click functionality
if (playBtn) {
    playBtn.addEventListener('click', function() {
        // Animate button press
        gsap.timeline()
            .to(playBtn, { scale: 0.95, duration: 0.1 })
            .to(playBtn, { scale: 1, duration: 0.1 });
        
        // Show alert or would open video modal
        alert('🎬 Full 4K Video coming soon!\n\nExperience the Porsche Cayenne Black Edition in premium quality video.');
    });
}

if (videoPlayIcon) {
    videoPlayIcon.addEventListener('click', function() {
        gsap.timeline()
            .to(videoPlayIcon, { scale: 1.1, duration: 0.2 })
            .to(videoPlayIcon, { scale: 1, duration: 0.2 });
        
        alert('🎬 Full 4K Video coming soon!\n\nExperience the Porsche Cayenne Black Edition in premium quality video.');
    });
    
    videoPlayIcon.style.cursor = 'pointer';
}

/* ============================================
   CUSTOMIZATION SECTION ANIMATIONS
   ============================================ */

// Color showcase floating animation
gsap.to('.color-showcase', {
    y: -10,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Custom options staggered entrance - fast
gsap.fromTo('.custom-option',
    { opacity: 0, y: 40 },
    {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.customization-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Benefit cards staggered animation - immediate
gsap.fromTo('.benefit-card',
    { opacity: 0, y: 30 },
    {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.benefits-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Financing cards staggered animation - no delay
gsap.fromTo('.fin-card',
    { opacity: 0, scale: 0.95, y: 30 },
    {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.financing-cards',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    }
);

/* ============================================
   HOVER PARALLAX EFFECTS
   ============================================ */

// Image hover parallax on mouse move
document.querySelectorAll('.color-image, .warranty-image, .financing-image').forEach(img => {
    img.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
        
        gsap.to(this, {
            x: x,
            y: y,
            duration: 0.3,
            overwrite: 'auto'
        });
    });
    
    img.addEventListener('mouseleave', function() {
        gsap.to(this, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});