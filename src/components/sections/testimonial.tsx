import React from 'react';
import TestimonialCard from '../cards/testimonial-card'; // Adjust path as needed

function Testimonials() {
  const testimonials = [
    {
        "avatarUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDvrjimJdBr7PkvK-nbCuME5jh1gkPtMCYY7AG0C_jgA5kmjfZqAQXt09HEgfK2RAZZ4kox92qhew2dqJSWQDRWx1QoOg85FwNru7ck8KZcWhE2xMRAWSVbXm8Nv4cWathB9FTT9SUN7pPuNLUkYzis3KdLWwA8N8tWBErdZjoWyXQsujDj8jZH5QrejKTYBbSxFTYJ2BaPBYIBzdw7BSSniTfv6DhGZe0YOJE8V-c5xdXacN5fACwXdjA6ascwmyZV0JOIu3gP0oA",
        "name": "Owen Mitchell",
        "timeAgo": "2 months ago",
        "rating": 5,
        "text": "The Sharp Edge is the best barbershop in town! The atmosphere is great, and the barbers are incredibly skilled. I always leave feeling confident and looking sharp."
    },
    {
        "avatarUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBJHcqm6kpB1Ie7EvLShsZ0TRWKJLQL4NfZeex3vMJmnV_fD43kmYZTZzHcRW0WTn80UMWZHn3ZRQPOZk3AWOoYcebHPKz1TSKjlAGLloC7nGv0w_Ag-7MxYKTONa_WrRhHvpY14IdJt3l1FpthUrFWd_n7nQDX3CcXi4ocdz-GqxImDqfdPBV7mfTyubFPTIyQ05hmCcpeXjApfbf5tm4ucC_Kk_iiebvGG-Wi7wYXLY8xKEettpz4pN6eqt0Qjydh4xPxsSNQO8Q",
        "name": "Lucas Hayes",
        "timeAgo": "3 months ago",
        "rating": 4,
        "text": "I've been going to The Sharp Edge for years, and I'm always impressed with the quality of service. The barbers take their time to understand what you want and deliver exceptional results."
    },
    {
        "avatarUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBajWk19bbESFdTMHcXjYh2e9oFfikPDnWK2XtUzWuSCbUdxvmcRzLkvLTnRGRhEG4jy_UN9j4WP0mYq4MwR9qa6Rhxi-ZC4D-sfgYC_liaJHnjfzyCAHmH8fLPWxkVCuvY_0neZhJTe6g5HpJ8ZEi4NY_hCE-dkHoXfxOgWDnwK5ZlHBUDOrbAA8h1_G4gGvd8J019d4bAIptvNGPHgXCKTZylb-Z4tiVa-l0y5shY3jSYRqXiboGu3_MNN2c4AnRlzQcXlNpwZBw",
        "name": "Jackson Reed",
        "timeAgo": "4 months ago",
        "rating": 4,
        "text": "The Sharp Edge is a solid choice for a haircut. The barbers are professional, and the shop is clean and well-maintained. I've been happy with my cuts so far."
    }
    ]

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Testimonials</h2>
      <div className="flex flex-col gap-8 overflow-x-hidden bg-[#181611] p-4">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            avatarUrl={testimonial.avatarUrl}
            name={testimonial.name}
            timeAgo={testimonial.timeAgo}
            rating={testimonial.rating}
            text={testimonial.text}
          />
        ))}
      </div>
    </>
  );
}

export default Testimonials;