import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { db } from '../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import DeleteIcon from '../assets/delete.svg'
import UpdateIcon from '../assets/update.svg'
import './BlogList.css'

export default function BlogList({bloglar}) {
    
    const handleDelete = async(id) =>{
        const ref = doc(db,'bloglar',id)
        await deleteDoc(ref)
    }

    const {mode}=useTheme()
    if(bloglar.length === 0){
        return <div className='error'>Aranan yazı bulunamadı</div>
    }
 
  return (
    <div className='blog-list'>
        {bloglar.map(blog=>(
        
        <div key={blog.id} className={`card ${mode}`}>
            <Link to={'/AFG-Blog-App-React-Firebase/edit/' + blog.id}><img className={`update ${mode}`} src={UpdateIcon} alt="" /></Link>
            <h3>{blog.baslik}</h3>
            <p>{blog.okunmaSuresi}</p>
            <p >{blog.icerik.substring(0,100)}...</p>
            <img className={`delete ${mode}`} onClick={()=>handleDelete(blog.id)} src={DeleteIcon} alt="" />
            <Link to={'/AFG-Blog-App-React-Firebase/blog/' + blog.id}>Daha Fazlasını Oku</Link>
        </div>
        ))}
    </div> )
}
