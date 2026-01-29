# Coach Avatar Builder — Style Guide

**Design System Documentation**  
Inspired by: Notion × Superhuman × Apple

---

## 🎨 Design Philosophy

**Core Principles:**
- **Clarity over cleverness** — Every element serves a clear purpose
- **Minimal but warm** — Clean interfaces with human touches
- **Responsive precision** — Perfect on desktop (1440px) and mobile (375px)
- **Fast feedback** — Immediate visual responses to user actions
- **Accessibility first** — WCAG 2.1 AA compliance

**Visual Language:**
- Premium B2B SaaS aesthetic
- Generous white space
- Subtle shadows and borders
- Smooth micro-interactions
- Consistent spacing rhythm

---

## 🎨 Color System

### **Primary Palette**

#### **Green (Primary Action Color)**
- **Use:** All main action buttons, success states
- **Color:** `#16a34a` (green-600)
- **Examples:** 
  - Save Changes
  - Upload Photo
  - Copy Link
  - Add Item
  - Choose Files
  - Add Links

```css
/* Primary Action Button */
background-color: #16a34a;
color: white;
```

#### **Electric Blue/Violet (Brand Accent)**
- **Light mode:** `rgb(99 102 241)`
- **Dark mode:** `rgb(129 140 248)`
- **Use:** Links, highlights, focus states

#### **Violet Accent**
- **Light mode:** `rgb(139 92 246)`
- **Dark mode:** `rgb(167 139 250)`
- **Use:** Secondary accents, gradients

### **Semantic Colors**

#### **Success**
- **Color:** `rgb(34 197 94)` (green-500)
- **Use:** "Saved ✓" indicator, success messages

#### **Warning**
- **Color:** `rgb(251 146 60)` (orange-400)
- **Use:** Incomplete sections, cautionary messages

#### **Destructive**
- **Color:** `rgb(239 68 68)` (red-500)
- **Use:** Delete actions, error states

### **Neutral Palette**

#### **Light Mode**
```css
--background: rgb(255 255 255);
--foreground: rgb(15 23 42);
--muted: rgb(248 250 252);
--muted-foreground: rgb(100 116 139);
--border: rgb(226 232 240);
```

#### **Dark Mode**
```css
--background: rgb(15 23 42);
--foreground: rgb(248 250 252);
--muted: rgb(51 65 85);
--muted-foreground: rgb(148 163 184);
--border: rgb(51 65 85);
```

---

## 📐 Typography

### **Font Stack**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
  "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### **Type Scale**

#### **Heading 1**
```css
font-size: 2.5rem;        /* 40px */
font-weight: 700;
line-height: 1.2;
letter-spacing: -0.025em;
```
**Use:** Page titles, main onboarding step titles

#### **Heading 2**
```css
font-size: 2rem;          /* 32px */
font-weight: 700;
line-height: 1.3;
letter-spacing: -0.02em;
```
**Use:** Section headings, card titles

#### **Heading 3**
```css
font-size: 1.5rem;        /* 24px */
font-weight: 600;
line-height: 1.4;
```
**Use:** Subsection headings, modal titles

#### **Heading 4**
```css
font-size: 1.25rem;       /* 20px */
font-weight: 600;
line-height: 1.4;
```
**Use:** Card subtitles, list headers

#### **Body Text**
```css
font-size: 1rem;          /* 16px */
line-height: 1.6;
```
**Use:** Main content, descriptions, form labels

#### **Small Text**
```css
font-size: 0.875rem;      /* 14px */
line-height: 1.5;
```
**Use:** Helper text, captions, metadata

### **Typography Rules**
- ❌ **Do not use** Tailwind font-size classes (text-xl, text-2xl, etc.) unless specifically changing default styles
- ❌ **Do not use** Tailwind font-weight classes (font-bold, font-semibold) unless overriding
- ❌ **Do not use** Tailwind line-height classes (leading-tight, leading-loose) unless overriding
- ✅ **Do use** semantic HTML elements (h1, h2, h3, p, small) — styles are pre-defined

---

## 📏 Spacing System

### **Base Unit: 4px**

Use Tailwind spacing scale:
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px
- `24` = 96px

### **Common Spacing Patterns**

#### **Component Padding**
```css
/* Small cards */
padding: 1rem;              /* 16px */

/* Medium cards */
padding: 1.5rem;            /* 24px */

/* Large cards */
padding: 2rem;              /* 32px */
```

#### **Vertical Rhythm**
```css
/* Between sections */
margin-bottom: 3rem;        /* 48px */

/* Between elements */
margin-bottom: 1.5rem;      /* 24px */

/* Between form fields */
margin-bottom: 1rem;        /* 16px */
```

#### **Horizontal Spacing**
```css
/* Button groups */
gap: 0.75rem;               /* 12px */

/* Form layouts */
gap: 1.5rem;                /* 24px */
```

---

## 🧩 Component Library

### **Buttons**

#### **Primary Button (Green)**
```tsx
<button className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-150 font-medium">
  Save Changes
</button>
```
**States:**
- Default: `bg-green-600` (#16a34a)
- Hover: `bg-green-700`
- Active: `bg-green-800`
- Disabled: `bg-gray-300 cursor-not-allowed`

#### **Secondary Button**
```tsx
<button className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-150 font-medium">
  Back
</button>
```

#### **Tertiary Button (Text Only)**
```tsx
<button className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-150">
  Skip this step
</button>
```

#### **Icon Button**
```tsx
<button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-150">
  <IconComponent className="w-5 h-5" />
</button>
```

### **Form Elements**

#### **Text Input**
```tsx
<input
  type="text"
  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
  placeholder="Enter your name"
/>
```

#### **Text Area**
```tsx
<textarea
  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-slate-800"
  rows={4}
  placeholder="Describe your approach..."
/>
```

#### **Radio Button Group**
```tsx
<div className="space-y-3">
  <label className="flex items-center space-x-3 cursor-pointer">
    <input type="radio" name="certification" className="w-4 h-4 text-blue-600" />
    <span>Certified coach</span>
  </label>
  <label className="flex items-center space-x-3 cursor-pointer">
    <input type="radio" name="certification" className="w-4 h-4 text-blue-600" />
    <span>In certification process</span>
  </label>
</div>
```

#### **Checkbox**
```tsx
<label className="flex items-center space-x-3 cursor-pointer">
  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
  <span>Stay updated with product news</span>
</label>
```

#### **Slider**
```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
    <span>Warm & Friendly</span>
    <span>Direct & Concise</span>
  </div>
  <input
    type="range"
    min="0"
    max="100"
    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
  />
</div>
```

### **Cards**

#### **Basic Card**
```tsx
<div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
  <h3>Card Title</h3>
  <p className="text-slate-600 dark:text-slate-400 mt-2">Card content goes here.</p>
</div>
```

#### **Interactive Card (Collapsible)**
```tsx
<div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <CheckCircle className="w-5 h-5 text-green-600" />
      <h4>Basic Identity — Complete</h4>
    </div>
    <ChevronDown className="w-5 h-5 text-slate-400" />
  </div>
</div>
```

### **Indicators & Badges**

#### **Auto-Save Indicator (Saving)**
```tsx
<div className="flex items-center gap-2 text-sm text-slate-500">
  <Loader2 className="w-4 h-4 animate-spin" />
  <span>Saving...</span>
</div>
```

#### **Auto-Save Indicator (Saved)**
```tsx
<div className="flex items-center gap-2 text-sm text-green-600">
  <Check className="w-4 h-4" />
  <span>Saved</span>
</div>
```

#### **Status Badge (Complete)**
```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
  <CheckCircle className="w-4 h-4" />
  Complete
</span>
```

#### **Status Badge (Incomplete)**
```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium">
  <AlertCircle className="w-4 h-4" />
  Incomplete
</span>
```

#### **Percentage Indicator**
```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Overall completeness</span>
    <span className="font-semibold">75%</span>
  </div>
  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
    <div className="h-full bg-green-600 rounded-full" style={{ width: '75%' }} />
  </div>
</div>
```

### **Modals**

#### **Modal Container**
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
    {/* Modal content */}
  </div>
</div>
```

#### **Modal Header**
```tsx
<div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4">
  <div className="flex items-center justify-between">
    <h3>Modal Title</h3>
    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
      <X className="w-5 h-5" />
    </button>
  </div>
</div>
```

#### **Modal Body**
```tsx
<div className="px-6 py-6 space-y-6">
  {/* Content */}
</div>
```

#### **Modal Footer**
```tsx
<div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-end gap-3">
  <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
    Cancel
  </button>
  <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
    Save
  </button>
</div>
```

### **Chat Interface (Avatar Preview)**

#### **Chat Container**
```tsx
<div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 h-[400px] flex flex-col">
  {/* Chat messages */}
  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
    {/* Messages */}
  </div>
  {/* Input */}
  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
    <input
      type="text"
      placeholder="Type your message..."
      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
    />
  </div>
</div>
```

#### **User Message**
```tsx
<div className="flex justify-end">
  <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
    I feel stuck with my goals
  </div>
</div>
```

#### **Avatar Message**
```tsx
<div className="flex justify-start">
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">
    Let's explore what's making you feel stuck. What goal are you working on?
  </div>
</div>
```

### **File Upload**

#### **Drag & Drop Zone**
```tsx
<div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-12 text-center hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer">
  <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
  <p className="text-lg font-medium mb-2">Drag & drop files here</p>
  <p className="text-sm text-slate-500">or click to browse</p>
  <p className="text-xs text-slate-400 mt-2">Supported: PDF, DOCX, TXT, MP4, MOV</p>
</div>
```

#### **Uploaded File Item**
```tsx
<div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3">
  <div className="flex items-center gap-3">
    <FileText className="w-5 h-5 text-blue-600" />
    <div>
      <p className="font-medium">coaching-framework.pdf</p>
      <p className="text-sm text-slate-500">2.4 MB</p>
    </div>
  </div>
  <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg">
    <Trash2 className="w-4 h-4 text-red-500" />
  </button>
</div>
```

---

## 🎭 Shadows & Elevation

### **Shadow Levels**

#### **Level 0: Flat**
```css
box-shadow: none;
```
**Use:** Embedded elements, inline content

#### **Level 1: Subtle (shadow-sm)**
```css
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
```
**Use:** Cards at rest, form inputs

#### **Level 2: Card (shadow-card)**
```css
box-shadow:
  0 4px 6px -1px rgb(0 0 0 / 0.05),
  0 2px 4px -2px rgb(0 0 0 / 0.05);
```
**Use:** Elevated cards, hover states

#### **Level 3: Elevated (shadow-elevated)**
```css
box-shadow:
  0 10px 15px -3px rgb(0 0 0 / 0.05),
  0 4px 6px -4px rgb(0 0 0 / 0.05);
```
**Use:** Modals, dropdowns, tooltips

### **Shadow Utilities**

Use predefined classes from `globals.css`:
- `.shadow-smooth` — Subtle shadow
- `.shadow-card` — Card shadow
- `.shadow-elevated` — Modal/dropdown shadow

---

## 🌈 Gradients

### **Primary Gradient**
```css
.gradient-primary {
  background: linear-gradient(135deg, rgb(99 102 241) 0%, rgb(139 92 246) 100%);
}
```
**Use:** Hero sections, call-to-action backgrounds

### **Mesh Gradient (Background)**
```css
.gradient-mesh {
  background:
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.1) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0px, transparent 50%);
}
```
**Use:** Page backgrounds, section backgrounds

---

## 🎬 Animations & Transitions

### **Default Transition**
```css
transition: all 0.15s ease;
```
**Applied to:** buttons, links, inputs, textareas, selects

### **Common Transitions**

#### **Hover Scale**
```css
transition: transform 0.2s ease;
```
```tsx
<div className="hover:scale-105 transition-transform duration-200">
  {/* Content */}
</div>
```

#### **Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
```tsx
<div className="animate-fade-in">
  {/* Content */}
</div>
```

#### **Slide In**
```css
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

#### **Spin (Loading)**
```tsx
<Loader2 className="w-5 h-5 animate-spin" />
```

### **Auto-Save Animation**
```tsx
// Saving state
<div className="transition-opacity duration-200 opacity-70">
  <Loader2 className="w-4 h-4 animate-spin" />
  <span>Saving...</span>
</div>

// Saved state (with fade-in checkmark)
<div className="transition-opacity duration-200 opacity-100">
  <Check className="w-4 h-4 animate-in fade-in duration-300" />
  <span>Saved</span>
</div>
```

---

## 📱 Responsive Design

### **Breakpoints**

```css
/* Mobile first approach */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1440px) { /* 2xl - Desktop target */ }
```

### **Design Targets**

- **Mobile:** 375px (iPhone SE, iPhone 12/13/14)
- **Desktop:** 1440px (MacBook Pro 13", 14", most desktop monitors)

### **Responsive Patterns**

#### **Stack on Mobile, Row on Desktop**
```tsx
<div className="flex flex-col lg:flex-row gap-6">
  <div className="flex-1">{/* Content */}</div>
  <div className="flex-1">{/* Content */}</div>
</div>
```

#### **Full Width on Mobile, Max Width on Desktop**
```tsx
<div className="w-full lg:max-w-4xl lg:mx-auto px-4">
  {/* Content */}
</div>
```

#### **Hide on Mobile**
```tsx
<div className="hidden lg:block">
  {/* Desktop only content */}
</div>
```

#### **Show on Mobile Only**
```tsx
<div className="block lg:hidden">
  {/* Mobile only content */}
</div>
```

---

## 🌗 Theme System

### **Theme Detection**
```tsx
// Auto-detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Default to light theme if no preference
const defaultTheme = prefersDark ? 'dark' : 'light';
```

### **Theme Toggle Implementation**
```tsx
const [theme, setTheme] = useState<'light' | 'dark'>('light');

useEffect(() => {
  // Auto-detect on mount
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}, []);

useEffect(() => {
  // Apply theme
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}, [theme]);
```

### **Theme-Aware Components**
```tsx
// Use Tailwind dark: prefix
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50">
  {/* Content */}
</div>
```

---

## ♿ Accessibility Guidelines

### **WCAG 2.1 AA Compliance**

#### **Color Contrast**
- Normal text: minimum 4.5:1
- Large text (18pt+): minimum 3:1
- UI components: minimum 3:1

#### **Focus States**
```tsx
// Always provide visible focus states
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Click me
</button>
```

#### **Keyboard Navigation**
- All interactive elements must be keyboard accessible
- Use semantic HTML (button, a, input, etc.)
- Provide logical tab order
- Avoid `tabindex` values > 0

#### **Screen Reader Support**
```tsx
// Use semantic HTML
<button aria-label="Close modal">
  <X className="w-5 h-5" />
</button>

// Provide context
<div role="status" aria-live="polite">
  {saving ? 'Saving...' : 'Saved'}
</div>
```

#### **Form Accessibility**
```tsx
<label htmlFor="avatar-name" className="block mb-2">
  Avatar name
</label>
<input
  id="avatar-name"
  type="text"
  aria-required="true"
  aria-describedby="name-hint"
/>
<small id="name-hint" className="text-slate-500">
  How your avatar will be introduced to clients
</small>
```

---

## 📋 Component Checklist

Before deploying a component, verify:

- [ ] Responsive on mobile (375px) and desktop (1440px)
- [ ] Light and dark theme support
- [ ] Proper focus states for keyboard navigation
- [ ] Accessible labels and ARIA attributes
- [ ] Smooth transitions (150-200ms)
- [ ] Green (#16a34a) used for primary actions
- [ ] Consistent spacing (4px base unit)
- [ ] Semantic HTML elements
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Hover states on interactive elements

---

## 🎯 Common Patterns

### **Auto-Save Implementation**
```tsx
const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
const timeoutRef = useRef<NodeJS.Timeout>();

const handleChange = (value: string) => {
  setSaveState('saving');
  
  // Clear previous timeout
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  
  // Debounce save for 2 seconds
  timeoutRef.current = setTimeout(() => {
    // Perform save
    saveData(value);
    setSaveState('saved');
    
    // Reset to idle after 2 seconds
    setTimeout(() => setSaveState('idle'), 2000);
  }, 2000);
};
```

### **Form Validation**
```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = (data: FormData) => {
  const newErrors: Record<string, string> = {};
  
  if (!data.name?.trim()) {
    newErrors.name = 'Avatar name is required';
  }
  
  if (!data.headline?.trim()) {
    newErrors.headline = 'Professional headline is required';
  }
  
  return newErrors;
};
```

### **Modal Management**
```tsx
const [isOpen, setIsOpen] = useState(false);

// Close on Escape key
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };
  
  if (isOpen) {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }
}, [isOpen]);
```

---

## 🚀 Performance Guidelines

### **Optimization Tips**

1. **Lazy load images**
```tsx
<img loading="lazy" src={imageUrl} alt="Description" />
```

2. **Use appropriate image formats**
- WebP for photos
- SVG for icons and illustrations
- PNG for transparency (if WebP not supported)

3. **Debounce expensive operations**
- Auto-save (2 seconds)
- Search inputs (300ms)
- Resize handlers (150ms)

4. **Memoize expensive computations**
```tsx
const expensiveValue = useMemo(() => computeValue(data), [data]);
```

5. **Avoid unnecessary re-renders**
```tsx
const MemoizedComponent = memo(({ data }) => {
  return <div>{data}</div>;
});
```

---

## 📖 References

### **Design Inspiration**
- **Notion:** Clean layouts, subtle interactions, excellent typography
- **Superhuman:** Premium feel, keyboard shortcuts, fast feedback
- **Apple:** Minimalism, attention to detail, smooth animations
- **Linear:** Modern B2B SaaS aesthetic, elegant micro-interactions

### **Tools & Resources**
- **Colors:** Use [Coolors.co](https://coolors.co) for palette exploration
- **Typography:** [Type Scale](https://typescale.com) for scale visualization
- **Icons:** [Lucide Icons](https://lucide.dev) (already in project)
- **Accessibility:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Last Updated:** January 2026  
**Version:** 1.0  
**Maintained by:** Coach Avatar Builder Team
