'use client';
import { useEffect, useState } from "react";


export default function Nav() {

  const [showNavbar, setShowNavbar] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(true);
  const [hoverBtnsEffectDisabled, setHoverBtnsEffectDisabled] = useState(true);
  const navbarInitialState = {home: false, expertise: false, work: false, experience: false, contact: false};
  const [navbarOnHoverState, setNavbarOnHoverState] = useState(navbarInitialState);

  const onMouseDown = () => { setHoverBtnsEffectDisabled(false); }
  const onMouseLeave = () => { setHoverBtnsEffectDisabled(true); }
  const handleNavbarOnHover = (a, isHover) => {
    const newNavbarOnHoverState = { ...navbarOnHoverState, [a]: isHover };
    setNavbarOnHoverState(newNavbarOnHoverState);
  }

  useEffect(() => {
    if (!showNavbar) {
      const timer = setTimeout(() => {
        setNavbarHidden(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setNavbarHidden(false);
    }
  }, [showNavbar]);

  return (
    <header className="fixed m-5 z-10">
      <div className="flex items-center justify-between px-5 py-3">

        <div className="flex items-center">
          <button type="button" className={`bg-main-color-gray px-5 py-1 border-solid border-2 border-orange-200 shadow-custom transition ease-in-out ${hoverBtnsEffectDisabled ? 'hover:shadow-custom-hover hover:-translate-y-1 hover:scale-105' : null}`} onMouseDown={onMouseDown} onMouseUp={() => (setHoverBtnsEffectDisabled(true), setShowNavbar(!showNavbar))} onMouseLeave={onMouseLeave}>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="sharp" strokeLinejoin="sharp" />
              <g id="SVGRepo_iconCarrier">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="#fed7aa" strokeWidth="3" strokeLinecap="sharp" strokeLinejoin="sharp" />
              </g>
            </svg>
          </button>

          <a className={`ml-7 bg-main-color-gray px-3 py-1 border-solid border-2 border-orange-200 shadow-custom transition ease-in-out ${hoverBtnsEffectDisabled ? 'hover:shadow-custom-hover hover:-translate-y-1 hover:scale-105' : ''}`} href="https://es.linkedin.com/in/xabierportas" onMouseDown={onMouseDown} onMouseUp={() => setHoverBtnsEffectDisabled(true)} onMouseLeave={onMouseLeave}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier"> <path d="M18.72 3.99997H5.37C5.19793 3.99191 5.02595 4.01786 4.86392 4.07635C4.70189 4.13484 4.55299 4.22471 4.42573 4.34081C4.29848 4.45692 4.19537 4.59699 4.12232 4.75299C4.04927 4.909 4.0077 5.07788 4 5.24997V18.63C4.01008 18.9901 4.15766 19.3328 4.41243 19.5875C4.6672 19.8423 5.00984 19.9899 5.37 20H18.72C19.0701 19.9844 19.4002 19.8322 19.6395 19.5761C19.8788 19.32 20.0082 18.9804 20 18.63V5.24997C20.0029 5.08247 19.9715 4.91616 19.9078 4.76122C19.8441 4.60629 19.7494 4.466 19.6295 4.34895C19.5097 4.23191 19.3672 4.14059 19.2108 4.08058C19.0544 4.02057 18.8874 3.99314 18.72 3.99997ZM9 17.34H6.67V10.21H9V17.34ZM7.89 9.12997C7.72741 9.13564 7.5654 9.10762 7.41416 9.04768C7.26291 8.98774 7.12569 8.89717 7.01113 8.78166C6.89656 8.66615 6.80711 8.5282 6.74841 8.37647C6.6897 8.22474 6.66301 8.06251 6.67 7.89997C6.66281 7.73567 6.69004 7.57169 6.74995 7.41854C6.80986 7.26538 6.90112 7.12644 7.01787 7.01063C7.13463 6.89481 7.2743 6.80468 7.42793 6.74602C7.58157 6.68735 7.74577 6.66145 7.91 6.66997C8.07259 6.66431 8.2346 6.69232 8.38584 6.75226C8.53709 6.8122 8.67431 6.90277 8.78887 7.01828C8.90344 7.13379 8.99289 7.27174 9.05159 7.42347C9.1103 7.5752 9.13699 7.73743 9.13 7.89997C9.13719 8.06427 9.10996 8.22825 9.05005 8.3814C8.99014 8.53456 8.89888 8.6735 8.78213 8.78931C8.66537 8.90513 8.5257 8.99526 8.37207 9.05392C8.21843 9.11259 8.05423 9.13849 7.89 9.12997ZM17.34 17.34H15V13.44C15 12.51 14.67 11.87 13.84 11.87C13.5822 11.8722 13.3313 11.9541 13.1219 12.1045C12.9124 12.2549 12.7546 12.4664 12.67 12.71C12.605 12.8926 12.5778 13.0865 12.59 13.28V17.34H10.29V10.21H12.59V11.21C12.7945 10.8343 13.0988 10.5225 13.4694 10.3089C13.84 10.0954 14.2624 9.98848 14.69 9.99997C16.2 9.99997 17.34 11 17.34 13.13V17.34Z" fill="#fed7aa" /> </g>
            </svg>
          </a>

          <a className={`bg-main-color-gray px-3 py-1 border-solid border-2 border-orange-200 shadow-custom transition ease-in-out ${hoverBtnsEffectDisabled ? 'hover:shadow-custom-hover hover:-translate-y-1 hover:scale-105' : ''}`} href="/cv-xportas.pdf" download="cv-xportas.pdf" onMouseDown={onMouseDown} onMouseUp={() => setHoverBtnsEffectDisabled(true)} onMouseLeave={onMouseLeave} >
            <svg width="35px" height="25px" xmlns="http://www.w3.org/2000/svg">
              <text className="text-orange-200 font-header" x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fill="rgb(254, 215, 170)">CV</text>
            </svg>
          </a>

          <a className={`bg-main-color-gray px-3 py-1 border-solid border-2 border-orange-200 shadow-custom transition ease-in-out ${hoverBtnsEffectDisabled ? 'hover:shadow-custom-hover hover:-translate-y-1 hover:scale-105' : ''}`} onMouseDown={onMouseDown} onMouseUp={() => setHoverBtnsEffectDisabled(true)} onMouseLeave={onMouseLeave} href="https://github.com/xportas">
            <svg width="25px" height="25px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fed7aa" strokeWidth="0.00024000000000000003">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048" />
              <g id="SVGRepo_iconCarrier"> <path d="M18.6713 2.62664C18.5628 2.36483 18.3534 2.16452 18.0959 2.07627L18.094 2.07564L18.0922 2.07501L18.0884 2.07374L18.0805 2.07114L18.0636 2.06583C18.0518 2.06223 18.039 2.05856 18.0252 2.05487C17.9976 2.04749 17.966 2.04007 17.9305 2.03319C17.8593 2.01941 17.7728 2.00787 17.6708 2.00279C17.466 1.99259 17.2037 2.00858 16.8817 2.08054C16.3447 2.20053 15.6476 2.47464 14.7724 3.03631C14.7152 3.07302 14.6572 3.11096 14.5985 3.15016C14.5397 3.13561 14.4809 3.12155 14.422 3.108C12.8261 2.74083 11.1742 2.74083 9.57825 3.108C9.51933 3.12156 9.46049 3.13561 9.40173 3.15017C9.34298 3.11096 9.28499 3.07302 9.22775 3.03631C8.35163 2.47435 7.65291 2.20029 7.11455 2.08039C6.79179 2.00852 6.52891 1.99262 6.324 2.00278C6.22186 2.00784 6.13536 2.01931 6.06428 2.03299C6.0288 2.03982 5.99732 2.04717 5.96983 2.05447C5.95609 2.05812 5.94336 2.06176 5.93163 2.06531L5.91481 2.07056L5.90698 2.07311L5.9032 2.07437L5.90135 2.07499L5.89952 2.07561C5.63979 2.16397 5.42877 2.36623 5.32049 2.63061C4.91716 3.6154 4.8101 4.70134 5.00435 5.74306C5.01379 5.79367 5.02394 5.84418 5.0348 5.89458C4.99316 5.95373 4.9527 6.01368 4.91343 6.07439C4.30771 7.01089 3.98553 8.12791 4.00063 9.27493C4.00208 11.7315 4.71965 13.4139 5.9332 14.4965C6.62014 15.1093 7.41743 15.4844 8.21873 15.7208C8.31042 15.7479 8.40217 15.7731 8.49381 15.7967C8.48043 15.8432 8.46796 15.8901 8.45641 15.9373C8.40789 16.1357 8.37572 16.3394 8.36083 16.5461C8.35948 16.5648 8.35863 16.5835 8.35829 16.6022L8.32436 18.421L8.32417 18.4407C8.32417 18.4464 8.32417 18.4521 8.32417 18.4577C8.26262 18.473 8.20005 18.4843 8.13682 18.4916C7.942 18.5141 7.74467 18.4977 7.5561 18.4434C7.36752 18.3891 7.19127 18.2979 7.03752 18.1749C6.88377 18.0519 6.75553 17.8994 6.66031 17.7261L6.6505 17.7087C6.38836 17.2535 6.02627 16.8639 5.59142 16.5695C5.15656 16.275 4.6604 16.0836 4.14047 16.0099C3.59365 15.9324 3.08753 16.3128 3.01002 16.8597C2.93251 17.4065 3.31296 17.9126 3.85978 17.9901C4.07816 18.0211 4.28688 18.1015 4.47012 18.2256C4.65121 18.3482 4.80277 18.5103 4.9134 18.7C5.1346 19.0992 5.43165 19.4514 5.78801 19.7365C6.14753 20.0242 6.56032 20.2379 7.00272 20.3653C7.43348 20.4893 7.88392 20.5291 8.32949 20.4825C8.33039 20.7224 8.33103 20.9065 8.33103 21C8.33103 21.5523 8.75521 22 9.27847 22H14.7558C15.279 22 15.7032 21.5523 15.7032 21V17.2095C15.729 16.7802 15.685 16.3499 15.5738 15.9373C15.5585 15.8805 15.5419 15.824 15.5241 15.7679C15.5838 15.753 15.6435 15.7373 15.7032 15.7208C16.5277 15.4937 17.3513 15.1224 18.0588 14.4983C19.2791 13.4217 19.9982 11.7379 19.9996 9.27493C20.0147 8.12791 19.6925 7.01089 19.0868 6.07439C19.0475 6.01358 19.007 5.95354 18.9652 5.89429C18.976 5.84399 18.9861 5.79358 18.9955 5.74306C19.1893 4.69934 19.0795 3.61142 18.6713 2.62664Z" fill="#fed7aa" /> </g>
            </svg>
          </a>
        </div>

        <div className="fixed left-1/2 transform -translate-x-1/2 z-10">
          <nav className={`flex font-header text-orange-200 bg-main-color-gray px-5 py-1 border-solid border-2 border-orange-200 shadow-custom ${showNavbar ? 'animate-fadeIn' : 'animate-fadeOut'} ${navbarHidden ? 'hidden' : ''}`}>
            <div className="absolute  z-20 flex items-center justify-center">
              <span className={`px-3 m-2 bg-orange-300 bg-clip-text text-transparent ${navbarOnHoverState.home ? 'blur-xs' : 'animate-fadeOut transition-all duration-75' } `}>Home</span>
              <span className={`px-3 m-2 bg-orange-300 bg-clip-text text-transparent ${navbarOnHoverState.expertise ? 'blur-xs' : 'animate-fadeOut transition-all duration-75' } `}>Expertise</span>
              <span className={`px-3 m-2 bg-orange-300 bg-clip-text text-transparent ${navbarOnHoverState.work ? 'blur-xs' : 'animate-fadeOut transition-all duration-75' } `}>Work</span>
              <span className={`px-3 m-2 bg-orange-300 bg-clip-text text-transparent ${navbarOnHoverState.experience ? 'blur-xs' : 'animate-fadeOut transition-all duration-75' } `}>Experience</span>
              <span className={`px-3 m-2 bg-orange-300 bg-clip-text text-transparent ${navbarOnHoverState.contact ? 'blur-xs' : 'animate-fadeOut transition-all duration-75' } `}>Contact</span>
            </div>
            <div className="relative z-30 flex items-center justify-center">
              <a href="#home-section" className="px-3 m-2 hover:-translate-y-1.5 hover:translate-x-1.5 hover:my-0 hover:pt-0 hover:pb-1 transition-all duration-150" onMouseOver={() => handleNavbarOnHover('home', true)} onMouseLeave={() => handleNavbarOnHover('home', false)}><span className={`bg-main-color-gray bg-clip-text`} >Home</span></a>
              <a href="#expertise-section" className="px-3 m-2 hover:-translate-y-1.5 hover:translate-x-1.5 hover:my-0 hover:pt-0 hover:pb-1 transition-all duration-150" onMouseOver={() => handleNavbarOnHover('expertise', true)} onMouseLeave={() => handleNavbarOnHover('expertise', false)}><span className={`bg-main-color-gray bg-clip-text`} >Expertise</span></a>
              <a href="#work-section" className="px-3 m-2 hover:-translate-y-1.5 hover:translate-x-1.5 hover:my-0 hover:pt-0 hover:pb-1 transition-all duration-150" onMouseOver={() => handleNavbarOnHover('work', true)} onMouseLeave={() => handleNavbarOnHover('work', false)}><span className={`bg-main-color-gray bg-clip-text`} >Work</span></a>
              <a href="#experience-section" className="px-3 m-2 hover:-translate-y-1.5 hover:translate-x-1.5 hover:my-0 hover:pt-0 hover:pb-1 transition-all duration-150" onMouseOver={() => handleNavbarOnHover('experience', true)} onMouseLeave={() => handleNavbarOnHover('experience', false)}><span className={`bg-main-color-gray bg-clip-text`} >Experience</span></a>
              <a href="#contact-section" className="px-3 m-2 hover:-translate-y-1.5 hover:translate-x-1.5 hover:my-0 hover:pt-0 hover:pb-1 transition-all duration-150" onMouseOver={() => handleNavbarOnHover('contact', true)} onMouseLeave={() => handleNavbarOnHover('contact', false)}><span className={`bg-main-color-gray bg-clip-text`} >Contact</span></a>
            </div>
          </nav>
        </div>

      </div>
    </header>
  );
}