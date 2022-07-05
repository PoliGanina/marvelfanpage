import './SearchBar.scss';
import '../../style/button.scss';

import { useFormik } from 'formik';
import {useState} from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

const SearchBar = () => {
    
    const [charName, setCharName] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(name => setCharName(name))
    }

    const validate = values => {
        const errors = {};
    
        if(!values.name) { // если отсутствует значение name
            errors.name = 'This field is required';
        } else if (typeof(values.name) != 'string') {
            errors.name = 'Please use only letters';
        }
    
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validate,
        onSubmit: values => updateChar(values.name)

    })
    const errorMessage = error ? <div className='searchbar__critical-error'>{formik.errors.name}</div> : null;
    const result = !charName ? null : charName.length > 0 ? 
        <div className='searchbar__result-wrapper'>
            <div className='searchbar__result-success'>There is! Visit {charName[0].name} page?</div>
            <Link to={`/${charName[0].id}`} className="button button__secondary">
                <div className="inner">Find</div>
            </Link>
        </div> :
        <div className='searchbar__result-error'>The character was not found. Check the name and try again.</div>;

    return (
        <form  className='searchbar__bg mt-3' onSubmit={formik.handleSubmit}>
            <div className="searchbar__title">Or find a character by name:</div>
            <div className='searchbar__wrapper'>
                <input 
                    name='name'
                    type='text'
                    placeholder='Enter Name'
                    className="searchbar__input"
                    {...formik.getFieldProps('name')}
                />
                <button 
                    type='submit'
                    disabled={loading}
                    className="button button__main button__searchbar">
                    <div className="inner">Find</div>
                </button>
            </div>
            {formik.errors.name && formik.touched.name? <div className='error'>{formik.errors.name}</div> : null}
            {result}
            {errorMessage}
        </form>
    )
}
export default SearchBar;