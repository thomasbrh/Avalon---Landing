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
 * bandeau infini
 */
document.querySelectorAll('.bandeau__list').forEach(list =>
{
    const content = list.innerHTML.trim();

    if (!content || list.querySelector('.bandeau__track'))
    {
        return;
    }

    list.innerHTML = `
        <div class="bandeau__track">${content}</div>
        <div class="bandeau__track">${content}</div>
    `;
});



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
    stagger: 0.1,
    clearProps: 'transform'
});

/* hero text */
gsap.from('.hero__text',
{
    y: 100, 
    opacity: 0, 
    duration: 0.8, 
    ease: 'power3.out', 
    delay: 0.3,
    clearProps: 'transform,opacity'
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
        clearProps: 'transform,opacity',

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
            clearProps: 'transform,opacity',
            
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
        clearProps: 'transform,opacity',

        scrollTrigger: 
        { 
            trigger: container, 
            start: 'top 80%', 
            once: true 
        }
    });
});

/* img */
gsap.utils.toArray('[data-animate="image"] .section__img-frame').forEach(frame =>
{
    gsap.from(frame,
    {
        y: 24,
        opacity: 0, 
        duration: 0.9, 
        ease: 'power2.out',
        clearProps: 'transform,opacity',

        scrollTrigger: 
        { trigger: frame, 
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
        clearProps: 'transform,opacity',

        scrollTrigger: 
        { 
            trigger: '[data-animate="cta"]', 
            start: 'top 80%', 
            once: true 
        }
    });
}

/* footer */
gsap.from('.footer__inner, .footer__copy',
{
    opacity: 0, 
    duration: 0.6, 
    ease: 'power2.out',
    clearProps: 'opacity',
    
    scrollTrigger: 
    { 
        trigger: '.footer', 
        start: 'top 90%',
        once: true 
    }
});
