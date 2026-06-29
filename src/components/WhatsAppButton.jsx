import React from 'react';
import { siteConfig } from '../config/siteConfig';

const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Contact on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        width="32"
        height="32"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M16.03 3C8.86 3 3.04 8.82 3.04 15.99c0 2.29.6 4.53 1.74 6.5L3 29l6.67-1.75a12.94 12.94 0 0 0 6.36 1.62h.01c7.16 0 12.99-5.82 12.99-12.99C29.03 8.82 23.2 3 16.03 3Zm0 23.68h-.01c-2.02 0-4-.54-5.73-1.56l-.41-.24-3.96 1.04 1.06-3.86-.27-.4a10.72 10.72 0 0 1-1.64-5.68c0-5.95 4.84-10.8 10.8-10.8 2.88 0 5.59 1.12 7.63 3.16a10.74 10.74 0 0 1 3.16 7.63c0 5.95-4.84 10.8-10.8 10.8Z"
        />
        <path
          fill="currentColor"
          d="M19.11 17.36c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.14-.19.29-.73.94-.9 1.13-.17.19-.33.21-.62.07-.29-.14-1.21-.45-2.31-1.42-.85-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.44.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 0.98-1 2.39s1.03 2.77 1.17 2.96c.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.82.12.56-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33Z"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
