'use client';
import { useTranslation } from "react-i18next";
import AnimatedTyping from "./AnimatedTyping";

export default function ModernDeviceWarning({ closeMDWarning, handleAcceptMDWarning }) {
  const { t } = useTranslation(['strings']);

  return (
    <div className={`fixed top-0 left-0 w-full h-dvh bg-black z-[9999] transition-opacity duration-700 ${closeMDWarning ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute top-14 left-1/2 mt-20 text-start -translate-x-1/2 text-white">
        <div className="w-80 min-[600px]:w-96 md:w-[600px]">
          <AnimatedTyping
            cursorStyle={`inline-block w-[4px] h-[1.5rem] sm:w-[5px] min-[600px]:h-[2rem] sm:h-[2.5rem] md:w-[6px] md:h-[3rem] bg-white 
                        ml-[2px] sm:ml-[3px] animate-blink align-middle mb-2 sm:mb-3 mr-1`}
            textStyle={`py-2 sm:py-3 text-lg min-[600px]:text-xl md:text-4xl font-main`}
            strings={[
              t('MODERN_DEVICE_WARNING.S1'),
              t('MODERN_DEVICE_WARNING.S2'),
              t('MODERN_DEVICE_WARNING.S3'),
              t('MODERN_DEVICE_WARNING.S4'),
              t('MODERN_DEVICE_WARNING.S5'),
              t('MODERN_DEVICE_WARNING.S6'),
              t('MODERN_DEVICE_WARNING.S7'),
              t('MODERN_DEVICE_WARNING.S8')
            ]}
            typingDelay={70} />
        </div>
      </div>
      <div className="absolute text- top-3/4 left-1/2 text-center -translate-x-1/2 -translate-y-1/2 text-white">
        <button
          className="bg-white text-black text-lg py-2 px-4 
                    hover:bg-black hover:text-white hover:border-2 hover:border-dashed hover:border-white"
          onClick={handleAcceptMDWarning}>
          {t('BTNS.ACCEPT')}
        </button>
      </div>
    </div>
  );
}