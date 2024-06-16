import LoginPage from "./login-page";
import useStartup from "../custom hooks/useStartup";
import { useAppSelector } from "../custom hooks/hooks";
import { useEffect } from "react";
import { useAuth } from "../custom hooks/useAuth";
import Layout from "./layout";

export default function Routing() {
    const { rememberState } = useStartup();
    const accessToken = useAppSelector(state => state.user.accessToken);

    useEffect(() => {
        rememberState();
    }, []);

    return (
        <>
            {accessToken? <Layout /> : <LoginPage />}
        </>
    );
};