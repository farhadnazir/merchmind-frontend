import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-around md:items-center sm:px-12 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 py-7">
        <h3 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[white]">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h3>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-start">
        <ul className="px-5 text-start sm:text-start flex sm:block flex-col items-center">
          <img
            src="/main-logo-black.png"
            alt=""
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <br />
          <p>The home and elements needeed to create beatiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-start sm:text-start">
          <h3 className="mb-1 font-semibold">Company</h3>
          {footerProductLinks.map((link,index) => (
            <li key={index}>
              <Link className="no-underline hover:no-underline text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-start sm:text-start">
          <h3 className="mb-1 font-semibold">Shop</h3>
          {footercompanyLinks.map((link,index) => (
            <li key={index}>
             <Link className="no-underline hover:no-underline text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-start sm:text-start">
          <h3 className="mb-1 font-semibold">Support</h3>
          {footerSupportLinks.map((link,index) => (
            <li key={index}>
             <Link className="no-underline hover:no-underline text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-start pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2020 Becodemy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
