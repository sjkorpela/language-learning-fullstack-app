
// Import react router dependencies to link to other subpages
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

// Import word list item element
import Word from "./UserView/Word"

export default function UserView({ wordList }) {

  const [words, setWords] = useState([]);

  useEffect(() => {
    console.log("UserView UE", words);

    if (words.length <= 0 && wordList != undefined) {
      setWords(wordList);
    }
  })

  return (
    <div className="full-window user-view flex horizontal-center column">
      <header className="flex space-between">
        <h1>Word Learn</h1>
        <Link to="/admin">
          <h4 className="nav-option">Manage words</h4>
        </Link>
      </header>


      <div className="word-list">
        {
          words.map((word) => {
            return (
              <div key={word.id}>
                <Word word={word} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}