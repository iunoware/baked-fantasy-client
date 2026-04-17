/* eslint-disable no-unused-vars */
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import EnquiryBtn from "./components/EnquiryBtn.jsx";
import Home from "../src/pages/Home.jsx";
import About from "../src/pages/About.jsx";
import Categories from "./pages/Category/ProductsCategory.jsx";
import EssCategories from "./pages/Category/EssCategory.jsx";
import Courses from "../src/pages/Courses.jsx";
import Contact from "../src/pages/Contact.jsx";
// import Navbar from "./components/NewNav.jsx";
import Navbar from "./components/Navbar.jsx";
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
import CourseDetailsAdmin from "./pages/adminPanel/courses/CourseDetailsAdmin.jsx";
import Sidebar from "./components/Sidebar.jsx";
import EssentialsAdmin from "./pages/adminPanel/essentials/EssentialsAdmin.jsx";
import CakesAdmin from "./pages/adminPanel/cakes/CakesAdmin.jsx";
import OrdersAdmin from "./pages/adminPanel/OrdersAdmin.jsx";
import PromoCode from "./pages/adminPanel/PromoCode.jsx";
import Announcements from "./pages/adminPanel/Announcements.jsx";
import BannerAdmin from "./pages/adminPanel/BannerAdmin.jsx";
import IndividualCakesAdmin from "./pages/adminPanel/cakes/IndividualCakesAdmin.jsx";
import SettingsAdmin from "./pages/adminPanel/SettingsAdmin.jsx";
import AdminLogin from "./components/adminPanel/AdminLogin.jsx";
import IndividualEssentialAdmin from "./pages/adminPanel/essentials/IndividualEssentialsAdmin.jsx";
import EssentialDetailsPage from "./pages/ProductDetails/EssentialDetail.jsx";
import AllEssentials from "./pages/specifiCategories/AllEssentials.jsx";
import AllProducts from "./pages/specifiCategories/AllProducts.jsx";
import autoLogout from "./hooks/autoLogout.js";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { GlobalLoader } from "./components/GlobalLoader.jsx";
import CompleteProfileModal from "./components/CompleteProfileModal.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import { getCookie, removeCookie } from "./utils/cookieUtils";

function ProtectedAdminRoute({ children }) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  const { isLoggedIn, showProfileModal, setShowProfileModal } = useAuth();

  return (
    <>
      <GlobalLoader />
      <CompleteProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />

      {/* Show Navbar and Footer only for non-admin routes */}
      {isAdmin ? <Sidebar /> : <Navbar />}
      <Routes>
        {/* root pages */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ess-categories" element={<EssCategories />} />
        {/* root pages */}

        {/* products */}
        <Route path="/products/:categoryName" element={<SpecificCategory />} />
        <Route path="/products/all-products" element={<AllProducts />} />
        <Route
          path="/products/:categoryName/:productId"
          element={<ProductDetail />}
        />
        {/* products */}

        {/* essentials */}
        <Route
          path="/essentials/:categoryName"
          element={<EssSpeciCategory />}
        />
        <Route path="/essentials/all-products" element={<AllEssentials />} />
        <Route
          path="/essential/:categoryName/:productId"
          element={<EssentialDetailsPage />}
        />
        {/* essentials */}

        {/* courses */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/online-course" element={<OnlineCourse />} />
        <Route path="/courses/my-learning/" element={<MyLearning />} />
        <Route
          path="/course/my-learning/:courseId"
          element={<OnlineCourseDetails />}
        />
        <Route path="/courses/offline-course" element={<OfflineCourse />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/courses/course-payment-page/:courseId"
          element={<CoursePaymentPage />}
        />
        {/* courses */}

        {/* card */}
        <Route path="/cart" element={<Cart />} />
        {/* card */}

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
          path="/admin/courses/:courseId"
          element={
            <ProtectedAdminRoute>
              <CourseDetailsAdmin />
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
        {/* <Route
          path="/admin/banner"
          element={
            <ProtectedAdminRoute>
              <BannerAdmin />
            </ProtectedAdminRoute>
          }
        /> */}
        <Route
          path="/admin/announcements"
          element={
            <ProtectedAdminRoute>
              <Announcements />
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

import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <Router>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
