
import { useState } from "react"

export default function Word({ word, tagList, patchedWord, deletedWord }) {

  const [editMode, setEditMode] = useState(false);
  const [editTags, setEditTags] = useState(word.tags || []);

  async function deleteWord(id) {

    const response = await fetch(`api/words/${id}`, {
      method: "DELETE"
    })

    deletedWord(id);
  }

  async function applyChanges(event) {
    event.preventDefault();

    // Build tag string
    let tagString = "";

    for (let tag of editTags) {

      // Add commas after first tag
      tagString += (tagString.length > 0) ? "," : "";

      // Add tag
      tagString += tag.id;
    }

    const response = await fetch(`api/words/${word.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "fooLang": event.target.fooLang.value,
        "fooWord": event.target.fooWord.value,
        "barLang": event.target.barLang.value,
        "barWord": event.target.barWord.value,
        "tags": tagString
      })
    })

    setEditMode(false);
    patchedWord({
      fooLang: event.target.fooLang.value,
      fooWord: event.target.fooWord.value,
      barLang: event.target.barLang.value,
      barWord: event.target.barWord.value,
      id: word.id,
      tags: editTags
    })
  }

  function addEditTag(event) {

    event.preventDefault();
    const id = event.target.tag.value;

    for (let tag of editTags) {
      if (tag.id == id) {
        return;
      }
    }

    for (let tag of tagList) {
      if (tag.id == id) {
        setEditTags([...editTags, tag]);
        return;
      }
    }
  }

  function removeEditTag(id) {

    const newTags = [];

    for (let tag of editTags) {
      if (tag.id != id) {
        newTags.push(tag);
      }
    }

    setEditTags(newTags);
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

  if (editMode) {
    return (
      <div className="word-box">
        <form className="flex" id={"word-form-" + word.id} onSubmit={applyChanges}>
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
        </form>

        <div className="flex column align-center">

          <form className="flex" onSubmit={addEditTag}>
            <select name="tag" className="select">
              <option value={0}>-- Add a tag --</option>
              {
                tagList.map((tag) => {
                  return <option value={tag.id} key={tag.id}>{tag.name}</option>
                })
              }
            </select>
            <input type="submit" value="Add" className=" green button"/>
          </form>

          <div className="tag-pool flex justify-center">
            {
              editTags.map((tag) => {
                return (
                  <div key={tag.id} className="tag flex">
                    {tag.name}
                    <button onClick={() => removeEditTag(tag.id)} className="button red">X</button>
                  </div>
                )
              })
            }
          </div>

        </div>

        <div className="flex justify-center">
          <button type="submit" form={"word-form-" + word.id} className="wide green button absolute">Apply</button>
          <button type="button" onClick={() => setEditMode(false)} className="wide red button absolute">Cancel</button>
        </div>
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
