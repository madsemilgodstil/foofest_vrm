const url = process.env.NEXT_PUBLIC_API_URL

const headersList = {
  Accept: '/',
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
}

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

  return {
    id: data.id,
    timeout: data.timeout
  }
}

// POST Fuldfør reservation
export async function fullfillReservation (reservationId) {
  const bodyContent = JSON.stringify({
    id: reservationId
  })
  const response = await fetch(`${url}/fullfill-reservation`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyContent
  })

  const data = await response.json()
  return data
}
