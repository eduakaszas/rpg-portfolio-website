import React from 'react';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import Sprite from '../Sprite';
import sceneImg from '../../assets/images/player.png';
import './useStyles.scss';

export default function Scene() {
  return (
    <mesh>
      <Sprite />
      <ambientLight intensity={1} />
    </mesh>
  );
}
