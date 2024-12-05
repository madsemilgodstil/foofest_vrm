import { getBands } from '@/lib/database'
import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

import { Button } from '@/components/ui/button'

function getImageUrl (band) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/logos/'
  if (band.logo.startsWith('https://')) {
    return band.logo
  } else {
    return `${baseUrl}/${band.logo}`
  }
}

async function displayArtists () {
  const bands = await getBands()

  return (
    <>
      <div className='px-10'>
        <h1 className='text-blue-500 text-center text-2xl font-bold mb-4'>
          All Artists
        </h1>
        <div className='grid grid-cols-3 gap-8'>
          {bands.map(band => {
            return (
              <Card key={band.id}>
                <CardHeader>
                  <CardTitle className='text-center text-xl'>
                    {band.name}
                  </CardTitle>
                  <CardDescription className='text-center'>
                    {band.genre}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex justify-center'>
                  {/* Avatar */}
                  <Avatar className='w-48 h-48 rounded-full'>
                    <AvatarImage src={getImageUrl(band)} alt={band.name} />
                    <AvatarFallback>{band.name}</AvatarFallback>
                  </Avatar>
                </CardContent>

                <CardFooter className='flex justify-center'>
                  <Sheet>
                    <SheetTrigger>
                      <Button variant='outline'>View Artist</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle className='text-center'>
                          {band.name}
                        </SheetTitle>
                        <SheetDescription className='text-center'>
                          {band.genre}
                        </SheetDescription>
                        <SheetDescription className='text-center'>
                          {Array.isArray(band.members)
                            ? band.members.join(', ')
                            : band.members}
                        </SheetDescription>
                        <SheetDescription className='flex justify-center py-2'>
                          {/* Avatar */}
                          <Avatar className='w-48 h-48 rounded-full'>
                            <AvatarImage
                              src={getImageUrl(band)}
                              alt={band.name}
                            />
                            <AvatarFallback>{band.name}</AvatarFallback>
                          </Avatar>
                        </SheetDescription>
                        <SheetDescription className='flex justify-center'>
                          <p className='text-center py-2 text-xs'>
                            {band.logoCredits}
                          </p>
                        </SheetDescription>
                        <SheetDescription className='py-2'>
                          {band.bio}
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default displayArtists
