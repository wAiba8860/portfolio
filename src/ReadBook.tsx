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
import { fadeInVertical, fadeInRight } from "./animation";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export function ReadBook() {
    const bookTitleRef = useRef<HTMLHeadingElement | null>(null);
    const bookThumbnailRef = useRef<(HTMLDivElement | null)[]>([]);
    const bookTextRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (bookTitleRef.current) {
            fadeInVertical(bookTitleRef.current);
        }
    }, []);

    useGSAP(() => {
        if (bookThumbnailRef) {
            bookThumbnailRef.current.map((ref, index) => {
                const textRef = bookTextRef.current[index];
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: bookThumbnailRef.current[index],
                        start: "top 80%",
                    },
                });
                tl.add(fadeInRight(ref));
                tl.fromTo(
                    textRef,
                    {
                        opacity: 0,
                        x: "5rem",
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.0,
                        ease: "power1.out",
                    },
                    "-=1.5"
                );
            });
        }
    }, []);

    return (
        <ReadBookBackImage>
            <ReadBookCoverColor>
                <BookContents>
                    <BookWrapperTitle ref={bookTitleRef}>
                        職業訓練期間（4ヶ月）からこれまで読んだ書籍 と
                        Webサービス
                    </BookWrapperTitle>
                    <BookWrapper>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[0] = ref;
                                }}
                            >
                                <BookImg src="./images/dokusyuPHP.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[0] = ref;
                                }}
                            >
                                <h3>独習PHP第4版（現在購読中）</h3>
                                <CompanyName>翔泳社</CompanyName>
                                <BookImpression>
                                    動的なWebサービスを構築したいと考えたことと、資格勉強のために購入。
                                    独習シリーズは安心感があります。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[1] = ref;
                                }}
                            >
                                <BookImg src="./images/reactOfficial.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[1] = ref;
                                }}
                            >
                                <h3>React 公式ドキュメント</h3>
                                <BookImpression>
                                    React初学者はまず公式チュートリアルを読めとはよく言われたもので、
                                    概念から丁寧に解説されていてReactの理解が大変進みました。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                    </BookWrapper>
                    <BookWrapper>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[2] = ref;
                                }}
                            >
                                <BookImg src="./images/modernReact.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[2] = ref;
                                }}
                            >
                                <h3>
                                    モダンJavaScriptの基本から始める React
                                    実践の教科書
                                </h3>
                                <CompanyName>SB Creative</CompanyName>
                                <BookImpression>
                                    端的にJavaScriptとReactの解説がされていて、
                                    Reactを触ったことのある方に最適な本だと思います。
                                    しかし、JavaScript、React両方の内容が薄いと感じたので、
                                    初学者はReact公式チュートリアルをしっかりやった方が良いと感じました。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[3] = ref;
                                }}
                            >
                                <BookImg src="./images/firstTypeScript.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[3] = ref;
                                }}
                            >
                                <h3>現場で使える TypeScript 詳解実践ガイド</h3>
                                <CompanyName>マイナビ</CompanyName>
                                <BookImpression>
                                    THE・教科書と言わんばかりの内容で解説に力を入れていたり、
                                    本書で必要なJavaScriptの知識が不足していれば後ろの索引にJavaScriptの解説があったりでかなりの親切設計だと思います。
                                    これで各章の終わり際に練習問題があれば満点でした。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                    </BookWrapper>
                    <BookWrapper>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[4] = ref;
                                }}
                            >
                                <BookImg src="./images/mostGithub.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[4] = ref;
                                }}
                            >
                                <h3>いちばんやさしい Git & Github の教本</h3>
                                <CompanyName>インプレス</CompanyName>
                                <BookImpression>
                                    いちばんやさしいとだけあって、ところどころイラストの解説付きでGit
                                    &
                                    GitHubの理解が初学者目線ではかなり進んだと思います。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[5] = ref;
                                }}
                            >
                                <BookImg src="./images/javaScriptHonkaku.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[5] = ref;
                                }}
                            >
                                <h3>JavaScript本格入門 [改訂3版]</h3>
                                <CompanyName>技術評論社</CompanyName>
                                <BookImpression>
                                    比較的新し目で評判も良かったので、教科書代わりに購入。JavaScriptで不明な点があれば、こちらで一度調べてから独習にも目を通すようにしています。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                    </BookWrapper>
                    <BookWrapper>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[6] = ref;
                                }}
                            >
                                <BookImg src="./images/dokusyuJavaScript.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[6] = ref;
                                }}
                            >
                                <h3>独習JavaScript新版</h3>
                                <CompanyName>翔泳社</CompanyName>
                                <BookImpression>
                                    入門講座のみではやはり分からない部分が多かったため追加で購入。練習問題や章の理解度チェック等、手を動かして考える問題が多いので大変ためになりました。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[7] = ref;
                                }}
                            >
                                <BookImg src="./images/firstJavaScript.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[7] = ref;
                                }}
                            >
                                <h3>1冊ですべて身につくJavaScript入門講座</h3>
                                <CompanyName>SB Creative</CompanyName>
                                <BookImpression>
                                    プログラミングの楽しさを教えていただいた本。内容自体はJavaScriptの狭くて浅い範囲しか解説されていないが、それでも最初に手に取った本がこれで良かったと思えます。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                    </BookWrapper>
                    <BookWrapper>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[8] = ref;
                                }}
                            >
                                <BookImg src="./images/firstHTML.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[8] = ref;
                                }}
                            >
                                <h3>スラスラわかる HTML & CSS のきほん</h3>
                                <CompanyName>SB Creative</CompanyName>
                                <BookImpression>
                                    職業訓練用の教科書。手を動かしながら3日ほどで完読しました。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[9] = ref;
                                }}
                            >
                                <BookImg src="./images/firstWordPress.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[9] = ref;
                                }}
                            >
                                <h3>ゼロから学ぶ はじめてのWordPress</h3>
                                <CompanyName>SB Creative</CompanyName>
                                <BookImpression>
                                    職業訓練用の教科書。大変分かりやすく簡単だったため手を動かして2日で読み切りました。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                    </BookWrapper>
                    <BookWrapper>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[10] = ref;
                                }}
                            >
                                <BookImg src="./images/illustratorPhotoshop.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[10] = ref;
                                }}
                            >
                                <h3>
                                    世界一わかりやすい Illustrator & Photoshop
                                    操作とデザインの教科書
                                </h3>
                                <CompanyName>技術評論社</CompanyName>
                                <BookImpression>
                                    職業訓練用の教科書。イラストレーターとフォトショップは初めて触ったため大変勉強になりました。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                        <FlexBoxBook>
                            <div
                                ref={(ref) => {
                                    bookThumbnailRef.current[11] = ref;
                                }}
                            >
                                <BookImg src="./images/progate.jpg" />
                            </div>
                            <div
                                ref={(ref) => {
                                    bookTextRef.current[11] = ref;
                                }}
                            >
                                <h3>Progate</h3>
                                <BookImpression>
                                    基礎を学習するために初めに取り掛かったWebサービス。
                                    HTML&CSS JavaScript PHP Git
                                    等の基礎を学びました。
                                </BookImpression>
                            </div>
                        </FlexBoxBook>
                    </BookWrapper>
                </BookContents>
            </ReadBookCoverColor>
        </ReadBookBackImage>
    );
}

const ReadBookBackImage = styled.div`
    background-image: url("./images/BookBack.jpg");
    background-position: center;
    background-size: cover;
`;
const ReadBookCoverColor = styled.div`
    background-color: rgb(34, 42, 107, 0.5);
`;
const BookWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    color: #fff;

    @media (max-width: 768px) {
        display: block;
    }
`;
const BookContents = styled.div`
    padding: 1rem;
`;
const BookWrapperTitle = styled.h2`
    font-size: 2rem;
    margin: 2rem 0;
    text-align: center;
    color: #fff;
`;
const BookImg = styled.img`
    max-width: 210px;
`;
const CompanyName = styled.h3`
    font-size: 0.9rem;
`;
const BookImpression = styled.p`
    margin-top: 0.5rem;
    font-size: 0.9rem;
    line-height: 1.6;
`;
const FlexBoxBook = styled.div`
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
`;
