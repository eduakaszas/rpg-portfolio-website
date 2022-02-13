import React, { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import Scene from '../Scene';
import './useStyles.scss';

export default function App() {
  return (
    <Canvas dpr={1} linear flat>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
