import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Socially',
	description: 'Social media website',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<div className='min-h-screen'>
							<Navbar />
							<div className='max-w-7xl mx-auto px-4 my-8'>
								<div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
									<div className='hidden lg:block lg:col-span-3'>
										<Sidebar />
									</div>
									<div className='lg:col-span-9'>{children}</div>
								</div>
							</div>
						</div>
            <Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
