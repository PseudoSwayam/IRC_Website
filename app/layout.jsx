import './globals.css'
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
        {children}
        <Chatbot />
      </body>
    </html>
  )
}