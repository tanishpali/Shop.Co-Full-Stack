import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    address: "",
    gender: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Sending signup data:", formData); // Debug log

    try {
      const response = await fetch("http://localhost:4000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Backend response:", result); // Debug log

      if (response.ok) {
        toast.success(result.msg || "Account created successfully!");
        navigate("/login"); // redirect to Login page
      } else {
        console.error("Signup error:", result); // Debug log
        toast.error(result.msg || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Network error:", error); // Debug log
      toast.error("Server error! Unable to sign up.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex flex-col gap-4 p-8 rounded-lg"
      >
        <h1 className="text-3xl font-semibold text-center">Create Account</h1>
        <p className="text-center text-gray-500 mb-4">Join SHOP.CO today</p>

        {/* Full Name */}
        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Contact Number
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Number"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </span>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Gender + Age */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg mt-2 hover:bg-gray-900 transition"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-black font-medium">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
