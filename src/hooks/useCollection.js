import { collection, onSnapshot,query,where } from 'firebase/firestore';
import {useState,useEffect, useRef} from 'react';
import { db } from '../firebase/config';

export const useCollection = (col,_q) =>{
    const [Documents, setDocuments] = useState(null)
    const q = useRef(_q).current;

    useEffect(() => {
        let ref = collection(db,col)

        if(q){
            ref=query(ref,where(...q))
        }
        const unsub = onSnapshot(ref, (snapshot)=>{
            let results = [];
            snapshot.docs.forEach(doc=>{
                results.push({id:doc.id,...doc.data()})
            })
            setDocuments(results)
        },err=>{
            console.log(err.message);
        })
        return () => unsub();
    }, [col,q])

    return {Documents}
    
}