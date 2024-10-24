import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Search from "./components/Search";



function App() {


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/cart" element={<Cart/>}/> 
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
