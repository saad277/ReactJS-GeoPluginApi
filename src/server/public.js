


var app = require('express')();


var http = require('http').createServer(app);

var io = require('socket.io')(http);


const port = 6900;


app.get("/", (req, res) => {


    res.sendFile(__dirname + "/index.html")

})



//get all visitors

const getOnlineUsers = () => {
    let clients = io.sockets.clients().connected;

    let sockets = Object.values(clients);

    let users = sockets.map(s => s.user);
    console.log(users)
    return users.filter(x=>x!=undefined);

};


//emit visitors
const emitOnlineUsers = () => {


    io.emit("users", getOnlineUsers())
}






// event listener
io.on("connection", (socket) => {

    console.log("User Connected");

    //emit visitors
const emitOnlineUsers = () => {


    socket.broadcast.emit("users", getOnlineUsers())
}


    // when user joined
    socket.on("add_user", user => {


        socket.emit("server_message", {

            name: "Radix",
            message: "Welcome"

        })

        // send to connected sockets that a user has joined 
        socket.broadcast.emit("server_message", {

            name: "Radix",
            message: `${user.name} just joined`

        })


        socket.user = user;

    })


    //when users closes page/disconnects
    socket.on("disconnect", () => {

        const { user } = socket;
        console.log("User Disconnected");

        if (user) {




            // send to connected users that tht person has left
            socket.broadcast.emit("server_message", {

                name: "Radix",
                message: `${user.name} just left`

            })

        }

        emitOnlineUsers();

    })

})

http.listen(port, () => {

    console.log("Running on  :" + port)

})