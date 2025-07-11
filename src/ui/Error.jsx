import { MdOutlineErrorOutline } from "react-icons/md";

function Error({ children }) {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-duration="800"
      data-aos-delay="100"
      className="flex flex-col justify-center gap-3 items-center"
    >
      <MdOutlineErrorOutline size={60} className="text-red-500/80" />
      <p className="text-red-500/80 text-md font-medium"> {children}</p>
    </div>
  );
}

export default Error;
