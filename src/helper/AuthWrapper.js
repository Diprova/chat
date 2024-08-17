import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (!auth || auth !== "true") {
      navigate("/login", { replace: true });
    }
  }, []);
  return <>{children}</>;
};
