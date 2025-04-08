import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const SendEmailComponent = () => {
  const [emailStatus, setEmailStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = 'service_g0vexlt';
    const templateID = 'template_4o8b0ow';
    const templateParams = {
      from_name: 'Breeze Express',
      user_name: 'test',
      to_email: 'caribwebcare@gmail.com',
      message: 'This is a test message from EmailJS!',
    };
    const publicKey = 'BpU8EGZzCEyBTg5mZ';  // Your public key from EmailJS dashboard

    emailjs.send(serviceID, templateID, templateParams, publicKey)
  .then((response) => {
    setEmailStatus('Email sent successfully!');
  })
  .catch((error) => {
    console.error('Failed to send the email. Error:', error);
    setEmailStatus(`Failed to send the email. Error: ${error.text || error.message}`);
  });

  };

  return (
    <div>
      <form onSubmit={sendEmail}>
        <button type="submit">Send Email</button>
      </form>
      {emailStatus && <p>{emailStatus}</p>}
    </div>
  );
};

export default SendEmailComponent;






