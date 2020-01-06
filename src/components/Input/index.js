// Renders input form for search term

import React from "react";

function Input(props) {
    return (
        <div className="field has-addons">
          <div className="control text-input">
            <input 
              value={props.search} 
              name="search" 
              className="input is-primary is-medium" 
              onChange={props.handleInputChange} 
              type="text" 
              placeholder="Choose a theme">
            </input>
          </div>
          <div className="control input-button">
            <button 
              className="button is-primary is-medium" 
              onClick={props.handleUserInput} >
              Go
            </button>
          </div>
          <div className="score-display">
            <strong>
              SCORE: {props.score} | HIGH SCORE: {props.highScore}
            </strong>
          </div>
        </div>
    )
}

export default Input;