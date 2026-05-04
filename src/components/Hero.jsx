// components/Hero.jsx
import React, { useState } from "react";
import Script from "next/script";
import NextLink from "./NextLink";
import { heroContent } from "../data";

/**
 * Hero Component
 * Renders the primary headline section for the landing page.
 * Includes animation cues and styled text for emphasis.
 */
const Hero = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    const formElement = event.currentTarget;

    const formData = new FormData(formElement);
    const customer = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      collegeInstitute: formData.get("collegeInstitute"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      helpOption: formData.get("helpOption"),
      message: formData.get("message"),
    };

    if (!window.Razorpay) {
      alert("Payment system is not ready. Please refresh and try again.");
      return;
    }

    try {
      setIsSubmitting(true);
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error(orderData?.error || "Unable to create payment order.");
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tawade Consultancy Services",
        description: "Registration Fee",
        order_id: orderData.orderId,
        prefill: {
          name: `${customer.firstName} ${customer.lastName}`.trim(),
          email: customer.email,
          contact: customer.phone,
        },
        notes: {
          college_institute: customer.collegeInstitute,
          help_option: customer.helpOption,
          message: customer.message || "",
        },
        theme: { color: "#0B1F3A" },
        handler: async (paymentResponse) => {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...paymentResponse,
              customer,
            }),
          });
          const verifyData = await verifyResponse.json();
          if (!verifyResponse.ok || !verifyData.success) {
            alert(verifyData?.error || "Payment verification failed. Please contact support.");
            setIsSubmitting(false);
            return;
          }

          if (verifyData?.warning) {
            alert(`Registered successfully. ${verifyData.warning}`);
          } else {
            alert("Registered successfully");
          }
          formElement.reset();
          setIsModalOpen(false);
          setIsSubmitting(false);
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", () => {
        alert("Payment failed. Please try again.");
        setIsSubmitting(false);
      });
      paymentObject.open();
    } catch (error) {
      alert(error.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#0b1f3a] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_58%)]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 text-center md:px-6 md:pb-20 md:pt-36">
        <div className="flex justify-center">
          <div
            className="mx-auto max-w-4xl"
            data-cues="zoomIn"
            data-delay="500"
            data-interval="-200"
            data-group="page-title"
          >
            <h2 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">{heroContent.title}</h2>
            <p className="mx-auto mb-8 max-w-3xl text-base text-slate-100 md:text-lg">{heroContent.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
                onClick={() => setIsModalOpen(true)}
              >
                Register
              </button>
              <NextLink
                href="#contact"
                title={heroContent.secondaryCta}
                className="rounded-full border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0b1f3a]"
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/55 p-4" onClick={() => setIsModalOpen(false)}>
          <div
            className="mx-auto mt-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl md:mt-16"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h5 className="text-lg font-semibold text-slate-900">Register</h5>
              <button
                type="button"
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="px-5 py-5">
              <form onSubmit={handleRegisterSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-slate-700">First name</label>
                    <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b1f3a] focus:ring" id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-slate-700">Last name</label>
                    <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b1f3a] focus:ring" id="lastName" name="lastName" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="collegeInstitute" className="mb-1 block text-sm font-medium text-slate-700">College / Institute</label>
                    <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b1f3a] focus:ring" id="collegeInstitute" name="collegeInstitute" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Your email</label>
                    <input type="email" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b1f3a] focus:ring" id="email" name="email" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
                    <input type="tel" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b1f3a] focus:ring" id="phone" name="phone" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="helpOption" className="mb-1 block text-sm font-medium text-slate-700">How Can We Help You?</label>
                    <select id="helpOption" name="helpOption" className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#0b1f3a] focus:ring" defaultValue="" required>
                      <option value="" disabled>Select Option</option>
                      <option value="it-consulting-advisory">IT consulting & Advisory</option>
                      <option value="cyber-security">Cyber Security</option>
                      <option value="web-development">Web Devlopment</option>
                      <option value="mobile-development">mobile Devlopment</option>
                      <option value="devops-cources">Devops Cources</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b1f3a] focus:ring"
                      rows="4"
                      placeholder="To better assist you, please describe how we can help..."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full rounded-md bg-[#0b1f3a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#071425] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
