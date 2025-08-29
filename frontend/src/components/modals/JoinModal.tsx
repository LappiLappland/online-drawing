import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface JoinModalProps {
    open: boolean;
    onSuccess: (nickname: string) => void;
    onRequest: (nickname: string) => Promise<string> | void;
};

export function JoinModal({
    open,
    onSuccess,
    onRequest,
}: JoinModalProps) {
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!nickname.trim()) return;
        setLoading(true);

        try {
            const assignedNickname = await onRequest(nickname);
            if (assignedNickname) {
                onSuccess(assignedNickname);
            }
        }
        catch {
            //
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={() => {}}
        >
            <DialogContent
                className="sm:max-w-sm"
                onPointerDownOutside={e => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Join the room</DialogTitle>
                    <DialogDescription>
                        Write your nickname to join room
                    </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                    <Input
                        placeholder="Your nickname"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                        maxLength={20}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        autoFocus
                    />
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={!nickname.trim() || loading}
                        className="w-full"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Join'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
