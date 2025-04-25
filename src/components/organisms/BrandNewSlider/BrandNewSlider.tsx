import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { ProductCard } from '@/components/organisms/ProductCard/ProductCard';
import Button from '@/components/atoms/button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ButtonTypes } from '@/types/ButtonTypes';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

//тут делаю под грид
import styles from './BrandNewSlider.module.scss';

export const BrandNewSlider = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const mockArray = Array.from({ length: 10 }, (_, i) => i + 1);
  const { ref, inView } = useInView({
    threshold: 0.2, //юзаем когда 20% элемента видно
  });

  return (
    <section className={styles.brandNew}>
      <motion.h2
        ref={ref}
        className="col-span-full text-2xl sm:text-3xl text-[#F1F2F9] font-[MontBold] mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 50,
        }}
        transition={{ duration: 1 }}
      >
        Brand new models
      </motion.h2>

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
            prevEl: '#brandNewPrev',
            nextEl: '#brandNewNext',
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
            id="brandNewPrev"
            className={`${isBeginning ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Button variant={ButtonTypes.arrow} icon={ChevronLeft} />
          </div>
          <div
            id="brandNewNext"
            className={`${isEnd ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Button variant={ButtonTypes.arrow} icon={ChevronRight} />
          </div>
        </div>
      </div>
    </section>
  );
};
