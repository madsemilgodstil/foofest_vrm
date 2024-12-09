'use client'

import { useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar'
import LikedArtist from '@/components/likedartist/LikedArtist'
import LikedArtistProgram from '@/components/likedartistprogram/LikedArtistProgram'
import UserSettings from '@/components/usersettings/UserSettings' // Import the new UserSettings component

export default function LoginPage () {
  const [activeComponent, setActiveComponent] = useState('AllArtist') // State to track the active component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'AllArtist':
        return <LikedArtist />
      case 'Program':
        return <LikedArtistProgram />
      case 'UserSettings':
        return <UserSettings /> // Render the UserSettings component
      default:
        return null
    }
  }

  return (
    <>
      <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Liked Artist</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setActiveComponent('AllArtist')}>
                All Artist
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => setActiveComponent('Program')}>
                Program
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>My Information</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setActiveComponent('UserSettings')}>
                User Settings
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Bookings</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <section>
        <div>{renderComponent()}</div> {/* Render the selected component */}
      </section>
    </>
  )
}
