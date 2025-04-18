import * as Sentry from '@sentry/browser';

// Simulate AI analysis for simplicity 
// In a real app, this would call an API with OPENAI_API_KEY
export const analyzeNoteContent = async (content) => {
  try {
    console.log('Analyzing note content...');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!content || content.length < 10) {
      return {
        summary: "The note content is too short for meaningful analysis.",
        topics: [],
        sentiment: "neutral",
        suggestions: ["Add more details to get better insights."]
      };
    }
    
    // Mock analysis based on content length and some keywords
    const hasQuestions = content.includes('?');
    const hasTodos = content.includes('- [ ]') || content.toLowerCase().includes('todo');
    const hasKeywords = [
      'important', 'critical', 'remember', 'don\'t forget', 
      'meeting', 'project', 'deadline', 'idea'
    ].some(keyword => content.toLowerCase().includes(keyword));
    
    const topics = [];
    if (content.toLowerCase().includes('work')) topics.push('Work');
    if (content.toLowerCase().includes('project')) topics.push('Project');
    if (content.toLowerCase().includes('meeting')) topics.push('Meeting');
    if (content.toLowerCase().includes('idea')) topics.push('Ideas');
    
    // Default topic if none detected
    if (topics.length === 0) topics.push('General');
    
    // Generate suggestions based on content
    const suggestions = [];
    if (hasQuestions) suggestions.push('Consider researching answers to your questions.');
    if (hasTodos) suggestions.push('Create a proper task list to track your todos.');
    if (content.length < 100) suggestions.push('Expand your notes with more details for better recall later.');
    if (hasKeywords) suggestions.push('This note contains important information you should review regularly.');
    
    // Simple sentiment analysis
    let sentiment = 'neutral';
    const positiveWords = ['great', 'good', 'excellent', 'happy', 'positive', 'success'];
    const negativeWords = ['bad', 'problem', 'issue', 'worry', 'fail', 'difficult'];
    
    const positiveCount = positiveWords.filter(word => content.toLowerCase().includes(word)).length;
    const negativeCount = negativeWords.filter(word => content.toLowerCase().includes(word)).length;
    
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';
    
    // Create a reasonable summary based on the first 100 characters
    const summaryBase = content.slice(0, 100).trim();
    const summary = summaryBase + (content.length > 100 ? '...' : '');
    
    return {
      summary,
      topics,
      sentiment,
      suggestions: suggestions.length > 0 ? suggestions : ["Your note looks good!"],
    };
  } catch (error) {
    console.error('Error analyzing note content:', error);
    Sentry.captureException(error);
    return {
      summary: "Failed to analyze note content.",
      topics: [],
      sentiment: "neutral",
      suggestions: ["Try again later."]
    };
  }
};

// In a real implementation, this would use your OpenAI API key
export const generateContentSuggestions = async (prompt) => {
  try {
    console.log('Generating content suggestions...');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!prompt || prompt.length < 5) {
      return ["Please provide a more detailed prompt for suggestions."];
    }
    
    // Mock some reasonable responses based on simple prompt analysis
    if (prompt.toLowerCase().includes('meeting')) {
      return [
        "## Meeting Agenda Template\n\n- Attendees:\n- Objectives:\n- Discussion Points:\n- Action Items:\n- Next Steps:",
        "Remember to follow up with meeting participants within 24 hours.",
        "Consider recording key decisions and who is responsible for each action item."
      ];
    }
    
    if (prompt.toLowerCase().includes('idea') || prompt.toLowerCase().includes('brainstorm')) {
      return [
        "Try the SCAMPER technique: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse.",
        "Consider mapping your ideas visually to see connections between concepts.",
        "For each idea, ask: What problem does it solve? What value does it provide? Is it feasible?"
      ];
    }
    
    if (prompt.toLowerCase().includes('todo') || prompt.toLowerCase().includes('task')) {
      return [
        "Prioritize tasks using the Eisenhower Matrix: Urgent/Important, Not Urgent/Important, Urgent/Not Important, Not Urgent/Not Important.",
        "Break down large tasks into smaller, manageable steps.",
        "Consider using the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break."
      ];
    }
    
    // Default suggestions
    return [
      "Elaborate on your key points with specific examples.",
      "Consider organizing your notes with headings and bullet points for better readability.",
      "Add links to relevant resources or references.",
      "Review your notes after a day and add any additional insights."
    ];
  } catch (error) {
    console.error('Error generating content suggestions:', error);
    Sentry.captureException(error);
    return ["Failed to generate suggestions. Please try again later."];
  }
};