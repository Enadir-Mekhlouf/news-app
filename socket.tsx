import {io} from 'socket.io-client';

const URL = 'http://10.0.2.2:5000';

export const socket = io(URL);
