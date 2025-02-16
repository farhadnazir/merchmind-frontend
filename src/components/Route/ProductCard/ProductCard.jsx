import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import Ratings from "../../Products/Ratings";
import { toast } from "react-toastify";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="relative m-2 flex w-[280px] h-[400px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-xl transition duration-300 ease-in-out z-0">
      {/* Icons in top-right corner */}
      <div className="absolute top-5 right-5 flex flex-col gap-2 z-10">
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer text-red-500 bg-black rounded-lg p-1"
            onClick={() => removeFromWishlistHandler(data)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            color="white"
            className="cursor-pointer text-gray-500 bg-[black] rounded-lg p-1"
            onClick={() => addToWishlistHandler(data)}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          color="white"
          className="cursor-pointer bg-[black] rounded-lg p-1 text-gray-500"
          onClick={() => setOpen(!open)}
          title="Quick view"
        />
      </div>

      {/* Product Image Section */}
      <Link
        to={
          isEvent
            ? `/product/${data._id}?isEvent=true`
            : `/product/${data._id}`
        }
        className="relative mx-3 mt-3 flex h-40"
      >
        <img
          className="object-cover w-full h-[full] rounded-lg object-cover"
          src={`${data.images && data.images[0]?.url}`}
          alt="product image"
        />
        {data.discountPrice && data.originalPrice !== data.discountPrice && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-sm  font-medium text-white">
            {Math.round(
              ((data.originalPrice - data.discountPrice) / data.originalPrice) *
                100
            )}
            % OFF
          </span>
        )}
      </Link>

      {/* Product Details Section */}
      <div className="mt-4 px-3 pb-5">
        {/* Shop Name and Sold Out */}
        <div className="flex items-center justify-between">
          <Link
            to={`/shop/preview/${data?.shop._id}`}
            className="text-sm text-blue-500 hover:underline"
          >
            {data.shop.name}
          </Link>
          <span className="font-medium text-sm text-green-500">
            {data?.sold_out} sold
          </span>
        </div>

        {/* Product Name */}
        <Link
          to={
            isEvent
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
        >
          <h5 className="text-lg font-medium text-slate-900 truncate">
            {data.name}
          </h5>
        </Link>

        {/* Price and Ratings */}
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p className="mb-0">
            <span className="text-lg font-bold text-slate-900">
              ${data.discountPrice}
            </span>
            {data.originalPrice && data.originalPrice !== data.discountPrice && (
              <span className="text-xs text-slate-900 line-through ml-2">
                ${data.originalPrice}
              </span>
            )}
          </p>
          <Ratings rating={data?.ratings} />
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCartHandler(data._id)}
          className="w-full flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 mt-5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <AiOutlineShoppingCart className="mr-2" size={18} />
          Add to cart
        </button>
      </div>

      {/* Quick View Modal */}
      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </div>
  );
};

export default ProductCard;
