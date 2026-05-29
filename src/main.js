import { initHero } from './three.js/hero.js';

/* anti-onglets */
window.name = "_blank__landing";

/* hero */
if (document.getElementById('hero-canvas')) 
{
    initHero();
}
