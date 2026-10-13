import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export type VaultScene = { open: () => void; dispose: () => void };
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => { const t = clamp(n); return t * t * t * (t * (t * 6 - 15) + 10); };

/** Transparent WebGL doors reveal the real DOM behind the scene, not a screenshot. */
export function createVaultScene(host: HTMLElement, onComplete: () => void, onLost: () => void): VaultScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 90);
  const world = new THREE.Group();
  world.position.y = .6;
  scene.add(world);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  // Seeded, brushed microtexture; generated locally, with no network texture requests.
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#a4a4a4"; ctx.fillRect(0, 0, 512, 512);
  let seed = 71;
  const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let i = 0; i < 3000; i++) {
    const y = random() * 512;
    ctx.strokeStyle = `rgba(${random() > .5 ? "255,255,255" : "0,0,0"},${random() * .12})`;
    ctx.beginPath(); ctx.moveTo(random() * 512, y); ctx.lineTo(512, y + random() * .6); ctx.stroke();
  }
  const grain = new THREE.CanvasTexture(canvas);
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  grain.repeat.set(2, 2);
  const steel = new THREE.MeshStandardMaterial({ color: 0x99a6b5, metalness: .94, roughness: .32, bumpMap: grain, bumpScale: .013 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x202934, metalness: .88, roughness: .42, bumpMap: grain, bumpScale: .015 });
  const bevelSteel = new THREE.MeshStandardMaterial({ color: 0x647587, metalness: .98, roughness: .24 });
  const plate = new THREE.MeshStandardMaterial({ color: 0x080d14, metalness: .8, roughness: .55, envMapIntensity: .35, bumpMap: grain, bumpScale: .006 });
  const inset = new THREE.MeshStandardMaterial({ color: 0x05080c, metalness: .6, roughness: .7 });
  const amber = new THREE.MeshStandardMaterial({ color: 0xff9e25, emissive: 0xff6f08, emissiveIntensity: 2.2, metalness: .45, roughness: .25 });
  const edgeLight = new THREE.MeshBasicMaterial({ color: 0xfbb350, transparent: true, opacity: .8 });

  scene.add(new THREE.AmbientLight(0x9dabc2, .3));
  const key = new THREE.DirectionalLight(0xe5f1ff, 4.5); key.position.set(-3, 5, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0x4b8abb, 2.8); rim.position.set(5, -2, 4); scene.add(rim);
  const warm = new THREE.PointLight(0xff7b12, 8, 12, 2); warm.position.set(0, 0, 2); scene.add(warm);

  function shapeMesh(points: number[][], depth: number, material: THREE.Material | THREE.Material[], bevel = .035) {
    const shape = new THREE.Shape();
    points.forEach(([x, y], i) => i ? shape.lineTo(x, y) : shape.moveTo(x, y));
    shape.closePath();
    return new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelSegments: 2, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 12 }), material);
  }
  function box(parent: THREE.Object3D, x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material); mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  }
  function arc(parent: THREE.Object3D, radius: number, thickness: number, start: number, length: number, z: number, material: THREE.Material) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 6, Math.ceil(length * 30), length), material);
    mesh.rotation.z = start; mesh.position.z = z; parent.add(mesh); return mesh;
  }
  const left = new THREE.Group(), right = new THREE.Group();
  world.add(left, right);
  // The seam follows the diagonal cut of the brand emblem. Oversized solids cover all viewports.
  const seam = [[0, 24], [0, 1.9], [.34, 1.56], [-.35, -.35], [.16, -.88], [0, -1.9], [0, -24]];
  const leftDoor = shapeMesh([[-30, 24], ...seam, [-30, -24]], .25, [plate, darkSteel], .005);
  const rightDoor = shapeMesh([[30, 24], ...seam, [30, -24]], .25, [plate, darkSteel], .005);
  leftDoor.position.z = rightDoor.position.z = -1.1;
  left.add(leftDoor); right.add(rightDoor);
  // Layered semicircular housings, recesses, precision ticks and locking pistons.
  const bolts: { mesh: THREE.Mesh; angle: number; radius: number }[] = [];
  for (const [side, start] of [[left, Math.PI / 2], [right, -Math.PI / 2]] as const) {
    arc(side, 2.26, .20, start + .007, Math.PI - .014, -.63, darkSteel);
    arc(side, 2.49, .018, start, Math.PI, -.65, bevelSteel);
    arc(side, 2.02, .022, start + .02, Math.PI - .04, -.32, steel);
    arc(side, 2.16, .017, start + .04, Math.PI - .08, -.35, amber);
    arc(side, 2.64, .012, start, Math.PI, -.75, darkSteel);
    for (let i = 0; i < 32; i++) {
      const a = start + (i + .5) * Math.PI / 32;
      const tick = box(side, Math.cos(a) * 2.38, Math.sin(a) * 2.38, -.4, i % 4 === 0 ? .13 : .06, .014, .025, i % 8 === 0 ? amber : bevelSteel);
      tick.rotation.z = a;
    }
    for (let i = 0; i < 4; i++) {
      const a = start + (i + .5) * Math.PI / 4;
      const bolt = box(side, Math.cos(a) * 2.17, Math.sin(a) * 2.17, -.2, .34, .115, .14, steel);
      bolt.rotation.z = a; bolts.push({ mesh: bolt, angle: a, radius: 2.17 });
      const housing = box(side, Math.cos(a) * 2.52, Math.sin(a) * 2.52, -.5, .42, .22, .14, darkSteel);
      housing.rotation.z = a;
    }
    // Architectural ribs extend into darkness, so the emblem belongs to a vault.
    const sign = side === left ? -1 : 1;
    for (const y of [-2.9, 2.9]) {
      box(side, sign * 6.4, y, -.72, 7.2, .032, .035, darkSteel);
      box(side, sign * 3.1, y, -.68, .13, .13, .03, bevelSteel);
    }
    for (const y of [-1.45, 1.45]) {
      const rib = box(side, sign * 5.2, y, -.71, 4.6, .015, .02, darkSteel); rib.rotation.z = sign * .08;
    }
  }
  // Extruded silhouette follows the supplied Xemory symbol; no flat logo texture.
  const upperPoints = [[555,252],[630,252],[728,348],[554,523],[554,558],[590,595],[518,664],[410,585],[410,445],[540,332],[540,264]];
  const lowerPoints = [[764,380],[850,473],[850,621],[727,728],[727,781],[641,781],[548,683],[720,521],[720,492],[689,462]];
  const brandPoints = (points: number[][]) => points.map(([x,y]) => [(x - 632) / 155, (520 - y) / 155]);
  const upper = shapeMesh(brandPoints(upperPoints), .20, [steel, bevelSteel], .035);
  const lower = shapeMesh(brandPoints(lowerPoints), .20, [steel, bevelSteel], .035);
  upper.position.z = lower.position.z = .15;
  left.add(upper); right.add(lower);
  for (const [parent, points] of [[left, upperPoints], [right, lowerPoints]] as const) {
    const backing = shapeMesh(brandPoints(points as number[][]), .16, inset, .05); backing.position.set(.03, -.035, -.03); parent.add(backing);
  }
  const core = new THREE.Group(); world.add(core);
  const crystal = shapeMesh(brandPoints([[603,525],[665,471],[665,531],[604,581]]), .24, [amber, steel], .018);
  crystal.position.z = .30; core.add(crystal);
  // Soft amber illumination is a transparent local shader, not a full-screen flash.
  const glowMaterial = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { strength: { value: .32 } },
    vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader: "varying vec2 vUv; uniform float strength; void main(){float d=length(vUv-.5)*2.;float a=pow(max(0.,1.-d),3.)*strength;gl_FragColor=vec4(1.,.32,.035,a);}" });
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), glowMaterial); glow.position.set(0, -.1, .8); core.add(glow);
  const seamGlow = box(world, 0, 0, -.85, .018, 30, .02, edgeLight);
  seamGlow.visible = false;

  let openingAt: number | null = null, disposed = false, finished = false, frame = 0;
  let cameraDistance = 12.7, halfWidth = 8, lastDraw = 0, phase = 0;
  let pointerX = 0, pointerY = 0;
  const size = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    // Reserve space for real HTML headings and the entry control above/below the model.
    cameraDistance = Math.max(12.7, 8.9 / camera.aspect);
    camera.position.set(0, .03, cameraDistance); camera.updateProjectionMatrix();
    halfWidth = Math.tan(THREE.MathUtils.degToRad(19)) * cameraDistance * camera.aspect;
    renderer.setSize(w, h);
  };
  const resize = new ResizeObserver(size); resize.observe(host); size();
  const pointer = (e: PointerEvent) => { pointerX = (e.clientX / window.innerWidth - .5); pointerY = (e.clientY / window.innerHeight - .5); };
  const lose = (e: Event) => { e.preventDefault(); onLost(); };
  renderer.domElement.addEventListener("webglcontextlost", lose);
  window.addEventListener("pointermove", pointer, { passive: true });
  const draw = (now: number) => {
    if (disposed) return;
    frame = requestAnimationFrame(draw);
    if (document.hidden || (openingAt === null && now - lastDraw < 32)) return;
    // Elapsed motion freezes in a hidden tab; return to a coherent reveal, never a stale gate.
    const delta = Math.min(now - lastDraw, 50); lastDraw = now;
    if (openingAt !== null) phase += delta / 1000;
    const t = phase;
    const charge = openingAt === null ? .04 * Math.sin(now * .0015) : ease(t / .7);
    const retract = ease((t - .58) / .6);
    const openLeft = ease((t - 1.05) / 2.35), openRight = ease((t - 1.18) / 2.35);
    const breathe = 1 - ease((t - .86) / .65);
    amber.emissiveIntensity = 2.0 + charge * 2.5;
    warm.intensity = (6 + charge * 22) * (openingAt === null ? 1 : breathe);
    glowMaterial.uniforms.strength.value = (.28 + charge * .55) * (openingAt === null ? 1 : breathe);
    for (const bolt of bolts) {
      const r = bolt.radius + retract * .27;
      bolt.mesh.position.x = Math.cos(bolt.angle) * r; bolt.mesh.position.y = Math.sin(bolt.angle) * r;
    }
    if (openingAt !== null) {
      core.scale.setScalar(Math.max(.001, 1 - ease((t - .78) / .52)));
      core.rotation.y = retract * .6;
      left.position.set(-openLeft * (halfWidth + 3.8), openLeft * .30, Math.sin(openLeft * Math.PI) * .75);
      right.position.set(openRight * (halfWidth + 3.8), -openRight * .30, Math.sin(openRight * Math.PI) * .75);
      left.rotation.y = -Math.sin(openLeft * Math.PI) * .22;
      right.rotation.y = Math.sin(openRight * Math.PI) * .22;
      seamGlow.visible = t > .65 && t < 1.18;
      edgeLight.opacity = Math.sin(clamp((t - .65) / .53) * Math.PI) * .65;
      camera.position.z = cameraDistance - ease((t - .3) / 2.9) * .38;
    } else {
      world.rotation.y += (pointerX * .035 - world.rotation.y) * .045;
      world.rotation.x += (pointerY * .018 - world.rotation.x) * .045;
    }
    renderer.render(scene, camera);
    if (openingAt !== null && t >= 3.7 && !finished) { finished = true; onComplete(); }
  };
  renderer.render(scene, camera);
  frame = requestAnimationFrame(draw);
  return {
    open() { if (openingAt !== null || disposed) return; openingAt = performance.now(); lastDraw = openingAt; world.rotation.set(0,0,0); },
    dispose() {
      if (disposed) return; disposed = true; cancelAnimationFrame(frame); resize.disconnect();
      window.removeEventListener("pointermove", pointer); renderer.domElement.removeEventListener("webglcontextlost", lose);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(m=>materials.add(m)); } });
      geometries.forEach(g=>g.dispose()); materials.forEach(m=>m.dispose()); grain.dispose(); environment.dispose();
      renderer.dispose(); renderer.domElement.remove();
    },
  };
}
