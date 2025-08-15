import React from 'react';
import FAQItem from '../cards/faq-item'; // Adjust path as needed

function FAQSection() {
  const faqs = [
    {
      question: "How long does a typical haircut take?",
      answer: "A typical haircut at The HairCut takes approximately 30-45 minutes, depending on the complexity of the style and hair type."
    },
    {
      question: "Do you offer beard trimming services?",
      answer: "Yes, we offer comprehensive beard trimming and styling services, including hot towel treatments and beard oil application."
    },
    {
      question: "What products do you use for styling?",
      answer: "We use a range of high-quality, professional-grade styling products from leading brands to ensure the best results for your hair and scalp."
    }
  ];

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">FAQ</h2>
      <div className="flex flex-col p-4 gap-3">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </>
  );
}

export default FAQSection;
