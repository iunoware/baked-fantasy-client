import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import EnquiryBtn from "./components/EnquiryBtn.jsx";
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
// import EssDetailPage from "./pages/ProductDetails/EssentialDetail.jsx";
import MyLearning from "./pages/MyLearning.jsx";
import CoursePaymentPage from "./pages/CoursePaymentPage.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/adminPanel/Dashboard.jsx";
import CourseAdmin from "./pages/adminPanel/CourseAdmin.jsx";
import Sidebar from "./components/Sidebar.jsx";
import EssentialsAdmin from "./pages/adminPanel/essentials/EssentialsAdmin.jsx";
import CakesAdmin from "./pages/adminPanel/cakes/CakesAdmin.jsx";
import OrdersAdmin from "./pages/adminPanel/OrdersAdmin.jsx";
import BannerAdmin from "./pages/adminPanel/BannerAdmin.jsx";
import IndividualCakesAdmin from "./pages/adminPanel/cakes/IndividualCakesAdmin.jsx";
import SettingsAdmin from "./pages/adminPanel/SettingsAdmin.jsx";
import AdminLogin from "./components/adminPanel/AdminLogin.jsx";
import IndividualEssentialAdmin from "./pages/adminPanel/essentials/IndividualEssentialsAdmin.jsx";
import EssentialDetailsPage from "./pages/ProductDetails/EssentialDetail.jsx";
import AllEssentials from "./pages/specifiCategories/AllEssentials.jsx";
import AllProducts from "./pages/specifiCategories/AllProducts.jsx";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin"); // detect admin routes

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />

      {/* Show Navbar and Footer only for non-admin routes */}
      {isAdmin ? <Sidebar /> : <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ess-categories" element={<EssCategories />} />
        <Route path="/products/:categoryName" element={<SpecificCategory />} />
        <Route path="/essentials/:categoryName" element={<EssSpeciCategory />} />
        <Route path="/essentials/all-products" element={<AllEssentials />} />
        <Route path="/products/all-products" element={<AllProducts />} />
        <Route path="/products/:categoryName/:productId" element={<ProductDetail />} />
        <Route
          path="/essential/:categoryName/:productId"
          element={<EssentialDetailsPage />}
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/online-course" element={<OnlineCourse />} />
        <Route path="/course/my-learning/:courseId" element={<OnlineCourseDetails />} />
        <Route path="/courses/offline-course" element={<OfflineCourse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/courses/my-learning/" element={<MyLearning />} />
        <Route
          path="/courses/course-payment-page/:courseId"
          element={<CoursePaymentPage />}
        />

        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/courses"
          element={
            <ProtectedAdminRoute>
              <CourseAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/essentials"
          element={
            <ProtectedAdminRoute>
              <EssentialsAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/cakes"
          element={
            <ProtectedAdminRoute>
              <CakesAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <OrdersAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/banner"
          element={
            <ProtectedAdminRoute>
              <BannerAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <SettingsAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/cakes/:categoryName"
          element={
            <ProtectedAdminRoute>
              <IndividualCakesAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/essentials/:categoryName"
          element={
            <ProtectedAdminRoute>
              <IndividualEssentialAdmin />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      {!isAdmin && (
        <>
          <EnquiryBtn />
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
