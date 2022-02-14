import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import spriteImg from '../../assets/images/hero.png';
import useKeyPress from '../../hooks/useKeyPress';
import {
  HORIZONTAL_TILES,
  VERTICAL_TILES,
  NUMBER_OF_TILES,
  TILE_DISPLAY_DURATION,
} from '../../constants/SpriteAttributes';
import './useStyles.scss';

interface Sprite {
  position: [x: number, y: number, z: number];
  texture: any;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function Sprite() {
  // Sprite attributes
  const [position, setPosition] = useState<Sprite['position']>([0, 0, 0]);

  const texture: Sprite['texture'] = useLoader(TextureLoader, spriteImg);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  let intervalId: NodeJS.Timer;

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  texture.repeat.set(1 / HORIZONTAL_TILES, 1 / VERTICAL_TILES);
  let currentTile = 0;

  function calculateNextFrame() {
    currentTile++;

    if (currentTile === NUMBER_OF_TILES) currentTile = 0;

    let currentColumn = currentTile % HORIZONTAL_TILES;
    texture.offset.x = currentColumn / HORIZONTAL_TILES;

    let currentRow = Math.floor(currentTile / HORIZONTAL_TILES);
    texture.offset.y = VERTICAL_TILES - currentRow / VERTICAL_TILES;
  }

  function startAnimation() {
    intervalId = setInterval(calculateNextFrame, TILE_DISPLAY_DURATION);
  }

  function stopAnimation() {
    clearInterval(intervalId);
  }

  startAnimation();

  // Key controls
  const leftKey = useKeyPress(['ArrowLeft', 'a']);
  const rightKey = useKeyPress(['ArrowRight', 'd']);
  const upKey = useKeyPress(['ArrowUp', 'w']);
  const downKey = useKeyPress(['ArrowDown', 's']);

  if (leftKey) console.log('left key is pressed');
  if (rightKey) console.log('right key is pressed');
  if (upKey) console.log('up key is pressed');
  if (downKey) console.log('down key is pressed');

  return (
    <sprite position={position}>
      <spriteMaterial map={texture} transparent />
    </sprite>
  );
}
