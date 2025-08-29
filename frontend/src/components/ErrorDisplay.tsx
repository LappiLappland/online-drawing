import { Home } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorDisplayProps {
    code?: string | number;
    message?: string;
}

export function ErrorDisplay({ code = 404, message = 'Page not found.' }: ErrorDisplayProps) {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <Card className="w-full max-w-sm text-center">
                <CardHeader>
                    <CardTitle className="text-6xl font-extrabold text-slate-400 dark:text-slate-600">
                        {code}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-slate-700 dark:text-slate-300">
                        {message}
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button asChild variant="ghost" className="gap-2">
                        <Link to="/online-drawing/">
                            <Home className="h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
