# EduSphere ERP - Intelligent Education Management System

[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple)](https://vitejs.dev)
[![Google GenAI](https://img.shields.io/badge/Google%20GenAI-API-red)](https://ai.google.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)](https://tailwindcss.com)

## Overview

**EduSphere ERP** is a modern, AI-powered Enterprise Resource Planning system designed for educational institutions. It combines a powerful React-based frontend with intelligent AI capabilities (Google Gemini API) to provide comprehensive school management, analytics, and strategic decision-making assistance.

The application features:
- **Dashboard Analytics**: Real-time statistics on students, teachers, attendance, and revenue
- **Student Management**: Complete student database with GPA, attendance, and fee status tracking
- **Teacher Management**: Teacher profiles with subject, experience, availability, and ratings
- **Course Management**: Structured course catalog with departments and credits
- **Financial Tracking**: Revenue and expense analytics with monthly trends
- **AI Strategic Advisor**: Leverage Google Gemini's advanced reasoning for strategic insights
- **EduBot Chatbot**: Intelligent conversational assistant with database access and navigation

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|----------|
| **Frontend Framework** | React | 19.2.3 | UI library with hooks-based components |
| **Language** | TypeScript | 5.3.3 | Type-safe development |
| **Build Tool** | Vite | 5.0.11 | Lightning-fast build and dev server |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| **UI Components** | Lucide React | 0.562.0 | Beautiful icon library |
| **Charts** | Recharts | 3.6.0 | React charting library |
| **AI/LLM** | Google GenAI SDK | 1.34.0 | Gemini API integration |
| **Markdown** | react-markdown | 10.1.0 | Markdown rendering |

---

## Project Structure

```
edusphere-erp/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── FloatingChatbot.tsx  # AI-powered chatbot overlay
│   │   ├── Sidebar.tsx          # Navigation sidebar with menu
│   │   └── StatCard.tsx         # Reusable stat display card
│   ├── context/             # React Context for state management
│   │   └── DataContext.tsx      # Global data provider with CRUD
│   ├── pages/               # Page components for each feature
│   │   ├── Dashboard.tsx        # Main dashboard with KPIs
│   │   ├── Students.tsx         # Student management interface
│   │   ├── Teachers.tsx         # Teacher management interface
│   │   ├── Courses.tsx          # Course management
│   │   ├── Finance.tsx          # Financial analytics
│   │   └── AIAdvisor.tsx        # Strategic AI advisor interface
│   ├── services/            # Business logic & API calls
│   │   ├── database.ts          # Mock database with dummy data generation
│   │   └── geminiService.ts     # Google Gemini API integration
│   ├── types.ts             # TypeScript type definitions
│   ├── constants.ts         # Mock data & AI prompts
│   ├─┠ App.tsx              # Main app component with routing logic
│   ├─┠ index.tsx            # React app entry point
│   └─┠ index.html           # HTML template
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├─┠ tailwind.config.js    # Tailwind CSS configuration
├─┠ postcss.config.js     # PostCSS configuration
├─┠ .gitignore            # Git ignore patterns
└─┠ README.md             # This file
```

---

## Architecture & Data Flow

### 1. **High-Level Architecture**

```
┌─────────────────────────────────┐
│         USER INTERFACE LAYER (React)          │
│    [Pages] [Components] [FloatingChatbot]    │
└─────────────────────────────────┘
                         └───━──━──┘
                            ┃
┌─────────────────────────────────┐
│     STATE MANAGEMENT LAYER (React Context)   │
│        [DataContext] [DataProvider]           │
│                                               │
│  useData() Hook for all components           │
└─────────────────────────────────┘
                         └──━──━──┘
                            ┃
┌─────────────────────────────────┐
│    BUSINESS LOGIC & API LAYER (Services)    │
│  [database.ts] [geminiService.ts]            │
└─────────────────────────────────┘
            └─━─┘  └─━─┘
               ┃      ┃
        ┌────━─────┘  ┌────━─────┘
        │ Mock Database │  │  Google Gemini │
        │ (In-Memory)   │  │  (Cloud API)   │
        └──────────┘  └──────────┘
```

### 2. **Data Flow Diagram**

#### User Interaction Flow
```
USER INTERACTION
    │
    └─> [React Component Renders]
         │
         └─> [User clicks / types]
              │
              └─> [Event Handler Triggered]
                   │
                   └─> [Call Service Function]
                        │
                        └─> [1. Database Service OR 2. Gemini Service]
                             │              │
                             ┃              └─> [API Call to Gemini]
                             ┃                   │
                    [In-Memory Data]            [LLM Response]
                             │                   │
                             └────> [Process & Format Result]
                                        │
                                        └─> [Update Context/State]
                                             │
                                             └─> [Re-render Components]
                                                  │
                                                  └─> [USER SEES UPDATED UI]
```

#### Data Update Flow
```
[DataContext.tsx]
    │
    │  useContext(DataContext)
    │        │         │          │           │
    ┃        ┃         ┃          ┃           ┃
    └─[addStudent] [addTeacher] [refreshData] [useData Hook]
         │             │             │             │
         ┃             ┃             ┃             ┃
         └─> [db.addStudent()]      [setStudents()]  [Export Context]
              │                      │                │
              ┃                      └─> [useState updates]
         [DatabaseService]               │
              │                        └─> [Components consume]
              └─> [this.students array]
                   (Client-side memory)
```

---## Component Details

### **Components** (`/components`)

#### 1. **FloatingChatbot.tsx**
- **Purpose**: AI-powered conversational interface overlay
- **Features**:
  - Real-time chat with Google Gemini API
  - Function calling for database queries (getSchoolStats, searchStudent, searchTeacher)
  - Navigation via `[[NAV:TAB_NAME]]` tags in AI responses
  - Typing indicators and smooth animations
  - Context-aware responses using chat history
- **Props**:
  - `onNavigate: (tab: NavigationTab) => void` - Callback when user clicks navigation buttons

#### 2. **Sidebar.tsx**
- **Purpose**: Main navigation menu
- **Features**:
  - 6 main navigation items (Dashboard, Students, Teachers, Courses, Finance, AI Advisor)
  - Active tab highlighting
  - Special indicator badge on AI Advisor (Strategic Advisor)
  - Settings and Logout buttons
  - Responsive design with red theme
- **Props**:
  - `activeTab: NavigationTab` - Current active tab
  - `setActiveTab: (tab: NavigationTab) => void` - Callback to switch tabs

#### 3. **StatCard.tsx**
- **Purpose**: Reusable statistics display card
- **Features**:
  - Shows metric title, value, and trend percentage
  - Conditional color coding (green for positive, red for negative trends)
  - Icon integration from Lucide icons
  - Hover animation effects
- **Props**:
  - `title: string` - Card title
  - `value: string | number` - Main metric value
  - `trend?: number` - Percentage change (optional)
  - `trendLabel?: string` - Description of trend (optional)
  - `icon: React.ElementType` - Icon component
  - `colorClass: string` - Tailwind color class

---

### **Services** (`/services`)

#### 1. **database.ts** - DatabaseService Singleton

**Architecture**: In-memory mock database

**Data Structure**:
```typescript
class DatabaseService {
  private students: Student[]
  private teachers: Teacher[]
  private financials: FinancialRecord[]
  
  // Methods
  getStudents(): Student[]
  getTeachers(): Teacher[]
  getFinancials(): FinancialRecord[]
  getStats(): SchoolStats
  addStudent(student: Student): void
  addTeacher(teacher: Teacher): void
}

export const db = new DatabaseService() // Singleton
```

**Dummy Data Generation**:
- `generateDummyData()` creates 65 extra students and 25 extra teachers with random attributes
- Combined with MOCK_STUDENTS and MOCK_TEACHERS from constants.ts
- Total: ~75 students, ~30 teachers in the system

**Key Features**:
- Real-time statistics calculation (totalStudents, avgAttendance, etc.)
- CRUD operations with immediate data refresh
- Singleton pattern ensures single instance across app

#### 2. **geminiService.ts** - Google Gemini Integration

**AI Tools Available** (Function Calling):

1. **getSchoolStats**
   - Description: "Get the current total counts of students, teachers, revenue, and attendance"
   - Parameters: None
   - Returns: SchoolStats object with current system statistics

2. **searchStudent**
   - Description: "Search for a specific student by name to get their details"
   - Parameters: `name: string`
   - Returns: Student object or error message

3. **searchTeacher**
   - Description: "Search for teachers by name or subject"
   - Parameters: `query: string` (name or subject)
   - Returns: Array of Teacher objects or error message

**API Functions**:

```typescript
export const generateStrategicAdvice = async (
  userQuery: string,
  additionalContext: string = ""
): Promise<string>
```
- Uses `gemini-3-pro-preview` with extended thinking (16384 token budget)
- Falls back to `gemini-3-flash-preview` on 429 (rate limit) errors
- For Strategic Advisor page

```typescript
export const getChatbotResponse = async (
  history: {role: string, content: string}[],
  message: string
): Promise<string>
```
- Uses `gemini-3-flash-preview` with function calling
- Maintains conversation history
- For FloatingChatbot component
- Automatic tool invocation and result processing

---

### **Context** (`/context`)

#### DataContext.tsx - Global State Management

**Context Value**:
```typescript
interface DataContextType {
  students: Student[]
  teachers: Teacher[]
  stats: SchoolStats
  financials: FinancialRecord[]
  addStudent: (student: Omit<Student, 'id'>) => void
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void
}
```

**Usage**:
```typescript
// In any component
const { students, teachers, stats, addStudent } = useData()

// Adding new student
const newStudent = {
  name: "John Doe",
  grade: "10-A",
  attendance: 90,
  feesStatus: "Paid",
  gpa: 3.5
}
addStudent(newStudent)
```

**Features**:
- `DataProvider` wraps entire app in App.tsx
- `useData()` hook for consuming context in components
- `refreshData()` helper synchronizes state with database after mutations
- Automatic ID generation (S{number}, T{number})

---

### **Pages** (`/pages`)

#### 1. **Dashboard.tsx**
- Shows KPI cards: Total Students, Total Teachers, Monthly Revenue, Avg Attendance
- Revenue trend chart (Recharts)
- Student performance overview
- Real-time data from DataContext

#### 2. **Students.tsx**
- Searchable student list
- Filters by grade, attendance, fee status
- Add new student functionality
- GPA and attendance tracking display

#### 3. **Teachers.tsx**
- Teacher directory with subject, experience, availability
- Rating system (1-5 stars)
- Filter by subject or availability status
- Add new teacher form

#### 4. **Courses.tsx**
- Course catalog with code, title, department
- Credit hours display
- Linked instructor information
- Course management interface

#### 5. **Finance.tsx**
- Revenue vs. Expenses chart
- Monthly financial trends (Recharts)
- Fee status breakdown (Paid, Pending, Overdue)
- Financial summary KPIs

#### 6. **AIAdvisor.tsx**
- Strategic query interface
- Real-time response from Google Gemini
- Extended thinking capability for complex analysis
- Context injection with current school statistics

---

## Type Definitions (`types.ts`)

```typescript
export interface Student {
  id: string
  name: string
  grade: string           // e.g., "10-A"
  attendance: number      // 0-100 percentage
  feesStatus: 'Paid' | 'Pending' | 'Overdue'
  gpa: number            // 0-4.0
}

export interface Teacher {
  id: string
  name: string
  subject: string
  experience: string      // e.g., "12 Years"
  availability: 'Available' | 'In Class' | 'On Leave'
  rating: number         // 0-5.0
}

export interface Course {
  code: string           // e.g., "PHY101"
  title: string
  department: string
  credits: number
  instructorId: string   // FK to Teacher
}

export interface FinancialRecord {
  month: string          // e.g., "Jan"
  revenue: number
  expenses: number
}

export interface SchoolStats {
  totalStudents: number
  totalTeachers: number
  monthlyRevenue: number
  avgAttendance: number
}

export enum NavigationTab {
  DASHBOARD = 'DASHBOARD',
  STUDENTS = 'STUDENTS',
  TEACHERS = 'TEACHERS',
  COURSES = 'COURSES',
  FINANCE = 'FINANCE',
  AI_ADVISOR = 'AI_ADVISOR'
}
```

---## Getting Started

### Prerequisites

- **Node.js**: v18.0 or higher
- **npm** or **yarn**: For package management
- **Google Gemini API Key**: For AI features
  - Get API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/devasphn/edusphere-erp.git
cd edusphere-erp
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env.local` file in the project root:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Or set the `API_KEY` environment variable:
```bash
export API_KEY=your_gemini_api_key_here
```

#### 4. Start Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

#### 5. Build for Production
```bash
npm run build
```

Generated files in `dist/` directory ready for deployment.

#### 6. Preview Production Build
```bash
npm run preview
```

---

## Development Workflow

### Adding a New Feature

#### Example: Adding a New Page

1. **Create the page component** in `/pages/NewFeature.tsx`:
```typescript
import React from 'react';
import { useData } from '../context/DataContext';

export const NewFeature: React.FC = () => {
  const { students, teachers } = useData();
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-900 mb-4">New Feature</h1>
      {/* Your UI here */}
    </div>
  );
};
```

2. **Update navigation enum** in `/types.ts`:
```typescript
export enum NavigationTab {
  // ... existing tabs
  NEW_FEATURE = 'NEW_FEATURE',
}
```

3. **Add to Sidebar** in `/components/Sidebar.tsx`:
```typescript
const menuItems = [
  // ... existing items
  { id: NavigationTab.NEW_FEATURE, label: 'New Feature', icon: SomeIcon },
]
```

4. **Add routing** in `/App.tsx`:
```typescript
case NavigationTab.NEW_FEATURE:
  return <NewFeature />
```

#### Example: Adding an AI Tool

1. **Define the tool** in `/services/geminiService.ts`:
```typescript
const myNewTool: FunctionDeclaration = {
  name: "myNewTool",
  description: "Tool description",
  parameters: {
    type: Type.OBJECT,
    properties: {
      param1: { type: Type.STRING, description: "Param description" }
    },
    required: ["param1"]
  }
}
```

2. **Implement the tool** in tools object:
```typescript
const tools = {
  myNewTool: (args: { param1: string }) => {
    // Implementation
    return result;
  }
}
```

3. **Register in Gemini chat**:
```typescript
tools: [{ functionDeclarations: [..., myNewTool] }]
```

---

## Key Concepts

### **Singleton Pattern - Database Service**
```typescript
// database.ts
class DatabaseService { ... }
export const db = new DatabaseService() // Single instance

// Usage in any file
import { db } from './database'
const students = db.getStudents() // Same instance everywhere
```

### **React Context for Global State**
```typescript
// DataContext.tsx provides data to entire app
<DataProvider>
  <App /> // All children can use useData()
</DataProvider>

// In any component
const { students, addStudent } = useData()
```

### **AI Function Calling Flow**
```
User Message
    │
    └─> Gemini AI evaluates if tool is needed
         │
         │  YES: Return tool call
         │
         └─> Execute tool locally
              │
              └─> Send results back to Gemini
                   │
                   └─> Gemini generates response
                        │
                        └─> Display to user
```

---

## Styling & Design System

### **Color Palette**
- **Primary**: Red (`#DC2626`, `#991B1B`)
- **Light Background**: Cream (`#FEF2F2`)
- **Accents**: Emerald (positive trends), Rose (negative trends)

### **Tailwind CSS Usage**
```tsx
// Example component styling
<div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
  <h2 className="text-red-900 font-bold">Title</h2>
  <p className="text-red-600 text-sm">Subtitle</p>
</div>
```

### **Responsive Design**
- Mobile-first approach
- Sidebar fixed on desktop, collapsible on mobile
- Flex layout for responsive grids
- TailwindCSS breakpoints: `sm`, `md`, `lg`, `xl`

---

## Performance Optimization

1. **Lazy Loading**: Pages load on demand via switch statement
2. **Memoization**: Use React.memo() for expensive components
3. **Code Splitting**: Vite automatically chunks code
4. **Context Optimization**: DataContext separated from UI Context
5. **API Caching**: Gemini responses can be cached client-side

---

## Troubleshooting

### Issue: "API_KEY not set" Error
**Solution**:
```bash
export API_KEY=your_key_here
# or in .env.local
VITE_GEMINI_API_KEY=your_key_here
```

### Issue: Chatbot returns empty responses
**Possible Causes**:
- API rate limit (429 error) - Falls back to flash model
- Invalid API key
- Network connectivity issue

**Solution**: Check browser console for error messages, verify API key, check rate limits

### Issue: Data not persisting
**Note**: Database is in-memory. Data resets on page refresh.
**Solution**: For persistence, integrate with a real database (MongoDB, PostgreSQL, etc.)

---

## Future Enhancements

1. **Backend Integration**
   - Replace mock database with REST API
   - Add authentication (JWT/OAuth)
   - Implement real database (MongoDB, PostgreSQL)

2. **Advanced Features**
   - Student performance predictions with AI
   - Automated attendance tracking
   - Parent portal integration
   - Mobile app (React Native)

3. **AI Enhancements**
   - Custom fine-tuned models
   - Real-time anomaly detection
   - Predictive analytics for retention

4. **UI/UX Improvements**
   - Dark mode support
   - Advanced filtering and search
   - Export to PDF/Excel
   - Real-time notifications

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `API_KEY` | Yes | - | Google Gemini API Key |
| `VITE_API_URL` | No | - | Backend API endpoint (for future use) |
| `NODE_ENV` | No | development | Environment mode |

---

## Project Statistics

- **Total Files**: ~15 components + services
- **Lines of Code**: ~2000+
- **Dependencies**: 8 core packages
- **Dev Dependencies**: 9 packages
- **Test Coverage**: Ready for implementation
- **Build Time**: <3 seconds (Vite)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License.

---

## Contact & Support

- **Developer**: devasphn
- **GitHub**: [github.com/devasphn/edusphere-erp](https://github.com/devasphn/edusphere-erp)
- **Issues**: [GitHub Issues](https://github.com/devasphn/edusphere-erp/issues)

---

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

**Built with ❤️ using React, TypeScript, and Google Gemini API**
