import React, { useState, useEffect } from 'react';
import EmailCard from '../components/EmailCard';
import axios from 'axios';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    fetchEmails();
    fetchEmailEveryTwoMinutes()
  }, []);
     
      const fetchEmailEveryTwoMinutes = ()=>{
        setInterval(()=>{
          fetchEmails()
        },20000)
      }

  const fetchEmails = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/mail',{
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

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Inbox</h1>
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

export default Inbox;

