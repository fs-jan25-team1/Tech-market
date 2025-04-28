import { useState, useEffect } from 'react';
import Button from '@/components/atoms/button/Button';
import { ShoppingCart, Heart } from 'lucide-react';
import { ButtonTypes } from '@/types/ButtonTypes';
import { YouMayAlsoLikeSlider } from '@/components/organisms/YouMayAlsoLike/YouMayAlsoLike';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductDetails,
  clearProductDetails,
} from '../../../features/productDetailsSlice';
import { RootState, AppDispatch } from '../../../store/store';

const COLORS = ['#1C1C1C', '#4D4D4D', '#EB5757'];
const CAPACITIES = ['128 GB', '256 GB'];

export const ItemCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.productDetails);
  const { productId } = useParams<{ productId: string }>();
  useEffect(() => {
    if (productId) {
      dispatch(
        fetchProductDetails({
          id: Number(productId),
        }),
      );
    }

    return () => {
      dispatch(clearProductDetails());
    };
  }, [productId, dispatch]);

  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(CAPACITIES[0]);

  const handleFavoritesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toast.success('Added to favorites', {
      style: {
        background: '#161827',
        color: '#F1F2F9',
        border: '1px solid #3B3E4A',
      },
    });
  };

  const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toast.success('Added to cart', {
      style: {
        background: '#161827',
        color: '#F1F2F9',
        border: '1px solid #3B3E4A',
      },
    });
  };

  return (
    <section className="bg-[#0F1121] text-[#F1F2F9] py-10 px-4 sm:px-6 lg:px-0">
      <div className="max-w-[1136px] mx-auto flex flex-col gap-16 lg:gap-20">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-[montBold] leading-tight">
            {product?.name}
          </h1>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="flex flex-col sm:flex-row-reverse gap-4">
            {/* Main image */}
            <div className="w-full sm:w-2/3 aspect-square bg-[#1F2133] rounded flex items-center justify-center">
              <img
                src={product?.images[0]}
                alt="product"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible sm:w-1/3">
              {product?.images.map((imageUrl, i) => (
                <img
                  key={i}
                  src={`/${imageUrl}`}
                  alt={`Product image ${i}`}
                  className="w-20 h-20 object-cover border border-[#3B3E4A] rounded cursor-pointer shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6 items-start text-left px-6 w-full">
            {/* Colors */}
            <div className="w-full">
              <div>
                <p className="text-sm text-[#89939A] mb-4">Available colors</p>
                <div className="flex gap-2 mb-4">
                  {product?.colorsAvailable.map((color) => (
                    <Button
                      key={color}
                      variant={ButtonTypes.ghost}
                      bgColor={color}
                      className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-white'
                          : 'border-transparent'
                      } hover:ring-2 hover:ring-white/40 hover:scale-105`}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div className="w-full mb-6">
                <p className="text-sm text-[#89939A] mb-4">Select capacity</p>
                <div className="flex gap-4">
                  {product?.capacityAvailable.map((cap) => (
                    <Button
                      key={cap}
                      content={cap}
                      variant={ButtonTypes.secondary}
                      color={selectedCapacity === cap ? '#0F1121' : '#F1F2F9'}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200
                        ${
                          selectedCapacity === cap
                            ? 'bg-white border-white hover:border-white'
                            : 'bg-transparent border-[#3B3E4A] hover:border-white hover:text-white'
                        }
                      `}
                      onClick={() => setSelectedCapacity(cap)}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex gap-4 items-center text-lg mb-6">
                <span className="text-white font-[montBold]">
                  {product?.priceDiscount}
                </span>
                <span className="text-[#75767F] line-through text-base">
                  {product?.priceRegular}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex w-full gap-2 mb-8">
                <Button
                  content="Add to cart"
                  variant={ButtonTypes.primary}
                  icon={ShoppingCart}
                  iconSize={18}
                  className="flex-1"
                  onClick={handleAddToCartClick}
                />
                <Button
                  variant={ButtonTypes.favourite}
                  icon={Heart}
                  iconSize={18}
                  className="w-12 h-12"
                  onClick={handleFavoritesClick}
                />
              </div>

              {/* Short tech specs */}
              <div className="flex flex-col gap-1 text-xs sm:text-sm text-[#89939A] w-full">
                <div className="flex justify-between">
                  <span>Screen:</span>
                  <span className="text-white">{product?.screen} OLED</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="text-white">{product?.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processor:</span>
                  <span className="text-white">{product?.processor}</span>
                </div>
                <div className="flex justify-between">
                  <span>RAM:</span>
                  <span className="text-white">{product?.ram}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About and Tech specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          <div>
            <p className="text-lg font-semibold mb-4">About</p>
            <div className="text-sm text-[#89939A] space-y-6 leading-relaxed">
              {product?.description.map((desc) => (
                <div>
                  <h4 className="text-white text-base font-semibold mb-2">
                    {desc.text}
                  </h4>
                  <p>{desc.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4">Tech specs</p>
            <ul className="text-sm text-[#89939A] space-y-2">
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
        <div className="mt-20">
          <YouMayAlsoLikeSlider />
        </div>
      </div>
    </section>
  );
};
