"use client";

import { useState } from "react";

export default function BookingForm({ packageData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          destination: packageData.title,
          message: `Enquiry for package: ${packageData.title}`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: ""
        });

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
      {/* Price Section */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">Starting from</p>
        <p className="text-3xl font-bold text-[#009C85]">
          ₹{packageData.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">per person</p>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        {/* Duration */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">Duration</span>
          <span className="font-semibold text-gray-900">
            {packageData.days} Days / {packageData.nights} Nights
          </span>
        </div>

        {/* Hotel */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Hotel</span>
          <span className="font-semibold text-gray-900">{packageData.rating} Star</span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Get This Package</h3>
        <p className="text-sm text-gray-600 mb-4">
          Fill in your details and we'll get back to you
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009C85] focus:border-transparent outline-none transition-all text-sm"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009C85] focus:border-transparent outline-none transition-all text-sm"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009C85] focus:border-transparent outline-none transition-all text-sm"
              placeholder="+91 (555)000-0000"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#009C85] hover:bg-[#008774] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isSubmitting ? "Sending..." : "Enquire Now"}
          </button>

          {/* Success Message */}
          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-3 py-2 rounded-lg text-xs">
              Thank you! We'll contact you soon.
            </div>
          )}

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-xs">
              Something went wrong. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}