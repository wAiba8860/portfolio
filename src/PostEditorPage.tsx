import React, {
    useState,
    useRef,
    Fragment,
    forwardRef,
    RefObject,
} from "react";
import { flushSync } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

export function PostEditorPage() {
    const [textEdit, SetTextEdit] = useState(null);

    return (
        <PostWrapper>
            <PostContents>
                <h3>※投稿ページは準備中です</h3>
                <h3 style={{ textAlign: "left" }}>投稿のタイトル：</h3>
                <PostInput type="text" name="title" id="title" />
                <h3 style={{ textAlign: "left" }}>投稿内容：</h3>
                <PostTextArea
                    name="PostContent"
                    id="PostContent"
                ></PostTextArea>
                <h3 style={{ textAlign: "left" }}>投稿のサムネイル画像</h3>
                <div style={{ textAlign: "left" }}>
                    <ReferenceButton>参照</ReferenceButton>
                </div>
                <PostButtonWrapper>
                    <BackButton to={"/"}>戻る</BackButton>
                    <PostButton>投稿</PostButton>
                </PostButtonWrapper>
            </PostContents>
        </PostWrapper>
    );
}

const PostWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgb(34, 42, 107);
    color: #fff;
    text-align: center;
    line-height: 1.7;
`;
const PostContents = styled.div`
    width: 50%;
    margin: auto;
`;

const PostInput = styled.input`
    background-color: #fff;
    border-radius: 0.3rem;
    width: 100%;
`;

const PostTextArea = styled.textarea`
    background-color: #fff;
    border-radius: 0.3rem;
    width: 100%;
    height: 300px;
`;

const ReferenceButton = styled.button`
    color: #000;
    background-color: #fff;
    border-radius: 0.3rem;
    padding: 0.2rem 1rem;
`;

const BackButton = styled(Link)`
    color: #000;
    background-color: #fff;
    border-radius: 0.3rem;
    padding: 0.2rem 1rem;
    margin-right: 2rem;
    text-decoration: none;
`;

const PostButton = styled.button`
    color: #000;
    background-color: #fff;
    border-radius: 0.3rem;
    padding: 0.2rem 1rem;
`;

const PostButtonWrapper = styled.div`
    margin: 1rem 0;
`;
