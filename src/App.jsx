import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VendingMachine from "./components/VendingMachine";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import GlobalStateProvider from "./context/GlobalStateProvider";

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<VendingMachine />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
