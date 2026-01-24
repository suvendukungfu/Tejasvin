import { describe, it, expect } from 'vitest';

describe('Rescue App Context', () => {
    it('should be in a healthy state', () => {
        expect(true).toBe(true);
    });

    it('should have access to environment variables', () => {
        const mode = import.meta.env.MODE;
        expect(mode).toBeDefined();
    });
});
