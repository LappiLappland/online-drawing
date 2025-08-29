// app/root.tsx
import type { Route } from '.react-router/types/src/+types/root';
import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'react-router';
import { ErrorDisplay } from './components/ErrorDisplay';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export function ErrorBoundary({
    error,
}: Route.ErrorBoundaryProps) {
    let errorText = 'Unknown error occurred';
    let errorCode = 'Error';
    if (isRouteErrorResponse(error)) {
        errorText = error.data;
        errorCode = error.status + '';
    }
    else if (error instanceof Error) {
        errorText = error.message;
    }

    return (
        <ErrorDisplay
            message={errorText}
            code={errorCode}
        />
    );
}

export default function App() {
    return <Outlet />;
}
