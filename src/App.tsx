import { useEffect } from "react";
import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Main from "./pages/main/Main";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/Store";
import { listenAgent } from "src/server/agent";
import Loader from "src/components/ui/loader/Loader";
import { startAgent } from "src/reducers/AgentSlice";
import { IInvite } from "src/types/interfaces";
import Login from "src/pages/login/Login";

const router = createBrowserRouter(
  [
    {
      path: "/main",
      element: <Main />,
    },
    {
      path: "/",
      element: <Navigate to="/main" replace />,
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
  const contract = useSelector((state: RootState) => {
    return state.agent.contract;
  });
  const dispatch: AppDispatch = useDispatch();

  const listener = (_data: string) => {
    // console.log('SSE data:', data)
  };

  useEffect(() => {
    let server = localStorage.getItem("server");
    let agent = localStorage.getItem("agent");

    if(server && agent) {
      dispatch(startAgent({ agent, server } as IInvite));

      return listenAgent(server, agent, listener);
    } else if (!location.pathname.includes('login')) {
      location.href = "/decide/login";
    }
  }, [dispatch]);

  if (!contract && !location.pathname.includes('login')) return <Loader></Loader>;

  return <RouterProvider router={router} />;
}

export default App;
