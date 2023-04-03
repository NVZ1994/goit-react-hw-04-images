import React from "react";
import { Circles } from 'react-loader-spinner'

export function Loader() {
    return (
        <div className="Overlay">
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                visible={true}
            />
        </div>
    )
}
