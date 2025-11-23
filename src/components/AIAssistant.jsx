import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Chip,
  IconButton,
  Collapse
} from '@mui/material';
import {
  SmartToy,
  Send,
  ExpandMore,
  ExpandLess,
  TipsAndUpdates,
  TrendingUp,
  Schedule
} from '@mui/icons-material';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm your AI travel assistant. I can help you find the best routes, predict fare changes, and provide personalized recommendations. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const suggestions = [
    { icon: <TipsAndUpdates />, text: "Best time to book flights to Srinagar?" },
    { icon: <TrendingUp />, text: "Will train prices increase next week?" },
    { icon: <Schedule />, text: "Fastest route from Patna to Delhi?" }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateAIResponse = (message) => {
    const responses = [
      "Based on my analysis of current travel patterns, I'd recommend booking 3-4 weeks in advance for the best prices.",
      "I see fluctuating prices for that route. The optimal departure time would be Tuesday morning for cost savings.",
      "The fastest route combines high-speed rail with a short flight connection. Expected travel time: 4h 32min.",
      "Current fare prediction shows a 15% price increase likely in the next 5 days. I'd suggest booking soon.",
      "Alternative routes are available with better price-to-time ratios. Would you like me to show them?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  return (
    <Paper className="bg-gradient-card shadow-card rounded-2xl border border-border overflow-hidden">
      <div 
        className="p-4 border-b border-border cursor-pointer hover:bg-secondary/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="bg-gradient-primary">
              <SmartToy />
            </Avatar>
            <div>
              <Typography variant="h6" className="font-semibold text-foreground">
                AI Travel Assistant
              </Typography>
              <Typography variant="body2" className="text-muted-foreground">
                Get personalized travel insights
              </Typography>
            </div>
          </div>
          <IconButton>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
      </div>

      <Collapse in={isExpanded}>
        <div className="p-4">
          {/* Quick Suggestions */}
          <div className="mb-4">
            <Typography variant="body2" className="mb-2 text-muted-foreground">
              Quick Questions
            </Typography>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Chip
                  key={index}
                  icon={suggestion.icon}
                  label={suggestion.text}
                  variant="outlined"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="cursor-pointer hover:bg-primary/10"
                  size="small"
                />
              ))}
            </div>
          </div>

          {/* Messages */}
          <Box className="h-64 overflow-y-auto mb-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-primary text-white'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  <Typography variant="body2">
                    {message.content}
                  </Typography>
                  <Typography variant="caption" className="opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </div>
              </div>
            ))}
          </Box>

          {/* Input */}
          <div className="flex gap-2">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask me about routes, prices, or travel tips..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              size="small"
              className="bg-background"
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gradient-primary min-w-0 px-3"
            >
              <Send />
            </Button>
          </div>
        </div>
      </Collapse>
    </Paper>
  );
};

export default AIAssistant;