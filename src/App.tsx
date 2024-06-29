import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lobby from "./pages/Lobby/lobby.tsx";
import CodeBlock from "./pages/CodeBlock/code-block.tsx";


function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Lobby/>}/>
                <Route path="/code-block/:title" element={<CodeBlock/>}/>
            </Routes>
        </Router>
    )
}

export default App
