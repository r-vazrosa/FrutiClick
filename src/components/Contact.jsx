import '../styles/Contact.css';
import ClickComponent from './ClickComponent.jsx';
import FrutiClickInfo from "./FrutiClickInfo.jsx"

const Contact = () => (
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

export default Contact;
