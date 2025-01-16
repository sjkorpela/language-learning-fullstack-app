
// Import react router dependencies to link to other subpages
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

// Import word list item element
import Word from "./AdminView/Word.jsx"
import CheckList from "./CheckList.jsx";

export default function AdminView({ wordList, tagList }) {

  const [words, setWords] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // console.log("AdminView UEW", words);
    // console.log("AdminView UET", tags);
    // console.log("AdminView UEF", filters);

    setLists();
  })

  async function setLists() {
    if (tags.length <= 0 && tagList != undefined) {
      setTags(tagList);
    }

    if (words.length <= 0 && wordList != undefined) {
      setWords(wordList);
    }
  }


  function updateFilters(event) {
    event.preventDefault();

    const filters = [];

    tagList.forEach(tag => {
      if (event.target[tag.name].checked) {
        filters.push(tag);
      }
    });

    setFilters(filters);
  }

  function fitsFilter(filters, tags) {
    console.log("checking if filtered");

    // Default value is visible, becomes invisible if a filter is missed
    let visible = true;

    for (let filter of filters) {
      let found = false;

      for (let tag of tags) {
        if (filter.id == tag.id) {
          console.log("found filter " + filter.id);
          found = true;
          break;
        }
      }

      if (!found) {
        console.log("did not find filter " + filter.id);
        visible = false;
      }
    }

    return visible;
  }

  async function postTag(event) {
    event.preventDefault();

    const name = event.target.name.value;

    const response = await fetch("api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "name": name
      })
    })

    console.log(response);
    console.log("fetching tags");

    const rawTags = await fetch("/api/tags");
    const tags = await rawTags.json();
    setTags(tags);
  }

  async function deleteTag(id) {

    console.log("delete " + id);

    const response = await fetch(`api/tags/${id}`, {
      method: "DELETE"
    })

    const rawTags = await fetch("/api/tags");
    const tags = await rawTags.json();
    setTags(tags);
  }

  return (
    <div className="full-window admin-view flex align-center column">

      <header className="flex space-between">
        <h1>Word Learn</h1>
        <Link to="/learn">
          <h4 className="nav-option">Back to learning</h4>
        </Link>
      </header>

      <div className="flex wrap justify-center">

        <section className="side-section flex-grow">

          <div className="side-box">
            <h2><big>Tags</big> <small><i>Create and delete tags</i></small></h2>
            <form onSubmit={postTag}>
              <input type="text" id="name" name="name" placeholder="Add new tag" required></input>
              <input type="submit" className="button green" value="Add"></input>
            </form>
            <div className="tag-pool flex justify-center">
                {
                  tags.map((tag) => {
                    return (
                      <div key={tag.id} className="tag flex">
                        {tag.name}
                        <button onClick={() => deleteTag(tag.id)} className="button red">X</button>
                      </div>
                    )
                  })
                }
              </div>
          </div>

          <div className="side-box">
            <h2><big>Filter</big> <small><i>Filter words by tags</i></small></h2>
            <CheckList options={tags} callback={updateFilters} />
          </div>
        </section>

        <section className="word-section">
          <div className="word-list">
            {
              words.map((word) => {
                if (filters.length > 0 && word.tags instanceof Array) {
                  if (!fitsFilter(filters, word.tags)) {
                    return;
                  }
                }
                return (
                  <div key={word.id}>
                    <Word word={word} />
                  </div>
                )
              })
            }
          </div>
        </section>

      </div>

    </div>
  )
}

