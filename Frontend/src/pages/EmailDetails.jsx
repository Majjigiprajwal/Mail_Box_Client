import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaRegStar, FaTrash } from 'react-icons/fa';

const EmailDetails = () => {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmailDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/mail/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEmail(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching the email details');
      } finally {
        setLoading(false);
      }
    };

    fetchEmailDetails();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p>{error}</p></div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{email.subject}</h1>
        <div className="flex items-center">
          {email.starred ? <FaStar className="text-yellow-400 mr-4" /> : <FaRegStar className="text-gray-400 mr-4" />}
          <FaTrash className="text-red-400 cursor-pointer" />
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <p><strong>From:</strong> {email.sender}</p>
        <p><strong>To:</strong> {email.recipient}</p>
        <p><strong>Sent:</strong> {new Date(email.sentAt).toLocaleString()}</p>
      </div>
      <div className="text-gray-700 whitespace-pre-line">
        {email.body}
      </div>
    </div>
  );
};

export default EmailDetails;
