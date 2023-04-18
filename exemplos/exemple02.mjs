/**
 * O pipe ele pode dixar vazr dados e erros;
 *  com isso você tem vazamneto de memória.
 * Porém é fgacil de resolver, o próprio node tem a solução.
 * Usamos nesse caso o pipeline do pacote stream
 */
import { pipeline, Readable, Writable, Transform } from 'stream';
import { promisify } from 'util';
import { createWriteStream } from 'fs';

const pipelineAsync = promisify(pipeline);

{
    const readableStream = Readable({
        read: function () {
            this.push('Hello Dude !!! 0')
            this.push('Hello Dude !!! 1')
            this.push('Hello Dude !!! 2')
            this.push(null)
        }
    })

    const writableStream = Writable({
        write(chunk, enconding, cb) {
            console.log('msg', chunk.toString())
            cb()
        }
    })

    await pipelineAsync(
        readableStream, //ele lê os dados do push
        // process.stdout
        writableStream
    )

    console.log('Processo 01 Acabou');
}

{

    const readableStream = Readable({
        read() {
            //gerando mais de 100000 itens
            for (let index = 0; index < 1e5; index++) {
                const person = { id: Date.now() + index, name: `João-${index}` };
                const data = JSON.stringify(person);
                this.push(data);
            }
            //Avisa que acabaram os dados
            this.push(null);
        }
    })

    const writableMapToCSV = Transform({
        transform(chunk, enconding, cb) {
            const data = JSON.parse(chunk);
            const result = `${data.id} - ${data.name.toUpperCase()}\n`
            cb(null, result);
        }
    })

    const setHeader = Transform({
        transform(chunk, enconding, cb) {
            this.counter = this.counter ?? 0
            if (this.counter) {
                return cb(null, chunk);
            }
            this.counter += 1
            cb(null, "id, name\n".concat(chunk))
        }
    })

    await pipelineAsync(
        readableStream, //ele lê o arquivo, api
        writableMapToCSV,//mapeando para outro arquivo
        setHeader,//setamos ele
        //process.stdout //imprime os dados
        createWriteStream('my.csv')//Ele vai criar o arquivo com os dados tratados
    )
}