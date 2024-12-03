import Image from 'next/image'

import Hero_landing from '@/components/hero_landing/Hero_landing'

import Accordion from '@/components/accordion/Accordion'

export default function Home () {
  return (
    <div>
      <Hero_landing />
      <Accordion />
    </div>
  )
}
