<template>
  <transition name="modal">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      @keydown.escape.window="handleEscape"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-indigo-dark/65 transition-opacity" @click="$emit('close')"></div>

      <!-- Modal Card -->
      <div class="glass-card relative w-full max-w-3xl max-h-[90vh] my-auto shadow-2xl border border-white/80 border-sm overflow-y-auto z-10">
        <!-- Close Button -->
        <AppButton
          variant="ghost"
          size="sm"
          aria-label="Close modal"
          class="absolute top-4 right-4 sm:top-6 sm:right-6 z-10"
          @click="$emit('close')"
        >
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </template>
        </AppButton>

        <!-- Content Container -->
        <div class="p-6 sm:p-8 space-y-6">
          <!-- Title -->
          <h2 id="modal-title" class="font-heading text-2xl sm:text-3xl font-bold text-indigo-dark pr-8">
            Order Clean &amp; Cool
          </h2>

          <!-- 1. Product Selection Section (Outside customer form to prevent autofill pollution) -->
          <div class="pb-6 border-b border-indigo-primary/20">
            <label class="block text-sm font-bold text-indigo-primary mb-4">
              <span class="text-red-600">*</span> Select Products
            </label>
            <div class="grid grid-cols-1 gap-3">
              <div 
                v-for="product in products"
                :key="product.id"
                role="button"
                tabindex="0"
                :aria-pressed="isProductSelected(product.id)"
                :aria-label="`Select ${product.name}`"
                @click="toggleProduct(product.id)"
                @keydown.space.prevent="toggleProduct(product.id)"
                @keydown.enter.prevent="toggleProduct(product.id)"
                class="flex items-center gap-4 p-3.5 sm:p-4 bg-indigo-bg border-2 border-sm cursor-pointer transition-all duration-fast select-none focus:outline-none focus:ring-2 focus:ring-indigo-primary/40"
                :class="isProductSelected(product.id) ? 'border-indigo-primary bg-indigo-primary/10' : 'border-indigo-primary/30 hover:border-indigo-primary/60'"
              >
                <!-- Thumbnail -->
                <div class="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden flex-shrink-0 border-sm">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover"/>
                </div>

                <!-- Product Details -->
                <div class="flex-grow">
                  <h4 class="font-bold text-indigo-dark text-sm sm:text-base">{{ product.name }}</h4>
                  <p class="text-xs sm:text-sm text-indigo-primary">{{ product.volume }}</p>
                </div>

                <!-- Price -->
                <div class="text-right">
                  <p class="font-heading font-bold text-indigo-primary text-base sm:text-lg">${{ product.price.toFixed(2) }}</p>
                </div>

                <!-- Visual Checkbox Indicator (Non-input element so browser autofill cannot target it) -->
                <div 
                  class="w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-fast flex-shrink-0"
                  :class="isProductSelected(product.id) ? 'border-indigo-primary bg-indigo-primary text-white shadow-sm' : 'border-indigo-primary/40 bg-white'"
                >
                  <svg v-if="isProductSelected(product.id)" class="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Product Quantities Section (Isolated from customer form) -->
          <div v-if="selectedProducts.length > 0" class="pb-6 border-b border-indigo-primary/20">
            <label class="block text-sm font-bold text-indigo-primary mb-4">
              <span class="text-red-600">*</span> Quantity per Product
            </label>
            <div class="space-y-3">
              <div 
                v-for="productId in selectedProducts"
                :key="`qty-row-${productId}`"
                class="flex items-center justify-between p-3 sm:p-4 bg-indigo-bg border border-indigo-primary/20 border-sm gap-3"
              >
                <span class="font-semibold text-indigo-dark text-sm sm:text-base">{{ getProductName(productId) }}</span>
                <div class="flex items-center gap-1.5 sm:gap-2 bg-white p-1 border-sm">
                  <!-- Decrement Button -->
                  <AppButton
                    type="button"
                    variant="primary"
                    size="sm"
                    label="−"
                    :aria-label="`Decrease quantity for ${getProductName(productId)}`"
                    @click="decrementProductQuantity(productId)"
                  />

                  <!-- Quantity Input (inputmode numeric, strict clamping 1-99) -->
                  <input 
                    :id="`qty-field-${productId}`"
                    :value="getProductQuantity(productId)" 
                    type="text" 
                    inputmode="numeric"
                    pattern="[0-9]*"
                    autocomplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    data-form-type="other"
                    :aria-label="`Quantity for ${getProductName(productId)}`"
                    @input="handleQuantityInput(productId, $event)"
                    @blur="handleQuantityBlur(productId, $event)"
                    class="w-12 sm:w-14 text-center bg-transparent text-indigo-dark font-bold text-base outline-none select-all"
                  />

                  <!-- Increment Button -->
                  <AppButton
                    type="button"
                    variant="primary"
                    size="sm"
                    label="+"
                    :aria-label="`Increase quantity for ${getProductName(productId)}`"
                    @click="incrementProductQuantity(productId)"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Customer Information Form (Pure customer details form for autofill) -->
          <form id="order-customer-form" @submit.prevent="handleSubmit" class="space-y-6" autocomplete="on">
            <div class="pb-6 border-b border-indigo-primary/20">
              <h3 class="text-lg font-bold text-indigo-dark mb-4">Customer Information</h3>
              
              <!-- Name & Email Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="order-fullname" class="block text-sm font-bold text-indigo-primary mb-2">
                    <span class="text-red-600">*</span> Full Name
                  </label>
                  <input 
                    id="order-fullname"
                    name="name"
                    autocomplete="name"
                    data-form-type="name"
                    v-model="formData.name"
                    type="text" 
                    placeholder="John Doe"
                    required
                    class="w-full bg-white text-indigo-dark px-4 py-2.5 sm:py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                  />
                </div>
                <div>
                  <label for="order-email" class="block text-sm font-bold text-indigo-primary mb-2">
                    <span class="text-red-600">*</span> Email
                  </label>
                  <input
                    id="order-email"
                    name="email"
                    autocomplete="email"
                    data-form-type="email"
                    v-model="formData.email"
                    type="email" 
                    placeholder="john@example.com"
                    required
                    class="w-full bg-white text-indigo-dark px-4 py-2.5 sm:py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                  />
                </div>
              </div>

              <!-- Phone Row -->
              <div class="mb-4">
                <label for="order-phone" class="block text-sm font-bold text-indigo-primary mb-2">
                  <span class="text-red-600">*</span> Phone Number
                </label>
                <input 
                  id="order-phone"
                  name="tel"
                  autocomplete="tel"
                  data-form-type="phone"
                  v-model="formData.phone"
                  type="tel" 
                  placeholder="+1 (555) 123-4567"
                  required
                  class="w-full bg-white text-indigo-dark px-4 py-2.5 sm:py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                />
              </div>

              <!-- Address Row -->
              <div class="mb-4">
                <label for="order-address" class="block text-sm font-bold text-indigo-primary mb-2">
                  <span class="text-red-600">*</span> Street Address
                </label>
                <input 
                  id="order-address"
                  name="street-address"
                  autocomplete="street-address"
                  data-form-type="address"
                  v-model="formData.address"
                  type="text" 
                  placeholder="123 Main Street"
                  required
                  class="w-full bg-white text-indigo-dark px-4 py-2.5 sm:py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                />
              </div>

              <!-- City & Postal Code Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="order-city" class="block text-sm font-bold text-indigo-primary mb-2">
                    <span class="text-red-600">*</span> City
                  </label>
                  <input 
                    id="order-city"
                    name="address-level2"
                    autocomplete="address-level2"
                    data-form-type="city"
                    v-model="formData.city"
                    type="text" 
                    placeholder="New York"
                    required
                    class="w-full bg-white text-indigo-dark px-4 py-2.5 sm:py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                  />
                </div>
                <div>
                  <label for="order-postal" class="block text-sm font-bold text-indigo-primary mb-2">
                    <span class="text-red-600">*</span> Postal Code
                  </label>
                  <input 
                    id="order-postal"
                    name="postal-code"
                    autocomplete="postal-code"
                    data-form-type="postal-code"
                    v-model="formData.postalCode"
                    type="text" 
                    placeholder="10001"
                    required
                    class="w-full bg-white text-indigo-dark px-4 py-2.5 sm:py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                  />
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="p-4 bg-indigo-bg border border-indigo-primary/20 border-sm">
              <div class="space-y-2 mb-4 pb-4 border-b border-indigo-primary/20">
                <div class="text-sm font-semibold text-indigo-primary">Order Summary:</div>
                <div v-for="productId in selectedProducts" :key="`summary-${productId}`" class="text-xs text-indigo-primary">
                  {{ getProductName(productId) }} × {{ getProductQuantity(productId) }}
                </div>
              </div>
              <div class="flex justify-between items-center mb-3 pb-3 border-b border-indigo-primary/20">
                <span class="text-indigo-primary font-semibold">Subtotal:</span>
                <span class="font-heading text-lg font-bold text-indigo-primary">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-indigo-primary font-semibold">Total:</span>
                <span class="font-heading text-2xl font-bold text-indigo-dark">${{ subtotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Validation Errors -->
            <div v-if="validationErrors.length > 0" class="p-3 bg-red-100 text-red-700 text-sm border border-red-300 border-sm">
              <div class="font-semibold mb-2">Please fix the following:</div>
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="(error, idx) in validationErrors" :key="idx">{{ error }}</li>
              </ul>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 pt-2">
              <AppButton
                type="submit"
                variant="secondary"
                :disabled="!canSubmit || isSubmitting"
                :loading="isSubmitting"
                :label="isSubmitting ? 'Submitting...' : 'Complete Order'"
              />
              <AppButton
                type="button"
                variant="outline"
                label="Cancel"
                @click="$emit('close')"
              />
            </div>

            <!-- Inline Feedback Message -->
            <div v-if="submitMessage" class="p-3 text-sm border-sm" :class="submitMessage.type === 'success' ? 'bg-indigo-bg text-indigo-primary' : 'bg-red-100 text-red-700'">
              {{ submitMessage.text }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AppButton from './ui/AppButton.vue';
import { createOrder } from '../services/api.js';
import { showToast } from '../services/toast.js';

export default {
  name: 'ProductModal',
  components: { AppButton },
  props: {
    isOpen: Boolean,
    products: {
      type: Array,
      default: () => []
    },
    selectedProduct: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  data() {
    return {
      selectedProducts: [],
      productQuantities: {}, // { [productId]: number }
      formData: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
      },
      isSubmitting: false,
      submitMessage: null,
      validationErrors: []
    };
  },
  computed: {
    subtotal() {
      return this.selectedProducts.reduce((sum, id) => {
        const product = this.products.find(p => p.id === id);
        const quantity = this.productQuantities[id] || 1;
        return sum + (product?.price || 0) * quantity;
      }, 0);
    },
    canSubmit() {
      return this.isFormValid() && !this.isSubmitting;
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.resetCustomerForm();
        this.syncInitialProductSelection();
      } else {
        this.resetCustomerForm();
      }
    },
    selectedProduct: {
      immediate: true,
      handler(product) {
        if (product && this.isOpen) {
          if (!this.selectedProducts.includes(product.id)) {
            this.selectedProducts = [product.id];
          }
          if (!this.productQuantities[product.id] || this.productQuantities[product.id] < 1) {
            this.productQuantities[product.id] = 1;
          }
        }
      }
    }
  },
  methods: {
    handleEscape() {
      if (this.isOpen) {
        this.$emit('close');
      }
    },
    syncInitialProductSelection() {
      if (this.selectedProduct) {
        this.selectedProducts = [this.selectedProduct.id];
        this.productQuantities = { [this.selectedProduct.id]: 1 };
      } else if (this.products && this.products.length > 0) {
        this.selectedProducts = [this.products[0].id];
        this.productQuantities = { [this.products[0].id]: 1 };
      }
    },
    resetCustomerForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
      };
      this.isSubmitting = false;
      this.submitMessage = null;
      this.validationErrors = [];
    },
    getProductName(productId) {
      return this.products.find(p => p.id === productId)?.name || productId;
    },
    isProductSelected(productId) {
      return this.selectedProducts.includes(productId);
    },
    toggleProduct(productId) {
      const index = this.selectedProducts.indexOf(productId);
      if (index > -1) {
        // Deselect product
        this.selectedProducts.splice(index, 1);
        delete this.productQuantities[productId];
      } else {
        // Select product and guarantee clean default quantity of 1
        this.selectedProducts.push(productId);
        this.productQuantities[productId] = 1;
      }
    },
    getProductQuantity(productId) {
      return this.productQuantities[productId] || 1;
    },
    handleQuantityInput(productId, event) {
      const rawValue = event?.target ? event.target.value : String(event || '');
      // Clean non-digit characters
      const cleanDigits = rawValue.replace(/\D/g, '');
      const parsed = parseInt(cleanDigits, 10);
      
      if (!isNaN(parsed) && parsed >= 1) {
        // Strict boundary: clamp to max 99
        this.productQuantities[productId] = Math.min(99, Math.max(1, parsed));
      }
    },
    handleQuantityBlur(productId, event) {
      const rawValue = event?.target ? event.target.value : String(event || '');
      const cleanDigits = rawValue.replace(/\D/g, '');
      const parsed = parseInt(cleanDigits, 10);
      
      const safeQty = (!isNaN(parsed) && parsed >= 1) ? Math.min(99, Math.max(1, parsed)) : 1;
      this.productQuantities[productId] = safeQty;
      
      if (event?.target) {
        event.target.value = String(safeQty);
      }
    },
    incrementProductQuantity(productId) {
      const current = this.productQuantities[productId] || 1;
      if (current < 99) {
        this.productQuantities[productId] = current + 1;
      }
    },
    decrementProductQuantity(productId) {
      const current = this.productQuantities[productId] || 1;
      if (current > 1) {
        this.productQuantities[productId] = current - 1;
      }
    },
    isFormValid() {
      this.validationErrors = [];

      if (this.selectedProducts.length === 0) {
        this.validationErrors.push('Please select at least one product');
      }

      if (!this.formData.name || !this.formData.name.trim()) {
        this.validationErrors.push('Full name is required');
      }

      if (!this.formData.phone || !this.formData.phone.trim()) {
        this.validationErrors.push('Phone number is required');
      }

      if (!this.formData.email || !this.formData.email.trim()) {
        this.validationErrors.push('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email.trim())) {
        this.validationErrors.push('Email is invalid');
      }

      if (!this.formData.address || !this.formData.address.trim()) {
        this.validationErrors.push('Street address is required');
      }

      if (!this.formData.city || !this.formData.city.trim()) {
        this.validationErrors.push('City is required');
      }

      if (!this.formData.postalCode || !this.formData.postalCode.trim()) {
        this.validationErrors.push('Postal code is required');
      }

      return this.validationErrors.length === 0;
    },
    async handleSubmit() {
      if (!this.isFormValid()) {
        return;
      }

      this.isSubmitting = true;
      this.submitMessage = null;

      try {
        const items = this.selectedProducts.map(productId => {
          const product = this.products.find(p => p.id === productId);
          const quantity = Math.min(99, Math.max(1, Math.floor(this.productQuantities[productId] || 1)));
          return {
            name: product.name,
            quantity: quantity,
            price: product.price
          };
        });

        const payload = {
          fullName: this.formData.name.trim(),
          phone: this.formData.phone.trim(),
          email: this.formData.email.trim(),
          address: this.formData.address.trim(),
          city: this.formData.city.trim(),
          postalCode: this.formData.postalCode.trim(),
          items: items,
          totalAmount: this.subtotal
        };

        const result = await createOrder(payload);
        const orderIdText = result.orderId ? ` (Order ID: ${result.orderId})` : '';

        // Trigger persistent top-level Toast notification
        showToast(
          `Your order has been recorded successfully${orderIdText}. We will contact you soon to confirm delivery!`,
          'success',
          6000,
          'Order Placed Successfully!'
        );

        this.submitMessage = { 
          type: 'success', 
          text: result.message || 'Order submitted successfully! We will contact you soon to confirm.' 
        };

        // Close modal after confirmation
        setTimeout(() => {
          this.$emit('close');
        }, 1200);
      } catch (error) {
        console.error('Order submission error:', error);
        
        // Trigger Toast for error
        showToast(
          error.message || 'Failed to submit order. Please check your information and try again.',
          'error',
          6000,
          'Order Submission Failed'
        );

        this.submitMessage = { 
          type: 'error', 
          text: error.message || 'Error submitting order. Please try again.' 
        };
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  @apply transition-opacity duration-300;
}
.modal-enter-from, .modal-leave-to {
  @apply opacity-0;
}
</style>
