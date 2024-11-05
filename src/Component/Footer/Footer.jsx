import React from 'react'
import styles from './footer.module.scss';
function Footer() {
  return (
    <div  className={`bg-primary text-center ${styles.footer}`}>
        <h3>Created by <a href="https://www.facebook.com/people/RIB-DEV/61559278624770/">RIB DEV</a></h3>
    </div>
  )
}

export default Footer