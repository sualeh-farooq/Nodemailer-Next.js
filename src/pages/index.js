import { useState } from 'react';
import {toast , ToastContainer} from 'react-toastify'
const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      toast.success("Email Sent Succesfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setName('')
      setEmail('')
      setMessage('')
      setIsLoading(false)

    } else {
      alert('Something went wrong')

      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <>
      {isLoading ? (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <p>Loading ....</p>
        </div>
      ) : null}
      
      <form style={{ opacity: isLoading ? 0.5 : 1 }} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit" disabled={isLoading}>Send</button>

        <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="colored"
              />
      </form>
    </>
  );
  
}  

export default ContactForm