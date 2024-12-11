"use client";

import { useEffect, useState } from "react";
import { getLikedArtists } from "@/lib/supabaseLike";
import { useAuth } from "@/context/AuthContext";

export default function MyPage() {
  const { user } = useAuth();
  const [likedArtists, setLikedArtists] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchLikedArtists = async () => {
        try {
          const data = await getLikedArtists(user.id);
          setLikedArtists(data);
        } catch (error) {
          console.error("Error fetching liked artists:", error);
        }
      };

      fetchLikedArtists();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your liked artists.</p>;
  }

  return (
    <div className="px-10">
      <h1 className="text-5xl font-bold mt-12 text-center">Liked Artists</h1>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {likedArtists.map((artist) => (
          <div key={artist.artist_id} className="card">
            <img
              src={artist.artist_logo}
              alt={artist.artist_name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold">{artist.artist_name}</h2>
            <p className="text-gray-600">{artist.artist_genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
