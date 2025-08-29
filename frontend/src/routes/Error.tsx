import { ErrorDisplay } from '@/components/ErrorDisplay';
import { useSearchParams } from 'react-router';

export default function ErrorPage() {
    const [searchParams] = useSearchParams();

    const errorText = searchParams.get('text');
    const errorCode = searchParams.get('code');

    return (
        <ErrorDisplay
            message={errorText ?? ''}
            code={errorCode ?? ''}
        />
    );
}
