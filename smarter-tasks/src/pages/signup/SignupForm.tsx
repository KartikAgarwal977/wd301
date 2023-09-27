import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
type FormValues = {
  organisationName: string;
  userName: string;
  userEmail: string;
  userPassword: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { organisationName, userName, userEmail, userPassword } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/organisations`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: organisationName,
          user_name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/account");
      console.log("sign-up successful");
    } catch (error) {
      console.error("sign-up failed", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Organisation Name:
        </label>
        <input
          type="text"
          id="organisationName"
          {...register("organisationName", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="userName"
          {...register("userName", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="userEmail"
          {...register("userEmail", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="userPassword"
          {...register("userPassword", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
          </div>
          {errors.userPassword && <p>This is required</p>}
      <div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};
export default SignupForm;

// import React, { useState } from 'react';
// import { API_ENDPOINT } from '../../config/constants';
// import { useNavigate } from 'react-router-dom';
// const SignupForm: React.FC = () => {
//     const [organisationName, setOrganisationName] = useState('');
//     const [userName, setUserName] = useState('')
//     const [userEmail, setUserEmail] = useState('')
//     const [userPassword, setUserPassword] = useState('')
//     const navigate = useNavigate()
//     const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         try {
//             const response = await fetch(`${API_ENDPOINT}/organisations`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': "application/json" },
//                 body: JSON.stringify({ name: organisationName, user_name: userName, email: userEmail, password: userPassword}),
//             })
//             if (!response.ok) {
//                 throw new Error ("Sign-up failed")
//             }
//             console.log('Sign-up successful')

//             const data = await response.json()
//             localStorage.setItem('authToken', data.token)
//             localStorage.setItem('userData', JSON.stringify(data.user))

//             navigate('/account')
//         } catch (error) {
//             console.error('sign-up failed : ', error)
//         }
//     }
//     return (

//     )
// }
// export default SignupForm;
