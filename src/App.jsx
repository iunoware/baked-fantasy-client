import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import About from "../src/pages/About.jsx";
import Categories from "./pages/ProductsCategory.jsx";
import Courses from "../src/pages/Courses.jsx";
import Contact from "../src/pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetail from "../src/pages/ProductDetail.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import OnlineCourse from "./pages/OnlineCourse.jsx";
import OfflineCourse from "./pages/OfflineCourse.jsx";
import SpecificCategory from "./pages/products/specificCat.jsx";
import Login from "./components/Login.jsx";
import OnlineCourseDetails from "./pages/OnlineCourseDetails.jsx";
import Cart from "./components/cart.jsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* for category page */}
          <Route path="/categories" element={<Categories />} />
          {/* for specific category */}
          <Route
            path="/products/:categoryName"
            element={<SpecificCategory />}
          />
          {/* for products details */}
          <Route
            path="/products/:categoryName/:productId"
            element={<ProductDetail />}
          />
          {/* <Route path="/products/cake/cake-1" element={<ProductDetail />} /> */}

          {/* for courses */}
          <Route path="/courses" element={<Courses />} />
          {/* for all online courses */}
          <Route path="/courses/online-course" element={<OnlineCourse />} />
          {/* for online course details */}
          <Route
            path="/course/online-course/:courseId"
            element={<OnlineCourseDetails />}
          />
          <Route path="/courses/offline-course" element={<OfflineCourse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
