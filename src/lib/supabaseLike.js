export async function likeArtist (artistId, artistName) {
  const url = 'https://wytltzrweejgryrvzprn.supabase.co/rest/v1/liked'
  const headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
    apikey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY'
  }

  const userId = localStorage.getItem('user_id') // Retrieve the logged-in user's ID

  if (!userId) {
    throw new Error('User is not logged in. Cannot like artist.')
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headersList,
      body: JSON.stringify({
        user_id: userId,
        artist_id: artistId,
        artist_name: artistName
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Error liking artist: ${error.message}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error liking artist:', error)
    throw error
  }
}
