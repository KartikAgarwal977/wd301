
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
type FormValues = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error("Sign-in failed");
      }
      console.log("sign in successful")
      const resdata = await response.json();
      localStorage.setItem("authToken", resdata.token);
      localStorage.setItem("userData", JSON.stringify(resdata.user));
      navigate("/account");
      console.log("sign-in successful");
    } catch (error) {
      console.error("sign-in failed", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
          </div>
          {errors.password && <p>This is required</p>}
      <div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};
export default SigninForm;



// import React, { useState } from "react";
// // Dialogue 1: First we will import the API_ENDPOINT constant from the `config` folder
// import { API_ENDPOINT } from "../../config/constants";
// import { useNavigate } from "react-router-dom";

// const SigninForm: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   // Dialogue 2: Then we will define the handle submit function
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         console.error("Sign-in failed. Status:", response.status);
//         const errorData = await response.json(); // If the API returns an error message
//         console.error("Error message:", errorData.message);
//         throw new Error("Sign-in failed");
//       }

//       console.log("Sign-in successful");

//       // extract the response body as JSON data
//       const data = await response.json();

//       // Dialogue: After successful signin, first we will save the token in localStorage
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("userData", JSON.stringify(data.user));
//       navigate("/account");
//     } catch (error) {
//       console.error("Sign-in failed:", error);
//     }
//   };

//   // Dialogue: Then we will use the handleSubmit function with our form
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Email:</label>
//         <input
//           type="email"
//           name="Email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">
//           Password:
//         </label>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
//       >
//         Sign In
//       </button>
//     </form>
//   );
// };

// export default SigninForm;