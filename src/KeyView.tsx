import React, {
    useState,
    useRef,
    Fragment,
    forwardRef,
    ReactNode,
    MouseEventHandler,
} from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { flushSync } from "react-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Contact } from "./Main";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

interface keyViewProps {
    handleLinkContact: () => void;
    handleLinkMyself: () => void;
    handleLinkProducts: () => void;
}

export function KeyView({
    handleLinkContact,
    handleLinkMyself,
    handleLinkProducts,
}: keyViewProps): React.ReactElement {
    const AnchorRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const ButtonRef = useRef<(HTMLButtonElement | null)[]>([]);

    useGSAP(() => {
        const tl = gsap.timeline();
        if (ButtonRef.current) {
            ButtonRef.current.map((ref, index) => {
                tl.fromTo(
                    ref,
                    {
                        x: "-10rem",
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        delay: index === 0 ? 4.2 : 0,
                        duration: 1.0,
                        ease: "power3.out",
                    },
                    "-=0.8"
                );
            });
        }
        if (AnchorRef.current) {
            tl.fromTo(
                AnchorRef.current[0],
                {
                    x: "-10rem",
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.0,
                    ease: "power3.out",
                },
                "-=0.8"
            );
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <KeyViewContainer>
                    <ImageDiv></ImageDiv>
                    <ButtonWrapper>
                        <KeyViewButton
                            ref={(ref) => {
                                ButtonRef.current[0] = ref;
                            }}
                            onClick={handleLinkMyself}
                        >
                            About Aiba
                        </KeyViewButton>
                        <KeyViewButton
                            ref={(ref) => {
                                ButtonRef.current[1] = ref;
                            }}
                            onClick={handleLinkProducts}
                        >
                            Products
                        </KeyViewButton>
                        <KeyViewButton
                            ref={(ref) => {
                                ButtonRef.current[2] = ref;
                            }}
                            onClick={handleLinkContact}
                        >
                            Contact
                        </KeyViewButton>
                        <KeyViewLink
                            to="https://github.com/wAiba8860"
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={(ref) => {
                                AnchorRef.current[0] = ref;
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
const KeyViewButton = styled.button`
    display: block;
    color: #fff;
    font-size: 3rem;
    letter-spacing: 0.2rem;
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
