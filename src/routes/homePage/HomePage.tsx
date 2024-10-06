import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './homePage.css';
import { TypeAnimation } from 'react-type-animation';

const HomePage: React.FC = () => {
  const [typingStatus, setTypingStatus] = useState<string>('human1');

  return (
    <div className="flex items-center lg:flex-row flex-col gap-5 lg:gap-24 h-full relative">
      <img
        loading="lazy"
        src="/orbital.png"
        alt="Orbital Background"
        className="absolute bottom-0 left-0 opacity-5 animate-[rotateOrbital_100s_linear_infinite] z-[-1]"
      />
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center max-w-[80%]">
        <h1 className="text-6xl bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent md:text-[64px] font-semibold">
          CHAT AI
        </h1>
        <h2 className="text-xl font-semibold">Supercharge your creativity and productivity</h2>
        <h3 className="font-light md:max-w-[70%] max-w-full px-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat sint dolorem doloribus, architecto dolor.
        </h3>
        <Link
          to="/dashboard"
          className="px-6 py-4 bg-[#217bfe] text-white rounded-2xl text-sm mt-5 transition-transform duration-300 ease-in-out hover:bg-white hover:text-[#217bfe] hover:scale-110"
        >
          Get Started
        </Link>
      </div>
      <div className="flex-1 flex items-start lg:items-center justify-center h-full">
        <div className="relative flex items-center justify-center bg-[#140e2d] rounded-3xl w-fit lg:w-4/5 h-1/2">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
            <div className="bg-[url('/bg.png')] opacity-20 w-[200%] h-full bg-auto animate-[slideBg_8s_ease-in-out_infinite_alternate]"></div>
          </div>
          <img
            loading="lazy"
            src="/bot.png"
            alt="Bot"
            className="w-[90%] h-[90%] object-contain animate-[botAnimate_3s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute text-nowrap bottom-[-30px] right-[-70px] w-fit flex items-center gap-2 md:p-5 p-2 pr-10 bg-[#1e1e1e] rounded-lg md:flex md:right-0">
            <img
              loading="lazy"
              src={
                typingStatus === 'human1'
                  ? '/human1.jpeg'
                  : typingStatus === 'human2'
                  ? '/human2.jpeg'
                  : '/bot.png'
              }
              alt=""
              className="w-8 h-8 aspect-square rounded-full object-cover"
            />
            <TypeAnimation
              sequence={[
                'Human:We produce food for Mice',
                2000,
                () => setTypingStatus('bot'),
                'Bot:We produce food for Hamsters',
                2000,
                () => setTypingStatus('human2'),
                'Human2:We produce food for Guinea Pigs',
                2000,
                () => setTypingStatus('bot'),
                'Bot:We produce food for Chinchillas',
                2000,
                () => setTypingStatus('human1'),
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-row md:flex-col items-center gap-5">
        <img loading="lazy" src="/logo.png" alt="Logo" className="w-4 h-4" />
        <div className="flex text-nowrap flex-nowrap gap-2 text-xs text-[#888]">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
