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

export const Profile_Endpoints = {
    USER_DETAILS_API : BASE_URL + "/profile/getUserDetails",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
    ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    INSTRUCTOR_DASHBOARD_API: BASE_URL + "/profile/getInstructorDashboardDetails"
}