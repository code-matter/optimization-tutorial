import Header from '@/components/header'
import './globals.css'

// Use by all pages in this layout that doesn't set up its own metadata
export const metadata = {
    title: 'NextPosts',
    description: 'Browse and share amazing posts.',
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    )
}
