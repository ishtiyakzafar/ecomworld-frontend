import React from 'react';
import s from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={s.footerSection}>
      <footer className='container'>
        <div className={s.address}>
          <h1>Ecom<span>World</span></h1>
          <p>Address: 1234 Fashion Street, Suite 567, New York, NY 10001</p>
          <p>Email: <span>info@fashionshop.com</span></p>
          <p>Phone: <span>(212) 555-1234</span></p>

          <h6>Follow Us</h6>
          <div className={s.socialIcons}>
            <i className="fab fa-facebook-f"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
            <i className="fa-brands fa-pinterest"></i>
          </div>

        </div>
        <div className={s.help}>
          <h6>Need Help</h6>
          <li>Privacy Policy</li>
          <li>Returns + Exchanges</li>
          <li>Track Order</li>
          <li>FAQ’s</li>
          <li>Career</li>
        </div>

        <div className={s.aboutus}>
          <h6>More Info</h6>
          <li>Our Story</li>
          <li>Visit Our Store</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </div>

        <div className={s.subscribe}>
          <h6>Sign Up for Email</h6>
          <p>Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!</p>
          <div className={s.subscribeInput}>
            <input type="text" placeholder='Enter your email...' />
            <button>Subscribe</button>
          </div>
        </div>
      </footer>
      <div className={s.copywright}>
        <p>Copyright © 2024 EcomWorld. All Rights Reserved.</p>
      </div>
    </div>
  )
};

export default Footer;