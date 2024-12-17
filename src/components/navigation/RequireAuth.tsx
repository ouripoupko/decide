import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { startAgent } from "src/reducers/AgentSlice";
import { listenAgent } from "src/server/agent";
import { AppDispatch, RootState } from "src/Store";
import { IInvite } from "src/types/interfaces";
import Loader from "../ui/loader/Loader";

type RequireAuthProps = {
  children?: React.ReactNode; // Optional children of type React.ReactNode
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasStarted = useRef(false);

  const dispatch: AppDispatch = useDispatch();

  const listener = (_data: string) => {
    // console.log('SSE data:', data)
  };
  const { contract, serverError } = useSelector((state: RootState) => {
    return state.agent;
  });

  useEffect(() => {
    let server = localStorage.getItem("server");
    let agent = localStorage.getItem("agent");

    if (!hasStarted.current) {
      hasStarted.current = true;
      if (server && agent) {
        dispatch(startAgent({ agent, server } as IInvite));

        return listenAgent(server, agent, listener);
      } else {
        sessionStorage.setItem("redirectAfterLogin", location.pathname);
        navigate("/login", { replace: true });
      }
    }
  }, [dispatch]);

  if (serverError)
    return <div>Oops! Server Error. I am deeply sorry about that.</div>;
  if (!contract) return <Loader></Loader>;

  return children || <Outlet />;
};

export default RequireAuth;
