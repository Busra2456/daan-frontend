Daan — Donate with Trust

Donate with Trust. Help someone who truly needs it.

Daan is a trusted donation platform that connects verified people in need with genuine donors.

The platform is designed to make charitable giving more transparent, trustworthy, and meaningful. People in need can share their situations with supporting information, while donors can review verified requests, communicate with recipients, and make secure donations through a real payment gateway.

# Project Submission Information
Project Name            : Daan — Donate with Trust
Backend Repo            : https://github.com/your-username/your-daan-backend-repo
Frontend Repo           : https://github.com/your-username/your-daan-frontend-repo
Live Backend URL        : https://daan-7z6n.vercel.app
Live Frontend URL       : https://daan-frontend.vercel.app
API Documentation       : YOUR_API_DOCUMENTATION_URL
Demo Video              : YOUR_GOOGLE_DRIVE_VIDEO_URL
Demo Admin Email        : YOUR_DEMO_ADMIN_EMAIL
Demo Admin Password     : YOUR_DEMO_ADMIN_PASSWORD

Note: Replace the repository, API documentation, demo video, and demo credentials placeholders with the actual submission information before submitting the assignment.

Never use personal or production credentials as demo credentials.

# Project Overview

Many people genuinely need financial help, but donors often hesitate because they cannot verify whether a request is authentic.

Daan — Donate with Trust addresses this problem by introducing an admin verification system between needy people and donors.

How It Works
NEEDY
  ↓
Create Donation Request
  ↓
ADMIN Verification
  ↓
Verified Request
  ↓
DONOR Reviews Request
  ↓
Communication
  ↓
Secure Donation
  ↓
COMPLETED
# Key Features
# Authentication & Authorization
Email/password registration
Email verification with OTP
Secure JWT authentication
HTTP-only authentication cookies
Refresh token support
Google authentication
Forgot password
Reset password
Logout
Role-based authorization
Protected routes
One-click demo login
 User Roles

Daan has three main user roles.

# NEEDY

People who need financial assistance can:

Create donation requests
Provide detailed situation information
Upload supporting information
View their own requests
Edit requests
Track request status
Receive donations
# DONOR

Donors can:

Browse verified donation requests
View complete request details
Communicate with needy users
Create donations
Make secure online payments
View donation history
# ADMIN

Administrators can:

Manage users
View donation requests
Review pending requests
Verify donation requests
Reject requests
Monitor completed requests
Manage user status
# Payment Integration

Daan uses SSLCommerz Test Mode for real payment gateway integration.

Payment Flow
Donation
   ↓
Create Payment
   ↓
SSLCommerz Gateway
   ↓
Payment Processing
   ↓
Success / Failed / Cancelled
   ↓
Donation Status Updated
Payment Result Pages
/payment-success
/payment-failed
/payment-cancelled

The payment flow has been tested successfully using the SSLCommerz sandbox environment.

# Technology Stack
Frontend
Next.js 16
React 19
TypeScript
Tailwind CSS
shadcn/Base UI
Lucide React
TanStack Query
TanStack Form
Zod
ofetch
Sonner
Backend
Node.js
Express.js
TypeScript
Prisma
PostgreSQL
Redis
JWT
Nodemailer
Multer
SSLCommerz
# Frontend Architecture

The project follows the Next.js App Router architecture.

src/
├── app/
│   ├── (authGroup)/
│   ├── (dashboardGroup)/
│   ├── (publicGroup)/
│   ├── payment-success/
│   ├── payment-failed/
│   ├── payment-cancelled/
│   ├── error.tsx
│   ├── loading.tsx
│   ├── layout.tsx
│   └── not-found.tsx
│
├── components/
│   ├── shared/
│   ├── ui/
│   └── modules/
│
├── hooks/
├── lib/
├── providers/
├── types/
└── validation/
Architecture Highlights
Server Components by default
Client Components only where interactivity is required
Next.js App Router
Route-level code splitting
Global loading state
Error boundary
Protected routes using proxy.ts
Feature-based actions and components
Reusable custom hooks
Strict TypeScript
Modular component structure
# Responsive Design

Daan follows a mobile-first responsive design approach.

The interface is designed for:

 Mobile devices
 Desktop screens
 Large screens

The project uses Tailwind CSS and reusable UI components to maintain a consistent and accessible design system.

# State Management & API Integration

The frontend uses TanStack Query for server-state management.

It handles:

API data fetching
Mutations
Loading states
Error states
Query caching
Data synchronization

Reusable custom hooks are organized inside:

src/hooks/
Examples
useLoginAction()
useGetMe()
useGoogleLoginAction()
useAllDonationRequests()
useVerifiedDonationRequests()
useCreateDonation()
useCreatePayment()
useAllUsers()
# Form Handling & Validation

Forms are implemented using:

TanStack Form
Zod
TypeScript

Validation is applied to authentication and application forms to provide clear and user-friendly validation messages.

Frontend validation is designed to stay consistent with the backend validation rules.

# Performance & Optimization

The application includes several performance-focused practices:

next/image for optimized images
Priority loading for important LCP images
Next.js App Router route-level code splitting
Server Components where appropriate
TanStack Query caching
URL state handling with useSearchParams
Responsive image sizing
Global loading UI with loading.tsx
# Security

Daan follows several security practices:

HTTP-only cookies for JWT tokens
Role-based authorization
Protected routes
Backend authorization
Password reset flow
Email verification
Refresh token mechanism
Blocked/deleted user checks
Environment variables for sensitive configuration

 Never commit production secrets, API keys, database credentials, or payment credentials to GitHub.

# Getting Started
1. Clone the Repository
git clone YOUR_FRONTEND_REPOSITORY_URL
cd daan-frontend
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env.local file:

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

For production, use the deployed backend URL.

4. Start the Development Server
npm run dev

The application will run at:

http://localhost:3000
5. Build for Production
npm run build
3 Live Demo
Frontend

##  Project Submission Information

Project Name            : Daan — Donate with Trust

Backend Repo            : https://github.com/Busra2456/daan

Frontend Repo           : https://github.com/Busra2456/daan-frontend


Live Backend URL        : https://daan-7z6n.vercel.app

Live Frontend URL       : https://daan-frontend.vercel.app

API Documentation       : https://daan-7z6n.vercel.app/api-docs

Demo Video              : To be added

Demo Admin Email : demo.admin@gmail.com

Demo Admin Password : DemoAdmin123!
# Demo Login

Daan provides one-click demo login options for all three application roles:

# Admin
# Needy / User
# Donor / Provider

These demo login options allow evaluators to quickly explore the role-based functionality of the application.

For official assignment submission, dedicated demo credentials should be provided separately.

# Testing

The following major flows have been tested:

Authentication
Registration
Email verification
Login
Google authentication
Forgot password
Reset password
Get current user
Refresh token
Logout
Authorization
Protected routes
Role-based dashboard access
Admin authorization
Donor authorization
Needy authorization
Donation System
Donation request creation
Request editing
Admin verification
Admin rejection
Verified request viewing
Donation creation
Donation history
Payment
SSLCommerz test payment
Payment success
Payment failure
Payment cancellation
Donation status update
# Project Status
Feature	Status
Authentication	 Complete
Email Verification	 Complete
Google Login	 Complete
Role-based Authorization	 Complete
NEEDY Dashboard	Complete
DONOR Dashboard  Complete
ADMIN Dashboard	 Complete
Donation Requests	 Complete
Admin Verification	 Complete
Donation System	 Complete
SSLCommerz Payment	 Complete
Responsive UI	 Complete
API Integration	 Complete
State Management	 Complete
Form Validation	 Complete
Performance Optimization	 Complete
Production Deployment	 Complete
# Assignment Highlights

This project demonstrates:

Modern Next.js App Router architecture
Server and Client Component usage
Secure authentication
Role-based authorization
Protected routes
TanStack Query state management
Custom React hooks
Type-safe TypeScript development
Zod validation
Responsive UI/UX
Real payment gateway integration
Production deployment
Modular and reusable components
Error handling
Loading states
Optimized images
URL state management
# Main Application Areas
Public
├── Home
├── About
├── How It Works
├── Contact
└── Public Requests

Authentication
├── Login
├── Register
├── Email Verification
├── Forgot Password
└── Reset Password

NEEDY Dashboard
├── Dashboard
├── Create Request
├── My Requests
├── Request Details
└── Edit Request

DONOR Dashboard
├── Dashboard
├── Verified Requests
├── Request Details
├── Donation
└── Donation History

ADMIN Dashboard
├── Dashboard
├── Users
├── Donation Requests
├── Pending Requests
├── Verified Requests
├── Rejected Requests
└── Completed Requests
# Author

Hasna Hena Busra

Built as a full-stack donation platform project with the goal of making charitable giving more trustworthy and transparent.

# Mission

Donate with Trust. Help someone who truly needs it.

Daan aims to connect generosity with genuine need through:

Verification
Transparency
Communication
Secure donations
# Daan

Donate with Trust.
Help someone who truly needs it.