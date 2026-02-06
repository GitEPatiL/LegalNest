const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
    },
    service: {
        type: String,
        required: [true, 'Service type is required'],
    },
    city: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'in-progress', 'completed'],
        default: 'new',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Enquiry', enquirySchema);
