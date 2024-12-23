import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getContacts, readProfile, startAgent } from "src/reducers/GlokiSlice";
import { listenAgent } from "src/server/agent";
import { AppDispatch, RootState } from "src/Store";
import { IInvite } from "src/types/interfaces";
import Loader from "../ui/loader/Loader";
import { CompWithChildrenProps } from "src/types/types";
import { serverlistener } from "src/reducers/serverListener";

const RequireAuth: React.FC<CompWithChildrenProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();

  const { contract, profile, serverError } = useSelector((state: RootState) => {
    return state.gloki;
  });

  // initialize agent from local storage, or navigate to login
  useEffect(() => {
    let server = localStorage.getItem("server");
    let agent = localStorage.getItem("agent");

    if (server && agent) {
      dispatch(startAgent({ agent, server } as IInvite));

      return listenAgent(server, agent, serverlistener);
    } else {
      sessionStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/login", { replace: true });
    }
  }, [dispatch]);

  // read agent profile after it was initialized
  useEffect(() => {
    if(contract && !profile) {
      dispatch(readProfile());
      dispatch(getContacts());
    }
  }, [dispatch, contract]);

  if (serverError)
    return <div>Oops! Server Error. I am deeply sorry about that.</div>;
  if (!contract) return <Loader></Loader>;

  return children || <Outlet />;
};

export default RequireAuth;
