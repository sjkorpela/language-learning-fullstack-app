
// Import react router dependencies to link to other subpages
import { Link } from "react-router-dom";

// Import word list item element
import Word from "./UserView/Word"

export default function UserView() {

  return (
    <div className="full-window user-view flex horizontal-center column">
      <header className="flex space-between">
        <h1>Word Learn</h1>
        <Link to="/admin">
          <h4 className="nav-option">Manage words</h4>
        </Link>
      </header>


      <div>
        <Word />
        <Word />
        <Word />
      </div>
    </div>
  )
}