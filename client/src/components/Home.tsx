import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/kiwibird.png';
import styles from '../styles/home.module.css';
import { checkLogin } from '../helper/loginStatus';
type Props = {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

export default function Home({ isLoggedIn, setIsLoggedIn}: Props) {

    useEffect(() => {
        setIsLoggedIn(checkLogin());
    }, [isLoggedIn, setIsLoggedIn])
// const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div className="container mx-auto">
        <div className="flex justify-center h-screen items-center">
            <div className={styles.glass}>
                <div className="title flex flex-col items-center">
                    <h2 className={styles.appTitle}>Kiwi-rious Kwizzers</h2>
                    <span className="text-xl text-center w-2/3">Welcome to the "Kiwi-rious Quizzers" - a fun and educational quiz all about the fascinating world of kiwi birds and kiwi fruits!</span>
                </div>
                    <div className="logo flex justify-center py-4">
                        <img src={logo} className={styles.logo_img} alt="logo of a plant" />
                    </div>
                    <div className="flex flex-col items-center">
                        {/* <button className={styles.btn}> <Link to={(checkLogin() ? '/quiz' : '/login')}> Take the Quiz </Link></button> */}
                        <button className={styles.btn}>{
                        checkLogin() 
                            ? <Link to={'/quiz'}>Take the Quiz</Link> 
                            : <Link to={'/login'}>Login</Link>}
                        </button>
                    </div>
                    <div className="text-center py-4">
                        <span><Link className="text-green-900" to="/register">Register Now</Link></span>
                    </div>
            </div>
        </div>
    </div>
  )
}