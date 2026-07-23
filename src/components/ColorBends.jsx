import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ColorBends.css';

const MAX_COLORS = 8;

const frag = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer; // in NDC [-1,1]
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

    for (int j = 0; j < 5; j++) {
      if (j >= uIterations - 1) break;
      vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
      q += (rr - q) * 0.15;
    }

    vec3 col = vec3(0.0);
    float a = 1.0;

    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;
      for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3); // strong response across 0..1
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float m = mix(m0, m1, kMix);
            float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
            sumCol += uColors[i] * w;
            cover = max(cover, w);
      }
      col = clamp(sumCol, 0.0, 1.0);
      a = uTransparent > 0 ? clamp(cover * 3.5, 0.0, 1.0) : 1.0;
    } else {
        vec2 s = q;
        
        // k = 0 (Red)
        s -= 0.01;
        vec2 r0 = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
        float m0_0 = length(r0 + sin(5.0 * r0.y * uFrequency - 3.0 * t + 0.0) / 4.0);
        float kBelow0 = clamp(uWarpStrength, 0.0, 1.0);
        float kMix0 = pow(kBelow0, 0.3);
        float gain0 = 1.0 + max(uWarpStrength - 1.0, 0.0);
        vec2 disp0 = (r0 - s) * kBelow0;
        vec2 warped0 = s + disp0 * gain0;
        float m1_0 = length(warped0 + sin(5.0 * warped0.y * uFrequency - 3.0 * t + 0.0) / 4.0);
        float m_0 = mix(m0_0, m1_0, kMix0);
        col.r = 1.0 - exp(-uBandWidth / exp(uBandWidth * m_0));

        // k = 1 (Green)
        s -= 0.01;
        vec2 r1 = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
        float m0_1 = length(r1 + sin(5.0 * r1.y * uFrequency - 3.0 * t + 1.0) / 4.0);
        float kBelow1 = clamp(uWarpStrength, 0.0, 1.0);
        float kMix1 = pow(kBelow1, 0.3);
        float gain1 = 1.0 + max(uWarpStrength - 1.0, 0.0);
        vec2 disp1 = (r1 - s) * kBelow1;
        vec2 warped1 = s + disp1 * gain1;
        float m1_1 = length(warped1 + sin(5.0 * warped1.y * uFrequency - 3.0 * t + 1.0) / 4.0);
        float m_1 = mix(m0_1, m1_1, kMix1);
        col.g = 1.0 - exp(-uBandWidth / exp(uBandWidth * m_1));

        // k = 2 (Blue)
        s -= 0.01;
        vec2 r2 = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
        float m0_2 = length(r2 + sin(5.0 * r2.y * uFrequency - 3.0 * t + 2.0) / 4.0);
        float kBelow2 = clamp(uWarpStrength, 0.0, 1.0);
        float kMix2 = pow(kBelow2, 0.3);
        float gain2 = 1.0 + max(uWarpStrength - 1.0, 0.0);
        vec2 disp2 = (r2 - s) * kBelow2;
        vec2 warped2 = s + disp2 * gain2;
        float m1_2 = length(warped2 + sin(5.0 * warped2.y * uFrequency - 3.0 * t + 2.0) / 4.0);
        float m_2 = mix(m0_2, m1_2, kMix2);
        col.b = 1.0 - exp(-uBandWidth / exp(uBandWidth * m_2));

        a = uTransparent > 0 ? clamp(max(max(col.r, col.g), col.b) * 3.5, 0.0, 1.0) : 1.0;
    }

    col *= uIntensity;

    if (uNoise > 0.0001) {
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
      col += (n - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
}
`;

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export default function ColorBends({
  className = '',
  style = {},
  rotation = 90,
  speed = 0.2,
  colors = [],
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.15,
  iterations = 1,
  intensity = 1.5,
  bandWidth = 6
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));

    // Parse color helpers
    const toVec3 = hex => {
      const h = hex.replace('#', '').trim();
      const v =
        h.length === 3
          ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
          : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
      return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);
    };

    const arr = (colors || []).filter(Boolean).slice(0, MAX_COLORS).map(toVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      if (i < arr.length) uColorsArray[i].copy(arr[i]);
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: arr.length },
        uColors: { value: uColorsArray },
        uTransparent: { value: transparent ? 1 : 0 },
        uScale: { value: scale },
        uFrequency: { value: frequency },
        uWarpStrength: { value: warpStrength },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: mouseInfluence },
        uParallax: { value: parallax },
        uNoise: { value: noise },
        uIterations: { value: iterations },
        uIntensity: { value: intensity },
        uBandWidth: { value: bandWidth }
      },
      premultipliedAlpha: true,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const isMobileDevice = window.innerWidth < 992;
    renderer.setPixelRatio(isMobileDevice ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, transparent ? 0 : 1);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    const handleResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      material.uniforms.uCanvas.value.set(w, h);
    };

    handleResize();

    let ro;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(handleResize);
      ro.observe(container);
    } else {
      window.addEventListener('resize', handleResize);
    }

    const rotationRef = { current: rotation };
    const autoRotateRef = { current: autoRotate };
    const pointerTargetRef = { current: new THREE.Vector2(0, 0) };
    const pointerCurrentRef = { current: new THREE.Vector2(0, 0) };
    const pointerSmoothRef = { current: 8 };

    const handlePointerMove = e => {
      if (window.innerWidth < 992) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
      const y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };

    container.addEventListener('pointermove', handlePointerMove);

    let rafId;
    const loop = () => {
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;
      material.uniforms.uTime.value = elapsed;

      const deg = (rotationRef.current % 360) + autoRotateRef.current * elapsed;
      const rad = (deg * Math.PI) / 180;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      material.uniforms.uRot.value.set(c, s);

      const cur = pointerCurrentRef.current;
      const tgt = pointerTargetRef.current;
      const amt = Math.min(1, dt * pointerSmoothRef.current);
      cur.lerp(tgt, amt);
      material.uniforms.uPointer.value.copy(cur);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    bandWidth,
    frequency,
    intensity,
    iterations,
    mouseInfluence,
    noise,
    parallax,
    scale,
    speed,
    transparent,
    warpStrength,
    rotation,
    autoRotate,
    colors
  ]);

  return <div ref={containerRef} className={`color-bends-container ${className}`} style={style} />;
}
