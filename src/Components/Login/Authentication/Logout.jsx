import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "../../../Common/components/withRouter";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.removeItem("authUser");
    history("/login");
  }, [dispatch, history]);

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
