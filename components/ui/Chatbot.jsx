"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X } from "lucide-react";

// FAQ data remains the same
const faqData = [
  {
    question: "What is the club about?",
    answer:
      "We are a student-run robotics club focusing on innovation and competitions, creating cutting-edge projects.",
    type: "text",
  },
  {
    question: "How can I join the club?",
    answer: "You can fill out the membership form here: /join",
    type: "text",
  },
  {
    question: "What are the ongoing events?",
    redirect: "/events",
    type: "link",
  },
  {
    question: "Can I see your projects?",
    redirect: "/projects",
    type: "link",
  },
];

// Bot logo component with spinning animation
const ChatbotIcon = () => (
  <img 
    src="/botlogo.png" 
    alt="Bot Logo" 
    className="spinning-logo"
  />
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm the ITER Robotics Club Bot. How can I assist you today?" }
  ]);
  const [isRinging, setIsRinging] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  // Trigger ringing animation on component mount
  useEffect(() => {
    const startRinging = () => {
      setIsRinging(true);
      // Stop ringing after animation completes
      setTimeout(() => setIsRinging(false), 3000);
    };

    // First ring after 1 second
    const timer1 = setTimeout(startRinging, 1000);
    
    // Ring again every 30 seconds to catch attention
    const interval = setInterval(startRinging, 30000);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClick = (item) => {
    if (item.type === "text") {
      setMessages((prev) => [...prev, { from: "user", text: item.question }]);
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text: item.answer }]);
      }, 500); // Simulate bot "thinking"
    } else if (item.type === "link") {
      window.location.href = item.redirect;
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={handleToggle} 
          className={`chatbot-toggle-button ${isRinging ? 'ringing' : ''}`} 
          aria-label="Open Chatbot"
        >
          <ChatbotIcon />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h4 className="chatbot-title">
              <Bot size={22} />
              <span>IRC Bot</span>
            </h4>
            <button onClick={handleToggle} className="chatbot-close-button" aria-label="Close Chatbot">
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.from === "bot" ? "bot" : "user"}`}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-buttons-grid">
            {faqData.map((item, index) => (
              <button key={index} onClick={() => handleClick(item)} className="chatbot-question-button">
                {item.question}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}