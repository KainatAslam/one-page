<template>
  <transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-indigo-dark/65" @click="$emit('close')"></div>

      <!-- Modal Content -->
      <div class="glass-card relative w-full max-w-3xl max-h-[95vh] mx-4 shadow-2xl border border-white/80 border-sm overflow-y-auto">
        <!-- Close Button -->
        <AppButton
          variant="ghost"
          size="sm"
          aria-label="Close modal"
          class="absolute top-6 right-6 z-10 !px-2 !py-2"
          @click="$emit('close')"
        >
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </template>
        </AppButton>

        <!-- Content -->
        <div class="p-8">
          <!-- Title -->
          <h2 class="font-heading text-3xl font-bold text-indigo-dark mb-8">Order Clean &amp; Cool</h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Product Selection Section -->
            <div class="pb-6 border-b border-indigo-primary/20">
              <label class="block text-sm font-bold text-indigo-primary mb-4">
                <span class="text-red-600">*</span> Select Products
              </label>
              <div class="grid grid-cols-1 gap-3">
                <div 
                  v-for="product in products"
                  :key="product.id"
                  @click="selectProduct(product)"
                  class="flex items-center gap-4 p-4 bg-indigo-bg border-2 border-sm cursor-pointer transition-all duration-fast"
                  :class="selectedProducts.includes(product.id) ? 'border-indigo-primary bg-indigo-primary/10' : 'border-indigo-primary/30 hover:border-indigo-primary/60'"
                >
                  <div class="w-14 h-14 overflow-hidden flex-shrink-0 border-sm">
                    <img :src="product.image" :alt="product.name" class="w-full h-full object-cover"/>
                  </div>
                  <div class="flex-grow">
                    <h4 class="font-bold text-indigo-dark">{{ product.name }}</h4>
                    <p class="text-sm text-indigo-primary">{{ product.volume }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-heading font-bold text-indigo-primary text-lg">${{ product.price.toFixed(2) }}</p>
                  </div>
                  <input 
                    type="checkbox"
                    :checked="selectedProducts.includes(product.id)"
                    class="w-5 h-5 border-2 border-indigo-primary cursor-pointer border-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Product Quantities Section -->
            <div v-if="selectedProducts.length > 0" class="pb-6 border-b border-indigo-primary/20">
              <label class="block text-sm font-bold text-indigo-primary mb-4">
                <span class="text-red-600">*</span> Quantity per Product
              </label>
              <div class="space-y-3">
                <div 
                  v-for="productId in selectedProducts"
                  :key="`qty-${productId}`"
                  class="flex items-center justify-between p-4 bg-indigo-bg border border-indigo-primary/20 border-sm"
                >
                  <span class="font-semibold text-indigo-dark">{{ products.find(p => p.id === productId)?.name }}</span>
                  <div class="flex items-center gap-2 bg-white p-1 border-sm">
                    <AppButton
                      type="button"
                      variant="primary"
                      size="sm"
                      class="!px-2 !py-2"
                      :aria-label="`Decrease quantity for ${productId}`"
                      @click="decrementProductQuantity(productId)"
                    >
                      <template #default>−</template>
                    </AppButton>
                    <input 
                      :value="getProductQuantity(productId)" 
                      type="number" 
                      min="1"
                      @change="(e) => setProductQuantity(productId, parseInt(e.target.value) || 1)"
                      class="w-16 text-center bg-transparent text-indigo-dark font-bold outline-none"
                    />
                    <AppButton
                      type="button"
                      variant="primary"
                      size="sm"
                      class="!px-2 !py-2"
                      :aria-label="`Increase quantity for ${productId}`"
                      @click="incrementProductQuantity(productId)"
                    >
                      <template #default>+</template>
                    </AppButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- Customer Details Section -->
            <div class="pb-6 border-b border-indigo-primary/20">
              <h3 class="text-lg font-bold text-indigo-dark mb-4">Customer Information</h3>
              
              <!-- Name & Email Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-bold text-indigo-primary mb-2">
                    <span class="text-red-600">*</span> Full Name
                  </label>
                  <input 
                    v-model="formData.name"
                    type="text" 
                    placeholder="John Doe"
                    required
                    class="w-full bg-white text-indigo-dark px-4 py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                  />
                </div>
                <div>
                  <label class="block text-sm font-bold text-indigo-primary mb-2">
                    <span class="text-red-600">*</span> Email
                  </label>
                  <input
                    v-model="formData.email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    class="w-full bg-white text-indigo-dark px-4 py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                  />
                </div>
              </div>

              <!-- Phone Row -->
              <div class="mb-4">
                <label class="block text-sm font-bold text-indigo-primary mb-2">
                  <span class="text-red-600">*</span> Phone Number
                </label>
                <input 
                  v-model="formData.phone"
                  type="tel" 
                  placeholder="+1 (555) 123-4567"
                  required
                  class="w-full bg-white text-indigo-dark px-4 py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                />
              </div>

              <!-- Address Row -->
              <div class="mb-4">
                <label class="block text-sm font-bold text-indigo-primary mb-2">
                  <span class="text-red-600">*</span> Street Address
                </label>
                <input 
                  v-model="formData.address"
                  type="text" 
                  placeholder="123 Main Street"
                  required
                  class="w-full bg-white text-indigo-dark px-4 py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                />
              </div>

              <!-- City & Postal Code Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-bold text-indigo-primary mb-2">
                    <span class="text-red-600">*</span> City
                  </label>
                  <input 
                    v-model="formData.city"
                    type="text" 
                    placeholder="New York"
                    required
                    class="w-full bg-white text-indigo-dark px-4 py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                  />
                </div>
                <div>
                  <label class="block text-sm font-bold text-indigo-primary mb-2">
                    <span class="text-red-600">*</span> Postal Code
                  </label>
                  <input 
                    v-model="formData.postalCode"
                    type="text" 
                    placeholder="10001"
                    required
                    class="w-full bg-white text-indigo-dark px-4 py-3 border-2 border-indigo-primary/20 border-sm focus:border-indigo-primary focus:outline-none transition-all duration-fast"
                  />
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="p-4 bg-indigo-bg border border-indigo-primary/20 border-sm">
              <div class="space-y-2 mb-4 pb-4 border-b border-indigo-primary/20">
                <div class="text-sm font-semibold text-indigo-primary">Order Summary:</div>
                <div v-for="productId in selectedProducts" :key="`summary-${productId}`" class="text-xs text-indigo-primary">
                  {{ products.find(p => p.id === productId)?.name }} × {{ getProductQuantity(productId) }}
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

            <!-- Buttons -->
            <div class="grid grid-cols-2 gap-3 pt-4">
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

export default {
  name: 'ProductModal',
  components: { AppButton },
  props: {
    isOpen: Boolean,
    products: Array,
    selectedProduct: Object
  },
  emits: ['close'],
  data() {
    return {
      selectedProducts: [],
      productQuantities: {}, // { productId: quantity }
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
    selectedProduct(product) {
      if (product) {
        this.selectedProducts = [product.id];
        this.productQuantities[product.id] = 1;
      }
    }
  },
  methods: {
    selectProduct(product) {
      const index = this.selectedProducts.indexOf(product.id);
      if (index > -1) {
        this.selectedProducts.splice(index, 1);
        delete this.productQuantities[product.id];
      } else {
        this.selectedProducts.push(product.id);
        this.productQuantities[product.id] = 1;
      }
    },
    getProductQuantity(productId) {
      return this.productQuantities[productId] || 1;
    },
    setProductQuantity(productId, quantity) {
      if (quantity >= 1) {
        this.productQuantities[productId] = quantity;
      }
    },
    incrementProductQuantity(productId) {
      this.productQuantities[productId] = (this.productQuantities[productId] || 1) + 1;
    },
    decrementProductQuantity(productId) {
      if ((this.productQuantities[productId] || 1) > 1) {
        this.productQuantities[productId] = (this.productQuantities[productId] || 1) - 1;
      }
    },
    isFormValid() {
      this.validationErrors = [];

      if (this.selectedProducts.length === 0) {
        this.validationErrors.push('Please select at least one product');
      }

      if (!this.formData.name || this.formData.name.trim() === '') {
        this.validationErrors.push('Full name is required');
      }

      if (!this.formData.phone || this.formData.phone.trim() === '') {
        this.validationErrors.push('Phone number is required');
      }

      if (!this.formData.email || this.formData.email.trim() === '') {
        this.validationErrors.push('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
        this.validationErrors.push('Email is invalid');
      }

      if (!this.formData.address || this.formData.address.trim() === '') {
        this.validationErrors.push('Street address is required');
      }

      if (!this.formData.city || this.formData.city.trim() === '') {
        this.validationErrors.push('City is required');
      }

      if (!this.formData.postalCode || this.formData.postalCode.trim() === '') {
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
        // Build product details for the order - match backend expectations
        const items = this.selectedProducts.map(productId => {
          const product = this.products.find(p => p.id === productId);
          const quantity = this.productQuantities[productId] || 1;
          return {
            name: product.name,  // Backend expects 'name', not 'productName'
            quantity: quantity,
            price: product.price
          };
        });

        // Build payload matching backend expected structure
        const payload = {
          // Customer details - backend expects 'fullName', not 'name'
          fullName: this.formData.name.trim(),
          phone: this.formData.phone.trim(),
          email: this.formData.email.trim(),
          address: this.formData.address.trim(),
          city: this.formData.city.trim(),
          postalCode: this.formData.postalCode.trim(),
          // Order details - backend expects 'items' and 'totalAmount'
          items: items,
          totalAmount: this.subtotal
        };

        const response = await fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          this.submitMessage = { 
            type: 'success', 
            text: 'Order submitted successfully! We will contact you soon to confirm.' 
          };
          setTimeout(() => this.$emit('close'), 2500);
        } else {
          const errorData = await response.json().catch(() => ({}));
          this.submitMessage = { 
            type: 'error', 
            text: errorData.error || errorData.message || 'Error submitting order. Please try again.' 
          };
        }
      } catch (error) {
        console.error('Order submission error:', error);
        this.submitMessage = { 
          type: 'error', 
          text: 'Network error. Please check your connection and try again.' 
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
