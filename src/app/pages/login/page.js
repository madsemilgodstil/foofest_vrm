'use client'

import { useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar'

import UserSettings from '@/components/usersettings/UserSettings'

export default function LoginPage () {
  const [activeComponent, setActiveComponent] = useState('UserSettings') // Default to UserSettings

  const renderComponent = () => {
    switch (activeComponent) {
      case 'UserSettings':
        return <UserSettings />
      default:
        return null
    }
  }

  return (
    <>
      <div className='flex justify-center mt-6'>
        {/* Center the menu */}
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>My Information</MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => setActiveComponent('UserSettings')}
                className='text-primary'
              >
                User Settings
              </MenubarItem>
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
