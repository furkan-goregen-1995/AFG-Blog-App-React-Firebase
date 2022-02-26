import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
//import { useFetch } from '../../hooks/useFetch';
import BlogList from '../../components/BlogList'
import { db } from '../../firebase/config';
import './Search.css'
import { collection, getDocs } from 'firebase/firestore';

export default function Search() { 
    const queryString = useLocation().search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get('q')
    //const url = 'http://localhost:8000/bloglar/?q='+query
    //const {hata,yukleniyor,data} = useFetch(url)
    const [datas, setDatas] = useState(null)
    const [hata, setHata] = useState('')
    const [yukleniyor, setYukleniyor] = useState(true)


    useEffect(() => {
        const ref = collection(db,'bloglar')
        getDocs(ref)
        .then((snap)=>{
            let result = [];
            snap.forEach(doc=>{
                result.push({id:doc.id,...doc.data()})
                setYukleniyor(false)
            })
            setDatas(result)
        }).catch(err=>{
            setHata(err.message)
            setYukleniyor(true)

        })
    }, [])

    return (
        <div>
            {hata && <p className='error'>{hata}</p>}
            {yukleniyor && <p className='loading'>Yükleniyor...</p>}
            {datas && <BlogList bloglar={datas.filter((data)=>data.baslik.toLowerCase().includes(query.toLowerCase()))}/>}      
        </div>
    )
    

}
