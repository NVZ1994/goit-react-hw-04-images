import './Searchbar.css'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const INITIAL_STATE = {
    search: '',
}

export function Searchbar({ onSubmit })  {
    const [search, setSearch] = useState(INITIAL_STATE.search)

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(search)
        setSearch(INITIAL_STATE.search)
        event.target.reset()
    }

        return (
            <header className='Searchbar'>
            <form className='SearchForm' id='search' onSubmit={handleSubmit}>
                <button type="submit" className='SearchForm-button'>
                    <span className='SearchForm-button-label'>Search</span>
                </button>

                    <input
                        name='search'
                    className='SearchForm-input'
                    type="text"
                    autoComplete="off"
                    autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                />
            </form>
        </header> 
        )
}
    
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}