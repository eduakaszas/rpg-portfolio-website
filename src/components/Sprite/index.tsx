import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { PlainAnimator } from 'three-plain-animator/lib/plain-animator';

import spriteImg from '../../assets/images/player.png';
import useKeyPress from '../../hooks/useKeyPress';
import './useStyles.scss';

interface Sprite {
  position: [x: number, y: number, z: number];
  size: [x: number, y: number];
  texture: any;
}

export default function Sprite() {
  // Sprite attributes
  const [position, setPosition] = useState<Sprite['position']>([0, 0, 0]);
  const [size, setSize] = useState<Sprite['size']>([1, 1]);

  const texture: Sprite['texture'] = useLoader(TextureLoader, spriteImg);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const [animator] = useState(() => new PlainAnimator(texture, 3, 3, 8, 10));

  useFrame(() => animator.animate());

  // Key controls
  const leftKey = useKeyPress(['ArrowLeft', 'a']);
  const rightKey = useKeyPress(['ArrowRight', 'd']);
  const upKey = useKeyPress(['ArrowUp', 'w']);
  const downKey = useKeyPress(['ArrowDown', 's']);

  return (
    <sprite position={position}>
      <spriteMaterial map={texture} transparent />
    </sprite>
  );
}
