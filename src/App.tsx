import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Main from "./pages/operational/main/Main";
import Login from "src/pages/functional/login/Login";
import RequireAuth from "./components/navigation/RequireAuth";
import PageTree from "./pages/operational/pagetree/PageTree";

const router = createBrowserRouter(
  [
    {
      path: "/main",
      element: (
        <RequireAuth>
          <Main />
        </RequireAuth>
      ),
    },
    {
      path: "/",
      element: <Navigate to="/main" replace />,
    },
    {
      path: "/tree",
      element: (
        <RequireAuth>
          <PageTree />
        </RequireAuth>
      ),
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
