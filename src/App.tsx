import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import GdiMain from "./pages/containers/gdiMain/GdiMain";
import Login from "src/pages/content/login/Login";
import RequireAuth from "./components/navigation/RequireAuth";
import Individual from "./pages/containers/individual/Individual";
import Currency from "./pages/content/currency/Currency";
import Community from "./pages/containers/community/Community";
import Profile from "./pages/content/profile/Profile";
import Communities from "./pages/content/Commuities/Communities"
import Issues from "./pages/content/issues/Issues";
import Favorites from "./pages/content/favorites/Favorites";
import QrScan from "./pages/content/qrscan/QrScan";
import ShareContract from "./pages/content/share/ShareContract";

const router = createBrowserRouter(
  [
    {
      path: "/main",
      element: (
        <RequireAuth>
          <GdiMain />
        </RequireAuth>
      ),
      children: [
        { index: true, element: <Navigate to="profile" replace /> },
        { path: "profile", element: <Profile /> },
        { path: "issues", element: <Issues /> },
        { path: "favorites", element: <Favorites /> },
        { path: "find", element: <QrScan /> },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/main" replace />,
    },
    {
      path: "/me",
      element: (
        <RequireAuth>
          <Individual />
        </RequireAuth>
      ),
      children: [
        { index: true, element: <Navigate to="profile" replace /> },
        { path: "profile", element: <Profile /> },
        { path: "communities", element: <Communities /> },
        { path: "find", element: <QrScan /> },
      ],
    },
    {
      path: "/community/:id",
      element: (
        <RequireAuth>
          <Community />
        </RequireAuth>
      ),
      children: [
        { index: true, element: <Navigate to="issues" replace /> }, // Redirect to "issues" by default
        { path: "issues", element: <Issues /> },
        { path: "members", element: <div>members</div> },
        { path: "projects", element: <div>projects</div> },
        { path: "decisions", element: <div>decisions</div> },
        { path: "currency", element: <Currency /> },
        { path: "share", element: <ShareContract /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
  {
    basename: "/decide", // Set basename for the router
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
