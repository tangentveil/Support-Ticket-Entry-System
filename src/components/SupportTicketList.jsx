// src/components/SupportTicketList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./SupportTicketList.css";

const SupportTicketList = ({supportAgents}) => {
  const [supportTickets, setSupportTickets] = useState([]);

  const fetchSupportTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/support-tickets/alltickets"
      );
      setSupportTickets(response.data);
    } catch (error) {
      console.error("Error fetching support tickets:", error);
    }
  };

  useEffect(() => {
    
    fetchSupportTickets();
  }, []);

  const isNewTicket = (createdAt) => {
    // Check if the ticket was created within the last hour
    const oneHourAgo = moment().subtract(1, "hour");
    return moment(createdAt).isAfter(oneHourAgo);
  };

  const isTicketInactive = (updatedAt) => {
    // Check if the ticket status has not changed in the last 2 days
    const twoDaysAgo = moment().subtract(2, 'days');
    return moment(updatedAt).isBefore(twoDaysAgo);
  };

  const getNextAgent = () => {
    // Round-robin assignment logic to get the next available support agent
    const activeAgents = supportAgents.filter((agent) => agent.active);
    const nextAgentIndex = (activeAgents.length > 0)
      ? (supportAgents.indexOf(activeAgents[0]) + 1) % activeAgents.length
      : 0;

    return activeAgents[nextAgentIndex]._id;
  };

  const handleRoundRobinAssignment = async () => {
    // Check for inactive tickets and reassign them using round-robin logic
    const inactiveTickets = supportTickets.filter((ticket) => isTicketInactive(ticket.updatedAt));

    if (inactiveTickets.length > 0) {
      // Assign each inactive ticket to the next available support agent
      for (const ticket of inactiveTickets) {
        try {
          await axios.put(`http://localhost:5000/support-tickets/${ticket._id}`, {
            assignedTo: getNextAgent(),
            updatedAt: moment().toISOString(), // Update the ticket's updatedAt timestamp
          });

          // Refresh the list of support tickets after updating
          await fetchSupportTickets();
        } catch (error) {
          console.error('Error updating support ticket:', error);
        }
      }
    }
  };

  useEffect(() => {
    const roundRobinInterval = setInterval(() => {
      handleRoundRobinAssignment();
    }, 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds

    return () => clearInterval(roundRobinInterval);
  }, []);

  return (
    <div className="support-ticket-list-container">
      <h2 className="support-ticket-header">Support Tickets</h2>
      <ul>
        {supportTickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>Topic:</strong> {ticket.topic}
            <br />
            <strong>Description:</strong> {ticket.description}
            <br />
            <strong>Date Created:</strong>{" "}
            {moment(ticket.dateCreated).format("YYYY-MM-DD HH:mm:ss")}
            <br />
            <strong>Severity:</strong> {ticket.severity}
            <br />
            <strong>Type:</strong> {ticket.type}
            <br />
            <strong>Assigned To:</strong> {ticket.assignedTo}
            <br />
            <strong>Status:</strong>{" "}
            {isNewTicket(ticket.dateCreated) ? (
              <p className="new-status">New</p>
            ) : (
              ticket.status
            )}
            <br />
            {ticket.status === "Resolved" && (
              <div>
                <strong>Resolved On:</strong>{" "}
                {moment(ticket.resolvedOn).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupportTicketList;
