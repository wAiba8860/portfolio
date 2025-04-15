import React, { useState, useRef, Fragment, forwardRef } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export function KeyView(): React.ReactElement {
    const buttonRef = useRef<(HTMLButtonElement | null)[]>([]);

    useGSAP(() => {
        buttonRef.current
            .filter((ref) => {
                return ref !== null;
            })
            .map((ref, index) => {
                gsap.fromTo(
                    ref,
                    {
                        x: "-10rem",
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        delay: 3.5 + 0.5 * index,
                        duration: 1.5,
                        ease: "power3.out",
                    }
                );
            });
    }, []);

    return (
        <>
            <KeyViewContainer>
                <ButtonWrapper>
                    <KeyViewButton
                        ref={(ref) => {
                            buttonRef.current[0] = ref;
                        }}
                    >
                        About Aiba
                    </KeyViewButton>
                    <KeyViewButton
                        ref={(ref) => {
                            buttonRef.current[1] = ref;
                        }}
                    >
                        Products
                    </KeyViewButton>
                    <KeyViewButton
                        ref={(ref) => {
                            buttonRef.current[2] = ref;
                        }}
                    >
                        Contact
                    </KeyViewButton>
                </ButtonWrapper>
            </KeyViewContainer>
        </>
    );
}

const KeyViewContainer = styled.div`
    position: relative;
    z-index: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("./images/keyViewBack.jpg");
    background-position: center;
    background-size: cover;
`;
const KeyViewButton = styled.button`
    display: block;
    color: #fff;
    font-size: 4rem;
    letter-spacing: 0.2rem;
`;
const ButtonWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(0, -50%);
`;
