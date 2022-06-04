import { Component } from 'react';
import './charInfo.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }

    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true})
    }

    onCharLoading = ()=> {
        this.setState({loading: true})
    }

    render() {
        const {char, loading, error} = this.state;

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