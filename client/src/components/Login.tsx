import React, {useState} from 'react'
import {Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../assets/kiwibird.png';
import styles from '../styles/home.module.css';
// import { Toaster } from 'react-hot-toast';
import toast, {Toaster} from 'react-hot-toast'
import { useFormik } from 'formik';
import { loginUser } from '../helper/apiCalls';
import { useAppDispatch } from '../redux/hooks';
type Props = {
    setIsLoggedIn: (loggedIn: boolean) => void;
}


export default function Login({setIsLoggedIn}:Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        // validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values =>{
            try{ 
                const response = await loginUser(values);
                if (response.data) {
                    const userId = response.data.id;
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('username', values.username);
                    toast.success('Login Success! Please wait for redirect!')
                    setIsLoggedIn(true)
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
                <h2 className={styles.appTitle}>Kiwi-rious Kwizzers</h2>
                    <span className="text-xl text-center w-2/3">Welcome to the "Kiwi-rious Quizzers" - a fun and educational quiz all about the fascinating world of kiwi birds and kiwi fruits!</span>
                </div>
                <form className="py-1" onSubmit={formik.handleSubmit}>
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