import { Line, Scene, Vector3 } from 'three';
import { getLabel, getLineVector } from './utils';

export const targetVector = new Vector3(0, 10, 10);

export const p2Vector = new Vector3(100, 0, 100);

export const p3Vector = new Vector3(10, 20, 40);

export const getNormalizeLine = (scene: Scene) => {
  const lines = targetVector.normalize();
  const line2 = getLineVector([new Vector3(0, 0, 0), lines], `Pn(${lines.x},${lines.y},${lines.z})`, 'yellow');

  // @ts-ignore
  window.line2 = line2;

  scene.add(line2);
};

export const getAddLine = (scene: Scene) => {
  const line2 = getLineVector([new Vector3(0, 0, 0), p2Vector.clone()], 'P2(100, 0, 100)');

  const sum = targetVector.clone().add(p2Vector);
  const line3 = getLineVector([new Vector3(0, 0, 0), sum], 'Psum(100, 100, 200)');

  // @ts-ignore
  window.line2 = line2;

  scene.add(line2);
  scene.add(line3);
};

export const getMutlLine = (scene: Scene) => {
  const line2 = getLineVector([new Vector3(0, 0, 0), p3Vector.clone()], 'P2(10, 20, 40)');

  const mut = targetVector.clone().cross(p3Vector);
  console.log(mut);
  const line3 = getLineVector([new Vector3(0, 0, 0), mut], 'Pcross(200, 100, -100)');

  // @ts-ignore
  window.line2 = line2;

  scene.add(line2);
  scene.add(line3);
};

export const getTranslateLine = (line1: Line) => {
  const line2 = line1.clone().translateX(100);
  line2.children[0].removeFromParent();
  line2.add(getLabel(targetVector, "P'(100, 100, 100)", 'red'));
  return line2;
};
