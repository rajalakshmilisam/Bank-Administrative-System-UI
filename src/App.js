import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllBanks from "./banks/AllBanks";
import AddBank from "./banks/AddBank";
import ViewBank from "./banks/ViewBank";
import UpdateBank from "./banks/UpdateBank";
import LoginForm from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import User from "./User"
import Header from "./Header";
import Footer from "./Footer";
import FilterByBankName from "./banks/FilterByBankName";

function App() {
  return (
    <div className="App">
      <div>
        <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="userhome" element={<User/>}/>
            <Route path="allbanks" element={<AllBanks />} />
            <Route path="filteredbank" element={<FilterByBankName/>}/>
            <Route path="addbank" element={<AddBank />} />
            <Route path="viewbank/:id" element={<ViewBank />} />
            <Route path="updatebank/:id" element={<UpdateBank />} />
          </Route>
        </Routes>
      </Router>
      <Footer/>
      </div>
    </div>
  );
}

export default App;
