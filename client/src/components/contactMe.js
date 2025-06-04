// src/components/ContactForm.js
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to send.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Your message..." value={formData.message} onChange={handleChange} required />
      <button type="submit">Send</button>
      <p>{status}</p>
    </form>
  );
};

export default ContactForm;


{/* <div>
        <div className='spaceWeatherHeader'> 
        <h1>This Page is under construction!!</h1>
        </div>
      <div class="videos">
        <form onSubmit={this.handleSubmit}>
          <div >
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      </div> */}