import React from "react";
import { Audio } from 'react-loader-spinner';
import './Loader.css';

export function Loader() {
    return (
        <div className='Overlay'>
            <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
                />
        </div>
    )
}