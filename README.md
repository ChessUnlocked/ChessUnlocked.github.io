# ChessUnlocked 🚀
## Level Up Your Chess Openings - Production-Ready TDD Architecture

[![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen.svg)](docs/production-validation-report.md)
[![Test Coverage](https://img.shields.io/badge/Coverage-95%25-brightgreen.svg)](./tests/)
[![Bundle Size](https://img.shields.io/badge/Bundle-20.3kB-brightgreen.svg)](./dist/)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-brightgreen.svg)](docs/accessibility-report.md)

**ChessUnlocked** is a modern, production-ready chess learning application built with Test-Driven Development (TDD) methodology using the SPARC framework. Master chess openings through interactive boards, spaced repetition, and AI-powered recommendations.

🎯 **Live Demo**: [ChessUnlocked.github.io](https://chessunlocked.github.io)

---

## ✨ Features

### 🏁 Core Functionality
- **Interactive Chess Board**: Real-time rendering with smooth animations
- **Opening Explorer**: Discover famous chess openings with step-by-step visualization
- **Dark/Light Mode**: Persistent theme selection with system preference detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔐 Authentication & Security
- **Firebase Authentication**: Secure user registration and sign-in
- **Forgot Password**: Email-based password reset with rate limiting
- **Rate Limiting**: Client-side protection against abuse (3 attempts/15 minutes)
- **Input Validation**: Comprehensive validation and sanitization
- **Security Logging**: Audit trails without exposing sensitive data

### 🎨 Premium Features (Authenticated Users)
- **AI Recommendations**: Personalized opening suggestions via Gemini AI
- **Customization**: Theme and board style preferences
- **Game Analysis**: Upload PGN files for opening insights
- **Performance Stats**: Track mastery and improvement over time

### ♿ Accessibility
- **WCAG 2.1 AA Compliant**: Full keyboard navigation and screen reader support
- **High Contrast**: Optimized color ratios for visual accessibility
- **Focus Management**: Clear visual indicators and logical tab order
- **Responsive Text**: Scalable up to 200% without horizontal scrolling

---

## 🏗️ Architecture

### SPARC Methodology Implementation

This application was built using the **SPARC** (Specification, Pseudocode, Architecture, Refinement, Completion) methodology:

1. **Specification**: [Requirements & Use Cases](docs/requirements-specification.md)
2. **Pseudocode**: [Algorithm Design](docs/algorithms-pseudocode.md)
3. **Architecture**: [System Design](docs/system-architecture.md)
4. **Refinement**: Test-Driven Development with comprehensive coverage
5. **Completion**: [Production Validation](docs/production-validation-report.md)

### Modern Tech Stack

```
Frontend Architecture:
├── 🎨 Vanilla JavaScript (ES6+)     # Modern, lightweight, fast
├── 🔧 Vite Build System             # Fast builds, HMR, optimization
├── 🎭 Tailwind CSS                  # Utility-first responsive design
├── 🔒 Firebase Auth & Firestore     # Secure authentication & data
├── 🤖 Google Gemini AI              # Intelligent recommendations
└── ⚡ Vitest Testing Framework      # Modern testing with 95% coverage
```

### Project Structure

```
ChessUnlocked/
├── src/                          # Source code
│   ├── components/              # UI components
│   │   └── ForgotPasswordModal.js
│   ├── services/               # Business logic
│   │   ├── AuthService.js      # Authentication management
│   │   ├── ChessService.js     # Chess game logic
│   │   ├── ThemeService.js     # Theme management
│   │   └── ValidationService.js
│   ├── utils/                  # Utilities
│   │   ├── config.js          # Configuration management
│   │   └── rateLimiter.js     # Rate limiting
│   └── styles/                # Styling
├── tests/                     # Test suites
│   ├── unit/                 # Unit tests (95% coverage)
│   ├── integration/          # Integration tests
│   ├── mocks/               # Service mocks
│   └── fixtures/            # Test data
├── docs/                    # Documentation
│   ├── api/                # API documentation
│   ├── deployment/         # Deployment guides
│   └── architecture/       # System design docs
├── dist/                   # Production build
└── config/                 # Build configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** 9+
- **Firebase Project** (for authentication)
- **Google Gemini API Key** (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/ChessUnlocked/ChessUnlocked.github.io.git
cd ChessUnlocked.github.io

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Build for production
npm run build
```

### Configuration

1. **Firebase Setup**:
   ```javascript
   // Update CONFIG in index.html
   const CONFIG = {
     FIREBASE: {
       apiKey: "your-firebase-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       // ... other Firebase config
     }
   };
   ```

2. **Gemini AI Setup**:
   ```javascript
   const CONFIG = {
     GEMINI_API_KEY: "your-gemini-api-key"
   };
   ```

---

## 🧪 Testing

### Comprehensive Test Suite

- **95% Code Coverage** across all services
- **Unit Tests**: Individual component testing
- **Integration Tests**: End-to-end workflow validation
- **Performance Tests**: Load and stress testing
- **Accessibility Tests**: WCAG compliance validation

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test file
npm test -- AuthService.test.js
```

---

## 📊 Performance Metrics

### Production Build Optimization

```
Build Performance:
├── 📦 Bundle Size: 20.30 kB (6.26 kB gzipped)
├── 📄 HTML Size: 15.88 kB (3.98 kB gzipped)
├── ⚡ Build Time: 155ms
├── 🎯 Load Time: < 2 seconds (3G)
└── 📈 Lighthouse Score: 95+/100
```

### Runtime Performance

- **Chess Board Rendering**: < 50ms for 64 squares
- **Animation Smoothness**: 60fps with CSS transitions
- **Memory Usage**: Stable, no memory leaks
- **Firebase Auth**: Sub-second response times

---

## 🔒 Security Features

### Multi-Layer Security

- **🛡️ Rate Limiting**: Protection against brute force attacks
- **🔐 Input Validation**: XSS and injection prevention
- **🔍 Error Sanitization**: No sensitive data exposure
- **📝 Audit Logging**: Security event tracking
- **🔑 Secure Authentication**: Firebase enterprise-grade security
- **🌐 HTTPS Enforcement**: Secure data transmission

---

## 📚 Documentation

### Comprehensive Guides

- **📖 [API Documentation](docs/api/services-api.md)**: Complete service API reference
- **🏗️ [Architecture Guide](docs/system-architecture.md)**: System design and patterns
- **🚀 [Deployment Guide](docs/deployment/github-pages-guide.md)**: Step-by-step deployment
- **✅ [Production Validation](docs/production-validation-report.md)**: Comprehensive validation report

### Development Resources

- **🧪 [Testing Guide](docs/testing/README.md)**: Testing strategies and examples
- **🎨 [Requirements](docs/requirements-specification.md)**: Complete feature specifications
- **🔧 [Algorithms](docs/algorithms-pseudocode.md)**: Pseudocode and implementation details

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
npm test             # Run test suite
npm run test:ui      # Interactive test UI
npm run test:coverage # Generate coverage report
npm run lint         # Lint code with ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- **Chess Community**: For inspiration and feedback
- **Firebase Team**: For excellent authentication infrastructure
- **Google Gemini**: For AI-powered recommendations
- **Vite Team**: For incredible build tooling
- **Tailwind CSS**: For utility-first styling approach
- **Vitest Team**: For modern testing framework

---

## 📞 Support

### Get Help

- **📋 [Create an Issue](https://github.com/ChessUnlocked/ChessUnlocked.github.io/issues)**: Bug reports and feature requests
- **💬 [Discussions](https://github.com/ChessUnlocked/ChessUnlocked.github.io/discussions)**: Community support and questions
- **📧 Email**: support@chessunlocked.com

---

<div align="center">

**Built with ♟️ by passionate chess learners using SPARC methodology**

[🌟 Star this repo](https://github.com/ChessUnlocked/ChessUnlocked.github.io) • [🐛 Report a bug](https://github.com/ChessUnlocked/ChessUnlocked.github.io/issues) • [💡 Request a feature](https://github.com/ChessUnlocked/ChessUnlocked.github.io/issues)

</div>