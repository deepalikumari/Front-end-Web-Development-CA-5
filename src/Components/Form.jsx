import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';
import './Form.css';

function Form() {
  
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [isFormEdited,setFormEdited] = useState(false);

  
  const onSubmit = (data) => {
    console.log(data);
    setRegisterSuccessful(true);
  };

  const handleFormChange = () => {
    setFormEdited(true);
  };
 

  return (
    <div className='Main'>

      <Link to='/'>
        <button className='back'>Back</button>
      </Link>

      <div>
      {registerSuccessful && (

        <div className='popup'>
          <p>REGISTRATION DONE!! 🔥🔥🔥</p>
        </div>
      )}

      <h1>Create Account</h1>
      
      <form className='form' onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
      
        <label>Enter Name:</label>

        <input type="text" name='yourName' {...register("yourName", {
          required: "Your Name required!",
          minLength: {
            value: 3,
            message: "Name must be more than 3 characters"
          },
          maxLength: {
            value: 20,
            message: "Name cannot be more than 30 characters"
          }
        })} />

        {errors.yourName && <p className='err'>{errors.yourName.message}</p>}
      

        <label>Email :</label>

        <input type="email" name='email' {...register("email", { required: "Email required!", pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" } })} />
        {errors.email && <p className='err'>{errors.email.message}</p>}
          

        <label>Password :</label>

        <input type="password" name='password' {...register("password", {
          required: "Password required",
          pattern: {
            value: /^(?=.*[!@#$%^&*])\w+\S+/,
            message: "Password must contain at least one special character "
          },
          minLength: {
            value: 10,
            message: "Password cannot be less than 10 characters"
          }
        })} />
        {errors.password && (<p className='err'>{errors.password.message}</p>)}

        
        <label>Confirm Password :</label>

        <input
          type="password"
          name="confirmPassword"
          {...register("confirmPassword", {
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && <p className="er">{errors.confirmPassword.message}</p>}
        
        <button type="submit" >Sign Up</button>
      </form>
      </div>
    </div>
  )
}

export default Form;



