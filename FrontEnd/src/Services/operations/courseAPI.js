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
        toast.error(error.response.data.message);
    }
    return result;
}

export const addCourseDetails = async(formData) =>{
    const toastId = toast.loading("Loading....");
    let result = null;

        try {
            const response = await apiConnector("POST", course_Endpoints.CREATE_COURSE, formData);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Course details added successfully");
            result = response?.data?.course;
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        return result;
};

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
            const response = await apiConnector("GET", course_Endpoints.GET_COURSE_DETAILS, {
            courseId,
            })
            console.log("COURSE_DETAILS_API API RESPONSE............", response)

            if (!response.data.success) {
            throw new Error(response.data.message)
            }
            result = response.data
    } catch (error) {
            console.log("COURSE_DETAILS_API API ERROR............", error)
            result = error.response.data
            toast.error(error.response.data.message);
    }
        toast.dismiss(toastId)
        return result
};

export const getAllCourse = async () => {
    let result = null;
    const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("GET", course_Endpoints.GET_ALL_COURSE);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response?.data?.data;
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
};

export const editCourseDetails = async(data) => {
    let result = null;
    const toastId = toast.loading("Loading...");

        try {
            const response = await apiConnector("PUT", course_Endpoints.EDIT_COURSE, {data});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response?.data?.data;
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

        toast.dismiss(toastId);
        return result;
}

export const createSection = async(data) => {
    let result = null;
    toast.loading("Loading...");

        try {
            const response = await apiConnector("POST", course_Endpoints.ADD_SECTION, {data});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response?.data?.section;

            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
};

export const createSubSection = async(data) => {
    let result = null;
    const toastID = toast.loading("Loading...");

          try {
            const response = await apiConnector("POST", course_Endpoints.ADD_SUB_SECTION, {data});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response?.data?.data;
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

        toast.dismiss(toastID);
        return result;
};

// update a section
export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("PUT", course_Endpoints.UPDATE_SECTION, data, {
        Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", course_Endpoints.UPDATE_SUB_SECTION, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", course_Endpoints.DELETE_SECTION, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", course_Endpoints.DELETE_SUB_SECTION, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector(
      "GET",
      course_Endpoints.GET_FULL_COURSE_DETAILS,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
     toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  return result
}

export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", course_Endpoints.UPDATE_COURSE_PROGRESS, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}


export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", course_Endpoints.CREATE_RATING, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}