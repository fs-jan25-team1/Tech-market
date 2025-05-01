import { useState, useEffect } from 'react';
import Button from '@/components/atoms/button/Button';
import { Heart } from 'lucide-react';
import { ButtonTypes } from '@/types/ButtonTypes';
import { YouMayAlsoLikeSlider } from '@/components/organisms/YouMayAlsoLike/YouMayAlsoLike';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  fetchProductDetails,
  findProductId,
} from '../../../features/productDetailsSlice';
import { addFavourite, removeFavourite } from '@/features/favouritesSlice';
import { addToCart, removeFromCart } from '@/features/cartSlice';
import { Loader } from '@/components/atoms/Loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';
import { CategoryType } from '@/types/CategoryType';
import { useSelector } from 'react-redux';
import {
  selectProductCategory,
  setCurrentCategory,
} from '@/features/productsSlice';

export const ItemCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useAppSelector(
    (store) => store.productDetails,
  );
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    if (productId) {
      dispatch(
        fetchProductDetails({
          id: Number(productId),
        }),
      );
    }
  }, [productId, dispatch]);

  const category = useSelector(selectProductCategory);

  useEffect(() => {
    if (
      product?.basicInfo?.category &&
      category !== product.basicInfo.category
    ) {
      dispatch(setCurrentCategory(product.basicInfo.category));
    }
  }, [product, category, dispatch]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  const favourites = useAppSelector((store) => store.favourites.items);
  const cart = useAppSelector((store) => store.cart.items);
  const isCurrentlyFavourite = favourites.some((item) =>
    productId ? item.id === +productId : 0,
  );
  const isInCart = Object.values(cart).some((el) =>
    productId ? el.product.id === +productId : 0,
  );

  const handleFetchProduct = async (newProductId: string) => {
    const result = await dispatch(findProductId({ newProductId }));
    console.log(result);
    if (findProductId.fulfilled.match(result)) {
      navigate(`/product/${result.payload.id}`);
    }
  };

  const handleColorClick = (color: string) => {
    if (product?.namespaceId && product.color) {
      const newItemId = `${product.namespaceId}-${product.capacity.toLowerCase().replace(/\s/g, '-')}-${color.toLowerCase().replace(/\s/g, '-')}`;
      handleFetchProduct(newItemId);
    }
  };

  const handleMemoryClick = (capacity: string) => {
    if (product?.namespaceId && product.capacity) {
      const newItemId = `${product.namespaceId}-${capacity.toLowerCase().replace(/\s/g, '-')}-${product.color.toLowerCase().replace(/\s/g, '-')}`;
      handleFetchProduct(newItemId);
    }
  };

  const handleFavoritesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isCurrentlyFavourite) {
      if (product?.basicInfo?.id) {
        dispatch(removeFavourite(product.basicInfo.id));
        toast.success(`${product.basicInfo.name} removed from favorites`, {
          style: {
            background: '#161827',
            color: '#F1F2F9',
            border: '1px solid #3B3E4A',
          },
        });
      }
    } else {
      if (product?.basicInfo?.id) {
        dispatch(
          addFavourite({
            id: product?.basicInfo?.id,
            category: '',
            itemId: '',
            name: product.basicInfo.name,
            fullPrice: product.basicInfo.fullPrice,
            price: product.basicInfo.price,
            screen: product.basicInfo.screen,
            capacity: product.basicInfo.capacity,
            color: product.basicInfo.color,
            ram: product.basicInfo.ram,
            year: product.basicInfo.year,
            image: product.basicInfo.image,
          }),
        );
        toast.success(`${product.basicInfo.name} added to favorites`, {
          style: {
            background: '#161827',
            color: '#F1F2F9',
            border: '1px solid #3B3E4A',
          },
        });
      }
    }
  };

  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!product?.basicInfo?.id) return;

    const productDetails = {
      id: product.basicInfo.id,
      category: '',
      itemId: '',
      name: product.basicInfo.name,
      fullPrice: product.basicInfo.fullPrice,
      price: product.basicInfo.price,
      screen: product.basicInfo.screen,
      capacity: product.basicInfo.capacity,
      color: product.basicInfo.color,
      ram: product.basicInfo.ram,
      year: product.basicInfo.year,
      image: product.basicInfo.image,
    };

    if (isInCart) {
      dispatch(removeFromCart({ productId: product.basicInfo.id }));
      toast.success(`${product.basicInfo.name} removed from cart`, {
        style: {
          background: '#161827',
          color: '#F1F2F9',
          border: '1px solid #3B3E4A',
        },
      });
    } else {
      dispatch(addToCart({ product: productDetails }));
      toast.success(`${product.basicInfo.name} added to cart`, {
        style: {
          background: '#161827',
          color: '#F1F2F9',
          border: '1px solid #3B3E4A',
        },
      });
    }
  };

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
    if (mainSwiper) {
      mainSwiper.slideTo(index);
      mainSwiper.autoplay.stop();
    }
  };

  return (
    <section className="bg-[#0F1121] text-[#F1F2F9]">
      {isLoading ? (
        <div className="col-span-full grid min-h-[75vh]">
          <Loader />
        </div>
      ) : (
        <div
          className="grid grid-cols-4 gap-4 
            min-[640px]:grid-cols-12
            min-[1200px]:grid-cols-24 px-4
            min-[640px]:px-8
            min-[1200px]:px-0
            min-[1200px]:max-w-[1136px] mx-auto
            pt-14 pb-4
            min-[640px]:pt-18 min-[640px]:pb-6
            min-[1200px]:pt-18 min-[1200px]:pb-10 
            gap-y-0"
        >
          {/* Title */}
          <div
            className="col-span-full mb-8
              min-[640px]:mb-10
              text-[#F1F2F9]
              font-[montBold] leading-tight
              text-[22px]
              min-[640px]:text-[32px]"
          >
            <h1>{product?.name}</h1>
          </div>

          {/* Content */}
          <div className="col-span-full grid grid-cols-4 min-[640px]:grid-cols-12 min-[1200px]:grid-cols-24 gap-4 mb-14 min-[640px]:mb-16 min-[1200px]:mb-20">
            {/* Gallery (Thumbnails + Main image) */}
            <div className="col-span-full min-[640px]:col-span-7 min-[1200px]:col-span-12 mb-10">
              <div className="grid grid-cols-4 min-[640px]:grid-cols-7 min-[1200px]:grid-cols-12 gap-4">
                {/* Thumbnails */}
                <div className="col-span-full min-[640px]:col-span-1 min-[640px]:col-start-1 min-[1200px]:col-span-2 order-2 min-[640px]:order-1">
                  <div className="grid grid-cols-4 min-[640px]:grid-cols-1 gap-2">
                    {product?.images.map((imageUrl, i) => (
                      <div
                        key={i}
                        className={`col-span-1 aspect-square cursor-pointer border border-[#3B3E4A] ${
                          activeImageIndex === i
                            ? 'border-[#F1F2F9] border-2'
                            : ''
                        }`}
                        onClick={() => handleThumbnailClick(i)}
                      >
                        <img
                          src={`/${imageUrl}`}
                          alt={`Product image ${i}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main image */}
                <div className="col-span-full min-[640px]:col-span-6 min-[640px]:col-start-2 min-[1200px]:col-span-10 min-[1200px]:col-start-3 order-1 min-[640px]:order-2 aspect-square flex items-center justify-center">
                  {product?.images && product.images.length > 0 ? (
                    <Swiper
                      spaceBetween={10}
                      navigation={false}
                      onSwiper={setMainSwiper}
                      onSlideChange={(swiper) =>
                        setActiveImageIndex(swiper.activeIndex)
                      }
                      modules={[Navigation, Autoplay]}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                      }}
                      className="w-full h-full"
                    >
                      {product.images.map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={`/${imageUrl}`}
                            alt={`Product image ${index}`}
                            className="w-full h-full object-contain"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="w-full h-full border border-[#3B3E4A] flex items-center justify-center text-[#89939A]">
                      No images available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="col-span-full min-[640px]:col-span-5 min-[1200px]:col-span-7 min-[1200px]:col-start-14">
              <div className="grid grid-cols-4 min-[640px]:grid-cols-5 min-[1200px]:grid-cols-7 gap-4">
                <div className="col-span-full">
                  {/* Colors */}
                  <div className="mb-6 border-b border-[#3B3E4A] pb-6">
                    <p className="text-sm text-[#89939A] mb-2">
                      Available colors
                    </p>
                    <div className="inline-grid grid-cols-6 gap-2">
                      {product?.colorsAvailable.map((color) => (
                        <div key={color} className="col-span-1">
                          <Button
                            variant={ButtonTypes.selector}
                            bgColor={color}
                            className={`transition-all duration-200 ${
                              product.color === color
                                ? '!border-2 !border-[#F1F2F9]'
                                : 'border-2 border-[#3B3E4A]'
                            } hover:ring-2 hover:ring-white/40 hover:scale-105`}
                            onClick={() => handleColorClick(color)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-8 border-b border-[#3B3E4A] pb-6">
                    <p className="text-sm text-[#89939A] mb-2">
                      Select capacity
                    </p>
                    <div className="inline-grid grid-cols-5 gap-2">
                      {product?.capacityAvailable.map((cap) => (
                        <div key={cap} className="col-span-1">
                          <Button
                            content={cap}
                            variant={ButtonTypes.secondary}
                            color={
                              product.capacity === cap ? '#0F1121' : '#F1F2F9'
                            }
                            className={`
                              px-2 h-8 w-full text-sm font-medium border transition-all duration-200 
                              ${
                                product.capacity === cap
                                  ? 'bg-white border-white hover:border-white'
                                  : 'bg-transparent border-[#3B3E4A] hover:border-white hover:text-white'
                              }
                            `}
                            onClick={() => handleMemoryClick(cap)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="inline-grid grid-cols-2 gap-2 items-center text-lg mb-4">
                    <div className="col-span-1">
                      <span className="text-white font-[montBold]">
                        {product?.priceDiscount} $
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-[#75767F] line-through text-base">
                        {product?.priceRegular} $
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mb-8">
                    <div className="flex gap-2 mb-8">
                      <Button
                        content={isInCart ? 'In cart' : 'Add to cart'}
                        variant={ButtonTypes.primary}
                        iconSize={18}
                        height={48}
                        onClick={handleAddToCartClick}
                        className={`flex-1 ${isInCart ? 'active' : ''}`}
                      />
                      <Button
                        variant={ButtonTypes.favourite}
                        icon={Heart}
                        iconSize={16}
                        height={48}
                        width={48}
                        onClick={handleFavoritesClick}
                        className={`${isCurrentlyFavourite ? 'active' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Short tech specs */}
                  <div className="flex flex-col gap-1 text-xs sm:text-sm text-[#89939A]">
                    <div className="flex justify-between gap-2 text-[12px]">
                      <span className="min-w-[80px]">Screen:</span>
                      <span className="text-white max-w-[200px] text-right break-words">
                        {product?.screen}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="min-w-[80px]">Resolution:</span>
                      <span className="text-white max-w-[200px] text-right break-words">
                        {product?.resolution}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="min-w-[80px]">Processor:</span>
                      <span className="text-white max-w-[200px] text-right break-words">
                        {product?.processor}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="min-w-[80px]">RAM:</span>
                      <span className="text-white max-w-[200px] text-right break-words">
                        {product?.ram}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About and Tech specs */}
          <div className="col-span-full grid grid-cols-4  min-[1200px]:grid-cols-24 gap-4 mb-20">
            <div className="col-span-full min-[640px]:col-span-7 min-[1200px]:col-span-12">
              <p className="col-span-full text-[22px] font-semibold border-b border-[#3B3E4A] pb-4 mb-8">
                About
              </p>
              <div className="col-span-full text-sm text-[#89939A] leading-relaxed">
                {product?.description.map((desc, i) => (
                  <div key={i} className="mb-8">
                    <h4 className="text-white text-base font-semibold text-[20px] mb-4">
                      {desc.title}
                    </h4>
                    <p className="text-[14px]">{desc.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-full min-[640px]:col-span-5 min-[1200px]:col-span-11 min-[1200px]:col-start-14">
              <p className="text-[22px] font-semibold border-b border-[#3B3E4A] pb-4 mb-8">
                Tech specs
              </p>
              <ul className="text-[14px] text-[#89939A] space-y-2">
                <li className="flex justify-between">
                  <span>Screen</span>
                  <span className="text-white">{product?.screen}</span>
                </li>
                <li className="flex justify-between">
                  <span>Resolution</span>
                  <span className="text-white">{product?.resolution}</span>
                </li>
                <li className="flex justify-between">
                  <span>Processor</span>
                  <span className="text-white">{product?.processor}</span>
                </li>
                <li className="flex justify-between">
                  <span>RAM</span>
                  <span className="text-white">{product?.ram}</span>
                </li>
                <li className="flex justify-between">
                  <span>Built-in memory</span>
                  <span className="text-white">{product?.capacity}</span>
                </li>
                <li className="flex justify-between">
                  <span>Camera</span>
                  <span className="text-white">{product?.camera}</span>
                </li>
                <li className="flex justify-between">
                  <span>Zoom</span>
                  <span className="text-white">{product?.zoom}</span>
                </li>
                <li className="flex justify-between">
                  <span>Cell</span>
                  <span className="text-white">{product?.cell}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* You may also like */}
          <div className="col-span-full">
            <YouMayAlsoLikeSlider category={CategoryType.phones} />
          </div>
        </div>
      )}
    </section>
  );
};
