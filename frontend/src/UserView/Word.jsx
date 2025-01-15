
import { useState } from "react"

export default function Word({ word }) {

  const [flipped, setFlipped] = useState(false);

  function flipWords() {
    setFlipped(!flipped);
  }

  function renderTags() {
    if (word.tags instanceof String || word.tags.length <= 0) {
      return (
        <p><i>Has no tags...</i></p>
      )
    } else {

      const tags = word.tags.map((tag) => {
        return (
          <p key={tag.id}>{tag.name}</p>
        )
      })
      return (
        tags
      )
    }
  }

  if (flipped) {
    return (
      <div className="word-box">
        <div className="flex">
          <div className="foo word">
            <p>{word.barLang}</p>
            <h3>{word.barWord}</h3>
          </div>

          <button onClick={() => flipWords()} className="flip-button absolute"></button>

          <div className="bar word">
            <p>{word.fooLang}</p>
            <input type="text"></input>
          </div>
        </div>

        {renderTags()}
      </div>
    )
  } else {
    return (
      <div className="word-box">
        <div className="flex">
          <div className="foo word">
            <p>{word.fooLang}</p>
            <h3>{word.fooWord}</h3>
          </div>

          <button onClick={() => flipWords()} className="flip-button absolute"></button>

          <div className="bar word">
            <p>{word.barLang}</p>
            <input type="text" placeholder="Your answer here"></input>
          </div>
        </div>

        {renderTags()}
      </div>
    )
  }
}
