/* eslint-disable react-hooks/exhaustive-deps */
import { useSendLogoutMutation } from "@/redux/features/auth/authApiSlice";
import { useEffect } from "react";

const ResetToken = ({ children }) => {
    const token = localStorage.getItem("jwt");
    const [signout] = useSendLogoutMutation()

    useEffect(() => {

        const deleteToken = async () => {
            try {
                await signout();
            } catch (err) {
                console.error(err);
            }
        };

        if (token) deleteToken()

    }, []);

    return children;
};

export default ResetToken;
