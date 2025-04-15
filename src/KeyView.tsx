import React, { useState, useRef, Fragment, forwardRef } from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { flushSync } from "react-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Contact } from "./Main";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export function KeyView(): React.ReactElement {
    const AnchorRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useGSAP(() => {
        AnchorRef.current
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
                        delay: 3.5 + 0.2 * index,
                        duration: 1.0,
                        ease: "power3.out",
                    }
                );
            });
    }, []);

    return (
        <>
            <BrowserRouter>
                <KeyViewContainer>
                    <ImageDiv></ImageDiv>
                    <ButtonWrapper>
                        <KeyViewLink
                            to=""
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={(ref) => {
                                AnchorRef.current[0] = ref;
                            }}
                        >
                            About Aiba
                        </KeyViewLink>
                        <KeyViewLink
                            to=""
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={(ref) => {
                                AnchorRef.current[1] = ref;
                            }}
                        >
                            Products
                        </KeyViewLink>
                        <KeyViewLink
                            to="/Contact"
                            ref={(ref) => {
                                AnchorRef.current[2] = ref;
                            }}
                        >
                            Contact
                        </KeyViewLink>
                        <KeyViewLink
                            to="https://github.com/wAiba8860"
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={(ref) => {
                                AnchorRef.current[3] = ref;
                            }}
                        >
                            To Github
                            <img
                                src="./images/icons8-github-50.png"
                                alt="githubIcon"
                            />
                        </KeyViewLink>
                    </ButtonWrapper>
                </KeyViewContainer>
            </BrowserRouter>
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
const KeyViewLink = styled(Link)`
    display: block;
    color: #fff;
    font-size: 3rem;
    letter-spacing: 0.2rem;
    text-decoration: none;
    font-weight: bold;
    margin: 1rem 0;
`;
const ImageDiv = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`;
const ButtonWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(0, -50%);
`;
