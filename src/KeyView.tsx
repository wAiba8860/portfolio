import React, {
    useState,
    useRef,
    Fragment,
    MouseEventHandler,
    ChangeEvent,
} from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
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
import { PostEditorPage } from "./PostEditorPage";
import { error } from "console";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

interface keyViewProps {
    handleLinkContact: () => void;
    handleLinkMyself: () => void;
    handleLinkProducts: () => void;
    handleLinkNews: () => void;
    handleLinkBook: () => void;
}

interface user {
    user: userType[];
}

interface userType {
    id: number;
    userName: string;
    passWard: string;
}

export function KeyView({
    handleLinkContact,
    handleLinkMyself,
    handleLinkProducts,
    handleLinkNews,
    handleLinkBook,
}: keyViewProps): React.ReactElement {
    const AnchorRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const ButtonRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [inputUserName, setInputUserName] = useState<string | null>(null);
    const [inputPassword, setInputPassword] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleChangeUserName(e: ChangeEvent<HTMLInputElement>) {
        const userName = e.target.value;
        setInputUserName(userName);
    }

    function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
        const password = e.target.value;
        setInputPassword(password);
    }

    function handleLoginWindow() {
        if (isLogin) {
            setIsLogin(false);
            return;
        }
        setIsOpen(!isOpen);
        setLoginError("");
    }

    function handleSubmit() {
        fetch("./users.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((res: user) => {
                const isValid = res.user.some((user) => {
                    return (
                        inputUserName === user.userName &&
                        inputPassword === user.passWard
                    );
                });
                if (isValid) {
                    setIsLogin(true);
                    setIsOpen(!isOpen);
                    setLoginError("");
                    setInputPassword("");
                    setInputUserName("");
                } else {
                    setLoginError("IDかパスワードが違います！");
                }
            })
            .catch((error) => {
                console.error(`${error}:jsonデータが読み込めませんでした。`);
            });
    }

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
                    "-=0.9"
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
                "-=0.9"
            );
        }
    }, []);

    return (
        <>
            <KeyViewContainer>
                <LoginButton onClick={handleLoginWindow}>
                    {!isLogin ? "ログイン" : "ログアウト"}
                </LoginButton>
                {isOpen && (
                    <LoginWindow>
                        <LoginInputWrapper>
                            <p>ユーザーID</p>
                            <LoginInput
                                type="text"
                                placeholder="taro or hanako"
                                onChange={handleChangeUserName}
                            />
                            <p>パスワード</p>
                            <LoginInput
                                type="password"
                                placeholder="testTaro or testHanako"
                                onChange={handleChangePassword}
                            />
                            {loginError}
                        </LoginInputWrapper>

                        <LoginButtonWrapper>
                            <CancelButton onClick={handleLoginWindow}>
                                キャンセル
                            </CancelButton>
                            <LoginSubmitButton onClick={handleSubmit}>
                                ログイン
                            </LoginSubmitButton>
                        </LoginButtonWrapper>
                    </LoginWindow>
                )}

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
                        onClick={handleLinkBook}
                    >
                        Read Book
                    </KeyViewButton>
                    <KeyViewButton
                        ref={(ref) => {
                            ButtonRef.current[3] = ref;
                        }}
                        onClick={handleLinkNews}
                    >
                        Japanese News
                    </KeyViewButton>

                    <KeyViewButton
                        ref={(ref) => {
                            ButtonRef.current[4] = ref;
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
                    {isLogin && (
                        <KeyViewLink to="/postEditorPage">
                            投稿ページへ
                        </KeyViewLink>
                    )}
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
const KeyViewLink = styled(Link)`
    display: block;
    color: #fff;
    font-size: 3rem;
    letter-spacing: 0.2rem;
    text-decoration: none;
    font-weight: bold;
    margin: 1rem 0;
    transition: color 0.5s;
    &:hover {
        color: rgb(34, 42, 107);
    }
`;
const KeyViewButton = styled.button`
    display: block;
    color: #fff;
    font-size: 3rem;
    letter-spacing: 0.2rem;
    font-weight: bold;
    margin: 1rem 0;
    transition: color 0.5s;
    &:hover {
        color: rgb(34, 42, 107);
    }
`;
const LoginButton = styled.button`
    position: absolute;
    padding: 10px 20px;
    top: 0;
    left: 0;
    color: #fff;
    border-radius: 3px;
    background-color: rgb(34, 42, 107);
    transition: color 0.3s, background-color 0.3s;
    &:hover {
        color: rgb(34, 42, 107);
        background-color: #fff;
    }
`;
const ButtonWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(0, -50%);
`;
const CancelButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: #fff;
    border-radius: 0.3rem;
    transition: 0.3s background-color;
    &:hover {
        background-color: rgb(230, 227, 227);
    }
`;
const LoginSubmitButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: rgb(34, 42, 107);
    border-radius: 0.3rem;
    color: #fff;
    transition: 0.3s background-color;
    &:hover {
        background-color: rgb(89, 106, 228);
    }
`;
const LoginWindow = styled.div`
    position: fixed;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background-color: #ccc;
    border-radius: 2rem;
    box-shadow: 2px 2px 4px #fff, -2px -2px 4px #fff;
`;
const LoginButtonWrapper = styled.div`
    position: absolute;
    display: flex;
    gap: 2rem;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0);
`;
const LoginInput = styled.input`
    background-color: #fff;
    border-radius: 0.3rem;
    border: 1px solid #888;
    margin-bottom: 1rem;
    padding: 0.2rem;
    &::placeholder {
        color: #ccc;
    }
`;
const LoginInputWrapper = styled.div`
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
`;
