import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./SliderService.css";
import { EffectCards } from "swiper/modules";

function SliderService() {
  const SlidersContect = [
    {
      img: "Design-UI&UX.svg",
      title: "Innovative and Unique Design UI&UX",
      description:
        "We provide unique and creative designs that reflect your brand's identity and offer an exceptional user experience.",
    },
    {
      img: "Security-Analysis.svg",
      title: "Thorough Security Analysis",
      description:
        "We conduct in-depth checks to ensure your data and applications are protected from threats and vulnerabilities.",
    },
    {
      img: "Continuous-follo.svg",
      title: "Continuous follow-up of the project",
      description:
        "We provide a tailored system to track your project's progress and offer accurate, up-to-date reports.",
    },

    {
      img: "Achieve-breakthrough.svg",
      title: "Achieve a breakthrough in your project",
      description:
        "We help propel your project forward with innovative and advanced solutions, delivering outstanding results.",
    },
    {
      img: "Scalable-Solutions.svg",
      title: "Scalable Solutions",
      description:
        "Our custom solutions are scalable to accommodate growth and increase the capacity to handle a larger number of users or data without impacting the speed or stability of the system",
    },
    {
      img: "Effortless-Maintenance.svg",
      title: "Effortless Maintenance, Maximum Performance",
      description:
        "Easily maintainable solutions, which means that the system or application we develop will be able to be flexibly updated and modified without affecting its performance.",
    },
    {
      img: "Reliable-Solutions.svg",
      title: "Reliable Solutions, Uninterrupted Performance",
      description:
        "Highly reliable solutions, which means that the system or application we provide will always be available to operate continuously without interruptions or errors.",
    },
  ];

  return (
    <div className="SliderService w-full h-full min-h-[400px] flex items-center justify-center">
      <div
        data-aos="zoom-in-up"
        data-aos-duration="800"
        data-aos-delay="300"
        className="max-w-full mt-5 px-12 md:max-w-4xl flex items-center justify-center gap-3 flex-col w-full h-full"
      >
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper w-full h-full"
        >
          {SlidersContect.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="p-5 flex items-center justify-center gap-3 flex-col w-full h-full">
                <img
                  src={`/${slide.img}`}
                  alt={slide.title}
                  className="w-full max-h-[201px]"
                />

                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl">{slide.title}</h3>
                  <p className="text-gray-200 font-light text-[20px] md:text-[24px]">
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SliderService;
