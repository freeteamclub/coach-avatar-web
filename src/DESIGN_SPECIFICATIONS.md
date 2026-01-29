# Mentor Avatar Builder - Design Specifications

## Overview

This is a complete UX/UI redesign of the Coachvox AI onboarding experience, addressing core UX problems with a modern, minimalistic approach inspired by Notion, Superhuman, Linear, and Apple.

## Design Principles

### 1. Airtight Clarity

- No field without explanation
- Inline tooltips for every input
- Microcopy everywhere
- Examples in empty states

### 2. Progressive Disclosure

- Show information when needed
- Skeleton loading instead of empty forms
- Tab-based organization for complex choices

### 3. Visual Hierarchy

- Form on left, preview/help on right (desktop)
- Card-based layout with soft shadows
- Clear typography scale
- Consistent spacing system

### 4. Trust & Transparency

- Always show progress (9 steps)
- Completeness meter for dataset
- 10-minute promise reinforced throughout
- Clear explanations of why data is needed

## Color System

### Light Mode

- **Background**: White (#FFFFFF)
- **Foreground**: Slate 900 (#0F172A)
- **Primary**: Indigo 600 (#6366F1) - Electric Blue
- **Accent**: Violet 600 (#8B5CF6)
- **Success**: Green 600 (#22C55E)
- **Warning**: Orange 500 (#FB923C)
- **Danger**: Red 600 (#EF4444)

### Dark Mode

- **Background**: Slate 900 (#0F172A)
- **Foreground**: Slate 50 (#F8FAFC)
- **Primary**: Indigo 400 (#818CF8)
- **Accent**: Violet 400 (#A78BFA)
- **Success**: Green 500 (#22C55E)
- **Warning**: Orange 500 (#FB923C)
- **Danger**: Red 500 (#EF4444)

## Typography

### Font Family

```css
font-family:
  -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
  "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif;
```

### Scale

- **H1**: 2.5rem (40px) - Bold 700 - Letter spacing -0.025em
- **H2**: 2rem (32px) - Bold 700 - Letter spacing -0.02em
- **H3**: 1.5rem (24px) - Semibold 600
- **H4**: 1.25rem (20px) - Semibold 600
- **Body**: 1rem (16px) - Regular 400 - Line height 1.6
- **Small**: 0.875rem (14px) - Regular 400 - Line height 1.5

## Spacing System

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Components

### Cards

- Border radius: 12px (0.75rem)
- Padding: 24px (1.5rem)
- Border: 1px solid slate-200/700
- Shadow: Soft elevation (0 4px 6px -1px rgb(0 0 0 / 0.05))
- Hover: Increased shadow + border color change

### Buttons

**Primary**

- Background: Indigo 600 → Indigo 700 on hover
- Text: White
- Shadow: Subtle elevation

**Secondary**

- Background: Slate 100 → Slate 200 on hover
- Text: Slate 900

**Outline**

- Border: 2px slate-200 → indigo-500 on hover
- Background: Transparent → indigo-50 on hover

### Inputs

- Border: 2px solid slate-200/700
- Focus: Ring 2px indigo-500
- Padding: 10px 16px (0.625rem 1rem)
- Border radius: 8px (0.5rem)

### Progress Bar

- Height: 8px
- Background: Slate 200/700
- Fill: Gradient from indigo-600 to violet-600
- Border radius: Full (9999px)

## Onboarding Flow

### Step 0: Welcome Screen

**Goal**: Establish trust and set expectations

**Microcopy Examples**:

- Headline: "Create your Mentor Avatar in 10 minutes"
- Subheadline: "Share your expertise, automate coaching conversations, and scale your impact."
- CTA: "Start Building →" (primary), "See Example Avatar" (outline)
- Trust indicator: "Trusted by 10,000+ coaches, consultants, and educators worldwide"

**Features Grid**:

1. ⚡ 10-Minute Setup - "Quick and simple process. Get your avatar live fast."
2. 👥 Your Voice, Scaled - "Train the AI on your content, methodology, and tone."
3. 🛡️ Safe & Controlled - "Set boundaries, topics, and ethical guidelines."

### Step 1: Personal Info

**Goal**: Collect basic identity information with minimal friction

**Microcopy Examples**:

- Headline: "Let's start with the basics"
- Subheadline: "This information helps personalize your mentor avatar."
- LinkedIn CTA: "Quick import from LinkedIn"
- Photo helper: "JPG, PNG up to 5MB"
- Name tooltip: "This is how you'll be identified in conversations with your avatar."
- Headline tooltip: "A short description of what you do. This appears in your avatar's profile."
- Headline helper: "Keep it concise and descriptive (5-10 words)"

**Why We Need This** (right sidebar):

1. **Personalization** - "Your name and photo make interactions feel authentic and trustworthy."
2. **Brand Consistency** - "Your headline helps the AI understand your positioning and expertise area."
3. **Quick Setup** - "Import from LinkedIn to save time and ensure accuracy."

### Step 2: Select Avatar Type

**Goal**: Understand the user's domain to suggest appropriate data needs

**Microcopy Examples**:

- Headline: "What type of mentor avatar do you want to create?"
- Subheadline: "Choose the category that best matches your expertise. This helps us understand what kind of data you'll need."
- Success message: "Great choice! We'll guide you through uploading the right content."

**Avatar Types**:

1. **Business Mentor** - "Guide entrepreneurs and business owners on strategy, growth, and leadership"
   - Needs: Business experience, Case studies, Strategic frameworks, Industry insights

2. **Career Coach** - "Help professionals navigate career transitions, interviews, and advancement"
   - Needs: Resume reviews, Interview prep, Career development frameworks, Success stories

3. **Therapist / Well-being Support** - "Provide guidance on mental health, mindfulness, and personal growth"
   - Needs: Therapeutic approaches, Mindfulness exercises, Self-care strategies, Crisis protocols

4. **Marketing/Content Mentor** - "Teach content creation, marketing strategies, and audience building"
   - Needs: Content frameworks, Marketing examples, Platform strategies, Growth tactics

5. **Custom Persona** - "Create a unique mentor avatar tailored to your specific expertise"
   - Needs: Your unique methodology, Custom frameworks, Specialized knowledge, Personal approach

### Step 3: Upload Sources

**Goal**: Collect training data with progressive disclosure and real-time feedback

**Microcopy Examples**:

- Headline: "Upload your source content"
- Subheadline: "Add documents, videos, or links that represent your knowledge and expertise. The more you add, the better your avatar will be."
- Tab labels: "Text & Documents", "Video/Audio", "Links"

**Text Upload**:

- Title: "Upload Text Documents"
- Description: "PDF, Word, Google Docs, or plain text files"
- Tip: "What makes great training content:"
  - "Book chapters or long-form articles you've written"
  - "Course materials or workshop notes"
  - "Client case studies or success stories"
  - "Your personal methodology documents"

**Video Upload**:

- Title: "Add YouTube or Video Links"
- Description: "We'll automatically transcribe your videos and extract your knowledge and speaking style."
- Placeholder: "https://youtube.com/watch?v=..."

**Links Upload**:

- Title: "Add Website or Blog Links"
- Description: "Add links to your website, blog posts, social media, or any online content that showcases your expertise."
- Placeholder: "https://example.com/your-content"

**Dataset Meter Messages**:

- 100%: "Ready to publish!"
- 60-99%: "Good start! Add more for better results"
- <60%: "Add more content for a complete avatar"

**Required Items**:

1. Core expertise content
2. Personal story/background
3. Methodology or framework
4. Example conversations/FAQs

**Optional Items**:

1. Video/audio content
2. Website or blog posts

### Step 4: Tone Calibration

**Goal**: Capture the user's communication style through interactive selection

**Microcopy Examples**:

- Headline: "Calibrate your avatar's tone"
- Subheadline: "Choose how your avatar should communicate. You can adjust these settings anytime."
- Scenario: "A client asks for advice on handling a difficult team member"
- Custom option: "Or write your own response"
- Custom placeholder: "How would you respond to this scenario?"
- Info: "These settings affect how your avatar communicates. You can always adjust them later based on feedback from your users."

**Slider Labels**:

1. Warm & Friendly ←→ Direct & Concise
2. Casual ←→ Formal
3. Empathic ←→ Analytical

**Sample Responses**:

- **Warm**: "I completely understand how challenging this can be. Let's explore what might be driving their behavior. Have you had a chance to have an open conversation with them about what's going on?"
- **Direct**: "Here's what you need to do: schedule a 1-on-1, document the specific behaviors, and set clear expectations. If they don't improve in 30 days, it's time for a performance plan."
- **Balanced**: "This is tough. I'd recommend starting with a direct conversation about the specific issues you're seeing. Be clear about expectations, but also listen to understand what might be contributing to their behavior."

**Tone Profile Display**:

- Style: Warm & Approachable / Balanced / Direct & Efficient
- Formality: Casual / Conversational / Professional
- Approach: Empathy-First / Thoughtful / Data-Driven

### Step 5: Knowledge Calibration

**Goal**: Train response patterns through targeted questions

**Microcopy Examples**:

- Headline: "Knowledge calibration"
- Subheadline: "Answer these questions to help train your avatar's response patterns. This takes less than 5 minutes."
- Progress: "Question X of 5"
- Text placeholder: "Type your answer here..."
- Text helper: "Be as detailed as you like. Your avatar will learn from this."
- Info: "Your answers help the AI understand your unique approach and decision-making patterns. This ensures your avatar responds the way you would, not just generically."
- Skip option: "Skip remaining questions"

**Sample Questions**:

1. "A client is struggling with work-life balance. What's your first recommendation?"
2. "How do you typically structure your coaching sessions?"
3. "A client wants to make a career change but is afraid. What do you ask them?" (text)
4. "What's your approach when a client isn't making progress?"
5. "Describe your coaching philosophy in one sentence:" (text)

### Step 6: Boundaries & Safety

**Goal**: Define ethical boundaries and safety protocols

**Microcopy Examples**:

- Headline: "Set boundaries & safety guidelines"
- Subheadline: "Define what your avatar should and shouldn't discuss. This ensures ethical and safe interactions."
- Allowed section: "Allowed Topics - What your avatar can discuss"
- Blocked section: "Blocked Topics - What your avatar won't discuss"
- Crisis section: "Crisis Response - How to handle red flags"
- Crisis label: "Automated crisis message"
- Crisis helper: "This message will be shown if the AI detects language indicating a crisis situation"
- Crisis warning: "⚠️ Your avatar will automatically detect concerning language and respond with care"

**Default Crisis Response**:
"I notice you might be going through a difficult time. While I'm here to help with professional guidance, I'm not equipped to handle crisis situations. Please reach out to a mental health professional or crisis helpline."

**Best Practices**:

- "Be clear about your scope of expertise"
- "Block topics you're not qualified to advise on"
- "Include crisis resources in your response"
- "Review and update boundaries regularly"

**Blocked Topic Example**:
"I appreciate you sharing this with me. However, **medical advice** is outside my area of expertise. I recommend consulting with a qualified healthcare professional who can give you personalized guidance."

### Step 7: Summary Review

**Goal**: Allow users to review and edit all settings before preview

**Microcopy Examples**:

- Headline: "Review your mentor avatar"
- Subheadline: "Everything looks good! Review your settings below and make any final adjustments."
- Score title: "Completeness Score"
- Score subtitle: "Your avatar is ready to go!"

**Suggestions to Improve** (if <100%):

- "Add video content to capture your speaking style and personality"
- "Complete knowledge calibration for more accurate responses"
- "Upload more documents to expand your avatar's knowledge base"

**Summary Sections**:

1. Profile (icon: User)
2. Avatar Type (icon: Target)
3. Source Content (icon: Upload)
4. Tone & Style (icon: Sliders)
5. Knowledge (icon: Brain)
6. Boundaries (icon: Shield)

### Step 8: Avatar Preview

**Goal**: Interactive testing with comparison to generic model

**Microcopy Examples**:

- Headline: "Try your mentor avatar"
- Subheadline: "Have a conversation to see how your avatar responds. Compare it with a generic model to see the difference."
- Mode toggle: "Your Avatar" vs "Generic Model"
- Chat placeholder: "Ask your avatar anything..."
- Reset: "Reset conversation"
- Sample prompts title: "Try these sample questions"
- Refine title: "Not quite right?"
- Refine description: "You can refine your avatar's tone, add more training content, or adjust boundaries at any time."

**What Makes Your Avatar Unique**:

- ✓ "Trained on your specific methodology and frameworks"
- ✓ "Matches your communication tone and style"
- ✓ "Respects your defined boundaries and topics"
- ✓ "Draws from your real experiences and case studies"

**Sample Prompts**:

1. "How do I handle a difficult team member?"
2. "I'm considering a career change. Where do I start?"
3. "What's your approach to work-life balance?"
4. "How can I develop better leadership skills?"

### Step 9: Publish

**Goal**: Provide export options and celebrate success

**Microcopy Examples**:

- Headline: "🎉 Your mentor avatar is live!"
- Subheadline: "Congratulations! Your AI mentor is ready to start helping people. Here's how to share and integrate it."

**Share Link**:

- Title: "Share Link"
- Description: "Share this link anywhere to let people chat with your avatar"

**Embed Widget**:

- Title: "Embeddable Widget"
- Description: "Add this code to your website to embed the chat widget"

**Integrations**:

- Title: "Popular Integrations"
- Options: Notion 📝, Webflow 🎨, Framer ⚡

**API Key**:

- Title: "API Key"
- Description: "Use this key to integrate your avatar via API"
- Warning: "⚠️ Keep this key secure. Don't share it publicly."

**What's Next**:

1. "Test your avatar with real conversations and gather feedback"
2. "Monitor analytics to see how people are engaging with your avatar"
3. "Refine your content and boundaries based on usage patterns"
4. "Share it with your audience and watch your impact scale"

**Support**:
"Need help? Check out our documentation or contact support"

## Responsive Design

### Desktop (1440px)

- Two-column layout (form left, help/preview right)
- Full step indicator with labels
- Expanded cards with generous spacing
- Side-by-side comparison views

### Mobile (375px)

- Single column stacked layout
- Compact step indicator (numbers only)
- Full-width cards
- Collapsible sections where needed
- Sticky header with progress
- Bottom navigation bar

## Interaction Patterns

### Loading States

- Skeleton loaders for content
- Smooth transitions (150ms ease)
- Progress indicators for uploads
- Real-time validation feedback

### Error Handling

- Inline error messages
- Red border + icon for invalid fields
- Helpful error descriptions
- No blocking popups

### Success Feedback

- Green checkmarks for completed items
- Smooth animations (not jarring)
- Encouraging messages
- Progress celebration at key milestones

## Accessibility

### WCAG 2.1 AA Compliance

- Color contrast ratio ≥ 4.5:1 for text
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader friendly labels
- Alt text for all images
- Semantic HTML structure

### Dark Mode

- Proper contrast in both themes
- Smooth theme transition
- Persisted user preference
- System preference detection

## Development Notes

### Technology Stack

- React 18+
- TypeScript (recommended)
- Tailwind CSS 4.0
- Lucide React (icons)

### File Structure

```
/components
  /ui
    - Card.tsx
    - Button.tsx
    - Input.tsx
    - ProgressBar.tsx
    - UploadBox.tsx
    - DatasetMeter.tsx
    - ToneSlider.tsx
    - ChatPreview.tsx
  /onboarding
    - Step0Welcome.tsx
    - Step1PersonalInfo.tsx
    - Step2SelectType.tsx
    - Step3UploadSources.tsx
    - Step4ToneCalibration.tsx
    - Step5KnowledgeCalibration.tsx
    - Step6Boundaries.tsx
    - Step7SummaryReview.tsx
    - Step8AvatarPreview.tsx
    - Step9Publish.tsx
  - FlowchartDiagram.tsx
/styles
  - globals.css
App.tsx
```

### State Management

- React Context for onboarding data
- Local state for UI interactions
- Persist progress to localStorage
- Form validation on blur/submit

### Performance

- Lazy load steps
- Optimize image uploads
- Debounce text inputs
- Memoize expensive calculations

## Testing Requirements

### User Testing Goals

1. Complete onboarding in <10 minutes
2. Understand each step's purpose
3. Feel confident about data quality
4. Successfully publish avatar
5. Navigate back to edit settings

### Key Metrics

- Time to completion
- Drop-off points
- Error rates
- User satisfaction (NPS)
- Avatar quality score

## Future Enhancements

### Phase 2

- Multi-language support
- Team collaboration features
- Advanced analytics dashboard
- A/B testing for avatar responses
- Voice cloning integration
- Video avatar option

### Phase 3

- White-label solution
- Enterprise features
- Advanced customization
- Integration marketplace
- Community knowledge sharing

---

## Credits

**Design System Inspiration**: Notion, Linear, Superhuman, Reclaim, V0.dev
**UX Improvements Over Coachvox AI**:

- Reduced steps from unclear flow to clear 10-step process
- Added progressive disclosure for complex choices
- Implemented real-time dataset quality feedback
- Removed intrusive Slack onboarding
- Added comparison preview feature
- Improved microcopy and clarity throughout