# LogikMeter: Polling/Voting App with Crypto Rewards

## Overview
LogikMeter is a web application that enables users to create, analyze, and discuss logical topics, vote on polls, and earn crypto rewards (LMC tokens) for participation. The platform leverages AI for topic analysis, supports versioned topics, and incentivizes engagement through a built-in wallet and reward system.

## Key Features
- **User Authentication:** Sign up/login with Google or email/password. Secure JWT-based sessions.
- **Wallet & LMC Currency:** Each user has a wallet with LMC tokens. Earn, transfer, and track LMC through platform activities.
- **Topic Creation & AI Analysis:** Users create topics, request AI-powered logical analysis (via n8n), and publish versioned topics.
- **Polling & Voting:** Each topic has an associated poll. Users vote on logical questions and see real-time results.
- **Discussions:** Start time-limited discussions on topics, invite participants, and vote on outcomes. Rewards are distributed based on participation.
- **Transaction History:** View all wallet transactions and LMC transfers.
- **Responsive UI:** Built with Next.js and Bootstrap for a modern, mobile-friendly experience.

## How It Works
1. **Sign Up & Wallet:** Users register (Google/email). A wallet is created with 5 LMC tokens.
2. **Create Topic:** Users propose a topic and request AI analysis. The system generates logical breakdowns and poll questions.
3. **Publish & Poll:** After reviewing AI results, users publish the topic. A poll is created for community voting.
4. **Start Discussion:** Users can initiate discussions, invite others, and set a 1-hour timer. After discussion, a 15-minute voting period begins.
5. **Vote & Rewards:** Participants vote. After voting ends, LMC rewards are distributed automatically.
6. **Wallet & Transfers:** Users can transfer LMC to others (with a small fee) and view transaction history.

## Technologies Used
- **Frontend:** Next.js, Bootstrap
- **Backend:** Next.js API routes
- **Database:** PostgreSQL (preferred) or MongoDB
- **Authentication:** NextAuth.js
- **Scheduling:** node-cron
- **AI Integration:** n8n for topic analysis

## Required Versions for Deployment

To ensure smooth deployment and avoid build/runtime errors (especially on Coolify), use the following versions:

- **Node.js:** `18.20.5`  
  _Recommended: Use Node.js 18 LTS. (Coolify and Next.js 15+ are fully compatible with Node 18.x)_
- **npm:** `10.8.2`  
  _This is the version used in your build logs. Any npm 9+ is fine, but 10.x is recommended for Node 18.20.5._
- **Next.js:** `15.3.2`  
  _As specified in your `package.json`._
- **React:** `19.0.0`  
  _As specified in your `package.json`._
- **React DOM:** `19.0.0`  
  _As specified in your `package.json`._
- **TypeScript:** `^5.0.0`  
  _As specified in your `package.json`._
- **Mongoose:** `^8.15.0`  
  _As specified in your `package.json`._
- **Bootstrap:** `^5.3.6`  
  _As specified in your `package.json`._
- **Bootstrap RTL:** `^3.3.4`  
  _Note: This is an old version and may show warnings, but it works for CSS. For Bootstrap 5+ RTL, consider [RTL Bootstrap 5 solutions](https://rtlcss.com/)._
- **NextAuth.js:** `^4.24.11`  
  _As specified in your `package.json`._
- **Tailwind CSS:** `^4.0.0`  
  _As specified in your `package.json`._
- **@tailwindcss/postcss:** `^4.0.0`  
  _As specified in your `package.json`._
- **PostgreSQL:** `14+` (if using Postgres)  
  _Or MongoDB 6+ if using MongoDB. Make sure your database version matches your hosting provider's supported versions._

### How to Set Node and npm Version

- If you use Coolify, set the Node.js version in the project settings or via an `.nvmrc` file:
  ```
  18.20.5
  ```
- Or, in your `package.json`, add:
  ```json
  "engines": {
    "node": "18.20.5",
    "npm": "10.8.2"
  }
  ```

## Security & Best Practices
- Input validation, permission checks, and secure password storage
- HTTPS and secure cookies
- Error handling and logging

## Project Structure
```
project/
├── app/
├── components/
├── public/
├── styles/
│   ├── custom.scss    # Custom Bootstrap overrides
│   └── variables.scss # Bootstrap variable overrides
├── tests/
├── docs/
├── Rules.md
├── tasks.md
├── README.md
└── pnpm-lock.yaml     # pnpm lock file
```

## Development Steps
<!-- The following checklist is auto-generated from todo.md -->
- [ ] Initialize project structure and repository
- [ ] Set up pnpm and pnpm-lock.yaml
- [ ] Create .env, .env.example, .env.local files
- [ ] Add README.md and document project overview
- [ ] Add Rules.md and tasks.md
- [ ] Set up Next.js (frontend & API routes)
- [ ] Set up PostgreSQL (preferred) or MongoDB
- [ ] Implement User model
- [ ] Implement Topic and TopicVersion models
- [ ] Implement Poll and Vote models
- [ ] Implement Discussion model
- [ ] Implement Wallet/Transaction model
- [ ] Integrate NextAuth.js (Google + email/password)
- [ ] Implement JWT session management
- [ ] Secure password hashing
- [ ] User registration/login pages
- [ ] Initialize wallet with 5 LMC on signup
- [ ] Display wallet balance in dashboard
- [ ] Implement LMC transfer (with fee)
- [ ] Show transaction history
- [ ] Distribute rewards after discussions
- [ ] Landing page (system description, login/signup)
- [ ] User dashboard (topics, wallet, create topic)
- [ ] Topic creation/edit page (form, AI analysis, preview, publish)
- [ ] Topic page (latest version, poll, history, comments, start discussion)
- [ ] Create discussion page (select topic, participants, timer)
- [ ] Wallet page (balance, transfer, history)
- [ ] Auth endpoints (login, signup, Google)
- [ ] Topic endpoints (CRUD, AI analysis)
- [ ] Poll endpoints (vote, results)
- [ ] Discussion endpoints (start, status, complete)
- [ ] Wallet endpoints (balance, transfer)
- [ ] WalletService (init, transfer, rewards)
- [ ] DiscussionService (timers, status, rewards)
- [ ] n8n AI integration (topic analysis)
- [ ] Permissions and validation
- [ ] Set up node-cron for discussion timers
- [ ] Automate status changes and reward distribution
- [ ] Input validation and sanitization
- [ ] Permission checks for all actions
- [ ] Use HTTPS and secure cookies
- [ ] Error handling and logging
- [ ] Caching for popular topics
- [ ] Pagination for lists
- [ ] Async data loading
- [ ] Unit tests for models and services
- [ ] Integration tests for API endpoints
- [ ] End-to-end tests for user flows
- [ ] Security tests
- [ ] Document test procedures
- [ ] Update README with setup and usage
- [ ] Document API endpoints
- [ ] Document environment variables
- [ ] Document major decisions and flows
- [ ] Keep docs/ updated

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
