export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, phone, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // TODO: Implement email sending or database storage logic
        console.log('Contact form submission:', { name, email, phone, message });

        res.status(200).json({
            success: true,
            message: 'Thank you for contacting us. We will get back to you soon.'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
