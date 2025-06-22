
"use client";
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function VR(props) {
  const { nodes, materials } = useGLTF('/vr_headset_simple.glb')
  return (
    <group scale={[0.5, 0.5, 0.5]}{...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.place_holder}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/vr_headset_simple.glb')