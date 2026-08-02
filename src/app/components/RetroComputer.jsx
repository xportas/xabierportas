'use client';
import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  LoadingManager,
  PerspectiveCamera,
  Scene,
  SpotLight,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function RetroComputer({ setHiddenRetroComputer, scrollFactor, setProgress }) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const animationStartedRef = useRef(false);
  const scrollFactorOperation = (scrollFactor || 0) * 4.7;

  useEffect(() => {
    let isMounted = true;
    const manager = new LoadingManager();

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (isMounted) setProgress(Math.round((itemsLoaded / itemsTotal) * 100));
    };

    manager.onLoad = () => {
      if (isMounted) setProgress(100);
    };

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;

    const scene = new Scene();
    const camera = new PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 100);
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
    controls.target = new Vector3(0, 4, 0);

    const render = () => {
      renderer.render(scene, camera);
    };

    controls.addEventListener('change', render);

    const spotLight = new SpotLight(0xffffff, 3000, 0, 1, 2);
    spotLight.position.set(10, 15, 15);
    spotLight.castShadow = false;
    scene.add(spotLight);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const loader = new GLTFLoader(manager).setPath('models/commodore/');
    loader.setDRACOLoader(dracoLoader);

    loader.load('scene.glb', (gltf) => {
      if (!isMounted) return;
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
    };

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
        if (isMounted) setHiddenRetroComputer(true);
        controls.enabled = true;
        controls.enableZoom = false;
        if (typeof document !== 'undefined') {
          const htmlEl = document.getElementsByTagName("html")[0];
          if (htmlEl) htmlEl.style.overflowY = "scroll";
        }
      }
    };

    const mountNode = mountRef.current;
    if (mountNode) {
      mountNode.appendChild(renderer.domElement);
    }

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

    if (mountNode) observer.observe(mountNode);

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (mountNode) observer.unobserve(mountNode);
      if (mountNode && mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', onWindowResize);
      controls.removeEventListener('change', render);

      // Thorough WebGL & Three.js Memory Disposal
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => {
              if (mat.map) mat.map.dispose();
              mat.dispose();
            });
          } else {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      });

      controls.dispose();
      dracoLoader.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, [setProgress, setHiddenRetroComputer]);

  return (
    <>
      <div
        className="fixed top-0 left-0 transition-all duration-300 ease-out"
        style={{ opacity: 1 - scrollFactorOperation, zIndex: scrollFactorOperation !== 0 ? -1 : undefined }}
      >
        <div ref={mountRef} />
      </div>
      <div className="h-screen" />
    </>
  );
}