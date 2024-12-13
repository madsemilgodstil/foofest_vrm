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



// GET Campingområder
export async function getCampingAreas() {
    const response = await fetch(`${url}/available-spots`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Hvorfor skal jeg det her før det virker?!
        //Fik det af chatGPT få at få noget til at virke..
      },
    });
    const data = await response.json();
    return data;
}




export async function reserveSpot(area, amount) {
  const bodyContent = JSON.stringify({
    area: area,  
    amount: amount 
  });

  const response = await fetch(`${url}/reserve-spot`, {
    method: "PUT",
    headers: headersList,
    body: bodyContent  
  });

  const data = await response.json();
  return data.id;
}