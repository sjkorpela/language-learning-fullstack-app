
import { useState } from "react"

export default function Word({ word }) {

  const [flipped, setFlipped] = useState(false);

  function flipWords() {
    setFlipped(!flipped);
  }

  if (flipped) {
    return (
      <div className="word-box">
        <div className="flex">
          <div className="foo word">
            <h3>{word.fooWord}</h3>
          </div>

          <button onClick={() => flipWords()} className="flip-button absolute"></button>

          <div className="bar word">
            <h3>{word.barWord}</h3>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="word-box">
        <div className="flex">
          <div className="foo word">
            <h3>{word.fooWord}</h3>
          </div>

          <button onClick={() => flipWords()} className="flip-button absolute"></button>

          <div className="bar word">
            <input type="text"></input>
          </div>
        </div>
      </div>
    )
  }
}
