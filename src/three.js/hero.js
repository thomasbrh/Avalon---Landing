'use strict';
import * as THREE from 'three';


export function initHero() 
{
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    
    /**
     * Scene
     */
    const scene = new THREE.Scene();

    
    /**
     * Size
     */
    const sizes = 
    {
        width:  window.innerWidth,
        height: window.innerHeight,
    };

    /**
     * Camera
     */
    const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
    );
    camera.position.z = 3;
    scene.add(camera);

    
    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer(
    {
        canvas,
        antialias: false,
        alpha:     true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    
    /**
     * Particules
     */
    const nbParticules = 2500;

    const positions = new Float32Array(nbParticules * 3);

    // boucle position random
    for (let i = 0; i < nbParticules; i++) 
    {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * 12; // x
        positions[i3 + 1] = (Math.random() - 0.5) * 6;  // y
        positions[i3 + 2] = (Math.random() - 0.5) * 8;  // z
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // matériel
    const material = new THREE.PointsMaterial(
    {
        color:          new THREE.Color('#C8A96E'),
        size:           0.02,
        sizeAttenuation: true,
        transparent:    true,
        opacity:        0.5,
        depthWrite:     false,
    });

    const particles = new THREE.Points(geometry, material);

    // add à la scène
    scene.add(particles);


    /**
     * Curseur
     */
    const mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => 
    {
        mouse.x =  (e.clientX / sizes.width)  - 0.5;
        mouse.y = -(e.clientY / sizes.height) + 0.5;
    });

   
    /**
     * Resize
     */
    window.addEventListener('resize', () => 
    {
        // maj dimension
        sizes.width  = window.innerWidth;
        sizes.height = window.innerHeight;

        // maj cam
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // maj renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    
    /**
     * Tick
     */
    const clock = new THREE.Clock();

    function tick() 
    {
        const elapsed = clock.getElapsedTime();

        // rotation par defaut
        particles.rotation.y = elapsed * 0.016;

        // rotation par le curseur
        particles.rotation.x = mouse.y * 0.06 + elapsed * 0.008;
        particles.rotation.z = mouse.x * 0.04;

        renderer.render(scene, camera);

        // prochaine frame
        requestAnimationFrame(tick);
    }

    tick();
}
