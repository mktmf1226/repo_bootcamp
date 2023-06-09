import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";
import Detail from "./components/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="Navbar">
      <Navbar />
    </div>
    <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/delist/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
