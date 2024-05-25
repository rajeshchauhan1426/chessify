import { useNavigate } from "react-router-dom";
export const Landing = () => {
    const navigate = useNavigate();
    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex justify-center">
                    <img src="/chess.jpg"  className="max-w-96"/>
                </div>
                <div className="pt-16">
                    <h1 className="text-4xl text-white font-bold"> play chess on the world #1 best site!</h1>
                    <div className="mt-4 flex justify-center">
                        <button  onClick={() =>{
                            navigate("/game")
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded">play Online</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}