import { Link } from 'react-router-dom';
import styles from './ShopCategories.module.scss';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const ShopCategories = () => {
  const { ref, inView } = useInView({
    threshold: 0.2, //юзаем когда 20% элемента видно
  });

  return (
    <section className={styles.shopCategories}>
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
        Shop by category
      </motion.h2>

      <div className="col-span-full flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:flex-wrap lg:flex-nowrap">
        {/* Mobile phones */}
        <Link
          to="/phones"
          className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 animate-fade-up"
        >
          <img
            className="w-[288px] h-[288px] sm:w-[187px] sm:h-[187px] lg:w-[368px] lg:h-[368px] object-cover shadow-md transition-transform duration-300 hover:scale-101"
            src="/src/assets/categories/phones.png"
            alt="category-mobile-phones"
          />
          <h4 className="mt-4 text-xl font-semibold transition-opacity duration-300 hover:opacity-80">
            Mobile phones
          </h4>
          <h6 className="text-grey">95 models</h6>
        </Link>

        {/* Tablets */}
        <Link
          to="/tablets"
          className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 animate-fade-up"
        >
          <img
            className="w-[288px] h-[288px] sm:w-[187px] sm:h-[187px] lg:w-[368px] lg:h-[368px] object-cover shadow-md transition-transform duration-300 hover:scale-101"
            src="/src/assets/categories/tablets.png"
            alt="category-tablets"
          />
          <h4 className="mt-4 text-xl font-semibold transition-opacity duration-300 hover:opacity-80">
            Tablets
          </h4>
          <h6 className="text-[#F1F2F9]">24 models</h6>
        </Link>

        {/* Accessories */}
        <Link
          to="/accessories"
          className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 animate-fade-up"
        >
          <img
            className="w-[288px] h-[288px] sm:w-[187px] sm:h-[187px] lg:w-[368px] lg:h-[368px] object-cover shadow-md transition-transform duration-300 hover:scale-101"
            src="/src/assets/categories/accss.png"
            alt="category-accessories"
          />
          <h4 className="mt-4 text-xl font-semibold transition-opacity duration-300 hover:opacity-80">
            Accessories
          </h4>
          <h6 className="text-grey">100 models</h6>
        </Link>
      </div>
    </section>
  );
};
