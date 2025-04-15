import React, { useState, useRef, Fragment, RefObject } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { start } from "repl";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

//ローディング時の文字フェードイン

export function loadingTextFadeIn(
    ref: React.RefObject<(HTMLSpanElement | null)[]>,
    delayTime: number
) {
    if (ref.current) {
        ref.current.map((text, index) => {
            gsap.to(text, {
                opacity: 1.0,
                delay: delayTime + 0.05 * index,
                ease: "power4.in",
            });
        });
    }
}

//スクロール固定

export function scrollFixed<T extends HTMLElement>(
    ref1: RefObject<T | null>,
    ref2: RefObject<T | null>
) {
    if (ref1.current && ref2.current) {
        ScrollTrigger.create({
            trigger: ref1.current,
            start: "top top",
            endTrigger: ref2.current,
            end: "top top",
            pin: true,
            scrub: true,
            pinSpacing: false,
        });
        ScrollTrigger.refresh();
    }
}

//縦方向のフェードイン

export function fadeInVertical<T extends HTMLElement>(ref: T | null) {
    gsap.fromTo(
        ref,
        {
            opacity: 0,
            y: "5rem",
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ref,
                start: "top 90%",
            },
        }
    );
}

//テキストが一文字ずつフェードイン

export function fadeInTextSplit(
    ref: React.RefObject<(HTMLSpanElement | null)[]>
) {
    return gsap.fromTo(
        ref.current,
        {
            opacity: 0,
        },
        {
            opacity: 1,
            ease: "power4.out",
            stagger: 0.01,
        }
    );
}
