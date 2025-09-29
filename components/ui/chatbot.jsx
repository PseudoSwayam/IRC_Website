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

// A sleek, custom robot icon using SVG
const ChatbotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" /><path d="M20 14h2" />
    <path d="M15 13v2" /><path d="M9 13v2" />
  </svg>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm the ITER Robotics Club Bot. How can I assist you today?" }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

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
        <button onClick={handleToggle} className="chatbot-toggle-button" aria-label="Open Chatbot">
          <ChatbotIcon />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h4 className="chatbot-title">
              <Bot size={22} />
              <span>Robotics Club Bot</span>
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