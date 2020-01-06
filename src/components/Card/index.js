import React from "react";
import "../Card/style.css";

function Card(props) {
    return(
        <div className="card">
            <div className="card-image">
                {/* <figure class="image is-25x25"> */}
                    <img src={props.image} alt="unsplash" onClick={() => props.clickImage(props.id)}></img>
                {/* </figure> */}
            </div>
        </div>
    )
}

export default Card;