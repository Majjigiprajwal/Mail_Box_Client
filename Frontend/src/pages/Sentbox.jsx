import React, { useState, useEffect } from 'react';
import EmailCard from '../components/EmailCard';
import axios from 'axios';

const Sentbox = () => {
  const [emails, setEmails] = useState([]);
  
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/mail/sentMails',{
        headers :{
          'Authorization' :`Bearer ${token}`
        }
    });
    
      setEmails(response.data.emails);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const handleStarClick = async (id) => {
    try {
      await axios.post(`http://localhost:4000/api/mail/${id}/star`,{},{
        headers :{
          'Authorization' :`Bearer ${token}`
        }
    });
      fetchEmails(); 
    } catch (error) {
      console.error('Error starring email:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/mail/${id}`,{
        headers :{
          'Authorization' :`Bearer ${token}`
        }
    });
      fetchEmails();
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };
  console.log(emails)
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Sentbox</h1>
      {emails?.map((email) => (
        <EmailCard
          key={email._id}
          email={email}
          onStarClick={handleStarClick}
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
};

export default Sentbox;
