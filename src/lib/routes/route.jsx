import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Chats from "../pages/chats";
import Main from "../layouts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/chats",
                element: <Chats />,
            },
        ],
    },
]);
