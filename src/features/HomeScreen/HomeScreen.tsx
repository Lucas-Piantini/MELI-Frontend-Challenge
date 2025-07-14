// Página de inicio con banners
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const images = [
  "images/homeBanner1.png",
  "images/homeBanner2.png",
  "images/homeBanner3.png",
  "images/homeBanner4.png",
  "images/homeBanner5.png",
];

const HomeScreen = () => {
  return (
    <div className="relative w-full h-40 md:h-[300px] lg:h-[500px]">
      {/* Libreria de swiper para banners */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={process.env.NODE_ENV !== "test" && images.length > 1}
        slidesPerView={1}
        slidesPerGroup={1}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Banner ${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default HomeScreen;
