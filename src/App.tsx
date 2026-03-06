import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Mission from "./pages/Mission";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/mission/:id" element={<Mission />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;