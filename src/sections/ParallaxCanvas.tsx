import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float time;
  uniform float index;
  uniform float number;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec3 newPosition = position;
    if(index != 0.0 && index != number - 1.0) {
      newPosition.x += sin(time * 0.5) * 30.0;
      newPosition.y += cos(time * 0.5) * 30.0;
      newPosition.z += sin(time * 0.5) * 30.0;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
    vPosition = position;
  }
`;

const fragmentShader = `
  uniform float time;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 resolution, vec2 imageResolution) {
    vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
      min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  void main() {
    vec4 textureColor = texture2D(uTexture, coverUv(vUv, uResolution, uImageResolution));
    gl_FragColor = textureColor;
  }
`;

const PLANE_COUNT = 20;
const SEGMENT_COUNT = 1;
const IMAGE_WIDTH = 600 * 1.5;
const IMAGE_HEIGHT = 400 * 1.5;

const IMAGE_LIST: (string | null)[] = [
  '/images/hero-neon.jpg',
  null, null, null, null, null, null, null, null, null,
  '/images/hero-void.jpg',
  null, null, null, null, null, null, null, null
];

function lerp(a: number, b: number, n: number): number {
  return (1 - n) * a + n * b;
}

interface ParallaxCanvasProps {
  onLoad?: () => void;
}

export default function ParallaxCanvas({ onLoad }: ParallaxCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshListRef = useRef<THREE.Mesh[]>([]);
  const scrollYRef = useRef(0);
  const speedTargetRef = useRef(0);
  const mouseXRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.set(0, 0, 1000);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create planes
    const meshList: THREE.Mesh[] = [];
    let loadedCount = 0;
    const totalTextures = IMAGE_LIST.filter((url) => url !== null).length;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalTextures && onLoad) {
        onLoad();
      }
    };

    for (let i = 0; i < PLANE_COUNT; i++) {
      const uniforms = {
        time: { value: 0 },
        uTexture: { value: null },
        uResolution: { value: new THREE.Vector2(IMAGE_WIDTH, IMAGE_HEIGHT) },
        uImageResolution: { value: new THREE.Vector2(IMAGE_WIDTH, IMAGE_HEIGHT) },
        index: { value: i },
        number: { value: PLANE_COUNT },
      };

      const material = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        vertexShader,
        fragmentShader,
        uniforms,
      });

      const geometry = new THREE.PlaneGeometry(
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        SEGMENT_COUNT,
        SEGMENT_COUNT
      );
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = (Math.random() - 0.5) * 200;
      mesh.position.y = -i * 1;
      mesh.position.z = -i * 1;

      (mesh as any).index = i;
      (mesh as any).random = Math.random() - 0.5;
      (mesh as any).lerped = 0;
      (mesh as any).lerped2 = 0;
      (mesh as any).speedX = 0;
      (mesh as any).speedY = 0;
      (mesh as any).positionZ = 0;

      scene.add(mesh);
      meshList.push(mesh);

      if (IMAGE_LIST[i]) {
        new THREE.TextureLoader().load(IMAGE_LIST[i]!, (texture) => {
          material.uniforms.uTexture.value = texture;
          checkLoaded();
        });
      }
    }

    meshListRef.current = meshList;

    // If no textures to load, trigger onLoad
    if (totalTextures === 0 && onLoad) {
      onLoad();
    }

    // Mouse wheel
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollYRef.current -= e.deltaY * 0.01;
      speedTargetRef.current = e.deltaY * 0.01;
    };

    // Mouse move
    const onMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * window.innerWidth;
      mouseXRef.current = mouseX;
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('mousemove', onMouseMove);

    // Touch support
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = touchStartY - e.touches[0].clientY;
      scrollYRef.current -= deltaY * 0.02;
      speedTargetRef.current = deltaY * 0.02;
      mouseXRef.current = (e.touches[0].clientX / window.innerWidth - 0.5) * window.innerWidth;
      touchStartY = e.touches[0].clientY;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    isActiveRef.current = true;

    const animate = () => {
      if (!isActiveRef.current) return;
      rafRef.current = requestAnimationFrame(animate);

      scrollYRef.current += speedTargetRef.current;
      speedTargetRef.current = lerp(speedTargetRef.current, 0, 0.08);

      const meshListLen = meshListRef.current.length;

      meshListRef.current.forEach((mesh) => {
        const m = mesh as any;
        m.lerped = lerp(
          m.lerped,
          scrollYRef.current,
          0.05 + 0.025 * (m.index / meshListLen)
        );
        m.lerped2 = lerp(
          m.lerped2,
          mouseXRef.current,
          0.05 + 0.1 * (m.index / meshListLen)
        );
        mesh.position.y = -m.index * 1 + m.lerped;
        mesh.position.x = m.lerped2 + m.random * 200;
        (mesh.material as THREE.ShaderMaterial).uniforms.time.value += 0.05;
        m.speedX = lerp(m.speedX, 0, 0.1);
        m.speedY = lerp(m.speedY, 0, 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isActiveRef.current = false;
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);

      meshList.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.ShaderMaterial).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoad]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        cursor: 'grab',
      }}
    />
  );
}
