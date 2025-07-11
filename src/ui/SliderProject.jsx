import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./SliderProject.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function SliderProject({ projectImags }) {
  if (!Array.isArray(projectImags) || projectImags.length === 0) return null;

  return (
    <div className="SliderProject">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        autoHeight={true}
        className="mySwiper"
      >
        {projectImags.map((projectImags, i) => (
          <SwiperSlide key={i} className="w-full">
            <div className="p-5 flex flex-col items-center justify-center gap-2 rounded-lg overflow-hidden overflow-y-auto">
              <img
                className="duration-300 transition-all rounded-lg"
                src={projectImags}
                alt={i}
                style={{ userSelect: "none" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SliderProject;
