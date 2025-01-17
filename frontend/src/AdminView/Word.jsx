
import { useState } from "react"

export default function Word({ word }) {

  const [editMode, setEditMode] = useState(false);

  async function deleteWord(id) {

    const response = await fetch(`api/words/${id}`, {
      method: "DELETE"
    })

    // const rawTags = await fetch("/api/tags");
    // const tags = await rawTags.json();
    // setTags(tags);
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

  async function applyChanges(event) {
    event.preventDefault();

    const name = event.target.name.value;

    const response = await fetch(`api/words/${word.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "fooLang": event.target.fooLang.value,
        "fooWord": event.target.fooWord.value,
        "barLang": event.target.barLang.value,
        "barWord": event.target.barWord.value
      })
    })

    setEditMode(false)
  }

  if (editMode) {
    return (
      <form className="word-box" onSubmit={applyChanges}>
        <div className="flex">
          <div className="foo word">
            <p><input type="text" name="fooLang" placeholder="Language" defaultValue={word.fooLang}></input></p>
            <p><br /></p>
            <h3><input type="text" name="fooWord" placeholder="Word" defaultValue={word.fooWord}></input></h3>
          </div>

          <div className="bar word">
            <p><input type="text" name="barLang" placeholder="Language" defaultValue={word.barLang}></input></p>
            <p><br /></p>
            <h3><input type="text" name="barWord" placeholder="Word" defaultValue={word.barWord}></input></h3>
          </div>
        </div>

        <div className="flex space-between align-center">
          {renderTags()}
        </div>

        <div className="flex justify-center">
          <button type="submit" className="wide green button absolute">Apply</button>
          <button type="button" onClick={() => setEditMode(false)} className="wide red button absolute">Cancel</button>
        </div>
      </form>
    )
  } else {
    return (
      <div className="word-box">
        <div className="flex">
          <div className="foo word">
            <p>{word.fooLang}</p>
            <h3>{word.fooWord}</h3>
          </div>

          <button type="button" onClick={() => setEditMode(true)} className="wide button absolute">Edit</button>
          <button type="button" onClick={() => deleteWord(word.id)} className="wide red button absolute">Delete</button>

          <div className="bar word">
            <p>{word.barLang}</p>
            <h3>{word.barWord}</h3>
          </div>
        </div>

        <div className="flex space-between align-center">
          {renderTags()}
        </div>
      </div>
    )
  }
}
