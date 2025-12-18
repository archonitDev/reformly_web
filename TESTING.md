# Testing Guide - System Addresses

## Local Development

### Main Application
- **Onboarding Flow**: http://localhost:3000/onboarding
- **Dashboard (Placeholder)**: http://localhost:3000/app
- **Root (Redirects to onboarding)**: http://localhost:3000

### Docker Container

When running with Docker:
- **Onboarding Flow**: http://localhost:3000/onboarding
- **Dashboard (Placeholder)**: http://localhost:3000/app
- **Root (Redirects to onboarding)**: http://localhost:3000

## Onboarding Steps Navigation

The onboarding consists of 19 steps (0-18). You can test each step by navigating through the flow:

### Step 0 - Welcome
- **URL**: http://localhost:3000/onboarding (initial step)
- **Features**: Login method selection (Email/Apple/Google)

### Step 1 - Email Input
- **URL**: Navigate from Step 0
- **Features**: Email input field

### Step 2 - OTP Verification
- **URL**: Navigate from Step 1
- **Features**: 6-digit code input, resend timer

### Step 3 - Sex Selection
- **URL**: Navigate from Step 2
- **Features**: Male/Female/Other selection

### Step 4 - Birthday
- **URL**: Navigate from Step 3
- **Features**: Day/Month/Year selectors

### Step 5 - Main Goal
- **URL**: Navigate from Step 4
- **Features**: Goal selection cards

### Step 6 - Motivation
- **URL**: Navigate from Step 5
- **Features**: Motivational message

### Step 7 - Activities
- **URL**: Navigate from Step 6
- **Features**: Activity selection (up to 3)

### Step 8 - Height
- **URL**: Navigate from Step 7
- **Features**: Height input with CM/IN toggle

### Step 9 - BMI Result
- **URL**: Navigate from Step 8
- **Features**: BMI visualization with categories

### Step 10 - Goal Weight
- **URL**: Navigate from Step 9
- **Features**: Goal weight input with KG/LB toggle

### Step 11 - Rate
- **URL**: Navigate from Step 10
- **Features**: Star rating, testimonials

### Step 12 - Rating Modal
- **URL**: Navigate from Step 11 (auto-shows if 4+ stars)
- **Features**: Rating modal overlay

### Step 13 - Plan Preview
- **URL**: Navigate from Step 12
- **Features**: Chart visualization of wellness journey

### Step 14 - Crafting Plan
- **URL**: Navigate from Step 13
- **Features**: Progress animation, checklist

### Step 15 - Plan Ready
- **URL**: Navigate from Step 14
- **Features**: Plan summary, simplified chart

### Step 16 - Paywall / Subscription
- **URL**: Navigate from Step 15
- **Features**: Trial timeline, plan selection

### Step 17 - Username + Bio
- **URL**: Navigate from Step 16
- **Features**: Username input, bio textarea

### Step 18 - Finish
- **URL**: Navigate from Step 17
- **Features**: Success screen, data submission

## API Endpoints (Mocks)

All API calls are mocked in `lib/api.ts`. Check browser console for logs:

- **sendEmailOtp**: Called when submitting email in Step 1
- **verifyEmailOtp**: Called when submitting OTP in Step 2
- **submitOnboarding**: Called automatically when Step 18 loads
- **createStripeCheckoutSession**: Called when clicking "Subscribe now" in Step 16

## Testing Checklist

### Navigation
- [ ] Can navigate forward through all 19 steps
- [ ] Back button works on steps 1-17 (except step 12)
- [ ] Progress bar appears on steps 3-17
- [ ] Smooth slide animations between steps

### Step-Specific Tests

#### Step 0 (Welcome)
- [ ] All three login buttons are clickable
- [ ] Email button navigates to Step 1
- [ ] Apple/Google buttons log to console (mocks)

#### Step 1 (Email)
- [ ] Email input accepts text
- [ ] Continue button works
- [ ] API mock `sendEmailOtp` is called

#### Step 2 (OTP)
- [ ] Can input 6 digits
- [ ] Auto-focus moves to next input
- [ ] Paste works for 6-digit codes
- [ ] Resend timer counts down
- [ ] API mock `verifyEmailOtp` is called

#### Step 3-7 (About You)
- [ ] All selection cards are clickable
- [ ] Selected state is visually distinct
- [ ] Can select multiple activities (up to 3)
- [ ] Data is saved to global store

#### Step 8-10 (Metrics)
- [ ] Sliders work for height/weight
- [ ] Unit toggles (CM/IN, KG/LB) work correctly
- [ ] Values convert when switching units
- [ ] Data is saved to global store

#### Step 11-12 (Rating)
- [ ] Star rating is clickable
- [ ] Modal appears when 4+ stars selected
- [ ] Modal can be dismissed

#### Step 13-15 (Plan)
- [ ] Chart renders correctly
- [ ] Progress animation works
- [ ] Plan details display correctly

#### Step 16 (Paywall)
- [ ] Timeline displays correctly
- [ ] Plan selection works
- [ ] Stripe mock is called on subscribe

#### Step 17-18 (Profile & Finish)
- [ ] Username and bio inputs work
- [ ] Final submission calls API mock
- [ ] Redirect to /app works

### Visual/UX Tests
- [ ] Mobile-like container on desktop (max-width ~420-480px)
- [ ] Colors match design (purple #5630B0, etc.)
- [ ] Animations are smooth
- [ ] Hover states work on interactive elements
- [ ] Focus states visible for keyboard navigation
- [ ] Reduced motion is respected (if enabled in browser)

### State Management
- [ ] All form data persists in Zustand store
- [ ] Data survives navigation back/forward
- [ ] Final submission includes all collected data

## Browser Console

Open browser DevTools (F12) to see:
- API mock calls and their payloads
- Navigation logs
- Any errors or warnings

## Common Issues

### Port Already in Use
If port 3000 is busy:
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead
```

### Container Not Starting
```bash
# Check logs
make logs

# Rebuild
make rebuild
make up
```

### State Not Persisting
- Check browser console for Zustand store updates
- Verify all setter functions are called correctly
