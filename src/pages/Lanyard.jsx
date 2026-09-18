import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";

import * as THREE from "three";

import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import {
  Physics,
  RigidBody,
  BallCollider,
  CuboidCollider,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";

import {
  MeshLineGeometry,
  MeshLineMaterial,
} from "meshline";

import "./Lanyard.css";

import cardGLB from "../assets/lanyard/card.glb";
import ribbonTexture from "../assets/lanyard/lanyard.png";

extend({
  MeshLineGeometry,
  MeshLineMaterial,
});

const BLANK_PIXEL =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = {
  x:0,
  y:0,
  w:0.5,
  h:0.755,
};

const BACK_UV_RECT = {
  x:0.5,
  y:0,
  w:0.5,
  h:0.757,
};

export default function Lanyard({

  position=[0,0,30],

  gravity=[0,-40,0],

  fov=20,

  transparent=true,

  frontImage=null,

  backImage=null,

  imageFit="cover",

  lanyardImage=null,

  lanyardWidth=1,

}){

const [isMobile,setIsMobile]=useState(

()=>typeof window!=="undefined" && window.innerWidth<768

);

useEffect(()=>{

const resize=()=>{

setIsMobile(window.innerWidth<768);

};

window.addEventListener("resize",resize);

return ()=>window.removeEventListener("resize",resize);

},[]);

return(

  

<div className="lanyard-wrapper">
<Link to="/" className="back-btn">

  <FaArrowLeft />

  <span>Back to Portfolio</span>

</Link>
<Canvas

camera={{
position,
fov,
}}

dpr={[1,isMobile?1.5:2]}

gl={{
alpha:transparent,
}}

onCreated={({gl})=>{

gl.setClearColor(

new THREE.Color(0x000000),

transparent?0:1

);

}}

>

<ambientLight intensity={Math.PI}/>

<Physics

gravity={gravity}

timeStep={isMobile?1/30:1/60}

>

<Band

isMobile={isMobile}

frontImage={frontImage}

backImage={backImage}

imageFit={imageFit}

lanyardImage={lanyardImage}

lanyardWidth={lanyardWidth}

/>

</Physics>

<Environment blur={0.75}>

<Lightformer

intensity={2}

position={[0,0,22]}

rotation={[0,0,Math.PI/3]}

scale={[100,0.1,1]}

/>

<Lightformer

intensity={3}

position={[-1,-1,1]}

rotation={[0,0,Math.PI/3]}

scale={[100,0.1,1]}

/>

<Lightformer

intensity={3}

position={[1,1,1]}

rotation={[0,0,Math.PI/3]}

scale={[100,0.1,1]}

/>

<Lightformer

intensity={10}

position={[-10,0,14]}

rotation={[0,Math.PI/2,Math.PI/3]}

scale={[100,10,1]}

/>

</Environment>

</Canvas>

</div>

);

}

// ===================================
// CARD CONFIG
// ===================================

const CARD_CONFIG = {

  // Card
  scale: 2.3,

  offset: [0, -1.2, -0.05],

  collider: {
    width: 0.8,
    height: 1.125,
    depth: 0.01,
  },

  // Physics
  jointOffset: 1.5,

  rigidBodyPosition: [2, 0, 0],

  // Camera
  camera: [0, 0, 30],

  fov: 20,

  // Rope
  ribbonWidth: 1,

};

function Band({

  maxSpeed = 50,

  minSpeed = 0,

  isMobile = false,

  frontImage = null,

  backImage = null,

  imageFit = "cover",

  lanyardImage = null,

  lanyardWidth = 1,

}) {

  // -----------------------------
  // Refs
  // -----------------------------

  const band = useRef();

  const fixed = useRef();

  const j1 = useRef();

  const j2 = useRef();

  const j3 = useRef();

  const card = useRef();

  // -----------------------------
  // Helper Vectors
  // -----------------------------

  const vec = new THREE.Vector3();

  const ang = new THREE.Vector3();

  const rot = new THREE.Vector3();

  const dir = new THREE.Vector3();

  // -----------------------------
  // Physics Defaults
  // -----------------------------

  const segmentProps = {

    type: "dynamic",

    canSleep: true,

    colliders: false,

    angularDamping: 4,

    linearDamping: 4,

  };

  // -----------------------------
  // Assets
  // -----------------------------

  const { nodes, materials } = useGLTF(cardGLB);
  
  const ribbon = useTexture(

    lanyardImage || ribbonTexture

  );

  const frontTex = useTexture(

    frontImage || BLANK_PIXEL

  );

  const backTex = useTexture(

    backImage || BLANK_PIXEL

  );

  // -----------------------------
  // Curve
  // -----------------------------

  const [curve] = useState(

    () =>

      new THREE.CatmullRomCurve3([

        new THREE.Vector3(),

        new THREE.Vector3(),

        new THREE.Vector3(),

        new THREE.Vector3(),

      ])

  );

  // -----------------------------
  // Mouse
  // -----------------------------

  const [dragged, drag] = useState(false);

  const [hovered, hover] = useState(false);

  // ---------------------------------
  // Card Texture Atlas
  // ---------------------------------
  // =====================================
// Premium Blank Card Texture
// =====================================

function createBlankCardTexture() {

  const canvas = document.createElement("canvas");

  canvas.width = 2048;
  canvas.height = 2048;

  const ctx = canvas.getContext("2d");

  // Premium White
  ctx.fillStyle = "#f8f8f6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Very subtle paper/glass tint
  ctx.fillStyle = "rgba(255,255,255,.18)";

  for (let i = 0; i < 3000; i++) {

    ctx.fillRect(

      Math.random() * canvas.width,

      Math.random() * canvas.height,

      1,

      1

    );

  }

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;

  texture.anisotropy = 16;

  texture.needsUpdate = true;

  return texture;

}

  const cardMap = useMemo(() => {

    const baseMap = materials.base.map;
    const blankMap = createBlankCardTexture();
    if (!frontImage && !backImage)
    return blankMap;

    const baseImg = baseMap.image;

    const W = baseImg.width;

    const H = baseImg.height;

    const canvas = document.createElement("canvas");

    canvas.width = W;

    canvas.height = H;

    const ctx = canvas.getContext("2d");

    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawImage = (img, rect) => {

      const rx = rect.x * W;

      const ry = rect.y * H;

      const rw = rect.w * W;

      const rh = rect.h * H;

      const fit =
        imageFit === "contain"
          ? Math.min
          : Math.max;

      const scale = fit(
        rw / img.width,
        rh / img.height
      );

      const dw = img.width * scale;

      const dh = img.height * scale;

      const dx = rx + (rw - dw) / 2;

      const dy = ry + (rh - dh) / 2;

      ctx.save();

      ctx.beginPath();

      ctx.rect(rx, ry, rw, rh);

      ctx.clip();

      ctx.drawImage(
        img,
        dx,
        dy,
        dw,
        dh
      );

      ctx.restore();

    };

    if (frontImage && frontTex.image) {

      drawImage(
        frontTex.image,
        FRONT_UV_RECT
      );

    }

    if (backImage && backTex.image) {

      drawImage(
        backTex.image,
        BACK_UV_RECT
      );

    }

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;

    texture.flipY = baseMap.flipY;

    texture.anisotropy = 16;

    texture.needsUpdate = true;

    return texture;

  }, [
    frontImage,
    backImage,
    imageFit,
    frontTex,
    backTex,
    materials.base.map,
  ]);

    // ---------------------------------
  // Rope Physics
  // ---------------------------------

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);

  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);

  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  useSphericalJoint(j3, card, [
  [0, 0, 0],
  [0, CARD_CONFIG.jointOffset, 0],
  ]);

  useEffect(() => {

    if (hovered) {

      document.body.style.cursor =
        dragged ? "grabbing" : "grab";

      return () => {

        document.body.style.cursor = "auto";

      };

    }

  }, [hovered, dragged]);

  useFrame((state, delta) => {

    // -----------------------------
    // Drag
    // -----------------------------

    if (dragged) {

      vec
        .set(
          state.pointer.x,
          state.pointer.y,
          0.5
        )
        .unproject(state.camera);

      dir
        .copy(vec)
        .sub(state.camera.position)
        .normalize();

      vec.add(
        dir.multiplyScalar(
          state.camera.position.length()
        )
      );

      [card, j1, j2, j3, fixed].forEach(ref => {

        ref.current?.wakeUp();

      });

      card.current?.setNextKinematicTranslation({

        x: vec.x - dragged.x,

        y: vec.y - dragged.y,

        z: vec.z - dragged.z,

      });

    }

    // -----------------------------
    // Ribbon Update
    // -----------------------------

    if (fixed.current) {

      [j1, j2].forEach(ref => {

        if (!ref.current.lerped) {

          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );

        }

        const distance = Math.max(
          0.1,
          Math.min(
            1,
            ref.current.lerped.distanceTo(
              ref.current.translation()
            )
          )
        );

        ref.current.lerped.lerp(

          ref.current.translation(),

          delta *

            (minSpeed +

              distance *

                (maxSpeed - minSpeed))

        );

      });

      curve.points[0].copy(
        j3.current.translation()
      );

      curve.points[1].copy(
        j2.current.lerped
      );

      curve.points[2].copy(
        j1.current.lerped
      );

      curve.points[3].copy(
        fixed.current.translation()
      );

      band.current.geometry.setPoints(

        curve.getPoints(

          isMobile ? 16 : 32

        )

      );

      ang.copy(
        card.current.angvel()
      );

      rot.copy(
        card.current.rotation()
      );

      card.current.setAngvel({

        x: ang.x,

        y: ang.y - rot.y * 0.25,

        z: ang.z,

      });

    }

  });

  curve.curveType = "chordal";

  ribbon.wrapS = THREE.RepeatWrapping;

  ribbon.wrapT = THREE.RepeatWrapping;

    return (
    <>
      {/* Ribbon */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={ribbon}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>

      <group position={[0,2,0]}>
        {/* Fixed */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        {/* Joint 1 */}
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Joint 2 */}
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Joint 3 */}
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* Card */}
        <RigidBody
          ref={card}
  position={CARD_CONFIG.rigidBodyPosition}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider
 args={[
CARD_CONFIG.collider.width,
CARD_CONFIG.collider.height,
CARD_CONFIG.collider.depth,
]}
/>



          <group
  scale={CARD_CONFIG.scale}
  position={CARD_CONFIG.offset}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
          >
            <mesh geometry={nodes.card.geometry}>
            
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>

            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />

            <mesh
              geometry={nodes.clamp.geometry}
              material={materials.metal}
            />

          </group>
        </RigidBody>
      </group>
    </>
  );
}