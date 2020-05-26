import React, { Component } from 'react'
import Leaflet from 'leaflet';
import { Map, TileLayer } from 'react-leaflet'
import Markerdisplay from './marker';
import 'leaflet/dist/leaflet.css';
import { alert, force, input, select } from 'notie'
import axios from 'axios';
import config from '../config';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



Leaflet.Icon.Default.imagePath =
    '../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



class Mapdisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 28.257017,
            lng: 77.077524,
            zoom: 4,
            name: '',
            users: props.users
        }
    }


    getLocation(name, message,safe) {

        var options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition((pos) => {
            this.setState({ lat: pos.coords.latitude, lng: pos.coords.longitude, name: name, message: message ,safe:safe});
            this.addUser();


        }, (err) => JSON.stringify(err), options);
    }
    addUser() {

        let user = {
            name: this.state.name,
            message: this.state.message,
            safe: this.state.safe,
            location: {
                lat: this.state.lat, lng: this.state.lng
            }

        }
      
        return axios({
            method: 'post',
            url: config.endPoint.addUser,
            data: user
        });
        //    var res = await axios.post(, user);

    }
    componentDidMount() {
     this.UserInput();

    }

    loadUsers(users) {
        if (users.length > 0) {
            var marker = users.map(e => {
                return <Markerdisplay key={e.name + e.location.location + e.location.message} position={[e.location.latitude,e.location.location]} name={e.name} message={e.message} safe={e.safe} />
            })

            return marker;

        }
        return;


    }

    UserInput(){
        setTimeout(() => {
            force({
                type: 'success',
                text: `<b>Hope, You are safe ! 😀 <b>`,
                position: 'bottom',

                callback: () => {
                    force({
                        type: 3,  position: 'bottom',text: '<b>Please, Help us to mark  📍 you as SAFE.🙌<b><br>That`s a bold move...',
                        callback: () => {
                            select({
                                text: 'Let us know 😄 where are you ?',

                                choices: [
                                    {
                                        type: 1,
                                        text: 'Safe at Your Home 🏠',
                                        handler: () => {
                                            force({
                                                type: 'success', text: 'Great ! Be safe. 🙌', callback: () => {
                                                    input({
                                                        text: "Your Name 🙆 🙇", submitCallback: (value) => {

                                                            //  this.setState({name:value})
                                                            input({
                                                                text: "Your 💬 Message to World 🌏", type: 2, submitCallback: (message) => {
                                                                    //  this.setState({message:message})
                                                                    force({
                                                                        text: `Now please share your location with us , <B> ${value}<b>`, callback: () => {

                                                                            this.getLocation(value, message,true);
                                                                            alert({text:"Great, thanks for Helping us. 😄"})
                                                                

                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    },
                                    {
                                        type: 3,
                                        text: 'Stucked Somewhere 🌏 ',
                                        handler:  ()=> {
                                            force({
                                                type: 3, text: 'No Worries 🙅 🙇 !', callback: () => {
                                                    input({
                                                        text: "Your Name", submitCallback: (value) => {

                                                            //  this.setState({name:value})
                                                            input({
                                                                text: "Your Message 💬 to World 🌏", type: 2, submitCallback: (message) => {
                                                                    //  this.setState({message:message})
                                                                    force({
                                                                        text: `Now please share your location 📍 with us, <b>${value}</b>`, callback: () => {

                                                                            this.getLocation(value, message,false);
                                                                            alert({text:"Great, thanks for Helping us. 😄"})
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }

                                                    })
                                                }
                                            })
                                        }
                                    }]


                            })
                        }

                    })
                }
            });
        }, 2000);
    }


    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom} style={{ height: '450px' }}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.name !== '' ? <Markerdisplay position={[this.state.lat, this.state.lng]} name={this.state.name} safe={this.state.safe}/> : ''}
                {this.loadUsers(this.state.users)}
            </Map>
        )
    }
}
export default Mapdisplay;