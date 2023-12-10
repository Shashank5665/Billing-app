import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/productsPage/main/ProductsPage";
import BillingPage from "./components/billingPage/main/BillingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/billing" element={<BillingPage />} />
      </Routes>
    </div>
  );
}

export default App;
