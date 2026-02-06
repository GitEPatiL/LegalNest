export default function handler(req, res) {
    if (req.method === 'POST') {
        // Simulate backend processing delay
        setTimeout(() => {
            // In a real scenario, this would handle DB insertion or email sending
            console.log('Contact form received:', req.body);

            // Basic validation simulation
            if (!req.body.email || !req.body.name) {
                return res.status(400).json({ success: false, message: 'Missing fields' });
            }

            res.status(200).json({
                success: true,
                message: 'Message received successfully',
                data: req.body
            });
        }, 1000);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
