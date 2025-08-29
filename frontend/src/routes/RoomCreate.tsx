/* eslint-disable @stylistic/no-trailing-spaces */
import { useState } from 'react';
import { Form, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Eye, Lock } from 'lucide-react';
import { BackToHome } from '@/components/BackToHome';
import fetcher from '@/lib/fetcher';

export default function RoomCreatePage() {
    const [roomName, setRoomName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const navigate = useNavigate();

    async function handleCreate() {
        const req = fetcher<{ roomUrl: string }>('/api/room', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                roomName: roomName,
                isPublic: isPublic,
            }),
        });
        const res = await req;
        navigate(`/room/${res.roomUrl}`);
    }

    return (
        <div>
            <BackToHome />

            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create a Room</CardTitle>
                        <CardDescription>
                            Set up your drawing space and invite others to join
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Form onSubmit={(e) => { 
                            e.preventDefault();
                            handleCreate();
                        }}
                        >
                            <div className="space-y-4">
                                <div>
                                    <Label className="mb-1.5" htmlFor="roomName">Room Name</Label>
                                    <Input
                                        id="roomName"
                                        value={roomName}
                                        onChange={e => setRoomName(e.target.value)}
                                        placeholder=""
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="mb-1.5" htmlFor="visibility">Visibility</Label>
                                    <Select
                                        value={isPublic ? 'public' : 'private'}
                                        onValueChange={v => setIsPublic(v === 'public')}
                                    >
                                        <SelectTrigger id="visibility" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="public">
                                                <span className="flex items-center gap-2">
                                                    <Eye className="h-4 w-4" />
                                                    Public – anyone can join
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="private">
                                                <span className="flex items-center gap-2">
                                                    <Lock className="h-4 w-4" />
                                                    Private – invite only
                                                </span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button type="submit" className="w-full">
                                    Create Room
                                </Button>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
