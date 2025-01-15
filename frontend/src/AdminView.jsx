
// Import react router dependencies to link to other subpages
import { Link } from "react-router-dom";

export default function AdminView() {

  return (
    <>
      <p>admin nopee testi1243</p>
      <Link to="/learn">
        <h4 className="nav-option">back</h4>
      </Link>
    </>
  )
}