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
          const closeButton = document.querySelector("#registerModal .btn-close");
          if (closeButton) closeButton.click();
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
    <section className="wrapper secondary-bg bg-lines">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      {/* Main container with responsive padding and centered text */}
      <div className="container pt-16 pt-md-18 pb-16 pb-lg-20 text-center">
        <div className="row">
          {/* Centered column with animation cues for the hero heading */}
          <div
            className="col-lg-10 col-xl-9 col-xxl-8 mx-auto"
            data-cues="zoomIn"
            data-delay="500"
            data-interval="-200"
            data-group="page-title"
          >
            {/* Main headline */}
            <h2 className="display-1 fs-38 lh-sm mb-4 text-white">{heroContent.title}</h2>
            <p className="lead text-white hero-subtitle mx-auto mb-6">{heroContent.subtitle}</p>
            <div className="d-flex flex-wrap justify-content-center hero-cta-row">
              <button
                type="button"
                className="btn btn-md btn-primary rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                Register
              </button>
              <NextLink href="#contact" title={heroContent.secondaryCta} className="btn btn-md btn-outline-primary rounded-pill" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">
                Register
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleRegisterSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="collegeInstitute" className="form-label">College / Institute</label>
                    <input type="text" className="form-control" id="collegeInstitute" name="collegeInstitute" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Your email</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" name="phone" required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="helpOption" className="form-label">How Can We Help You?</label>
                    <select id="helpOption" name="helpOption" className="form-select" defaultValue="" required>
                      <option value="" disabled>Select Option</option>
                      <option value="it-consulting-advisory">IT consulting & Advisory</option>
                      <option value="cyber-security">Cyber Security</option>
                      <option value="web-development">Web Devlopment</option>
                      <option value="mobile-development">mobile Devlopment</option>
                      <option value="devops-cources">Devops Cources</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      rows="4"
                      placeholder="To better assist you, please describe how we can help..."
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-100" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
