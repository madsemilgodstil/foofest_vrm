const url = process.env.NEXT_PUBLIC_SUPABASE_URL

const headersList = {
  Accept: '*/*',
  'Content-Type': 'application/json',
  'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  apikey: key,
  Prefer: 'return=representation'
}

//Get
export async function getArtist () {
  const response = await fetch(url, {
    method: 'GET',
    headers: headersList
  })

  const data = await response.json()
  return data
}

// //GET enkel
// export async function getSubById(id) {
//   const response = await fetch(`${url}?id=eq.${id}`, {
//     method: "GET",
//     headers: headersList,
//   });

//   const data = await response.json();
//   return data;
// }

// //Post
// export async function postSub(subscriber) {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: headersList,
//     body: JSON.stringify(subscriber),
//   });

//   const data = await response.json();
//   return data;
// }

// //Patch
// export async function patchSub(id, dataToUpdate) {
//   const response = await fetch(`${url}?id=eq.${id}`, {
//     method: "PATCH",
//     headers: headersList,
//     body: JSON.stringify(dataToUpdate),
//   });

//   const data = await response.json();
//   return data;
// }

// //Delete
// export async function deleteSub(id) {
//   const response = await fetch(`${url}?id=eq.${id}`, {
//     method: "DELETE",
//     headers: {
//       apikey: key,
//       Prefer: "return=representation",
//     },
//   });
//   // eksempel på håndtering af svar
//   if (response.ok) {
//     console.log("Resource deleted successfully");
//   } else {
//     console.error("Failed to delete resource");
//   }
//   const data = await response.json();
//   return data;
// }
