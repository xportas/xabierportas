import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import Plumber from '../components/Plumber';
import { projects } from '../utils/config';


export default function Projects({ screenWidth }) {

  const { t } = useTranslation(['strings']);
  const projectsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback((entries, observer) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!projectsRef.current || isVisible) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.05,
    });

    observer.observe(projectsRef.current);

    return () => observer.disconnect();
  }, [isVisible]);


  return (
    <section
      ref={projectsRef}
      className={`max-[450px]:py-14 max-[768px]:py-20 md:py-24 mx-auto transition-all duration-500 ease-in max-w-[1200px]
                  ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-md'} md:p-8`}
      id='work'
    >
      <h3 className={`flex items-center justify-center mb-14 mx-3 font-header text-responsive-section-heading ${screenWidth > 768 && 'dashed-line'}`}
      >
        {t('PROJECTS.TITLE')}
      </h3>

      <ul className="p-0 m-0 flex flex-wrap items-center justify-center max-w-[1200px] mx-auto max-[768px]:m-7" style={{ listStyle: 'none' }}>
        {projects &&
          Object.entries(projects).map(([key, project], i) => {
            const { title, cover, coverWidth, coverHeight, github, tech, description } = project;

            return (
              <li
                key={i}
                className="relative grid gap-2.5 grid-cols-[repeat(12,1fr)] items-center mb-10 max-[768px]:mb-16 max-[480px]:mb-8"
              >
                <div className="relative col-[1_/_7] row-span-full max-[1080px]:col-[1_/_9] max-[768px]:flex max-[768px]:flex-col max-[768px]:justify-center
                                max-[768px]:h-full max-[768px]:col-span-full max-[768px]:z-[5] max-[768px]:pt-10 max-[768px]:pb-[30px] max-[768px]:px-10 
                                max-[480px]:pt-[30px] max-[480px]:pb-5 max-[480px]:px-[25px]"
                >
                  <div>
                    <h6 className={'text-secondary-orange text-[clamp(24px,5vw,28px)] font-header md:mt-0 md:mb-5 md:mx-0 underline-effect z-20'}>
                      <a href={github || '#'} target="_blank" rel="noopener noreferrer">
                        {t(`${title}`)}
                      </a>
                    </h6>

                    <div className="relative z-20 p-6 rounded bg-main-gray text-orange-200 max-[768px]:text-main-gray text-xs min-[480px]:text-sm min-[1375px]:text-base 
                                    max-[768px]:bg-transparent max-[768px]:shadow-none max-[768px]:px-0 max-[768px]:py-5 shadow-custom transition-all duration-[0.25s] ease-out 
                                    hover:shadow-custom-hover hover:-translate-x-1 hover:-translate-y-1 focus:shadow-custom-hover focus:-translate-x-1 focus:-translate-y-1"
                    >
                      <p>{t(`${description}`)}</p>
                    </div>

                    {tech.length && (
                      <ul
                        className="flex flex-wrap relative z-20 mt-[25px] mb-2.5 mx-0 p-0 max-[768px]:mx-0 max-[768px]:my-2.5"
                        style={{ listStyle: 'none' }}
                      >
                        {tech.map((skill, j) => (
                          <li
                            key={j}
                            className="text-secondary-gray max-[768px]:text-orange-800 text-[13px] whitespace-nowrap ml-0 mr-5 mt-0 mb-[5px] 
                                        max-[768px]:ml-0 max-[768px]:mr-2.5 max-[768px]:mt-0 max-[768px]:mb-[5px]"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="col-[6_/_-1] row-span-full relative z-[1] max-[768px]:col-span-full max-[768px]:h-full max-[768px]:opacity-30">
                  <a href={github || '#'} target="_blank" rel="noopener noreferrer" className={`relative z-10 w-full h-full rounded align-middle`}>
                    <Image
                      src={cover}
                      alt={t(title)}
                      width={coverWidth}
                      height={coverHeight}
                      sizes="(max-width: 768px) 100vw, (max-width: 1080px) 60vw, 500px"
                      className="shadow-custom rounded brightness-[70%] max-[768px]:object-cover max-[768px]:w-full max-[768px]:h-full
                                max-[768px]:grayscale max-[768px]:contrast-100 max-[768px]:brightness-[50%]
                                transition-all duration-500 ease-out hover:shadow-custom-hover hover:-translate-x-1 hover:-translate-y-1
                                focus:shadow-custom-hover focus:-translate-x-1 focus:-translate-y-1"
                    />
                  </a>
                </div>
              </li>
            );
          })}

        <li><Plumber /></li> {/* TODO: DELETE when the rest of the projects are completed */}

      </ul>
    </section>
  );
}