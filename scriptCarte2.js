var net = require('net');
var clients = [];
var HOST = '127.0.0.1';
var PORT = 8080;

async function sendMessage(type, msg, cr, inc, sock) {
    let contenu = new Buffer.from(msg)
    let head = Buffer.alloc(12+contenu.length+2);                          // buffer header message
    head.writeUInt16BE(0xA55A,0)                                    // flag
    head.writeUInt16BE(inc, 2)                                            //request id incrément pas incrémenté
    head.writeUInt16BE(type, 4)                                           //ID / type de message
    head.writeUInt16BE(contenu.length+1, 6)                         //longueur du contenu message 16bits
    head.writeUInt16BE(cr,8)                                              // compte rendu
    head.writeUInt16BE(crc16(head, 2, 10), 10)                  //checksum header 16 bits
    if (contenu.length > 0 ) {
        head.fill(contenu, 12, 12 + contenu.length)
        head.writeUInt16LE(crc16(head, 12, 12 + contenu.length-1 ), head.length - 3)
        //console.log(head)
        //server.write("")
        sock.pipe(head)
    } else {
        //server.write("")
        sock.pipe(head)
    }
}

function crc16(buffer, start, end) {
    var crc = 0xFFFF;
    var odd;
    if (buffer.length <= end)
        return 0;
    for (var i = start; i < end; i++) {
        crc = crc ^ buffer.readUInt8(i);
        for (var j = 0; j < 8; j++) {
            odd = crc & 0x0001;
            crc = crc >> 1;
            if (odd) {
                crc = crc ^ 0xA001;
            }
        }
    }
    return crc;
};

net.createServer(function(sock) {
    var releves = new Buffer.from([
        0x00,0x00,0x00,0x01,                     //température auxilliaire 4 octets 32
        0x00,0x00,0x00,0x01,                     //température puissance

        0x00,0x00,0x00,0x01,                     //frequence génératrice (Hz) (sert pour la vitesse)
        0x00,0x00,0x00,0x01,                     //courant génératrice (A)
        0x00,0x00,0x00,0x01,                     //tension génératrice (V)

        0x00,0x00,0x00,0x01,                     //frequence secteur (H)
        0x00,0x00,0x00,0x01,                     //courant secteur (A)
        0x00,0x00,0x00,0x01,                     //tension secteur (V)

        0x00,0x00,0x00,0x01,                     // entrée analog auxilliaire
        0x00,0x00,0x00,0x01,                    //dernière consigne d'injection

        0x03,                          //entrée tor 1
        0x00,                          //entrée tor 2
        0x01,                          //entrée tor 3
        0x00,                          //entrée tor 4
        0x00,                          //force charge
        0x00,                          //alarme de surtention
        0x00,                          //état de l'amplification
        0x00,                          //état usb 1
        0x00,                          //erreur usb
        0x00,                          //couleur led 1
        0x00,                          //couleur led 2
        0x07,                          //couleur led 3
        0x00,                          //état buzzer
        0x00,                          //erreur à définir
        0x00,                          //spare 1
        0x00])                        //spare2

    releves.writeFloatBE(60, 0) //température auxilliaire 4 octets 32
    releves.writeFloatBE(0, 4)

    releves.writeFloatBE(150, 8)
    releves.writeFloatBE(0, 12)
    releves.writeFloatBE(0, 16)

    releves.writeFloatBE(0, 20)
    releves.writeFloatBE(0, 24)
    releves.writeFloatBE(0, 28)

    releves.writeFloatBE(0, 32)
    releves.writeFloatBE(1, 36)

    console.log('Connection établie avec le mobile @' + HOST +':'+ PORT);
    var routine = setInterval(() => { sendMessage(1, releves,0, 1 , sock) }, 1000)
    sock.on( "data", (data) =>{
        console.log(data.readUInt16BE(8))
        
        if (data.readUInt16BE(8) === 1) {
            var sens = false
            if (releves.readFloatBE(12) <= 20) {
                sens = true
            } if (releves.readFloatBE(12) >= 70) {
                sens = false
            }
            sens ? releves.writeFloatBE(releves.readFloatBE(12) + 25, 8) : releves.writeFloatBE(releves.readFloatBE() - 25, 8)
    releves.writeFloatBE(20, 0) 
    releves.writeFloatBE(20, 4)

    releves.writeFloatBE(20, 8)
    releves.writeFloatBE(10, 16)

    releves.writeFloatBE(10, 20)
    releves.writeFloatBE(10, 24)
    releves.writeFloatBE(10, 28)

    releves.writeFloatBE(0, 32)
    releves.writeFloatBE(data.readFloatBE(46),46)
    if (data.readFloatBE(46) !== 0)console.log(`alarme surtention : ${data.readFloatBE(46)}`)
    releves.writeFloatBE(data.readFloatBE(47),47)
    if (data.readFloatBE(47) !== 0)console.log(`état amp : ${data.readFloatBE(47)}`)
    releves.writeFloatBE(data.readFloatBE(48),48)
    if (data.readFloatBE(48) !== 0 )console.log(`état buzzer: ${data.readFloatBE(48)}`)
    if (data.readFloatBE(49) !== 0)console.log(`couleur led 1 : ${data.readFloatBE(49)}`)
    releves.writeFloatBE(data.readFloatBE(50))
    if (data.readFloatBE(50) !== 0)console.log(`couleur led 2 : ${data.readFloatBE(50)}`)
    releves.writeFloatBE(data.readFloatBE(51),50)
    if (data.readFloatBE(51),51)console.log(`couleur led 3 : ${data.readFloatBE(51)}`)
    releves.writeFloatBE(data.readFloatBE(52),48)
    if (data.readFloatBE(52),52) console.log(`état buzzer: ${data.readFloatBE(52)}`)
    } else {
            clearInterval(routine)    
            sock.pipe(sock)
    }
    })


}).listen(PORT, HOST);

