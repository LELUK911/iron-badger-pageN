const API_KEY = import.meta.env.VITE_GOLDSKY_KEY



export const requestPactStory = async (user) => {
    try {
        //debtor: ${user}

        const query = `{
            pactCreateds(first: 1000, where:{debtor : "${user.toLowerCase()}"}) {
            idParam
            id
            amount
            debtor
            }
        }
        `;

        const endPoint = "https://api.goldsky.com/api/public/project_cm9v5e796a63801y06abnc0uj/subgraphs/userPactStory/1.0.0/gn"
        const res = await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            },
            body: JSON.stringify({ query })
        });

        const data = await res.json();
        console.log(data.data.pactCreateds);

        return (data.data.pactCreateds);
    } catch (error) {
        console.error(error)
    }
}


export const requestNewInstalmentUp = async (index) => {
    try {

        const query = `
        {
  newInstalmentPots(where:{
    index:${index}
  }){
    index,
		player,
		amountPot
  }  
}`

        const endPoint = 'https://api.goldsky.com/api/public/project_cm9v5e796a63801y06abnc0uj/subgraphs/upWardAuctionStory/1.0.0/gn'

        const res = await fetch(endPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            }, body: JSON.stringify({ query })

        })
        const data = await res.json();
        return (data.data.newInstalmentPots);

    } catch (error) {
        console.error(error)

    }
}


export const requestNewInstalmentDown = async (index) => {
    try {

        const query = `
        {
  newInstalmentPots(where:{
    index:${index}
  }){
    index,
		player,
		amountPot
  }  
}`

        const endPoint = 'https://api.goldsky.com/api/public/project_cm9v5e796a63801y06abnc0uj/subgraphs/downWardAuctionStory/1.0.0/gn'

        const res = await fetch(endPoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            }, body: JSON.stringify({ query })

        })
        const data = await res.json();
        return (data.data.newInstalmentPots);

    } catch (error) {
        console.error(error)

    }
}