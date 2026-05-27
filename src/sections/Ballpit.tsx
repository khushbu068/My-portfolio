/**
 * Ballpit.tsx
 * Physics-based 3D sphere background using Three.js only (no extra deps).
 * Requires: three@^0.160+ (already in your package.json as ^0.184.0)
 */
import React, { useEffect, useRef } from 'react';
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  InstancedMesh,
  MathUtils,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PointLight,
  Raycaster,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

// ─── Simple clock (avoids THREE.Clock deprecation in r168+) ───────────────────
class SimpleClock {
  private last = performance.now();
  private running = false;
  start()  { this.last = performance.now(); this.running = true; }
  stop()   { this.running = false; }
  getDelta() {
    if (!this.running) return 0;
    const now = performance.now();
    const d = (now - this.last) / 1000;
    this.last = now;
    return Math.min(d, 0.1); // cap at 100ms to avoid spiral-of-death
  }
}

// ─── Physics world ────────────────────────────────────────────────────────────
interface PhysicsConfig {
  count: number;
  maxX: number; maxY: number; maxZ: number;
  minSize: number; maxSize: number; size0: number;
  gravity: number; friction: number; wallBounce: number; maxVelocity: number;
  controlSphere0: boolean;
}

class Physics {
  cfg: PhysicsConfig;
  pos: Float32Array;
  vel: Float32Array;
  sizes: Float32Array;
  center = new Vector3();

  constructor(cfg: PhysicsConfig) {
    this.cfg = cfg;
    this.pos = new Float32Array(cfg.count * 3);
    this.vel = new Float32Array(cfg.count * 3);
    this.sizes = new Float32Array(cfg.count);
    this.#seed();
    this.#seedSizes();
  }

  #seed() {
    for (let i = 1; i < this.cfg.count; i++) {
      this.pos[i*3]   = MathUtils.randFloatSpread(this.cfg.maxX * 2);
      this.pos[i*3+1] = MathUtils.randFloatSpread(this.cfg.maxY * 2);
      this.pos[i*3+2] = MathUtils.randFloatSpread(this.cfg.maxZ * 2);
    }
  }

  #seedSizes() {
    this.sizes[0] = this.cfg.size0;
    for (let i = 1; i < this.cfg.count; i++) {
      this.sizes[i] = MathUtils.randFloat(this.cfg.minSize, this.cfg.maxSize);
    }
  }

  update(dt: number) {
    const { cfg, pos, vel, sizes } = this;
    const start = cfg.controlSphere0 ? 1 : 0;

    // Move sphere0 toward cursor
    if (cfg.controlSphere0) {
      const p = new Vector3().fromArray(pos, 0);
      p.lerp(this.center, 0.12);
      p.toArray(pos, 0);
      vel[0] = vel[1] = vel[2] = 0;
    }

    // Integrate
    for (let i = start; i < cfg.count; i++) {
      const b = i * 3;
      vel[b+1] -= dt * cfg.gravity * sizes[i];
      vel[b]   *= cfg.friction;
      vel[b+1] *= cfg.friction;
      vel[b+2] *= cfg.friction;
      const spd = Math.sqrt(vel[b]**2 + vel[b+1]**2 + vel[b+2]**2);
      if (spd > cfg.maxVelocity) {
        const s = cfg.maxVelocity / spd;
        vel[b] *= s; vel[b+1] *= s; vel[b+2] *= s;
      }
      pos[b]   += vel[b];
      pos[b+1] += vel[b+1];
      pos[b+2] += vel[b+2];
    }

    // Sphere-sphere collisions (O(n²) — fine for n≤200)
    for (let i = start; i < cfg.count; i++) {
      const bi = i * 3;
      const ri = sizes[i];
      for (let j = i + 1; j < cfg.count; j++) {
        const bj = j * 3;
        const dx = pos[bj]-pos[bi], dy = pos[bj+1]-pos[bi+1], dz = pos[bj+2]-pos[bi+2];
        const dist2 = dx*dx + dy*dy + dz*dz;
        const sum = ri + sizes[j];
        if (dist2 < sum * sum && dist2 > 0.0001) {
          const dist = Math.sqrt(dist2);
          const overlap = (sum - dist) * 0.5;
          const nx = dx/dist * overlap, ny = dy/dist * overlap, nz = dz/dist * overlap;
          pos[bi]  -= nx; pos[bi+1] -= ny; pos[bi+2] -= nz;
          pos[bj]  += nx; pos[bj+1] += ny; pos[bj+2] += nz;
          const rel = Math.max(Math.sqrt(vel[bi]**2+vel[bi+1]**2+vel[bi+2]**2), 1);
          vel[bi]  -= nx*rel; vel[bi+1] -= ny*rel; vel[bi+2] -= nz*rel;
          vel[bj]  += nx*rel; vel[bj+1] += ny*rel; vel[bj+2] += nz*rel;
        }
      }
      // Wall bounce
      const b = bi;
      if (Math.abs(pos[b])   + ri > cfg.maxX) { pos[b]   = Math.sign(pos[b])*(cfg.maxX-ri);   vel[b]   *= -cfg.wallBounce; }
      if (cfg.gravity === 0) {
        if (Math.abs(pos[b+1]) + ri > cfg.maxY) { pos[b+1] = Math.sign(pos[b+1])*(cfg.maxY-ri); vel[b+1] *= -cfg.wallBounce; }
      } else if (pos[b+1] - ri < -cfg.maxY) {
        pos[b+1] = -cfg.maxY + ri; vel[b+1] *= -cfg.wallBounce;
      }
      if (Math.abs(pos[b+2]) + ri > cfg.maxZ) { pos[b+2] = Math.sign(pos[b+2])*(cfg.maxZ-ri); vel[b+2] *= -cfg.wallBounce; }
    }
  }
}

// ─── Instanced sphere mesh ────────────────────────────────────────────────────
const _dummy = new Object3D();

class BallpitMesh extends InstancedMesh {
  physics: Physics;
  light: PointLight;

  constructor(
    renderer: WebGLRenderer,
    cfg: PhysicsConfig,
    colors: number[],
    lightIntensity: number,
    materialParams: { metalness: number; roughness: number },
  ) {
    const mat = new MeshStandardMaterial({ metalness: materialParams.metalness, roughness: materialParams.roughness });
    super(new SphereGeometry(1, 16, 12), mat, cfg.count);
    this.physics = new Physics(cfg);
    this.light = new PointLight(colors[0], lightIntensity);
    this.add(new AmbientLight(0x0a0a1a, 0.5));
    this.add(this.light);
    this.#applyColors(colors);
    void renderer; // renderer kept for API compat
  }

  #applyColors(colors: number[]) {
    if (!colors.length) return;
    const objs = colors.map(c => new Color(c));
    for (let i = 0; i < this.count; i++) {
      const t = i / (this.count - 1);
      const scaled = t * (objs.length - 1);
      const idx = Math.min(Math.floor(scaled), objs.length - 2);
      const alpha = scaled - idx;
      const a = objs[idx], b = objs[idx + 1];
      const out = new Color(
        a.r + alpha * (b.r - a.r),
        a.g + alpha * (b.g - a.g),
        a.b + alpha * (b.b - a.b),
      );
      this.setColorAt(i, out);
      if (i === 0) this.light.color.copy(out);
    }
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  tick(dt: number) {
    this.physics.update(dt);
    for (let i = 0; i < this.count; i++) {
      _dummy.position.fromArray(this.physics.pos, i * 3);
      _dummy.scale.setScalar(this.physics.sizes[i]);
      _dummy.updateMatrix();
      this.setMatrixAt(i, _dummy.matrix);
      if (i === 0) this.light.position.copy(_dummy.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

// ─── Pointer tracker ──────────────────────────────────────────────────────────
function makePointer(canvas: HTMLCanvasElement, onMove: (n: Vector2) => void, onLeave: () => void) {
  const npos = new Vector2();
  function update(cx: number, cy: number) {
    const r = canvas.getBoundingClientRect();
    npos.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    onMove(npos);
  }
  const pm = (e: PointerEvent) => { if (isOver(e)) update(e.clientX, e.clientY); else onLeave(); };
  const pl = () => onLeave();
  const tm = (e: TouchEvent) => { e.preventDefault(); if (e.touches[0]) update(e.touches[0].clientX, e.touches[0].clientY); };
  const te = () => onLeave();
  function isOver(e: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  }
  window.addEventListener('pointermove', pm);
  window.addEventListener('pointerleave', pl);
  canvas.addEventListener('touchmove', tm, { passive: false });
  canvas.addEventListener('touchend', te);
  return () => {
    window.removeEventListener('pointermove', pm);
    window.removeEventListener('pointerleave', pl);
    canvas.removeEventListener('touchmove', tm);
    canvas.removeEventListener('touchend', te);
  };
}

// ─── Scene factory ────────────────────────────────────────────────────────────
interface SceneConfig {
  count: number;
  colors: number[];
  gravity: number;
  friction: number;
  wallBounce: number;
  maxVelocity: number;
  minSize: number;
  maxSize: number;
  size0: number;
  lightIntensity: number;
  materialParams: { metalness: number; roughness: number };
  followCursor: boolean;
}

function createScene(container: HTMLElement, cfg: SceneConfig) {
  // Renderer
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block' });
  container.appendChild(canvas);

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.outputColorSpace = SRGBColorSpace;

  // Scene & camera
  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 1000);
  camera.position.set(0, 0, 20);
  camera.lookAt(0, 0, 0);

  // Resize
  function resize() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Update physics bounds based on world size
    const fovRad = (camera.fov * Math.PI) / 180;
    const wh = 2 * Math.tan(fovRad / 2) * camera.position.z;
    const ww = wh * camera.aspect;
    mesh.physics.cfg.maxX = ww / 2;
    mesh.physics.cfg.maxY = wh / 2;
  }

  // Physics config
  const physCfg: PhysicsConfig = {
    count: cfg.count,
    maxX: 6, maxY: 6, maxZ: 2.5,
    minSize: cfg.minSize, maxSize: cfg.maxSize, size0: cfg.size0,
    gravity: cfg.gravity, friction: cfg.friction,
    wallBounce: cfg.wallBounce, maxVelocity: cfg.maxVelocity,
    controlSphere0: false,
  };

  const mesh = new BallpitMesh(renderer, physCfg, cfg.colors, cfg.lightIntensity, cfg.materialParams);
  scene.add(mesh);

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  window.addEventListener('resize', resize);

  // Pointer
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();
  let cleanupPointer = () => {};

  if (cfg.followCursor) {
    cleanupPointer = makePointer(
      canvas,
      (npos) => {
        raycaster.setFromCamera(npos, camera);
        camera.getWorldDirection(plane.normal);
        if (raycaster.ray.intersectPlane(plane, hit)) {
          mesh.physics.center.copy(hit);
          mesh.physics.cfg.controlSphere0 = true;
        }
      },
      () => { mesh.physics.cfg.controlSphere0 = false; },
    );
  }

  // Animation
  const clock = new SimpleClock();
  clock.start();
  let rafId = 0;
  let running = true;

  function loop() {
    if (!running) return;
    rafId = requestAnimationFrame(loop);
    const dt = clock.getDelta();
    mesh.tick(dt);
    renderer.render(scene, camera);
  }
  loop();

  // Intersection observer — pause when off-screen
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { running = true; clock.start(); loop(); }
    else { running = false; cancelAnimationFrame(rafId); }
  }, { threshold: 0 });
  io.observe(canvas);

  return {
    dispose() {
      running = false;
      cancelAnimationFrame(rafId);
      cleanupPointer();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('resize', resize);
      renderer.dispose();
      renderer.forceContextLoss();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    },
  };
}

// ─── React component ──────────────────────────────────────────────────────────
export interface BallpitProps {
  className?: string;
  followCursor?: boolean;
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  colors?: number[];
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  materialParams?: { metalness?: number; roughness?: number };
}

const Ballpit: React.FC<BallpitProps> = ({
  className = '',
  followCursor = true,
  count = 120,
  gravity = 0,
  friction = 0.9975,
  wallBounce = 0.95,
  maxVelocity = 0.12,
  colors = [0x38bdf8, 0x818cf8, 0xa78bfa, 0x34d399, 0x60a5fa],
  lightIntensity = 180,
  minSize = 0.28,
  maxSize = 0.72,
  size0 = 1.1,
  materialParams = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = createScene(el, {
      count, colors, gravity, friction, wallBounce, maxVelocity,
      minSize, maxSize, size0, lightIntensity, followCursor,
      materialParams: { metalness: 0.6, roughness: 0.25, ...materialParams },
    });

    return () => scene.dispose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    />
  );
};

export default Ballpit;