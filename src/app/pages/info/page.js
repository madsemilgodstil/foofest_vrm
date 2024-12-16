import Accordion from '@/components/accordion/Accordion'

import React from 'react'

const Info = () => {
  return (
    <>
      <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 px-2 max-w-7xl mx-auto my-8'>
          <div className='contact-info flex flex-col justify-center items-start h-min'>
            <h2 className='text-2xl font-bold text-primary'>Kontakt os</h2>
            <p>
              Ønsker du at komme i kontakt med os på FooFest, kan du sende en
              mail til{' '}
              <a href='mailto:kontakt@foofest.dk'>kontakt@foofest.dk</a> eller
              ringe på <a href='123 456 789'>+45 12 34 56 78</a> for personlig
              assistance. Vi er tilgængelige på telefon alle hverdage fra kl.
              10.00 - 18.00.
            </p>
            <h3 className='text-xl font-bold mt-8 text-primary'>
              Vi har kontor på adressen:
            </h3>
            <p>FooFest HQ</p>
            <p>Tverskaya Street 12</p>
            <p>Moscow, 125009, Russia</p>
          </div>

          <div className='iframe-container h-full'>
            <h2 className='text-2xl font-bold text-primary'>Find os her</h2>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.6965400706226!2d37.60481267691555!3d55.76377357308834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5aaea55555%3A0x799d9c88d68b6abe!2sTverskaya%20St%2C%2012%2C%20Moskva%2C%20Rusland%2C%20125009!5e0!3m2!1sda!2sdk!4v1733402670162!5m2!1sda!2sdk'
              width='100%'
              height='400'
              style={{ marginTop: 10, border: '0' }}
              allowFullScreen=''
              aria-hidden='false'
              tabIndex='0'
              className='rounded-lg'
            ></iframe>
          </div>
        </div>
        <Accordion />
      </>
    </>
  )
}

export default Info
