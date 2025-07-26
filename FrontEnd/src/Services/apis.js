const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
};

export const endpoint = {
    RESETPASSWORD_TOKEN : BASE_URL+"/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL+"/auth/reset-password",
    LOGIN_API : BASE_URL+"/auth/login",
    SIGNUP_API: BASE_URL+"/auth/signup",
    OTP_API: BASE_URL+"/auth/send-otp",
    CHANGEPASSWORD_API : BASE_URL+"/auth/change-password",
}

export const contactUS = {
    CONTACTUS_API : BASE_URL + "/contactus/contact",
}