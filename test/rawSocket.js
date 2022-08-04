var raw = require("raw-socket");
var ip = require('ip');
var util = require('util');


function send(src_ip, src_port, dst_ip, dst_port) {
    var socket = raw.createSocket({
        protocol: raw.Protocol.TCP, // See http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml
        addressFamily: raw.AddressFamily.IPv4
    });

    var ipBuffer = new Buffer.from([
        0x45,                   // IP: Version (0x45 is IPv4)
        0x00,                   // IP: Differentiated Services Field
        0x00,0x3c,              // IP: Total Length
        0x00,0x00,              // IP: Identification
        0x40,                   // IP: Flags (0x20 Don't Fragment)
        0x00,                   // IP: Fragment Offset
        0x40,                   // IP: TTL (0x40 is 64)
        0x06,                   // IP: protocol (ICMP=1, IGMP=2, TCP=6, UDP=17, static value)
        0x00,0x00,              // IP: checksum for IP part of this packet
        0x00,0x00,0x00,0x00,    // IP: ip src
        0x00,0x00,0x00,0x00,    // IP: ip dst
    ]);

    ipBuffer.writeUInt16BE(parseInt(Math.random()*0xffff), 4); // IP: set identification
    ip.toBuffer(src_ip, ipBuffer, 12); // IP: save ip src (src_ip var) into the buffer
    ip.toBuffer(dst_ip, ipBuffer, 16); // IP: save ip dst (dst_ip var) into the buffer

    raw.writeChecksum(ipBuffer, 10, raw.createChecksum(ipBuffer));

    var tcpBuffer = new Buffer.from([
        0x00,0x00,              // TCP: src port (should be random)
        0x00,0x00,              // TCP: dst port (should be the port you want to scan)
        0x00,0x00,0x00,0x00,    // TCP: sequence number (should be random)
        0x00,0x00,0x00,0x00,    // TCP: acquitment number (must be null because WE are intiating the SYN, static value)
        0x00,0x02,              // TCP: header length (data offset) && flags (fin=1,syn=2,rst=4,psh=8,ack=16,urg=32, static value)
        0x72,0x10,              // TCP: window
        0x00,0x00,              // TCP: checksum for TCP part of this packet)
        0x00,0x00,              // TCP: ptr urgent
        0x02,0x04,              // TCP: options
        0x05,0xb4,              // TCP: padding (mss=1460, static value)
        0x04,0x02,              // TCP: SACK Permitted (4) Option
        0x08,0x0a,              // TCP: TSval, Length
        0x01,0x75,0xdd,0xe8,// value
        0x00,0x00,0x00,0x00,// TSecr
        0x01,                   // TCP: NOP
        0x03,0x03,0x07          // TCP: Window scale
    ]);

    tcpBuffer.writeUInt32BE(parseInt(Math.random()*0xffffffff), 4); // TCP: create random sequence number
    tcpBuffer.writeUInt8(tcpBuffer.length << 2, 12); // TCP: write Header Length
    tcpBuffer.writeUInt16BE(src_port, 0); // TCP: save src port (src_port var) into the buffer
    tcpBuffer.writeUInt16BE(dst_port, 2); // TCP: save dst port (port var) into the buffer

    var pseudoBuffer = new Buffer.from([
        0x00,0x00,0x00,0x00,    // IP: ip src
        0x00,0x00,0x00,0x00,    // IP: ip dst
        0x00,
        0x06, // IP: protocol (ICMP=1, IGMP=2, TCP=6, UDP=17, static value)
        (tcpBuffer.length >> 8) & 0xff, tcpBuffer.length & 0xff
    ]);
    ip.toBuffer(src_ip, pseudoBuffer, 0); // IP: save ip src (src_ip var) into the buffer
    ip.toBuffer(dst_ip, pseudoBuffer, 4); // IP: save ip dst (dst_ip var) into the buffer
    pseudoBuffer = Buffer.concat([pseudoBuffer, tcpBuffer]);

    raw.writeChecksum(tcpBuffer, 16, raw.createChecksum(pseudoBuffer));


    socket.on("message", function(buffer, source) {
        var port = buffer[0x14] * 0x100 + buffer[0x15];
        if (source == dst_ip && port == dst_port) {
            process.stdout.write('\nReceived answer from '+ source +':'+ port +'\n');
        } else {
            process.stdout.write('.');
        }
    });

    function beforeSend() {
        socket.setOption(
            raw.SocketLevel.IPPROTO_IP,
            raw.SocketOption.IP_HDRINCL,
            new Buffer.from ([0x00, 0x00, 0x00, 0x01]),
            4
        );
    }

    function afterSend(error, bytes) {
        if (error) {
            console.log("%s Error occured\n%s", new Date(), error.toString());//, util.inspect(error, {showHidden: true, depth: null}));
        } else {
            console.log("%s Sent %s bytes for %s:%s", new Date(), bytes, dst_ip, dst_port);
        }
    }

    var buffer = Buffer.concat([ipBuffer, tcpBuffer]);
    socket.send(buffer, 0, buffer.length, dst_ip, beforeSend, afterSend);
    //socket.send(tcpBuffer, 0, tcpBuffer.length, dst_ip, beforeSend, afterSend);
}

send('127.0.0.1', 8081, '127.0.0.1', 8080);
