import "./App.css";
import { HomePage } from "./components/HomePage";
import WordGame from "./components/WordGame/WordGame";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/wordgame" Component={WordGame} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
