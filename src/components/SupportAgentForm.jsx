import React, { useState } from 'react';
import axios from 'axios';
import './SupportAgentForm.css';

const SupportAgentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    // Basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    // Basic phone number validation
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and phone
    const emailError = validateEmail(formData.email) ? '' : 'Invalid email format';
    const phoneError = validatePhone(formData.phone) ? '' : 'Invalid phone number';

    setErrors({
      email: emailError,
      phone: phoneError,
    });

    // If there are validation errors, prevent form submission
    if (emailError || phoneError) {
      alert(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/support-agents/agent', formData);
      console.log('Support Agent created:', response.data);
      // Optionally, you can redirect or show a success message
      alert("Agent Created");
    } catch (error) {
      console.error('Error creating Support Agent:', error);
      // Handle error: show error message or redirect to an error page
    }
  };

  return (
    <div className="agent_form_container">
      <h2>Create Support Agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Support Agent</button>
      </form>
    </div>
  );
};

export default SupportAgentForm;
