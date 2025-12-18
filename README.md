# Reformly Web Onboarding

Web version of Reformly onboarding, migrated from Flutter mobile app to Next.js.

## Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Zustand** for global state management
- **Firebase** (mocks for authentication)
- **Stripe** (mocks for subscription)

## Installation and Setup

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Docker (Recommended)

#### Using Makefile (Recommended)

The easiest way to manage Docker containers:

```bash
# Show all available commands
make help

# Build and start
make up          # Build and start containers
make down        # Stop and remove containers
make logs        # View logs
make clean       # Stop, remove containers and volumes
```

#### Build and Run

1. Build and run container:
```bash
make up
```

Or use Docker directly:
```bash
docker compose up --build
docker build -t reformly-web .
docker run -p 3000:3000 reformly-web
```

2. Open [http://localhost:3000](http://localhost:3000)

3. Stop container:
```bash
make down
```

#### Useful Commands

**Using Makefile:**
- `make up` - Build and start containers
- `make down` - Stop and remove containers
- `make clean` - Stop containers, remove volumes and images
- `make logs` - View container logs
- `make rebuild` - Rebuild image without cache
- `make ps` - Show running containers
- `make shell` - Open shell in container

**Using Docker Compose directly:**
- Rebuild without cache: `docker compose build --no-cache`
- View logs: `docker compose logs -f`
- Stop and remove containers: `docker compose down`
- Stop and remove containers with volumes: `docker compose down -v`

## Project Structure

```
reformly_web/
├── app/
│   ├── onboarding/      # Onboarding page
│   ├── app/             # Dashboard placeholder
│   ├── layout.tsx       # Root layout
│   └── page.tsx          # Redirect to onboarding
├── components/
│   ├── onboarding/      # All 19 onboarding screens
│   ├── Button.tsx        # Button component
│   ├── Input.tsx         # Input component
│   ├── ProgressBar.tsx   # Progress bar
│   ├── BackButton.tsx    # Back button
│   └── OnboardingWizard.tsx # Main wizard component
├── lib/
│   ├── store.ts          # Zustand store for state
│   └── api.ts            # API mocks
└── ...
```

## Onboarding Screens

1. **Step 0** - Welcome (login method selection)
2. **Step 1** - Email input
3. **Step 2** - OTP verification
4. **Step 3** - Sex selection
5. **Step 4** - Birthday
6. **Step 5** - Main goal
7. **Step 6** - Motivation screen
8. **Step 7** - Activities (up to 3)
9. **Step 8** - Height
10. **Step 9** - BMI result
11. **Step 10** - Goal weight
12. **Step 11** - Rate (Show your love)
13. **Step 12** - Rating modal
14. **Step 13** - Plan preview
15. **Step 14** - Crafting plan (loading)
16. **Step 15** - Plan ready
17. **Step 16** - Paywall / Subscription
18. **Step 17** - Username + Bio
19. **Step 18** - Finish

## Features

- ✅ All 19 screens implemented
- ✅ Smooth animations between screens
- ✅ Global state (Zustand)
- ✅ API mocks (OTP, submit, Stripe)
- ✅ Responsive design (mobile container on desktop)
- ✅ Accessibility (aria-labels, keyboard navigation)
- ✅ Support for prefers-reduced-motion
- ✅ Visually close to mobile design

## Color Palette

- Primary purple: `#5630B0`
- Light lavender: `#EAE2FF`
- Accent: `#CAB7FA`
- Pink: `#FBC7D4`
- Black button: `#18191A`

## API Mocks

All API calls are in `lib/api.ts` and are mocks:
- `sendEmailOtp(email)` - send OTP
- `verifyEmailOtp(email, code)` - verify OTP
- `submitOnboarding(payload)` - submit onboarding data
- `createStripeCheckoutSession(planId)` - create Stripe session

## Next Steps

1. Connect real API endpoints
2. Add field validation
3. Integrate Firebase Auth
4. Integrate Stripe Checkout
5. Add real data for BMI chart and plan
