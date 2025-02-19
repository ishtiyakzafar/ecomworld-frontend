import React from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import './ContactUs.scss';

const ContactUs = () => {
  return (
    <div className='contactUsPage'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <SectionHeading title='Visit Our Store' />
            <div className='visit_store'>
              <div className='info'>
                <p>Address</p>
                <span>66 Mott St, New York, New York, Zip Code: 10006, AS</span>
              </div>
              <div className='info'>
                <p>Email</p>
                <span>EComposer@example.com</span>
              </div>
              <div className='info'>
                <p>Open Time</p>
                <span>Our store has re-opened for shopping, exchange Every day 11am to 7pm</span>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='contactForm'>
              <SectionHeading title='Get in Touch' />
              <p>If you’ve got great products your making or looking to work with us then drop us a line.</p>
              <form className="row g-3">
                <div className="col-md-6">
                  <label for="inputname" className="form-label">Name</label>
                  <input required type="text" className="form-control" id="inputname" />
                </div>

                <div className="col-md-6">
                  <label for="inputEmail4" className="form-label">Email</label>
                  <input required type="email" className="form-control" id="inputEmail4" />
                </div>

                <div className="col-12">
                  <label for="inputMessage" className="form-label">Message</label>
                  <textarea required type="text" className="form-control" id="inputMessage" placeholder="1234 Main St" />
                </div>

                <div className="col-12">
                  <button type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='google_map'>
        <iframe
          title="hello"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14652.389139777368!2d85.32395955!3d23.34848975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e05345bca6e1%3A0x2c70c527fab598e2!2sDAV%20Kapil%20Dev%20Public%20school!5e0!3m2!1sen!2sin!4v1733564995471!5m2!1sen!2sin"
          width="100%"
          height="600"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ display: 'block', margin: '0', padding: '0', border: 'none' }}
        ></iframe>
      </div>

      <div className='socialIcon'>
        <i className="fab fa-facebook-f"></i>
        <i className="fa-brands fa-x-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-youtube"></i>
        <i className="fa-brands fa-pinterest"></i>
      </div>
    </div>
  )
};

export default ContactUs;