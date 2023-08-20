import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import { alertActions } from "../../store/alert-slice";
import { useAppDispatch } from "../../utils/hooks";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const abortController = new AbortController();
    logout(dispatch, abortController.signal)
      .then()
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(
          alertActions.changeAlert({
            type: "success",
            message: "Successfully logged out",
          })
        );
        return navigate("/", { replace: true });
      });
    return () => abortController.abort();
  }, [dispatch, navigate]);
  return <></>;
};

export default Logout;
