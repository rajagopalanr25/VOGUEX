import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Info, Eye, Check } from 'lucide-react';

interface Hero3DProps {
  onExploreProduct?: (productName: string) => void;
}

// 3D Particles Field
const LuxuryParticles = () => {
  const count = 70;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 6 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#C6A76B"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Haute Couture 3D Mannequin with Garment & Hotspots
const MannequinModel = ({
  fabricColor,
  activeHotspot,
  setActiveHotspot
}: {
  fabricColor: string;
  activeHotspot: number | null;
  setActiveHotspot: (idx: number | null) => void;
}) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    // Gentle natural sway
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    groupRef.current.position.y = -1.2 + Math.sin(t * 1.2) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Studio Pedestal / Plinth */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[1.4, 1.6, 0.25, 48]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.05, 48]} />
        <meshStandardMaterial color="#C6A76B" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Stand Rod */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.8, 16]} />
        <meshStandardMaterial color="#C6A76B" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Torso / Mannequin Core Form */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.26, 1.1, 32]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.45}
          metalness={0.25}
          bumpScale={0.05}
        />
      </mesh>

      {/* Shoulders & Upper Chest */}
      <mesh position={[0, 1.9, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 16]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.45}
          metalness={0.25}
        />
      </mesh>

      {/* Elegant Neck */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.5, 32]} />
        <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Gold Crown / Finial at Neck Top */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color="#C6A76B" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* Tailored Peak Lapels (Left & Right) */}
      <group position={[0, 1.75, 0.18]}>
        {/* Left Lapel */}
        <mesh position={[-0.18, 0, 0]} rotation={[0.1, 0.2, -0.3]} castShadow>
          <boxGeometry args={[0.14, 0.65, 0.05]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Right Lapel */}
        <mesh position={[0.18, 0, 0]} rotation={[0.1, -0.2, 0.3]} castShadow>
          <boxGeometry args={[0.14, 0.65, 0.05]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Gold Lapel Pin */}
        <mesh position={[-0.22, 0.15, 0.04]}>
          <cylinderGeometry args={[0.015, 0.015, 0.08, 16]} />
          <meshStandardMaterial color="#C6A76B" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Gold Double-Breasted Buttons */}
      <group position={[0, 1.4, 0.3]}>
        {[-0.08, 0.08].map((x, i) => (
          <React.Fragment key={i}>
            <mesh position={[x, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
              <meshStandardMaterial color="#C6A76B" roughness={0.1} metalness={0.95} />
            </mesh>
            <mesh position={[x, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
              <meshStandardMaterial color="#C6A76B" roughness={0.1} metalness={0.95} />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* Flared Lower Hem / Peplum Cut */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <coneGeometry args={[0.48, 0.5, 32, 1, true]} />
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.5}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* INTERACTIVE 3D HOTSPOT 1: Peak Lapel */}
      <group position={[-0.26, 1.85, 0.28]}>
        <Html distanceFactor={6} center>
          <div className="relative group cursor-pointer" onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}>
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#111111]/90 border border-[#C6A76B] text-[#C6A76B] shadow-lg shadow-[#C6A76B]/30 hover:scale-110 transition-transform">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A76B] opacity-40"></span>
              <span className="text-xs font-serif font-bold">1</span>
            </div>
            {activeHotspot === 1 && (
              <div className="absolute left-9 -top-4 w-56 p-3 rounded-lg bg-black/90 backdrop-blur-md border border-[#C6A76B]/40 text-white text-left z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <p className="text-[10px] tracking-widest uppercase text-[#C6A76B] font-semibold">Atelier Craftsmanship</p>
                <h4 className="text-sm font-serif font-medium mt-0.5">Satin Silk Peak Lapels</h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  Sculpted with Milanese Mulberry silk facing and hand-rolled buttonhole edges.
                </p>
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* INTERACTIVE 3D HOTSPOT 2: Gold Hardware */}
      <group position={[0.22, 1.45, 0.32]}>
        <Html distanceFactor={6} center>
          <div className="relative group cursor-pointer" onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}>
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#111111]/90 border border-[#C6A76B] text-[#C6A76B] shadow-lg shadow-[#C6A76B]/30 hover:scale-110 transition-transform">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A76B] opacity-40"></span>
              <span className="text-xs font-serif font-bold">2</span>
            </div>
            {activeHotspot === 2 && (
              <div className="absolute left-9 -top-4 w-56 p-3 rounded-lg bg-black/90 backdrop-blur-md border border-[#C6A76B]/40 text-white text-left z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <p className="text-[10px] tracking-widest uppercase text-[#C6A76B] font-semibold">Bespoke Hardware</p>
                <h4 className="text-sm font-serif font-medium mt-0.5">18K Champagne Inlay</h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  Water-cut solid brass buttons electroplated with scratch-resistant champagne gold.
                </p>
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* INTERACTIVE 3D HOTSPOT 3: Flared Silhouette */}
      <group position={[0.35, 0.7, 0.25]}>
        <Html distanceFactor={6} center>
          <div className="relative group cursor-pointer" onClick={() => setActiveHotspot(activeHotspot === 3 ? null : 3)}>
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#111111]/90 border border-[#C6A76B] text-[#C6A76B] shadow-lg shadow-[#C6A76B]/30 hover:scale-110 transition-transform">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A76B] opacity-40"></span>
              <span className="text-xs font-serif font-bold">3</span>
            </div>
            {activeHotspot === 3 && (
              <div className="absolute left-9 -top-4 w-56 p-3 rounded-lg bg-black/90 backdrop-blur-md border border-[#C6A76B]/40 text-white text-left z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <p className="text-[10px] tracking-widest uppercase text-[#C6A76B] font-semibold">Structured Drapery</p>
                <h4 className="text-sm font-serif font-medium mt-0.5">Floating Canvas Core</h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  Internal horsehair canvas that molds to posture over time for a bespoke fit.
                </p>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
};

export const Hero3DMannequin: React.FC<Hero3DProps> = ({ onExploreProduct }) => {
  const [activeColor, setActiveColor] = useState('#111111');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const colors = [
    { name: 'Obsidian Noir', hex: '#111111' },
    { name: 'Champagne Gold', hex: '#C6A76B' },
    { name: 'Royal Emerald', hex: '#0E3A2F' },
    { name: 'Pearl Ivory', hex: '#ECE8DF' },
    { name: 'Bordeaux Velvet', hex: '#58111A' }
  ];

  return (
    <div className="relative w-full h-[580px] md:h-[680px] lg:h-[760px] select-none">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1.2, 4.6], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        className="cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[4, 7, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize={1024}
        />
        <spotLight
          position={[-5, 6, -2]}
          intensity={2.5}
          color="#C6A76B"
          angle={0.6}
          penumbra={0.8}
        />
        <pointLight position={[0, 4, 3]} intensity={1.0} color="#FFFFFF" />

        <LuxuryParticles />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
          <MannequinModel
            fabricColor={activeColor}
            activeHotspot={activeHotspot}
            setActiveHotspot={setActiveHotspot}
          />
        </Float>

        <ContactShadows
          position={[0, -1.85, 0]}
          opacity={0.65}
          scale={7}
          blur={2.4}
          far={3}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2 + 0.1}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Floating 3D Interaction HUD Badge */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-[#C6A76B]/30 px-3.5 py-1.5 rounded-full text-xs text-white">
        <Sparkles className="w-3.5 h-3.5 text-[#C6A76B] animate-spin" style={{ animationDuration: '6s' }} />
        <span className="tracking-widest uppercase text-[10px] text-neutral-300">Interactive 3D Atelier • Drag to Rotate</span>
      </div>

      {/* Interactive Material / Color Switcher Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/75 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-full shadow-2xl z-20">
        <span className="text-[11px] uppercase tracking-wider text-neutral-400 mr-1 hidden sm:inline">Fabric Shade:</span>
        {colors.map((c) => (
          <button
            key={c.hex}
            onClick={() => setActiveColor(c.hex)}
            className="group relative flex items-center justify-center p-0.5 rounded-full transition-transform hover:scale-125 focus:outline-none"
            title={c.name}
          >
            <span
              className={`w-6 h-6 rounded-full border transition-all flex items-center justify-center ${
                activeColor === c.hex ? 'border-[#C6A76B] scale-110 shadow-lg shadow-[#C6A76B]/40' : 'border-neutral-600'
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {activeColor === c.hex && (
                <Check className={`w-3 h-3 ${c.hex === '#ECE8DF' ? 'text-black' : 'text-white'}`} />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

