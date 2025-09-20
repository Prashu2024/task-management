// import React, { useState } from "react";
// import { loginUser, setAuthToken } from "../../api";
// import { useNavigate, Link } from "react-router-dom";

// const LoginPage = ({ setIsAuthenticated }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       console.log(email, password)
//       const response = await loginUser({ email, password });
//       const { access_token } = response.data;
//       localStorage.setItem("token", access_token);
//       setAuthToken(access_token);
//       setIsAuthenticated(true); // Update authentication state in App.jsx
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid credentials. Please try again.");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row">
//       {/* Left Section - Login Form */}
//       <div className="flex flex-col justify-center px-8 lg:px-20 w-full lg:w-1/2 bg-white">
//         <div className="max-w-md w-full mx-auto">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">
//             Welcome 
//           </h2>

//           {error && (
//             <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-semibold text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-semibold text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
//             >
//               Login in
//             </button>
//           </form>

//           {/* Footer Links */}
//           <p className="mt-4 text-center text-gray-600 text-sm">
//             Don’t have an account?{" "}
//             <Link
//               to="/register"
//               className="text-blue-600 font-semibold hover:underline"
//             >
//               Register
//             </Link>
//           </p>

//         </div>
//       </div>

//       {/* Right Section - Animated Box */}
//       <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-gray-50">
//         <div className="relative w-64 h-64">
//           {/* Floating Box */}
//           <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl shadow-2xl transform animate-bounce-slow opacity-80"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from 'react';
import { loginUser, setAuthToken } from '../../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser({ email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setAuthToken(access_token);
      setIsAuthenticated(true); 
      navigate('/tasks');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a
              href="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Don't have an account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
