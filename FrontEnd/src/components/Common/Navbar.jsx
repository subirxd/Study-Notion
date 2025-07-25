import React, { use } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsChevronDown } from "react-icons/bs"

import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../Services/apiConnector'
import { categories } from '../../Services/apis'

function Navbar() {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();


    const [subLinks, setSubLinks] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await apiConnector("GET", categories.CATEGORIES_API);
                setSubLinks(result.data.allCategory);
            } catch (error) {
                console.log("Could not fetch the catrgory list");
            }
        };
        fetchCategories();
    }, []);

      const matchRoute = (route) => {
         if (typeof route !== 'string' || route.trim() === '') {
        return null;
        }
        return matchPath({ path: route }, location.pathname)
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className='w-11/12 max-w-max-content mx-auto flex flex-row items-center justify-between'>
            <Link to={"/"}>
                    <img src={logo} 
                        width={160} height={42} loading='lazy'
                    />
            </Link>
            {/* navbar links */}
            <nav>
                <ul className='flex flex-row gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    {link.title === "Catalog" ? (
                                        <div className='flex items-center cursor-pointer gap-x-1 group relative'>
                                            <p> {link.title}</p>
                                            <BsChevronDown />

                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] 
                                            translate-x-[-50%] translate-y-[3em] flex-col rounded-lg 
                                            bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all 
                                            duration-150 group-hover:visible group-hover:translate-y-[1.65em] 
                                            group-hover:opacity-100 lg:w-[300px]">

                                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">
                                            </div>

                                            {/* TODO: STYLING */}

                                            <div>
                                                {
                                                    subLinks.length ? (
                                                            subLinks?.map((subLink, index) => (
                                                                <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                                    <p> {subLink.name} </p>
                                                                </Link>
                                                            ))
                                                    ) : (<div></div>)
                                                }
                                            </div>

                                            </div>

                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-5"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )}
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>


            {/* dashboard */}
            <div className='flex flex-row gap-x-4 items-center'>
                {
                    user && user.accountType != "Instructor" && (
                        <Link to={"/dashboard/cart"}
                        className='relative'
                        >
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100"  />
                            {
                                totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 cursor-pointer">
                                Login
                            </button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 cursor-pointer">
                                Sign Up
                            </button>
                        </Link>
                    )
                }

                { token != null && ( <ProfileDropDown /> ) }
            </div>
        </div>
    </div>
  )
}

export default Navbar