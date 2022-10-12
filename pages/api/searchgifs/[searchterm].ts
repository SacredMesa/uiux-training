import {NextApiRequest, NextApiResponse} from "next";

const search = async (searchTerm: string, offset: number) => {

  const searchLimit = 25

  try {
    return await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${searchTerm}&limit=${searchLimit}&offset=${offset}&rating=g&lang=en`)
      .then((resp) => resp.json())
  } catch (e) {
    throw new Error('API failed')
  }
}

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {searchterm} = req.query
    if (req.method === "GET") {
      const data = await search(`${searchterm}`, 0)
      return res.status(200).json({data, success: true})
    }
    res.status(405).json({description: 'Method not found.'})
  } catch (_e: any) {
    console.error(_e)
  }
}

export default main
