import React from 'react'
import { useSelector } from 'react-redux'
import ReactStars from  "react-stars"
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeCart } from '../../../../Slices/cartSlice'
import { useDispatch } from 'react-redux'

function RenderCartCourses() {
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.cart);
  return (
    <div className="flex flex-1 flex-col">
        {
            cart.map((course, indx) => {
                return (
                    <div
                    key={course._id}
                    className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                                    indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                                } ${indx !== 0 && "mt-6"} `}
                    >
                        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                            <img src={course?.thumbnail}
                            alt='courseThumbnail'
                            className="h-[148px] w-[220px] rounded-lg object-cover"
                             />
                             
                             <div  className="flex flex-col space-y-1">
                                <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                                <p className="text-sm text-richblack-300">{course?.category.name}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-5">4.8</span>
                                    <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor = "#ffd700"
                                    emptyIcon = {<GiNinjaStar />}
                                    fullIcon = {<GiNinjaStar />}
                                    />

                                    <span className="text-richblack-400"> {course?.ratingAndReviews?.length} Ratings</span>
                                </div>
                             </div>
                        </div>

                        <div>
                            <button
                            onClick={() => dispatch(removeCart(course))}
                            >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>

                            <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {course?.price}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default RenderCartCourses