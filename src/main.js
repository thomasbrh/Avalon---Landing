import { initHero } from './three.js/hero.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis'




/**
 * anti-onglet
 */
window.name = "_blank__landing";




/**
 * hero canvas 
 */
if (document.getElementById('hero-canvas'))
{
    initHero();
}



/**
 * animations
 * */
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis()
gsap.ticker.add((time) => lenis.raf(time * 1000)); // connecte lenis a gsap
gsap.ticker.lagSmoothing(0);


/**
 * header
 */ 
gsap.from('.header > *',
{
    y: -60,
    duration: 0.5, 
    ease: 'power2.out', 
    stagger: 0.1
});

/* hero text */
gsap.from('.hero__text',
{
    y: 100, 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power3.out', 
    delay: 0.3
});



/**
 * sections scroll
 */ 
gsap.utils.toArray('.section__head, .section__content').forEach(el =>
{
    gsap.from(el,
    {
        y: 30, 
        opacity: 0, 
        duration: 0.6, 
        ease: 'power2.out',

        scrollTrigger: 
        { 
            trigger: el, 
            start: 'top 80%', 
            once: true 
        }
    });
});

/* section body */
gsap.utils.toArray('.section__body').forEach(el =>
{
    if (!el.querySelector('.card'))
    {
        gsap.from(el,
        {
            y: 20, 
            opacity: 0, 
            duration: 0.6,
            ease: 'power2.out',
            
            scrollTrigger: 
            { 
                trigger: el, 
                start: 'top 82%', 
                once: true 
            }
        });
    }
});

/* cards */
gsap.utils.toArray('[data-animate="cards"]').forEach(container =>
{
    gsap.from(container.querySelectorAll('.card'),
    {
        y: 20, opacity: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power2.out',

        scrollTrigger: 
        { 
            trigger: container, 
            start: 'top 80%', 
            once: true 
        }
    });
});

/* img */
gsap.utils.toArray('[data-animate="image"] img').forEach(img =>
{
    gsap.from(img,
    {
        scale: 1.05, 
        opacity: 0, 
        duration: 0.9, 
        ease: 'power2.out',

        scrollTrigger: 
        { trigger: img, 
            start: 'top 80%', 
            once: true 
        }
    });
});

/* CTA */
if (document.querySelector('[data-animate="cta"]'))
{
    gsap.from('[data-animate="cta"]',
    {
        y: 30, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power2.out',

        scrollTrigger: 
        { 
            trigger: '[data-animate="cta"]', 
            start: 'top 80%', 
            once: true 
        }
    });
}

/* footer */
gsap.from('.footer',
{
    y: 20, 
    opacity: 0, 
    duration: 0.6, 
    ease: 'power2.out',
    
    scrollTrigger: 
    { 
        trigger: '.footer', 
        start: 'top 90%',
        once: true 
    }
});
