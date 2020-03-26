


var app = require('express')();


var http = require('http').createServer(app);

var io = require('socket.io')(http);


const port = 6600;


app.get("/", (req, res) => {


    res.sendFile(__dirname + "/index.html")

})


//get all visitors

const getVisitors = () => {
    let clients = io.sockets.clients().connected;
   
    let sockets = Object.values(clients);
  
    let users = sockets.map(s => s.user);
    console.log(users)
    return users;
   
  };


//emit visitors
const emitVisitors=()=>{


    io.emit("visitors",getVisitors())
}



// event listener
io.on("connection", (socket) => {

    console.log("User Connected");


    socket.on("new_visitor", user=> {

        console.log(user);
        socket.user = user;
       
        //emit visitors
        emitVisitors();

    })


    //when users closes page/disconnects
    socket.on("disconnect", () => {

        console.log("User Disconnected");

    })

})

http.listen(port, () => {

    console.log("Running on  :" + port)

})