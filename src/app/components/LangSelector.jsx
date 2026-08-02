'use client';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import { PixelatedImage } from '../components/PixelatedImage';
import { languageOptions, waitForMs } from '../utils/utils';


export default function LangSelector({ i18n, setCurrentLanguage, setRetroScreenOn, screenWidth, isTouchDevice, turningONanimation }) {

  const { t } = useTranslation(['strings']);
  const [langIndex, setLangIndex] = useState(0);
  const [increaseZIndexOfLangOpt, setIncreaseZIndexOfLangOpt] = useState(false);
  const [enableEnter, setEnableEnter] = useState(false);
  const currentLang = languageOptions[langIndex];

  useEffect(() => {
    if (!turningONanimation) return;

    const handleAnimation = async () => {
      setEnableEnter(true);
      if (isTouchDevice) {
        await waitForMs(400);
        setIncreaseZIndexOfLangOpt(true);
      }
    };
    handleAnimation();
  }, [turningONanimation, isTouchDevice]);

  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowLeft':
        setLangIndex((prev) => (prev > 0 ? prev - 1 : languageOptions.length - 1));
        break;
      case 'ArrowUp':
      case 'ArrowRight':
        setLangIndex((prev) => (prev < languageOptions.length - 1 ? prev + 1 : 0));
        break;
      case 'Enter':
        if (enableEnter) {
          setRetroScreenOn(false);
          setCurrentLanguage(currentLang.value);
          i18n.changeLanguage(currentLang.value);
        }
        break;
      default: break;
    }
  }, [enableEnter, currentLang, i18n, setCurrentLanguage, setRetroScreenOn]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const onClickLang = useCallback((langValue) => {
    setRetroScreenOn(false);
    setCurrentLanguage(langValue);
    i18n.changeLanguage(langValue);
  }, [i18n, setCurrentLanguage, setRetroScreenOn]);

  const showKeyboardInstructions = screenWidth >= 768;

  const renderedLanguages = useMemo(() => (
    languageOptions.map((lang) => (
      <PixelatedImage
        blockSize={10}
        key={lang.value}
        src={lang.flag}
        alt={lang.value}
        level={lang.level}
        onClick={() => onClickLang(lang.value)}
        className={`m-auto rounded-full w-20 h-20 min-[600px]:w-24 min-[600px]:h-24 min-[900px]:w-28 min-[900px]:h-28 lg:w-32 lg:h-32 opacity-95 
                    ${increaseZIndexOfLangOpt ? 'z-[999]' : ''} ${currentLang.value === lang.value ? 'shadow-lang-glow' : ''}`}
      />
    ))
  ), [onClickLang, increaseZIndexOfLangOpt, currentLang]);

  return (
    <div className="flex flex-col max-w-6xl m-auto md:flex-row place-content-around h-auto md:h-2/5 px-4 md:px-0">
      <div className="flex flex-col w-full md:w-2/6 mx-2 md:mx-5 lg:mx-10 mt-3 md:space-y-5">
        <div className="ml-1">
          <span className="text-responsive-section-heading md:text-2xl text-center md:text-left">
            {t('LANG_SELECTOR.SELECT_LANG')}
          </span>
        </div>
        {showKeyboardInstructions && (
          <>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Image
                src="./images/arrow-keys-icon.svg"
                alt="arrow-keys"
                width={56}
                height={56}
                className="w-8 h-8 md:w-14 md:h-14"
              />
              <span className="text-sm md:text-base">{t('LANG_SELECTOR.MOVE_OPT')}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Image
                src="./images/enter-key-icon.svg"
                alt="enter-keys"
                width={44}
                height={44}
                className="w-6 h-6 md:w-11 md:h-11"
              />
              <span className="text-sm md:text-base">{t('LANG_SELECTOR.SELECT_ONE_LANG')}</span>
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center items-center min-[427px]:grid-cols-4 md:gap-7 mt-3 md:mt-0 min-[900px]:mr-7">
        {renderedLanguages}
      </div>
    </div>
  );
}