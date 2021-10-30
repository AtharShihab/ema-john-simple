import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { UserContext } from "./../../App";

const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={loggedInUser.name}
        placeholder="Name"
        {...register("name", { required: true })}
      />
      {errors.name && <span className="error">Name is required</span>}
      <input
        defaultValue={loggedInUser.email}
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {errors.email && <span className="error">Email is required</span>}
      <input
        placeholder="Address"
        {...register("address", { required: true })}
      />
      {errors.address && <span className="error">Address is required</span>}
      <input placeholder="Phone" {...register("phone", { required: true })} />
      {errors.phone && <span className="error">Phone is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
