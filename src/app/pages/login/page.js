'use client' // Add this directive to make it a client component

import { useState } from 'react' // Import useState for state management
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar'
import LikedArtist from '@/components/likedartist/LikedArtist' // Corrected import path
import LikedArtistProgram from '@/components/likedartistprogram/LikedArtistProgram' // Corrected import path

export default function LoginPage () {
  const [activeComponent, setActiveComponent] = useState('AllArtist') // State to track the active component

  const renderComponent = () => {
    switch (activeComponent) {
      case 'AllArtist':
        return <LikedArtist />
      case 'Program':
        return <LikedArtistProgram />
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
              <MenubarItem>User</MenubarItem>
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
