/**
 * Shared UI Components
 * =====================
 * This folder contains reusable, presentational components.
 *
 * RULES:
 * 1. Components here should be DUMB/PRESENTATIONAL only.
 * 2. NO business logic in components.
 * 3. NO direct API calls - use props for data.
 * 4. Each component should have its own folder with:
 *    - ComponentName.tsx (main component)
 *    - ComponentName.types.ts (types/interfaces)
 *    - ComponentName.module.css (styles, if not using Tailwind inline)
 *    - index.ts (barrel export)
 *
 * ORGANIZATION:
 * - /ui: Base UI elements (Button, Input, Card, Modal, etc.)
 * - /layout: Layout components (Header, Footer, Sidebar, etc.)
 * - /shared: Composed components used across features
 *
 * This file serves as a placeholder and barrel export.
 */


// Shared
export * from './shared/Card';
export * from './shared/Spinner';
export * from './shared/ErrorToast';
export * from './shared/Pagination';
export * from './shared/TabSwitch';

// Auth
export * from './auth/LoginForm';

// Layout
export * from './layout/Header';

// Class
export * from './class/ClassCard';

// Student
export * from './student/StudentCard';
export * from './student/HomeLearningCard';
