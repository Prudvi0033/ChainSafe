import React from 'react';
import { FaEthereum } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import OpaqueButton from '../pages/OpaqueButton';
import Flow from '../pages/Flow';
import useUserStore from './store/useUserStore';
import useAddressStore from './store/useAddressStore';


const Welcome = () => {
  const { userid } = useUserStore();

  const { walletAddress } = useAddressStore();

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between mb-28 md:p-20 p-12 px-4">
        {/* Left Section */}
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Securing the Future, One Block at a Time.
          </h1>
          <p className="text-left mt-5 text-gray-400 font-thin mb-4 md:w-9/12 w-11/12 text-base">
            Your assets, encrypted and safeguarded, with the power of decentralized security.
          </p>

          <div className="hidden lg:block w-full container mx-auto mt-20 px-4 sm:px-6 lg:px-8">
            <Flow />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorpism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div
                  className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"
                  aria-label="Ethereum Icon"
                >
                  <FaEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={20} color="#fff" aria-label="Info Icon" />
              </div>
              <div>
                <p className="text-white font-extrabold font-mono text-sm text-[11px]">
                  {walletAddress}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  {userid || "UserId"}
                </p>
              </div>
            </div>
          </div>

          <OpaqueButton />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
