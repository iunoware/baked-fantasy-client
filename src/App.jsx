import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import About from "../src/pages/About.jsx";
import Products from "../src/pages/Products-Category.jsx";
import Courses from "../src/pages/Courses.jsx";
import Contact from "../src/pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Cake from "../src/pages/products/Cake.jsx";
import ProductDetail from "../src/pages/ProductDetail.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/cake" element={<Cake />} />
          <Route path="/products/cake/cake-1" element={<ProductDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
