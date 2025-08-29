import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export function BackToHome() {
    return (
        <Button
            asChild
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 gap-2"
        >
            <Link to="/online-drawing/">
                <Home className="h-4 w-4" />
                Back to home
            </Link>
        </Button>
    );
}
