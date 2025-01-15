// const URL = `${import.meta.env.API_URL}`

// Import react router dependencies to create url subpages
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import react router dependencies to render subpages, and to default to learn view
import { Outlet, Navigate } from "react-router-dom";

import { useState, useEffect } from "react";

// Import admin, and user view for subpages
import AdminView from "./AdminView";
import UserView from "./UserView";

/**
 * Base layer of the app. Creates site subpage router and outlet for them to render to.
 *
 * Defaults to learn view and leaves navigation between views to the views.
 *
 * @returns RouterProvider element, which contains outlet for subpages to render in
 */
export default function App() {

  const [wordList, setWordList] = useState();
  const [tagList, setTagList] = useState();

  useEffect(() => {
    console.log("App UE", "Fetching words and tags");
    fetchAll();
  }, [])

  async function fetchAll() {
    const rawTags = await fetch("/api/tags");
    const tags = await rawTags.json();
    setTagList(tags);

    const rawWords = await fetch("/api/words");
    const words = await rawWords.json();
    setWordList(words);

    console.log("words", words);
    console.log("tags", tags);
  }

  // Create router structure
  const router = createBrowserRouter([
    {
      // Root element, handles default view and rendering outlet
      path: "/",
      element:
        <div className="full-window">
          <Navigate to="/learn" />
          <Outlet />
        </div>,
      // Error element, appears when routing goes wrong, sends user to default view
      errorElement: <Navigate to="/learn" />,
      children: [
        // Learn view aka user view, to learn words, default view of the app
        {
          path: "/learn",
          element: <UserView wordList={wordList} tagList={tagList} />
        },
        // Admin view, to manage words
        {
          path: "/admin",
          element: <AdminView />
        }
      ]
    }
  ])

  return (
    <div className="full-window">
      <RouterProvider router={router} />
    </div>
  )
}
