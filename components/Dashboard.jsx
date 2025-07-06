import React, { useState, useEffect } from "react";
import { Mail, User, Calendar, MessageCircle, Inbox, Link } from "lucide-react";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          "https://stack-backend-1-j3jf.onrender.com/api/messages"
        );
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-slate-600">
        Loading messages...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Message Dashboard
          </h2>
          <p className="text-lg text-slate-600">
            All submitted messages will appear here for easy management.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
          <Inbox className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No Messages Yet
          </h3>
          <p className="text-slate-600">
            When someone submits the contact form, their message will appear
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Message Dashboard
        </h2>
        <p className="text-lg text-slate-600">
          {messages.length} message{messages.length !== 1 ? "s" : ""} received
        </p>
      </div>

      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {getInitials(message.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                      <User className="h-4 w-4 text-slate-500" />
                      <span>{message.name}</span>
                    </h3>
                    <p className="text-slate-600 flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span>{message.email}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(message.createdAt)}</span>
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-start space-x-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-slate-500 mt-0.5" />
                  <h4 className="font-medium text-slate-900">Message</h4>
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap pl-7">
                  {message.message}
                </p>

                {message.url && (
                  <div className="mt-4 pl-7">
                    <a
                      href={message.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 flex items-center hover:underline"
                    >
                      <Link className="h-4 w-4 mr-1" />
                      {message.url}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
