<template>
  <section id="contact" class="contact-section section-padding">
    <div class="container">
      <div class="contact-grid">
        <!-- Left Column: Info & Direct Call/WhatsApp Links -->
        <div class="contact-info-col">
          <span class="section-tag">Get In Touch</span>
          <h2 class="section-title">We'd Love to Hear From You</h2>
          <p class="contact-description">
            Have questions about our organic ingredients, micro-batch formulations, or custom bulk orders? Reach out to our botanical team directly.
          </p>

          <!-- Clickable Call & WhatsApp Direct CTA Links -->
          <div class="direct-contact-cards">
            <a href="https://wa.me/15550192834" target="_blank" rel="noopener noreferrer" class="contact-cta-card whatsapp-card">
              <div class="cta-icon-wrap">
                💬
              </div>
              <div class="cta-details">
                <span class="cta-label">Chat on WhatsApp</span>
                <span class="cta-value">+1 (555) 019-2834</span>
              </div>
              <span class="btn-cta btn-whatsapp-sub">Message Now</span>
            </a>

            <a href="tel:+15550192834" class="contact-cta-card call-card">
              <div class="cta-icon-wrap">
                📞
              </div>
              <div class="cta-details">
                <span class="cta-label">Direct Phone Call</span>
                <span class="cta-value">+1 (555) 019-2834</span>
              </div>
              <span class="btn-secondary btn-call-sub">Call Us</span>
            </a>
          </div>

          <div class="company-address-box">
            <div class="address-item">
              <span class="icon">📍</span>
              <span><strong>AURA Botanical Studio</strong> — 450 Pacific Coast Hwy, Suite 200, Carmel-by-the-Sea, CA 93921</span>
            </div>
            <div class="address-item">
              <span class="icon">✉️</span>
              <span><strong>Email:</strong> hello@aurabotanical.com</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Interactive Contact Form -->
        <div class="contact-form-col">
          <div class="contact-form-card glass-card">
            <h3 class="form-title">Send Us a Direct Inquiry</h3>

            <!-- SUCCESS MESSAGE BANNER -->
            <div v-if="submittedSuccess" class="contact-success-banner">
              <div class="banner-icon">✓</div>
              <div class="banner-text">
                <h4>Inquiry Received!</h4>
                <p>Thank you for contacting us. Your message reference is <strong>{{ submissionId }}</strong>. Our botanical specialist will get back to you within 24 hours.</p>
              </div>
              <button class="btn-secondary btn-sm" @click="resetContactForm">Send Another Message</button>
            </div>

            <!-- CONTACT FORM -->
            <form v-else @submit.prevent="submitContactForm" class="contact-form">
              <!-- Field 1: Contact Method Selector & Input -->
              <div class="form-group">
                <label for="contactMethod">Preferred Contact Method <span class="req">*</span></label>
                <div class="method-selector">
                  <label 
                    class="radio-pill" 
                    :class="{ 'pill-active': form.contactMethod === 'email' }"
                  >
                    <input type="radio" v-model="form.contactMethod" value="email" />
                    <span>Email Address</span>
                  </label>

                  <label 
                    class="radio-pill" 
                    :class="{ 'pill-active': form.contactMethod === 'phone' }"
                  >
                    <input type="radio" v-model="form.contactMethod" value="phone" />
                    <span>Phone Number</span>
                  </label>

                  <label 
                    class="radio-pill" 
                    :class="{ 'pill-active': form.contactMethod === 'whatsapp' }"
                  >
                    <input type="radio" v-model="form.contactMethod" value="whatsapp" />
                    <span>WhatsApp</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label for="contactInfo">
                  Your {{ form.contactMethod === 'email' ? 'Email Address' : 'Phone / WhatsApp Number' }} <span class="req">*</span>
                </label>
                <input 
                  id="contactInfo" 
                  v-model="form.contactInfo" 
                  type="text" 
                  :placeholder="form.contactMethod === 'email' ? 'e.g. alex@example.com' : 'e.g. +1 (555) 019-2834'"
                  :class="{ 'input-error': errors.contactInfo }"
                />
                <span v-if="errors.contactInfo" class="field-error">{{ errors.contactInfo }}</span>
              </div>

              <!-- Field 2: Message Textbox -->
              <div class="form-group">
                <label for="message">Your Message or Question <span class="req">*</span></label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="4" 
                  placeholder="Tell us about your skincare needs, questions about ingredients, or order inquiries..."
                  :class="{ 'input-error': errors.message }"
                ></textarea>
                <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
              </div>

              <!-- Form Error Banner -->
              <div v-if="formError" class="error-banner">
                {{ formError }}
              </div>

              <button type="submit" class="btn-cta btn-submit-contact" :disabled="isSubmitting">
                <span v-if="isSubmitting">Sending Inquiry...</span>
                <span v-else>Submit Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      form: {
        contactMethod: 'email',
        contactInfo: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      formError: '',
      submittedSuccess: false,
      submissionId: ''
    };
  },
  methods: {
    validate() {
      const errors = {};
      if (!this.form.contactInfo.trim()) {
        errors.contactInfo = 'Please enter your contact details.';
      } else if (this.form.contactMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.contactInfo.trim())) {
        errors.contactInfo = 'Please enter a valid email address.';
      }

      if (!this.form.message.trim()) {
        errors.message = 'Please enter a message description.';
      }

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    async submitContactForm() {
      this.formError = '';
      if (!this.validate()) return;

      this.isSubmitting = true;

      try {
        const payload = {
          contactMethod: this.form.contactMethod,
          contactInfo: this.form.contactInfo.trim(),
          message: this.form.message.trim()
        };

        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to record inquiry.');
        }

        this.submittedSuccess = true;
        this.submissionId = data.id;
      } catch (err) {
        console.error('Contact submission error:', err);
        this.formError = err.message || 'Could not send contact message. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    },
    resetContactForm() {
      this.form = {
        contactMethod: 'email',
        contactInfo: '',
        message: ''
      };
      this.submittedSuccess = false;
      this.submissionId = '';
    }
  }
};
</script>

<style scoped>
.contact-section {
  background: var(--color-white);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: flex-start;
}

.contact-description {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  line-height: 1.7;
}

.direct-contact-cards {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.contact-cta-card {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.25rem 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  background: var(--color-sand-light);
  border: 1.5px solid rgba(26, 36, 32, 0.08);
  transition: all var(--transition-fast);
}

.whatsapp-card:hover {
  border-color: var(--color-gold);
  transform: translateX(6px);
  box-shadow: var(--shadow-md);
}

.call-card:hover {
  border-color: var(--color-emerald-primary);
  transform: translateX(6px);
  box-shadow: var(--shadow-md);
}

.cta-icon-wrap {
  font-size: 1.8rem;
  width: 48px;
  height: 48px;
  background: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

.cta-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cta-label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
}

.cta-value {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-emerald-dark);
}

.btn-whatsapp-sub {
  padding: 0.55rem 1.1rem;
  font-size: 0.82rem;
}

.btn-call-sub {
  padding: 0.55rem 1.1rem;
  font-size: 0.82rem;
}

.company-address-box {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(26, 36, 32, 0.1);
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.address-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

/* Contact Form Styling */
.contact-form-card {
  padding: 2.5rem;
  border-radius: 24px;
}

.form-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-emerald-dark);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.method-selector {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.35rem;
}

.radio-pill {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.5rem;
  border: 1.5px solid rgba(26, 36, 32, 0.15);
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  background: var(--color-sand-light);
  transition: all 0.2s ease;
}

.radio-pill input {
  display: none;
}

.radio-pill.pill-active {
  background: var(--color-emerald-primary);
  color: var(--color-white);
  border-color: var(--color-emerald-primary);
}

.form-group textarea {
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1.5px solid rgba(26, 36, 32, 0.15);
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.form-group textarea:focus {
  border-color: var(--color-emerald-primary);
  box-shadow: 0 0 0 3px rgba(30, 66, 48, 0.1);
}

.form-group textarea.input-error {
  border-color: var(--color-error);
}

.btn-submit-contact {
  width: 100%;
  padding: 0.95rem;
  margin-top: 0.5rem;
}

/* Success Banner */
.contact-success-banner {
  padding: 2rem;
  background: var(--color-sage-light);
  border-radius: 18px;
  border: 1.5px solid var(--color-emerald-primary);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.banner-icon {
  width: 48px;
  height: 48px;
  background: var(--color-emerald-primary);
  color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.4rem;
}

.banner-text h4 {
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
}

.banner-text p {
  font-size: 0.92rem;
  color: var(--color-text-muted);
}

.btn-sm {
  padding: 0.5rem 1.2rem;
  font-size: 0.85rem;
}

@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
