import {useEffect, useState} from "react";
import {SearchResult} from "../../types/SearchResult";
import Image from 'next/image'

const SearchPage = () => {
  const [gifs, setGifs] = useState({} as SearchResult)

  const fetchGifs = async (searchTerm: string) => {
    const gifRes = await fetch(`/api/searchgifs/${searchTerm}`).then((resp) => resp.json())
    setGifs(gifRes.data)
  }

  useEffect(() => {
    fetchGifs('cars')
  }, [])

  return (
    <>
      {gifs.data && (gifs.data.map((gif, i) => (
          <Image
            key={`${gif.title}-`+i}
            src={gif.images.original.url}
            alt={gif.title}
            width={gif.images.original.width}
            height={gif.images.original.height}
          />
        ))
      )}
    </>
  )
}

export default SearchPage
