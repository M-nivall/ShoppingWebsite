import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bluebg } from '../assets';
import CartItem from '../components/CartItems';
import { toast } from 'react-toastify';
import axios from 'axios';

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [totalAmt, setTotalAmt] = useState(0);
  const [payNow, setPayNow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [productData]);

  const handleCheckout = () => {
    if (userInfo) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to checkout");
    }
  };

  const handlePayment = async () => {
      if (!phoneNumber.match(/^07\d{8}$/)) 
        {
        toast.error("Enter a valid Safaricom number (e.g. 07XXXXXXXX)");
        return;
      }

      if (!userInfo) {
        toast.error("User not logged in");
        return;
      }

      const payload = {
        phone: phoneNumber,
        totalAmount: totalAmt,
        items: productData.map(item => ({
          id: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        user: {
          uid: userInfo._id,
          name: userInfo.name,
          email: userInfo.email
        }
  };

  try {
    // ✅ Step 1: Submit order to backend
    const response = await axios.post("https://c2cb-197-156-143-231.ngrok-free.app/reactshopping/react/client/submit_order.php", payload);

    if (response.data.success) {
      const orderId = response.data.order_id; // ✅ Get the order ID
      toast.success(`Order #${orderId} saved! Initiating M-Pesa STK push...`);

      // ✅ Step 2: Send STK push with orderId included
      const stkResponse = await axios.post("https://c2cb-197-156-143-231.ngrok-free.app/reactshopping/react/client/stk_push.php", {
        //phone: phoneNumber,  // use this for the real paybill and style the following sandbox
        phone: "254708374149", // ✅ Safaricom sandbox test number
        amount: parseFloat(totalAmt),
        order_id: orderId // ✅ track the correct order
      });

      console.log("STK PUSH RESPONSE:", stkResponse.data); // 👈 ADD THIS

      if (stkResponse.data.CheckoutRequestID) {
        toast.success(`STK Push sent to ${phoneNumber}`);
      } else {
        toast.error("Failed to send STK push.");
      }

    } else {
      toast.error("Failed to save order: " + response.data.message);
    }
  } catch (error) {
    toast.error("Something went wrong while processing payment");
    console.error(error);
  }
};

  return (
    <div>
      <img 
        className='w-full h-60 object-cover'
        src={bluebg}
        alt='bluebg'
      />
      <div className='max-w-screen-xl mx-auto py-20 flex'>
        <CartItem />
        <div className='w-1/3 bg-[#fafafa] py-6 px-4 mr-10'>
          <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6'>
            <h2 className='text-2xl font-medium'>Cart Totals</h2>
            <p className='flex items-center gap-4 text-base'>
              Subtotal{" "}
              <span className='font-titleFont font-bold text-lg'>
                $ {totalAmt}
              </span>
            </p>
            <p className='flex items-start gap-4 text-base'>
              Shipping{" "}
              <span>
                Lorem ipsum - this is shipping details, remember to add anything.
              </span>
            </p>
          </div>
          <p className='font-titleFont font-semibold flex justify-between mt-5'>
            Total <span className='text-xl text-bold'>$ {totalAmt}</span>
          </p>

          {/* Only show this if payNow is false */}
          {!payNow && (
            <button 
              onClick={handleCheckout} 
              className='text-base bg-black text-white w-full py-3 mt-5 hover:bg-gray-800 duration-300'>
              Proceed to checkout
            </button>
          )}

          {/* Show phone number input if payNow is true */}
          {payNow && (
            <div className="mt-6">
              <label className='block text-base font-medium mb-2'>Enter M-Pesa Phone Number:</label>
              <input
                type="tel"
                placeholder="e.g. 0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-3"
              />
              <button 
                onClick={handlePayment} 
                className='bg-green-600 text-white py-2 w-full hover:bg-green-700'>
                Confirm & Pay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
