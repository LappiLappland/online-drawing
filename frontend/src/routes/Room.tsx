import type { Route } from '.react-router/types/src/routes/+types/Room';
import { BackToHome } from '@/components/BackToHome';
import ChatWindow from '@/components/Chat';
import DrawingCanvasOnline from '@/components/DrawingCanvasOnline';
import Toolbar from '@/components/Toolbar';
import SocketsProvider from '@/contexts/SocketsProvider';

export default function RoomPage({ params }: Route.ComponentProps) {
    return (
        <SocketsProvider id={params.url}>
            <div className="flex flex-col items-center gap-6 pt-16 pb-2 lg:h-screen">
                <BackToHome />
                <div className="flex flex-col lg:flex-row gap-4 grow w-full min-h-full px-3">
                    <div className="border rounded-lg shadow-md h-fit w-full bg-background">
                        <Toolbar />
                        <DrawingCanvasOnline />
                    </div>
                    <ChatWindow />
                </div>
            </div>
        </SocketsProvider>
    );
}
