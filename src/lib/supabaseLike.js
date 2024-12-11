const url = process.env.NEXT_PUBLIC_LIKED_API_URL
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const headersList = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  apikey: apiKey,
  Authorization: `Bearer ${apiKey}`
}

// Fetch all liked artists for a specific user
export async function getLikedArtists (userId) {
  try {
    const response = await fetch(`${url}?user_id=eq.${userId}`, {
      method: 'GET',
      headers: headersList
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch liked artists: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Supabase getLikedArtists error:', error)
    throw error
  }
}

// Add an artist to the liked list
export async function likeArtist (artistData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headersList,
      body: JSON.stringify(artistData)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error liking artist: ${error.message}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Supabase likeArtist error:', error)
    throw error
  }
}

// Remove an artist from the liked list
export async function unlikeArtist (userId, artistId) {
  try {
    const response = await fetch(
      `${url}?user_id=eq.${userId}&artist_id=eq.${artistId}`,
      {
        method: 'DELETE',
        headers: headersList
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error unliking artist: ${error.message}`)
    }

    return { message: 'Artist unliked successfully.' }
  } catch (error) {
    console.error('Supabase unlikeArtist error:', error)
    throw error
  }
}
