import metamask from "./metamask.svg"

function WalletConnector({ onOpenModal }) {
    return (
        <div
            className="z-0 absolute w-full"
            style={{
                top: '18rem', // Default for large screens
                left: '0px',
            }}
        >
            <button
                onClick={onOpenModal}
                className="bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 bg-zinc-500 flex px-4 py-2.5 font-semibold rounded-lg items-center hover:scale-105 duration-300 ease-in-out 
               w-full lg:w-[34rem] lg:ml-[5rem] lg:mt-16 mx-auto"
            >
                <img className="h-6 mr-3" src={metamask} alt="Metamask Logo" />
                Connect With Metamask
            </button>
        </div>

    )
}

export default WalletConnector
