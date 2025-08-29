import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Users, PlusCircle } from 'lucide-react';
import { BackToHome } from '@/components/BackToHome';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface RoomInfo {
    url: string;
    name: string;
    count: number;
}

interface GetAllRoomsResponse {
    rooms: RoomInfo[];
}

export default function RoomsPage() {
    const { data } = useSWR<GetAllRoomsResponse>('/api/rooms', fetcher, {
        refreshInterval: 2000,
    });

    return (
        <div className="flex flex-col items-center gap-6 pt-8">
            <BackToHome />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Join a Room
            </h1>

            <Button asChild className="w-full max-w-md">
                <Link to="/room/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Your Own Room
                </Link>
            </Button>

            <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
                {data && data.rooms.map(room => (
                    <Link key={room.url} to={`/room/${room.url}`} prefetch="intent">
                        <Card className="transition-shadow hover:shadow-md">
                            <CardHeader>
                                <CardTitle className="text-xl">{room.name}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    {room.count}
                                    {' '}
                                    player
                                    {room.count !== 1 ? 's' : ''}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}

            </div>
            {data && data.rooms.length === 0 && (
                <span className="text-xl text-center font-medium text-slate-900 dark:text-slate-100">
                    Currently there are no public rooms
                </span>
            )}
        </div>
    );
}
