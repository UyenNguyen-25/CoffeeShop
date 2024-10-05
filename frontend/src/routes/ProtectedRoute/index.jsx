import { useRefreshMutation } from "@/redux/features/auth/authApiSlice";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwt")
  const effectRan = useRef(false);
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh();
        } catch (err) {
          console.log(err);

        }
      };

      if (token) verifyRefreshToken();
    }
    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  return children;
};

export default ProtectedRoute;
