import React, { useState, useEffect } from 'react';
import EmailCard from '../components/EmailCard';
import axios from 'axios';

const Bin = () => {
  const [emails, setEmails] = useState([]);
  
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/mail/bin',{
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

  
  

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Sentbox</h1>
      {emails?.map((email) => (
        <EmailCard
          key={email._id}
          email={email}
          showStar={false}
        />
      ))}
    </div>
  );
};

export default Bin;
