import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, LogOut } from "lucide-react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { useCart } from "../context/CartContext.jsx";

export const StaggeredMenu = ({
  position = "right",
  colors = ["#FC3500", "#003153"],
  displaySocials = true,
  displayItemNumbering = false,
  className,
  logoUrl = "/images/baked-fantasy-logo.png",
  menuButtonColor = "#000000",
  openMenuButtonColor = "#000000",
  changeMenuColorOnOpen = true,
  isFixed = false,
  accentColor = "#fbff19",
  closeOnClickAway = false,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const openRef = useRef(false);
  const { cartCount } = useCart();

  // for disabling scroll when login or register is open
  useEffect(() => {
    if (isLoginOpen || isRegisterOpen) {
      document.body.style.setProperty("overflow", "hidden", "important");
      document.documentElement.style.setProperty(
        "overflow",
        "hidden",
        "important",
      );
    } else {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    };
  }, [isLoginOpen, isRegisterOpen]);

  // const handleUserClick = () => {

  // };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, []);

  const openRegisterFromLogin = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };
  const openLoginFromRegister = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  // const textColor = chroma(menu ).luminance() < 0.5 ? "#FFFFFF" : "#000000";

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const topLineRef = useRef(null);
  const middleLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState([
    <Menu className="text-black!" />,
    <X className="text-black!" />,
  ]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef(null);

  //   navbar items
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    {
      label: "Bakery",
      ariaLabel: "View our Baked Goodies",
      link: "/categories",
    },
    {
      label: "Equipments",
      ariaLabel: "View our Projects",
      link: "/ess-categories",
    },
    { label: "Courses", ariaLabel: "View our Blogs", link: "/courses" },
    {
      label: "My Learnings",
      ariaLabel: "View our Blogs",
      link: "/courses/my-learning",
    },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  //   Social media
  const socialItems = [
    {
      label: "Instagram",
      link: "https://www.instagram.com/sai_constructions_?igsh=YWhuaGpjeDMwNjRi",
    },
    {
      label: "Facebook",
      link: "https://www.facebook.com/profile.php?id=61585573923909&mibextid=wwXIfr&rdid=hFscs8gBtXe0brNo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F185pnHwS51%2F%3Fmibextid%3DwwXIfr#",
    },
    // { label: "X", link: "https://linkedin.com" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const topLine = topLineRef.current;
      const middleLine = middleLineRef.current;
      const bottomLine = bottomLineRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (
        !panel ||
        !topLine ||
        !middleLine ||
        !bottomLine ||
        !icon ||
        !textInner
      )
        return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      gsap.set(topLine, { transformOrigin: "50% 50%", rotate: 0, y: -6 });
      gsap.set(middleLine, {
        transformOrigin: "50% 50%",
        rotate: 0,
        y: 0,
        opacity: 1,
      });
      gsap.set(bottomLine, { transformOrigin: "50% 50%", rotate: 0, y: 6 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    );
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity"]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        );
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        );
        if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });

        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        );
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const topLine = topLineRef.current;
    const middleLine = middleLineRef.current;
    const bottomLine = bottomLineRef.current;
    if (!icon || !topLine || !middleLine || !bottomLine) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(topLine, { rotate: 45, y: 0, duration: 0.5 }, 0)
        .to(bottomLine, { rotate: -45, y: 0, duration: 0.5 }, 0)
        .to(middleLine, { opacity: 0, duration: 0.3 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(topLine, { rotate: 0, y: -6, duration: 0.35 }, 0)
        .to(bottomLine, { rotate: 0, y: 6, duration: 0.35 }, 0)
        .to(middleLine, { opacity: 1, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  //   const animateText = useCallback((opening) => {
  //     const inner = textInnerRef.current;
  //     if (!inner) return;

  //     textCycleAnimRef.current?.kill();

  //     const currentLabel = opening ? "Menu" : "Close";
  //     const targetLabel = opening ? "Close" : "Menu";
  //     const cycles = 3;

  //     const seq = [currentLabel];
  //     let last = currentLabel;
  //     for (let i = 0; i < cycles; i++) {
  //       last = last === "Umar" ? "Umar" : "Abdullah";
  //       seq.push(last);
  //     }
  //     if (last !== targetLabel) seq.push(targetLabel);
  //     seq.push(targetLabel);

  //     setTextLines(seq);
  //     gsap.set(inner, { yPercent: 0 });

  //     const lineCount = seq.length;
  //     const finalShift = ((lineCount - 1) / lineCount) * 100;

  //     textCycleAnimRef.current = gsap.to(inner, {
  //       yPercent: -finalShift,
  //       duration: 0.5 + lineCount * 0.07,
  //       ease: "power4.out",
  //     });
  //   }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    // animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    // animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    setIsDropdownOpen(false);
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <div
      className={`overflow-x-clip fixed sm-scope z-40 pointer-events-none ${
        isFixed ? "fixed top-0 left-0 overflow-hidden" : "w-full h-full"
      }`}
    >
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper  relative w-full h-full"
        }
        style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-5"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["#003153", "#fc3500"];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <header
          className="staggered-menu-header hidden! md:flex! bg-white! shadow-xl h-18! absolute left-0 w-full  items-center justify-between pointer-events-auto"
          aria-label="Main navigation header"
        >
          <Link
            className="sm-logo rounded-lg lg:pl-10 flex items-center select-none pointer-events-auto"
            to="/"
          >
            <img
              src={logoUrl}
              alt="Sai Construction"
              className="block m-2 cursor-pointer h-15! w-auto object-cover"
              draggable={false}
            />{" "}
            <span className="new-primary-text text-xl font-bold brand-name">
              The Baked Fantasy
            </span>
          </Link>
          <div className="flex gap-10">
            <div className="searchBar">
              <search className="px-5 py-2.5 new-primary-text border-2 border-current rounded-xl font-medium flex items-center">
                <label htmlFor="search">
                  <Search size={20} color="#870D32" />
                </label>
                <input
                  type="search"
                  id="search"
                  placeholder="search cakes"
                  className="border-none w-70 text-black rounded-lg focus:outline-none ml-3 pl-3 "
                />
              </search>
            </div>
            <div className="flex items-center gap-4">
              <div className="sm:flex rounded-2xl p-1 new-primary-bg sm:gap-4">
                <div className="hidden sm:flex">
                  <Link
                    className=" px-5 cursor-pointer py-2.5 text-sm font-medium text-red relative"
                    to="/cart"
                  >
                    <ShoppingCart size={20} color="#F6E9D9" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-0 bg-white text-pink-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="relative">
                  <button
                    className=" px-5 py-2.5 cursor-pointer text-sm font-medium text-red flex items-center gap-2"
                    onClick={() => {
                      if (isLoggedIn) {
                        setIsDropdownOpen(!isDropdownOpen);
                      } else {
                        setLoginOpen(true);
                      }
                    }}
                  >
                    <User size={20} color="#F6E9D9" />
                  </button>

                  {/* Profile Dropdown */}
                  {isLoggedIn && isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-pink-100 py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User size={16} className="text-pink-500" />
                        My Profile
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 transition-colors md:hidden"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <ShoppingCart size={16} className="text-pink-500" />
                        My Cart
                      </Link>
                      <div className="h-px bg-pink-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              ref={toggleBtnRef}
              className="sm-toggle relative w-12! p-3 rounded-lg inline-flex items-center justify-center cursor-pointer text-[#e9e9ef] font-medium leading-none overflow-visible pointer-events-auto"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              onClick={toggleMenu}
              type="button"
            >
              <span
                ref={textWrapRef}
                className="sm-toggle-textWrap relative inline-block overflow-hidden whitespace-nowrap "
                aria-hidden="true"
              >
                <span
                  ref={textInnerRef}
                  className="sm-toggle-textInner flex flex-col leading-none"
                >
                  {textLines.map((l, i) => (
                    <span
                      className="sm-toggle-line menu block leading-none"
                      key={i}
                    >
                      {l}
                    </span>
                  ))}
                </span>
              </span>

              <span
                ref={iconRef}
                className="sm-icon relative w-5 h-4 shrink-0 inline-flex items-center justify-center will-change-transform"
                aria-hidden="true"
              >
                <span
                  ref={topLineRef}
                  className="sm-icon-line absolute left-1/2 top-1/2 w-full h-0.5 bg-current rounded-xs -translate-x-1/2 -translate-y-1/2 will-change-transform"
                />
                <span
                  ref={middleLineRef}
                  className="sm-icon-line absolute left-1/2 top-1/2 w-full h-0.5 bg-current rounded-xs -translate-x-1/2 -translate-y-1/2 will-change-transform"
                />
                <span
                  ref={bottomLineRef}
                  className="sm-icon-line absolute left-1/2 top-1/2 w-full h-0.5 bg-current rounded-xs -translate-x-1/2 -translate-y-1/2 will-change-transform"
                />
              </span>
            </button>
          </div>
        </header>

        {/* mobile navbar */}
        <nav className="block md:hidden shadow-lg fixed top-0 left-0 w-full h-fit pb-2 bg-white pointer-events-auto">
          <div className="flex justify-between pt-4 pl-3">
            <div className="logo pl-10 flex items-center">
              <Link
                to="/"
                className="new-primary-text text-xl font-bold brand-name"
              >
                <img
                  src="/images/baked-fantasy-logo.png"
                  className="h-15 w-auto object-cover object-center"
                  alt=""
                />
              </Link>
            </div>
            <div className="links flex items-center gap-8 mr-5">
              <div className="new-primary-bg flex items-center gap-6 rounded-2xl p-3 px-5">
                <Link to="/cart" className="relative">
                  <ShoppingCart size={20} color="#F6E9D9" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-[8px] font-bold px-1 py-0.5 rounded-full shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      if (isLoggedIn) {
                        setIsDropdownOpen(!isDropdownOpen);
                      } else {
                        setLoginOpen(true);
                      }
                    }}
                  >
                    <User size={20} color="#F6E9D9" />
                  </button>
                  {isLoggedIn && isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-2xl border border-pink-100 py-1 z-[100]">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 active:bg-pink-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 active:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="menu">
                <Menu
                  className="cursor-pointer"
                  size={24}
                  onClick={toggleMenu}
                  color="#472823"
                />
              </div>
            </div>
          </div>
          <div className="searchBar pt-5 mx-5">
            <search className="px-5 py-2.5 new-primary-text border-2 border-current rounded-xl flex items-center">
              <label htmlFor="search">
                <Search size={20} color="#870D32" />
              </label>
              <input
                type="search"
                id="search"
                placeholder="search cakes"
                className="border-none w-full font-medium text-black bg-white rounded-lg ml-3 focus:outline-none pl-3"
              />
            </search>
          </div>
        </nav>
        {/* real nav */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel shadow-xl z-50 overflow-y-hidden! absolute top-0 right-0 h-screen! bg-white! flex flex-col p-[6em_2em_2em_2em] backdrop-blur-md pointer-events-auto"
          style={{ WebkitBackdropFilter: "blur(12px)" }}
          // aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none pt-10! m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {menuItems && menuItems.length ? (
                menuItems.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap border-b md:border-none border-white/50 relative overflow-hidden leading-none"
                    key={it.label + idx}
                  >
                    <NavLink
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-pink-400!" : "text-black!"
                        } sm-panel-item relative hover:text-pink-400! cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]`
                      }
                      to={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={() => {
                        setTimeout(toggleMenu, 500);
                      }}
                    >
                      <span className="text-lg mr-3 opacity-50 md:hidden inline-block">
                        0{idx + 1}
                      </span>
                      <span className="sm-panel-itemLabel font-semibold text-[2.3rem] md:text-[3.5rem] inline-block [transform- :50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </NavLink>
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative text-white! font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto pt-8 flex flex-col gap-3"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-base font-medium text-black!">
                  Socials
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.2rem] font-medium text-red! no-underline relative inline-block py-0.5 transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
      <Login
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenRegister={openRegisterFromLogin}
        setLoggedIn={setLoggedIn}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onOpenLogin={openLoginFromRegister}
        setLoggedIn={setLoggedIn}
      />

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; }
.sm-scope .staggered-menu-header { position: absolute; top: 0; left: 0; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 2em; background: transparent; pointer-events: none; z-index: 20; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-logo-img { display: block; height: 32px; width: auto; object-fit: contain; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; background: transparent; border: none; cursor: pointer; color: #e9e9ef; font-weight: 500; line-height: 1; overflow: visible; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-line:last-of-type { margin-top: 6px; }
.sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .sm-line { display: none !important; }
.sm-scope .staggered-menu-panel { poimport StaggeredMenu from '../../../ts-default/Components/StaggeredMenu/StaggeredMenu';
sition: absolute; top: 0; right: 0; width: clamp(260px, 38vw, 420px); height: 100%; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 10; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(260px, 38vw, 420px); pointer-events: none; z-index: 5; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-weight: 500; color: var(--sm-accent, #ff0000); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ff0000); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-weight: 500; color: #111; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-title { margin: 0;  font-weight: 600; color: #fff; text-transform: uppercase; }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item { position: relative; color: #000; font-weight: 600; cursor: pointer; line-height: 1; letter-spacing: -2px; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; padding-right: 1.4em; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ff0000); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 3.2em; font-weight: 400; color: var(--sm-accent, #ff0000); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .staggered-menu-wrapper[data-open] .sm-logo-img { filter: invert(100%); } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
