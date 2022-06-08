import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {charId} = props;

    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(()=> {
        updateChar();
    },[charId])

    const updateChar = () => {
        clearError();
        
        if (!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;

    const errorMessage = error? <ErrorMessage/> : null;
    const spinner = loading? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null;

    return (
    <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content} 
    </div>
    )   
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const comicsList = 
        comics.map((item, i) => { 
            return (
                <li className="char__comics-item"
                    key={i}>
                    {item.name}
                </li>
            )
        })
    
    const comicsView = comics.length === 0 ? 'Comics list is not available': comicsList.slice(0,10);
    return (
        <>
        <div className="char__basics">
                <img src={thumbnail} 
                     alt={name}
                     style={thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? 
                {objectFit: 'contain'} : {objectFit: 'cover'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description? description : "No description so far"}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsView}
            </ul>
        </>
    )
}

export default CharInfo;