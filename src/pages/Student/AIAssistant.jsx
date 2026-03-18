import React from 'react';
import AIChat from '../../components/AIChat';

export default function AIAssistant() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          🤖 AI Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          CampusFlow AI - Fees, Attendance, Placement, TC &amp; Study help in Hindi/English
        </p>
      </div>
      <AIChat />
    </div>
  );
}
