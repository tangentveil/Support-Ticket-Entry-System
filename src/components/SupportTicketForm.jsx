import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SupportTicketForm.css";
import SupportTicketList from "./SupportTicketList";

const SupportTicketForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    severity: "",
    type: "",
  });

  const [supportAgents, setSupportAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/support-agents/allagents`
        );
        const res = response.data;
        console.log(res);

        setSupportAgents(res);
      } catch (error) {
        console.log(`Error in Fetching Support Agents:`, error);
      }
    };

    fetchAgents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/support-tickets/allagents",
        ...formData
      );
      console.log("Support Ticket created:", response.data);
    } catch (error) {
      console.error("Error creating Support Ticket:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-container-1">
        <h2>Create Support Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
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
          <div className="form-group">
            <label htmlFor="severity">Severity:</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
            >
              <option value="">Select Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo">Assigned To:</label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="">Select Support Agent</option>
              {supportAgents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create Support Ticket</button>
        </form>
      </div>

      <SupportTicketList supportAgents={supportAgents} />
    </div>
  );
};

export default SupportTicketForm;
