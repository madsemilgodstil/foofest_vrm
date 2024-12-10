"use client";

import { useState, useEffect } from "react";
import { getLikedArtists } from "@/lib/supabaseLike";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function LikedArtist() {
  return <div className="liked-artist-list">Liked in program</div>;
}
