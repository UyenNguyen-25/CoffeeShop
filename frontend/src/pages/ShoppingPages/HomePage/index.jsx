import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { useNavigate } from "react-router-dom";
import bg from '../../../assets/bg.jpg';

export default function HomePage() {
  const nav = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Swiper Section */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-screen w-full"
      >
        <SwiperSlide>
          <div className="relative h-screen w-full">
            <img
              className="object-cover h-full w-full"
              src={bg}
              alt="Landing Page"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center pl-[150px] text-white bg-opacity-50 bg-black">
              <h1 className="text-5xl font-bold drop-shadow-lg">
                Welcome to Coffee Haven!
              </h1>
              <p className="text-xl mt-10 drop-shadow-md">
              Coffee Shop is the place where you can get flavorful coffee strains  <br /> from global elite brands and roasters at very affordable price.
              </p>
              <button
                className="text-2xl border border-transparent bg-[#E44918] hover:bg-[#d63e12] rounded-full text-white px-6 py-3 mt-10 transition duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => nav("/products?page=1&per_page=8")}
              >
                Start Shopping
              </button>
            </div>
          </div>
        </SwiperSlide>
        {/* Add more SwiperSlides as needed */}
      </Swiper>
    </div>
  );
}
