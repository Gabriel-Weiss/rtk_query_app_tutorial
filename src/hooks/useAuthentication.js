import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/auth/authSlice";

const useAuthentication = () => {
  const token = useSelector(selectToken);
  // console.log("useAuthentication hook " + token);
  let isAdmin = false;
  let isVisitor = false;

  if (token) {
    // console.log(`Deconding token: ${token}`);
    const { username } = jwtDecode(token);
    // console.log(`Token decoded: ${username}`);
    isAdmin = username === "admin";
    isVisitor = username === "visitor";
    return { username, isAdmin, isVisitor };
  }

  return { username: "", isAdmin, isVisitor };
};

export default useAuthentication;
