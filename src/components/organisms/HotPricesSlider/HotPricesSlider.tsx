import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';
import Button from '@/components/atoms/button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ButtonTypes } from '@/types/ButtonTypes';

export const HotPricesSlider = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const mockArray = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className="px-4 sm:px-6 xl:px-20 py-10 bg-[#0F1121] overflow-hidden">
      <h2 className="text-2xl sm:text-3xl text-[#F1F2F9] font-[MontBold] mb-6">
        Hot prices
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.3}
          breakpoints={{
            640: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.3 },
            1280: { slidesPerView: 4.3 },
          }}
          navigation={{
            prevEl: '#hotPricesPrev',
            nextEl: '#hotPricesNext',
          }}
          onSwiper={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {mockArray.map((num) => (
            <SwiperSlide key={num} className="!shrink">
              <ProductCard />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-[-60px] right-0 flex gap-2">
          <div
            id="hotPricesPrev"
            className={`${isBeginning ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Button variant={ButtonTypes.arrow} icon={ChevronLeft} />
          </div>
          <div
            id="hotPricesNext"
            className={`${isEnd ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Button variant={ButtonTypes.arrow} icon={ChevronRight} />
          </div>
        </div>
      </div>
    </section>
  );
};
