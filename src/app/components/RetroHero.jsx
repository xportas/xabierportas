'use client';
import { useTranslation } from "react-i18next";
import { personalData } from "../utils/config";
import AnimatedTyping from "./AnimatedTyping";

export default function RetroHero({ retroScreenOn }) {
  const { t } = useTranslation(['strings']);


  return (
    <div className='flex flex-col justify-center content-center space-y-8 font-header pt-10 pb-5 px-4 sm:pt-16 sm:pb-7 sm:px-10 md:py-20 lg:py-20 w-full md:w-3/4 min-[1090px]:w-1/2'>
      <div className='max-[767px]:flex max-[767px]:justify-center'>
        <p className='text-xl min-[600px]:text-2xl md:text-3xl'>
          {t('RETRO_SCREEN.GREETING')}
        </p>
      </div>
      <div className='inline-block justify-center text-retroScreen-bgcolor max-[767px]:m-auto whitespace-nowrap [text-shadow:none]'>
        <span className='bg-retroScreen-txtcolor py-2 sm:py-3 text-2xl min-[600px]:text-3xl md:text-4xl font-main'>
          {t('RETRO_SCREEN.I_AM')}
        </span>
        <AnimatedTyping
          cursorStyle={'inline-block w-[4px] h-[2rem] sm:w-[5px] sm:h-[2.5rem] md:w-[6px] md:h-[3rem] bg-retroScreen-txtcolor ml-[2px] sm:ml-[3px] animate-blink align-middle mb-2 sm:mb-3 mr-1'}
          textStyle={`bg-retroScreen-txtcolor py-2 sm:py-3 text-2xl min-[600px]:text-3xl md:text-4xl font-main`}
          strings={[personalData.name, personalData.alias]}
          dontStop={retroScreenOn} />
      </div>
      <div className='max-[767px]:flex max-[767px]:justify-center'>
        <ul className='list-inside list-square text-sm min-[600px]:text-base md:text-lg'>
          <li> {t('RETRO_SCREEN.FSDEV')} </li>
          <li className='mt-2'> {t('RETRO_SCREEN.GIS_SPEC')} </li>
        </ul>
      </div>
    </div>
  );
}
