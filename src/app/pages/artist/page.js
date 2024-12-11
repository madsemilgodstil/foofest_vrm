'use client'

import { getBands } from '@/lib/database'
import { useAuth } from '@/context/AuthContext'
import { likeArtist, unlikeArtist, getLikedArtists } from '@/lib/supabaseLike'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useState } from 'react'

function getImageUrl (band) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/logos/'
  return band.logo.startsWith('https://')
    ? band.logo
    : `${baseUrl}/${band.logo}`
}

export default function displayArtists () {
  const { user } = useAuth()
  const [bands, setBands] = useState([])
  const [likedArtists, setLikedArtists] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBands = await getBands()
      setBands(fetchedBands)

      if (user) {
        const fetchedLikedArtists = await getLikedArtists(user.id)
        setLikedArtists(fetchedLikedArtists.map(artist => artist.artist_id))
      }
    }
    fetchData()
  }, [user])

  const handleLike = async band => {
    if (!user) {
      alert('Please log in to like an artist.')
      return
    }

    const artistData = {
      user_id: user.id,
      artist_id: band.id,
      artist_name: band.name,
      artist_genre: band.genre,
      artist_logo: band.logo
    }

    try {
      await likeArtist(artistData)
      setLikedArtists(prev => [...prev, band.id])
    } catch (error) {
      console.error('Error liking artist:', error)
    }
  }

  const handleUnlike = async band => {
    if (!user) {
      alert('Please log in to unlike an artist.')
      return
    }

    try {
      await unlikeArtist(user.id, band.id)
      setLikedArtists(prev => prev.filter(id => id !== band.id))
    } catch (error) {
      console.error('Error unliking artist:', error)
    }
  }

  return (
    <div className='px-10'>
      <div className='flex flex-col items-center justify-center m-20'>
        <h1 className='text-7xl font-bold mt-12'>All Artists</h1>
      </div>
      <div className='grid grid-cols-4 gap-8 mx-24'>
        {bands.map(band => (
          <Sheet key={band.id}>
            <SheetTrigger asChild>
              <div>
                <Card className='hover:scale-105 transition ease-in-out duration-300 cursor-pointer'>
                  <CardContent className='flex justify-center p-0'>
                    <div className='relative w-full h-40 overflow-hidden rounded-t-xl'>
                      <Avatar className='absolute inset-0 w-full h-full'>
                        <AvatarImage
                          src={getImageUrl(band)}
                          alt={band.name}
                          className='object-cover w-full h-full'
                        />
                        <AvatarFallback>{band.name}</AvatarFallback>
                      </Avatar>
                    </div>
                  </CardContent>
                  <CardHeader className='py-4 px-2'>
                    <CardTitle className='text-center text-xl text-primary'>
                      {band.name}
                    </CardTitle>
                    <CardDescription className='text-center font-bold text-white'>
                      {band.genre}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </SheetTrigger>
            <SheetContent className='p-12 border-none'>
              <SheetHeader>
                {/* Artist Image */}
                <SheetDescription className='flex justify-center py-2'>
                  <Avatar className='w-full h-64 overflow-hidden mt-3'>
                    <AvatarImage
                      className='w-full h-full object-cover'
                      src={getImageUrl(band)}
                      alt={band.name}
                    />
                    <AvatarFallback>{band.name}</AvatarFallback>
                  </Avatar>
                </SheetDescription>

                {/* Artist Name */}
                <SheetTitle className='font-bold text-4xl text-primary'>
                  {band.name}
                </SheetTitle>

                {/* Artist Bio */}
                <SheetDescription className='py-2 mr-12 text-xs'>
                  {band.bio}
                </SheetDescription>

                {/* Artist Genre */}
                <SheetDescription className='mr-12 font-bold text-white'>
                  {band.genre}
                </SheetDescription>

                {/* Artist Members */}
                <SheetDescription className='font-bold mr-12 text-primary'>
                  {Array.isArray(band.members)
                    ? band.members.join(', ')
                    : band.members}
                </SheetDescription>

                {/* Credits */}
                <SheetDescription className='flex justify-center'>
                  <p className='text-center py-2 text-xs'>{band.logoCredits}</p>
                </SheetDescription>

                {/* Like/Unlike Button */}
                <div className='flex justify-center mt-4'>
                  {likedArtists.includes(band.id) ? (
                    <button
                      onClick={() => handleUnlike(band)}
                      className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
                    >
                      Unlike
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLike(band)}
                      className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
                    >
                      Like
                    </button>
                  )}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  )
}
