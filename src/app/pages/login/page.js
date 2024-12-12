"use client";

import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";
import LikedArtist from "@/components/likedartist/LikedArtist";
import LikedArtistProgram from "@/components/likedartistprogram/LikedArtistProgram";
import UserSettings from "@/components/usersettings/UserSettings"; // Import the new UserSettings component

export default function LoginPage() {
  const [activeComponent, setActiveComponent] = useState("AllArtist"); // State to track the active component

  const renderComponent = () => {
    switch (activeComponent) {
      case "AllArtist":
        return <LikedArtist />;
      case "Program":
        return <LikedArtistProgram />;
      case "UserSettings":
        return <UserSettings />; // Render the UserSettings component
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-center mt-6">
        {" "}
        {/* Center the menu */}
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="text-primary">
              Liked Artist
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => setActiveComponent("AllArtist")}
                className="text-primary"
              >
                All Artist
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={() => setActiveComponent("Program")}
                className="text-primary"
              >
                Program
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>My Information</MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => setActiveComponent("UserSettings")}
                className="text-primary"
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
  );
}
