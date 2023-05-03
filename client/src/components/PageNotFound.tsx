import React from 'react'
import styles from '../styles/home.module.css';
import logo from '../assets/kiwibird.png';

export default function PageNotFound() {

return (
  <div className="container mx-auto">
      <div className="flex justify-center h-screen items-center">
          <div className={styles.glass}>
              <div className="title flex flex-col items-center">
                  <h2 className={styles.appTitle}>Kiwi-rious Kwizzers</h2>
                  <span className='text-l text-cente'>The page you're looking for doesn't exist..... yet!</span>
                  
              </div>
                  <div className="logo flex justify-center py-4">
                      <img src={logo} className={styles.logo_img} alt="logo of a plant" />
                  </div>
                 
          </div>
      </div>
  </div>
)
}