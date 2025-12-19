'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function RetroComputer({ setHiddenRetroComputer, scrollFactor, setProgress }) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const animationStartedRef = useRef(false);
  const scrollFactorOperation = (scrollFactor || 0) * 4.7;

  useEffect(() => {
    const manager = new THREE.LoadingManager();

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      setProgress(Math.round((itemsLoaded / itemsTotal) * 100));
    };

    manager.onLoad = () => setProgress(100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(1, 2.5, 5);
    const initialZoom = camera.position.z;

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = false;
    controls.minDistance = 10;
    controls.maxDistance = 90;
    controls.minPolarAngle = 1.23;
    controls.maxPolarAngle = 1.32;
    controls.rotateSpeed = 0.1;
    controls.autoRotate = false;
    controls.target = new THREE.Vector3(0, 4, 0);

    // DEMAND RENDERING SETUP
    const render = () => {
      renderer.render(scene, camera);
    };

    controls.addEventListener('change', render);

    const spotLight = new THREE.SpotLight(0xffffff, 3000, 0, 1, 2);
    spotLight.position.set(10, 15, 15);
    spotLight.castShadow = false;
    scene.add(spotLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // DRACO LOADER SETUP
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/'); // Path to decoder files in public/draco/

    const loader = new GLTFLoader(manager).setPath('models/commodore/');
    loader.setDRACOLoader(dracoLoader);

    loader.load('scene.glb', (gltf) => {
      const mesh = gltf.scene;
      mesh.position.set(0, 2.05, 0);
      scene.add(mesh);
      render(); // Initial render after load
    });

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }
    window.addEventListener('resize', onWindowResize, false);

    let startTime = null;
    const delay = 1300;
    const duration = 3000;
    let animationFrameId;

    const animateZoom = (timestamp) => {
      if (!startTime) startTime = timestamp + delay;

      const elapsedTime = Math.max(0, timestamp - startTime);
      const t = Math.exp(-4 * (1 - elapsedTime / duration));
      camera.position.z = initialZoom + (controls.maxDistance - initialZoom) * t;

      controls.update();
      render();

      if (t < 1) {
        animationFrameId = requestAnimationFrame(animateZoom);
      } else {
        setHiddenRetroComputer(true);
        controls.enabled = true;
        controls.enableZoom = false;
        document.getElementsByTagName("html")[0].style.overflowY = "scroll";
      }
    }

    mountRef.current.appendChild(renderer.domElement);

    // Initial render
    render();

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animationStartedRef.current) {
          animationStartedRef.current = true;
          controls.enabled = false;
          // Start the zoom animation loop
          animationFrameId = requestAnimationFrame(animateZoom);
        }
      },
      { threshold: 0.5 }
    );
    if (mountRef.current) observer.observe(mountRef.current);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (mountRef.current) observer.unobserve(mountRef.current);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize);
      controls.removeEventListener('change', render);
      renderer.dispose();
      dracoLoader.dispose();
    };
  }, [setProgress]);

  return (
    <>
      <div
        className="fixed top-0 left-0 transition-all duration-300 ease-out"
        style={{ opacity: 1 - scrollFactorOperation, zIndex: scrollFactorOperation !== 0 && -1 }}
      >
        <div ref={mountRef} />
      </div>
      <div className="h-screen" />
    </>
  );
}