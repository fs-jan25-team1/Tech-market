import { useState } from 'react';
import Button from '@/components/atoms/button/Button';
import { ShoppingCart } from 'lucide-react';
import { ButtonTypes } from '@/types/ButtonTypes';
import { YouMayAlsoLikeSlider } from '@/components/organisms/YouMayAlsoLike/YouMayAlsoLike'; // <- поправив шлях

const COLORS = ['#1C1C1C', '#4D4D4D', '#EB5757'];
const CAPACITIES = ['128 GB', '256 GB'];

export const ItemCard = () => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(CAPACITIES[0]);

  return (
    <section className="bg-[#0F1121] text-[#F1F2F9] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1136px] mx-auto">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6">
          {/* Gallery section */}
          <div className="flex flex-col sm:flex-row-reverse gap-4">
            {/* Main image */}
            <div className="w-full sm:w-[calc(100%-4.5rem)] aspect-[3/4] min-h-[320px] bg-[#1F2133] rounded flex items-center justify-center">
              <img
                src="/img/phones/apple-iphone-14-pro/spaceblack/00.webp"
                alt="product"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 sm:overflow-y-auto sm:h-full sm:w-16 overflow-x-auto">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <img
                    key={i}
                    src={`/img/phones/apple-iphone-14-pro/spaceblack/0${i}.webp`}
                    alt={`iPhone 14 Pro image ${i}`}
                    className="w-14 h-14 object-cover border border-[#3B3E4A] rounded cursor-pointer shrink-0"
                  />
                ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-[montBold] leading-tight">
                Apple iPhone 14 Pro 128GB Space Black
              </h1>
              <div className="flex gap-4 items-center text-lg mt-2">
                <span className="text-white font-[montBold]">$999</span>
                <span className="text-[#75767F] line-through text-base">
                  $1199
                </span>
              </div>
            </div>

            {/* Color options */}
            <div>
              <p className="text-sm text-[#89939A] mb-2">Available colors</p>
              <div className="flex gap-2">
                {COLORS.map((color) => (
                  <Button
                    key={color}
                    variant={ButtonTypes.ghost}
                    bgColor={color}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200
                      ${selectedColor === color ? 'border-white' : 'border-transparent'}
                      hover:ring-2 hover:ring-white/40 hover:scale-105`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Capacity options */}
            <div>
              <p className="text-sm text-[#89939A] mb-2">Select capacity</p>
              <div className="flex gap-2">
                {CAPACITIES.map((cap) => (
                  <Button
                    key={cap}
                    content={cap}
                    variant={ButtonTypes.secondary}
                    className={`text-sm px-3 py-1 ${
                      selectedCapacity === cap ? 'border-white' : ''
                    }`}
                    onClick={() => setSelectedCapacity(cap)}
                  />
                ))}
              </div>
            </div>

            {/* Add to cart button */}
            <Button
              content="Add to cart"
              variant={ButtonTypes.primary}
              icon={ShoppingCart}
              iconSize={18}
              className="w-fit"
            />
          </div>
        </div>

        {/* About & tech specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div>
            <p className="text-lg font-semibold mb-2">About</p>
            <div className="text-sm text-[#89939A] space-y-3 leading-relaxed">
              <p>
                And then there was Pro. A transformative triple‑camera system
                that adds tons of capability without complexity. An
                unprecedented leap in battery life.
              </p>
              <p>
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </p>
              <p>
                The Super Retina XDR display is the brightest and sharpest
                iPhone display yet.
              </p>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-2">Tech specs</p>
            <ul className="text-sm text-[#89939A]">
              <li className="mb-2 flex justify-between">
                <span>Screen</span>
                <span className="text-white">6.1” OLED</span>
              </li>
              <li className="mb-2 flex justify-between">
                <span>Resolution</span>
                <span className="text-white">2556x1179</span>
              </li>
              <li className="mb-2 flex justify-between">
                <span>Processor</span>
                <span className="text-white">A16 Bionic</span>
              </li>
              <li className="mb-2 flex justify-between">
                <span>RAM</span>
                <span className="text-white">6 GB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* You may also like */}
        <div className="mt-14">
          <p className="text-2xl font-semibold mb-4">You may also like</p>
          <YouMayAlsoLikeSlider />
        </div>
      </div>
    </section>
  );
};
