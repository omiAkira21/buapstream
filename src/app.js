const Peer = require('peerjs'),
    $ = require('jquery'),
    uid = require('uid'), //genera ids de cualquier tamaño aleatoriamente
    //Importando mis modulos js
    openStream = require('./openStream'),
    playVideo = require('./playVideo'),
    getIceObject = require('./getIceObject')

getIceObject( iceConfig => {
    console.log(iceConfig)
    //aqui se establece la configuración del servidor peer js
    const connectionObj = {
        host: 'buapstream.herokuapp.com',
        port: 443,
        secure: true,
        key: 'peerjs',
        config: iceConfig
    }

    const peer = Peer(getPeer(), connectionObj)

    //al momento de presionar el botón de llamar
    $('#btnCall').click(() => {
        const friendId = $('#txtFriendId').val() //id de amigo con el que se desea conectar
        openStream((stream) => {
            playVideo(stream, 'localStream')

            const call = peer.call(friendId, stream) //se pasa id del destino y el stream local
            call.on('stream', (remoteStream) => { //se obtiene el stream del amigo y se muestra
                playVideo(remoteStream, 'friendStream')
            })
            console.log(call)
        })
    })//fin click de botón

    peer.on('call', (call) => {
        openStream((stream) => {
            playVideo(stream, 'localStream')
            call.answer(stream)
            call.on('stream', (remoteStream) => {
                playVideo(remoteStream, 'friendStream')
            })
        })
    })

})

function getPeer() {//genera un id aleatorio y lo devuelve
    const id = uid(10)
    $('#peer-id').append(id)
    return id
}

/* se le da a conocer al servidor el peer que se me asigno
- con esta variable se realiza el envio de stream local y la recepción 
del stream amigo
*/


