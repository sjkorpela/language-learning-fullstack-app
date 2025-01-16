
import { useState } from "react"

export default function Word({ word, postScore }) {

  const [flipped, setFlipped] = useState(word.flipped);
  const [correct, setCorrect] = useState(undefined);

  function flipWords() {
    setFlipped(!flipped);
    setCorrect(undefined);
  }

  function renderTags() {
    if (word.tags instanceof String || word.tags.length <= 0) {
      return (
        <p><i>Has no tags...</i></p>
      )
    } else {
      return (
        <div className="tag-pool flex justify-center fit-content">
          {
            word.tags.map((tag) => {
              return (
                <div key={tag.id} className="tag">
                  {tag.name}
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  function renderInput(correct) {
    if (correct == undefined) {
      return (
        <input type="text" name="answer" placeholder="Your answer here"></input>
      )
    } else if (correct) {
      return (
        <input type="text" name="answer" placeholder="Your answer here" className="right" disabled></input>
      )
    } else if (!correct) {
      return (
        <input type="text" name="answer" placeholder="Your answer here" className="wrong" disabled></input>
      )
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    const answer = event.target.answer.value.toLowerCase().trim();
    const rightAnswer = (flipped) ? word.fooWord.toLowerCase().trim() : word.barWord.toLowerCase().trim();

    // console.log(answer + " vs " + rightAnswer, answer == rightAnswer);

    const correct = answer == rightAnswer;

    setCorrect(correct);
    postScore(word, correct);
  }

  function renderWord(leftWord, leftLang, rightWord, rightLang) {
    return (
      <form className="word-box" onSubmit={onSubmit}>
        <div className="flex">
          <div className="foo word">
            <p>{leftLang}</p>
            <h3>{leftWord}</h3>
          </div>

          <button type="button" onClick={() => flipWords()} className="flip-button absolute"></button>

          <div className="bar word">
            <p>{rightLang}</p>
            {renderInput(correct)}
          </div>
        </div>

        <div className="flex space-between align-center">
          {renderTags()}
        </div>
      </form>
    )
  }

  if (flipped) {
    return (
      <>
        {renderWord(word.barWord, word.barLang, word.fooWord, word.fooLang)}
      </>
    )
  } else {
    return (
      <>
        {renderWord(word.fooWord, word.fooLang, word.barWord, word.barLang)}
      </>
    )
  }
}
