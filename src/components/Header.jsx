import { FaBehance, FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiGithub, FiInstagram } from "react-icons/fi";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "#contact" },
  ];
  const social = [
    {
      icon: <FiFacebook className="text-white text-2xl" />,
      href: "https://www.facebook.com/profile.php?id=100040317048909&locale=ar_AR",
    },
    {
      icon: <FaWhatsapp className="text-white text-2xl" />,
      href: "https://wa.link/u33dav",
    },
    {
      icon: <FiGithub className="text-white text-2xl" />,
      href: "https://github.com/YOSSEF-WEAL",
    },
    {
      icon: <FaBehance className="text-white text-2xl" />,
      href: "https://www.behance.net/yossefweal",
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavClick(href) {
    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(href);
    }
  }

  // دالة لتحديد الـ active link
  function isActiveLink(href) {
    if (href === "/") {
      return location.pathname === "/";
    }
    if (href === "/projects") {
      return location.pathname === "/projects";
    }
    // للأقسام الداخلية في الصفحة الرئيسية
    if (href.startsWith("#")) {
      return location.pathname === "/" && location.hash === href;
    }
    return false;
  }

  return (
    <header className="px-10 py-5 absolute z-50 top-0 left-0 w-full h-[100px] flex flex-row items-center justify-between">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-bg-body z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-white p-2 rounded-full cursor-pointer hover:bg-primary transition-all bg-white/20 text-2xl"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <HiX />
        </button>
        <ul className="flex flex-col gap-4 mt-20 px-6">
          {nav.map((item, index) => (
            <li key={index}>
              <button
                className={`block px-4 py-2 rounded-full text-white text-center text-lg cursor-pointer hover:bg-primary transition-colors w-full ${
                  isActiveLink(item.href) ? "bg-primary" : "bg-white/10"
                }`}
                onClick={() => {
                  handleNavClick(item.href);
                  setSidebarOpen(false);
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-row items-center gap-3 px-6 mt-10">
          {social.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 text-white hover:bg-primary transition-colors"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      {/* Main header content */}
      <div className="h-full w-full flex flex-row items-center justify-between">
        <div className="w-[20%]">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="w-20 flex items-center justify-center"
            />
          </Link>
        </div>
        {/* Desktop nav */}
        <ul className="hidden md:flex flex-row items-center gap-2 justify-between">
          {nav.map((item, index) => (
            <li key={index}>
              <button
                data-aos="fade-down"
                data-aos-duration="1200"
                data-aos-delay={index * 150}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-2 rounded-full text-base text-white transition-colors hover:bg-primary cursor-pointer ${
                  isActiveLink(item.href) ? "bg-primary" : "bg-white/20"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        {/* Desktop social icons */}
        <div className="hidden md:flex flex-row items-center gap-2 justify-end w-[20%]">
          {social.map((item, index) => (
            <a
              data-aos="fade-down"
              data-aos-duration="1200"
              data-aos-delay={index * 200}
              key={index}
              href={item.href}
              className="w-11 h-11 p-0 rounded-full flex items-center justify-center bg-white/20 text-base text-white transition-colors hover:bg-primary"
            >
              {item.icon}
            </a>
          ))}
        </div>
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-12 h-12 ml-auto text-white text-3xl p-2 rounded-full cursor-pointer hover:bg-primary transition-all bg-white/20"
          onClick={() => setSidebarOpen(true)}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
