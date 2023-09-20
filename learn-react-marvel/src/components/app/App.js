import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Page404 from "../pages/404";
import SinglePage from "../pages/SinglePage";
import SingleComicLayout from "../pages/singleComicLayout/SingleComicLayout";
import singleCharacterLayout from "../pages/singleCharacterLayout/SingleCharacterLayout";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route
                            path="/comics/:id"
                            element={<SinglePage Component={SingleComicLayout} dataType="comics" />}
                        />

                        <Route
                            path="/characters/:id"
                            element={<SinglePage Component={singleCharacterLayout} dataType="characters" />}
                        />

                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
