import { Server } from "./server";
import * as socket from 'socket.io';
import * as fs from 'fs';


let server = new Server().app;

let port = process.env.PORT || 5000;


let http = require("http").Server(server);
let io = require("socket.io")(http);
 

io.on('connection',(socket)=>{
	console.log("socket is connected");

	socket.on('joinroom',(data)=>{
		socket.join(data.room)
		console.log(data.room,'joined room')
	})

	socket.on('chat',(data)=>{
		console.log(data.name,'data');
		socket.emit('hand',{id:socket.id})
	})

	socket.on('sendmessage',(data)=>{
		if(data.file){
			const matches = data.file.fileData.match(
          /^data:([A-Za-z-+\/\.]+);base64,(.+)$/
           );
			try{
				fs.writeFile(`./src/uploads/${data.file.name}`,Buffer.from(matches[2],'base64'),'binary',(err)=>{
					if(err){
						console.log(err)
					}
				});
			}catch(err){
				console.log(err)
			}
		}
		socket.to(data.room).emit('getmessage',{message:data.message, ...( data.file ? {file:`https://erprakash.tech/src/uploads/${data.file.name}`}: {})})
		socket.to(data.room).emit('noty', {notification: 'New Message'})
		console.log(data.message,'Message')
	})
})
 
const mainServer = http.listen(port,()=>{
	console.log('server is running at port 5000');
});
