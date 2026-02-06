import './globals.css';
import '@/styles/theme.css';
import Header from './components/Header';
import Footer from './components/Footer';
import siteConfig from '@/config/siteConfig';

export const metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords.join(', '),
    authors: [{ name: siteConfig.author }],
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.websiteUrl,
        siteName: siteConfig.companyName,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
    },
    icons: {
        icon: siteConfig.logo.favicon,
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
