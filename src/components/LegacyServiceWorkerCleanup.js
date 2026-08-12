'use client';

import { useEffect } from 'react';

/**
 * Removes service workers left over from the old WordPress site.
 * Those workers can intercept /api/* requests and return cached HTML error pages.
 */
export default function LegacyServiceWorkerCleanup() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const cleanup = async () => {
            try {
                let hadLegacyWorker = false;

                if ('serviceWorker' in navigator) {
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    hadLegacyWorker = registrations.length > 0;
                    await Promise.all(registrations.map((registration) => registration.unregister()));
                }
                if ('caches' in window) {
                    const keys = await caches.keys();
                    if (keys.length > 0) hadLegacyWorker = true;
                    await Promise.all(keys.map((key) => caches.delete(key)));
                }

                if (hadLegacyWorker && !sessionStorage.getItem('rt_sw_cleaned')) {
                    sessionStorage.setItem('rt_sw_cleaned', '1');
                    window.location.reload();
                }
            } catch {
                // Best-effort cleanup only.
            }
        };

        cleanup();
    }, []);

    return null;
}
