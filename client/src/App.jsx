import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import TripPage from "./pages/TripPage";
import TravelPage from "./pages/TravelPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create-trip" element={<TripPage />} />
        <Route path="/travel" element={<TravelPage />} />
      </Routes>
    </Router> 
  );
}

export default App;
