import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from 'react-19-credit-cards';
import './CheckoutPage.scss';
import Button from '@/components/atoms/button/Button';
import { ButtonTypes } from '@/types/ButtonTypes';

export const CheckoutPage = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigate('/');
    }, 3000);
  };

  return (
    <div
      className="checkoutPage relative grid grid-cols-4 gap-4 
      min-[640px]:grid-cols-12
      min-[1200px]:grid-cols-24 px-4
      min-[640px]:px-6
      min-[1200px]:px-0
      min-[1200px]:max-w-[1136px] mx-auto
      pt-6 pb-16
      min-[640px]:pt-10 min-[640px]:pb-16
      min-[1200px]:pt-10 min-[1200px]:pb-20 
      gap-y-10"
    >
      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 flex justify-center items-center bg-[#0f1121]/50 z-50 animate-fade-in">
          <div className="bg-[#f1f2f9] text-black px-8 py-6 rounded-2xl shadow-xl text-xl font-semibold">
            Thanks for shopping with us!
          </div>
        </div>
      )}

      {/* Title */}
      <h1 className="col-span-4 min-[640px]:col-span-12 min-[1200px]:col-span-24 text-4xl font-bold mb-10">
        Checkout
      </h1>

      {/* Card Preview */}
      <div className="col-span-4 min-[640px]:col-span-6 min-[1200px]:col-span-10 flex items-center justify-center">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={
            state.focus as 'number' | 'expiry' | 'cvc' | 'name' | undefined
          }
        />
      </div>

      {/* Payment Form */}
      <form
        onSubmit={handleSubmit}
        className="col-span-4 min-[640px]:col-span-6 min-[1200px]:col-span-14 bg-[#161827] p-6 min-[640px]:p-8 rounded-2xl shadow-md flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <label htmlFor="number" className="mb-2 text-[#75767f] text-sm">
            Card Number
          </label>
          <input
            type="text"
            name="number"
            id="number"
            placeholder="1234 5678 9012 3456"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="p-3 rounded-lg bg-[#323542] border border-[#3b3e4a] focus:outline-none focus:ring-2 focus:ring-[#905bff] text-[#f1f2f9]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-[#75767f] text-sm">
            Cardholder Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="p-3 rounded-lg bg-[#323542] border border-[#3b3e4a] focus:outline-none focus:ring-2 focus:ring-[#905bff] text-[#f1f2f9]"
          />
        </div>

        <div className="flex flex-col min-[1200px]:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <label htmlFor="expiry" className="mb-2 text-[#75767f] text-sm">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiry"
              id="expiry"
              placeholder="MM/YY"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="p-3 rounded-lg bg-[#323542] border border-[#3b3e4a] focus:outline-none focus:ring-2 focus:ring-[#905bff] text-[#f1f2f9]"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label htmlFor="cvc" className="mb-2 text-[#75767f] text-sm">
              CVC
            </label>
            <input
              type="text"
              name="cvc"
              id="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="p-3 rounded-lg bg-[#323542] border border-[#3b3e4a] focus:outline-none focus:ring-2 focus:ring-[#905bff] text-[#f1f2f9]"
            />
          </div>
        </div>

        <Button
          variant={ButtonTypes.primary}
          content={'Pay Now'}
          width="100%"
        />
      </form>
    </div>
  );
};
