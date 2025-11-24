import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import AIAssistantPage from "./pages/AIAssistantPage";

const App = () => {
  return (
    <BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/results" element={<Results />} />
      <Route path="/" element={<ProtectedRoute><Index/></ProtectedRoute>} />
      <Route path="/ai" element={<AIAssistantPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
</BrowserRouter>
  );
};

export default App;
