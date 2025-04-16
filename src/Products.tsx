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

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

export function Products(): React.ReactElement {
    const fadeInVerticalRef = useRef<(HTMLElement | null)[]>([]);
    const productContentsRef = useRef<(HTMLElement | null)[]>([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: fadeInVerticalRef.current[0],
                start: "top 90%",
            },
        });
        tl.fromTo(
            fadeInVerticalRef.current[0],
            {
                opacity: 0,
                y: "5rem",
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power4.out",
            }
        );
        const proContents = productContentsRef.current.map((ref) => {
            return gsap.fromTo(
                ref,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 1.0,
                    ease: "power4.out",
                }
            );
        });

        tl.add(proContents, "-=0.2");
    }, []);

    return (
        <>
            <BrowserRouter>
                <ProductsWrapper>
                    <ProductsCover>
                        <ProductsH1Style
                            ref={(ref) => {
                                fadeInVerticalRef.current[0] = ref;
                            }}
                        >
                            制作Webサイト一覧
                        </ProductsH1Style>
                        <ProductsTextWrapper>
                            <ProductContent
                                ref={(ref) => {
                                    productContentsRef.current[0] = ref;
                                }}
                            >
                                <h2>
                                    企業実習期間課題
                                    <br />
                                    Webサイト(3作品目)
                                </h2>
                                <div style={{ height: "150px" }}>
                                    <OverViewTextH3>
                                        【制作期間】
                                    </OverViewTextH3>
                                    <OverViewTextP>
                                        コーディング：5日
                                    </OverViewTextP>
                                    <OverViewTextP>
                                        ワイヤーフレーム等の構想：1日
                                        （事前にデザイン会社様より構想の例を与えられていたため）
                                    </OverViewTextP>
                                </div>
                                <>
                                    <LinkImgTag
                                        src="./images/short_house_movie.jpg"
                                        alt="houseShortMovie"
                                    />
                                    <LinkStyle
                                        to="https://house-short-movie-p9dm.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Webサイトへ
                                    </LinkStyle>
                                </>
                                <div>
                                    <OverViewTextH3>
                                        【Webサイト概要】
                                    </OverViewTextH3>
                                    <OverViewTextP>
                                        住宅会社や工務店向けの、住宅動画作成会社様のLPサイト
                                    </OverViewTextP>
                                    <OverViewTextP>
                                        Instagramからのリンクからアクセスして来られるお客様を想定しているため、
                                        スマホファースト仕様
                                    </OverViewTextP>
                                </div>

                                <ProgrammingText>
                                    <ProgrammingLanguage>
                                        使用言語
                                    </ProgrammingLanguage>
                                    <ul>
                                        <LiStyle>React</LiStyle>
                                        <LiStyle>Typescript</LiStyle>
                                    </ul>
                                    <ProgrammingLanguage
                                        style={{ marginTop: "1rem" }}
                                    >
                                        使用スタイルcss
                                    </ProgrammingLanguage>
                                    <ul>
                                        <LiStyle>styled-components</LiStyle>
                                    </ul>
                                </ProgrammingText>
                            </ProductContent>
                            <ProductContent
                                ref={(ref) => {
                                    productContentsRef.current[1] = ref;
                                }}
                            >
                                <h2>
                                    卒業制作課題
                                    <br />
                                    Webサイト(2作品目)
                                </h2>
                                <div style={{ height: "150px" }}>
                                    <OverViewTextH3>
                                        【制作期間】
                                    </OverViewTextH3>
                                    <OverViewTextP>
                                        コーディング：6日
                                    </OverViewTextP>
                                    <OverViewTextP>
                                        ワイヤーフレーム等の構想：1日
                                        <br />
                                        バナー、キャラクター作成：2日
                                    </OverViewTextP>
                                </div>
                                <>
                                    <LinkImgTag
                                        src="./images/bread-shop.jpg"
                                        alt="houseShortMovie"
                                    />
                                    <LinkStyle
                                        to="https://waiba8860.github.io/bread_shop_assignment/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Webサイトへ
                                    </LinkStyle>
                                </>
                                <div>
                                    <OverViewTextH3>
                                        Webサイト概要
                                    </OverViewTextH3>
                                    <OverViewTextP>
                                        既存のパン屋のリニューアル案としてのWebサイト
                                    </OverViewTextP>
                                    <OverViewTextP>
                                        どうすればWebページの下部までブラウザバッグせずにスクロールしてもらえるか
                                        流れを意識
                                    </OverViewTextP>
                                </div>
                                <ProgrammingText>
                                    <ProgrammingLanguage>
                                        使用言語
                                    </ProgrammingLanguage>
                                    <ul>
                                        <LiStyle>HTML & CSS</LiStyle>
                                        <LiStyle>Javascript</LiStyle>
                                    </ul>
                                    <ProgrammingLanguage
                                        style={{ marginTop: "1rem" }}
                                    >
                                        バナー作成、マスコットキャラ作成
                                    </ProgrammingLanguage>
                                    <ul>
                                        <LiStyle>Illustrator</LiStyle>
                                        <LiStyle>Photoshop</LiStyle>
                                    </ul>
                                </ProgrammingText>
                            </ProductContent>
                            <ProductContent
                                ref={(ref) => {
                                    productContentsRef.current[2] = ref;
                                }}
                            >
                                <h2>
                                    企業実習前課題制作
                                    <br />
                                    Webサイト(1作品目)
                                </h2>
                                <div style={{ height: "150px" }}>
                                    <OverViewTextH3>
                                        【制作期間】
                                    </OverViewTextH3>
                                    <OverViewTextP>
                                        コーディング：10日
                                    </OverViewTextP>
                                    <OverViewTextP>
                                        ワイヤーフレーム等の構想：トレースのためほぼ無し
                                        <br />
                                        素材作成：1日
                                    </OverViewTextP>
                                </div>
                                <>
                                    <LinkImgTag
                                        src="./images/album-design.jpg"
                                        alt="houseShortMovie"
                                    />
                                    <LinkStyle
                                        to="https://waiba8860.github.io/Album_design/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Webサイトへ
                                    </LinkStyle>
                                </>
                                <div>
                                    <OverViewTextH3>
                                        Webサイト概要
                                    </OverViewTextH3>
                                    <OverViewTextP>
                                        アルバムデジタル化サービスを手がけるサイト様のトレースWebサイト
                                    </OverViewTextP>
                                    <OverViewTextP>
                                        初めてのWebサイト制作だったため動きがかなり少ないが
                                        空白の取り方等、勉強になったWebサイト
                                    </OverViewTextP>
                                </div>
                                <ProgrammingText>
                                    <ProgrammingLanguage>
                                        使用言語
                                    </ProgrammingLanguage>
                                    <ul>
                                        <LiStyle>HTML & CSS</LiStyle>
                                        <LiStyle>
                                            Javascript (little...)
                                        </LiStyle>
                                    </ul>
                                </ProgrammingText>
                            </ProductContent>
                        </ProductsTextWrapper>
                        <BannerContents />
                    </ProductsCover>
                </ProductsWrapper>
            </BrowserRouter>
        </>
    );
}

function BannerContents(): React.ReactElement {
    const bannerTitleRef = useRef<(HTMLElement | null)[]>([]);
    const bannerWrapRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: bannerTitleRef.current[0],
                start: "top 90%",
            },
        });
        tl.fromTo(
            bannerTitleRef.current[0],
            {
                opacity: 0,
                y: "5rem",
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power4.out",
            }
        );
        tl.fromTo(
            bannerWrapRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 1.0,
                ease: "power4.out",
            },
            "-=0.3"
        );
    }, []);

    return (
        <BannerContainer>
            <ProductsH1Style
                ref={(ref) => {
                    bannerTitleRef.current[0] = ref;
                }}
            >
                制作バナー一覧
            </ProductsH1Style>
            <div ref={bannerWrapRef}>
                <FlexTwoColumns>
                    <BannerWrapper>
                        <BannerImg src="./images/banner1.png" alt="bannerOne" />
                        <h3>量販店向け</h3>
                        <h3>バレンタインセール告知用バナー</h3>
                    </BannerWrapper>
                    <BannerWrapper>
                        <BannerImg src="./images/banner2.jpg" alt="bannerTwo" />
                        <h3>中高年代をターゲットにした</h3>
                        <h3>ペットショップバナー</h3>
                    </BannerWrapper>
                    <BannerWrapper>
                        <BannerImg
                            src="./images/banner3.png"
                            alt="bannerThree"
                        />
                        <h3>シューズ専門店向け</h3>
                        <h3>ランニングシューズ販売促進バナー</h3>
                    </BannerWrapper>
                </FlexTwoColumns>
                <FlexTwoColumns>
                    <BannerWrapper>
                        <BannerImg
                            src="./images/banner4.png"
                            alt="bannerFour"
                        />
                        <h3>ネットショップ向け</h3>
                        <h3>長財布販売促進バナー</h3>
                    </BannerWrapper>
                    <BannerWrapper>
                        <BannerImg
                            style={{ maxWidth: "360px" }}
                            src="./images/banner5.png"
                            alt="bannerFive"
                        />
                        <h3>新潟県リスキリング事業</h3>
                        <h3>事業者様向けセミナーバナー</h3>
                    </BannerWrapper>
                    <BannerWrapper>
                        <BannerImg
                            style={{ maxWidth: "360px" }}
                            src="./images/banner6.png"
                            alt="bannerSix"
                        />
                        <h3>新潟県リスキリング事業</h3>
                        <h3>受講資格がある方全般向けバナー</h3>
                    </BannerWrapper>
                </FlexTwoColumns>
            </div>
        </BannerContainer>
    );
}

const BannerContainer = styled.div`
    padding: 2rem;
`;
const ProductsWrapper = styled.div`
    text-align: center;
    width: 100vw;
    background-image: url("./images/ProductsBack.jpg");
    background-position: bottom;
    background-size: cover;
    background-color: rgb(17, 26, 102, 0.8);
    color: #fff;
`;
const ProductsCover = styled.div`
    width: 100vw;
    background-color: rgb(17, 26, 102, 0.3);
`;
const ProductContent = styled.div`
    width: 80%;
    margin: 0 auto;
    padding-bottom: 2rem;
`;
const ProductsH1Style = styled.h1`
    font-size: 2.5rem;
    padding: 2rem 0;
`;
const ProductsTextWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;
const OverViewTextH3 = styled.h3`
    margin: 1rem 0;
`;
const OverViewTextP = styled.p`
    text-align: left;
`;
const LiStyle = styled.li`
    text-align: left;
    list-style: inside;
`;
const LinkStyle = styled(Link)`
    width: 100%;
    display: inline-block;
    color: rgb(17, 26, 102);
    background-color: #fff;
    text-decoration: none;
    padding: 1rem 0.5rem;
    border-radius: 3rem;
    transition: background-color 0.5s, color 0.5s, border-radius 0.5s;
    &:hover {
        background-color: rgb(20, 133, 238);
        color: #fff;
        border-radius: 0;
    }
`;
const LinkImgTag = styled.img`
    width: 100%;
    margin: 1rem auto;
`;
const ProgrammingText = styled.div`
    margin: 1rem auto 0;
    width: 100%;
    text-align: left;
`;
const ProgrammingLanguage = styled.p`
    font-weight: bold;
    font-size: 1.2rem;
`;
const BannerWrapper = styled.div`
    margin-bottom: 2rem;
`;
const BannerImg = styled.img`
    width: 100%;
`;
const FlexTwoColumns = styled.div`
    display: flex;
    justify-content: center;
    vertical-align: top;
    gap: 2rem;
`;
