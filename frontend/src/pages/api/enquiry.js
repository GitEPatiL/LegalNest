export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, service, city, message } = req.body;

        // Validate input
        if (!name || !email || !service) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // TODO: Implement enquiry processing logic
        console.log('Enquiry form submission:', { name, email, phone, service, city, message });

        res.status(200).json({
            success: true,
            message: 'Thank you for your enquiry. Our team will contact you shortly.'
        });
    } catch (error) {
        console.error('Enquiry form error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
