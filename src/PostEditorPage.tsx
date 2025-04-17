import React, {
    useState,
    useRef,
    Fragment,
    forwardRef,
    RefObject,
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

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export function PostEditorPage({ isLogin }: { isLogin: boolean }) {
    const [textEdit, SetTextEdit] = useState(null);

    return (
        <>
            <h3>投稿のタイトル：</h3>
            <input type="text" name="title" id="title" />
            <h3>投稿内容：</h3>
            <textarea name="PostContent" id="PostContent"></textarea>
        </>
    );
}
