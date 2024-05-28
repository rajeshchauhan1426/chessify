import { Color, PieceSymbol, Square } from "chess.js";

type BoardSquare = {
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null;

export const ChessBoard = ({ board }: { board: BoardSquare[][] }) => {
    const renderSquare = (square: BoardSquare, i: number, j: number) => {
        const isLightSquare = (i + j) % 2 === 0;
        const backgroundColor = isLightSquare ? 'bg-green-300' : 'bg-green-500';

        return (
            <div key={j} className={`w-8 h-8 flex justify-center items-center ${backgroundColor}`}>
                {square ? getPieceSymbol(square.type, square.color) : ""}
            </div>
        );
    };

    const getPieceSymbol = (type: PieceSymbol, color: Color) => {
        const pieceIcons = {
            p: '♟', r: '♜', n: '♞', b: '♝', q: '♛', k: '♚',
            P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔'
        };
        const pieceSymbol = color === 'w' ? type.toUpperCase() : type.toLowerCase();
        return pieceIcons[pieceSymbol];
    };

    return (
        <div className="text-white-200">
            {board.map((row, i) => (
                <div key={i} className="flex">
                    {row.map((square, j) => renderSquare(square, i, j))}
                </div>
            ))}
        </div>
    );
}
