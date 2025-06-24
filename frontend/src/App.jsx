import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import SubmissionForm from "./component/SubmissionForm";
import AdminLogin from "./component/AdminLogin";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmissionForm />} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
