import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


export default function VipInfo() {
    
  const [info,setInfo] = useState({});
  const params = useParams();

  useEffect(() => {
    doApi();
  },[])
  


  const doApi = async() => {
    const url = "http://fs1.co.il/bus/vip_big.php";
    try{
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data);
      const item = data.find(item => item.rank == params["rank"])
      if(item){
        setInfo(item);
      }
      // setInfo()
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='container'>
      {/* אני בודק שאחד מהמאמפיינים קיים לפני שאני מציג
      את המידע כדי לא לקבל פאטל אירור */}
      { info.name &&
      <article>
        <h1>Info about: {info.personName}</h1>
        <img src={info.person.squareImage} className='col-4 my-3'/>
        <div>Company: {info.source}</div>
        <div>Bio: {info.bios[0]} </div>

        <Link to="/vip">Back to list</Link>
      </article> }
    </div>
  )
}
