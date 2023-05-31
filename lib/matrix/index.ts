import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import { DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

let container;

let camera:PerspectiveCamera; let scene:Scene; let renderer:WebGLRenderer; let
  controls;

const lights:DirectionalLight[] = [];

// options
const data = {
  model: 'Teapot',
  wireframe: false,
  texture: false,
  detail: 4,

  QuantizePosEncoding: false,
  NormEncodingMethods: 'None', // for normal encodings
  DefaultUVEncoding: false,

  totalGPUMemory: '0 bytes',
};

// geometry params
const radius = 100;

// materials
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.8 });
const meshMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });

// texture
const texture = new THREE.TextureLoader().load('textures/uv_grid_opengl.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

function newGeometry(gData: any) {
  switch (gData.model) {
    case 'Icosahedron':
      return new THREE.IcosahedronGeometry(radius, gData.detail);
    case 'Cylinder':
      return new THREE.CylinderGeometry(radius / 1.5, radius / 1.5, radius, gData.detail * 6);
    case 'Teapot':
      return new TeapotGeometry(radius / 1.5, gData.detail * 3, true, true, true, true, 1);
    case 'TorusKnot':
    default:
      return new THREE.TorusKnotGeometry(radius / 2, 10, gData.detail * 30, gData.detail * 6, 3, 4);
  }
}

//
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}

export function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.setScalar(2 * radius);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false;

  //

  scene.add(new THREE.AmbientLight(0xffffff, 0.1));

  lights[0] = new THREE.DirectionalLight(0xffffff, 0.7);
  lights[1] = new THREE.DirectionalLight(0xffffff, 0.7);
  lights[2] = new THREE.DirectionalLight(0xffffff, 0.7);

  lights[0].position.set(0, 2 * radius, 0);
  lights[1].position.set(2 * radius, -2 * radius, 2 * radius);
  lights[2].position.set(-2 * radius, -2 * radius, -2 * radius);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

  //

  scene.add(new THREE.AxesHelper(radius * 5));

  let geom = newGeometry(data);

  const mesh = new THREE.Mesh(geom, meshMaterial);
  scene.add(mesh);

  const lineSegments = new THREE.LineSegments(new THREE.WireframeGeometry(geom), lineMaterial);
  lineSegments.visible = data.wireframe;

  scene.add(lineSegments);

  window.addEventListener('resize', onWindowResize);
}

//

export function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
