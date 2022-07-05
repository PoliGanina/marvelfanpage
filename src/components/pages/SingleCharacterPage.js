import AppBanner from "../appBanner/AppBanner";
import './SingleCharacterPage.scss';

import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';


const SingleCharacterPage = () => {
    const{charId} = useParams();

    const [char, setChar] = useState(null);

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
            .then(char => setChar(char));
    }

    const errorMessage = error? <ErrorMessage/> : null;
    const spinner = loading? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null; 

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {thumbnail, name, description} = char;

    return (
        <div className='single-char__wrapper'>
            <img className='single-char__img' src={thumbnail} alt={name}/>
            <div className='single-char__description'>
                <h2 className='single-char__name'>{name}</h2>
                <p className='single-char__text'>{description ? description : 'The description is not available'}</p>
            </div>
        </div>
    )
}
export default SingleCharacterPage;