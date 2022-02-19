import React, { useState, useRef, useEffect } from 'react';
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
import { AnimationTicker } from '../AnimationTicker';
import './useStyles.scss';
interface Sprite {
  position: [x: number, y: number, z: number];
  texture: any;
}

const globalAnimationTicker = new AnimationTicker();

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function Sprite() {
  // Sprite attributes
  const [position, setPosition] = useState<Sprite['position']>([0, 0, 0]);
  const [upKeyActive, setUpKeyActive] = useState(false);
  const [rightKeyActive, setRightKeyActive] = useState(false);
  const [downKeyActive, setDownKeyActive] = useState(false);
  const [leftKeyActive, setLeftKeyActive] = useState(false);

  const texture: Sprite['texture'] = useLoader(TextureLoader, spriteImg);

  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Key controls
  const leftKey = useKeyPress(['ArrowLeft', 'a']);
  const rightKey = useKeyPress(['ArrowRight', 'd']);
  const upKey = useKeyPress(['ArrowUp', 'w']);
  const downKey = useKeyPress(['ArrowDown', 's']);

  if (upKeyActive !== upKey) {
    setUpKeyActive(upKey);
  }

  if (rightKeyActive !== rightKey) {
    setRightKeyActive(rightKey);
  }

  if (downKeyActive !== downKey) {
    setDownKeyActive(downKey);
  }

  if (leftKeyActive !== leftKey) {
    setLeftKeyActive(leftKey);
  }

  useEffect(() => {
    globalAnimationTicker.upKeyActive = upKeyActive;
    globalAnimationTicker.rightKeyActive = rightKeyActive;
    globalAnimationTicker.downKeyActive = downKeyActive;
    globalAnimationTicker.leftKeyActive = leftKeyActive;
    console.log('hey new up key', globalAnimationTicker.upKeyActive);
  }, [upKeyActive, rightKeyActive, downKeyActive, leftKeyActive]);

  function startAnimation() {
    if (!globalAnimationTicker.interval) {
      globalAnimationTicker.SetUp(texture);
      globalAnimationTicker.Start();
    }
  }

  startAnimation();

  return (
    <sprite position={position}>
      <spriteMaterial map={texture} transparent />
    </sprite>
  );
}
