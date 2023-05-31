import * as THREE from 'three';
import { Scene, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as MATH from 'mathjs';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { getLineVector } from './utils';
import { getAddLine, getMutlLine, getNormalizeLine, targetVector } from './lines';

// @ts-ignore
window.MATH = MATH;
// @ts-ignore
window.THREE = THREE;

// const meshMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });

// geometry params
const radius = 100;

export function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new Scene();

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.setScalar(2 * radius);
  camera.layers.enableAll();

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  document.body.appendChild(labelRenderer.domElement);

  // eslint-disable-next-line no-new
  new OrbitControls(camera, labelRenderer.domElement);

  scene.add(new THREE.AxesHelper(radius * 5));

  const line1 = getLineVector([new Vector3(0, 0, 0), targetVector.clone()], 'P1(0, 10, 10)');

  // 法线
  // getNormalizeLine(scene);

  // 向量相加
  // getAddLine(scene);

  // 叉乘
  getMutlLine(scene);

  // @ts-ignore
  window.line1 = line1;

  scene.add(line1);

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  }

  animate();

  window.addEventListener('resize', onWindowResize);
}

//
