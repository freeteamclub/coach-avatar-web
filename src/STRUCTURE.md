Anantata Coach Avatar Builder — Frontend Structure
Navigation Flow
Landing Page (0.1)
    ↓
Process Preview (0.2) [optional]
    ↓
Onboarding Steps (1-7)
    ↓
Dashboard

🎯 ONBOARDING FLOW
0.1 — Landing / Intro Page
Route: / or /intro
Main Hero:

Title: "Coach Avatar Builder"
Subtitle: "Create your AI-powered coach avatar in just 10 minutes. Share your expertise, automate coaching conversations, and scale your impact."

Main Card:

Title: "Create your Coach Avatar in 10 minutes"
Subtitle: "We'll guide you through 9 simple steps. No technical knowledge required."

Three Value Props (with icons):

10-Minute Setup

Icon: Lightning bolt (purple)
"Quick and simple process. Get your avatar live fast."


Your Voice, Scaled

Icon: People (purple)
"Train the AI on your content, methodology, and tone."


Safe & Controlled

Icon: Shield (pink/purple)
"Set boundaries, topics, and ethical guidelines."



CTAs:

Primary: "Start Building →"
Secondary: "See Example Avatar"
Tertiary link: "▷ Watch: How this works (30 seconds)"

Footer:

"Trusted by 10,000+ coaches, consultants, and educators worldwide"
Links: Docs · Privacy · Terms of Service · Dashboard

Components needed:

Hero section
Value proposition cards (3-column grid)
CTA buttons (primary + secondary + text link)
Footer links


0.1a — Demo Avatar Modal
Triggered by: "See Example Avatar" button
Modal Content:

Title: "Your Mentor Avatar — live preview"
Subtitle: "Try a short chat to see how your avatar responds."
Close button (X)

Left Side:

Avatar header: "Your Mentor Avatar" + "Active" badge
First message from avatar
Chat input: "Ask your avatar anything..."
Send button
"Reset conversation" link

Right Side:

"Try these sample questions" (4 clickable prompts):

"I feel stuck with my goals"
"Help me reflect on my last week"
"I need clarity before making a decision"
"I'm struggling with work-life balance"



Bottom CTA:

"Start Build Avatar →"


0.2 — Preview the Process
Route: /preview or /onboarding/preview
Header:

Title: "Preview the process (before onboarding)"
Subtitle: "See what you'll build in the next few steps."

Main Content Card:

Section title: "What you'll do — step by step"

7 Steps Listed (each with number, title, description, "Why"):

Basic Identity

"name, role, certification context."
→ Why: This helps align tone defaults.


Tone of Voice

"how your avatar communicates."
→ Why: This ensures responses feel like you, not a generic bot.


Your Coaching Approach

"values, principles."
→ Why: This helps the avatar reflect your unique coaching presence.


How You Work

"your typical work process."
→ Why: This teaches the avatar to handle sessions the way you would.


Professional Boundaries

"ethical and practical limits."
→ Why: This keeps interactions safe and aligned with your standards.


Training Materials

"add links or files (optional)"
→ Why: This helps the avatar use your specific language and examples.


Avatar Overview

"a live chat preview."
→ Why: See how everything comes together before you publish.



Additional Info:

"Where your avatar lives"
"After setup, your mentor avatar can be published and connected to WhatsApp, Zoom, your website, or internal workflows from your dashboard."

CTAs:

Secondary: "← Back to Intro"
Primary: "Start Building →"

Footer links: Docs · Privacy · Terms of Service

1 — Basic Identity
Route: /onboarding/step-1 or /onboarding/identity
Progress Indicator (top):

"Step 1 of 7"
Visual stepper showing: 1 (active), 2, 3, 4, 5, 6, 7
Labels: Basic Identity | Tone of Voice | Coaching Approach | How You Work | Boundaries | Training Materials | Avatar Overview

Header:

Title: "Basic Identity"
Subtitle: "Let's start with the minimum information needed to set up your mentor avatar."
Note: "* Required fields"

Form Layout (2 columns):
Left Column:

Avatar name* (text input)

Helper: "How your avatar will be introduced to clients."
Placeholder: "B"


Professional headline* (text input)

Helper: "A short description of your role or focus."
Placeholder: "B"


Social profiles (optional)

LinkedIn (input)
Instagram (input)
Personal website (input)
Other (input)
Info box: "Why we ask this: This helps to attach your work materials for customizing your work methodology."



Right Column:

Certification status* (radio buttons)

○ Not certified (but experienced practitioner)
○ In certification process
● Certified coach (selected)


Professional affiliation (optional) - checkboxes

☑ ICF (International Coaching Federation)
☐ EMCC (European Mentoring & Coaching Council)
☐ Other:
☐ Prefer not to specify
Info box: "Why we ask this: Your certification and affiliation help us suggest ethical boundaries and communication standards that align with your professional context."



Bottom:

Note: "Everything remains fully editable."

Navigation:

Secondary: "Back"
Primary: "Continue" (full width, purple)


2 — Tone of Voice & Interaction Style
Route: /onboarding/step-2 or /onboarding/tone
Progress: Step 2 of 7 (visual stepper)
Header:

Title: "Tone of Voice & Interaction Style"
Subtitle: "Describe how your mentor avatar should sound and interact with clients."
Right side note: "Adjust these to refine how the avatar responds. Changes are reflected in the preview below."

Section 1: Fine-tune with sliders (optional)
Four sliders (each at 50% by default):

Warm & Friendly ←→ Direct & Concise
Casual ←→ Formal
Playful ←→ Serious
Empathic ←→ Analytical

Section 2: Your communication style

Label: "Your communication style (recommended — this is your most important input)"
"Describe your tone in your own words."
Examples provided:

"Calm, supportive, reflective — I rarely give direct advice"
"Warm but structured. I ask clear questions"
"Empathic and curious. I trust the client's process"


Large text area: "Describe your communication style here..."
Note: "Recommended: at least 200 characters"
Counter: "0 / 500 characters"

Section 3: Live preview

"This is how your avatar might greet a client in a first conversation."
Preview box shows sample greeting
Note: "Note: This is an example, not a fixed script. The avatar adapts to each conversation."

Navigation:

"Back" | "Continue"


3 — Your Coaching Approach & Values
Route: /onboarding/step-3 or /onboarding/approach
Progress: Step 3 of 7
Header:

Title: "Your Coaching Approach & Values"
Subtitle: "This section helps your avatar reflect your unique presence and values — not just generic coaching language."

Form:

Label: "Describe your approach to working with clients (optional)"
Helper text: "You might include:"

What matters most in how you work
Your guiding principles or values
What clients can expect from your style
How you create the coaching relationship


Large text area: "Describe your coaching approach and values here..."
Note: "Optional field"
Counter: "0 / 1000 characters"

Expandable section:

"Examples for inspiration (ICF-neutral)" (collapsed by default)

Navigation:

"Back" | "Continue"


4 — How You Work in Practice
Route: /onboarding/step-4 or /onboarding/work-style
Progress: Step 4 of 7
Header:

Title: "How You Work in Practice"
Subtitle: "Describe your typical way of guiding coaching conversations."

Form Section 1:

Label: "How do you guide a coaching conversation? (your own words)"
Helper: "Describe your typical flow or approach — there's no single 'right' structure."
Text area: "Describe how you typically guide a coaching conversation..."
Note: "Optional field"
Counter: "0 / 600 characters"
Examples shown:

"I usually start with reflection on current state, then explore what the client wants to shift. We dive deep into their current reality, examine options, and end with clear commitments and next steps."
"I follow the energy and trust the client's agenda — structure emerges naturally."
"I adapt GROW framework to each client: Goal, Reality, Options, Will."



Form Section 2:

Label: "What kind of moments does your avatar need to handle well? (your own words)"
Helper: "Think about recurring situations in your sessions."
Text area: "Describe key moments your avatar should handle well..."
Note: "Optional field"
Counter: "0 / 600 characters"
Examples:

Reflecting on progress since last session
Exploring resistance or stuck patterns
Clarifying next steps and accountability
Celebrating wins and acknowledging growth
Navigating difficult emotions or uncertainty



Expandable Section:

"Certification-based guidance (if applicable)"
"Based on your ICF affiliation, we've included common coaching principles as reference. You can edit or remove anything that doesn't fit your approach."
"See suggested principles" (collapsed)

Navigation:

"Back" | "Continue"


5 — Professional Boundaries
Route: /onboarding/step-5 or /onboarding/boundaries
Progress: Step 5 of 7
Header:

Title: "Professional Boundaries"
Subtitle: "Define what your mentor avatar can and cannot engage with."

Info Box:

"Pre-filled based on your certification"
"We've added common boundaries from ICF ethics as a starting point. You can edit, add, or remove anything."
"See what's included by default" (expandable)

Left Column:
Topics your avatar handles well (green section)

"What is your avatar best suited to discuss?"
Examples: goal clarity, accountability, leadership challenges, career transitions, work-life balance
Green tag pills: "Goal clarity ×" | "Accountability ×" | "Leadership challenges ×"
Add from common topics:



Career transitions




Work-life balance




Acute crisis




Financial advice




Input: "Add custom topic..."
"+" button

Topics requiring redirection (red section)

"When should your avatar suggest other, professional support?"
Examples: clinical mental health concerns, legal issues, medical decisions, acute crisis
Red tag pills: "Clinical mental health ×" | "Legal issues ×" | "Medical decisions ×"
Add from common topics:



Career transitions




Work-life balance




Acute crisis




Financial advice




Input: "Add custom blocked topic..."
"+" button

Right Column:
Crisis response — sample text (editable)

"If a client shares thoughts of self-harm or crisis:"
Editable text area with template response

Out-of-scope response — sample text (editable)

"When a topic is outside your avatar's role:"
Editable text area with template response

Info Box:

"Why this matters"
"Clear boundaries protect both you and your clients, and ensure the avatar stays aligned with professional standards."

Navigation:

"Back" | "Continue"


6 — Training Materials (Optional)
Route: /onboarding/step-6 or /onboarding/materials
Progress: Step 6 of 7
Header:

Title: "Training Materials (optional — you can skip this step)"
Subtitle: "You can add materials now — or come back anytime from your dashboard."

Info Box:

"Why this matters"
"Materials train your avatar to use your specific language, examples, and frameworks."
List:

Blog posts or articles you've written
Recorded talks or workshop videos
Client handouts, guides, or worksheets
Frameworks or models you use regularly
Case studies or anonymized examples


"Not required now — you can add materials anytime from your dashboard."

Three Tabs:

Links (selected in image 9)
Documents
Videos

Tab: Links (Add links - recommended first)

"Paste URLs to articles, videos, LinkedIn posts, or public resources."
Input field: "https://..."
"+ Add link" button
Examples:

YouTube talk: https://...
Blog post: https://...
LinkedIn article: https://...



Tab: Documents (Upload documents - optional)

"PDFs, Word docs, guides, or frameworks."
Drag & drop area:

"Drag & drop or browse"
"Supported formats: PDF, DOCX, TXT"



Tab: Videos (Upload videos - optional)

"Recorded sessions, workshops, or talks."
Drag & drop area:

"Drag & drop or browse"
"Supported formats: MP4, MOV, AVI"



Navigation:

"Back" | "Continue" | "Skip this step"


7 — Avatar Overview (Final Step)
Route: /onboarding/step-7 or /onboarding/overview
Progress: Step 7 of 7 (all steps checked green)
Header:

Title: "Your Mentor Avatar — Overview"
Subtitle: "Review what you've created and try a live chat preview."

Section 1: Overall completeness

Progress bar: 28%
6 cards in grid showing completion status:


Basic Identity - 67%

Status: "Incomplete" (orange)
"Edit" button


Tone of Voice - 0%

Status: "Incomplete"
"Edit" button


Your Coaching Approach - 0%

Status: "Incomplete"
"Edit" button


How You Work - 0%

Status: "Incomplete"
"Edit" button


Professional Boundaries - 100%

Status: "Complete" (green checkmark)
"Edit" button


Training Materials - 0%

Status: "Optional"
"Edit" button



Section 2: Your Mentor Avatar — live preview

Subtitle: "Try a short chat to see how your avatar responds."

Tab switcher:

"Your Avatar" (selected) | "Generic Model"

Chat Preview:

Avatar: "Your Mentor Avatar" + "Active" badge
Sample message shown
Input: "Ask your avatar anything..."
Send button
"Reset conversation" link

Sample Questions (right side):

"I feel stuck with my goals"
"Help me reflect on my last week"
"I need clarity before making a decision"
"I'm struggling with work-life balance"

Section 3: Suggestions to improve

Add training materials to help your avatar use your specific language and examples
Expand your coaching approach to give the avatar more context about your values
Test more prompts to see how the avatar handles different situations
Add a profile photo to make your avatar more personable

Navigation:

"Back" | "Ready to Publish? Go to Dashboard!" (full width, purple)


📊 DASHBOARD FLOW
Main Navigation (Sidebar)
Present on all dashboard pages:

Dashboard (home icon)
AI Chat
Training
Content Upload
Knowledge Base
Integrations
Account

Bottom: User profile (Coach Sarah, Premium Plan)

D1 — Dashboard Home
Route: /dashboard
Header:

Welcome back, Coach Sarah
Subtitle: "Here's what's happening with your AI coach today"

Metrics Cards (4):

Total Conversations: 247 (+12%)
Active Users: 89 (+8%)
Avg. Session Time: 8m 32s (+3%)
Satisfaction Rate: 94% (+2%)

Quick Actions (3 cards):

Upload New Content

"Add videos or documents to improve your avatar"
CTA: "Get started →"


Add Q&A Training

"Train your avatar with new questions"
CTA: "Get started →"


Test Your Avatar

"Chat with your AI coach to test responses"
CTA: "Get started →"



Training Status:

Q&A Pairs: 24 added
Videos Uploaded: 8 videos
Documents: 12 files

Recent Conversations (right sidebar):
List of recent chats with:

User name
Message preview
Status badge (active/completed)
Timestamp
"View all" link


D2 — AI Chat
Route: /dashboard/chat
Left Panel:

Conversation History (sidebar)

"Current Session" (Now)
List of past conversations with preview



Main Area:

Chat header: "Coach Sarah AI" / "Life Coach"
Chat messages area
Message input: "Type your message..."
Send button


D3 — Training (Tab 1: Coaching Approach)
Route: /dashboard/training or /dashboard/training/approach
Tabs: Coaching Approach | How You Work | Boundaries | Frameworks | Tone Calibration
Content:

Title: "Your Coaching Approach & Values"
Large text area with example content
Character counter: "309 / 1000 characters"
Helper text below
CTA: "Save Changes"


D4 — Training (Tab 2: How You Work)
Route: /dashboard/training/work-style
Two sections:

"How do you guide a coaching conversation?"

Large text area
Character counter: "227 / 600 characters"


"What key moments do you pay attention to?"

Large text area
Character counter: "230 / 600 characters"


"Typical Flows & Approaches"

"+ Add typical flow or approach" button




D5 — Training (Tab 3: Boundaries)
Route: /dashboard/training/boundaries
Three sections:

Topics You Work With

Tag pills (green): Goal clarity, Accountability, Leadership challenges, Career transitions, Work-life balance
Input: "Add allowed topic..."
"Add" button


Topics You Don't Work With

Tag pills (red): Clinical mental health, Legal issues, Medical decisions, Acute crisis, Financial advice
Input: "Add blocked topic..."
"Add" button


Crisis Response Message

Text area with template message
Helper text: "What should your avatar say when someone shares a crisis situation?"


Out of Scope Response

Text area with template
Helper text: "What should your avatar say when asked about topics outside coaching?"




D6 — Training (Tab 4: Frameworks)
Route: /dashboard/training/frameworks
Header:

Title: "Your Frameworks"
"+ Add Framework" button

Framework Cards (6 cards in grid):

GROW Model

Description: "Goal, Reality, Options, Way Forward - ICF foundational framework"
"4 items"
"View →"


CLEAR Coaching Model

Description: "Contracting, Listening, Exploring, Action, Review"
"5 items"
"View →"


OSKAR Model

Description: "Outcome, Scaling, Know-how, Affirm & Action, Review"
"5 items"
"View →"


ICF Core Competencies

Description: "International Coaching Federation professional standards"
"8 items"
"View →"


EMCC Competence Framework

Description: "European Mentoring & Coaching Council standards"
"8 items"
"View →"


Motivational Interviewing

Description: "Client-centered approach for evoking change motivation"
"4 items"
"View →"




D7 — Training (Tab 5: Tone Calibration)
Route: /dashboard/training/tone
Section 1:

Title: "Your communication style (recommended — this is your most important input)"
Large text area with example
Helper text: Examples provided
Character counter: "0 / 500 characters"

Section 2: Fine-tune with sliders (optional)
Four sliders:

Warmth & Empathy (Warm & Friendly ← → Direct & Concise)
Formality Level (Casual ← → Formal)
Playfulness (Playful ← → Serious)
Empathy vs Analysis (Empathic ← → Analytical)

CTA: "Save Tone Settings"

D8 — Content Upload (Files)
Route: /dashboard/content/files
Left Panel:

Two tabs:

"Upload Files" (active) - Documents & videos
"Upload Links" - Web & video links



File List (left):
Shows uploaded items with:

File icon (video/document)
Filename
Size + upload date
Status badge ("Ready" / "Transcribing...")

Right Panel:

"Drag & Drop Files" area
"Choose Files" button
Supported formats: MP4, MOV, PDF, DOCX (Max 500MB)
"Recently Uploaded Files" list below


D9 — Content Upload (Links)
Route: /dashboard/content/links
Two Sections:

Web Links

"Add links to blog posts, articles, or your website"
Input field with added link
"+ Add" button


Video Links

"Add YouTube, Vimeo, or other video links"
Input field
"+ Add" button




D10 — Content Upload (File Detail)
Route: /dashboard/content/file/:id
Content:

Video player (or document preview)
Filename: "Workshop - Goal Setting Masterclass.mp4"
Size + upload date
Delete button (top right)

Transcription Section:

"Auto-transcription complete. Review and edit if needed."
Editable text area
"Edit" button

Notes Section:

Free text area
Placeholder: "Main workshop from January 2024"

Tags:

Tag pills: "goals", "workshop"
"+ Add tag..." input
"Add" button


D11 — Integrations
Route: /dashboard/integrations
Sections:

Direct Chat Link

Display link with "Copy Link" button


Chat with My AI Coach (card)

Social sharing buttons: Twitter, LinkedIn, Facebook


Popular Integrations (grid of 6)

Telegram
WhatsApp
Slack
Notion
Webflow
Framer


Chat Widget (Recommended)

Code snippet
"Copy Code" button
"View Documentation" link


Widget Customization

Widget Position dropdown
Primary Color picker
Greeting Message input
Widget Size dropdown
"Save Customization" button


iFrame Embed

Code snippet
"Copy iFrame Code" button


API Key

Masked key
"Copy Key" button
Warning: "Keep this key secure. Don't share it publicly."




D12 — Knowledge Base (All Items)
Route: /dashboard/knowledge
Left Panel - Categories:

All Items (24)
PDFs (8)
Text Notes (6)
Workshops (5)
Lessons (5)
"+ Add Item" button

Main Area:

Search: "Search knowledge base..."
Grid of knowledge items (cards) showing:

Icon (by type)
Title
Category/Type
Date + metadata (size/duration/pages)



Bottom Stats:

24 Total Items
8 Documents
10 Workshops
12.4 MB Total Size


D13 — Knowledge Base (PDFs Filter)
Route: /dashboard/knowledge?filter=pdfs
Shows only PDF items in grid.

D14 — Knowledge Base (Text Notes Filter)
Route: /dashboard/knowledge?filter=notes
Shows only text note items.

D15 — Knowledge Base (Workshops Filter)
Route: /dashboard/knowledge?filter=workshops
Shows only workshop items.

D16 — Knowledge Base (Lessons Filter)
Route: /dashboard/knowledge?filter=lessons
Shows only lesson/course module items.

D17 — Account Settings (Profile)
Route: /dashboard/account or /dashboard/account/profile
Tabs: Profile | Billing & Plan | Notifications | Account Security
Content:

Avatar Photo

Circle avatar placeholder
"Upload Photo" button


Basic Identity

Avatar name (input)
Email (input)
Professional headline (input)
Certification status (radio buttons)
Professional affiliation checkboxes (ICF, EMCC, Other, Prefer not to specify)


Social Profiles (optional)

LinkedIn (input)
Instagram (input)
Personal website (input)
Other (input)



CTA: "Save Changes"

D18 — Account Settings (Billing & Plan)
Route: /dashboard/account/billing
Content:

Premium Plan Card

Badge: "Active"
"$49 /month"
"Unlimited conversations and training"
"Change Plan" button


Usage This Month (3 metrics):

Conversations: 247 (Unlimited)
Storage Used: 3.2 GB (of 10 GB)
Training Items: 42 (Unlimited)


Payment Method

Card ending ••••4242
Expires 12/25
"Update" button


Billing History

Table with dates, amounts, status (Paid), Download links
Rows: Dec 1, Nov 1, Oct 1




D19 — Account Settings (Notifications)
Route: /dashboard/account/notifications
Email Notifications (checkboxes):

✓ New conversation started
✓ Weekly performance report
☐ Training suggestions
✓ Billing and payments

CTA: "Save Preferences"

D20 — Account Settings (Security)
Route: /dashboard/account/security
Security Section:

Current Password (input)
New Password (input)
Confirm New Password (input)
"Update Password" button

Danger Zone (red background):

"Delete Avatar" heading
Warning text
"Delete Avatar" button (red)


🎨 UI Components Library
Shared Components Needed:
Navigation:

Progress indicator (for onboarding steps 1-7)
Back/Continue button pair
Skip/Cancel options

Forms:

Text input (with validation states)
Text area
Radio buttons
Checkboxes
Dropdown/Select
File upload (for step 6)

Content:

Cards (for value pillars)
Helper text / tooltips
Chat interface preview
Modal/popup (for demo avatar)

Buttons:

Primary CTA
Secondary CTA
Tertiary/text link


📱 Responsive Breakpoints

Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px


🔄 State Management Notes
Onboarding Progress:

Save form data on each step
Allow back navigation without data loss
Show completion percentage

Validation:

Required fields marked with *
Real-time validation on blur
Error messages under fields


📝 Notes for Developer

All onboarding steps should save progress automatically
User can navigate back without losing data
"Skip for now" option appears on optional steps
Helper text shown as tooltips or expandable sections
Demo avatar opens in modal/overlay
After step 7, redirect to dashboard
Dashboard sidebar navigation should be consistent across all pages
Consider implementing tab state persistence in Training section
File upload should support drag & drop and click to browse
All forms need proper validation and error handling


Status: Complete structure ready for frontend development
