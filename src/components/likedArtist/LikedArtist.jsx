"use client";

import { useState, useEffect } from "react";
import { getLikedArtists } from "@/lib/supabaseLike";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function LikedArtist() {
  const { user } = useAuth();
  const [likedArtists, setLikedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLikedArtists = async () => {
    setLoading(true);
    setError(null);

    try {
      if (user) {
        const data = await getLikedArtists(user.id);
        setLikedArtists(data);
      }
    } catch (err) {
      console.error("Error fetching liked artists:", err);
      setError("Failed to load liked artists. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikedArtists();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-lg text-gray-500">Loading liked artists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <Button onClick={fetchLikedArtists} className="bg-blue-500 text-white">
          Try Again
        </Button>
      </div>
    );
  }

  if (!likedArtists.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <img
          src="/placeholder-no-artists.svg" // Replace with your placeholder image path
          alt="No liked artists"
          className="w-1/2 h-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center mb-2">
          No Liked Artists Yet
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Start exploring and liking artists to see them appear here!
        </p>
        <Button
          onClick={() => (window.location.href = "/pages/artist")} // Adjust link to artist exploration page
          className="bg-primary text-white"
        >
          Explore Artists
        </Button>
      </div>
    );
  }

  return (
    <div className="liked-artist-list">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Liked Artists</h2>
        <Button onClick={fetchLikedArtists} className="bg-blue-500 text-white">
          Refresh
        </Button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedArtists.map((artist) => (
          <li
            key={artist.artist_id}
            className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <p className="text-lg font-semibold">{artist.artist_name}</p>
            <p className="text-sm text-gray-600">ID: {artist.artist_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
