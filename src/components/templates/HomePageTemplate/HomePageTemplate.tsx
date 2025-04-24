import styles from './HomePageTemplate.module.scss';
import { ImageSlider } from '@/components/organisms/BannerSlider/ImageSlider';
import { BrandNewSlider } from '@/components/organisms/BrandNewSlider/BrandNewSlider';
import { HotPricesSlider } from '@/components/organisms/HotPricesSlider/HotPricesSlider';
import { ShopCategories } from '@/components/organisms/ShopCategories/ShopCategories';
import { motion } from 'framer-motion';

export const HomePageTemplate = () => {
  return (
    <>
      <div className={styles.homePage}>
        <motion.h1
          className="text-[48px] font-[montBold] leading-[56px] tracking-[-1%] mt-[56px] col-span-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to nice gadgets store!
        </motion.h1>
        <div className="col-span-full lg:mb-[80px] sm:mb-[64px] mb-[56px]">
          <ImageSlider />
        </div>
        <div className="col-span-full lg:mb-[80px] sm:mb-[64px] mb-[56px]">
          <BrandNewSlider />
        </div>
        <div className="col-span-full">
          <ShopCategories />
        </div>
        <div className="col-span-full lg:mb-[80px] mb-[64px]">
          <HotPricesSlider />
        </div>
      </div>
    </>
  );
};

{
  /* <Button content={'Button'} variant={ButtonTypes.primary} />
<Button content={'1'} variant={ButtonTypes.numbered} />
<Button variant={ButtonTypes.arrow} icon={ChevronRight} disabled={true} />
<Button variant={ButtonTypes.arrow} icon={ChevronRight} />
<Button variant={ButtonTypes.selector} bgColor={ProductColor.cream} />
<Button variant={ButtonTypes.favourite} icon={Heart} iconSize={15} />
<Button content={'Back'} variant={ButtonTypes.back} icon={ChevronLeft} />
<br />
<br /> */
}

{
  /* <CustomDropdown
placeholder="Newest"
options={DropdownSortBy}
onValueChange={(value) => console.log('DropdownSortBy:', value)}
size="medium"
/> */
}

// const DropdownSortBy = [
//   { value: 'newest', label: 'Newest' },
//   { value: 'oldest', label: 'Oldest' },
//   { value: 'cheapest', label: 'Cheapest' },
//   { value: 'most-expensive', label: 'Most expensive' },
// ];
