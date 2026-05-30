import * as THREE from 'three';

interface ICreateGridTextureProps {
  cellSizeExponent?: number;
  cellsExponent?: number;
  lineWidthExponent?: number;
}

export function createGridTexture({
  cellSizeExponent = 6,
  cellsExponent = 6,
  lineWidthExponent = 1,
}: ICreateGridTextureProps): THREE.CanvasTexture {
  const cellSize = 2 ** cellSizeExponent;
  const cells = 2 ** cellsExponent;

  const canvas = document.createElement('canvas');
  const canvasSize = (canvas.height = canvas.width = cellSize * cells);

  const context = canvas.getContext('2d')!;

  // Background
  context.fillStyle = '#8000FF';
  context.fillRect(0, 0, canvasSize, canvasSize);

  // Grid lines
  context.strokeStyle = '#ff00ff';
  context.lineWidth = 2 ** lineWidthExponent;

  context.beginPath();
  for (let i = 0; i <= cells; i++) {
    const pos = i * cellSize;
    // vertical
    context.moveTo(pos, 0);
    context.lineTo(pos, canvasSize);
    // horizontal
    context.moveTo(0, pos);
    context.lineTo(canvasSize, pos);
  }
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Displacement map: smooth wavy height based on sin/cos functions.
 * (Bright = high, dark = low.)
 */
export function createDisplacementTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;

      // A few layered waves to mimic mountains/bumps
      const wave1 = Math.sin(u * Math.PI * 6.0 + v * Math.PI * 4.0);
      const wave2 = Math.cos(u * Math.PI * 2.0 - v * Math.PI * 8.0);
      const wave3 = Math.sin(v * Math.PI * 10.0);

      let height = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2 + 1.0) * 0.5;
      // Clamp between 0 and 1
      height = Math.min(1, Math.max(0, height));

      const value = Math.floor(height * 255);
      const idx = (y * size + x) * 4;
      data[idx + 0] = value;
      data[idx + 1] = value;
      data[idx + 2] = value;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Metalness map: make lines/peaks more/less metallic.
 * Here we create a soft radial + grid mask so some regions are
 * glossy and others more diffuse.
 */
export function createMetalnessTexture(size = 512, cells = 24): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  const centerX = size / 2;
  const centerY = size / 2;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

  const step = size / cells;
  const lineWidth = step * 0.25;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // distance from center
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radial = 1.0 - dist / maxDist; // 1 in center, 0 at corners

      // grid proximity: bright near grid lines
      const gx = Math.min(x % step, step - (x % step));
      const gy = Math.min(y % step, step - (y % step));
      const g = Math.min(gx, gy);
      const gridMask = 1.0 - Math.min(1, g / lineWidth);

      // Combine: some metallic lines, some rougher in between
      let metalness = radial * 0.4 + gridMask * 0.8;
      metalness = Math.min(1, Math.max(0, metalness));

      const value = Math.floor(metalness * 255);
      const idx = (y * size + x) * 4;
      data[idx + 0] = value;
      data[idx + 1] = value;
      data[idx + 2] = value;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}
