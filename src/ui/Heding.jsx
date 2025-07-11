function Heding({ textWhite, textPrimary }) {
  return (
    <h2
      data-aos="zoom-in-up"
      data-aos-duration="800"
      data-aos-delay="100"
      className="text-white font-semibold text-center my-7 text-3xl w-full"
    >
      {textWhite} <span className="text-primary ">{textPrimary}</span>
    </h2>
  );
}

export default Heding;
