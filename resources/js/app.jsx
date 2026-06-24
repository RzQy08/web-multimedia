// app.jsx
import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
    resolve: name => {
        // 1. Ubah pattern glob agar mendukung .jsx, .ts, dan .tsx
        const pages = import.meta.glob('./Pages/**/*.{jsx,ts,tsx}', { eager: true });
        
        // 2. Cari kecocokan file secara dinamis berdasarkan path yang tepat
        const page = pages[`./Pages/${name}.jsx`] || 
                     pages[`./Pages/${name}.tsx`] || 
                     pages[`./Pages/${name}.ts`];
                     
        if (!page) {
            throw new Error(`Halaman ./Pages/${name} tidak ditemukan dalam format .jsx, .ts, atau .tsx`);
        }
        
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});