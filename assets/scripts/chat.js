// Chat functionality for RIC Gaming Club FAQ
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

class ChatInterface {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.modelName = config.modelName;
        this.questionInput = null;
        this.answerDisplay = null;
        this.sendButton = null;
        this.model = null;
        
        this.init();
    }
    
    async init() {
        await this.initializeElements();
        await this.initializeAI();
        this.setupEventListeners();
    }
    
    async initializeElements() {
        this.questionInput = document.getElementById('questionInput');
        this.answerDisplay = document.getElementById('answerDisplay');
        this.sendButton = document.getElementById('sendButton');
        
        if (!this.questionInput || !this.answerDisplay || !this.sendButton) {
            console.error('Required DOM elements not found');
            return;
        }
    }
    
    async initializeAI() {
        try {
            const genAI = new GoogleGenerativeAI(this.apiKey);
            this.model = genAI.getGenerativeModel({ model: this.modelName });
            console.log('AI model initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AI model:', error);
            this.showError('Failed to initialize AI. Please refresh the page.');
        }
    }
    
    setupEventListeners() {
        this.questionInput.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter') {
                await this.handleQuestion();
            }
        });
        
        this.sendButton.addEventListener('click', async () => {
            await this.handleQuestion();
        });
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-bubble">${this.escapeHtml(message)}</div>
            <div class="avatar user">👤</div>
        `;
        this.answerDisplay.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="avatar ai">🤖</div>
            <div class="message-bubble">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.answerDisplay.appendChild(typingDiv);
        this.scrollToBottom();
        return typingDiv;
    }
    
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    addAIMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai';
        messageDiv.innerHTML = `
            <div class="avatar ai">🤖</div>
            <div class="message-bubble">${this.escapeHtml(message)}</div>
        `;
        this.answerDisplay.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai';
        messageDiv.innerHTML = `
            <div class="avatar ai">❌</div>
            <div class="message-bubble" style="background: #ffebee; color: #c62828;">${this.escapeHtml(message)}</div>
        `;
        this.answerDisplay.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        this.answerDisplay.scrollTop = this.answerDisplay.scrollHeight;
    }
    
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    showError(message) {
        if (this.answerDisplay) {
            this.answerDisplay.innerHTML = `<p style="color: #ff6b6b;">${message}</p>`;
        }
    }
    
    async handleQuestion() {
        const question = this.questionInput.value.trim();
        if (question === '' || !this.model) return;
        
        console.log('User asked:', question);
        
        // Disable input and button
        this.questionInput.disabled = true;
        this.sendButton.disabled = true;
        
        // Add user message
        this.addUserMessage(question);
        
        // Clear input
        this.questionInput.value = '';
        
        // Show typing indicator
        const typingIndicator = this.addTypingIndicator();
        
        try {
            const chat = this.model.startChat({
                history: this.getChatHistory(),
                generationConfig: {
                    maxOutputTokens: 25000,
                },
            });
            
            const result = await chat.sendMessage(question);
            const response = await result.response;
            const answer = await response.text();
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add AI response
            this.addAIMessage(answer);
            console.log('API Response:', answer);
            
        } catch (error) {
            console.error('Error:', error);
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Show appropriate error message
            let errorMessage = this.getErrorMessage(error);
            this.addErrorMessage(errorMessage);
            
        } finally {
            // Re-enable input and button
            this.questionInput.disabled = false;
            this.sendButton.disabled = false;
            this.questionInput.focus();
        }
    }
    
    getErrorMessage(error) {
        if (error.message.includes('API key')) {
            return 'API key error. Please contact the administrator.';
        } else if (error.message.includes('quota')) {
            return 'API quota exceeded. Please try again later.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            return 'Network error. Please check your internet connection and try again.';
        } else {
            return 'Sorry, I encountered an error. Please try again later.';
        }
    }
    
    getChatHistory() {
        // This would contain the pre-trained knowledge base
        // For now, return the existing history from the HTML file
        return [
            {
                role: "user",
                parts: [{ text: "Objective, What are the club's objectives? What is the objective of the club? Can You Tell Me about the club's objective?" }],
            },
            {
                role: "model",
                parts: [{ text: "The Objective of the gaming club is to provide a place to share your gaming hobbies comforably with each other. and also we aim to compete in esports tournaments if possible" }],
            },
            // ... rest of the chat history would go here
        ];
    }
}

// Export for module usage
export default ChatInterface;