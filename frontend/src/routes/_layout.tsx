// app/routes/_layout.tsx
import { Outlet } from 'react-router';

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 py-8">
                <Outlet />
            </div>
        </div>
    );
}
