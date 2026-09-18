import { useRef } from "react";
import * as THREE from "three";

import { useGLTF } from "@react-three/drei";
import {
  RigidBody,
  CuboidCollider,
} from "@react-three/rapier";

import cardGLB from "../assets/lanyard/card.glb";

import { CARD } from "./CardSettings";

export default function Card({

    dragged,

    hover,

    drag,

    vec,

}) {

    const card = useRef();

    const { nodes, materials } = useGLTF(cardGLB);

    return (

        <RigidBody

            ref={card}

            type={dragged ? "kinematicPosition" : "dynamic"}

            position={CARD.rigidBodyPosition}

            colliders={false}

            angularDamping={4}

            linearDamping={4}

            canSleep

        >

            <CuboidCollider

                args={[

                    CARD.collider.width,

                    CARD.collider.height,

                    CARD.collider.depth,

                ]}

            />

            <group

                scale={CARD.scale}

                position={CARD.offset}

                onPointerOver={() => hover(true)}

                onPointerOut={() => hover(false)}

                onPointerDown={(e) => {

                    e.target.setPointerCapture(e.pointerId);

                    drag(

                        new THREE.Vector3()

                            .copy(e.point)

                            .sub(

                                vec.copy(

                                    card.current.translation()

                                )

                            )

                    );

                }}

                onPointerUp={(e) => {

                    e.target.releasePointerCapture(

                        e.pointerId

                    );

                    drag(false);

                }}

            >

                <mesh

                    geometry={nodes.card.geometry}

                >

                    <meshPhysicalMaterial

                        map={materials.base.map}

                        roughness={0.9}

                        metalness={0.8}

                        clearcoat={1}

                        clearcoatRoughness={0.15}

                    />

                </mesh>

                <mesh

                    geometry={nodes.clip.geometry}

                    material={materials.metal}

                />

                <mesh

                    geometry={nodes.clamp.geometry}

                    material={materials.metal}

                />

            </group>

        </RigidBody>

    );

}