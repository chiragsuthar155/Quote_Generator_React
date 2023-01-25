import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    id: "",
    advice: "",
  };

  componentDidMount() {
    // console.log("Component did mount");
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { id } = response.data.slip;
        const { advice } = response.data.slip;
        this.setState({ advice: advice, id: id });
        console.log(advice);
        console.log(id);
        document
          .querySelector(".copyLogo")
          .setAttribute(
            "src",
            "https://img.icons8.com/parakeet/96/null/copy.png"
          );
        document.querySelector(".copy").style.backgroundColor = "white";
        document.querySelector(".copyLogo").style.filter = "invert(0%)";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  anime = () => {
    let speak = document.querySelector(".speak");
    let speakLogo = document.querySelector(".speakLogo");

    speakLogo.setAttribute(
      "src",
      "https://img.icons8.com/ultraviolet/80/null/medium-volume--v2.png"
    );
    speakLogo.style.filter = "invert(50%)";

    setTimeout(() => {
      setTimeout(() => {
        speak.style.backgroundColor = "white";
        speakLogo.setAttribute(
          "src",
          "https://img.icons8.com/carbon-copy/100/null/medium-volume.png"
        );
        speakLogo.style.filter = "invert(0%)";
      }, 1000);
    }, 1000);
  };

  copyClipboard = () => {
    this.copyAnime();
    let adviceText = document
      .getElementsByClassName("heading")
      .item(0).innerText;
    navigator.clipboard.writeText(adviceText).then(
      () => {
        console.log("Content copied to clipboard");
        /* Resolved - text copied to clipboard successfully */
      },
      () => {
        console.error("Failed to copy");
        /* Rejected - text failed to copy to the clipboard */
      }
    );
  };

  textSpeak = () => {
    this.anime();
    const synth = window.speechSynthesis;
    let ourText = document.getElementsByClassName("heading").item(0).innerText;
    const utterThis = new SpeechSynthesisUtterance(ourText);
    const voices = synth.getVoices();

    utterThis.voice = voices[6];

    synth.speak(utterThis);

    // "speechSynthesis" in window
    //   ? console.log("Web Speech API supported!")
    //   : console.log("Web Speech API not supported :-(");
  };

  copyAnime = () => {
    let copy = document.querySelector(".copy");
    let copyLogo = document.querySelector(".copyLogo");
    copyLogo.setAttribute("src", "https://img.icons8.com/ios/50/null/pass.png");
    copyLogo.style.height = "29px";
    copy.style.backgroundColor = "#6be3a2";
  };

  shareTwitter = () => {
    const navUrl =
      "https://twitter.com/intent/tweet?text=" +
      document.getElementsByClassName("heading").item(0).innerText;
    window.open(navUrl, "_blank");
  };

  render() {
    const { advice } = this.state;
    const { id } = this.state;
    return (
      <div className="app">
        <div className="card">
          <p className="advice_id">Advice #{id}</p>
          <h1 className="heading">
            <img
              className="left-quote"
              src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/null/external-inverted-quotation-mark-used-to-highlight-dialogues-text-shadow-tal-revivo.png"
            />
            {advice}
            <img
              className="right-quote"
              src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/null/external-closing-inverted-quotation-bracket-mark-used-to-highlight-dialogues-text-shadow-tal-revivo.png"
            />
          </h1>
          <button className="button" onClick={this.fetchAdvice}>
            <span>New Quote</span>
          </button>
          <div className="share-icon">
            <div className="round_icon speak" onClick={this.textSpeak}>
              <img
                className="speakLogo"
                src="https://img.icons8.com/carbon-copy/100/null/medium-volume.png"
              />
            </div>
            <div className="round_icon copy" onClick={this.copyClipboard}>
              <img
                className="copyLogo"
                src="https://img.icons8.com/parakeet/96/null/copy.png"
              />
            </div>
            <div className="round_icon share" onClick={this.shareTwitter}>
              <img src="https://img.icons8.com/office/80/null/twitter.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
