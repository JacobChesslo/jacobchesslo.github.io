import { onCleanup, onMount, type Component } from 'solid-js';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { createDisplacementTexture, createGridTexture, createMetalnessTexture } from './_texture';
import { getWindowSize } from './_utils';

const Vaporwave = (canvas: HTMLCanvasElement) => {
  // Sizes
  const sizes = getWindowSize(canvas);

  // Textures - all procedurally generated
  const gridTexture = createGridTexture({});
  const terrainTexture = createDisplacementTexture();
  const metalnessTexture = createMetalnessTexture();

  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#000000', 1, 3.5);
  scene.background = new THREE.Color('#050018');

  // Objects
  const geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    map: gridTexture,
    displacementMap: terrainTexture,
    displacementScale: 0.4,
    /**
     * Add a metalnessMap to our material that will tell the renderer
     * where the "rough" parts of our terrains are
     */
    metalnessMap: metalnessTexture,
    /**
     * Make the terrain very very metallic so it will reflect the light
     * and not diffuse it: it will stay black
     */
    metalness: 0.96,
    /**
     * Make the terrain a bit rough so the rough parts will diffuse the light
     * well
     */
    roughness: 0.5,
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = 0.0;
  plane.position.z = 0.15;

  const plane2 = new THREE.Mesh(geometry, material);
  plane2.rotation.x = -Math.PI * 0.5;
  plane2.position.y = 0.0;
  plane2.position.z = -1.85; // 0.15 - 2 (the length of the first plane)

  scene.add(plane);
  scene.add(plane2);

  // Light
  // Ambient Light
  const ambientLight = new THREE.AmbientLight('#ffffff', 10);
  scene.add(ambientLight);

  // Right Spotlight aiming to the left
  const spotlight = new THREE.SpotLight('#d53c3d', 20, 25, Math.PI * 0.1, 0.25);
  spotlight.position.set(0.5, 0.75, 2.2);
  // Target the spotlight to a specific point to the left of the scene
  spotlight.target.position.x = -0.25;
  spotlight.target.position.y = 0.25;
  spotlight.target.position.z = 0.25;
  scene.add(spotlight);
  scene.add(spotlight.target);

  // Left Spotlight aiming to the right
  const spotlight2 = new THREE.SpotLight('#d53c3d', 20, 25, Math.PI * 0.1, 0.25);
  spotlight2.position.set(-0.5, 0.75, 2.2);
  // Target the spotlight to a specific point to the right side of the scene
  spotlight2.target.position.x = 0.25;
  spotlight2.target.position.y = 0.25;
  spotlight2.target.position.z = 0.25;
  scene.add(spotlight2);
  scene.add(spotlight2.target);

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 20);
  camera.position.set(0, 0.06, 1.1);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Post Processing
  const effectComposer = new EffectComposer(renderer);
  effectComposer.setSize(sizes.width, sizes.height);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);

  const rgbShiftPass = new ShaderPass(RGBShiftShader);
  rgbShiftPass.uniforms['amount'].value = 0.0015;

  effectComposer.addPass(rgbShiftPass);

  const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
  effectComposer.addPass(gammaCorrectionPass);

  const onResize = () => {
    // Update sizes
    const resizedSizes = getWindowSize(canvas);

    // Update camera
    camera.aspect = resizedSizes.width / resizedSizes.height;
    camera.updateProjectionMatrix();

    const resizedPixelRatio = Math.min(window.devicePixelRatio, 2);

    // Update renderer
    renderer.setSize(resizedSizes.width, resizedSizes.height);
    renderer.setPixelRatio(resizedPixelRatio);

    // Update effect composer
    effectComposer.setSize(resizedSizes.width, resizedSizes.height);
    effectComposer.setPixelRatio(resizedPixelRatio);
  };

  // Event listener to handle screen resize
  window.addEventListener('resize', onResize);

  const clock = new THREE.Clock();

  let lastAnimationFrameId: number;

  // Animate
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update controls
    controls.update();

    plane.position.z = (elapsedTime * 0.15) % 2;
    plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;

    // Render
    // renderer.render(scene, camera);
    effectComposer.render();

    // Call tick again on the next frame
    lastAnimationFrameId = window.requestAnimationFrame(tick);
  };

  tick();

  // === Cleanup on unmount ===
  onCleanup(() => {
    window.cancelAnimationFrame(lastAnimationFrameId);
    window.removeEventListener('resize', onResize);

    geometry.dispose();
    material.dispose();
    renderer.dispose();
    effectComposer.dispose();
  });
};

const VaporwavePage: Component = () => {
  let canvasRef!: HTMLCanvasElement;
  onMount(() => {
    Vaporwave(canvasRef);
  });
  return (
    <div class="fixed inset-0 bg-black overflow-hidden">
      <canvas ref={canvasRef} class="block w-full h-full" />
    </div>
  );
};

export default VaporwavePage;
