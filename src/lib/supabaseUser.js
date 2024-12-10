const url = process.env.NEXT_PUBLIC_USER_API_URL
const api = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const auth = `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`

const headersList = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
  apikey: api,
  Authorization: auth
}

// Fetch all users
export async function getUsers () {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headersList
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Supabase getUsers error:', error)
    throw error
  }
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

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`)
    }

    const data = await response.json()
    return data.length > 0 ? data[0] : null // Return user if found, otherwise null
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
        user_name: userData.user_name,
        user_email: userData.user_email,
        user_password: userData.user_password,
        user_booking_id: userData.user_booking_id || null
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Supabase createUser error response:', error)
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
