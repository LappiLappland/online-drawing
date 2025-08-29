import { BackToHome } from '@/components/BackToHome';
import DrawingCanvas from '@/components/DrawingCanvas';
import Toolbar from '@/components/Toolbar';

export default function OfflinePage() {
    return (
        <div className="flex flex-col items-center gap-6 pt-16 pb-2 h-screen">
            <BackToHome />
            <div className="flex flex-row gap-4 grow w-full min-h-full px-3">
                <div className="border rounded-lg shadow-md h-fit w-full bg-background">
                    <Toolbar />
                    <DrawingCanvas />
                </div>
            </div>
        </div>
    );
}
