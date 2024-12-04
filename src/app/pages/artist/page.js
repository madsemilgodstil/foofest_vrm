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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function getRelatedBands (bands, currentBand) {
  const related = bands.filter(
    band => band.genre === currentBand.genre && band.name !== currentBand.name
  )

  return related.slice(0, 3)
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
            const relatedBands = getRelatedBands(bands, band)

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
                    <AvatarImage src={band.logo} alt={band.name} />
                    <AvatarFallback>{band.name}</AvatarFallback>
                  </Avatar>
                </CardContent>
                <CardFooter className='flex justify-center'>
                  <Sheet>
                    <SheetTrigger>View Artist</SheetTrigger>
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
                        <SheetDescription className='flex justify-center'>
                          <Avatar className='w-48 h-48 rounded-full'>
                            <AvatarImage src={band.logo} alt={band.name} />
                            <AvatarFallback>{band.name}</AvatarFallback>
                          </Avatar>
                        </SheetDescription>
                        <SheetDescription>{band.bio}</SheetDescription>
                        <SheetDescription>
                          <h2 className='py-8 text-center'>Related</h2>
                          <ul className='text-center space-y-2'>
                            {relatedBands.map(related => (
                              <li key={related.name}>
                                <Sheet>
                                  <SheetTrigger>{related.name}</SheetTrigger>
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
                                      <SheetDescription className='flex justify-center'>
                                        <Avatar className='w-48 h-48 rounded-full'>
                                          <AvatarImage
                                            src={band.logo}
                                            alt={band.name}
                                          />
                                          <AvatarFallback>
                                            {band.name}
                                          </AvatarFallback>
                                        </Avatar>
                                      </SheetDescription>
                                      <SheetDescription>
                                        {band.bio}
                                      </SheetDescription>
                                      <SheetDescription>
                                        <h2 className='py-8 text-center'>
                                          Related
                                        </h2>
                                        <ul className='text-center space-y-2'>
                                          {relatedBands.map(related => (
                                            <li key={related.name}>
                                              <SheetTrigger>
                                                {related.name}
                                              </SheetTrigger>
                                            </li>
                                          ))}
                                        </ul>
                                      </SheetDescription>
                                    </SheetHeader>
                                  </SheetContent>
                                </Sheet>
                              </li>
                            ))}
                          </ul>
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
      <div className='fixed bottom-5 right-5'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href='/pages/artist'>Top</Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to top</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}

export default displayArtists
