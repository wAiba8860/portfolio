import React, {
    useState,
    useRef,
    Fragment,
    forwardRef,
    RefObject,
    useEffect,
    ChangeEvent,
    ChangeEventHandler,
} from "react";
import { flushSync } from "react-dom";
import { Link, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { fadeInVertical, fadeInTextSplit } from "./animation";
import { Products } from "./Products";
import { error } from "console";
import { url } from "inspector";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

interface GArticle {
    source: {
        id: string | null;
        url: string;
    };
    title: string;
    description: string | null;
    url: string;
    image: string | null;
    publishedAt: string;
    content: string | null;
}

interface GNewsResponse {
    status: string;
    totalArticles: number;
    articles: GArticle[];
}

export function GNewsAPI() {
    const [news, setNews] = useState<GNewsResponse | null>(null);
    const [category, setCategory] = useState<string>("general");
    const [isNews, setIsNews] = useState<boolean>(false);
    const myAPIkey = process.env.REACT_APP_GNEWS_API_KEY;
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=ja&country=jp&apikey=${myAPIkey}`;
    console.log(myAPIkey);

    const fetchNews = () => {
        if (isNews) {
            const request = new Request(url);
            fetch(request)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data: GNewsResponse) => {
                    setNews(data);
                    console.log("Success!");
                })
                .catch((error) => {
                    console.error("ニュース取得に失敗しました:", error);
                });
            setIsNews(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [isNews]);

    function handleNews() {
        setIsNews(true);
    }

    function handleChangeNews(e: ChangeEvent<HTMLSelectElement>) {
        setCategory(e.target.value);
    }

    if (!news) {
        return (
            <>
                <NewsContainer>
                    <NewsTitle>最新ニュース(GNews)</NewsTitle>
                    <NewsReacquisitionButton onClick={handleNews}>
                        ニュースを取得
                    </NewsReacquisitionButton>
                    <p>ボタンを押しても取得できない場合</p>
                    <p>API上限の可能性があります</p>
                </NewsContainer>
            </>
        );
    }

    return (
        <NewsContainer>
            <NewsTitle>最新ニュース(GNews)</NewsTitle>

            <FlexContent>
                <SelectWrapper>
                    <SelectNews
                        name="newsValue"
                        id="newsValue"
                        onChange={handleChangeNews}
                    >
                        <OptionStyle value="general" selected>
                            全般
                        </OptionStyle>
                        <OptionStyle value="world">世界のニュース</OptionStyle>
                        <OptionStyle value="nation">国内のニュース</OptionStyle>
                        <OptionStyle value="business">ビジネス</OptionStyle>
                        <OptionStyle value="technology">
                            テクノロジー
                        </OptionStyle>
                        <OptionStyle value="entertainment">
                            エンターテイメント
                        </OptionStyle>
                        <OptionStyle value="sports">スポーツ</OptionStyle>
                        <OptionStyle value="science">科学</OptionStyle>
                        <OptionStyle value="health">健康</OptionStyle>
                    </SelectNews>
                </SelectWrapper>
                <NewsReacquisitionButton onClick={handleNews}>
                    ニュースを再取得
                </NewsReacquisitionButton>
            </FlexContent>
            {news.articles?.map((article, index) => {
                return (
                    <FlexNews key={index}>
                        {article.image && (
                            <div>
                                <img
                                    style={{
                                        width: "200px",
                                        borderRadius: "1rem",
                                    }}
                                    src={article.image}
                                    alt="thumbnail"
                                />
                            </div>
                        )}
                        <div>
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <NewsAnchor
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ニュースを見る（外部リンク）
                            </NewsAnchor>
                        </div>
                    </FlexNews>
                );
            })}
        </NewsContainer>
    );
}

interface Article {
    source: {
        id: string | null;
        url: string;
    };
    author: string;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

interface NewsResponse {
    status: string;
    totalArticles: number;
    articles: Article[];
}

// export function NewsAPI() {
//     const [news, setNews] = useState<NewsResponse | null>(null);
//     const [category, setCategory] = useState<string>(
//         "%E3%83%86%E3%82%AF%E3%83%8E%E3%83%AD%E3%82%B8%E3%83%BC"
//     );

//     const fetchNews = () => {
//         const myAPIkey = "61f3aac904b8420799790765c04544ab";
//         const url = `https://newsapi.org/v2/everything?q=${category}&pageSize=20&apiKey=${myAPIkey}`;
//         const request = new Request(url);
//         fetch(request)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then((data: NewsResponse) => {
//                 setNews(data);
//                 console.log("Success!");
//             })
//             .catch((error) => {
//                 console.error("ニュース取得に失敗しました:", error);
//             });
//     };

//     useEffect(() => {
//         fetchNews();
//     }, []);

//     function handleNews() {
//         fetchNews();
//     }

//     function handleChangeNews(e: ChangeEvent<HTMLSelectElement>) {
//         setCategory(e.target.value);
//     }

//     if (!news) {
//         return (
//             <>
//                 <NewsContainer>
//                     <NewsTitle>最新ニュース(NewsAPI)</NewsTitle>
//                     <NewsReacquisitionButton onClick={handleNews}>
//                         ニュースを取得
//                     </NewsReacquisitionButton>
//                     <p>ボタンを押しても取得できない場合</p>
//                     <p>API上限の可能性があります</p>
//                 </NewsContainer>
//             </>
//         );
//     }

//     return (
//         <NewsContainer>
//             <NewsTitle>最新ニュース(NewsAPI)</NewsTitle>
//             <SelectNews
//                 name="newsValue"
//                 id="newsValue"
//                 onChange={handleChangeNews}
//             >
//                 <option value="%E3%83%86%E3%82%AF%E3%83%8E%E3%83%AD%E3%82%B8%E3%83%BC">
//                     テクノロジー
//                 </option>
//                 <option value="%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%B3">
//                     スマートフォン
//                 </option>
//             </SelectNews>
//             <button onClick={handleNews} disabled>
//                 ニュースを再取得
//             </button>

//             {news.articles?.map((article, index) => {
//                 return (
//                     <FlexNews key={index}>
//                         {article.urlToImage && (
//                             <div>
//                                 <img
//                                     style={{
//                                         width: "200px",
//                                         borderRadius: "1rem",
//                                     }}
//                                     src={article.urlToImage}
//                                     alt="thumbnail"
//                                 />
//                             </div>
//                         )}
//                         <div>
//                             <h3>{article.title}</h3>
//                             <p>{article.description}</p>
//                             <a
//                                 href={article.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 ニュースを見る
//                             </a>
//                         </div>
//                     </FlexNews>
//                 );
//             })}
//         </NewsContainer>
//     );
// }

const NewsTitle = styled.h1`
    text-align: center;
    margin: 2rem;
`;

const NewsContainer = styled.div`
    background-color: rgb(223, 245, 255);
    padding: 1rem;
`;

const FlexNews = styled.div`
    display: flex;
    padding: 1rem;
    gap: 1rem;
    align-items: center;
`;

const FlexContent = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const NewsReacquisitionButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: rgb(34, 42, 107);
    border: 2px solid rgb(34, 42, 107);
    color: #fff;
    border-radius: 0.5rem;
    transition: 0.3s background-color, 0.3s color;
    &:hover {
        background-color: rgb(255, 255, 255);
        color: rgb(34, 42, 107);
    }
`;

const OptionStyle = styled.option`
    border-radius: 1rem;
`;

const SelectWrapper = styled.div`
    position: relative;

    &::before {
        position: absolute;
        top: 40%;
        right: 20px;
        content: "";
        width: 10px;
        height: 10px;
        background-color: #000;
        transform: rotate(45deg);
    }
    &::after {
        position: absolute;
        top: 35%;
        right: 20px;
        content: "";
        width: 10px;
        height: 10px;
        background-color: #fff;
        transform: rotate(45deg);
    }
`;
const SelectNews = styled.select`
    padding: 0.5rem 1rem;
    border: 2px solid rgb(34, 42, 107);
    background-color: #fff;
    border-radius: 0.5rem;
    cursor: pointer;
`;

const NewsAnchor = styled.a`
    display: inline-block;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    font-weight: bold;
    color: rgb(34, 42, 107);

    &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-bottom: 3px solid rgb(34, 42, 107);
    }
    &:hover {
        &::before {
            transition: 0.5s all;
            width: 100%;
        }
    }
`;
