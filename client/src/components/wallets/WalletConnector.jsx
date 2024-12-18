import metamask from "./metamask.svg"

function WalletConnector({ onOpenModal }) {
    return (
        <div
            className="z-0 absolute top-[22rem] ml-20 w-[40%] hover:scale-105 duration-300 ease-in-out"
        >
            <button
                onClick={onOpenModal}
                className="bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 w-full bg-zinc-500 flex px-4 py-2.5 font-semibold rounded-lg items-center"
            >
                <img className="h-6 mr-3" src={metamask} alt="" />
                Connect With Metamask
            </button>
        </div>
    )
}

export default WalletConnector
