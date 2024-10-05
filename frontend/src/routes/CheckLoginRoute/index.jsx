import { Navigate } from "react-router-dom";

const CheckLoginRoute = ({ children }) => {
    const token = localStorage.getItem("jwt")

    return token ? children : <Navigate to={"/login"} />;
};

export default CheckLoginRoute;
