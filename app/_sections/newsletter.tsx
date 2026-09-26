"use client";
import React, { useState } from 'react'; // Import useState

const Newsletter = () => {
    
  const [email, setEmail] = useState(''); // State to manage email input

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value); // Update email state on change
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input email sederhana
    if (!email || !email.includes("@")) {
      alert("Mohon masukkan alamat email yang valid.");
      return;
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/ichikyube@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          _subject: "Subscriber Baru dari Website!",
          _template: "table"
        })
      });

      if (response.ok) {
        alert("Terima kasih! Email Anda telah terdaftar.");
        setEmail(""); // Reset input setelah berhasil
      } else {
        alert("Gagal mengaktifkan langganan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  return (
    
      <div className="@container">
        <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
          <div className="flex flex-col gap-2 text-center">
            <h1
              className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-180"
            >
              Stay Sharp with Our Newsletter
            </h1>
            <p className="text-white text-base font-normal leading-normal max-w-180">Get exclusive promotions and updates on the latest styles and trends.</p>
          </div>
          <div className="flex flex-1 justify-center">
            <label className="flex flex-col min-w-40 h-14 max-w-120 flex-1 @[480px]:h-16">
              <form onSubmit={handleSubscribe} className="flex w-full flex-1 items-stretch rounded-4xl bg-[#393528] h-full">
               
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none focus:border-none h-full placeholder:text-[#bab29c] px-4 border-r-0 pr-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  value={email}
                  onChange={handleEmailChange}
                />
                <div className="flex items-center justify-center border-l-0 border-none pr-2">
                  <button type='submit'
                    className="flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f3c334] text-[#181611] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                   
                  >
                    <span className="truncate">Subscribe</span>
                  </button>
                </div>
              </form>
            </label>
          </div>
        </div>
      </div>
  )
}

export default Newsletter