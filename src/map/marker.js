
import React from 'react'
import 'leaflet/dist/leaflet.css';
import {  Marker, Popup } from 'react-leaflet'


// export default class Markerdisplay extends Component{
//     constructor(props){
//         super(props)
//         this.state={
//             position:props.position,
//             name:props.name
//         }

//     }

 

export default function Markerdisplay (props){ 
  const   safe= {
         color:'#47d69a'
     }
   const    unsafe= {
        color:'#e35146'
    }
    return (<Marker 
        onMouseOver={e => {
          e.target.openPopup();
        }}
        onMouseOut={e => {
          e.target.closePopup();
        }} position={props.position} >
        <Popup className="safe">  
       <div style={{ overflow:'auto' }}> 
       <h3 style={(props.safe)?safe:unsafe}>{(props.safe)?"Marked safe 💯 ":"Marked unsafe ⚠️"}</h3> <hr/>

          <h4><b><span style={{color:'#4287f5'}}>Name:{"    "}</span></b>{props.name}</h4>
         <h4><b><span style={{color:'#4287f5'}}>Message:{"  "}</span></b>{props.message}</h4>
            
       </div>
        </Popup>
        </Marker>)
}
