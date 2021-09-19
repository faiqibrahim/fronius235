import {io} from "socket.io-client";
import {useDispatch} from "react-redux";
import {updateStats} from "../slices/stats-slice";

const SocketIOProvided = ({children}) => {
    const socket = io();
    const dispatch = useDispatch();

    socket.on("connect", () => {
        console.log('Socket connected', socket.id);
    });

    socket.on('CURRENT_OUTPUT', (output) => {
        dispatch(updateStats(output));
    })

    socket.on("disconnect", () => {
        console.log('Socket disconnected');
    });

    return children;
}

export default SocketIOProvided;
