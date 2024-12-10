import React from 'react';
import { motion } from 'framer-motion';

import img1 from "../images/01.svg";
import img2 from "../images/02.svg";
import img3 from "../images/03.svg";
import img4 from "../images/04.svg";
import img5 from "../images/05.svg";
import img6 from "../images/06.svg";
import img7 from "../images/07.svg";
import img8 from "../images/08.svg";
import img9 from "../images/10.svg";
import img10 from "../images/11.svg";
import img11 from "../images/12.svg";
import img12 from "../images/13.svg";
import img13 from "../images/14.svg";
import img14 from "../images/15.svg";
import img15 from "../images/16.svg";
import img16 from "../images/17.svg";

const Flow = () => {
  const upperMarquee = [
    img1, img2, img3, img4, img5, img6, img7, img8,
  ];

  const lowerMarquee = [
    img9, img10, img11, img12, img13, img14, img15, img16,
  ];

  return (
    <div className="container mx-auto">
      <div className="flex overflow-hidden MyGradient">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {upperMarquee.map((item, index) => (
            <img className="w-32 h-8 pr-8" src={item} key={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {upperMarquee.map((item, index) => (
            <img className="w-32 h-8 pr-8" src={item} key={index} />
          ))}
        </motion.div>
      </div>
      <div className="flex overflow-hidden mt-14 MyGradient">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {lowerMarquee.map((item, index) => (
            <img className="w-32 h-8 pr-8" src={item} key={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {upperMarquee.map((item, index) => (
            <img className="w-32 h-8 pr-8" src={item} key={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Flow;
