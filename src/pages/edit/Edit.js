import React from 'react'
import './Edit.css'
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//import { useFetch } from '../../hooks/useFetch';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export default function Edit() {
    const {id} = useParams();
    const {mode}=useTheme()
    //const{data:blog,hata,yukleniyor} = useFetch(url);
    const [baslik, setBaslik] = useState('')
    const [icerik, setIcerik] = useState('')
    const [okunmaSuresi, setOkunmaSuresi] = useState('')
    const [yeniKategori, setYeniKategori] = useState('')
    const [kategoriler, setKategoriler] = useState([])
    const [blog, setBlog] = useState('')
    const kategoriInput = useRef(null)
    const history = useHistory()
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
                setKategoriler(doc.data().kategoriler)
                setOkunmaSuresi(doc.data().okunmaSuresi)
                setBaslik(doc.data().baslik)
                setIcerik(doc.data().icerik)
                console.log(baslik,icerik,okunmaSuresi);
            }
            else{
                setHata('Bir hata oluştu!')
            }
        }).catch(error=>{
            setHata(error.message);
            setYukleniyor(false)
        })
    }, [id])
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        //postData({baslik,icerik,kategoriler,okunmaSuresi:okunmaSuresi + 'dakika'})
        const data = {baslik,icerik,kategoriler,okunmaSuresi:okunmaSuresi}
        const ref = doc(db,'bloglar',id)
        
        try {
            await setDoc(ref, data);
            history.push('/AFG-Blog-App-React-Firebase')
        } catch (error) {
            console.log(error.message);
        }
       

    }
    
    const handleAdd = (e) =>{

        e.preventDefault()
        const yKat = yeniKategori.trim()
        if(yKat && !kategoriler.includes(yKat)){
            setKategoriler(oKat=>[...oKat,yeniKategori])
        }
        setYeniKategori('')
        kategoriInput.current.focus()
    }

/*    useEffect(() => {
        if (data) {
          history.push('/')
        }
    }, [data, history])*/

    return (
        <div className={`edit ${mode}`}>
            {hata && <p>{hata}</p>}
            {yukleniyor && <p>Yükleniyor...</p>}
            <h2 className='page-title'>Yazıyı Düzenle</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Yazı Başlık:</span>
                    <input type="text" onChange={(e)=>setBaslik(e.target.value)} placeholder={blog.baslik} />
                </label>

                <label>
                    <span className='categories'>Yazı Kategorileri</span>
                    <input type="text" onChange={(e)=>setYeniKategori(e.target.value)} value={yeniKategori} ref={kategoriInput} />
                    <button onClick={handleAdd} className='btnAdd btn'>Ekle</button>
                </label>
                <p>Kategoriler: <span className='list'>{kategoriler.map(i=><em key={i}>{i},</em>)}</span></p>

                <label>
                    <span>Yazı İçerik:</span>
                    <input type="text" onChange={(e)=>setIcerik(e.target.value)} placeholder={blog.icerik} />
                </label>

                <label>
                    <span>Okunma Süresi:</span>
                    <input type="text" onChange={(e)=>setOkunmaSuresi(e.target.value)} placeholder={blog.okunmaSuresi} />
                </label>
                <button className='btn'>Kaydet</button>
            </form>
        </div>
    )
}
