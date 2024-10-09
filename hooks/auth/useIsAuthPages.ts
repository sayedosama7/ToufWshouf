import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useIsAuthPage(): boolean {
    const router = useRouter();
    const [isAuthPage, setIsAuthPage] = useState<boolean>(false);

    useEffect(() => {
        const authPages = ['/login', '/signup'];
        setIsAuthPage(authPages.includes(router.pathname));
    }, [router.pathname]);

    return isAuthPage;
}

export default useIsAuthPage;
