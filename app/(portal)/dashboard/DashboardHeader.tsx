'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveProfile  } from "@/api/profile";
import { ProfileState } from "@/api/profile";


interface Props {
  role?: string;
}

export function DashboardHeader({ role }: Props) {
 const { data: user, isFetching, error } = useQuery<ProfileState>({
    queryKey: ['profile'],
    queryFn: retrieveProfile,
  });
  console.log("DASH")

  if (error) {
    return <div>Loading profile details...</div>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold">Welcome, {user?.profile?.firstName}!</h1>
    </div>
  );
}