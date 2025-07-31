import { toast } from "react-toastify";

import { course_Endpoints } from "../apis"
import {apiConnector} from "../apiConnector"
import { setLoading } from "../../Slices/authSlice";



export const fetchInstructorCourses = async () =>{
    let result = [];
        try {
            const response  = await apiConnector("GET", course_Endpoints.INSTRUCTOR_COURSES);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.data;

        } catch (error) {
            console.log(error);
            toast.error("Cant fetch all the courses");
        }

        return result;
    };

export const courseDelete =  (courseId) => {
    const toastID = toast.loading("Loading...");
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {

            const response = await apiConnector("DELETE", course_Endpoints.DELETE_COURSE, {courseId});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Course Deleted Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to Delete Course");
        }finally {
            dispatch(setLoading(false)); 
            toast.dismiss(toastID);
        }
    }
};

export const fetchCategory = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", course_Endpoints.SHOW_ALL_CATEGORY);
        console.log(response.data.allCategory);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.allCategory;

        
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
    return result;
}