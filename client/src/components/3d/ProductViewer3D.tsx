import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Minimize2, Eye, Sun, Layers } from 'lucide-react';

interface ProductViewer3DProps {
  modelType?: 'blazer' | 'dress' | 'sneaker' | 'watch' | 'bag' | 'hoodie' | 'mannequin';
  color?: string;
  autoRotateDefault?: boolean;
}

// Sneaker 3D Procedural Mesh
const SneakerModel = ({ color, wireframe }: { color: string; wireframe: boolean }) => {
  const meshRef = useRef<THREE.Group>(null!);

  return (
    <group ref={meshRef} position={[0, -0.2, 0]}>
      {/* Sole */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.22, 2.6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} wireframe={wireframe} />
      </mesh>
      {/* Golden Shank in Sole */}
      <mesh position={[0, -0.38, 0]}>
        <boxGeometry args={[0.6, 0.08, 1.2]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.9} roughness={0.15} wireframe={wireframe} />
      </mesh>
      {/* Upper Body */}
      <mesh position={[0, 0.1, -0.2]} castShadow>
        <boxGeometry args={[1.05, 0.7, 2.0]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Ankle Collar */}
      <mesh position={[0, 0.55, -0.5]} castShadow>
        <cylinderGeometry args={[0.45, 0.55, 0.5, 24]} />
        <meshStandardMaterial color="#222222" roughness={0.6} wireframe={wireframe} />
      </mesh>
      {/* Toe Cap Curve */}
      <mesh position={[0, -0.05, 0.9]} castShadow>
        <sphereGeometry args={[0.5, 24, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.25} wireframe={wireframe} />
      </mesh>
      {/* Gold Eyelets & Laces */}
      <mesh position={[0, 0.45, 0.1]}>
        <boxGeometry args={[0.3, 0.1, 0.9]} />
        <meshStandardMaterial color="#C6A76B" roughness={0.2} metalness={0.8} wireframe={wireframe} />
      </mesh>
    </group>
  );
};

// Luxury Watch 3D Procedural Mesh
const WatchModel = ({ color, wireframe }: { color: string; wireframe: boolean }) => {
  return (
    <group position={[0, 0, 0]} rotation={[0.4, 0.3, 0]}>
      {/* Titanium Casing */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.28, 48]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Champagne Gold Bezel */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1.22, 1.22, 0.08, 48]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Dial Face */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.02, 48]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} wireframe={wireframe} />
      </mesh>
      {/* Gold Watch Hands */}
      <mesh position={[0, 0.18, 0.2]} rotation={[0, 0.8, 0]}>
        <boxGeometry args={[0.04, 0.02, 0.7]} />
        <meshStandardMaterial color="#C6A76B" metalness={1} roughness={0} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, 0.18, 0.1]} rotation={[0, -0.4, 0]}>
        <boxGeometry args={[0.05, 0.02, 0.5]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Crown */}
      <mesh position={[1.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 24]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Alligator Straps (Top & Bottom) */}
      <mesh position={[0, -0.1, -1.8]} castShadow>
        <boxGeometry args={[0.9, 0.1, 1.6]} />
        <meshStandardMaterial color="#111111" roughness={0.7} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, -0.1, 1.8]} castShadow>
        <boxGeometry args={[0.9, 0.1, 1.6]} />
        <meshStandardMaterial color="#111111" roughness={0.7} wireframe={wireframe} />
      </mesh>
    </group>
  );
};

// Handbag 3D Procedural Mesh
const HandbagModel = ({ color, wireframe }: { color: string; wireframe: boolean }) => {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Bag Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1.4, 0.9]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.15} wireframe={wireframe} />
      </mesh>
      {/* Flap Over */}
      <mesh position={[0, 0.2, 0.46]} castShadow>
        <boxGeometry args={[1.76, 0.8, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Gold Clasp */}
      <mesh position={[0, -0.15, 0.52]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 24]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Gold Chain Handle */}
      <mesh position={[0, 1.0, 0]}>
        <torusGeometry args={[0.65, 0.05, 16, 48, Math.PI]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.95} roughness={0.15} wireframe={wireframe} />
      </mesh>
    </group>
  );
};

// Haute Garment / Mannequin Model
const GarmentModel = ({ color, wireframe }: { color: string; wireframe: boolean }) => {
  return (
    <group position={[0, -0.8, 0]}>
      {/* Stand Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.15, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} wireframe={wireframe} />
      </mesh>
      {/* Rod */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.4, 16]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.9} roughness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.26, 1.0, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.25} wireframe={wireframe} />
      </mesh>
      {/* Shoulders */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.25} wireframe={wireframe} />
      </mesh>
      {/* Gold Peak Finial */}
      <mesh position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Gold Belt / Buckle Accent */}
      <mesh position={[0, 1.1, 0.22]}>
        <boxGeometry args={[0.2, 0.12, 0.06]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>
    </group>
  );
};

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({
  modelType = 'mannequin',
  color = '#111111',
  autoRotateDefault = false
}) => {
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);
  const [wireframe, setWireframe] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  const handleZoom = (delta: number) => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.multiplyScalar(delta);
      controlsRef.current.update();
    }
  };

  const setAngle = (angle: 'front' | 'side' | 'back' | 'iso') => {
    if (!controlsRef.current) return;
    const camera = controlsRef.current.object;
    if (angle === 'front') {
      camera.position.set(0, 0.5, 4);
    } else if (angle === 'side') {
      camera.position.set(4, 0.5, 0);
    } else if (angle === 'back') {
      camera.position.set(0, 0.5, -4);
    } else if (angle === 'iso') {
      camera.position.set(3, 2, 3);
    }
    controlsRef.current.update();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#18181b] to-[#0c0c0e] border border-white/10 ${
        isFullscreen ? 'h-screen w-screen fixed inset-0 z-50 rounded-none' : 'h-[460px] md:h-[540px]'
      }`}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [2.5, 1.2, 3.2], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow shadow-mapSize={1024} />
        <spotLight position={[-4, 5, -2]} intensity={2.0} color="#C6A76B" />
        <pointLight position={[0, 3, 2]} intensity={0.8} />

        <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.15}>
          {modelType === 'sneaker' && <SneakerModel color={color} wireframe={wireframe} />}
          {modelType === 'watch' && <WatchModel color={color} wireframe={wireframe} />}
          {modelType === 'bag' && <HandbagModel color={color} wireframe={wireframe} />}
          {(modelType === 'blazer' || modelType === 'dress' || modelType === 'hoodie' || modelType === 'mannequin') && (
            <GarmentModel color={color} wireframe={wireframe} />
          )}
        </Float>

        <ContactShadows position={[0, -1.2, 0]} opacity={0.65} scale={6} blur={2.2} />

        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={2.5}
          enablePan={false}
          minDistance={1.8}
          maxDistance={7}
          maxPolarAngle={Math.PI / 2 + 0.15}
        />
      </Canvas>

      {/* Top Left Floating Pill */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-[#C6A76B]/40 px-3 py-1.5 rounded-full text-xs text-white">
        <RotateCw className="w-3.5 h-3.5 text-[#C6A76B] animate-spin" style={{ animationDuration: '8s' }} />
        <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
          360° Interactive 3D Model
        </span>
      </div>

      {/* Angle Presets Bar */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 p-1 rounded-lg text-xs text-neutral-300">
        {(['front', 'side', 'back', 'iso'] as const).map((angle) => (
          <button
            key={angle}
            onClick={() => setAngle(angle)}
            className="px-2.5 py-1 rounded capitalize hover:bg-[#C6A76B] hover:text-black transition-colors"
          >
            {angle}
          </button>
        ))}
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/75 backdrop-blur-xl border border-white/10 px-3.5 py-2 rounded-full shadow-2xl">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-full transition-colors ${
            autoRotate ? 'bg-[#C6A76B] text-black' : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
          title="Toggle Auto Spin"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleZoom(0.85)}
          className="p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleZoom(1.15)}
          className="p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={() => setWireframe(!wireframe)}
          className={`p-2 rounded-full transition-colors ${
            wireframe ? 'bg-[#C6A76B] text-black' : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
          title="Wireframe View"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

