const url = 'https://wytltzrweejgryrvzprn.supabase.co/rest/v1/user'

const headersList = {
  Accept: 'application/json', // Fix Accept header
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
  apikey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY'
}

// Fetch all users
export async function getUsers () {
  const response = await fetch(url, {
    method: 'GET',
    headers: headersList
  })

  const data = await response.json()
  return data
}

// Fetch user by email and password for login
export async function getUserByCredentials (email, password) {
  try {
    const response = await fetch(
      `${url}?user_email=eq.${email}&user_password=eq.${password}`,
      {
        method: 'GET',
        headers: headersList
      }
    )

    const data = await response.json()
    return data.length > 0 ? data[0] : null // Return the user if found, otherwise null
  } catch (error) {
    console.error('Supabase getUserByCredentials error:', error)
    throw error
  }
}

// Create a new user
export async function createUser (userData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headersList,
      body: JSON.stringify({
        user_name: userData.name,
        user_email: userData.email,
        user_password: userData.password,
        user_booking_id: null // Default to null unless specified
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error creating user: ${error.message}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Supabase createUser error:', error)
    throw error
  }
}
