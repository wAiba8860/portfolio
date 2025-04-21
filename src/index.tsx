import React from "react";
import ReactDOM from "react-dom/client";
import MyApp from "./App";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { PostEditorPage } from "./PostEditorPage";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyApp />} />
                <Route
                    path="/postEditorPage"
                    element={<PostEditorPage />}
                ></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
