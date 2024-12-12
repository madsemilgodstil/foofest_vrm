const url = process.env.NEXT_PUBLIC_API_URL

const headersList = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
}

// Helper function to handle fetch errors
async function handleResponse (response) {
  if (!response.ok) {
    const errorText = await response.text()
    console.error(`API Error: ${response.status} - ${response.statusText}`)
    console.error(`Details: ${errorText}`)
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }
  return response.json()
}

// Get Bands
export async function getBands () {
  try {
    const response = await fetch(`${url}/bands`, {
      method: 'GET',
      headers: headersList
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('Error fetching bands:', error.message)
    throw error
  }
}

// GET Schedule for stages
export async function getSchedule (stage) {
  try {
    const response = await fetch(`${url}/schedule`, {
      method: 'GET',
      headers: headersList
    })
    const data = await handleResponse(response)
    return data[stage] // Return specific stage schedule
  } catch (error) {
    console.error('Error fetching schedule:', error.message)
    throw error
  }
}

// GET Camping Areas
export async function getCampingAreas () {
  try {
    const response = await fetch(`${url}/available-spots`, {
      method: 'GET',
      headers: headersList
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('Error fetching camping areas:', error.message)
    throw error
  }
}

// GET Cancelled Events
export async function getCancelledEvents () {
  try {
    const response = await fetch(`${url}/events`, {
      method: 'GET',
      headers: headersList
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('Error fetching cancelled events:', error.message)
    throw error
  }
}
