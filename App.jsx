import React, { useState } from 'react';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import { MessageSquare, Users } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('contact');

  const handleSubmitMessage = (messageData) => {
    const newMessage = {
      id: Date.now(),
      ...messageData,
      submittedDate: new Date().toISOString()
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">ContactFlow</h1>
            </div>
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'contact'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Contact Form
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Dashboard</span>
                {messages.length > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {messages.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'contact' && (
          <Contact onSubmit={handleSubmitMessage} />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard messages={messages} />
        )}
      </main>
    </div>
  );
}

export default App;