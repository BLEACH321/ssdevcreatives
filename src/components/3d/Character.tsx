import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const Character = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    // NOTE: Uncomment the line below to load an actual .glb model
    // const { scene } = useGLTF('/model.glb');

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            {/* 
        Uncomment below to use the loaded model:
        <primitive object={scene} scale={[1, 1, 1]} /> 
      */}

            {/* Placeholder Abstract Shape */}
            <mesh ref={meshRef} scale={1.5}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    color="#38bdf8"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                />
            </mesh>
        </Float>
    );
};

// Preload the model if using actual gltf
// useGLTF.preload('/model.glb');
