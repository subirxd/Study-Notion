import mongoose from "mongoose";
import razorpayInstance from "../Config/razorpay.js";
import { CourseModel } from "../Models/course.js";
import { UserModel } from "../Models/user.js";
import mailSender from "../Utils/mailSender.js";
import { courseEnrollmentEmail } from "../mail/template/courseEnrollmentEmail.js";
import { paymentSuccessEmail } from "../mail/template/paymentSuccessful.js";

export async function capturePayment(req, res) {
    try {
        
        //get course_id and user_id
        const {courseID} = req.body;
        const userID = req.user.id;
        //validate both the id's
        if(!courseID){
            return res.status(404).json({
                success: false,
                message:"Please provide valid course id."
            });
        }
        //valid course_id
        let course;
        try {
            course = await CourseModel.findById(courseID);

            //valid courseDetail
            if(!course){
                return res.status(404).json({
                    success: false,
                    message: "Could not find the course."
                });
            }

            //user already pay for the same course
            const uid = new mongoose.ObjectId(userID);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled."
                });
            }

        } catch (error) {
            console.log("Error while fetching course details: ", error);
            return res.status(500).json({
                success: false,
                message:"Something went wrong."
            });
        }

        //order create
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseID: course._id,
                userID,
            }
        };

        try {
            //initiate the payment using razorpay
            const paymentResponse = await razorpayInstance.orders.create(options);
            console.log("Payment response:", paymentResponse);

            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                courseThumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            });


        } catch (error) {
            console.log("Error while initiating payment:", error);
            return res.json({
                success: false,
                message:"Could not initiate order."
            });
        };
        

    } catch (error) {
        console.log("Error while")
    }
};

//verify signature of razorpay and server
export async function verifySignature(req, res) {
    try {
        
        const webhookSecret = "12345678";
        const signature = req.headers["x-razorpay-signature"];

        const shaSum = crypto.createHmac("sha256", webhookSecret);
        shaSum.update(JSON.stringify(req.body));
        const digest = shaSum.digest("hex");

        if(signature === digest){
            console.log("Payment is authorised.");
            
            const {courseID, userID} = req.body.payload.payment.entity.notes;

            try {
                
                //find the course and enroll this student
                const enrolledCourse = await CourseModel.findOneAndUpdate({_id: courseID}, 
                                                                            {$push:{studentsEnrolled: userID}},
                                                                            {new: true},
                                                                        );
                
                if(!enrolledCourse){
                    return res.status(500).json({
                        success: false,
                        message: "Course enrollment not successfully."
                    });
                }      
                console.log("Enroll Course:", enrolledCourse);
                
                //find the student and add the course to their course array
                const enrolledStudent = await UserModel.findOneAndUpdate({_id: userID}, 
                                                                            {$push:{courses: courseID}},
                                                                            {new: true}
                                                                        );

                //send confirmation email
                const name = `${enrolledStudent.firstName} ${enrolledStudent.lastName}`;
                const emailResponse = await mailSender(enrolledStudent.email, `Purchase of ${enrolledCourse.name} is successfully`, courseEnrollmentEmail(enrolledCourse.name, name));

                //return response
                return res.status(200).json({
                    success: true,
                    message: "Signature Verified and Course Added."
                });
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Invalid signature.",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};