import { useRef } from "react";

import * as THREE from "three";

import {
    MeshLineGeometry,
    MeshLineMaterial,
} from "meshline";

import { useTexture } from "@react-three/drei";

import ribbonTexture from "../assets/lanyard/lanyard.png";

export default function Ribbon({

    band,

    isMobile,

    width = 1,

    image = null,

}) {

    const ribbon = useTexture(

        image || ribbonTexture

    );

    ribbon.wrapS = THREE.RepeatWrapping;
    ribbon.wrapT = THREE.RepeatWrapping;

    return (

        <mesh ref={band}>

            <meshLineGeometry />

            <meshLineMaterial

                color="white"

                useMap

                map={ribbon}

                repeat={[-4,1]}

                depthTest={false}

                lineWidth={width}

                resolution={
                    isMobile
                    ? [1000,2000]
                    : [1000,1000]
                }

            />

        </mesh>

    );

}