import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Spinner from "../../components/Spinner";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "../../redux/auth/authApiSlice";
import { selectToken } from "../../redux/auth/authSlice";

const PersistAuth = () => {
  const [persist] = usePersist();
  const token = useSelector(selectToken);
  const effectRef = useRef(false);
  const [success, setSuccess] = useState(false);
  const [refresh, { isUninitialized, isSuccess, isLoading, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRef.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        // console.log("Verifying refresh token");
        try {
          await refresh();
          setSuccess(true);
        } catch (error) {
          console.log(error.message);
        }
      };
      if (!token && persist) {
        verifyRefreshToken();
      }
    }
    return () => {
      effectRef.current = true;
    };
    //eslint-disable-next-line
  }, []);

  let content;

  if (!persist) {
    // console.log("No persistence");
    content = <Outlet />;
  } else if (isLoading) {
    console.log("Loading content");
    content = <Spinner />;
  } else if (isError) {
    console.log("Error loading content");
    content = (
      <p>
        {error?.data?.message}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && success) {
    // console.log("Success loading content");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // console.log("Token is not initialized yet");
    // console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistAuth;
