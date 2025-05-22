Here's a refined and comprehensive project plan with detailed steps based on your requirements:

# Polling/Voting App with LMC Crypto Rewards - Complete Implementation Plan

## 1. Core Data Models (Detailed Implementation)

### User Model
- [x] Fields: id, username, email, hashedPassword, googleId, walletAddress, balance (default 5 LMC), createdAt, updatedAt
- [x] Methods: 
  - `createWithWallet()` - creates user and initializes wallet
  - `transferLMC()` - handles balance transfers
  - `addDiscussionReward()` - processes discussion rewards

### Topic System
- [x] Topic model with versioning:
  - `content` field with AI-generated structure (subject, summary, propositions, etc.)
  - `versionHistory` array tracking all changes
  - `currentVersion` pointer
- [x] Version control system:
  - Auto-increment version numbers
  - Timestamped edits
  - Change diffs between versions

### Discussion Flow
- [x] Discussion states:
  - Pending (before start)
  - Active (1-hour discussion period)
  - Voting (15-minute voting window)
  - Completed (with reward distribution flag)
- [x] Participant validation:
  - Must be registered users
  - Cannot be creator
  - Max 2 participants

## 2. Wallet & LMC Currency (Enhanced Implementation)

### Wallet Service
- [x] Initialization:
  - Auto-create on user registration
  - Initial 5 LMC balance
  - Unique wallet address generation

### Transaction System
- [x] Transfer flow:
  - Sender validation (sufficient balance)
  - 0.1 LMC network fee calculation
  - Atomic transaction recording
  - Balance updates with transaction locking

### Reward Distribution
- [x] Discussion completion handler:
  - Verify all votes are counted
  - Distribute 10 LMC to creator
  - Distribute 1 LMC to each participant
  - Deduct 0.1 LMC fee per reward transaction
  - Mark discussion as rewarded

## 3. Frontend Implementation (Detailed Components)

### Multilingual UI System
- [x] Language toggle component
- [x] Persian/English translation files for:
  - All UI labels
  - Form validation messages
  - System notifications
  - Documentation

### Topic Creation Workflow
1. [x] Basic info form (title, description)
2. [x] AI Processing:
   - Loading state
   - Error handling
   - Result preview panel
3. [x] Editing interface:
   - Section-by-section modification
   - Version comparison
4. [x] Publishing controls

### Discussion Timer System
- [x] Real-time countdown display
- [x] State indicators (discussion/voting periods)
- [x] Participant status tracking
- [ ] Reward distribution notifications

## 4. API Endpoints (Complete Specification)

### AI Processing Endpoint
```
POST /api/ai/process
Headers: Authorization
Body: { topicDescription: string }
Response: {
  analysis: {
    subject: string
    summary: string  
    logicalPropositions: string[]
    // ...all AI-generated fields
  },
  processingTime: number
}
```

### Discussion Management
```
POST /api/discussions
Body: {
  topicId: string
  participants: string[] (1-2 usernames)
}

GET /api/discussions/:id/timer
Response: {
  phase: 'discussion'|'voting'|'completed'
  remaining: number (seconds)
  participants: {
    username: string
    voted: boolean
  }[]
}
```

## 5. Business Logic (Critical Paths)

### n8n AI Integration
1. [x] API contract definition
2. [x] Error handling:
   - Timeouts
   - Invalid responses
   - Rate limiting
3. [x] Response validation
4. [x] Local caching strategy

### Reward Engine
```typescript
class RewardService {
  async distributeDiscussionRewards(discussionId: string) {
    // 1. Verify discussion is in correct state
    // 2. Validate all participants voted
    // 3. Process transactions atomically
    // 4. Update discussion status
    // 5. Send notifications
  }
}
```

## 6. Scheduled Tasks (Robust Implementation)

### Discussion State Machine
- [ ] Node-cron jobs for:
  - Discussion → Voting transition
  - Voting → Completed transition
  - Reward distribution
- [ ] Failure recovery:
  - Missed job handling
  - Duplicate execution prevention
  - Status reconciliation

## 7. Security Implementation

### Comprehensive Validation
- [x] All API endpoints:
  - Input sanitization
  - Ownership verification
  - Rate limiting
- [x] Wallet operations:
  - Double-spend prevention
  - Balance locks during transfers
  - Transaction nonces

## 8. Testing Strategy

### Test Cases
1. [x] User registration and wallet initialization
2. [x] Topic lifecycle:
   - Creation → AI processing → Editing → Publishing
3. [x] Full discussion flow:
   - Creation → Timer states → Voting → Rewards
4. [x] Edge cases:
   - Simultaneous votes
   - Network failures during transfers
   - Version conflict resolution

## 9. Documentation Standards

### API Documentation
- [ ] OpenAPI/Swagger specification
- [ ] Example requests/responses
- [ ] Error code reference

### System Architecture
- [ ] Sequence diagrams for:
  - Topic creation flow
  - Discussion reward flow
- [ ] Database schema
- [ ] Service interactions

## 10. Deployment Preparation

### Environment Configuration
- [ ] Docker setup for:
  - Application server
  - Database
  - n8n instance
- [ ] Production checklist:
  - HTTPS configuration
  - Monitoring setup
  - Backup procedures

## 11. UI/UX and RTL Enhancements

- [x] Persian homepage fully RTL and visually matches English design
- [x] Navbar layout consistent in both English and Persian (menu next to brand, auth/language on far right)
- [x] Brand is always 'LogikMeter' in both languages
- [x] All navigation and layout elements are i18n and RTL-aware
- [x] Responsive, modern Bootstrap design for all main pages

This plan provides complete coverage of your requirements while adding necessary technical depth and implementation specifics. Each component includes all the detailed steps needed for a robust production-ready implementation. Would you like me to elaborate on any particular section?

# ---

## Reference: Full System Specification

# Comprehensive Prompt for Implementing a Polling/Voting Application with Crypto Rewards

## Data Models

```typescript
// models/User.ts
interface User {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
  googleId?: string;
  walletAddress: string;
  balance: number; // LMC balance
  createdAt: Date;
  updatedAt: Date;
}

// models/Topic.ts
interface Topic {
  id: string;
  title: string;
  description: string;
  authorId: string; // User ID
  versions: TopicVersion[];
  createdAt: Date;
  updatedAt: Date;
}

// models/TopicVersion.ts
interface TopicVersion {
  id: string;
  topicId: string;
  versionNumber: number;
  content: {
    subject: string;
    summary: string;
    logicalPropositions: string[];
    logicalFormula: string;
    interpretation: string;
    conclusion: string;
    pollQuestion: string;
    pollOptions: string[];
  };
  createdAt: Date;
}

// models/Poll.ts
interface Poll {
  id: string;
  topicId: string;
  currentVersionId: string; // Latest TopicVersion ID
  votes: Vote[];
  createdAt: Date;
  updatedAt: Date;
}

// models/Vote.ts
interface Vote {
  id: string;
  pollId: string;
  userId: string;
  option: string; // Selected poll option
  createdAt: Date;
}

// models/Discussion.ts
interface Discussion {
  id: string;
  topicId: string;
  creatorId: string; // User who started discussion
  participants: string[]; // User IDs
  startTime: Date;
  endTime: Date;
  voteEndTime: Date;
  status: 'pending' | 'active' | 'voting' | 'completed';
  rewardsDistributed: boolean;
  createdAt: Date;
}
```

## Frontend Pages

### 1. Landing Page
- Complete description of system functionality
- Login/signup section
- "Login with Google" and "Register with Email" buttons

### 2. User Dashboard
- Wallet balance (LMC)
- List of topics created by the user
- "Create New Topic" button

### 3. Topic Creation/Edit Page
- Topic creation form with fields:
  - Topic title
  - Initial description
- "Request AI Analysis" button connected to n8n API
- Preview of AI analysis results (in specified format)
- Option to edit results before publishing
- Publish button

### 4. Topic Page
- Display latest topic version
- Active poll with voting options
- Version history
- Comments section
- "Start Discussion" button to initiate new discussion

### 5. Create Discussion Page
- Select topic
- Enter username(s) of 1 or 2 participants
- Confirm and start discussion with 1-hour timer
- Display discussion status and remaining time

### 6. Wallet Page
- LMC balance
- Transaction history
- Form to transfer LMC to other users

## Backend Logic

### 1. Authentication System
- Google login (Firebase Auth or Passport.js)
- Traditional email/password registration
- JWT for session management

### 2. API Endpoints
```typescript
// Auth
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/google

// Topics
POST /api/topics - Create new topic
GET /api/topics - List all topics
GET /api/topics/:id - Get topic details
POST /api/topics/:id/versions - Create new version
POST /api/topics/analyze - Send to n8n AI processing

// Polls
POST /api/polls/vote - Submit a vote
GET /api/polls/:id - Get poll results

// Discussions
POST /api/discussions - Start new discussion
GET /api/discussions/:id - Get discussion status
POST /api/discussions/:id/complete - Mark as completed

// Wallet
GET /api/wallet - Get user balance
POST /api/wallet/transfer - Transfer LMC
```

### 3. Payment and LMC Currency Service
```typescript
class WalletService {
  // Initialize new user with 5 LMC
  async initializeUserWallet(userId: string) {
    // Create wallet record with 5 LMC
  }

  // Transfer LMC between users
  async transfer(senderId: string, receiverId: string, amount: number) {
    // Validate balance
    // Deduct from sender (including 0.1 LMC fee)
    // Add to receiver
    // Record transaction
  }

  // Distribute discussion rewards
  async distributeDiscussionRewards(discussionId: string) {
    // Give 10 LMC to creator
    // Give 1 LMC to each participant
    // Deduct 0.1 LMC fee per transaction
    // Mark discussion as rewarded
  }
}
```

### 4. Scheduling and Discussions (Discussion Timer)
```typescript
class DiscussionService {
  async startDiscussion(topicId: string, creatorId: string, participants: string[]) {
    // Create discussion record
    // Set start time
    // Set end time (start + 1 hour)
    // Set vote end time (end + 15 mins)
    
    // Start background job to:
    // 1. Mark discussion as voting when time ends
    // 2. Close voting after 15 mins
    // 3. Distribute rewards
  }
}
```

### 5. n8n Integration for AI Processing
```typescript
POST /api/ai/process
Request body: { topicDescription: string }
Response: {
  subject: string,
  summary: string,
  logicalPropositions: string[],
  logicalFormula: string,
  interpretation: string,
  conclusion: string,
  pollQuestion: string,
  pollOptions: string[]
}
```

## Key Flows

### 1. Topic Creation and Polling Flow
1. User logs in
2. Creates new topic
3. System sends topic to n8n for processing
4. Analysis results are displayed
5. User can make edits
6. User publishes topic
7. Poll is created

### 2. Discussion and Reward Flow
1. User clicks "Start Discussion"
2. Enters username(s) of 1-2 participants
3. Discussion begins with 1-hour timer
4. After 1 hour, 15-minute voting period starts
5. Participants vote
6. After voting ends, rewards are distributed

## Implementation Notes

1. **Technologies**:
   - Frontend: Next.js with Bootstrap
   - Backend: Next.js API routes
   - Database: PostgreSQL or MongoDB
   - Authentication: NextAuth.js for Google and traditional auth
   - Scheduling: node-cron for background jobs

2. **Security**:
   - Validate all inputs
   - Check permissions before each action
   - Hash passwords
   - Use HTTPS

3. **Optimizations**:
   - Caching for popular topics
   - Pagination for lists
   - Asynchronous loading for heavy data

This prompt covers all aspects needed to implement the system. For development, you can start by implementing the data models and main pages, then add the business logic.