// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import loginhero from "../Components/Assets/tanish-assets/loginhero.jpg";

// export default function LoginForm() {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [remember, setRemember] = React.useState(false);

//   const navigate = useNavigate(); // Navigation hook

//   function handleSubmit(e) {
//     e.preventDefault();
//     alert(
//       `Sign in attempted:\nEmail: ${email}\nPassword: ${
//         password ? "(hidden)" : ""
//       }\nRemember: ${remember}`
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-white">
//       {/* LEFT IMAGE HERO SECTION */}
//       <div
//         className="md:w-1/2 w-full relative flex items-center justify-center overflow-hidden"
//         style={{ minHeight: "100vh" }}
//       >
//         <img
//           src={loginhero}
//           alt="fashion-hero"
//           className="absolute inset-0 h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40" />
//         <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-16 text-white text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//             Welcome Back
//           </h1>
//           <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto">
//             Step into style. Access your personal fashion universe and discover
//             clothing that matches your unique aesthetic.
//           </p>

//           {/* Stats */}
//           <div className="flex justify-center gap-12 mt-8">
//             <div>
//               <div className="text-2xl font-bold">200+</div>
//               <div className="text-sm text-gray-200">Brands</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold">2,000+</div>
//               <div className="text-sm text-gray-200">Products</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold">30,000+</div>
//               <div className="text-sm text-gray-200">Happy Customers</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT FORM SECTION */}
//       <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-200 px-4 py-20">
//         <div
//           className="w-full max-w-2xl rounded-3xl shadow-2xl p-16 min-h-[600px] flex flex-col justify-center"
//           style={{
//             background: "rgba(255,255,255,0.85)",
//             backdropFilter: "blur(8px)",
//             boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
//             border: "1px solid rgba(255,255,255,0.18)",
//           }}
//         >
//           <h2 className="text-4xl font-extrabold mb-2 tracking-tight text-black">
//             User Login
//           </h2>
//           <p className="text-gray-500 mb-8">
//             Enter your credentials to access your account
//           </p>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* EMAIL */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Email Address
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-3 flex items-center">
//                   <svg
//                     className="h-5 w-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M16 12H8m0 0l4-4m0 8l-4-4"
//                     />
//                   </svg>
//                 </span>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
//                   placeholder="Enter your email"
//                   required
//                   autoComplete="email"
//                 />
//               </div>
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-3 flex items-center">
//                   <svg
//                     className="h-5 w-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6"
//                     />
//                   </svg>
//                 </span>

//                 {/* PASSWORD INPUT */}
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full rounded-xl border border-gray-200 pl-10 pr-10 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
//                   placeholder="Enter your password"
//                   required
//                   autoComplete="current-password"
//                 />

//                 {/* SHOW/HIDE BUTTON */}
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((s) => !s)}
//                   aria-label="Toggle password visibility"
//                   className="absolute inset-y-0 right-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <svg
//                       className="h-5 w-5 text-gray-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.053.167-2.066.475-3.018M3 3l18 18"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       className="h-5 w-5 text-gray-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* REMEMBER ME */}
//             <div className="flex items-center justify-between mt-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={remember}
//                   onChange={(e) => setRemember(e.target.checked)}
//                   className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">
//                   Remember me
//                 </span>
//               </label>

//               <a href="#" className="text-sm text-gray-600 hover:underline">
//                 Forgot password?
//               </a>
//             </div>

//             {/* LOGIN BUTTON */}
//             <button
//               type="submit"
//               className="w-full rounded-xl bg-black text-white py-3 font-semibold text-lg mt-2 hover:bg-gray-800 transition shadow-lg"
//             >
//               Sign In
//             </button>

//             {/* SIGNUP LINK */}
//             <p className="text-center text-sm text-gray-500 mt-4">
//               Don't have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => navigate("/signup")}
//                 className="font-medium text-black hover:underline"
//               >
//                 Create account
//               </button>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import loginhero from "../Components/Assets/tanish-assets/loginhero.jpg";
// import Cookies from "js-cookie";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // ======================================
//   //           LOGIN API FUNCTION
//   // ======================================
//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:4000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Save JWT token in cookies
//         Cookies.set("token", result.token, {
//           expires: remember ? 7 : 1, // 7 days if "Remember me", else 1 day
//         });

//         alert("Login successful!");

//         // Redirect after login
//         navigate("/profile");
//       } else {
//         alert(result.msg || "Invalid email or password");
//       }
//     } catch (error) {
//       alert("Server error. Please try again.");
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-white">
//       {/* LEFT IMAGE SECTION */}
//       <div
//         className="md:w-1/2 w-full relative flex items-center justify-center overflow-hidden"
//         style={{ minHeight: "100vh" }}
//       >
//         <img
//           src={loginhero}
//           alt="fashion-hero"
//           className="absolute inset-0 h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40" />
//         <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-16 text-white text-center">
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//             Welcome Back
//           </h1>

//           <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto">
//             Step into style. Access your personal fashion universe and discover
//             clothing that matches your unique aesthetic.
//           </p>

//           {/* Stats */}
//           <div className="flex justify-center gap-12 mt-8">
//             <div>
//               <div className="text-2xl font-bold">200+</div>
//               <div className="text-sm text-gray-200">Brands</div>
//             </div>

//             <div>
//               <div className="text-2xl font-bold">2,000+</div>
//               <div className="text-sm text-gray-200">Products</div>
//             </div>

//             <div>
//               <div className="text-2xl font-bold">30,000+</div>
//               <div className="text-sm text-gray-200">Happy Customers</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT FORM SECTION */}
//       <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-200 px-4 py-20">
//         <div
//           className="w-full max-w-2xl rounded-3xl shadow-2xl p-16 min-h-[600px] flex flex-col justify-center"
//           style={{
//             background: "rgba(255,255,255,0.85)",
//             backdropFilter: "blur(8px)",
//             boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
//             border: "1px solid rgba(255,255,255,0.18)",
//           }}
//         >
//           <h2 className="text-4xl font-extrabold mb-2 tracking-tight text-black">
//             User Login
//           </h2>
//           <p className="text-gray-500 mb-8">
//             Enter your credentials to access your account
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* EMAIL */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="block w-full rounded-xl border border-gray-200 px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-black bg-white/80"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full rounded-xl border border-gray-200 px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-black bg-white/80"
//                   placeholder="Enter your password"
//                   required
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute inset-y-0 right-3 flex items-center text-gray-600"
//                 >
//                   {showPassword ? "🙈" : "👁️"}
//                 </button>
//               </div>
//             </div>

//             {/* REMEMBER ME */}
//             <div className="flex items-center justify-between">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={remember}
//                   onChange={(e) => setRemember(e.target.checked)}
//                   className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">
//                   Remember me
//                 </span>
//               </label>

//               <a href="#" className="text-sm text-gray-600 hover:underline">
//                 Forgot password?
//               </a>
//             </div>

//             {/* LOGIN BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-xl bg-black text-white py-3 font-semibold text-lg mt-2 hover:bg-gray-800 transition shadow-lg"
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </button>

//             {/* SIGNUP */}
//             <p className="text-center text-sm text-gray-500 mt-4">
//               Don't have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => navigate("/signup")}
//                 className="font-medium text-black hover:underline"
//               >
//                 Create account
//               </button>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }






























import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginhero from "../../components/Assets/tanish-assets/loginhero.jpg";
import Cookies from "js-cookie";
import { toast } from "sonner";

// MUI
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";

import LoginSuccessModal from "../Modals/LoginSuccessModal";

export default function LoginForm() {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // OTP States
  const [loginMethod, setLoginMethod] = useState("password"); // 'password' | 'otp'
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  // =========================
  // SEND OTP API
  // =========================
  async function handleSendOTP() {
    if (!email) {
      toast.error("Please enter email first");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg || "OTP Sent to email");
        setOtpSent(true);
      } else {
        toast.error(data.msg || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Server error sending OTP");
    }
    setLoading(false);
  }

  // =========================
  // LOGIN API (Password & OTP)
  // =========================
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let url = "http://localhost:4000/login";
      let body = { email, password };

      if (loginMethod === 'otp') {
        url = "http://localhost:4000/login-otp";
        body = { email, otp };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        Cookies.set("token", result.token, {
          expires: remember ? 7 : 1,
        });
        toast.success(result.msg || "Login Successful");
        setShowSuccess(true);
      } else {
        toast.error(result.msg || "Invalid credentials");
      }
    } catch {
      toast.error("Server error. Please try again.");
    }

    setLoading(false);
  }

  const handleSuccessComplete = () => {
    navigate("/");
  };

  return (
    <Box minHeight="100vh" display="flex">
      <LoginSuccessModal
        isOpen={showSuccess}
        onComplete={handleSuccessComplete}
      />
      {/* ================= LEFT HERO ================= */}
      <Box
        flex={1}
        display={{ xs: "none", md: "flex" }}
        position="relative"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="img"
          src={loginhero}
          alt="hero"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        />

        <Box zIndex={1} textAlign="center" px={6} color="white">
          <Typography variant="h3" mb={2}>
            Welcome Back
          </Typography>

          <Typography variant="body2" mb={6}>
            Step into style. Access your personal fashion universe and discover
            clothing that matches your unique aesthetic.
          </Typography>

          <Box display="flex" justifyContent="center" gap={12}>
            {[
              ["200+", "Brands"],
              ["2,000+", "Products"],
              ["30,000+", "Happy Customers"],
            ].map(([count, label]) => (
              <Box key={label}>
                <Typography variant="h6">{count}</Typography>
                <Typography variant="body2">{label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ================= RIGHT FORM ================= */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={theme.palette.grey[100]}
        px={4}
      >
        <Box
          width="100%"
          maxWidth={520}
          p={6}
          borderRadius={4}
          bgcolor={theme.palette.background.paper}
          boxShadow={theme.shadows[10]}
        >
          <Typography variant="h4" mb={1}>
            User Login
          </Typography>

          <Typography variant="body1" mb={4} color="black">
            Enter your credentials to access your account
          </Typography>

          {/* METHOD TOGGLE */}
          <Box mb={3} display="flex" justifyContent="center">
            <ToggleButtonGroup
              color="primary"
              value={loginMethod}
              exclusive
              onChange={(e, val) => {
                if (val) {
                  setLoginMethod(val);
                  setOtpSent(false);
                  setOtp("");
                }
              }}
              aria-label="Login Method"
              size="small"
              fullWidth
            >
              <ToggleButton value="password">Password Login</ToggleButton>
              <ToggleButton value="otp">OTP Login</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box component="form" onSubmit={handleSubmit} display="grid" gap={3}>
            <TextField
              label="Email Address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {loginMethod === 'password' ? (
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "🙈" : "👁️"}
                    </Button>
                  ),
                }}
              />
            ) : (
              // OTP SECTION
              <Box display="flex" gap={2}>
                <TextField
                  label="Enter OTP"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!otpSent}
                />
                <Button
                  variant="outlined"
                  onClick={handleSendOTP}
                  disabled={loading || !email || otpSent}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {otpSent ? "Sent" : "Get OTP"}
                </Button>
              </Box>
            )}

            <Box display="flex" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                }
                label="Remember me"
              />

              <Button variant="text" size="small">
                Forgot password?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || (loginMethod === 'otp' && !otpSent)}
              sx={{
                borderRadius: "999px",
                py: 1.4,
                mt: 1,
              }}
            >
              {loading ? "Processing..." : "Sign In"}
            </Button>

            <Typography textAlign="center" variant="body1" color="black">
              Don&apos;t have an account?{" "}
              <Button variant="text" onClick={() => navigate("/signup")}>
                Create account
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
