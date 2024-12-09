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
        user_name: userData.user_name, // Corresponds to the "user_name" column
        user_email: userData.user_email, // Corresponds to the "user_email" column
        user_password: userData.user_password, // Corresponds to the "user_password" column
        user_booking_id: userData.user_booking_id || null // Optional, corresponds to "user_booking_id"
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

// Update user information (PATCH)
export async function updateUser (userId, updates) {
  try {
    const response = await fetch(`${url}?id=eq.${userId}`, {
      method: 'PATCH',
      headers: headersList,
      body: JSON.stringify(updates)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error updating user: ${error.message}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Supabase updateUser error:', error)
    throw error
  }
}

// Replace user information (PUT)
export async function replaceUser (userId, userData) {
  try {
    const response = await fetch(`${url}?id=eq.${userId}`, {
      method: 'PUT',
      headers: headersList,
      body: JSON.stringify({
        user_name: userData.user_name,
        user_email: userData.user_email,
        user_password: userData.user_password,
        user_booking_id: userData.user_booking_id
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error replacing user: ${error.message}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Supabase replaceUser error:', error)
    throw error
  }
}

// Delete a user
export async function deleteUser (userId) {
  try {
    const response = await fetch(`${url}?id=eq.${userId}`, {
      method: 'DELETE',
      headers: headersList
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error deleting user: ${error.message}`)
    }

    return { message: 'User deleted successfully.' }
  } catch (error) {
    console.error('Supabase deleteUser error:', error)
    throw error
  }
}
