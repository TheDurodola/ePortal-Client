import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function RootPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.has('session');

    redirect(isAuthenticated ? '/dashboard' : '/signin');
}