import { initHero } from './three.js/hero.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

window.name = '_blank__landing'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if(document.getElementById('hero-canvas'))
{
    initHero()
}

document.querySelectorAll('.bandeau__list').forEach((list) =>
{
    const content = list.innerHTML.trim()

    if(!content || list.querySelector('.bandeau__track')) return

    list.innerHTML = `
        <div class="bandeau__track">${content}</div>
        <div class="bandeau__track">${content}</div>
    `
})

gsap.registerPlugin(ScrollTrigger)

let lenis = null

if(!prefersReducedMotion)
{
    lenis = new Lenis()
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
}

const header = document.querySelector('.header')
const menuToggle = document.querySelector('.chapter-menu__toggle')
const menu = document.querySelector('.chapter-menu')

const updateHeader = (scroll = window.scrollY) =>
{
    header?.classList.toggle('is-scrolled', scroll > 24)
}

const setMenuOpen = (isOpen) =>
{
    if(!header || !menuToggle) return

    header.classList.toggle('menu-open', isOpen)
    document.documentElement.classList.toggle('menu-open', isOpen)
    menuToggle.setAttribute('aria-expanded', String(isOpen))
    menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu')

    if(lenis)
    {
        if(isOpen) lenis.stop()
        else lenis.start()
    }
}

menuToggle?.addEventListener('click', (event) =>
{
    event.stopPropagation()
    setMenuOpen(!header.classList.contains('menu-open'))
})

menu?.addEventListener('click', (event) =>
{
    if(event.target === menu) setMenuOpen(false)
})

document.querySelectorAll('.chapter-menu a').forEach((link) =>
{
    link.addEventListener('click', (event) =>
    {
        const href = link.getAttribute('href')
        setMenuOpen(false)

        if(lenis && href?.startsWith('#'))
        {
            const target = document.querySelector(href)
            if(!target) return

            event.preventDefault()
            lenis.scrollTo(target, { offset: -80 })
            window.history.replaceState(null, '', href)
        }
    })
})

window.addEventListener('keydown', (event) =>
{
    if(event.key === 'Escape') setMenuOpen(false)
})

if(lenis)
{
    lenis.on('scroll', ({ scroll }) => updateHeader(scroll))
}
else
{
    window.addEventListener('scroll', () => updateHeader(), { passive: true })
}

updateHeader()

if(!prefersReducedMotion)
{
    gsap.from('.header > :not(.chapter-menu)',
    {
        y: -60,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        clearProps: 'transform'
    })

    gsap.from('.hero__text',
    {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        clearProps: 'transform,opacity'
    })

    gsap.utils.toArray('.section__head, .section__content').forEach((element) =>
    {
        gsap.from(element,
        {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger:
            {
                trigger: element,
                start: 'top 80%',
                once: true
            }
        })
    })

    gsap.utils.toArray('.section__body').forEach((element) =>
    {
        if(element.querySelector('.card')) return

        gsap.from(element,
        {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger:
            {
                trigger: element,
                start: 'top 82%',
                once: true
            }
        })
    })

    gsap.utils.toArray('[data-animate="cards"]').forEach((container) =>
    {
        gsap.from(container.querySelectorAll('.card'),
        {
            y: 20,
            opacity: 0,
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
        })
    })

    gsap.utils.toArray('[data-animate="image"] .section__img-frame').forEach((frame) =>
    {
        gsap.from(frame,
        {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger:
            {
                trigger: frame,
                start: 'top 80%',
                once: true
            }
        })
    })

    const cta = document.querySelector('[data-animate="cta"]')
    if(cta)
    {
        gsap.from(cta,
        {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger:
            {
                trigger: cta,
                start: 'top 80%',
                once: true
            }
        })
    }

    const footer = document.querySelector('.footer')
    if(footer)
    {
        gsap.from('.footer__inner, .footer__copy',
        {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'opacity',
            scrollTrigger:
            {
                trigger: footer,
                start: 'top 90%',
                once: true
            }
        })
    }
}
