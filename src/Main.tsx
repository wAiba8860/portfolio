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

interface MainProps {
    myselfRef: React.RefObject<HTMLDivElement | null>;
    ProductsRef: React.RefObject<HTMLDivElement | null>;
    contactRef: React.RefObject<HTMLDivElement | null>;
}

export function Main({ myselfRef, ProductsRef, contactRef }: MainProps) {
    return (
        <>
            <div ref={myselfRef}>
                <AboutMyself />
            </div>
            <div ref={ProductsRef}>
                <Products />
            </div>
            <div ref={contactRef}>
                <Contact />
            </div>
        </>
    );
}

function textSplit(
    elements: (string | null)[],
    refOJ: React.RefObject<(HTMLElement | null)[]>
) {
    return elements.map((text, index) => {
        return (
            <span
                key={index}
                ref={(ref) => {
                    if (refOJ.current) {
                        refOJ.current[index] = ref;
                    }
                }}
            >
                {text}
            </span>
        );
    });
}

function AboutMyself(): React.ReactElement {
    const fadeInVerticalRef = useRef<(HTMLElement | null)[]>([]);
    const aboutMeText1 = "職業訓練開始までは製造業に従事".split("");
    const aboutMeText2 =
        "訓練開始時はIllustratorとPhotoshopをひたすら学習".split("");
    const aboutMeText3 =
        "1ヶ月が過ぎてからは自主的にサイト制作の勉強を開始".split("");
    const aboutMeText4 =
        "HTML + CSSで静的サイトをコーディングするところから始め".split("");
    const aboutMeText5 = "WordPressオリジナルテーマを作成".split("");
    const aboutMeText6 =
        "購入した技術書でJavascriptを用いてWebサイトを動かす楽しさを覚え".split(
            ""
        );
    const aboutMeText7 = "HTML + CSSの学習を始めてから2ヶ月程度で".split("");
    const aboutMeText8 =
        "React + TypescriptでWebサイトを構築出来るようになる".split("");
    const aboutMeText1Ref = useRef<(HTMLElement | null)[]>([]);
    const aboutMeText2Ref = useRef<(HTMLElement | null)[]>([]);
    const aboutMeText3Ref = useRef<(HTMLElement | null)[]>([]);
    const aboutMeText4Ref = useRef<(HTMLElement | null)[]>([]);
    const aboutMeText5Ref = useRef<(HTMLElement | null)[]>([]);
    const aboutMeText6Ref = useRef<(HTMLElement | null)[]>([]);
    const aboutMeText7Ref = useRef<(HTMLElement | null)[]>([]);
    const aboutMeText8Ref = useRef<(HTMLElement | null)[]>([]);

    useGSAP(() => {
        if (fadeInVerticalRef.current) {
            fadeInVertical(fadeInVerticalRef.current[0]);
        }
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutMeText1Ref.current,
                start: "top 70%",
            },
        });
        tl.add(fadeInTextSplit(aboutMeText1Ref));
        tl.add(fadeInTextSplit(aboutMeText2Ref), "-=0.7");
        tl.add(fadeInTextSplit(aboutMeText3Ref), "-=0.7");
        tl.add(fadeInTextSplit(aboutMeText4Ref), "-=0.7");
        tl.add(fadeInTextSplit(aboutMeText5Ref), "-=0.5");
        tl.add(fadeInTextSplit(aboutMeText6Ref), "-=0.9");
        tl.add(fadeInTextSplit(aboutMeText7Ref), "-=0.7");
        tl.add(fadeInTextSplit(aboutMeText8Ref), "-=0.8");
    }, []);

    return (
        <>
            <AboutMyselfStyle>
                <CoverStyle>
                    <TextWrapper>
                        <div
                            ref={(ref) => {
                                fadeInVerticalRef.current[0] = ref;
                            }}
                        >
                            <H1Style>About me</H1Style>
                            <p style={{ marginBottom: "2rem" }}>私について</p>
                        </div>
                        <Pstyle>
                            {textSplit(aboutMeText1, aboutMeText1Ref)}
                        </Pstyle>
                        <Pstyle>
                            {textSplit(aboutMeText2, aboutMeText2Ref)}
                        </Pstyle>
                        <Pstyle>
                            {textSplit(aboutMeText3, aboutMeText3Ref)}
                        </Pstyle>
                        <Pstyle>
                            {textSplit(aboutMeText4, aboutMeText4Ref)}
                        </Pstyle>
                        <Pstyle>
                            {textSplit(aboutMeText5, aboutMeText5Ref)}
                        </Pstyle>
                        <Pstyle>
                            {textSplit(aboutMeText6, aboutMeText6Ref)}
                        </Pstyle>
                        <Pstyle>
                            {textSplit(aboutMeText7, aboutMeText7Ref)}
                        </Pstyle>
                        <Pstyle>
                            {textSplit(aboutMeText8, aboutMeText8Ref)}
                        </Pstyle>
                    </TextWrapper>
                </CoverStyle>
            </AboutMyselfStyle>
        </>
    );
}

export function Contact() {
    return (
        <>
            <ContactStyle>
                <ContactWrapper>
                    <h1>お問い合わせ</h1>
                    <form action="#" method="POST">
                        <ContactFlex>
                            <div>
                                <InputPStyle>姓</InputPStyle>
                                <InputStyle
                                    type="text"
                                    name="lastName"
                                    placeholder="例：相場"
                                />
                            </div>
                            <div>
                                <InputPStyle>名</InputPStyle>
                                <InputStyle
                                    type="text"
                                    name="firstName"
                                    placeholder="例：太郎"
                                />
                            </div>
                        </ContactFlex>
                        <ContactFlex>
                            <div>
                                <InputPStyle>セイ</InputPStyle>
                                <InputStyle
                                    type="text"
                                    name="lastNameFurigana"
                                    placeholder="例：あいば"
                                />
                            </div>
                            <div>
                                <InputPStyle>メイ</InputPStyle>
                                <InputStyle
                                    type="text"
                                    name="firstNameFurigana"
                                    placeholder="例：たろう"
                                />
                            </div>
                        </ContactFlex>
                        <InputPStyle>電話番号（※任意）</InputPStyle>
                        <InputStyle
                            type="number"
                            name="telephoneNumber"
                            placeholder="例：090-XXXX-XXXX"
                        />
                        <InputPStyle>Eメール</InputPStyle>
                        <InputStyle
                            type="email"
                            name="email"
                            placeholder="例：XXXXXXX@gmail.xxx"
                        />
                        <InputPStyle>お問い合わせ内容</InputPStyle>
                        <TextareaStyle></TextareaStyle>
                        <div style={{ textAlign: "left", marginTop: "3rem" }}>
                            <FormButton type="button">
                                ご入力内容のご確認
                            </FormButton>
                        </div>
                    </form>
                </ContactWrapper>
            </ContactStyle>
        </>
    );
}

const AboutMyselfStyle = styled.div`
    position: relative;
    z-index: 0;
    text-align: center;
    width: 100vw;
    height: 100vh;
    color: white;
    background-image: url("./images/MyselfBack.jpg");
    background-size: cover;
    background-position: center;
`;
const CoverStyle = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgb(17, 26, 102, 0.5);
`;
const TextWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const H1Style = styled.h1`
    display: inline-block;
    font-size: 3rem;
    border-bottom: 2px solid #fff;
`;
const Pstyle = styled.p`
    font-size: 1.2rem;
    margin: 0.5rem 0;
    letter-spacing: 1.7;
`;

const ContactStyle = styled.div`
    position: relative;
    z-index: 0;
    width: 100vw;
    background-color: rgb(34, 42, 107);
`;
const ContactWrapper = styled.div`
    width: 80%;
    max-width: 800px;
    color: #fff;
    text-align: center;
    padding: 3rem 0;
    margin: auto;
`;
const InputStyle = styled.input`
    width: 100%;
    background-color: #fff;
    padding: 0.3rem;
    border-radius: 0.3rem;
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const InputPStyle = styled.p`
    margin: 1rem auto 0.2rem;
    text-align: left;
    font-size: 1.3rem;
`;
const FormButton = styled.button`
    background-color: rgb(149, 154, 192);
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    font-size: 1.3rem;
`;
const ContactFlex = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;
const TextareaStyle = styled.textarea`
    width: 100%;
    height: 300px;
    background-color: #fff;
    padding: 0.3rem;
    border-radius: 0.3rem;
`;
