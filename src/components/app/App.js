import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import ComicsList from "../comicsList/ComicsList";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";

const App = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected} selectedChar={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <div className="char__comics">
                    <AppBanner/>
                    <ErrorBoundary>
                        <ComicsList/>
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    )   
}

export default App;