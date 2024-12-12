"use client";

import { useState, useEffect } from "react";

const Cookie = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check for consent status in localStorage on mount
  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setIsVisible(true); // Show banner if consent not yet given
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true"); // Store consent in localStorage
    setIsVisible(false); // Hide the banner
  };

  return (
    isVisible && (
      <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <p className="text-sm">
          We use cookies to enhance your browsing experience. By accepting, you
          agree to our use of cookies.
        </p>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition"
          >
            Accept
          </button>
        </div>
      </div>
    )
  );
};

export default Cookie;
