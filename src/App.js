import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
import Services from "./Components/Services/Services/Services";
import ResumeWriting from "./Components/Services/Resume Writing/ResumeWriting";
import CoverLetterwriting from "./Components/Services/Cover Letter writing/CoverLetterwriting";
import LinkedInOptimization from "./Components/Services/LinkedIn Optimization/LinkedInOptimization";
import CareerAdvice from "./Components/CareerAdvice/CareerAdvice";
import BlogPostPage from "./Components/CareerAdvice/Components/CarrerBlogSection/BlogPostPage";
import About from "./Components/About/About";
import Writers from "./Components/Writers/Writers";
import ContactUs from "./Components/ContactUs/ContactUs";
import FAQ from "./Components/FAQ/FAQ";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import CookiePolicy from "./Components/CookiePolicy/CookiePolicy";
import EmptyCart from "./Components/Cart/EmptyCart/EmptyCart";
import ItemCart from "./Components/Cart/ItemCart/ItemCart";
import Login from "./Components/Cart/Login/Login";
import Payment from "./Components/Cart/Payment/Payment";
import OrderPlaced from "./Components/Cart/Order/OrderPlaced/OrderPlaced";
import PastOrdersMain from "./Components/Cart/Order/PastOrders/PastOrdersMain/PastOrdersMain";
import PastOrdersSub from "./Components/Cart/Order/PastOrders/PastOrdersSub/PastOrdersSub";
import Register from "./Components/Cart/Register/Register";
import IndustryBase from "./Components/Services/IndustryBase/IndustryBase";
import Cookies from "./Components/Cookies/Cookies";
import NavBar from "./Components/NavBar/NavBar";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleCloseCookies = () => {
    setIsFirstVisit(false);
  };

  return (
    <AuthProvider>
      {isFirstVisit && <Cookies onClose={handleCloseCookies} />}
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/currentOrder"
          element={
            <ProtectedRoute>
              <OrderPlaced />
            </ProtectedRoute>
          }
        />
        <Route
          path="/previousOrders"
          element={
            <ProtectedRoute>
              <PastOrdersMain />
            </ProtectedRoute>
          }
        />
        <Route path="/servicess" element={<Services />} />
        <Route path="/resumeWriting" element={<ResumeWriting />} />
        <Route path="/coverLetter" element={<CoverLetterwriting />} />
        <Route
          path="/linkedInOptimization"
          element={<LinkedInOptimization />}
        />
        <Route path="/careerAdvice" element={<CareerAdvice />} />
        <Route path="/blogPostPage" element={<BlogPostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/writers" element={<Writers />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/fAQ" element={<FAQ />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/cookiePolicy" element={<CookiePolicy />} />
        <Route path="/industry/:topic" element={<IndustryBase />} />
        {/* Cart Routes */}
        <Route path="/emptyCart" element={<EmptyCart />} />
        <Route path="/itemCart" element={<ItemCart />} />
        <Route path="/pastOrders" element={<PastOrdersSub />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
