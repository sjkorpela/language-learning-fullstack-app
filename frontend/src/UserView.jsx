
// Import react router dependencies to link to other subpages
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

// Import word list item element
import Word from "./UserView/Word.jsx"
import Scoreboard from "./UserView/Scoreboard.jsx";
import CheckList from "./CheckList.jsx";

export default function UserView({ wordList, tagList }) {

  const [words, setWords] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState([]);
  const [scores, setScores] = useState([])

  useEffect(() => {
    // console.log("UserView UEW", words);
    // console.log("UserView UET", tags);
    // console.log("UserView UEF", filters);
    // console.log("UserView UES", scores);

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

  function postScore(word, correct) {
    const temp = [];

    for (let i = 0; i < scores.length; i++) {

      // If word score has been posted before, return
      if (scores[i].id == word.id) {
        return;
      }

      temp[i] = scores[i];
    }

    temp.push({
      id: word.id,
      points: (correct) ? 1 : 0,
      tags: word.tags
    })

    setScores(temp);
  }



  return (
    <div className="full-window user-view flex align-center column">

      <header className="flex space-between">
        <h1>Word Learn</h1>
        <Link to="/admin">
          <h4 className="nav-option">Manage words</h4>
        </Link>
      </header>

      <div className="flex wrap justify-center">

        <section className="side-section flex-grow">

          <div className="side-box">
            <h2><big>Score</big> <small><i>Scores filtered by tags</i></small></h2>
            <Scoreboard scores={scores} tags={tags} />
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
                    <Word word={word} postScore={postScore} />
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

