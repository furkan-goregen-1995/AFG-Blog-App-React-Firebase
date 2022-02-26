import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';
import { db } from '../../firebase/config';
import { useState, useEffect } from 'react';
import './Blog.css'
import { doc, getDoc } from 'firebase/firestore';


export default function Blog() {
    const {id} = useParams();
    //const url = 'http://localhost:8000/bloglar/' + id;
    const {mode}=useTheme()
    //const{data:blog,hata,yukleniyor} = useFetch(url);
    const [blog, setBlog] = useState('')
    const [yukleniyor, setYukleniyor] = useState(false)
    const [hata, setHata] = useState('')


    useEffect(() => {
        setYukleniyor(true)
        const ref = doc(db,'bloglar',id)
        getDoc(ref).then((doc)=>{
            //console.log(snap);
            if(doc.exists){
                setYukleniyor(false)
                setBlog(doc.data())
            }
            else{
                setHata('Bir hata oluştu!')
            }
        }).catch(error=>{
            setHata(error.message);
            setYukleniyor(false)
        })
    }, [id])
    return (
        <div className={`blog ${mode}`}>
            {hata && <p>{hata}</p>}
            {yukleniyor && <p>Yükleniyor...</p>}
            {blog && (
                <>
                    <h3 className='page-title'>{blog.baslik}</h3>
                    <p className='time'>{blog.okunmaSuresi} okuma süresi</p>
                    <ul>
                        {blog.kategoriler.map(kat=>
                        <li key={kat}>{kat}</li>
                        )}
                    </ul>
                    <p className='info'>{blog.icerik}</p>
                </>
            )}
        </div>
    )
}
