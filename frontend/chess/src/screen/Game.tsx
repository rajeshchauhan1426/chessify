import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSockets";
import { Chess, Square, PieceSymbol, Color } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState<({ square: Square; type: PieceSymbol; color: Color } | null)[][]>([]);

    useEffect(() => {
        setBoard(convertChessToBoard(chess));
    }, [chess]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());

                    console.log("Game initialized");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move Made");
                    break;
                case GAME_OVER:
                    console.log("Game over");
                    break;
            }
        };
    }, [socket, chess]);

    if (!socket) return <div>Connecting........</div>;

    return (
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 bg-red-200 w-full">
                        <ChessBoard board={board} />
                    </div>
                    <div className="col-span-2 bg-green-200 w-full">
                        <Button
                            onClick={() => {
                                socket.send(
                                    JSON.stringify({
                                        type: INIT_GAME,
                                    })
                                );
                            }}
                        >
                            Play
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const convertChessToBoard = (chess: Chess): ({ square: Square; type: PieceSymbol; color: Color } | null)[][] => {
    const board = [];
    for (let i = 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 8; j++) {
            const square = chess.board()[i][j];
            if (square) {
                row.push({
                    square: { row: 8 - i, col: String.fromCharCode(97 + j) } as Square,
                    type: square.type,
                    color: square.color,
                });
            } else {
                row.push(null);
            }  
        }
        board.push(row);
    }
    return board;
};
