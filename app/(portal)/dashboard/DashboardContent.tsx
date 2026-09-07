'use client';

import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useProfileRoleCard } from "@/hooks/useProfileRoleCard";
import { SignOut } from "@/lib/actions/auth";

 
export function DashboardContent() {

  const { user, roleCard, isFetching, error } = useProfileRoleCard();
 

  if (isFetching) {
    return <div>Loading contents...</div>;
  }
  if (error) {
    return <div>Error loading profile details.</div>;
  }

  return (
     <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
      {roleCard.map((item, index) => (
          <Link key={index} href={item.link}>
            <Card key={item.title} className="cursor-pointer hover:bg-gray-100">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        
            <Card  onClick={SignOut} className="cursor-pointer hover:bg-black bg-red-600">
              <CardHeader>
                <CardTitle>Sign Out</CardTitle>
                <CardDescription>Sign out of your account</CardDescription>
              </CardHeader>
            </Card>
          
    </div>
  );
}