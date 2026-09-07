"use client"

import { useQuery } from "@tanstack/react-query"
import { retrieveProfile } from "@/api/profile"
import { ProfileState } from "@/api/profile"

const ProfilePage = () => {
  const {
    data: profile,
    isFetching,
    error,
  } = useQuery<ProfileState>({
    queryKey: ["profile"],
    queryFn: retrieveProfile,
  })

  
  if (isFetching) {
    return <div>Loading profile details...</div>
  }

  if (error) {
    console.error("Error fetching profile:", error)
    return <div>Unable to fetch profile details...</div>
  }

  return (
    <div className="min-h-dvh p-3">
      {profile && (
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p>First Name: {profile.profile?.firstName}</p>
          <p>Last Name: {profile.profile?.lastName}</p>
          <p>School ID: {profile.profile?.username.toLowerCase()}</p>
          <p>Date of Birth: {profile.profile?.dateOfBirth}</p>
          <p>Role: {profile.profile?.role}</p>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
