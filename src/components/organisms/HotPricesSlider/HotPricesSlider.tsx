import { useEffect, useState } from 'react';
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

//Тут делаю все под грид
import styles from './HotPricesSlider.module.scss';
import { fetchProducts } from '@/features/productsSlice';
import { CategoryType } from '@/types/CategoryType';
import { FilterStatus } from '@/types/FilterStatusType';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Loader } from '@/components/atoms/Loader/Loader';

export const HotPricesSlider = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const dispatch = useAppDispatch();
  const { productsList, isLoading } = useAppSelector((store) => store.products);
  const { ref, inView } = useInView({
    threshold: 0.2, //юзаем когда 20% элемента видно
  });

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: CategoryType.phones,
        sortBy: FilterStatus.newest,
      }),
    );
  }, [dispatch]);

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
        Hot Prices
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
          {isLoading ? (
            <SwiperSlide>
              <div className="col-span-full grid">
                <Loader />
              </div>
            </SwiperSlide>
          ) : (
            productsList.slice(0, 12).map((product) => (
              <SwiperSlide key={product.id} className="!shrink">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  priceRegular={product.fullPrice}
                  priceDiscount={product.price}
                  img={product.image}
                  screen={product.screen}
                  capacity={product.capacity}
                  ram={product.ram}
                />
              </SwiperSlide>
            ))
          )}
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
