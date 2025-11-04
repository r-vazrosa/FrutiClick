import React, { useEffect } from "react";
import '../styles/Contact.css';

const Contact = () => {
  useEffect(() => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const handler = (event) => {
      event.preventDefault();
      const result = document.getElementById("contact-result");
      const formEl = event.currentTarget;
      const formData = new FormData(formEl);
      const submitButton = formEl.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
      }
      const originalText = submitButton ? submitButton.textContent : "";
      if (submitButton) {
        submitButton.textContent = "Sending...";
      }
      if (result) result.innerHTML = "Please wait...";
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      })
      .then(async (response) => {
        let data = null;
        try {
          data = await response.json();
        } catch (err) {
        }
        if (response.status === 200 || response.ok) {
          if (result) result.innerHTML = "Message sent successfully!";
          formEl.reset();
        } else {
          if (result) result.innerHTML = (data && (data.message || data.error)) || "Failed to send message.";
        }
      })
      .catch(error => {
        console.error("Contact submit error:", error);
        if (result) result.innerHTML = "Something went wrong. Please try again.";
      })
      .finally(() => {
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
        setTimeout(() => {
          if (result) result.innerHTML = "";
        }, 4000);
      });
    };

    form.addEventListener("submit", handler);

    return () => {
      form.removeEventListener("submit", handler);
    };
  }, []);

  return (
    <div id="contact">
      <div id="contact-info">
        <h2>Contact Me</h2>
        <p>
          If you have any inquiries, questions, or just want to shoot me a message, you can do so here, will respond whenever I can.
        </p>
      </div>
      <div id="contact-section">
        <form id="contact-form" method="POST">
          <input type="hidden" name="access_key" value="6fcf64e1-5c64-4f17-98bc-5959665be3aa" />
          <input type="hidden" name="subject" value="New Contact Form Submission" />
          <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

          <section id="contact-form-name">
            <label htmlFor="contact-name-info">Name (Required):</label>
            <input id="contact-name-info" type="text" name="name" required />
          </section>

          <section id="contact-form-email">
            <label htmlFor="contact-email-info">Email (Required):</label>
            <input id="contact-email-info" type="email" name="email" required />
          </section>

          <section id="contact-form-msg">
            <label htmlFor="contact-msg-info">Message (Required):</label>
            <input id="contact-msg-info" type="text" name="message" required />
          </section>

          <button type="submit">Submit</button>
          <div id="contact-result" style={{ marginTop: 10 }}></div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
