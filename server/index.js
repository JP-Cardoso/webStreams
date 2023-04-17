import { createServer } from 'node:http';
import { createReadStream } from 'node:fs' //Para ler os arquivos
import { Readable } from 'node:stream';
import { WritableStream } from 'node:stream/web';

const PORT = 3000;
//curl -i -X OPTIONS -N localhost:3000 -> esse comando mostra os headers da chamada
createServer(async (request, response) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
    }
    if (request.method === 'OPTIONS') {
        response.writeHead(204, headers);
        response.end();
        return;
    }
    let items = 0
    //arquivo que vai ser lido
    Readable.toWeb(createReadStream('./animeflv.csv'))
        .pipeTo(new WritableStream({
            write(chunk) {
                items++;
                response.write(chunk)
            },
            close() {
                response.end();
            }
        }))

    response.writeHead(200, headers);
    // response.end('\n Ok');
})
    .listen(PORT)
    .on('listening', _ => console.log(`Server is running at ${PORT}`));