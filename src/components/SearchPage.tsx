import {useEffect, useState} from "react";
import {SearchResult} from "../../types/SearchResult";
import Image from 'next/image'

const SearchPage = () => {
  const [gifs, setGifs] = useState({} as SearchResult)

  const fetchGifs = async () => {
    const testsearch = 'cars'
    const gifRes = await fetch(`/api/searchgifs/${testsearch}`).then((resp) => resp.json())
    setGifs(gifRes.data)
  }

  useEffect(() => {
    fetchGifs()
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
