import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";


import * as THREE from "three";

import "./PetCTScanner.css";

import scannerModel from "../../assets/3d/ct_scanner.glb";


/* =========================================================
   SCANNER MODEL
========================================================= */

function ScannerModel() {
  const { scene } = useGLTF(scannerModel);

  const modelRef = useRef();

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={30}
      position={[0, -0.55, 0]}
    />
  );
}
/* =========================================================
   NATIVE WHEEL ZOOM
========================================================= */

function ScannerWheelZoom() {
  const { gl, camera } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const currentDistance =
        camera.position.length();

      const zoomSpeed = 0.006;

      let newDistance =
        currentDistance +
        event.deltaY * zoomSpeed;

      newDistance =
        THREE.MathUtils.clamp(
          newDistance,
          4.2,
          8.5
        );

      camera.position
        .normalize()
        .multiplyScalar(newDistance);
    };

    canvas.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    return () => {
      canvas.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, [gl, camera]);

  return null;
}

/* =========================================================
   SCANNER INTERACTION
========================================================= */

function ScannerInteraction({
  children,
  machineStarted,
}) {
  const groupRef = useRef();

  const dragRef = useRef({
    active: false,
    x: 0,
    y: 0,
  });

  /* ==========================================
     AUTO HORIZONTAL ROTATION
  ========================================== */

  useFrame(() => {
    if (!groupRef.current) return;

    if (
      machineStarted &&
      !dragRef.current.active
    ) {
      groupRef.current.rotation.y += 0.0015;
    }
  });

  /* ==========================================
     POINTER DOWN
  ========================================== */

  const handlePointerDown = (e) => {
    if (!machineStarted) return;

    e.stopPropagation();

    dragRef.current.active = true;

    dragRef.current.x = e.clientX;
    dragRef.current.y = e.clientY;

    e.currentTarget.setPointerCapture?.(
      e.pointerId
    );

    document.body.style.cursor = "grabbing";
  };

  /* ==========================================
     POINTER MOVE
  ========================================== */

  const handlePointerMove = (e) => {
    if (
      !machineStarted ||
      !dragRef.current.active ||
      !groupRef.current
    ) {
      return;
    }

    e.stopPropagation();

    const deltaX =
      e.clientX -
      dragRef.current.x;

    const deltaY =
      e.clientY -
      dragRef.current.y;

    /* ------------------------------------------
       HORIZONTAL ROTATION
    ------------------------------------------ */

    groupRef.current.rotation.y +=
      deltaX * 0.012;

    /* ------------------------------------------
       VERTICAL TILT
    ------------------------------------------ */

    groupRef.current.rotation.x +=
      deltaY * 0.006;

    /* ------------------------------------------
       LIMIT VERTICAL TILT
    ------------------------------------------ */

    const maxTilt =
      THREE.MathUtils.degToRad(15);

    groupRef.current.rotation.x =
      THREE.MathUtils.clamp(
        groupRef.current.rotation.x,
        -maxTilt,
        maxTilt
      );

    /* ------------------------------------------
       SAVE POINTER POSITION
    ------------------------------------------ */

    dragRef.current.x =
      e.clientX;

    dragRef.current.y =
      e.clientY;
  };

  /* ==========================================
     POINTER UP
  ========================================== */

  const handlePointerUp = (e) => {
    dragRef.current.active = false;

    e.currentTarget.releasePointerCapture?.(
      e.pointerId
    );

    document.body.style.cursor = "default";
  };

  /* ==========================================
     SCANNER GROUP
  ========================================== */

  return (
    <group
  ref={groupRef}
  position={[0, 0.25, 0]}
  rotation={[
    0,
    Math.PI,
    0,
  ]}
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={
        handlePointerUp
      }
    >
      {children}

      {/* ======================================
          LARGE INVISIBLE HIT AREA
      ====================================== */}

      <mesh>
        <boxGeometry
          args={[
            3.1,
            2.8,
            2.2,
          ]}
        />

        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   CYAN SCAN RING
========================================================= */

function ScanRing({
  machineStarted,
}) {
  const ringRef = useRef();
  const glowRef = useRef();
  const pointRef = useRef();

  useFrame((state) => {
    const t =
      state.clock.getElapsedTime();

    if (!machineStarted) {
      if (ringRef.current) {
        ringRef.current.rotation.z = 0;
      }

      if (glowRef.current) {
        glowRef.current.material.opacity =
          0.14;
      }

      if (pointRef.current) {
        pointRef.current.position.x = 0.62;
        pointRef.current.position.y = 0;
      }

      return;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z =
        Math.sin(t * 0.7) *
        0.035;
    }

    if (glowRef.current) {
      glowRef.current.material.opacity =
        0.18 +
        Math.sin(t * 2.2) *
        0.06;
    }

    if (pointRef.current) {
      const angle =
        t * 1.8;

      pointRef.current.position.x =
        Math.cos(angle) *
        0.62;

      pointRef.current.position.y =
        Math.sin(angle) *
        0.62;
    }
  });

  return (
    <group
      position={[
        0,
        -0.72,
        0.06,
      ]}
    >
      {/* ======================================
          MAIN CYAN RING
      ====================================== */}

      <mesh
        ref={ringRef}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.64,
            0.018,
            12,
            96,
          ]}
        />

        <meshStandardMaterial
          color="#27d9f5"
          emissive="#27d9f5"
          emissiveIntensity={
            machineStarted ? 2.5 : 0.7
          }
          transparent
          opacity={
            machineStarted ? 0.85 : 0.35
          }
        />
      </mesh>

      {/* ======================================
          OUTER GLOW
      ====================================== */}

      <mesh
        ref={glowRef}
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.66,
            0.045,
            12,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#20cfff"
          transparent
          opacity={
            machineStarted
              ? 0.18
              : 0.08
          }
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      {/* ======================================
          WHITE INNER RING
      ====================================== */}

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.54,
            0.009,
            8,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.72}
        />
      </mesh>

      {/* ======================================
          MOVING SCANNER POINT
      ====================================== */}

      <mesh ref={pointRef}>
        <sphereGeometry
          args={[
            0.025,
            12,
            12,
          ]}
        />

        <meshBasicMaterial
          color="#8ff4ff"
          transparent
          opacity={
            machineStarted ? 1 : 0
          }
        />
      </mesh>

      {/* ======================================
          RING LIGHT
      ====================================== */}

      <pointLight
        color="#20cfff"
        intensity={
          machineStarted ? 1.3 : 0.35
        }
        distance={2.5}
      />
    </group>
  );
}

/* =========================================================
   TUNNEL LIGHT
========================================================= */

function TunnelLight({
  machineStarted,
}) {
  const lightRef = useRef();

  useFrame((state) => {
    const t =
      state.clock.getElapsedTime();

    if (!lightRef.current) return;

    if (!machineStarted) {
      lightRef.current.intensity =
        0.2;
      return;
    }

    lightRef.current.intensity =
      0.85 +
      Math.sin(t * 2) *
        0.25;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[
        0,
        -0.72,
        0.3,
      ]}
      color="#20cfff"
      intensity={
        machineStarted
          ? 1.15
          : 0.2
      }
      distance={2.4}
    />
  );
}

/* =========================================================
   SCAN BEAM
========================================================= */

function ScanBeam() {
  const beamRef = useRef();

  useFrame((state) => {
    const t =
      state.clock.getElapsedTime();

    if (beamRef.current) {
      beamRef.current.material.opacity =
        0.12 +
        Math.sin(t * 2.5) *
          0.05;
    }
  });

  return (
    <mesh
      ref={beamRef}
      position={[
        0,
        -0.72,
        0.02,
      ]}
    >
      <cylinderGeometry
        args={[
          0.125,
          0.125,
          1.05,
          32,
          1,
          true,
        ]}
      />

      <meshBasicMaterial
        color="#27d9f5"
        transparent
        opacity={0.12}
        blending={
          THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </mesh>
  );
}

/* =========================================================
   MEDICAL PARTICLES
========================================================= */

function MedicalParticles() {
  const particlesRef =
    useRef();

  const count = 45;

  const positions =
    new Float32Array(
      count * 3
    );

  for (
    let i = 0;
    i < count;
    i++
  ) {
    positions[i * 3] =
      (Math.random() - 0.5) *
      3;

    positions[i * 3 + 1] =
      (Math.random() - 0.5) *
      2.5;

    positions[i * 3 + 2] =
      (Math.random() - 0.5) *
      2;
  }

  useFrame((state) => {
    const t =
      state.clock.getElapsedTime();

    if (particlesRef.current) {
      particlesRef.current.rotation.y =
        t * 0.025;

      particlesRef.current.rotation.x =
        Math.sin(t * 0.15) *
        0.025;
    }
  });

  return (
    <points
      ref={particlesRef}
      positions={positions}
    >
      <pointsMaterial
        color="#55e6ff"
        size={0.018}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}


/* =========================================================
   SCANNER HUD
========================================================= */

function ScannerHUD({
  machineStarted,
}) {
  return (
    <>
      {/* ======================================
          TOP HUD
      ====================================== */}

      <div className="scanner-hud scanner-hud-top">
        <span
          className={`hud-status-dot ${
            machineStarted
              ? "system-active"
              : "system-standby"
          }`}
        ></span>

        <span>
          {machineStarted
            ? "ACTIVE SYSTEM"
            : "SYSTEM OFFLINE"}
        </span>

        <strong>
          PET / CT
        </strong>
      </div>

      {/* ======================================
          BOTTOM HUD
      ====================================== */}

      <div className="scanner-hud scanner-hud-bottom">
        <span>
          ADVANCED DIAGNOSTICS
        </span>

        <span className="hud-divider">
          /
        </span>

        <span>
          RADIOLOGY DEPARTMENT
        </span>
      </div>

      {/* ======================================
          OPERATIONAL STATUS
      ====================================== */}

      <div className="scanner-operational">
        <span
          className={`operational-dot ${
            machineStarted
              ? "system-active"
              : "system-standby"
          }`}
        ></span>

        SYSTEM STATUS

        <strong>
          {machineStarted
            ? "OPERATIONAL"
            : "OFFLINE"}
        </strong>
      </div>
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function PetCTScanner() {
  const [
    machineStarted,
    setMachineStarted,
  ] = useState(false);

  return (
    <div className="pet-scanner-container">

      {/* =========================================
          THREE.JS CANVAS
      ========================================= */}

      <Canvas
        shadows
        dpr={[
          1,
          1.8,
        ]}
        camera={{
          position: [
            3.8,
            2.2,
            5.2,
          ],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference:
            "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
          touchAction: "none",
        }}
      >

        {/* =========================================
            WHEEL ZOOM
        ========================================= */}

        <ScannerWheelZoom />

        {/* =========================================
            LIGHTING
        ========================================= */}

        <ambientLight
          intensity={0.55}
        />

        <directionalLight
          position={[
            4,
            6,
            5,
          ]}
          intensity={1.8}
          castShadow
        />

        <directionalLight
          position={[
            -4,
            2,
            2,
          ]}
          intensity={0.7}
          color="#52dff5"
        />

        <pointLight
          position={[
            0,
            0,
            3,
          ]}
          intensity={0.5}
          color="#20cfff"
        />

        {/* =========================================
            ENVIRONMENT
        ========================================= */}

        <Environment
          preset="studio"
        />

        {/* =========================================
            SCANNER
        ========================================= */}

        <ScannerInteraction
          machineStarted={
            machineStarted
          }
        >
          <Suspense fallback={null}>

            {/* REAL SCANNER */}
            <ScannerModel />

            {/* RING ALWAYS VISIBLE
                BUT ANIMATES ONLY WHEN ACTIVE */}
            <ScanRing
              machineStarted={
                machineStarted
              }
            />

            {/* TUNNEL LIGHT */}
            <TunnelLight
              machineStarted={
                machineStarted
              }
            />

            {/* SCAN BEAM ONLY AFTER START */}
            {machineStarted && (
              <ScanBeam />
            )}

          </Suspense>
        </ScannerInteraction>

        {/* =========================================
            PARTICLES ONLY AFTER START
        ========================================= */}

        {machineStarted && (
          <MedicalParticles />
        )}

        {/* =========================================
            FLOOR SHADOW
        ========================================= */}

        <ContactShadows
          position={[
            0,
            -2.65,
            0,
          ]}
          opacity={0.45}
          scale={6}
          blur={2.5}
          far={4}
        />

      </Canvas>

           {/* ===========================================
          HTML HUD
      =========================================== */}

      <ScannerHUD
        machineStarted={machineStarted}
      />

      {/* ===========================================
          MACHINE START / STOP BUTTON
      =========================================== */}

      <div className="machine-start-wrapper">
        <button
          type="button"
          className={`machine-start-btn ${
            machineStarted
              ? "machine-started"
              : ""
          }`}
          onClick={() =>
            setMachineStarted(
              (previous) => !previous
            )
          }
        >
          <span
            className={`machine-start-dot ${
              machineStarted
                ? "machine-dot-active"
                : "machine-dot-standby"
            }`}
          ></span>

          <span>
            {machineStarted
              ? "STOP MACHINE"
              : "START MACHINE"}
          </span>

          <span className="machine-start-arrow">
            {machineStarted ? "×" : "→"}
          </span>
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   PRELOAD MODEL
========================================================= */

useGLTF.preload(scannerModel);