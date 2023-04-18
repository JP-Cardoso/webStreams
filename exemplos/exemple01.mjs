// 1°) Ele replica no terminal
// process.stdin.pipe(process.stdout)
//     .on('data', msg => console.log('data terminal', msg.toString()))


// 2° )A request e reponse também é uma stream
// import http from 'http';
// import { readFileSync, createReadStream } from 'fs';
// //node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
// //Aqui vamos ecrever uma writable Stream (um arquivo com 1Gb )
// http.createServer((req, res) => {
//     // const file = readFileSync('big.file') //.toString();
//     // res.write(file); //-> O chunck do res.write é o file
//     // res.end();

//     createReadStream('big.file')
//         .pipe(res)

// }).listen(3000, () => console.log('Running at 3000'));

/*-------*/

// 3°) Trabalhando com socket do node
// import net from 'net';
// //node -e "process.stdin.pipe(require('net').connect(1338))"
// //Vou ligar o meu terminal no socket
// net.createServer(socket => socket.pipe(process.stdout)).listen(1338);