import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

import Navbar from "./User/pages/Navbar/Navbar";
import Homepage from "./User/pages/Hero_1";
import LoginForm from "./User/pages/LoginForm";
import Product from "./User/pages/ProductDetail/Product";
import Onsale from "./User/pages/Navbar/Onsale";
import Cart from "./User/pages/Cart/cart";
import Signup from "./User/pages/SignUp";
import Profile from "./User/pages/Profile Page/ProfilePage";
import AddProductUI from "./User/pages/AddProduct";
import AddProductPage from "./Merchant/AddProductPage";
import ProductDetailPage from "./User/pages/ProductDetail/ProductDetailPage";
import ProtectedRoute from "./Merchant/ProtectedRoute";
import DashboardHome from "./Merchant/DashboardHome";
import Inventory from "./Merchant/Inventory";
import MerchantLayout from "./Merchant/MerchantLayout";
import MerchantProfile from "./Merchant/MerchantProfile";
import Shipments from "./Merchant/Shipments";
import Insights from "./Merchant/Insights";
import Settings from "./Merchant/Settings";
import Onboarding from "./Merchant/Onboarding";
import MerchantLogin from "./Merchant/MerchantLogin";


// Layout with Navbar
function MainLayout() {
  return (
    <>
      <Toaster richColors />
      <Navbar />
      <Outlet />

    </>
  );
}

import SearchPage from "./User/pages/Search/SearchPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Publicly available with Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>

          {/* Protected Routes with Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/onsale" element={<ProtectedRoute><Onsale /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/shop" element={<ProtectedRoute><Product /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
          </Route>

          {/* Merchant Routes */}
          <Route path="/merchant" element={
            <ProtectedRoute>
              <MerchantLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="add-product" element={<AddProductUI isMerchant={true} />} />
            <Route path="orders" element={<Shipments />} />
            <Route path="analytics" element={<Insights />} />
            <Route path="profile" element={<MerchantProfile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<SearchPage />} />
          </Route>

          <Route path="/merchant/onboarding" element={<Onboarding />} />
          <Route path="/merchant/login" element={<MerchantLogin />} />



          {/* Auth routes (Public) */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes (No Navbar) */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/product" element={<AddProductUI />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
