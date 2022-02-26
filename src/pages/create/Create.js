import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { db } from '../../firebase/config';
import './Create.css'
import { addDoc, collection } from 'firebase/firestore';

export default function Create() {
    const [baslik, setBaslik] = useState('')
    const [icerik, setIcerik] = useState('')
    const [okunmaSuresi, setOkunmaSuresi] = useState('')
    const [yeniKategori, setYeniKategori] = useState('')
    const [kategoriler, setKategoriler] = useState([])
    const kategoriInput = useRef(null)
    const history = useHistory()
    //const { postData } = useFetch('http://localhost:8000/bloglar', 'POST')
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        //postData({baslik,icerik,kategoriler,okunmaSuresi:okunmaSuresi + 'dakika'})
        const doc = {baslik,icerik,kategoriler,okunmaSuresi:okunmaSuresi + 'dakika'}
        const ref = collection(db,'bloglar')
        try {
            await addDoc(ref,{...doc})
            history.push('/AFG-Blog-App-React-Firebase')
        } catch (error) {
            console.log(error);
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
        <div className='create'>
            <h2 className='page-title'>Yeni Yazı Oluştur</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Yazı Başlık:</span>
                    <input type="text" onChange={(e)=>setBaslik(e.target.value)} value={baslik} required />
                </label>

                <label>
                    <span className='categories'>Yazı Kategorileri</span>
                    <input type="text" onChange={(e)=>setYeniKategori(e.target.value)} value={yeniKategori} ref={kategoriInput} />
                    <button onClick={handleAdd} className='btnAdd btn'>Ekle</button>
                </label>
                <p>Kategoriler: <span className='list'>{kategoriler.map(i=> <em key={i}>{i},</em>)}</span></p>

                <label>
                    <span>Yazı İçerik:</span>
                    <input type="text" onChange={(e)=>setIcerik(e.target.value)} value={icerik} required />
                </label>

                <label>
                    <span>Okunma Süresi:</span>
                    <input type="number" onChange={(e)=>setOkunmaSuresi(e.target.value)} value={okunmaSuresi} required />
                </label>
                <button className='btn'>Oluştur</button>
            </form>
        </div>
    )
}
