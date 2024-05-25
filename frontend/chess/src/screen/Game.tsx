import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSockets"
import { Chess } from "chess.js";


export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";



export const Game = () => {
    const socket = useSocket();
    const [board,setBoard] = useState(new Chess());
    
    useEffect(() => {
        if(!socket){
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    setBoard(new Chess())
                    console.log("Game intilized");
                    break;
                case MOVE:
                    const move = message.pay
                    board.move(move)
                    console.log("Move Made");
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    break;    
    
            }
        }
    },[socket])

    if(!socket) return <div>Connecting........</div>
   



    return <div className="justify-center flex">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className=" grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4 bg-red-200 w-full">
                    <ChessBoard/>

                </div>
                <div className="cols-span-2 bg-green-200 w-full">
                    <Button onClick={() => {
                       socket.send(JSON.stringify({
                        type:INIT_GAME
                       }))
                    }}>
                        Play</Button>
                </div>
                </div>
                 </div>
       
    </div>
}