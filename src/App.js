import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/AddCreator"
import Edit from "./pages/EditCreator"
import View from "./pages/ViewCreator"


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>CreatorVerse</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Add Creator</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
