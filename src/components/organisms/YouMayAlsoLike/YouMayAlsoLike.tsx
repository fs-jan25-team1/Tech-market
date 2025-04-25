import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';
import Button from '@/components/atoms/button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ButtonTypes } from '@/types/ButtonTypes';

import styles from './YouMayAlsoLike.module.scss';

export const YouMayAlsoLikeSlider = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const mockArray = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <section
      className={`${styles.youMayAlsoLike} bg-[#0F1121] py-10 overflow-hidden`}
    >
      <h2 className="col-span-full text-2xl sm:text-3xl text-[#F1F2F9] font-[MontBold] mb-6">
        You may also like
      </h2>

      <div className="col-span-full relative">
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
            prevEl: '#youMayLikePrev',
            nextEl: '#youMayLikeNext',
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
            id="youMayLikePrev"
            className={`${isBeginning ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Button variant={ButtonTypes.arrow} icon={ChevronLeft} />
          </div>
          <div
            id="youMayLikeNext"
            className={`${isEnd ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Button variant={ButtonTypes.arrow} icon={ChevronRight} />
          </div>
        </div>
      </div>
    </section>
  );
};
