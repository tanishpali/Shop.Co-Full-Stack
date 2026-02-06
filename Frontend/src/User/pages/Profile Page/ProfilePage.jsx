import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

/* ================= CONFIG ================= */

const API_BASE_URL = "http://localhost:4000";

/* ================= EDIT MODAL ================= */

const EditModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setFormData(user);
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" className="border p-3 rounded-xl" />
          <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className="border p-3 rounded-xl" />
          <input name="contact" value={formData.contact || ""} onChange={handleChange} placeholder="Phone" className="border p-3 rounded-xl" />
          <input name="age" value={formData.age || ""} onChange={handleChange} placeholder="Age" className="border p-3 rounded-xl" />
          <input name="gender" value={formData.gender || ""} onChange={handleChange} placeholder="Gender" className="border p-3 rounded-xl" />
          <textarea name="bio" value={formData.bio || ""} onChange={handleChange} placeholder="Bio" className="border p-3 rounded-xl md:col-span-2" />
          <textarea name="address" value={formData.address || ""} onChange={handleChange} placeholder="Address" className="border p-3 rounded-xl md:col-span-2" />

          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading} className="bg-slate-900 text-white px-6 py-2 rounded-xl">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ================= PROFILE PAGE ================= */

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const token = Cookies.get("token");

  /* ---------- FETCH USER ---------- */

  useEffect(() => {
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) setUser(data.user);
        else setError("Failed to fetch profile");
      } catch {
        setError("Server not reachable");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  /* ---------- UPDATE USER ---------- */

  const handleSaveProfile = async (updatedData) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/updateUser/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();
      if (res.ok) setUser(data.user);
    } catch {
      console.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading Profile...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      <div className="max-w-6xl mx-auto -mt-40 px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl p-10">

          {/* Top */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-36 h-36 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center text-5xl font-bold text-slate-300 -mt-24">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-800">{user.name}</h1>
              <p className="text-slate-400 mt-2">
                Account created {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="px-8 py-3 bg-slate-900 text-white rounded-2xl shadow"
            >
              ✏️ Edit Profile
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">

            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  About Me
                </h2>
                <p className="bg-slate-50 p-6 rounded-3xl italic text-slate-600">
                  “{user.bio || "No bio added"}”
                </p>
              </section>

              <div className="bg-white border rounded-3xl p-6">
                <h3 className="font-bold mb-2">📍 Location & Residency</h3>
                <p className="text-slate-700">{user.address}</p>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-8">
              <div className="bg-white border-l-4 border-blue-500 rounded-3xl p-6">
                <h3 className="font-bold mb-4">📬 Key Contact</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.contact}</p>
              </div>

              <div className="bg-white border-l-4 border-purple-500 rounded-3xl p-6">
                <h3 className="font-bold mb-4">👤 Demographics</h3>
                <p>Gender: {user.gender}</p>
                <p>Age: {user.age}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={editing}
        onClose={() => setEditing(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
}


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "../Components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
// import { toast } from "sonner";
// import { Upload, Mail, Phone, MapPin, User, Calendar, Edit2, Save } from "lucide-react";

// const Profile = () => {
//   const [profileImage, setProfileImage] = useState("/placeholder.svg");
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "Tanish Pali",
//     email: "tanish@gmail.com",
//     contact: "9876573210",
//     address: "Bhopal, MP",
//     gender: "Male",
//     age: "21",
//   });

//   const handleImageUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//         toast.success("Profile picture updated");
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     toast.success("Profile updated successfully!");
//   };

//   const handleInputChange = (field, value) => {
//     setProfileData((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-background p-6 md:p-10">
//       <div className="max-w-5xl mx-auto space-y-10">

//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-4xl font-bold text-foreground">My Profile</h1>
//           <Button
//             onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
//           >
//             {isEditing ? (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 Save Profile
//               </>
//             ) : (
//               <>
//                 <Edit2 className="w-4 h-4 mr-2" />
//                 Edit Profile
//               </>
//             )}
//           </Button>
//         </div>

//         {/* Profile Header Card */}
//         <Card className="overflow-hidden border rounded-xl">
//           <div className="h-36 bg-gradient-to-r from-gray-200 to-gray-50" />

//           <CardContent className="relative -mt-16 flex flex-col md:flex-row items-center gap-6 pb-8">
//             <div className="relative">
//               <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
//                 <AvatarImage src={profileImage} />
//                 <AvatarFallback className="text-3xl">
//                   {profileData.name.charAt(0)}
//                 </AvatarFallback>
//               </Avatar>

//               <label
//                 htmlFor="profile-upload"
//                 className="absolute bottom-2 right-2 bg-black text-white rounded-full p-2 cursor-pointer hover:opacity-80 shadow-md"
//               >
//                 <Upload className="w-4 h-4" />
//                 <input
//                   id="profile-upload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageUpload}
//                 />
//               </label>
//             </div>

//             <div className="flex-1 text-center md:text-left">
//               {isEditing ? (
//                 <Input
//                   value={profileData.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                   className="text-2xl font-bold max-w-sm mx-auto md:mx-0"
//                 />
//               ) : (
//                 <h2 className="text-3xl font-bold">{profileData.name}</h2>
//               )}
//               <p className="text-muted-foreground">Member since 2024</p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Info Grid */}
//         <div className="grid md:grid-cols-2 gap-6">

//           {/* Contact Information */}
//           <Card className="border rounded-xl">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-xl">
//                 <Mail className="w-5 h-5" />
//                 Contact Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5">

//               <div>
//                 <label className="text-sm text-muted-foreground flex items-center gap-2">
//                   <Mail className="w-4 h-4" /> Email
//                 </label>
//                 {isEditing ? (
//                   <Input
//                     type="email"
//                     value={profileData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                   />
//                 ) : (
//                   <p className="font-medium">{profileData.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="text-sm text-muted-foreground flex items-center gap-2">
//                   <Phone className="w-4 h-4" /> Phone
//                 </label>
//                 {isEditing ? (
//                   <Input
//                     value={profileData.contact}
//                     onChange={(e) => handleInputChange("contact", e.target.value)}
//                   />
//                 ) : (
//                   <p className="font-medium">{profileData.contact}</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Personal Info */}
//           <Card className="border rounded-xl">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-xl">
//                 <User className="w-5 h-5" />
//                 Personal Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5">

//               <div>
//                 <label className="text-sm text-muted-foreground flex items-center gap-2">
//                   <User className="w-4 h-4" /> Gender
//                 </label>
//                 {isEditing ? (
//                   <Input
//                     value={profileData.gender}
//                     onChange={(e) => handleInputChange("gender", e.target.value)}
//                   />
//                 ) : (
//                   <p className="font-medium">{profileData.gender}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="text-sm text-muted-foreground flex items-center gap-2">
//                   <Calendar className="w-4 h-4" /> Age
//                 </label>
//                 {isEditing ? (
//                   <Input
//                     type="number"
//                     value={profileData.age}
//                     onChange={(e) => handleInputChange("age", e.target.value)}
//                   />
//                 ) : (
//                   <p className="font-medium">{profileData.age} years</p>
//                 )}
//               </div>

//             </CardContent>
//           </Card>

//           {/* Address */}
//           <Card className="md:col-span-2 border rounded-xl">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-xl">
//                 <MapPin className="w-5 h-5" />
//                 Address
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {isEditing ? (
//                 <Input
//                   value={profileData.address}
//                   onChange={(e) => handleInputChange("address", e.target.value)}
//                 />
//               ) : (
//                 <p className="font-medium">{profileData.address}</p>
//               )}
//             </CardContent>
//           </Card>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
