
import { useState } from "react"

export default function WordEditor({ tagList, postedWord }) {

  const [tags, setTags] = useState([]);

  function addTag(event) {
    event.preventDefault();
    const id = event.target.tag.value;

    for (let tag of tags) {
      if (tag.id == id) {
        return;
      }
    }

    for (let tag of tagList) {
      if (tag.id == id) {
        setTags([...tags, tag]);
        return;
      }
    }
  }

  function removeTag(id) {

    const newTags = [];

    for (let tag of tags) {
      if (tag.id != id) {
        newTags.push(tag);
      }
    }

    setTags(newTags);
  }

  async function postWord(event) {
    event.preventDefault();

    // Build tag string
    let tagString = "";

    for (let tag of tags) {

      // Add commas after first tag
      tagString += (tagString.length > 0) ? "," : "";

      // Add tag
      tagString += tag.id;
    }

    // Parse params and ship it, reset form is successful
    try {
      const response = await fetch("api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "fooLang": event.target.fooLang.value,
          "fooWord": event.target.fooWord.value,
          "barLang": event.target.barLang.value,
          "barWord": event.target.barWord.value,
          "tags": tagString
        })
      })

      postedWord({
        "fooLang": event.target.fooLang.value,
        "fooWord": event.target.fooWord.value,
        "barLang": event.target.barLang.value,
        "barWord": event.target.barWord.value,
        "tags": tags
      })

      document.getElementById("word-form").reset();
      setTags([]);
    } catch (e) {
      alert("Something went wrong whilst trying to post new word.");
    }
  }

  return (
    <div className="word-box">
      <form id="word-form" className="flex" onSubmit={postWord}>
        <div className="foo word">
          <input type="text" name="fooLang" placeholder="Language"></input>
          <p><br /></p>
          <input type="text" name="fooWord" placeholder="Word"></input>
        </div>

        <div className="bar word">
          <input type="text" name="barLang" placeholder="Language"></input>
          <p><br /></p>
          <input type="text" name="barWord" placeholder="Word"></input>
        </div>
      </form>

      <div className="flex column align-center">

        <form className="flex" onSubmit={addTag}>
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
            tags.map((tag) => {
              return (
                <div key={tag.id} className="tag flex">
                  {tag.name}
                  <button onClick={() => removeTag(tag.id)} className="button red">X</button>
                </div>
              )
            })
          }
        </div>
      </div>
      <br />
      <div className="flex justify-center">
        <button type="submit" form="word-form" className="wide green button absolute">Create word</button>
      </div>
    </div>
  )
}