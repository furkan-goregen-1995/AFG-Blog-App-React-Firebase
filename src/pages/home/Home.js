import './Home.css'
import BlogList from '../../components/BlogList';
import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';

export default function Home() {
    
    //const {data,hata,yukleniyor} = useFetch('http://localhost:8000/bloglar','GET');
    const [yukleniyor, setYukleniyor] = useState(false)
    const [hata, setHata] = useState('')
    const {Documents:data} = useCollection('bloglar')

    return (
        <div>
            {hata && <p className='error'>{hata}</p>}
            {yukleniyor && <p className='loading'>Yükleniyor...</p>}
            {data && <BlogList bloglar={data}/>}      
        </div>
    )
}
