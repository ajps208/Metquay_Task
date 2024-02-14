import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import EventPost from '../components/EventsPost';
import { allOtherEventAPI, allSportsAPI } from '../Services/allApi';
import { useEffect } from 'react';
import BasicExample from '../components/Header';


function EventsView({sports}) {
  const isSports = sports ? true : false
  const[sportEvent,setSportEvent]=useState([])
  const[otherEvent,setOtherEvent]=useState([])
  const[searchKey,setSearchKey]=useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (isSports) {
          result = await allSportsAPI(searchKey);
          if (result.status === 200) {
            setSportEvent(result.data);
          } else {
            console.log(result);
          }
        } else {
          result = await allOtherEventAPI(searchKey);
          if (result.status === 200) {
            setOtherEvent(result.data);
          } else {
            console.log(result);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isSports, searchKey]);

  return (
    <div  style={{minHeight:"100vh",backgroundColor:" #130f40",backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",color:"white"}}>
        <BasicExample/>

    <Container >
        <h3 className='mt-4 ' style={{color:"#9c7945"}}>  {isSports ? ( <><i className="fa-solid fa-volleyball"></i> SPORTS</>) : (<><i className="fa-solid fa-guitar"></i> EVENTS</>)}</h3>
      { isSports? <div className='pt-4 d-flex flex-row flex-wrap'> 
            <div onClick={()=>setSearchKey("football")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-futbol"></i> <span className='ps-2'>football</span></div>
            <div onClick={()=>setSearchKey("cricket")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-baseball-bat-ball"></i> <span className='ps-2'>cricket</span></div>
            <div onClick={()=>setSearchKey("hockey")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-hockey-puck"></i> <span className='ps-2'>hockey</span></div>
            <div onClick={()=>setSearchKey("volleyball")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i className="fa-solid fa-volleyball"></i> <span className='ps-2'>volleyball</span></div>
            <div onClick={()=>setSearchKey("kabadi")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-people-pulling"></i> <span className='ps-2'>kabadi</span></div>
            <div onClick={()=>setSearchKey("athletics")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-person-running"></i> <span className='ps-2'>athletics</span></div>
            <div onClick={()=>setSearchKey("basketball")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-basketball"></i> <span className='ps-2'>basketball</span></div>
            <div onClick={()=>setSearchKey("Wrestling")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-people-arrows"></i> <span className='ps-2'>Wrestling</span></div>
            <div onClick={()=>setSearchKey("marathon")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-person-running"></i> <span className='ps-2'>marathon</span></div>
            <div onClick={()=>setSearchKey("golf")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-golf-ball-tee"></i> <span className='ps-2'>golf</span></div>
            <div onClick={()=>setSearchKey("swimming")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-person-swimming"></i> <span className='ps-2'>swimming</span></div>
            <div onClick={()=>setSearchKey("cycling")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-bicycle"></i> <span className='ps-2'>cycling</span></div>   
            <div onClick={()=>setSearchKey("tennis")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-table-tennis-paddle-ball"></i> <span className='ps-2'>Tennis</span></div>   
            <div onClick={()=>setSearchKey("badminton")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-stopwatch-20"></i> <span className='ps-2'>Badminton</span></div>   
        </div>:
       <div className='pt-4 d-flex flex-row flex-wrap'> 
       <div onClick={()=>setSearchKey("music")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-music"></i> <span className='ps-2'>Music</span></div>
       <div onClick={()=>setSearchKey("dj")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-record-vinyl"></i> <span className='ps-2'>dj</span></div>
       <div onClick={()=>setSearchKey("dance")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-person-falling"></i> <span className='ps-2'>dance</span></div>
       <div onClick={()=>setSearchKey("magic")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-wand-magic-sparkles"></i> <span className='ps-2'>magic</span></div>
       <div onClick={()=>setSearchKey("debate")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-people-group"></i> <span className='ps-2'>debate</span></div>
       <div onClick={()=>setSearchKey("Exhibition")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-paintbrush"></i> <span className='ps-2'>Exhibition</span></div>
       <div onClick={()=>setSearchKey("circus")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-person-dots-from-line"></i> <span className='ps-2'>circus</span></div>
       <div onClick={()=>setSearchKey("fundraisers")} style={{width:"115px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-hands-bound"></i> <span className='ps-2'>fundraisers</span></div>
       <div onClick={()=>setSearchKey("theater")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-masks-theater"></i> <span className='ps-2'>theater</span></div>
       <div onClick={()=>setSearchKey("food")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-champagne-glasses"></i> <span className='ps-2'>food fest</span></div>
       <div onClick={()=>setSearchKey("fashion")} style={{width:"110px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-vest"></i> <span className='ps-2'>fashion</span></div>  
       <div onClick={()=>setSearchKey("standup comedy")} style={{width:"150px",borderRadius:"5px",color:"#8c8c8c"}} className='border d-flex justify-content-center align-items-center m-1'><i class="fa-solid fa-child-reaching"></i> <span className='ps-2'>standup comedy</span></div>
 
   </div>}<hr />
      <EventPost event={isSports?sportEvent:otherEvent}/>
    </Container>
    </div>
  )
}

export default EventsView