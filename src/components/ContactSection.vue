<template>
  <section id="contact" class="section-padding bg-white">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Get in Touch</span>
        <h2 class="section-title">Contact Our Water Care Team</h2>
        <p class="section-subtitle">
          Need help choosing the right tank cleaner or placing a bulk order? We’re here to guide you toward the safest, cleanest water solution for your home or business.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <!-- Form -->
        <div class="lg:col-span-2">
          <form @submit.prevent="handleSubmit" class="space-y-5" autocomplete="on">
            <!-- Name & Email Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="contact-name" class="block text-sm font-body font-bold text-indigo-primary mb-2">Name</label>
                <input 
                  id="contact-name"
                  name="name"
                  autocomplete="name"
                  data-form-type="name"
                  v-model="formData.name"
                  type="text" 
                  placeholder="Your name" 
                  class="w-full bg-indigo-bg text-indigo-dark placeholder-indigo-light px-4 py-3 border-2 border-indigo-primary/30 border-sm focus:border-indigo-primary focus:outline-none focus:ring-2 focus:ring-indigo-primary/20 transition-all duration-fast"
                />
              </div>
              <div>
                <label for="contact-email" class="block text-sm font-body font-bold text-indigo-primary mb-2">
                  <span class="text-red-600">*</span> Email
                </label>
                <input 
                  id="contact-email"
                  name="email"
                  autocomplete="email"
                  data-form-type="email"
                  v-model="formData.email"
                  type="email" 
                  placeholder="you@example.com" 
                  required
                  class="w-full bg-indigo-bg text-indigo-dark placeholder-indigo-light px-4 py-3 border-2 border-indigo-primary/30 border-sm focus:border-indigo-primary focus:outline-none focus:ring-2 focus:ring-indigo-primary/20 transition-all duration-fast"
                />
              </div>
            </div>

            <!-- Product Interest -->
            <div>
              <label class="block text-sm font-body font-bold text-indigo-primary mb-3">Interested In</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label for="interest-home" class="flex items-center gap-3 p-3 border-2 border-indigo-primary/30 border-sm cursor-pointer hover:bg-indigo-bg/50 transition-colors" :class="{ 'border-indigo-primary bg-indigo-bg/40': formData.product === 'home_tank' }">
                  <input id="interest-home" name="product" v-model="formData.product" type="radio" value="home_tank" class="w-4 h-4 text-indigo-primary focus:ring-indigo-primary/30"/>
                  <span class="text-sm text-indigo-dark">Home Tank Cleaner</span>
                </label>
                <label for="interest-commercial" class="flex items-center gap-3 p-3 border-2 border-indigo-primary/30 border-sm cursor-pointer hover:bg-indigo-bg/50 transition-colors" :class="{ 'border-indigo-primary bg-indigo-bg/40': formData.product === 'commercial_tank' }">
                  <input id="interest-commercial" name="product" v-model="formData.product" type="radio" value="commercial_tank" class="w-4 h-4 text-indigo-primary focus:ring-indigo-primary/30"/>
                  <span class="text-sm text-indigo-dark">Commercial Tank Pack</span>
                </label>
                <label for="interest-starter" class="flex items-center gap-3 p-3 border-2 border-indigo-primary/30 border-sm cursor-pointer hover:bg-indigo-bg/50 transition-colors" :class="{ 'border-indigo-primary bg-indigo-bg/40': formData.product === 'starter_kit' }">
                  <input id="interest-starter" name="product" v-model="formData.product" type="radio" value="starter_kit" class="w-4 h-4 text-indigo-primary focus:ring-indigo-primary/30"/>
                  <span class="text-sm text-indigo-dark">Tank Care Starter Kit</span>
                </label>
                <label for="interest-general" class="flex items-center gap-3 p-3 border-2 border-indigo-primary/30 border-sm cursor-pointer hover:bg-indigo-bg/50 transition-colors" :class="{ 'border-indigo-primary bg-indigo-bg/40': formData.product === 'inquiry' }">
                  <input id="interest-general" name="product" v-model="formData.product" type="radio" value="inquiry" class="w-4 h-4 text-indigo-primary focus:ring-indigo-primary/30"/>
                  <span class="text-sm text-indigo-dark">General Inquiry</span>
                </label>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label for="contact-message" class="block text-sm font-body font-bold text-indigo-primary mb-2">
                <span class="text-red-600">*</span> Message
              </label>
              <textarea 
                id="contact-message"
                name="message"
                v-model="formData.message"
                placeholder="Tell us more about your tank cleaning or water care requirements..." 
                rows="5"
                required
                class="w-full bg-indigo-bg text-indigo-dark placeholder-indigo-light px-4 py-3 border-2 border-indigo-primary/30 border-sm focus:border-indigo-primary focus:outline-none focus:ring-2 focus:ring-indigo-primary/20 transition-all duration-fast resize-none"
              ></textarea>
            </div>

            <!-- Submit -->
            <div class="flex gap-3 pt-2">
              <AppButton
                type="submit"
                variant="secondary"
                size="md"
                :loading="isSubmitting"
                :disabled="isSubmitting"
                :label="isSubmitting ? 'Sending...' : 'Send Message'"
                class="flex-1"
              />
              <AppButton
                type="button"
                variant="outline"
                size="md"
                label="Clear"
                @click="resetForm"
              />
            </div>

            <div v-if="submitStatus === 'success'" class="p-4 bg-indigo-bg text-indigo-primary text-sm border-sm">
              ✓ Message sent successfully! Our water care team will contact you soon.
            </div>
            <div v-if="submitStatus === 'error'" class="p-4 bg-red-100 text-red-700 text-sm border-sm">
              ✗ {{ errorMessage || 'Error sending message. Please check your connection and try again.' }}
            </div>
          </form>
        </div>

        <!-- Info -->
        <div class="space-y-6">
          <div class="p-6 bg-indigo-bg border border-indigo-primary/20 border-sm">
            <h4 class="font-body font-bold text-indigo-dark mb-2">Phone</h4>
            <a href="tel:+923034404406" class="text-indigo-accent hover:text-indigo-primary transition-colors">
              0303-4404406
            </a>
          </div>

          <div class="p-6 bg-indigo-bg border border-indigo-primary/20 border-sm">
            <h4 class="font-body font-bold text-indigo-dark mb-2">Available In</h4>
            <p class="text-sm text-indigo-primary leading-relaxed">
              Serving all major residential and commercial sectors.<br/>
              Fast nationwide shipping available.
            </p>
          </div>

          <div class="p-6 bg-indigo-bg border border-indigo-primary/20 border-sm">
            <h4 class="font-body font-bold text-indigo-dark mb-2">Order Info</h4>
            <p class="text-sm text-indigo-primary">
              Contact us to place custom or bulk orders.<br/>
              Ask for safety sheets and product documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from './ui/AppButton.vue';
import { sendContactInquiry } from '../services/api.js';
import { showToast } from '../services/toast.js';

export default {
  name: 'ContactSection',
  components: { AppButton },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        product: 'inquiry',
        message: ''
      },
      isSubmitting: false,
      submitStatus: null,
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.formData.email || !this.formData.email.trim() || !this.formData.message || !this.formData.message.trim()) {
        this.submitStatus = 'error';
        this.errorMessage = 'Please provide a valid email and message.';
        return;
      }

      this.isSubmitting = true;
      this.submitStatus = null;
      this.errorMessage = '';

      try {
        const result = await sendContactInquiry({
          name: this.formData.name.trim(),
          email: this.formData.email.trim(),
          product: this.formData.product,
          message: this.formData.message.trim()
        });

        const refText = result.id ? ` (Reference: ${result.id})` : '';
        showToast(
          `Your inquiry has been received${refText}. Our water care team will contact you soon!`,
          'success',
          6000,
          'Message Sent Successfully'
        );

        this.submitStatus = 'success';
        this.resetForm();
      } catch (error) {
        console.error('Contact inquiry error:', error);
        this.submitStatus = 'error';
        this.errorMessage = error.message || 'Failed to submit contact inquiry. Please try again.';
        
        showToast(
          this.errorMessage,
          'error',
          6000,
          'Message Sending Failed'
        );
      } finally {
        this.isSubmitting = false;
        setTimeout(() => {
          if (this.submitStatus === 'success') {
            this.submitStatus = null;
          }
        }, 5000);
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        product: 'inquiry',
        message: ''
      };
    }
  }
};
</script>
