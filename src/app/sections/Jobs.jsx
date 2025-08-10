'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { jobs } from '../utils/config';


export default function Jobs({ screenWidth }) {

  const { t } = useTranslation(['strings']);
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const jobsRef = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [markerStyle, setMarkerStyle] = useState({});


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !rendered) {
          setRendered(true);
          observer.disconnect(); // Disconnects the observer after the first intersection
        }
      },
      { threshold: 0.1 }
    );

    if (jobsRef.current) {
      observer.observe(jobsRef.current);
    }

    return () => {
      if (jobsRef.current) {
        observer.disconnect();
      }
    };
  }, [rendered]);


  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the last, go to the first
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the first, move to the last
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);


  // Handle event when user press up or down arrow keys
  const onKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case 'ArrowDown': {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  // Calculate the width of the tabs to place the marker just below them
  useEffect(() => {
    if (tabs.current[activeTabId]) {
      const activeTab = tabs.current[activeTabId];
      const { offsetWidth, offsetLeft } = activeTab;
      setMarkerStyle({
        width: `${offsetWidth}px`,
        transform: `translateX(${offsetLeft}px)`,
      });
    }
  }, [activeTabId, screenWidth]);


  return (
    <section ref={jobsRef}
      className={`max-[450px]:py-14 max-[768px]:py-20 md:py-24 px-3 sm:px-6 md:px-8 transition-all duration-500 ease-in ${rendered ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
      id='experience'>

      <h3 className={`flex items-center justify-center mb-7 mx-3 font-header text-responsive-section-heading ${screenWidth > 770 && 'dashed-line'}`}>
        {t('JOBS.TITLE')}
      </h3>

      <div className="flex max-[650px]:block max-[650px]:max-w-full min-[750px]:min-h-[340px] max-w-[1040px] mx-auto">
        <div onKeyDown={(e) => onKeyDown(e)}
          className="relative w-max p-0 m-0 list-none z-10 max-[480px]:w-full
                      max-[650px]:flex max-[650px]:overflow-x-auto max-[650px]:w-full
                        max-[650px]:mb-2" >
          {jobs && Object.entries(jobs).map(([key, job], i) => {
            return (
              <button
                className={`link-style flex justify-start items-center w-full h-11 py-0 border-l-4 border-solid border-main-gray min-[651px]:whitespace-nowrap
                            bg-transparent font-header text-[8px] min-[480px]:text-[10px] min-[1375px]:text-xs text-left max-[768px]:pt-0 max-[768px]:px-4 
                            max-[768px]:pb-[2px] max-[650px]:flex max-[650px]:justify-between max-[650px]:items-center max-[650px]:min-w-32
                            max-[650px]:px-0 max-[650px]:border-l-0 max-[650px]:border-b-2 max-[650px]:border-[#a8947e8b] max-[650px]:text-center
                            focus:bg-[#a8947e8b] ${activeTabId === i ? 'text-secondary-orange' : 'text-main-gray'}
                            ${activeTabId === i ? 'hover:focus:bg-[#7968568b]' : 'hover:bg-[#a8947e8b]'}`}
                key={i}
                data-is-active={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                ref={el => (tabs.current[i] = el)}
                id={`tab-${i}`}
                role="tab"
                tabIndex={activeTabId === i ? '0' : '-1'}
                aria-selected={activeTabId === i ? true : false}
                aria-controls={`panel-${i}`}>
                <span className='mx-2'>{t(`${job.company}`)}</span>
              </button>
            );
          })}

          <div
            className="absolute top-auto bottom-0 z-20 h-[3px] bg-secondary-orange transition-transform ease-in duration-300 delay-100
                      min-[651px]:top-0 min-[651px]:left-0 min-[651px]:z-20 min-[651px]:w-1 min-[651px]:h-11"
            style={screenWidth <= 650 ? markerStyle : { transform: `translateY(calc(${activeTabId} * 44px))` }}
          />

        </div>


        <div className='relative w-full ml-5 max-[650px]:ml-0'>
          {jobs && Object.entries(jobs).map(([key, job], i) => {
            return (
              <div
                key={key}
                className='w-full h-auto py-[10px] px-1'
                id={`panel-${i}`}
                role="tabpanel"
                tabIndex={activeTabId === i ? '0' : '-1'}
                aria-labelledby={`tab-${i}`}
                aria-hidden={activeTabId !== i}
                hidden={activeTabId !== i}>

                <h4 className='mb-[2px] font-medium animate-wipeInRight' style={{ fontSize: '22px', lineHeight: 1.3 }}>
                  <span className='text-base min-[1080px]:text-xl min-[1375px]:text-2xl min-[1375px]:whitespace-nowrap'>{t(`${job.title}`)}</span>
                  <p className="text-base min-[1080px]:text-xl min-[1375px]:text-2xl min-[1375px]:whitespace-nowrap text-secondary-orange">
                    @&nbsp;
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                      {t(`${job.company}`)}
                    </a>
                  </p>
                </h4>

                <p className='mb-6 text-secondary-gray animate-wipeInRight' style={{ fontSize: '13px' }}>{t(`${job.range}`)}</p>

                <div className='p-0 m-0'>
                  <ul className='p-0 m-0 list-none' style={{ fontSize: '18px' }}>
                    {Object.values(job.duties).map((dutie, i) => {
                      const showBullet = t(`${dutie}`).startsWith("[");
                      return (
                        <>
                          {showBullet && <li key={`br-${dutie}-${i}`} ><br /></li>}
                          <li
                            key={`duty-${i}`}
                            className={`relative pl-7 mb-3 text-xs min-[480px]:text-sm min-[1375px]:text-base animate-wipeInRight 
                                      ${!showBullet ? 'before:content-["▹"] before:absolute before:left-0 before:text-secondary-orange' : ''}
                                      `}
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            {t(`${dutie}`)}
                          </li>
                        </>
                      )
                    })}
                  </ul>
                </div>


              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}