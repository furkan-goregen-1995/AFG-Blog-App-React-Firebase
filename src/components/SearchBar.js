import {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './SearchBar.css'

export default function SearchBar() {
    const [kelime, setKelime] = useState('')
    const history = useHistory()

    const handleSearch = (e) =>{
        e.preventDefault()
        history.push('/AFG-Blog-App-React-Firebase/search/?q='+ kelime)
    } 
  return (
    <div className='searchbar'>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Aranacak Kelime' id='search' onChange={(e)=> setKelime(e.target.value)} />
        </form>
    </div>
  )
}
