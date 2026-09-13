# 🧱 DevStack Builder

DevStack Builder is a modern, high-performance web technology aggregator and stack configuration platform. It allows developers to discover curated frontend, backend, database, language, styling, and DevOps technologies, build custom project stacks interactively, analyze stack metrics, and prevent duplicate tool selections in real time.

---

## 🛠️ Technologies Used

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, DaisyUI
- **Icons**: Lucide React
- **Notifications**: React-Toastify
- **Data Source**: JSON (`/public/technologies.json`)
- **Version Control**: Git & GitHub

---

## ✨ Key Features

1. **Interactive Technology Selector & Search Filters**:
   - Filter technologies across multiple categories (*Frontend, Backend, Database, Language, Styling, DevOps, Tools*).
   - Instant search by tool name, description, or keyword.
   - Dynamic badges (*Popular, Fast, Essential, Top SQL*) and difficulty ratings (*Beginner-Friendly, Intermediate, Advanced*).

2. **Real-time "Your Stack" Builder & Duplicate Guard**:
   - Add technologies into a dedicated stack sidebar with instant count tracking.
   - Smart duplicate prevention: cards disable with a `✓ Added to Stack` badge upon addition and display toast warnings if re-clicked.
   - Individual tool removal (✕) and one-click `Remove All` stack clearing.

3. **Premium Dark UI & Custom Gradient Branding Theme**:
   - Unified gradient branding (orange → pink → violet) across logo, heading highlights, badges, and primary call-to-actions.
   - Fully responsive design (mobile drawer navigation, tablet 2-column grid, desktop 3-column grid + sticky sidebar).
   - Interactive React Architecture Q&A accordion section built directly into the web application.

---

## 🧠 React Core Questions & Answers

### 1. What is JSX, and why is it used in React?
**Answer**: JSX (JavaScript XML) is a syntax extension for JavaScript that allows developers to write HTML-structured elements directly inside JavaScript code. It is used in React because it combines UI rendering logic with component state in a clear, declarative, and intuitive visual format. JSX is transpiled into `React.createElement()` calls behind the scenes.

### 2. What is the difference between props and state?
**Answer**:
- **Props**: Immutable read-only parameters passed downwards from a parent component to a child component to configure it.
- **State**: Mutable internal data managed within a component using hooks like `useState`. When state updates, React automatically triggers a component re-render.

### 3. What does the `useState` hook do, and where did you use it in this project?
**Answer**: `useState` is a React Hook that declares a state variable and a setter function inside a functional component. In this project, `useState` is used in `App.tsx` to hold `selectedStack` (array of chosen tech tools), `technologies` (fetched JSON data), `isLoading`, and `error` states, as well as category filter & search queries in `TechCards.tsx`.

### 4. What does the `useEffect` hook do, and why did you need it to load the JSON data?
**Answer**: `useEffect` performs side effects in functional components (such as asynchronous API calls, subscriptions, or DOM mutations). We needed `useEffect` with an empty dependency array (`[]`) in `App.tsx` so that `fetch('/technologies.json')` runs automatically once when the application mounts to populate technology cards without blocking component rendering.

### 5. Why does every item in a `.map()` list need a unique `key` prop?
**Answer**: React relies on the `key` prop during its Virtual DOM diffing/reconciliation process to track each item's identity across re-renders. Unique keys help React determine which specific items were added, removed, or modified, preventing unnecessary DOM re-creations and bugs in stateful list items.

### 6. What is conditional rendering? Show one place you used it.
**Answer**: Conditional rendering is the technique of rendering different UI elements or components based on evaluating JavaScript expressions (booleans, ternary operators, or logical `&&`). In this project, it is used in `YourStack.tsx` to display an empty state placeholder when `stack.length === 0`, or the list of selected tech items when `stack.length > 0`.

```tsx
{count === 0 ? (
  <EmptyStackMessage />
) : (
  <StackList items={stack} />
)}
```

### 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
**Answer**:
- **Parent → Child**: Passed down as component attributes known as `props`.
- **Child → Parent**: The parent component passes a callback function via props to the child. When an event occurs (e.g. clicking "Add to Stack"), the child executes the callback function with payload data, allowing the parent to update its state.

---

## 🚀 Running Locally

```bash
# Clone repository
git clone https://github.com/Shafi7055/dev-stack.git

# Navigate into project directory
cd dev-stack

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```
