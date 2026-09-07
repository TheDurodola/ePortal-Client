# ePortal Client — God's Vision High School

A modern, role-based school management portal client built for **God's Vision High School**. Powered by **Next.js (App Router)**, **React 19**, **Tailwind CSS v4**, **shadcn/ui**, and **TanStack React Query**, integrating seamlessly with a **Spring Boot REST API** backend.

---

## 🚀 Features

- **Role-Based Portals & Dashboards**:
  - **Principal**: Bulk account creation & user onboarding (`/registration`), fee oversight (`/fees`), staff management (`/staffs`), and student directories (`/students`).
  - **Teacher**: Class management (`/classes`), student grade & result entry (`/results`), and attendance tracking (`/attendance`).
  - **Student**: View exam results (`/results`), monitor attendance records (`/attendance`), view class timetables (`/timetable`), and track payment status (`/payments`).
  - **Parent**: Multi-child academic progress & results (`/results`), fee payments (`/payment`), and children records (`/children`).

- **Secure Authentication & Onboarding**:
  - **Sign In**: Cookie-backed HTTP-only session authentication (`/signin`).
  - **Account Activation**: Initial student and staff credential activation with birthdate verification (`/activation`).
  - **Parental Registration**: Dedicated sign-up workflow linking parents to their children's student numbers and verified birth dates (`/signup`).
  - **Route Protection**: Next.js route protection proxy checking session tokens and preventing unauthorized access.

- **Performant Data Layer**:
  - Server-side prefetching with TanStack React Query hydration (`HydrationBoundary`).
  - Client-side caching and stale-while-revalidate data strategy.
  - Server Actions for secure credential and mutation handling.

- **Polished UI & UX**:
  - Component library built on **shadcn/ui** and **@base-ui/react**.
  - Animated authentication background slideshow with campus imagery.
  - Responsive layout with collapsible app sidebar and dark/light theme support.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router, Server Actions) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [tw-animate-css](https://github.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) & [@base-ui/react](https://base-ui.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Data Fetching & Cache** | [TanStack React Query v5](https://tanstack.com/query/latest) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Form Validation** | [Zod](https://zod.dev/) |
| **Theming** | `next-themes` |
| **Backend Integration** | Spring Boot REST API |

---

## 📂 Project Structure

```text
ePortal-Client/
├── api/                     # Server-side API connectors (profile, activation)
├── app/
│   ├── (auth)/              # Authentication route group
│   │   ├── activation/      # Account activation page
│   │   ├── signin/          # User login page
│   │   └── signup/          # Parental registration page
│   ├── (portal)/            # Authenticated portal route group
│   │   ├── account/         # User account settings
│   │   ├── dashboard/       # Role-specific dashboard hub
│   │   ├── fees/            # School fees administration
│   │   ├── payment/         # Fee payments & billing tables
│   │   ├── profile/         # User profile details
│   │   ├── registration/    # Account registration & file upload
│   │   ├── result/          # Academic results & reports
│   │   ├── staffs/          # Staff directory
│   │   └── students/        # Student directory
│   ├── layout.tsx           # Root layout & providers
│   ├── proxy.ts             # Route protection middleware logic
│   └── page.tsx             # Root redirect handler
├── assets/                  # Campus imagery, school logo & branding
├── components/
│   ├── ui/                  # Reusable shadcn/ui components
│   ├── appsidebar.tsx       # Dynamic role-based sidebar
│   ├── auth-background-slideshow.tsx # Auth page background carousel
│   ├── mode-toggle.tsx      # Dark / light theme toggle
│   └── theme-provider.tsx   # Next Themes provider
├── hooks/
│   └── useProfileRoleCard.ts# Hook for resolving user role & navigation cards
├── lib/
│   ├── actions/             # Next.js Server Actions (auth, session)
│   ├── constants/           # System constants (roles)
│   ├── validations/         # Zod schemas (auth, activation)
│   └── profile.ts           # Role navigation card definitions
└── public/                  # Static assets
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js**: v20.x or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Backend API**: Running instance of the ePortal Spring Boot backend

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/TheDurodola/ePortal-Client.git
cd ePortal-Client
npm install
```

### 2. Environment Configuration

Create a `.env` or `.env.local` file in the project root:

```env
SPRING_BOOT_API_URL=http://localhost:8080
```

| Variable | Description | Default |
|---|---|---|
| `SPRING_BOOT_API_URL` | Base URL of the Spring Boot REST API backend | `http://localhost:8080` |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to identify code quality issues |
| `npm run format` | Formats TypeScript and TSX files with Prettier |
| `npm run typecheck` | Validates TypeScript types across the project |

---

## 🔐 Role-Based Access Summary

| Role | Accessible Routes | Primary Actions |
|---|---|---|
| `PRINCIPAL` | `/dashboard`, `/profile`, `/registration`, `/fees`, `/staffs`, `/students` | Bulk user onboarding, manage fee schedules, view staff & student records |
| `TEACHER` | `/dashboard`, `/profile`, `/results`, `/classes`, `/attendance` | Input/manage exam results, monitor assigned classes, record student attendance |
| `STUDENT` | `/dashboard`, `/profile`, `/results`, `/attendance`, `/timetable`, `/payments` | Check term results, track attendance records, view class schedules & fees |
| `PARENT` | `/dashboard`, `/profile`, `/results`, `/payment`, `/children` | View linked children's results, settle school fees, manage children details |

---

## 🤝 Contributing

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes following standard conventional commit conventions.
3. Verify types and linting before submitting:
   ```bash
   npm run typecheck
   npm run lint
   ```
4. Push to your branch and open a Pull Request.
