import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes/route";

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
