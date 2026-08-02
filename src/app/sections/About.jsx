import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import Skill from '../components/Skill';
import { links, skills } from "../utils/config";

export default function About() {

  const { t } = useTranslation(['strings']);
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback((entries, observer) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!aboutRef.current || isVisible) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.05,
    });

    observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={aboutRef}
      className={`max-w-5xl mx-auto max-[450px]:py-14 max-[768px]:py-20 md:py-24 transition-all duration-300 ease-in ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}
                  px-7 sm:px-6 md:px-8`}
      id="about"
    >

      <h3 className={'flex items-center mb-7 font-header text-responsive-section-heading whitespace-nowrap dashed-line'}>
        {t('ABOUT.ABOUT_ME')}
      </h3>

      <div className="block md:grid md:grid-cols-[3fr_2fr] md:gap-12 text-xs min-[480px]:text-sm min-[1375px]:text-base">
        <div>
          <div className="grid grid-cols-1 gap-y-4">
            <p>
              {t('ABOUT.P1')}
            </p>

            <p>
              {t('ABOUT.P21')}
              <a href={links.GIS} target="_blank" className={'text-secondary-orange underline-effect'}>{t('ABOUT.GIS')}</a>
              {', '}
              <span className={'text-secondary-orange'}>{t('ABOUT.WEB')}</span>
              {t('ABOUT.AND')}
              <span className={'text-secondary-orange'}>{t('ABOUT.DESKTOP')}</span>
              {', '}
              {t('ABOUT.EVEN')}
              <a href={links.ERP} target="_blank" className={'text-secondary-orange underline-effect'}>{t('ABOUT.ERP')}</a>
              {t('ABOUT.AND')}
              <span className={'text-secondary-orange'}>{t('ABOUT.MOBILE')}</span>
              {'. '}
              {t('ABOUT.P22')}
            </p>

            <p>
              {t('ABOUT.P3')}
            </p>

            <p>{t('ABOUT.TECH_I_KNOW')}</p>
          </div>
        </div>

        <div className="relative max-w-[300px] mt-[50px] mx-auto mb-0 w-[70%] md:m-auto md:w-full max-[450px]:pb-12">
          <div className="block relative w-full rounded bg-main-gray
                  transition-all duration-500 ease-out transform
                  hover:-translate-x-1 hover:-translate-y-1
                  focus:-translate-x-1 focus:-translate-y-1
                  hover:after:translate-x-3 hover:after:translate-y-3
                  focus:after:translate-x-3 focus:after:translate-y-3
                  before:content-[''] before:block before:absolute before:w-full before:h-full before:rounded
                  before:transition-all before:duration-500 before:ease-out
                  before:top-0 before:left-0 before:bg-orange-200 before:mix-blend-screen
                  after:content-[''] after:block after:absolute after:w-full after:h-full after:rounded
                  after:transition-all after:duration-500 after:ease-out
                  after:top-4 after:left-4 after:z-[-1] after:border-dashed after:border-2 after:border-main-gray 
                  ">
            <Image className="relative rounded mix-blend-multiply filter grayscale contrast-100 transition-all duration-500 ease-out
                    hover:filter-none hover:mix-blend-normal focus:filter-none focus:mix-blend-normal"
              src="/images/xportas-img.jpeg"
              alt="Xabier Portas"
              width={1068}
              height={1068}
              sizes="(max-width: 768px) 70vw, 300px" />
          </div>
        </div>

      </div>

      <div className="block mt-12 max-[450px]:mt-7 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 place-items-center">
        {skills && Object.entries(skills).map(([category, items]) => {
          return (
            <Skill
              key={category}
              url={`${category}`}
              back={
                <div className="flex flex-col justify-center items-center">
                  <h6 className="font-header mb-2">{category}</h6>
                  <ul className="grid grid-cols-[repeat(2,minmax(50px,150px))] gap-x-2 p-0 mt-5 mx-5 overflow-hidden list-none">
                    {Object.entries(items).map(([key, value]) => {
                      return (
                        <li
                          key={`${category}-${key}`}
                          className="relative mb-2.5 pl-5 text-xs before:content-['▹'] before:absolute before:left-0 before:text-secondary-orange 
                          before:text-sm before:leading-3">
                          {value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              }>
            </Skill>
          );
        })}
      </div>
    </section>
  );
}