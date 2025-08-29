import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Users } from 'lucide-react';
import { type ChatMessage } from '#shared/types/ChatMessage';
import { type RoomUser } from '#shared/types/RoomUser';
import { Input } from './ui/Input';
import { SocketContext } from '@/contexts/SocketsProvider';

interface UsersMap {
    [key: string]: RoomUser;
}

export default function ChatWindow() {
    const socket = useContext(SocketContext);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isAtBottom, setIsAtBottom] = useState(true);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [users, setUsers] = useState<UsersMap>({});

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
        setIsAtBottom(isNearBottom);
    };

    useEffect(() => {
        if (!socket) return;

        const msgFn = (msg: ChatMessage) => {
            setMessages(prev => ([...prev, msg]));
            requestAnimationFrame(() => {
                if (isAtBottom && scrollAreaRef.current) {
                    scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight + 100);
                }
            });
        };
        const initFn = (messages: ChatMessage[], users: RoomUser[]) => {
            const usersMap = users.reduce((obj, user) => {
                return { ...obj, [user.id]: user };
            }, {});
            setUsers(usersMap);
            setMessages(messages);
        };
        const userLeaveFn = (user: RoomUser) => {
            const usersMap = { ...users };
            delete usersMap[user.id];
            setUsers(usersMap);
        };
        const userJoinFn = (user: RoomUser) => {
            const usersMap = { ...users, [user.id]: user };
            setUsers(usersMap);
        };

        socket.on('message', msgFn);
        socket.on('initChat', initFn);
        socket.on('userLeave', userLeaveFn);
        socket.on('userJoin', userJoinFn);

        return () => {
            socket.off('message', msgFn);
            socket.off('initChat', initFn);
            socket.off('userLeave', userLeaveFn);
            socket.off('userJoin', userJoinFn);
        };
    }, [isAtBottom, messages, socket, users]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!socket) return;
        const text = newMessage.trim();
        if (newMessage.trim() === '') return;

        socket.emit('message', text);

        setNewMessage('');
    };

    function getMessageComponent(message: ChatMessage) {
        if (message.type === 'system') {
            return (
                <div key={message.id} className="grid gap-1">
                    <p className="text-sm text-center text-gray-400">
                        ---
                        {' '}
                        {message.content}
                        {' '}
                        ---
                    </p>
                </div>
            );
        }

        return (
            <div key={message.id} className="grid gap-1">
                <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm">{message.nickname}</span>
                    <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <p className="text-sm text-left">
                    {message.content}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-80 lg:h-full border rounded-lg shadow-md w-full lg:max-w-md bg-background">
            <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-semibold">Chat</h3>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Users className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <div className="p-2 text-sm font-medium">Participants</div>
                        {Object.values(users).map(user => (
                            <DropdownMenuItem key={user.id} className="py-1 px-2">
                                {user.nickname}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <ScrollArea
                className="flex-1 p-4 h-[50%] lg:h-[70%]"
                onScroll={handleScroll}
                ref={scrollAreaRef}
            >
                <div className="space-y-4">
                    {messages.map(getMessageComponent)}
                </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="p-4 border-t shrink-0">
                <div className="flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                    />
                    <Button type="submit">Send</Button>
                </div>
            </form>
        </div>
    );
};
