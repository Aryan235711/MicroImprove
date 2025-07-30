# The 9 Experiments - Micro Self-Improvement Platform

## Overview

The 9 Experiments is a web-based micro-platform presenting 9 scientifically-inspired self-experiments that users can try over short durations to improve brain-body awareness. Each experiment is simple, low-barrier, and designed to be completed over 3 days. The platform includes progress tracking, completion rewards, and gamification elements to encourage user engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with a clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and celebrations
- **State Management**: TanStack Query for server state, local storage for persistence
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Architecture Pattern**: RESTful API (minimal backend, frontend-focused)
- **Data Storage**: Browser localStorage (no database required for core functionality)
- **Session Management**: Memory-based storage with optional database integration

## Key Components

### Core Features
1. **Experiment Display**: Grid layout showing all 9 experiments
2. **Progress Tracking**: Local storage-based progress persistence
3. **Daily Logging**: Note-taking functionality for each experiment day
4. **Gamification**: Completion rewards and celebration animations
5. **Responsive Design**: Mobile-first approach with adaptive layouts

### Data Models
- **Experiment**: Contains metadata, instructions, and styling information
- **ExperimentProgress**: Tracks completion status, days completed, and user notes
- **UserProgress**: Overall progress tracking with streak counting and reward status

### UI Components
- **ExperimentCard**: Individual experiment display with status indicators
- **ExperimentModal**: Detailed view with daily tracking interface  
- **ProgressOverview**: Dashboard showing overall completion status
- **CelebrationModal**: Animated celebration for completed experiments
- **CompletionReward**: Final reward display when all experiments are complete

## Data Flow

### Client-Side Data Management
1. **Local Storage**: Primary persistence layer for user progress
2. **State Hooks**: Custom hooks manage experiment state and localStorage interaction
3. **Real-time Updates**: Immediate UI updates with localStorage synchronization
4. **Progress Calculation**: Dynamic computation of completion percentages and streaks

### Component Interaction Flow
1. User views experiment grid on homepage
2. Clicking experiment opens detailed modal
3. Daily completion updates local storage
4. Progress components re-render automatically
5. Celebration triggers on experiment completion
6. Reward unlocks when all 9 experiments complete

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Query for state management
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, Class Variance Authority for component variants
- **Animation**: Framer Motion for smooth transitions
- **Routing**: Wouter for lightweight routing
- **Forms**: React Hook Form with Zod validation

### Development Dependencies
- **Build Tools**: Vite, ESBuild for production builds
- **TypeScript**: Full type safety across client and server
- **Database Ready**: Drizzle ORM configured for future PostgreSQL integration
- **Development Experience**: Replit integration, runtime error overlays

### Optional Integrations
- **Database**: Neon PostgreSQL (configured but not required)
- **Analytics**: Ready for backend progress tracking endpoints
- **Monetization**: Placeholder for payment integration

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Type Checking**: TypeScript compilation with strict mode
- **Database Migration**: Drizzle Kit for schema management

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Deployment**: Single Node.js process serving both API and static files
- **Environment Variables**: DATABASE_URL for optional database connection

### Replit Integration
- **Development Tools**: Cartographer for visual debugging
- **Error Handling**: Runtime error modal overlay
- **Hot Reloading**: Automatic restart on server changes

The architecture prioritizes simplicity and user experience, with local storage handling all core functionality while maintaining the flexibility to add backend persistence later. The component-based design allows for easy feature additions and modifications while maintaining type safety throughout the application.