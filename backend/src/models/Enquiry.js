import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    service: {
        type: String,
        trim: true,
    },
    details: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'converted', 'closed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Enquiry = mongoose.model('Enquiry', EnquirySchema);

export default Enquiry;
