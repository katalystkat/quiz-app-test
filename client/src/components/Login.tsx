import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png';
import styles from '../styles/login.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate, passwordValidate } from '../helper/validate'
type Props = {}


export default function Login({}: Props) {

    // update formik helper functions to be combined into one validation function
  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
    },
    validate: passwordValidate, 
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
        console.log(values)
    }
  })
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
                    <div className="logo flex justify-center py-4">
                        <img src={logo} className={styles.logo_img} alt="logo of a plant" />
                    </div>
                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder="Username"/>
                        <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder="Password"/>
                        <button className={styles.btn} type="submit"><Link to="/quiz">Login</Link></button>
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