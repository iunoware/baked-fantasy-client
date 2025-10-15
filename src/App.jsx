import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "../src/pages/Home.jsx";
import About from "../src/pages/About.jsx";
import Categories from "./pages/Category/ProductsCategory.jsx";
import EssCategories from "./pages/Category/EssCategory.jsx";
import Courses from "../src/pages/Courses.jsx";
import Contact from "../src/pages/Contact.jsx";
import Navbar from "./components/NewNav.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetail from "./pages/ProductDetails/ProductDetail.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import OnlineCourse from "./pages/OnlineCourse.jsx";
import OfflineCourse from "./pages/OfflineCourse.jsx";
import SpecificCategory from "./pages/specifiCategories/specificCat.jsx";
import Login from "./components/Login.jsx";
import OnlineCourseDetails from "./pages/OnlineCourseDetails.jsx";
import Cart from "./pages/Cart.jsx";
import EssSpeciCategory from "./pages/specifiCategories/EssentialCat.jsx";
import EssDetailPage from "./pages/ProductDetails/EssentialDetail.jsx";

function App() {
  return (
    <>
      <Router>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* for category page */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/ess-categories" element={<EssCategories />} />
          {/* for specific category */}
          <Route
            path="/products/:categoryName"
            element={<SpecificCategory />}
          />
          {/* for specific essential category */}
          <Route
            path="/essentials/:categoryName"
            element={<EssSpeciCategory />}
          />
          {/* for products details */}
          <Route
            path="/products/:categoryName/:productId"
            element={<ProductDetail />}
          />
          <Route
            path="/essentials/:categoryName/:productId"
            element={<EssDetailPage />}
          />
          {/* <Route path="/products/cake/cake-1" element={<ProductDetail />} /> */}

          {/* for courses */}
          <Route path="/courses" element={<Courses />} />
          {/* for all online courses */}
          <Route path="/courses/online-course" element={<OnlineCourse />} />
          {/* for online course video */}
          <Route
            path="/course/my-learning/:courseId"
            element={<OnlineCourseDetails />}
          />
          <Route path="/courses/offline-course" element={<OfflineCourse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          {/* my learning courses */}
          <Route path="/courses/my-learning/" element={<MyLearning />} />

          {/* payment page for courses */}
          <Route
            path="/courses/course-payment-page/:courseId"
            element={<CoursePaymentPage />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
