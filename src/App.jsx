import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import AIAssistantPage from "./pages/AIAssistantPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/results" element={<Results />} />
        <Route path="/ai" element={<AIAssistantPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
