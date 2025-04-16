import React, {
    useState,
    useRef,
    Fragment,
    CSSProperties,
    RefObject,
    MouseEvent,
} from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { KeyView } from "./KeyView";
import { Main } from "./Main";
import { scrollFixed, loadingTextFadeIn } from "./animation";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export default function App(): React.ReactElement {
    const LoadingScreenRef = useRef<HTMLDivElement | null>(null);
    const KeyViewRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const myselfRef = useRef<HTMLDivElement | null>(null);
    const ProductsRef = useRef<HTMLDivElement | null>(null);
    const contactRef = useRef<HTMLDivElement | null>(null);
    const mainContentsRef = useRef<HTMLDivElement | null>(null);

    function handleLinkContact() {
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    function handleLinkProducts() {
        ProductsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    function handleLinkMyself() {
        myselfRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useGSAP(
        () => {
            scrollFixed(KeyViewRef, myselfRef);
            scrollFixed(myselfRef, ProductsRef);
            if (ProductsRef.current && contactRef.current) {
                ScrollTrigger.create({
                    trigger: ProductsRef.current,
                    start: "top top",
                    endTrigger: ProductsRef.current,
                    end: "top top",
                    pin: true,
                    scrub: true,
                    pinSpacing: false,
                });
                ScrollTrigger.refresh();
            }
            gsap.set(mainContentsRef.current, {
                opacity: 0,
                visibility: "hidden",
            });
            gsap.timeline()
                .fromTo(
                    LoadingScreenRef.current,
                    {
                        opacity: 1,
                    },
                    {
                        opacity: 0,
                        duration: 1.0,
                        ease: "power2.out",
                        delay: 3.0,
                        onComplete: () => {
                            gsap.set(LoadingScreenRef.current, {
                                display: "none",
                            });
                        },
                    }
                )
                .to(
                    mainContentsRef.current,
                    {
                        opacity: 1,
                        visibility: "visible",
                        duration: 1.0,
                        ease: "power4.out",
                        onComplete: () => {
                            ScrollTrigger.refresh();
                        },
                    },
                    "-=1.0"
                );
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            <OverflowWrap>
                <div ref={LoadingScreenRef}>
                    <LoadingAnimate />
                </div>
                <div ref={mainContentsRef}>
                    <div ref={KeyViewRef}>
                        <KeyView
                            handleLinkContact={handleLinkContact}
                            handleLinkMyself={handleLinkMyself}
                            handleLinkProducts={handleLinkProducts}
                        />
                    </div>
                    <FixedBoxScene />
                    <Main
                        myselfRef={myselfRef}
                        ProductsRef={ProductsRef}
                        contactRef={contactRef}
                    />
                </div>
            </OverflowWrap>
        </div>
    );
}

function LoadingAnimate(): React.ReactElement {
    const LoadingSpanRef1 = useRef<(HTMLSpanElement | null)[]>([]);
    const LoadingSpanRef2 = useRef<(HTMLSpanElement | null)[]>([]);
    const LoadingSpanRef3 = useRef<(HTMLSpanElement | null)[]>([]);
    const LoadingText1 = "Aiba".split("");
    const LoadingText2 = "Portfolio".split("");
    const LoadingText3 = "Site".split("");
    const delayTime1 = LoadingText1.length * 0.1 + 0.5;
    const delayTime2 = LoadingText2.length * 0.1 + delayTime1 - 0.3;
    const fadeLight = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        loadingTextFadeIn(LoadingSpanRef1, 0.6);
        gsap.to(fadeLight.current[0], {
            x: "650%",
            delay: 0.58,
            duration: 1.5,
            ease: "power1.out",
        });

        loadingTextFadeIn(LoadingSpanRef2, delayTime1);
        gsap.to(fadeLight.current[1], {
            x: "650%",
            delay: delayTime1 + 0.15,
            duration: 1.5,
            ease: "power1.out",
        });
        loadingTextFadeIn(LoadingSpanRef3, delayTime2);
        gsap.to(fadeLight.current[2], {
            x: "650%",
            delay: delayTime2 + 0.05,
            duration: 1.5,
            ease: "power1.out",
        });
    }, []);

    return (
        <>
            <LoadingStyle>
                <LoadingTextWrapper>
                    <LoadingH1Text>
                        <FadeLight
                            ref={(ref) => {
                                fadeLight.current[0] = ref;
                            }}
                        ></FadeLight>
                        {LoadingText1.map((text, index) => {
                            return (
                                <LoadingSpanText
                                    ref={(ref) => {
                                        LoadingSpanRef1.current[index] = ref;
                                    }}
                                    key={index}
                                >
                                    {text}
                                </LoadingSpanText>
                            );
                        })}
                    </LoadingH1Text>
                    <LoadingH1Text>
                        <FadeLight
                            ref={(ref) => {
                                fadeLight.current[1] = ref;
                            }}
                        ></FadeLight>
                        {LoadingText2.map((text, index) => {
                            return (
                                <LoadingSpanText
                                    ref={(ref) => {
                                        LoadingSpanRef2.current[index] = ref;
                                    }}
                                    key={index}
                                >
                                    {text}
                                </LoadingSpanText>
                            );
                        })}
                    </LoadingH1Text>
                    <LoadingH1Text>
                        <FadeLight
                            ref={(ref) => {
                                fadeLight.current[2] = ref;
                            }}
                        ></FadeLight>
                        {LoadingText3.map((text, index) => {
                            return (
                                <LoadingSpanText
                                    ref={(ref) => {
                                        LoadingSpanRef3.current[index] = ref;
                                    }}
                                    key={index}
                                >
                                    {text}
                                </LoadingSpanText>
                            );
                        })}
                    </LoadingH1Text>
                </LoadingTextWrapper>
                <Scene />
            </LoadingStyle>
        </>
    );
}

function RotatingBox(): React.ReactElement {
    const meshRef = useRef<(THREE.Mesh | null)[]>([]);

    useFrame(() => {
        meshRef.current
            .filter((mesh) => {
                return mesh !== null;
            })
            .map((mesh) => {
                mesh!.rotation.x += 0.05;
                mesh!.rotation.y += 0.05;
            });
    });

    useGSAP(() => {
        meshRef.current
            .filter((mesh) => {
                return mesh !== null;
            })
            .map((mesh, index) => {
                gsap.timeline()
                    .fromTo(
                        mesh!.position,
                        {
                            x: -window.innerWidth,
                            y: 200 - 200 * index,
                        },
                        {
                            x: window.innerWidth,
                            duration: 2.0,
                            ease: "power4.out",
                            delay: 0.5 + 0.5 * index,
                            autoAlpha: 0,
                        }
                    )
                    .fromTo(
                        mesh!.material,
                        {
                            opacity: 1,
                        },
                        {
                            opacity: 0,
                            duration: 1.0,
                            ease: "power2.in",
                            delay: 0.5 + 0.2 * index,
                        },
                        "<"
                    );
            });
    }, []);

    return (
        <>
            {Array(3)
                .fill(null)
                .map((_, index) => {
                    return (
                        <mesh
                            key={index}
                            ref={(rf) => {
                                meshRef.current[index] = rf;
                            }}
                        >
                            <boxGeometry args={[130, 130, 130]} />
                            <meshPhongMaterial
                                color={0x6699ff}
                                transparent
                                opacity={0.8}
                                shininess={70}
                            />
                        </mesh>
                    );
                })}
        </>
    );
}

function Scene() {
    function CameraSetup() {
        const { camera } = useThree();
        camera.position.set(0, 0, 800);
        return null;
    }

    return (
        <Canvas style={{ width: "100vw", height: "100vh" }}>
            <ambientLight />
            <directionalLight
                color={0xffffff}
                intensity={5}
                position={[5, 0, 5]}
            />
            <CameraSetup />
            <RotatingBox />
        </Canvas>
    );
}

function FixedBox() {
    const meshRef = useRef<THREE.Mesh | null>(null);
    const [color, setColor] = useState<string>("rgb(137, 199, 132)");
    const boxSize: [number, number, number] = [50, 50, 50];

    useGSAP(() => {
        if (meshRef.current) {
            gsap.to(meshRef.current.rotation, {
                x: Math.PI * 2,
                y: Math.PI * 2,
                ease: "none",
                repeat: -1,
                duration: 4.0,
            });
        }
    });

    function handleBoxColor() {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
            16
        )}`;

        if (meshRef.current) {
            gsap.to(meshRef.current.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                duration: 1.0,
                ease: "power4.out",
                onComplete: () => {
                    setTimeout(() => {
                        if (meshRef.current) {
                            gsap.to(meshRef.current.scale, {
                                x: 1.0,
                                y: 1.0,
                                z: 1.0,
                                duration: 1.0,
                                ease: "power4.out",
                            });
                        }
                    }, 1000);
                },
            });
            gsap.to(meshRef.current.rotation, {
                y: meshRef.current.rotation.y + Math.PI * 5,

                duration: 1.0,
                ease: "power4.out",
                yoyo: true,
                yoyoEase: "power4.out",
            });
        }
        setColor(randomColor);
    }

    return (
        <mesh onClick={handleBoxColor} ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={boxSize} />
            <meshPhongMaterial
                color={color}
                transparent
                opacity={0.8}
                shininess={70}
            />
        </mesh>
    );
}

function FixedBoxScene() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (scrollContainerRef.current) {
            gsap.to(scrollContainerRef.current, {
                y: "-85vh",
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                },
            });
        }
    });

    function CameraSetup() {
        const { camera } = useThree();
        camera.position.set(0, 0, 120);
        return null;
    }

    const canvasStyle: CSSProperties = {
        width: "100px",
        height: "100px",
        position: "fixed",
        zIndex: 9,
        bottom: 0,
        cursor: "pointer",
    };

    const scrollContainerRefStyle: CSSProperties = {
        width: "100px",
        height: "100px",
        position: "fixed",
        zIndex: 8,
        bottom: 0,
        right: "-20px",
    };

    return (
        <div ref={scrollContainerRef} style={scrollContainerRefStyle}>
            <Canvas style={canvasStyle} ref={canvasRef}>
                <ambientLight />
                <directionalLight
                    color={0xffffff}
                    intensity={5}
                    position={[10, 5, 10]}
                />
                <CameraSetup />
                <FixedBox />
            </Canvas>
        </div>
    );
}

const LoadingStyle = styled.div`
    z-index: 10;
    position: fixed;
    background-color: rgb(32, 37, 116);
    inset: 0;
`;

const LoadingTextWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    text-align: center;
    font-size: 2.5rem;
    letter-spacing: 0.3rem;
    width: 100%;
    transform: translate(-50%, -50%);
`;

const LoadingH1Text = styled.h1`
    position: relative;
    overflow: hidden;
`;

const FadeLight = styled.div`
        position: absolute;
        top: 50%;
        transform:translateY(-50%);
        left: -30%;
        width: 20%;
        height: 30%;
        border-radius:50%;
        background-image: linear-gradient(
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 25%,
            rgba(255, 255, 255, 1.0) 50%,
            rgba(255, 255, 255, 0.6) 75%,
            rgba(255, 255, 255, 0) 100%
        );
        
    }
`;

const LoadingSpanText = styled.span`
    opacity: 0;
`;

const OverflowWrap = styled.div`
    overflow: hidden;
`;
