import { initHero } from './three.js/hero.js'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

window.name = 'Avalon - landing'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canUseSmoothScroll = window.matchMedia('(min-width: 48rem) and (pointer: fine)').matches
const desktopQuery = '(min-width: 90rem)'

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

if(!prefersReducedMotion && canUseSmoothScroll)
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
    lenis.on('scroll', ({ scroll }) =>
    {
        updateHeader(scroll)
        ScrollTrigger.update()
    })
}
else
{
    window.addEventListener('scroll', () => updateHeader(), { passive: true })
}

updateHeader()

const horizontalSection = document.querySelector('[data-horizontal-section], .section--env')
const horizontalTrack = horizontalSection?.querySelector('[data-horizontal-track], .environment__rail')

if(horizontalSection && horizontalTrack)
{
    const horizontalMotion = gsap.matchMedia()

    horizontalMotion.add(desktopQuery, () =>
    {
        const travel = () => Math.max(0, horizontalTrack.scrollWidth - window.innerWidth)

        const timeline = gsap.timeline(
        {
            defaults: { ease: 'none' },
            scrollTrigger:
            {
                trigger: horizontalSection,
                start: 'top top',
                end: () => `+=${Math.max(window.innerWidth, travel())}`,
                pin: true,
                scrub: prefersReducedMotion ? true : 1,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        })

        timeline.to(horizontalTrack, { x: () => -travel() }, 0)

        return () =>
        {
            gsap.set(horizontalTrack, { clearProps: 'transform' })
        }
    })
}

window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })

const entranceMotion = gsap.matchMedia()

entranceMotion.add(
{
    compact: '(max-width: 47.99rem)',
    roomy: '(min-width: 48rem)',
    reduceMotion: '(prefers-reduced-motion: reduce)'
}, (context) =>
{
    const { compact, reduceMotion } = context.conditions

    const distance = reduceMotion ? 0 : compact ? 16 : 28
    const revealStart = compact ? 'top 90%' : 'top 84%'
    const stagger = reduceMotion ? 0.025 : compact ? 0.055 : 0.085
    const heroText = document.querySelector('[data-animate="hero"]')
    const hero = heroText?.closest('.hero')
    const headerItems = header
        ? Array.from(header.children).filter((element) => !element.classList.contains('chapter-menu'))
        : []

    const heroTimeline = gsap.timeline(
    {
        defaults:
        {
            duration: reduceMotion ? 0.25 : compact ? 0.6 : 0.72,
            ease: reduceMotion ? 'none' : 'power3.out',
            force3D: !reduceMotion
        }
    })

    if(headerItems.length)
    {
        heroTimeline.from(headerItems,
        {
            y: reduceMotion ? 0 : compact ? -16 : -24,
            autoAlpha: 0,
            stagger: reduceMotion ? 0.025 : 0.07,
            clearProps: 'transform,opacity,visibility'
        }, 0)
    }

    if(hero)
    {
        const heroCanvas = hero.querySelector('#hero-canvas')

        if(heroCanvas)
        {
            heroTimeline.from(heroCanvas,
            {
                autoAlpha: 0,
                duration: reduceMotion ? 0.3 : 1.1,
                clearProps: 'opacity,visibility'
            }, 0)
        }
    }

    if(heroText)
    {
        const eyebrow = heroText.querySelector('.subtitle__tag')
        const titleLines = heroText.querySelectorAll('.hero__h1')
        const caption = heroText.querySelector('.hero__caption')
        const scrollHint = heroText.querySelector('.hero__scroll')

        if(eyebrow)
        {
            heroTimeline.from(eyebrow,
            {
                y: distance * 0.65,
                autoAlpha: 0,
                clearProps: 'transform,opacity,visibility'
            }, 0.12)
        }

        if(titleLines.length)
        {
            heroTimeline.from(titleLines,
            {
                y: distance,
                autoAlpha: 0,
                stagger: reduceMotion ? 0.025 : compact ? 0.08 : 0.12,
                clearProps: 'transform,opacity,visibility'
            }, 0.2)
        }

        if(caption)
        {
            heroTimeline.from(caption,
            {
                y: distance * 0.65,
                autoAlpha: 0,
                clearProps: 'transform,opacity,visibility'
            }, 0.38)
        }

        if(scrollHint)
        {
            heroTimeline.from(scrollHint,
            {
                y: reduceMotion ? 0 : 8,
                autoAlpha: 0,
                duration: reduceMotion ? 0.2 : 0.45,
                clearProps: 'transform,opacity,visibility'
            }, 0.55)
        }

        if(!compact && !reduceMotion && hero)
        {
            gsap.to(heroText,
            {
                yPercent: -5,
                ease: 'none',
                force3D: true,
                scrollTrigger:
                {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.6
                }
            })
        }
    }

    const reveal = (trigger, targets, options = {}) =>
    {
        const elements = gsap.utils.toArray(targets)

        if(!elements.length) return

        gsap.from(elements,
        {
            y: options.y ?? distance,
            autoAlpha: 0,
            duration: options.duration ?? (reduceMotion ? 0.25 : compact ? 0.55 : 0.68),
            stagger: options.stagger ?? 0,
            ease: options.ease ?? (reduceMotion ? 'none' : 'power2.out'),
            force3D: !reduceMotion,
            clearProps: 'transform,opacity,visibility',
            scrollTrigger:
            {
                trigger,
                start: options.start ?? revealStart,
                once: true,
                fastScrollEnd: true
            }
        })
    }

    gsap.utils.toArray('[data-animate="title"]').forEach((element) =>
    {
        const subtitle = element.querySelector('.subtitle__tag')
        const title = element.querySelector('h2')
        const hasLooseText = title
            ? Array.from(title.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
            : false
        const titleLines = title && !hasLooseText ? Array.from(title.children) : []
        const targets = [subtitle, ...(titleLines.length ? titleLines : [title])].filter(Boolean)

        reveal(element, targets, { stagger })
    })

    gsap.utils.toArray('[data-animate="fade-up"]').forEach((element) =>
    {
        const targets = element.children.length ? Array.from(element.children) : element
        reveal(element, targets, { y: distance * 0.75, stagger: stagger * 0.75 })
    })

    gsap.utils.toArray('[data-animate="fade"]').forEach((element) =>
    {
        reveal(element, element, { y: 0, duration: reduceMotion ? 0.2 : compact ? 0.45 : 0.58 })
    })

    gsap.utils.toArray('[data-animate="cards"]').forEach((container) =>
    {
        reveal(container, container.querySelectorAll('.card'), { y: distance * 0.8, stagger })
    })

    gsap.utils.toArray('[data-animate="list"]').forEach((container) =>
    {
        reveal(container, Array.from(container.children), { y: distance * 0.6, stagger: stagger * 0.75 })
    })

    gsap.utils.toArray('[data-animate="links"]').forEach((container) =>
    {
        reveal(container, container.querySelectorAll('a'), { y: 10, stagger: stagger * 0.7 })
    })

    gsap.utils.toArray('[data-animate="image"] .section__img-frame').forEach((frame) =>
    {
        reveal(frame, frame, { y: distance * 0.8, duration: reduceMotion ? 0.25 : compact ? 0.65 : 0.85 })
    })
})
