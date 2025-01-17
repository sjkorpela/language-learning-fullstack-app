
// Import react router dependencies to link to other subpages
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import { formatTags } from "./Funcs.jsx";

// Import word list item element
import Word from "./AdminView/Word.jsx"
import CheckList from "./CheckList.jsx";
import TagManager from "./AdminView/TagManager.jsx";
import WordEditor from "./AdminView/WordEditor.jsx";

export default function AdminView({}) {

  const [words, setWords] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState([]);

  // useEffect(() => {
  //   console.log("AdminView UEW", words);
  //   console.log("AdminView UET", tags);
  //   console.log("AdminView UEF", filters);
  // })

  useEffect(() => {
    fetchAll();
  }, [])

  async function fetchAll() {
    const rawTags = await fetch("/api/tags");
    const tags1 = await rawTags.json();
    setTags(tags1);

    const rawWords = await fetch("/api/words");
    const words1 = await rawWords.json();
    await words1.forEach(async (word) => {
      word.tags = await formatTags(word.tags, tags);
    })
    setWords(words1);
  }


  function updateFilters(event) {
    event.preventDefault();

    const filters = [];

    tags.forEach(tag => {
      if (event.target[tag.name].checked) {
        filters.push(tag);
      }
    });

    setFilters(filters);
  }

  function fitsFilter(filters, tags) {

    // Default value is visible, becomes invisible if a filter is missed
    let visible = true;

    for (let filter of filters) {
      let found = false;

      for (let tag of tags) {
        if (filter.id == tag.id) {
          found = true;
          break;
        }
      }

      if (!found) {
        visible = false;
      }
    }

    return visible;
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
            <TagManager tags={tags} />
          </div>

          <div className="side-box">
            <h2><big>Filter</big> <small><i>Filter words by tags</i></small></h2>
            <CheckList options={tags} callback={updateFilters} />
          </div>
        </section>

        <section className="word-section">

          <div className="side-box">
            <h2><big>Create</big> <small><i>Create new words</i></small></h2>
            <WordEditor tagList={tags}/>
          </div>


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

