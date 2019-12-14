import React, { Component } from 'react';
import './App.css';
import Card from "./components/Card/index";
import fetch from 'node-fetch';
import { toJson } from 'unsplash-js';
import * as bulmaToast from "bulma-toast";
global.fetch = fetch;

class App extends Component {
  state = {
    search: "",
    images: [],
    score: 0,
    highScore: 0,
    clickedImages: [],
    numImages: 12
  }

  componentDidMount() {
    this.searchUnsplash("minimalist");
  }

  searchUnsplash = term => {
    const Unsplash = require('unsplash-js').default;
    const unsplash = new Unsplash({ accessKey: "b76db29ac02281a2820fd80b71b7dbee872602dc5cbf4feac6296ad24dd8608e" });
    unsplash.search.photos(term, 1, this.state.numImages, { orientation: "squarish" })
      .then(toJson)
      .then(res => {
        this.setState({ images: res.results })
      });
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleUserInput = event => {
    event.preventDefault();
    this.searchUnsplash(this.state.search);
  }

  shuffleImages = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.setState({ images: array });
  }

  clickImage = id => {
    // If user wrong
    if (this.state.clickedImages.includes(id)) {
      bulmaToast.toast({ message: "Incorrect!", type: "is-danger", position: "bottom-center" });
      this.setState({ clickedImages: [], score: 0 })
      this.shuffleImages(this.state.images);
      // If user correct
    } else {
      bulmaToast.toast({ message: "Correct!", type: "is-success", position: "bottom-center" });
      let newClickedImages = this.state.clickedImages;
      newClickedImages.push(id);
      this.setState({ clickedImages: newClickedImages })
      this.setState((state) => {
        return { score: state.score + 1 };
      }, 
      // Callback for if high score
      () => {
        if (this.state.score > this.state.highScore) {
          this.setState({ highScore: this.state.score });
        }
      }
      );
      if (this.state.clickedImages.length === this.state.numImages) {
        alert("You win");
        this.setState({ clickedImages: [], score: 0 })
      }
      this.shuffleImages(this.state.images);

    }
  }

  render() {
    return (
      <div className="wrapper">
        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1">Memory Game</h1>
              <h2 className="subtitle">Click on an image to earn points, but don't click on any more than once.</h2>
            </div>
          </div>
        </section>
        <progress className="progress is-primary" value={this.state.clickedImages.length} max={this.state.numImages}></progress>
        <div className="field has-addons">
          <div className="control text-input">
            <input value={this.state.search} name="search" className="input is-primary is-medium" onChange={this.handleInputChange} type="text" placeholder="Choose a theme"></input>
          </div>
          <div className="control input-button">
            <button className="button is-primary is-medium" onClick={this.handleUserInput} >Go</button>
          </div>
          <div className="score-display">
            <strong>
              SCORE: {this.state.score} | HIGH SCORE: {this.state.highScore}
            </strong>
          </div>
        </div>
        
        <div className="card-container">
          {!this.state.images[0] ? <h1 className="subtitle">Hmm.. Try a different term</h1> : this.state.images.map(img => (<Card image={img.urls.regular} key={img.id} id={img.id} clickImage={this.clickImage} />))}
        </div>
      </div>
    );
  }
}

export default App;
