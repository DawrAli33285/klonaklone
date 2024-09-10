import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "../Botprofile.css";

const SliderComponent = () => {
    return (
        <div className="px-[20px] py-[40px] w-full border-b-[1px] border-b-[#888fd4]">
            <Swiper
                spaceBetween={20} // Adds space between slides
                slidesPerView={2} // Shows two slides at a time
                loop={true} // Enables looping
            >
                <SwiperSlide>
                    <div className="rounded-[10px] flex flex-col bg-[#3a355793] gap-[20px]">
                        <span className="w-full h-[200px]">
                            <img
                                src="http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png"
                                className="w-full h-full object-cover rounded-tl-[10px] rounded-bl-[10px]"
                                alt="slide image"
                            />
                        </span>
                        <span className="flex flex-col w-[60%] px-[10px] p-[20px]">
                            <p className="text-white font-semibold text-[14px]">Colian</p>
                            <p className="text-[#CFCFCF] text-[10px]">Lorem ipsum dolor sit amet...</p>
                        </span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-[10px] flex flex-col bg-[#3a355793] gap-[20px]">
                        <span className="w-full h-[200px]">
                            <img
                                src="http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png"
                                className="w-full h-full object-cover rounded-tl-[10px] rounded-bl-[10px]"
                                alt="slide image"
                            />
                        </span>
                        <span className="flex flex-col w-[60%] px-[10px] p-[20px]">
                            <p className="text-white font-semibold text-[14px]">Colian</p>
                            <p className="text-[#CFCFCF] text-[10px]">Lorem ipsum dolor sit amet...</p>
                        </span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-[10px] flex flex-col bg-[#3a355793] gap-[20px]">
                        <span className="w-full h-[200px]">
                            <img
                                src="http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png"
                                className="w-full h-full object-cover rounded-tl-[10px] rounded-bl-[10px]"
                                alt="slide image"
                            />
                        </span>
                        <span className="flex flex-col w-[60%] px-[10px] p-[20px]">
                            <p className="text-white font-semibold text-[14px]">Colian</p>
                            <p className="text-[#CFCFCF] text-[10px]">Lorem ipsum dolor sit amet...</p>
                        </span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-[10px] flex flex-col bg-[#3a355793] gap-[20px]">
                        <span className="w-full h-[200px]">
                            <img
                                src="http://data.gmini.ai/api/files/yttfv3r7vgmd959/5bg7d0trgmudz0d/williammedina_portrait_of_cybernetic_digital_demon_with_neon_bd25f819_caa8_4ae8_848a_54eb6861a19d_1_gLw85R8KFy.png"
                                className="w-full h-full object-cover rounded-tl-[10px] rounded-bl-[10px]"
                                alt="slide image"
                            />
                        </span>
                        <span className="flex flex-col w-[60%] px-[10px] p-[20px]">
                            <p className="text-white font-semibold text-[14px]">Colian</p>
                            <p className="text-[#CFCFCF] text-[10px]">Lorem ipsum dolor sit amet...</p>
                        </span>
                    </div>
                </SwiperSlide>
                {/* Add more SwiperSlide elements as needed */}
            </Swiper>
        </div>
    );
};

export default SliderComponent;
