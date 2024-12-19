import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const OpaqueButton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full max-w-4xl mx-auto">
            <Link to={"/store"} className="col-span-1 sm:col-span-2">
                <button
                    className="h-32 w-full p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 flex flex-col justify-between hover:bg-opacity-20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
                >
                    <div className="text-left">
                        <h2 className="text-xl font-bold text-white">Store</h2>
                        <p className="text-sm font-thin text-white text-opacity-80">Encrypt and store documents on the blockchain for immutability and trust.</p>
                    </div>
                    <div className="border-t-2 w-full border-white border-opacity-40 flex justify-end items-center pt-2">
                        <span className="text-white font-bold text-md transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                            <FaArrowRight />
                        </span>
                    </div>
                </button>
            </Link>

            <Link to={"/verify"}>
                <button
                    className="h-32 w-full p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 flex flex-col justify-between hover:bg-opacity-20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
                >
                    <div className="text-left">
                        <h2 className="text-xl font-bold text-white">Verify</h2>
                        <p className="text-sm font-thin text-white text-opacity-80">Easily verify documents with the security of blockchain.</p>
                    </div>
                    <div className="border-t-2 w-full border-white border-opacity-40 flex justify-end items-center pt-2">
                        <span className="text-white font-bold text-md transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                            <FaArrowRight />
                        </span>
                    </div>
                </button>
            </Link>

            <Link to={"/view"}>
                <button
                    className="h-32 w-full p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 flex flex-col justify-between hover:bg-opacity-20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
                >
                    <div className="text-left">
                        <h2 className="text-xl font-bold text-white">View</h2>
                        <p className="text-sm font-thin text-white text-opacity-80">View your documents securely, backed by blockchain.</p>
                    </div>
                    <div className="border-t-2 w-full border-white border-opacity-40 flex justify-end items-center pt-2">
                        <span className="text-white font-bold text-md transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                            <FaArrowRight />
                        </span>
                    </div>
                </button>
            </Link>
        </div>
    );
};

export default OpaqueButton;
