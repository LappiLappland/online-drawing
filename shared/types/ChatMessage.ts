interface ChatMessageGeneric {
    id: string;
    type: 'user' | 'system';
    content: string;
    timestamp: number;
}

interface ChatMessageSystem extends ChatMessageGeneric {
    type: 'system';

}

interface ChatMessageUser extends ChatMessageGeneric {
    type: 'user';
    nickname: string;
}

export type ChatMessage = ChatMessageSystem | ChatMessageUser;
