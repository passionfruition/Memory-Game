import React, { Component } from 'react';
import './App.css';
import Card from "./components/Card/index";
import Hero from "./components/Hero/index";
import Input from "./components/Input/index";
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

  // Initial photo set theme
  componentDidMount() {
    this.searchUnsplash("minimalist");
  }

  // Uses the Unsplash API for photo set
  searchUnsplash = term => {
    const Unsplash = require('unsplash-js').default;
    const unsplash = new Unsplash({ accessKey: "b76db29ac02281a2820fd80b71b7dbee872602dc5cbf4feac6296ad24dd8608e" });
    unsplash.search.photos(term, 1, this.state.numImages, { orientation: "squarish" })
      .then(toJson)
      .then(res => {
        this.setState({ images: res.results })
      });
  }

  // Handles when user is typing input for the photo set theme
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Registers user submission for photo set theme
  handleUserInput = event => {
    event.preventDefault();
    this.searchUnsplash(this.state.search);
    this.setState({ clickedImages: [], score: 0 })
  }

  // Shuffles photo set after each user guess
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
        <Hero/>
        <progress className="progress is-primary" value={this.state.clickedImages.length} max={this.state.numImages}></progress>
        <Input search={this.state.search} handleInputChange={this.handleInputChange} handleUserInput={this.handleUserInput} score={this.state.score} highScore={this.state.highScore}/>
        <div className="card-container">
          {!this.state.images[0] ? <h1 className="subtitle">Hmm.. Try a different term</h1> : this.state.images.map(img => (<Card image={img.urls.regular} key={img.id} id={img.id} clickImage={this.clickImage} />))}
        </div>
      </div>
    );
  }
}

export default App;
