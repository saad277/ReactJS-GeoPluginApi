import React, { Component } from 'react';

import { Table } from 'reactstrap'

import axios from "axios"

import openSocket from 'socket.io-client'


// connect to server 
const socket=openSocket("http://localhost:6600/")


//get user data

// emit user to server 



// update table

class LiveVisitors extends Component {


    state = {

        visitors:[]
    }


     componentDidMount() {

       // api for getting user data
        axios.get("http://geoplugin.net/json.gp").then(res => {

        console.log(res.data)

                const {
                        geoplugin_request,
                        geoplugin_countryCode,
                        geoplugin_city,
                        geoplugin_region,
                        geoplugin_countryName,
                        
                }=res.data;


                const visitor={

                    ip:geoplugin_request,
                    countryCode:geoplugin_countryCode,
                    city: geoplugin_city,
                    country:geoplugin_countryName,
                    state:geoplugin_region,

                };

                console.log(this.state.visitors)


           


                // emit user to server 
                socket.emit("new_visitor",visitor)

                
                socket.on("visitors",(x)=>{
                    console.log(x)
                    this.setState({

                        visitors:x
                    })
                   


               

                })
               

                
                   
                   
         
               


            
             
              


        })


    }


countryFlag=(countryCode)=> `https://www.countryflags.io/${countryCode}/flat/64.png`

    renderTableBody = () => {


      const {visitors}=this.state

        return visitors.map((x,id) => {

            console.log(x)

            return (

                <tr key={id}>
                    <td>  {id}            </td>
                    <td>  {x.ip}  </td>
                    <td>  {x.country}  </td>
                    <td>  {x.city}  </td>
                    <td>  {x.state}  </td>
                 <td>   <img src={this.countryFlag(x.countryCode)}></img>    </td>
                    

                </tr>
            )

        })

    

    }





    render() {









        return (

            <div>

                <h2>     Live Visitors   </h2>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ip</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>State</th>
                           
                            <th>Flag</th>
                        </tr>
                    </thead>
                    <tbody>


                        {this.renderTableBody()}

                    </tbody>
                </Table>
            </div>

        )

    }


}

export default LiveVisitors;