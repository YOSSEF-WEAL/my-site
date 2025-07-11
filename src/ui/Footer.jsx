import { FaBehance, FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
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
  return (
    <footer
      style={{
        background:
          "linear-gradient(170deg, rgb(74, 212, 147), rgb(0, 115, 116))",
      }}
      className="flex items-center justify-center  mt-10 "
    >
      <div className="max-w-[1350px] w-full p-5 flex items-center justify-between flex-row flex-wrap gap-5">
        <Link to="/">
          <img
            src="/logo.png"
            alt="yossef weal logo"
            className="w-15 mb-3 rounded-full border-3 border-white"
          />
        </Link>

        <div className="flex items-center justify-between flex-row gap-3">
          {social.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-[1.1] transition-all border-2 border-white"
              style={{
                background: "linear-gradient(115deg, #4ad493, #007374)",
              }}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
