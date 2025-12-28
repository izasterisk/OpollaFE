/**
 * Environment Configuration
 * =========================
 * Central module for accessing environment variables.
 *
 * RULES:
 * 1. NEVER use `process.env` directly in components or services.
 * 2. ALWAYS import from this module: import { env } from '@/config/env';
 * 3. Add new environment variables to the schema below.
 */

import { z } from 'zod';

/**
 * Environment variable schema using Zod for runtime validation.
 * This ensures all required environment variables are present and correctly typed.
 */
const envSchema = z.object({
    /**
     * Backend API URL (OpollaBE).
     * Example: https://localhost:5001
     */
    BE_URL: z
        .string({ message: 'BE_URL is required. Please check your .env file.' })
        .url({ message: 'BE_URL must be a valid URL' }),

    /**
     * Current Node environment.
     */
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
});

/**
 * Type-safe environment variables.
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validates environment variables at runtime.
 * Throws a descriptive error if validation fails.
 */
function validateEnv(): Env {
    const parsed = envSchema.safeParse({
        BE_URL: process.env['BE_URL'],
        NODE_ENV: process.env['NODE_ENV'],
    });

    if (!parsed.success) {
        const errorMessages = parsed.error.issues
            .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
            .join('\n');

        throw new Error(
            `\n❌ Invalid environment variables:\n${errorMessages}\n\n` +
            `Please check your .env file and ensure all required variables are set.\n` +
            `See .env.example for reference.\n`
        );
    }

    return parsed.data;
}

/**
 * Validated environment variables.
 * Use this object to access environment variables throughout the application.
 *
 * @example
 * import { env } from '@/config/env';
 * console.log(env.NEXT_PUBLIC_API_BASE_URL);
 */
export const env = validateEnv();

/**
 * Helper to check if we're in production environment.
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Helper to check if we're in development environment.
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Helper to check if we're in test environment.
 */
export const isTest = env.NODE_ENV === 'test';
