


var app = require('express')();


var http = require('http').createServer(app);

var io = require('socket.io')(http);


const port = 6800;


app.get("/", (req, res) => {


    res.sendFile(__dirname + "/index.html")

})



//creating a room for users to join

io.on("connection", (socket) => {

    console.log("user connected");


    //when user joins room
    socket.on("join_room",room=>{

        socket.join(room)


    })

    //sending message to room 
    socket.on("message",data=>{

        const {room,message}=data;

        //sending message to specified room
        socket.to(room).emit("message",{

            message,
            name:"Friend"

        })

    })


        //listening for message typing event 
    socket.on("typing",data=>{

            const {room}=data;
            socket.to(room).emit("typing","Someone is typing...")

    })


        //when user stops typing 
    socket.on("stopped_typing",data=>{

        const {room}=data;

        socket.to(room).emit("stopped typing...")

    })



})




http.listen(port, () => {

    console.log("Running on  :" + port)

})