import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png';
import styles from '../styles/home.module.css';
import { checkLogin } from '../helper/loginStatus';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
type Props = {}

export default function Home({}: Props) {
const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="container mx-auto">
        <div className="flex justify-center h-screen items-center">
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h2 className={styles.appTitle}>Quiz App Title</h2>
                    <span className="text-xl text-center w-2/3">Quiz Information and introduction</span>
                </div>
                <form className="">
                    <div className="logo flex justify-center py-4">
                        <img src={logo} className={styles.logo_img} alt="logo of a plant" />
                    </div>
                    <div className="flex flex-col items-center">
                        <button className={styles.btn}> <Link to={(checkLogin() ? '/quiz' : '/login')}> Take the Quiz </Link></button>
                    </div>
                    <div className="text-center py-4">
                        <span><Link className="text-green-900" to="/register">Register Now</Link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}