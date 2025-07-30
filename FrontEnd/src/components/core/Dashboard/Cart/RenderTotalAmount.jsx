import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../Common/IconButton';

function RenderTotalAmount() {
    const {total, cart} = useSelector((state) => state.cart);
    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these courses", courses);
        //TODO: API integrate payment gateway.. 
    }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
        <p className="mb-6 text-3xl font-medium text-yellow-100"> RS {total} </p>

        <IconButton
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses={"w-full justify-center"}
         />
    </div>
  )
}

export default RenderTotalAmount