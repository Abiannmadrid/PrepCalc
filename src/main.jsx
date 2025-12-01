import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>
);

