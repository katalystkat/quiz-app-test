import React, {useState} from 'react'
import {Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import styles from '../styles/login.module.css';
// import { Toaster } from 'react-hot-toast';
import toast, {Toaster} from 'react-hot-toast'
import { useFormik } from 'formik';
import { usernameValidate, passwordValidate } from '../helper/validate'
import { authenticate, loginUser } from '../helper/apiCalls';
import jwt_decode from 'jwt-decode'
import { useAppDispatch } from '../redux/hooks';
import { setUserId } from '../redux/reducers/resultsReducer';
import Token from '../types/tokenTypes';
type Props = {}


export default function Login({}: Props) {

    // update formik helper functions to be combined into one validation function
    // const history = useHistory();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        // validate: passwordValidate, 
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values =>{
            // console.log(values)
            try{ 
                // console.log('log in button clicked')
                const response = await loginUser(values);
                if (response.data) {
                    const userId = response.data.id;
                    localStorage.setItem('userId', userId);
                    toast.success('Login Success! Please wait for redirect!')
                    // console.log('localStorage success: ' + localStorage.getItem('userId'))
                    setIsLoggedIn(true);
                    navigate('/quiz');
                } else {
                    return toast.error("Invalid Login Credentials!")
                }
            } catch (error) {
                console.log(error)
            }
        }
    });
  return (
    <div className="container mx-auto">
        <Toaster position ="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center h-screen items-center">
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h2 className="text-5xl font-bold">Quiz App Title</h2>
                    <span className="text-xl text-center w-2/3">Quiz Information and introduction</span>
                </div>
                <form className="py-1" onSubmit={formik.handleSubmit}>
                {/* <form className="py-1" onSubmit={()=>{console.log('onsubmit')}}> */}

                    <div className="logo flex justify-center py-4">
                        <img src={logo} className={styles.logo_img} alt="logo of a plant" />
                    </div>
                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder="Username"/>
                        <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder="Password"/>
                        <button className={styles.btn} type="submit">Login</button>
                    </div>
                    <div className="text-center py-4">
                        <span> <Link className="text-xl text-green-800" to="/register">Register Instead</Link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}