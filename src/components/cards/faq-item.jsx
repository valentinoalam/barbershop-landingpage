import React from 'react';
import CaretDownIcon from '../common/caretdown-icon'; // Adjust path as needed

function FAQItem({ question, answer }) {
  return (
    <details className="flex flex-col rounded-xl bg-[#393528] px-4 py-2 group">
      <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
        <p className="text-white text-sm font-medium leading-normal">{question}</p>
        <CaretDownIcon />
      </summary>
      <p className="text-[#bab29c] text-sm font-normal leading-normal pb-2">{answer}</p>
    </details>
  );
}

export default FAQItem;
