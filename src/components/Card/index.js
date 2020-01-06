// Renders a photo for photo set

import React from "react";
import "../Card/style.css";

function Card(props) {
    return(
        <div className="card">
            <div className="card-image">
                <img src={props.image} alt="unsplash" onClick={() => props.clickImage(props.id)}></img>
            </div>
        </div>
    )
}

export default Card;