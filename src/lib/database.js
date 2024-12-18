const url = process.env.NEXT_PUBLIC_API_URL

const headersList = {
  Accept: '/',
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
}

// const headersList = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
//   Prefer: 'return=representation',
// };

//Get
export async function getBands () {
  const response = await fetch(url + '/bands', {
    method: 'GET',
    headers: headersList
  })

  const data = await response.json()
  return data
}

//GET Schedule for stages
export async function getSchedule (stage) {
  const response = await fetch(`${url}/schedule`, {
    method: 'GET',
    headers: headersList
  })

  const data = await response.json()

  return data[stage]
  //Rasmus -
  //Stage er til at vælge mellem de 3 stages, så den kan hente alle 3 på en gang og kan loope igennem den, også på dagen.
  //Hvis vi henter på ${url}/schedule/${stages} tager den kun den ene stage af gangen
}

// Fetch Schedule
export async function getScheduleSlider () {
  try {
    const response = await fetch(`${url}/schedule`, {
      method: 'GET',
      headers: headersList
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch schedule: ${response.status}`)
    }
    const data = await response.json()
    console.log('Server Fetched Schedule Data:', data) // Debugging log
    return data || {}
  } catch (error) {
    console.error('Error fetching schedule:', error)
    return {} // Return an empty object on failure
  }
}

// GET Campingområder
export async function getCampingAreas () {
  const response = await fetch(`${url}/available-spots`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      //Hvorfor skal jeg det her før det virker?!
      //Fik det af chatGPT få at få noget til at virke..
    }
  })
  const data = await response.json()
  return data
}

//PUT
export async function reserveSpot (area, totalTents) {
  const bodyContent = JSON.stringify({
    area: area,
    amount: totalTents
  })

  const response = await fetch(`${url}/reserve-spot`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyContent
  })

  const data = await response.json()

  // Sørg for, at data indeholder `id` og `timeout`
  return {
    id: data.id, // Ekstraher ID fra respons
    timeout: data.timeout
  }
}

// POST Fuldfør reservation
export async function fullfillReservation (reservationId) {
  const bodyContent = JSON.stringify({
    id: reservationId // Send reservationens ID som en del af body'en
  })
  const response = await fetch(`${url}/fullfill-reservation`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyContent // Sender reservationens ID i body'en
  })

  const data = await response.json() // Hvis alt gik godt, returneres data
  return data // Returnér det data, som serveren sender tilbage (f.eks. reservations-ID)
}
