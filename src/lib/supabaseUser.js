const url = process.env.NEXT_PUBLIC_USER_API_URL

const headersList = {
  Accept: '/',
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
  apikey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY'
}

//Get
export async function getUsers () {
  const response = await fetch(url, {
    method: 'GET',
    headers: headersList
  })

  const data = await response.json()
  return data
}
