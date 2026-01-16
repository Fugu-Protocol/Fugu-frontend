# 🐡 Fugu Protocol

**Predict the Future. Trade the Outcome.**

Fugu Protocol is a decentralized prediction market built on the **Sui Blockchain**. It allows users to trade purely on their beliefs about future events—from crypto prices and stock movements to real-world outcomes.

This repository contains the **Frontend** application, designed with a "Soft Neo Brutal" aesthetic to be fun, engaging, and easy to use.

---

## ⚡ Tech Stack

We use modern, performance-focused tools to build a snappy and type-safe experience:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) (Radix Primitives)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom 3D Assets
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Package Manager**: `pnpm`

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### 1. Prerequisites
Ensure you have Node.js 20+ installed. We strictly use **pnpm** for package management.

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app live.

---

## 📂 Project Structure

We follow a **Feature-Based Architecture**. This keeps the codebase scalable by grouping related logic together rather than splitting it by file type.

### 🗺️ High-Level Map

| Folder | Purpose |
| :--- | :--- |
| **`app/`** | **Routing Only.** Contains `page.tsx`, `layout.tsx` and global providers. Keep logic here minimal. |
| **`features/`** | **Domain Logic.** The heart of the app. Grouped by feature (e.g., `landing`, `markets`). |
| **`components/`** | **Shared UI.** Reusable generic components (Buttons, Modals) that don't belong to a specific feature. |
| **`lib/`** | **Utilities & Constants.** Helper functions, static data, and type definitions. |
| **`public/`** | **Static Assets.** Images, fonts, and icons. |

### 🧭 Where do I put my code?

Use this guide to decide where to create new files:

#### 1. "I'm building a specific section of the app..."
👉 **Go to `features/`**.
Create a folder for your feature (e.g., `features/profile/`).
- `components/`: UI components specific to this feature.
- `hooks/`: React hooks used only here.
- `utils/`: Helper functions used only here.

**Example:**
```text
features/
  ├── landing/ (Hero section, How it works)
  └── markets/ (Market cards, Buy modal, Odds calculation)
```

#### 2. "I need a generic Button or Input..."
👉 **Go to `components/ui/`**.
These are usually Shadcn components. They should be "dumb" (no business logic) and reusable everywhere.

#### 3. "I need a reusable layout component..."
👉 **Go to `components/shared/`**.
Things like `Navbar`, `Footer`, `ScrollReveal` that are used across multiple pages/features.

#### 4. "I have hardcoded data or global configs..."
👉 **Go to `lib/`**.
- `constants.tsx`: All static text, mock data, and config values.
- `utils.ts`: Global helper functions (e.g., class mergers).

---

## 🎨 Design Guide

**Style**: Soft Neo Brutalism.
- **Borders**: Thick, black borders (`border-2 border-black`).
- **Shadows**: Hard offsets (`shadow-[4px_4px_0px_0px_#000]`).
- **Colors**: Pastel & Vibrant mix (Gold `#d8d174`, Blue `#3e90f0`, Green `#b6c454`).
- **Radius**: Large rounded corners (`rounded-xl` or `rounded-2xl`).

---

## 🛠️ Workflow & Contributing

We follow strict professional standards for version control to keep our history clean and readable.

### 🌳 Branch Naming
Always branch off `main`. Use the format `type/description-slug`.

| Type | Use Case | Example |
| :--- | :--- | :--- |
| **`feat`** | New features | `feat/user-profile-page` |
| **`fix`** | Bug fixes | `fix/login-error-handling` |
| **`chore`** | Maintenance, config, cleanup | `chore/update-dependencies` |
| **`refactor`** | Code restructuring (no behavior change) | `refactor/market-card-component` |
| **`docs`** | Documentation changes | `docs/update-readme` |

### 💬 Commit Messages
We follow **Conventional Commits**.
Format: `type(scope): description`

- **feat**: `feat(auth): add google login support`
- **fix**: `fix(market): resolve overflow issue on mobile cards`
- **design**: `design(landing): update hero text colors`
- **chore**: `chore: upgrade next.js to v16`

**Rules:**
1. Use lowercase.
2. No period at the end.
3. Keep it imperative ("add" not "added").

### 🚀 Pull Request Process
1. Create a branch: `git checkout -b feat/amazing-feature`
2. Commit your changes.
3. Push to origin: `git push origin feat/amazing-feature`
4. Open a PR and request review.

