import { createBrowserRouter } from "react-router-dom";
import Lobby from "./pages/Lobby.tsx";
import CodeBlock from "./pages/CodeBlock.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Lobby />,
    },
    {
        path: "/code-block/:title",
        element: <CodeBlock />,
    }
]);

export default router;