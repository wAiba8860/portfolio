import React, {
    useState,
    useRef,
    Fragment,
    forwardRef,
    RefObject,
    ChangeEventHandler,
    ChangeEvent,
} from "react";
import { flushSync } from "react-dom";
import { Link, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { fadeInVertical, fadeInTextSplit } from "./animation";
import { Products } from "./Products";
import { GNewsAPI } from "./JapaneseNews";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export function ReadBook() {
    return <></>;
}
