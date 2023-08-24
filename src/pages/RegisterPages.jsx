import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import defaultValues from "../utils/defaultValues";
import "./styles/registerPage.css";

const RegisterPages = () => {
  const { register, handleSubmit, reset } = useForm();

  const url = "https://e-commerce-api-v2.academlo.tech/api/v1/users";
  const sumbit = (data) => {
    axios
      .post(url, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    reset(defaultValues);
  };

  return (
    <div className="register_container">
      <form className="register_form" onSubmit={handleSubmit(sumbit)}>
        <div>
          <label htmlFor="firstName">First name</label>
          <input
            className="register_info"
            {...register("firstName")}
            type="text"
            id="firstName"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input
            className="register_info"
            {...register("lastName")}
            type="text"
            id="lastName"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="register_info"
            {...register("email")}
            type="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="register_info"
            {...register("password")}
            type="password"
            id="password"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            className="register_info"
            {...register("phone")}
            type="phone"
            id="phone"
          />
        </div>
        <button className="register">Register</button>
      </form>
    </div>
  );
};

export default RegisterPages;
