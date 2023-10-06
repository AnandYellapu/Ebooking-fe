import React from 'react';
import ContactForm from '../pages/ContactForm';

function ContactPage() {
  return (
    <div className='contact-page'>
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-description">Feel free to reach out to us with any questions or feedback.</p>
      <ContactForm />
    </div>
  );
}

export default ContactPage;
