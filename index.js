const bedrock = require('bedrock-protocol')

const ip = 'SERVER IP'
const port = 19132

const client = bedrock.createClient({
    // SERVER CONNEXION
    host: ip,
    port: port,

    skipPing: true,
    offline: false,
    authTitle: false,
    connectTimeout: 2500,

    // ACCOUNT
    username: 'YOUR EMAIL',
    password: 'PASSWORD'
})

client.on('spawn', () => console.log('Client spawned'));

client.on('add_player', (packet) => {
    if(packet.username == "YOUR USERNAME"){
        console.log(packet.runtime_id);
    }
})

// MOVE
client.on('move_entity', (packet) => {
    if(packet.runtime_entity_id == 'ID RESPONSE SENT') {
        client.queue('move_player', {
            runtime_id: Number(client.entityId),
            position: {x: packet.position.x, y: packet.position.y, z: packet.position.z},
            pitch: packet.pitch,
            yaw: packet.yaw,
            head_yaw: packet.head_yaw,
            mode: 0,
            on_ground: true,
            ridden_runtime_id: 0,
            teleport: {cause: 0, source_entity_type: 0},
            tick: 0n
        })
    }
})

client.on('text', (packet) => {
    if(packet.message.includes('YOUR MESSAGE TO ACTIVATE')){
        setInterval(function () {
            client.queue('text', {
                type: "chat",
                needs_translation: false,
                source_name: client.username,
                xuid: "",
                platform_chat_id: '',
                message: 'YOUR MESSAGE'
            })
        }, 1)
    }
})