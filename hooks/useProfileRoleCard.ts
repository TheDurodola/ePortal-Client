
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { retrieveProfile } from "@/api/profile";
import { ProfileState } from "@/api/profile";
import { roleCards } from "@/lib/profile";

type Role = keyof typeof roleCards; 

const DEFAULT_ROLE_CARD =  [
  {
    title: "Sign Out",
    description: "Sign out of your account",
    link: "/signout",
  },]; 

export function useProfileRoleCard() {
  const { data: user, isFetching, error } = useQuery<ProfileState>({
    queryKey: ['profile'],
    queryFn: retrieveProfile,
    staleTime: 60 * 30 * 1000, // 30 minutes
  });

  const roleCard = useMemo(() => {
    const role = user?.profile?.role;
    if (!role || !(role in roleCards)) return DEFAULT_ROLE_CARD;
    return roleCards[role as Role];
  }, [user?.profile?.role]);

  return { user, roleCard, isFetching, error };
}