import React, { Component } from 'react';
import './font/Sen-Bold.ttf'
import MapDisplay from "./map/map"
import  Lottie  from "react-lottie";
import 'notie/dist/notie.css';
import virus from './resources/virus.png';
import axios from 'axios';
import config from './config';
import l1 from './resources/loader/loader1.json';
import l2 from './resources/loader/loader2.json';
import l3 from './resources/loader/loader3.json';
import l4 from './resources/loader/loader4.json';
import l5 from './resources/loader/loader5.json';
import l6 from './resources/loader/loader6.json';


import './App.css';
  

class App extends Component {
  state = {
    loading: true,

  };
  
  componentDidMount(){
    this.loader().then(() => this.setState({ loading: false }));
     this.getUser();
  }
async  getUser() {
  try {
 let users= await axios.get(config.endPoint.getUser);

 this.setState({users:users.data}) ;
  } catch (error) {
    console.log(error); 
  }

  

 }
  loader(){
   
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{resolve()},4000)

    })
  }

   
  render() {
   // this.getUser();
   var data =[l1,l2,l3,l4,l5,l6];
   if(this.state.loading){
    const defaultOptions = {
      loop: true,
      autoplay: true, 
     animationData: data[Math.abs(Math.ceil(Math.random()*(7-1)-1))],
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    
     return (<div> <Lottie options={defaultOptions} height={300} width={300}/></div>)
   } else{
    return (
  
      <div className="App">
        <div className="App-header">
    <div style={{"display":"flex"}}></div>
       <img id='virus' alt="" src={virus}/>  <h1 >Mark Safe - Covid-19  </h1>
         
          </div>
          <MapDisplay users={this.state.users}></MapDisplay>
      </div>
    );
   }


  }
}

export default App;
