import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { apiConnector } from '../../Services/apiConnector';

import { contactUS } from '../../Services/apis';
import countrycode from "../../data/countrycode.json"

const api = contactUS.CONTACTUS_API;

function ContactUSForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    } = useForm();

    useEffect( () => {
        if(isSubmitSuccessful){
        reset({
            email:"",
            firstName:"",
            lastName:"",
            message:"",
            phoneNo: "",
            countryCode: "+91",
        })
    }
    }, [ reset ,isSubmitSuccessful]);


    const submitContactForm = async(data) => {
        console.log("Logging Data: ", data);
        try {
            setLoading(true);
            const response = await apiConnector("POST", api, data);
            console.log("Logging response: ", response);
        } catch (error) {
            console.log("Error: ", error.message);
        }
        setLoading(false);
    }


  return (
    <div>
        <form onSubmit={handleSubmit(submitContactForm)}
        className='flex flex-col gap-7'
        >
            {/* firstName && lastname */}
            <div className="flex flex-col gap-5 lg:flex-row">
                {/* firstName */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='firstName' className="lable-style">First Name</label>
                    <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter your first name'
                    className="form-style"
                    {...register("firstName", {required: true})}
                     />
                     {
                        errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your First Name name
                            </span>
                        )
                     }
                </div>

                {/* lastname */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='lastName' className="lable-style">Last Name</label>
                    <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Enter your last name'
                    className="form-style"
                    {...register("lastName", {required: true})}
                     />
                     {
                        errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your last name
                            </span>
                        )
                     }
                </div>
            </div>

            {/* email */}
            <div className="flex flex-col gap-2">
                <label htmlFor='email' className="lable-style">Enter your email</label>
                <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email address'
                className="form-style"
                {...register("email", {required: true})}
                 />
                 {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please enter your email</span>
                    )
                 }
            </div>

            {/* phoneNo && country Code */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='phoneNo' className="lable-style">Phone Number</label>

                <div className='flex gap-5'>
                    {/* countryCode */}
                    <div className="flex w-[81px] flex-col gap-2">
                        <select 
                        name='countryCode' id='countryCode'
                        className="form-style"
                        {...register("countryCode", {required: true})}
                        >
                            {
                                countrycode.map((ele, index) => {
                                    return (
                                        <option key={index} value={ele.code} 
                                        selected = {ele.code === "+91"}
                                        >
                                            {ele.code} - {ele.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {/* phoneNo */}
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                        type='tel'
                        name='phoneNo'
                        id='phoneNo'
                        placeholder='12345 67890'
                        className="form-style"
                        {...register("phoneNo", {required: true})}
                        />
                        {
                            errors.phoneNo && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Phone No.
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* messageBox */}
            <div className="flex flex-col gap-2">
                <label htmlFor='message'>Message:</label>
                <textarea
                name='message'
                id='message'
                placeholder='Enter your message'
                rows="7"
                cols="30"
                className="form-style"
                {...register("message", {required: true})}
                 />
                 {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please write a message for us.</span>
                    )
                 }
            </div>

            <button type='submit'
            disabled={loading}
           className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default ContactUSForm