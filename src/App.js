import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupportAgentForm from "./components/SupportAgentForm";
import SupportTicketForm from "./components/SupportTicketForm";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/support-agents" element={<SupportAgentForm />}></Route>
          <Route
            path="/support-tickets"
            element={<SupportTicketForm />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
