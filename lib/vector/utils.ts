import { Group, Quaternion, Vector3 } from 'three';
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

export const getLabel = (position: Vector3, lineName: string, color = 'white') => {
  const lineDiv = document.createElement('div');
  lineDiv.className = 'label';
  lineDiv.textContent = lineName;
  lineDiv.style.backgroundColor = 'transparent';
  lineDiv.style.color = color;

  const label = new CSS2DObject(lineDiv);
  label.position.set(...position.toArray());
  label.center.set(0, 1);
  label.layers.set(0);

  return label;
};

export const getLineVector = (points: Vector3[], lineName: string, lineColor = '#CC0000') => {
  const group = new Group();

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // materials
  const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor });
  const line = new THREE.Line(geometry, lineMaterial);
  line.layers.enableAll();

  const lastPoint = points[points.length - 1];
  const label = getLabel(lastPoint, lineName);

  line.add(label);

  const geometry1 = new THREE.CylinderGeometry(0, 1, 4, 32);
  const material = new THREE.MeshBasicMaterial({ color: lineColor });
  const cylinder = new THREE.Mesh(geometry1, material);
  cylinder.position.copy(lastPoint);

  // 从 y轴到 直线需要的旋转
  const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0).normalize(), lastPoint.normalize());
  cylinder.applyQuaternion(quaternion);

  group.add(line);
  group.add(cylinder);

  return group;
};
