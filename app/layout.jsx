import "./globals.css";
import "../components/ui/chatbot.css"; // <-- ADD THIS LINE
import Chatbot from "../components/ui/Chatbot";

export const metadata = {
  title: "ITER Robotics Club",
  description:
    "From autonomous bots to national competitions — we engineer solutions that inspire the future.",
};

export default function RootLayout({ children }) {
  // The logic to hide the chatbot on the root page is no longer needed here,
  // as the component can handle its own state.
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}