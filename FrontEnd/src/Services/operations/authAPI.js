import { toast, ToastContainer } from 'react-toastify';
import {setLoading, setToken} from "../../Slices/authSlice"
import { apiConnector } from '../apiConnector';
import { endpoint } from '../apis';

const {RESETPASSWORD_TOKEN, RESETPASSWORD_API ,SIGNUP_API, LOGIN_API, OTP_API} = endpoint;

export function getPasswordResetToken(email, setEmailSend){
    
    return async (dispatch) => {
       dispatch(setLoading(true));
       try {

            const response = await apiConnector("POST", RESETPASSWORD_TOKEN, {email});

            console.log("Reset password token response: ", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSend(true);
       } catch (error) {
            console.log("Reset password token error: ", error);
            toast.error(error.response.data.message);
       }

       dispatch(setLoading(false));
    }

};

export function passwordReset(formData, token, navigate){
    const {password, confirmPassword} = formData;
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
            console.log("Password Reset Response: ", response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password reset successfully");
            navigate('/login');
            
        } catch (error) {
            console.log("Error in resetpassword: ", error);
            toast.error(error.response.data.message);
        }

        dispatch(setLoading(false));
    }
};

export function signUp(singupData, otp, navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const {accountType, firstName, lastName, email, password, confirmPassword} = singupData;

        try {
            const response = await apiConnector("POST", SIGNUP_API, {accountType, firstName, lastName, email, password, confirmPassword, otp});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account Created SuccessFully");
            navigate("/login");
        } catch (error) {
            console.log("Error in account creation: ", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
    }
};

export function sendOTP(email, navigate){
    return async (dispatch)=> {
       dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", OTP_API, {email});

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            if(navigate){
                navigate("/verify-email");
            }
        } catch (error) {
            console.log("Error in sending otp", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
    }
}