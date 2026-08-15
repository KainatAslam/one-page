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
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- Name & Email Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-body font-bold text-indigo-primary mb-2">Name</label>
                <input 
                  v-model="formData.name"
                  type="text" 
                  placeholder="Your name" 
                  class="w-full bg-indigo-bg text-indigo-dark placeholder-indigo-light px-4 py-3 border-2 border-indigo-primary/30 border-sm focus:border-indigo-primary focus:outline-none focus:ring-2 focus:ring-indigo-primary/20 transition-all duration-fast"
                />
              </div>
              <div>
                <label class="block text-sm font-body font-bold text-indigo-primary mb-2">Email</label>
                <input 
                  v-model="formData.email"
                  type="email" 
                  placeholder="you@example.com" 
                  class="w-full bg-indigo-bg text-indigo-dark placeholder-indigo-light px-4 py-3 border-2 border-indigo-primary/30 border-sm focus:border-indigo-primary focus:outline-none focus:ring-2 focus:ring-indigo-primary/20 transition-all duration-fast"
                />
              </div>
            </div>

            <!-- Product Interest -->
            <div>
              <label class="block text-sm font-body font-bold text-indigo-primary mb-3">Interested In</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label class="flex items-center gap-3 p-3 border-2 border-indigo-primary/30 border-sm cursor-pointer hover:bg-indigo-bg/50 transition-colors">
                  <input v-model="formData.product" type="radio" value="home_tank" class="w-4 h-4"/>
                  <span class="text-sm text-indigo-dark">Home Tank Cleaner</span>
                </label>
                <label class="flex items-center gap-3 p-3 border-2 border-indigo-primary/30 border-sm cursor-pointer hover:bg-indigo-bg/50 transition-colors">
                  <input v-model="formData.product" type="radio" value="commercial_tank" class="w-4 h-4"/>
                  <span class="text-sm text-indigo-dark">Commercial Tank Pack</span>
                </label>
                <label class="flex items-center gap-3 p-3 border-2 border-indigo-primary/30 border-sm cursor-pointer hover:bg-indigo-bg/50 transition-colors">
                  <input v-model="formData.product" type="radio" value="starter_kit" class="w-4 h-4"/>
                  <span class="text-sm text-indigo-dark">Tank Care Starter Kit</span>
                </label>
                <label class="flex items-center gap-3 p-3 border-2 border-indigo-primary/30 border-sm cursor-pointer hover:bg-indigo-bg/50 transition-colors">
                  <input v-model="formData.product" type="radio" value="inquiry" class="w-4 h-4"/>
                  <span class="text-sm text-indigo-dark">General Inquiry</span>
                </label>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label class="block text-sm font-body font-bold text-indigo-primary mb-2">Message</label>
              <textarea 
                v-model="formData.message"
                placeholder="Tell us more..." 
                rows="5"
                class="w-full bg-indigo-bg text-indigo-dark placeholder-indigo-light px-4 py-3 border-2 border-indigo-primary/30 border-sm focus:border-indigo-primary focus:outline-none focus:ring-2 focus:ring-indigo-primary/20 transition-all duration-fast resize-none"
              ></textarea>
            </div>

            <!-- Submit -->
            <div class="flex gap-3 pt-2">
              <AppButton
                type="submit"
                variant="secondary"
                size="sm"
                :loading="isSubmitting"
                :disabled="isSubmitting"
                :label="isSubmitting ? 'Sending...' : 'Send Message'"
                class="flex-1"
              />
              <AppButton
                type="reset"
                variant="outline"
                size="sm"
                label="Clear"
                @click="resetForm"
              />
            </div>

            <div v-if="submitStatus === 'success'" class="p-4 bg-indigo-bg text-indigo-primary text-sm border-sm">
              ✓ Message sent successfully! Our water care team will contact you soon.
            </div>
            <div v-if="submitStatus === 'error'" class="p-4 bg-red-100 text-red-700 text-sm border-sm">
              ✗ Error sending message. Please try again.
            </div>
          </form>
        </div>

        <!-- Info -->
        <div class="space-y-6">
          <div class="p-6 bg-indigo-bg border border-indigo-primary/20 border-sm">
            <h4 class="font-body font-bold text-indigo-dark mb-2">Phone</h4>
            <a href="tel:+1234567890" class="text-indigo-accent hover:text-indigo-primary transition-colors">
              Your number here
            </a>
          </div>

          <div class="p-6 bg-indigo-bg border border-indigo-primary/20 border-sm">
            <h4 class="font-body font-bold text-indigo-dark mb-2">Available In</h4>
            <p class="text-sm text-indigo-primary leading-relaxed">
              Your city/area<br/>
              Nationwide delivery support available
            </p>
          </div>

          <div class="p-6 bg-indigo-bg border border-indigo-primary/20 border-sm">
            <h4 class="font-body font-bold text-indigo-dark mb-2">Order Info</h4>
            <p class="text-sm text-indigo-primary">
              Contact us to place an order.<br/>
              Ask for a detailed look at the product and pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from './ui/AppButton.vue';

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
      submitStatus: null
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      try {
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formData)
        });
        this.submitStatus = response.ok ? 'success' : 'error';
        if (response.ok) this.resetForm();
      } catch (error) {
        this.submitStatus = 'error';
      } finally {
        this.isSubmitting = false;
        setTimeout(() => (this.submitStatus = null), 4000);
      }
    },
    resetForm() {
      this.formData = { name: '', email: '', product: 'inquiry', message: '' };
    }
  }
};
</script>
