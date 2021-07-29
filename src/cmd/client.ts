const io = require('socket.io-client');

const socket = io('http://:6000');

socket.io.on('error', (error: any) => {
    console.log('error ', error);
});

socket.on('connect', () => {
    console.log(socket.id);

    setTimeout(() => {
        socket.emit(
            'join-room',
            {
                token: {
                    accessToken: '95d00d79-b5ad-42a1-9c45-904556238bad',
                    refreshToken: 'ef333937-0a72-4809-a9fa-a5716fec557a',
                },
                data: null,
            },
            (data: any) => {
                console.log('client data: ', data);
            },
        );
    }, 2000);
});

socket.on('error', (error: Error) => {
    console.log('error ', error);
});

socket.on('my error', (error: any) => {
    console.log('my error ', error);
});

socket.on('ok', (data: any) => {
    console.log('ok ', data);
});
