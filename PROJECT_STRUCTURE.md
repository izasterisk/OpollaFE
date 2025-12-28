# 📁 Project Structure Guide

> **The "Constitution" of Opolla Frontend**
>
> This document is **MANDATORY READING** for all developers. It establishes the standards and conventions that keep this codebase clean and maintainable.

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Directory Structure](#-directory-structure)
3. [Directory Responsibilities](#-directory-responsibilities)
4. [Workflow Standards](#-workflow-standards)
5. [Strict Rules](#-strict-rules)
6. [Naming Conventions](#-naming-conventions)
7. [Import Guidelines](#-import-guidelines)
8. [Adding New Features](#-adding-new-features)
9. [Common Patterns](#-common-patterns)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build
```

---

## 🗂️ Directory Structure

```
OpollaFE/
├── .env.example          # Environment template (commit this)
├── .env                  # Environment variables (NEVER commit)
├── .gitignore            # Git ignore rules
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── PROJECT_STRUCTURE.md  # This file (READ IT!)
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
│
└── src/
    ├── app/              # Next.js App Router (Pages & Layouts)
    │   ├── layout.tsx    # Root layout
    │   ├── page.tsx      # Home page
    │   └── globals.css   # Global styles
    │
    ├── components/       # Shared UI components
    │   └── index.ts      # Barrel export
    │
    ├── config/           # Configuration modules
    │   ├── env.ts        # Environment variables
    │   └── index.ts      # Barrel export
    │
    ├── hooks/            # Custom React hooks
    │   └── index.ts      # Barrel export
    │
    ├── lib/              # Third-party library wrappers
    │   ├── axios.ts      # Axios instance configuration
    │   └── index.ts      # Barrel export
    │
    ├── services/         # API service layer
    │   ├── api-client.ts # Base API client
    │   └── index.ts      # Barrel export
    │
    ├── types/            # TypeScript type definitions
    │   ├── common.ts     # Shared types
    │   └── index.ts      # Barrel export
    │
    └── utils/            # Utility functions
        ├── helpers.ts    # Helper functions
        └── index.ts      # Barrel export
```

---

## 📚 Directory Responsibilities

### `src/app/` - Pages & Layouts

**Purpose:** Next.js App Router pages and layouts.

- Contains route segments (folders = routes)
- Each route can have: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- Minimal logic - delegates to components and services

```typescript
// ✅ GOOD: Page delegates to components
export default function ProductsPage() {
  return <ProductList />;
}

// ❌ BAD: Page contains business logic
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => { /* fetch logic */ }, []);
  return products.map(p => <div>{p.name}</div>);
}
```

---

### `src/components/` - UI Components

**Purpose:** Reusable, presentational React components.

**Sub-organization:**
- `/ui/` - Base UI elements (Button, Input, Card, Modal)
- `/layout/` - Layout components (Header, Footer, Sidebar)
- `/shared/` - Composed components used across features

**Rules:**
- Components must be **DUMB/PRESENTATIONAL**
- **NO business logic** (calculations, API calls, complex state)
- Receive data and callbacks via **props only**
- Each component folder structure:
  ```
  Button/
  ├── Button.tsx         # Component
  ├── Button.types.ts    # Types/Props interface
  ├── Button.test.tsx    # Tests (optional)
  └── index.ts           # Barrel export
  ```

```typescript
// ✅ GOOD: Presentational component
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// ❌ BAD: Component with business logic
export function SubmitOrderButton({ orderId }: { orderId: string }) {
  const handleSubmit = async () => {
    await axios.post('/orders/submit', { orderId }); // Direct API call!
    calculateTax(); // Business logic!
  };
  return <button onClick={handleSubmit}>Submit</button>;
}
```

---

### `src/config/` - Configuration

**Purpose:** Centralized configuration modules.

**Files:**
- `env.ts` - Environment variables with Zod validation

**KEY RULE:** Never use `process.env` directly anywhere else!

```typescript
// ✅ GOOD: Import from config
import { env } from '@/config/env';
console.log(env.NEXT_PUBLIC_API_BASE_URL);

// ❌ BAD: Direct process.env access
const url = process.env.NEXT_PUBLIC_API_BASE_URL;
```

---

### `src/hooks/` - Custom Hooks

**Purpose:** Reusable React hooks.

**Naming:** All hooks must start with `use` prefix.

**Examples:**
- `useAuth.ts` - Authentication state
- `useDebounce.ts` - Debounce values
- `useLocalStorage.ts` - LocalStorage wrapper
- `useFetch.ts` - Data fetching

```typescript
// ✅ Example custom hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

---

### `src/lib/` - Library Wrappers

**Purpose:** Configure and wrap third-party libraries.

**Key Distinction from `utils/`:**
- `lib/` = Third-party library configurations (Axios, Supabase, etc.)
- `utils/` = Pure utility functions written by us

**Files:**
- `axios.ts` - Configured Axios instance with interceptors

```typescript
// src/lib/axios.ts exports the configured instance
export const apiClient = createAxiosInstance();
```

---

### `src/services/` - API Layer

**Purpose:** All HTTP/API communication with the backend.

**Structure:**
```
services/
├── api-client.ts     # Base client, shared interfaces
├── auth.service.ts   # Authentication endpoints
├── user.service.ts   # User endpoints
├── product.service.ts # Product endpoints
└── index.ts          # Barrel export
```

**Pattern:**
```typescript
// src/services/user.service.ts
import { httpGet, httpPost, httpPut, httpDelete } from '@/lib/axios';
import type { User, CreateUserDto, UpdateUserDto } from '@/types/user';

export const userService = {
  getAll: () => httpGet<User[]>('/api/users'),
  getById: (id: string) => httpGet<User>(`/api/users/${id}`),
  create: (data: CreateUserDto) => httpPost<User>('/api/users', data),
  update: (id: string, data: UpdateUserDto) => httpPut<User>(`/api/users/${id}`, data),
  delete: (id: string) => httpDelete<void>(`/api/users/${id}`),
};
```

---

### `src/types/` - Type Definitions

**Purpose:** TypeScript interfaces and types.

**Organization:**
- `common.ts` - Shared/utility types
- `[feature].ts` - Feature-specific types

**Naming Conventions:**
- Interfaces: `PascalCase` (e.g., `User`, `Product`)
- DTOs: Suffix with `Dto` (e.g., `CreateUserDto`)
- Request types: Suffix with `Request`
- Response types: Suffix with `Response`

```typescript
// src/types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}
```

---

### `src/utils/` - Utility Functions

**Purpose:** Pure helper functions.

**Key Distinction from `lib/`:**
- `utils/` = Our functions (formatting, validation, helpers)
- `lib/` = Third-party library wrappers

**Examples:**
- `helpers.ts` - General utilities
- `format.ts` - Formatting (dates, currency, etc.)
- `validation.ts` - Validation helpers

```typescript
// src/utils/format.ts
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US').format(new Date(date));
}
```

---

## 🔄 Workflow Standards

### Adding a New Feature

Follow this **EXACT** workflow:

```
1. Define Interface  →  2. Create Service  →  3. Create Component  →  4. Integrate in Page
   (src/types/)          (src/services/)       (src/components/)       (src/app/)
```

**Example: Adding "Products" feature**

#### Step 1: Define Interface (`src/types/product.ts`)
```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
}
```

#### Step 2: Create Service (`src/services/product.service.ts`)
```typescript
import { httpGet, httpPost } from '@/lib/axios';
import type { Product, CreateProductDto } from '@/types/product';

export const productService = {
  getAll: () => httpGet<Product[]>('/api/products'),
  create: (data: CreateProductDto) => httpPost<Product>('/api/products', data),
};
```

#### Step 3: Create Component (`src/components/products/ProductCard.tsx`)
```typescript
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div onClick={() => onSelect(product.id)}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
```

#### Step 4: Integrate in Page (`src/app/products/page.tsx`)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/services/product.service';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getAll().then(setProducts);
  }, []);

  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onSelect={console.log} />
      ))}
    </div>
  );
}
```

---

## 🚨 Strict Rules

### Rule 1: Never use `process.env` directly

```typescript
// ❌ FORBIDDEN
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ CORRECT
import { env } from '@/config/env';
const apiUrl = env.NEXT_PUBLIC_API_BASE_URL;
```

**Why?** Centralized validation + TypeScript support + easier testing.

---

### Rule 2: Never call `axios` directly in UI

```typescript
// ❌ FORBIDDEN - In a component or page
import axios from 'axios';
const data = await axios.get('/api/users');

// ✅ CORRECT - Use service layer
import { userService } from '@/services/user.service';
const data = await userService.getAll();
```

**Why?** Centralized error handling, interceptors, and testability.

---

### Rule 3: No business logic in components

```typescript
// ❌ FORBIDDEN - Logic in component
function OrderTotal({ items }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  return <span>${total}</span>;
}

// ✅ CORRECT - Logic in utility, component just displays
// src/utils/order.ts
export function calculateOrderTotal(items: OrderItem[]): number { ... }

// Component
function OrderTotal({ total }: { total: number }) {
  return <span>${total}</span>;
}
```

**Why?** Testability, reusability, separation of concerns.

---

### Rule 4: Use path aliases

```typescript
// ❌ AVOID - Relative imports
import { Button } from '../../../components/ui/Button';

// ✅ CORRECT - Path alias
import { Button } from '@/components/ui/Button';
```

---

### Rule 5: Export through barrel files

```typescript
// ❌ AVOID - Direct file imports
import { userService } from '@/services/user.service';

// ✅ CORRECT - Barrel export
import { userService } from '@/services';
```

Remember to update `index.ts` when adding new modules.

---

## 📝 Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Services | camelCase with `.service` suffix | `user.service.ts` |
| Types | PascalCase | `User`, `CreateUserDto` |
| Utilities | camelCase | `formatDate` |
| Folders | kebab-case | `product-list/` |
| CSS Modules | PascalCase | `ProductCard.module.css` |

---

## 📥 Import Guidelines

### Import Order

1. React/Next.js imports
2. Third-party libraries
3. Internal modules (`@/...`)
4. Relative imports
5. Types (with `type` keyword)

```typescript
// 1. React/Next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party
import { format } from 'date-fns';

// 3. Internal
import { Button } from '@/components/ui/Button';
import { userService } from '@/services';
import { formatCurrency } from '@/utils';

// 4. Relative
import { ProductCard } from './ProductCard';

// 5. Types
import type { User } from '@/types';
```

---

## 🔧 Common Patterns

### Loading States

```typescript
interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// In component
const [state, setState] = useState<AsyncState<User[]>>({
  data: null,
  isLoading: true,
  error: null,
});
```

### Error Handling

```typescript
try {
  const data = await productService.getAll();
  setProducts(data);
} catch (error) {
  if (error instanceof AxiosError) {
    setError(error.response?.data?.message || 'An error occurred');
  }
}
```

### Environment-based Configuration

```typescript
import { env, isDevelopment, isProduction } from '@/config/env';

if (isDevelopment) {
  console.log('Debug mode enabled');
}
```

---

## 🔐 Authentication & Protected Routes

### Authentication Pattern

This project uses localStorage-based authentication with UTC timestamp session management.

**Key Files:**
- `src/hooks/useAuth.ts` - Authentication hook
- `src/utils/auth.utils.ts` - localStorage utilities
- `src/services/auth.service.ts` - API calls

**Pattern:**
```typescript
// 1. Login flow
const { login } = useAuth();
await login(password); // Saves token + expireTime (UTC)

// 2. Session check (only on route navigation)
const { checkSession } = useAuth();
if (!checkSession()) {
  router.push('/login');
}

// 3. Logout
const { logout } = useAuth();
await logout(); // Clears localStorage + API call
```

**SSR Safety:**
```typescript
// ✅ ALWAYS check window existence
const authData = typeof window !== 'undefined' ? getAuthData() : null;

// ✅ In utility functions
export function getAuthData(): AuthState | null {
  if (typeof window === 'undefined') return null;
  // ... localStorage access
}
```

---

### Protected Routes

**Pattern for protected pages:**
```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedPage() {
  const router = useRouter();
  const { checkSession, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!checkSession() || !isAuthenticated) {
      router.push('/login');
    }
  }, [checkSession, isAuthenticated, router]);

  return <div>Protected Content</div>;
}
```

**Home page redirect pattern:**
```typescript
// Redirect based on auth state
useEffect(() => {
  const authData = getAuthData();
  if (authData && !isSessionExpired()) {
    router.push('/dashboard');
  } else {
    router.push('/login');
  }
}, [router]);
```

---

### LocalStorage Keys

**Standard keys used:**
- `authToken` - JWT token from backend
- `userName` - Display name (from staff.name or email)
- `expireTime` - UTC timestamp (ISO string)

**Example:**
```typescript
localStorage.setItem('authToken', 'eyJ...');
localStorage.setItem('userName', 'Nguyễn Thị Minh Ánh');
localStorage.setItem('expireTime', '2025-12-29T23:00:00.000Z');
```

---

### Session Expiry

**Current implementation: 23 hours from login**

```typescript
// Calculate expiry (UTC)
const expireTime = new Date(Date.now() + 23 * 60 * 60 * 1000);
localStorage.setItem('expireTime', expireTime.toISOString());

// Check expiry
const isExpired = new Date() > new Date(expireTime);
```

**When to check:**
- ✅ On navigation to protected routes (useEffect)
- ❌ NOT on every render (performance)
- ❌ NOT with intervals (unless needed)

---

### Environment Variables for Auth

```env
# Backend API URL
NEXT_PUBLIC_BE_URL=https://localhost:7177
```

**Note:** Use `NEXT_PUBLIC_` prefix for client-side access!

---

## 🧪 Testing Guidelines (Future)

When adding tests:
- Unit tests: `*.test.ts` or `*.spec.ts`
- Component tests: `ComponentName.test.tsx`
- Test files live next to the source file

---

## 📞 Contact

Questions about this structure? Open a discussion in the repository.

---

**Last Updated:** December 2024
**Version:** 1.0.0
