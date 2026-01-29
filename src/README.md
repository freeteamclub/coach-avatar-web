# Coach Avatar Builder

<div align="center">

**AI-powered mentor avatar platform with premium UX/UI design**

*Notion × Superhuman × Apple aesthetics*

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6.svg)](https://www.typescriptlang.org/)

[Live Demo](#) · [Documentation](./STRUCTURE.md) · [Report Bug](#)

</div>

---

## 🎯 Overview

**Coach Avatar Builder** is a platform that enables coaches, consultants, and educators to create AI-powered mentor avatars. The platform features a comprehensive 7-step onboarding flow and a full-featured dashboard for managing avatar settings, training materials, and integrations.

### ✨ Key Features

- 🎨 **Premium Design System** — Light/dark theme with auto-detection via `prefers-color-scheme`
- 📱 **Fully Responsive** — Optimized for desktop (1440px) and mobile (375px)
- 💾 **Auto-Save** — Notion-style "Saving..." / "Saved ✓" indicator with 2s debounce
- 🎯 **7-Step Onboarding** — From basic identity to live avatar preview
- 📊 **Comprehensive Dashboard** — Training materials, content upload, integrations, analytics
- 🔗 **Multiple Integrations** — WhatsApp, Zoom, Website embed, API access

---

## 📋 Documentation

For complete structure, routes, and component specifications, see:

**➡️ [STRUCTURE.md](./STRUCTURE.md)** — Full frontend structure with all screens, routes, and components

---

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Project Structure

```
/
├── App.tsx                          # Main application entry point
├── components/
│   ├── onboarding/                  # Onboarding flow (Steps 0-7)
│   │   ├── WelcomeScreen.tsx        # Step 0.1: Landing page
│   │   ├── Step0Preview.tsx         # Step 0.2: Process preview
│   │   ├── BasicIdentity.tsx        # Step 1: Basic identity
│   │   ├── YourStory.tsx            # Step 2: Tone of voice
│   │   ├── MethodologyUpload.tsx    # Step 3: Coaching approach
│   │   ├── QATraining.tsx           # Step 4: How you work
│   │   ├── ContentBank.tsx          # Step 5: Boundaries
│   │   ├── AvatarBranding.tsx       # Step 6: Training materials
│   │   ├── AvatarPreview.tsx        # Step 7: Avatar overview
│   │   └── PublishAvatar.tsx        # Step 7: Publish action
│   ├── dashboard/                   # Dashboard components
│   │   ├── DashboardHome.tsx
│   │   ├── AIChatInterface.tsx
│   │   ├── TrainingSection.tsx
│   │   ├── ContentUpload.tsx
│   │   ├── KnowledgeBase.tsx
│   │   ├── Integrations.tsx
│   │   ├── Settings.tsx
│   │   └── Sidebar.tsx
│   ├── ui/                          # Shared UI components
│   └── figma/
│       └── ImageWithFallback.tsx    # Protected component
├── styles/
│   └── globals.css                  # Global styles and theme tokens
├── STRUCTURE.md                     # Complete structure documentation
└── README.md                        # This file
```

---

## 🎨 Design System

### Color Palette

**Primary Actions (Green):**
- All main action buttons use `#16a34a` (green-600)
- Examples: Upload Photo, Save Changes, Copy Link, Add Item

**Theme System:**
- Auto-detection via `prefers-color-scheme`
- Light theme as default
- Dark theme with proper `dark:` prefixes
- Unified across all components

### Typography

- Base styles in `/styles/globals.css`
- Tailwind CSS v4 utility classes
- Custom heading styles (h1, h2, h3)

### Components

- **Auto-Save Indicator:**
  - "Saving..." (gray text with spinner)
  - "Saved ✓" (green text with checkmark)
  - Debounced save: 2 seconds after last change
  - Notion-style implementation

---

## 🛠️ Tech Stack

- **Framework:** React 18+
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **State Management:** React hooks (useState, useEffect)
- **Form Handling:** react-hook-form@7.55.0
- **Routing:** React Router

---

## 📊 Application Flow

### Onboarding (7 Steps)

```
Landing Page (0.1)
    ↓
Process Preview (0.2) [optional]
    ↓
Step 1: Basic Identity
    ↓
Step 2: Tone of Voice
    ↓
Step 3: Coaching Approach
    ↓
Step 4: How You Work
    ↓
Step 5: Professional Boundaries
    ↓
Step 6: Training Materials [optional]
    ↓
Step 7: Avatar Overview
    ↓
Dashboard
```

### Dashboard Sections

1. **Dashboard Home** — Metrics, quick actions, recent conversations
2. **AI Chat** — Live chat interface with conversation history
3. **Training Section** — 5 tabs: Coaching Approach, How You Work, Boundaries, Frameworks, Tone Calibration
4. **Content Upload** — Files and links with inline addition functionality
5. **Knowledge Base** — Organized by type (PDFs, Notes, Workshops, Lessons)
6. **Integrations** — WhatsApp, Zoom, Website embed, API
7. **Account Settings** — Profile, Billing, Notifications, Security

---

## 🎯 Key Features

### Training Section

- **Coaching Approach Tab** — Values, principles, real coaching frameworks
- **How You Work Tab** — Typical flows with modal for creating new blocks
- **Boundaries Tab** — Topics handled, topics redirected, crisis responses
- **Frameworks Tab** — GROW, CLEAR, OSKAR, ICF Core Competencies, EMCC, Motivational Interviewing
- **Tone Calibration Tab** — Communication style + fine-tune sliders

### Content Upload

- **Inline link addition** in Content Upload section
- **File upload** (drag & drop or browse)
- **Supported formats:** MP4, MOV, PDF, DOCX (max 500MB)
- **Auto-transcription** for video files
- **Tags and notes** for organization

### Integrations

- Direct chat link (with copy button)
- Social sharing (Twitter, LinkedIn, Facebook)
- Popular integrations: Telegram, WhatsApp, Slack, Notion, Webflow, Framer
- Chat widget (customizable position, color, greeting, size)
- iFrame embed code
- API key management

---

## 🧪 Testing Checklist

- [ ] Full onboarding flow (Steps 0.1 → 7)
- [ ] Dashboard navigation across all sections
- [ ] Auto-save functionality in Training Section
- [ ] Theme switching (light/dark)
- [ ] Responsive design (1440px desktop / 375px mobile)
- [ ] All green action buttons (#16a34a)
- [ ] Live preview chat functionality
- [ ] File upload (drag & drop + browse)
- [ ] Link addition in Content Upload
- [ ] Modal windows (Demo Avatar, Create Flow)

---

## 📱 Responsive Design

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

Uses Tailwind responsive utilities for breakpoint management.

---

## 🔐 Design Principles

- **Notion × Superhuman × Apple aesthetics**
- Consistent spacing and typography
- Green (#16a34a) for all primary actions
- Smooth transitions and micro-interactions
- WCAG 2.1 AA accessibility standards

---

## 📝 Development Notes

### Auto-Save Implementation

- Debounce: 2 seconds after last input change
- Show "Saving..." during save operation
- Show "Saved ✓" on success
- Handle error states gracefully

### Theme System

- Auto-detect system preference on first load
- Allow manual theme toggle
- Persist preference in localStorage
- All components support both themes

### State Management

- Save onboarding progress on each step
- Allow back navigation without data loss
- Show completion percentage
- Real-time validation on blur
- Error messages under fields

---

## 🔄 Recent Updates

### January 2026

- ✅ Full light theme fixes across Content Upload and Settings
- ✅ Unified theme system with `prefers-color-scheme` auto-detection
- ✅ All placeholders in Social Profiles updated for consistency
- ✅ Main action buttons standardized to green (#16a34a)
- ✅ Training Section fully synced with onboarding
- ✅ Replaced Q&A Library with 3 new tabs (Coaching Approach, How You Work, Boundaries)
- ✅ Real coaching frameworks added (GROW, CLEAR, OSKAR, ICF, EMCC, MI)
- ✅ Inline link functionality in Content Upload
- ✅ "Typical Flows & Approaches" section with modal in "How You Work" tab
- ✅ Auto-save with "Saving..." / "Saved ✓" indicator (Notion-style, 2s debounce)

---

## 📚 Additional Documentation

- **[STRUCTURE.md](./STRUCTURE.md)** — Complete structure with all routes, components, and UI specifications
- **[DESIGN_SPECIFICATIONS.md](./DESIGN_SPECIFICATIONS.md)** — Design system details
- **[STYLEGUIDE.md](./STYLEGUIDE.md)** — Style guide and component library
- **[Guidelines.md](./guidelines/Guidelines.md)** — Development guidelines

---

## 🤝 Contributing

1. Follow the design system in `/styles/globals.css`
2. Use green (#16a34a) for all primary action buttons
3. Implement dark mode support with `dark:` prefixes
4. Ensure responsive design for all breakpoints
5. Test both light and dark themes

---

## 📧 Support

For questions or issues:
- Create an issue in this repository
- Contact: [support email]

---

## 📄 License

[Your License Here]

---

**Version:** 1.0  
**Last Updated:** January 14, 2026  
**Status:** ✅ Production Ready
