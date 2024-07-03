import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FiSend } from 'react-icons/fi';
import axios from 'axios'

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const token = JSON.parse(localStorage.getItem('token'))

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);

    const content = convertToRaw(editorState.getCurrentContent());
    const body = JSON.stringify(content);

    try {
        await axios.post('http://localhost:4000/api/mail/sendMail', {
        recipient,
        subject,
        body
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
        setRecipient('');
        setSubject('');
        setEditorState(EditorState.createEmpty());
      
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while sending the email');
    } finally {
      setIsSending(false);
    }
  };


  return (
    <div className=" max-w-3xl mx-auto mt-4 p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">To</label>
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Recipient email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <div className="text-sm text-gray-500 mt-1">{subject.length} / 100</div>
        </div>

        <div className="mb-4 border rounded-lg">
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="w-full"
            editorClassName="px-4 py-2 min-h-[200px]"
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'emoji', 'image', 'remove', 'history'],
            }}
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-emerald-600 text-white py-2 px-4 rounded-full hover:bg-emerald-500 transition duration-300 flex items-center"
          >
            <FiSend className="mr-2 text-xl " disabled={isSending}/>
            <p className="">{isSending ? 'Sending...' : 'Send'}</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComposeMail;

