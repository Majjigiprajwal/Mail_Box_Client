const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EmailSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  starred: {
    type: Boolean,
    default: false
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  senderTrash: {
    type: Boolean,
    default: false
  },
  recipientTrash: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model('Email', EmailSchema);