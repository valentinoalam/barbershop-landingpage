"use client";
import React, { useState } from 'react'; // Import useState

function ContactUs() {
  const [email, setEmail] = useState(''); // State to manage email input

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value); // Update email state on change
  };

  const handleSubscribe = () => {
    // Here you would typically handle the subscription logic,
    // e.g., send the email to an API, validate it, etc.
    console.log('Subscribing with email:', email);
    alert(`Thank you for subscribing, ${email}!`); // Using alert for demonstration, replace with a proper UI message
    setEmail(''); // Clear the input field after subscription
  };

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Contact Us</h2>
      <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
        Visit us at 123 Main Street, Anytown, USA. Call us at (555) 123-4567 or email us at info@thesharpedge.com.
      </p>
      <div className="flex px-4 py-3">
        {/* Embedded Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.254101979929!2d-122.41941568468117!3d37.77492977975931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858086a9d0d3b3%3A0x6a9d0d3b3c3e3a3!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
          width="100%"
          height="auto" // Set height to auto to work with aspect-video
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-video rounded-xl" // Tailwind classes for aspect ratio and rounded corners
          title="Location of The Sharp Edge on Google Maps"
        ></iframe>
      </div>
      <div className="@container">
        <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
          <div className="flex flex-col gap-2 text-center">
            <h1
              className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
            >
              Stay Sharp with Our Newsletter
            </h1>
            <p className="text-white text-base font-normal leading-normal max-w-[720px]">Get exclusive promotions and updates on the latest styles and trends.</p>
          </div>
          <div className="flex flex-1 justify-center">
            <label className="flex flex-col min-w-40 h-14 max-w-[480px] flex-1 @[480px]:h-16">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <input
                  placeholder="Enter your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#393528] focus:border-none h-full placeholder:text-[#bab29c] px-4 rounded-r-none border-r-0 pr-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  value={email} // Bind value to state
                  onChange={handleEmailChange} // Add onChange handler
                />
                <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#393528] pr-2">
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f3c334] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    onClick={handleSubscribe} // Add onClick handler
                  >
                    <span className="truncate">Subscribe</span>
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
