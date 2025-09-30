// Import your global styles first
import './globals.css';

// Import the dark background style to make it available globally
import './dark-background.css'; 

// Your existing chatbot styles
import "../components/ui/chatbot.css";
import Chatbot from "../components/ui/Chatbot";

export const metadata = {
  title: 'ITER Robotics Club',
  description: 'From autonomous bots to national competitions — we engineer solutions that inspire the future.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* All your page content will be rendered here */}
        {children} 
        
        {/* The chatbot will appear on every page */}
        <Chatbot />
      </body>
    </html>
  )
}