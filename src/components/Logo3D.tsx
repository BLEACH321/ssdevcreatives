import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group } from "three";

const GridCube = () => {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  // Smoothly rotate the cube
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Base slow rotation, speeds up significantly on hover
      const targetSpeed = hovered ? 3 : 0.5;
      
      // Interpolate rotation speed for smoothness
      groupRef.current.rotation.x += delta * targetSpeed * 0.5;
      groupRef.current.rotation.y += delta * targetSpeed;
    }
  });

  // Calculate coordinates for a 3x3x3 grid
  const cubes = [];
  const offset = 1.1; // Distance between cubes
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Skip the very center so there's a glowing core visible
        if (x === 0 && y === 0 && z === 0) continue;
        
        cubes.push(
          <mesh
            key={`${x}-${y}-${z}`}
            position={[x * offset, y * offset, z * offset]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#1a1a1e" // Dark sleek carbon/metal look
              roughness={0.4}
              metalness={0.8}
            />
          </mesh>
        );
      }
    }
  }

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={0.95}
    >
      {/* The 26 outer cubes */}
      {cubes}
      
      {/* Inner glowing core */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
      
      {/* Dynamic Cyan Lights to simulate light spilling through the cracks */}
      <pointLight position={[0, 0, 0]} intensity={50} distance={10} color="#00ffff" />
      <pointLight position={[2, 2, 2]} intensity={20} distance={10} color="#00ffff" />
      <pointLight position={[-2, -2, -2]} intensity={20} distance={10} color="#00ffff" />
    </group>
  );
};

const Logo3D = () => {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "8px", overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
        {/* Brighter ambient lighting for the overall scene */}
        <ambientLight intensity={3.5} />
        {/* Brighter directional lights from different angles to pop the dark metallic faces */}
        <directionalLight position={[5, 5, 5]} intensity={4} />
        <directionalLight position={[-5, 5, -5]} intensity={3} color="#5eead4" />
        {/* Front light so the facing cubes never look too deeply shadowed */}
        <directionalLight position={[0, 0, 8]} intensity={3.5} />

        <GridCube />
      </Canvas>
    </div>
  );
};

export default Logo3D;
