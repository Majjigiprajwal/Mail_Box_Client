import React from 'react';
import { FaStar, FaRegStar, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmailCard = ({ email, onStarClick, onDeleteClick,showStar = true, showDelete = true,}) => {
  const { _id, subject, body, read, starred, sentAt } = email;

  const navigate = useNavigate()
  let snippet = body.substring(0,100)+'...'

  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 mb-4 transition duration-300 ease-in-out ${read ? 'bg-gray-50' : 'bg-white'}`}
      onClick={()=>navigate(`/EmailDetails/${_id}`)}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-emerald-400">New User</h4>
        <div className="flex items-center">
          {showStar && <button onClick={(e) =>{
            e.stopPropagation();
            onStarClick(_id)}} 
            className="mr-5">
            {starred ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-400" />}
          </button> }
          {showDelete &&<button onClick={(e) =>{
             e.stopPropagation();
             onDeleteClick(_id)}} 
             className="mr-2">
            <FaTrash className="text-red-400" />
          </button> }
          <span className="text-sm font-semibold text-gray-500 ml-2">{new Date(sentAt).toLocaleDateString()}</span>
        </div>
      </div>
      <h5 className={`text-md font-medium ${read ? 'text-gray-600' : 'text-black'}`}>{subject}</h5>
      <p className="text-sm text-gray-500 mt-1">{snippet}</p>
    </div>
  );
};

export default EmailCard;
