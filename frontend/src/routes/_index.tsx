// app/routes/_index.tsx
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function IndexPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
                    <CardDescription className="text-lg">
                        Choose how you'd like to use the drawing app
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {import.meta.env.VITE_WITH_SERVER == 1
                        ? (
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full"
                                >
                                    <Link to="/rooms">
                                        Online Mode
                                    </Link>
                                </Button>
                            )
                        : <></>}
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full"
                    >
                        <Link to="/offline">
                            Offline Mode
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
