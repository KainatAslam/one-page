<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-container glass-card" role="dialog" aria-modal="true">
          <!-- Close Button -->
          <button class="modal-close-btn" @click="closeModal" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-badge">Direct Server Checkout</div>
            <h2 class="modal-title">Customize Your Botanical Order</h2>
            <p class="modal-subtitle">Adjust item quantities below and provide your delivery details.</p>
          </div>

          <!-- SUCCESS CONFIRMATION STATE -->
          <div v-if="orderSubmitted" class="modal-success-state">
            <div class="success-icon-wrap">
              <span class="success-checkmark">✓</span>
            </div>
            <h3 class="success-title">Order Placed Successfully!</h3>
            <p class="success-msg">
              Thank you, <strong>{{ customerForm.fullName }}</strong>! Your order reference is 
              <span class="order-ref">{{ successOrderId }}</span>.
            </p>
            <p class="success-sub">
              Your submission has been securely recorded on our server records. Our team will contact you shortly to confirm delivery.
            </p>
            <div class="success-actions">
              <button class="btn-cta btn-cta-emerald" @click="resetAndClose">
                <span>Done / Continue Browsing</span>
              </button>
            </div>
          </div>

          <!-- ORDER FORM STATE -->
          <div v-else class="modal-body">
            <!-- 1. PRODUCT QUANTITY SELECTOR LIST -->
            <div class="section-box">
              <h3 class="box-title">
                <span>1. Select Products & Quantities</span>
                <span class="total-badge">Total: ${{ grandTotal.toFixed(2) }}</span>
              </h3>

              <div class="product-selector-list">
                <div 
                  v-for="item in quantities" 
                  :key="item.id" 
                  class="selector-item"
                  :class="{ 'item-selected': item.quantity > 0 }"
                >
                  <img :src="item.image" :alt="item.name" class="selector-thumb" />
                  <div class="selector-info">
                    <div class="selector-name">{{ item.name }}</div>
                    <div class="selector-price">${{ item.price.toFixed(2) }} / unit</div>
                  </div>

                  <div class="quantity-control">
                    <button 
                      class="qty-btn" 
                      @click="decreaseQty(item.id)" 
                      :disabled="item.quantity === 0"
                      aria-label="Decrease quantity"
                    >-</button>
                    <span class="qty-display">{{ item.quantity }}</span>
                    <button 
                      class="qty-btn" 
                      @click="increaseQty(item.id)" 
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                </div>
              </div>

              <!-- Item validation error -->
              <div v-if="formErrors.items" class="error-banner">
                {{ formErrors.items }}
              </div>
            </div>

            <!-- 2. CUSTOMER DELIVERY DETAILS FORM -->
            <form @submit.prevent="submitOrder" class="section-box customer-form">
              <h3 class="box-title">
                <span>2. Delivery & Customer Details</span>
              </h3>

              <div class="form-grid">
                <!-- Full Name -->
                <div class="form-group full-width">
                  <label for="fullName">Full Name <span class="req">*</span></label>
                  <input 
                    id="fullName" 
                    v-model="customerForm.fullName" 
                    type="text" 
                    placeholder="e.g. Sarah Jenkins"
                    :class="{ 'input-error': formErrors.fullName }"
                  />
                  <span v-if="formErrors.fullName" class="field-error">{{ formErrors.fullName }}</span>
                </div>

                <!-- Phone -->
                <div class="form-group">
                  <label for="phone">Phone Number <span class="req">*</span></label>
                  <input 
                    id="phone" 
                    v-model="customerForm.phone" 
                    type="tel" 
                    placeholder="e.g. +1 (555) 019-2834"
                    :class="{ 'input-error': formErrors.phone }"
                  />
                  <span v-if="formErrors.phone" class="field-error">{{ formErrors.phone }}</span>
                </div>

                <!-- Email -->
                <div class="form-group">
                  <label for="email">Email Address <span class="req">*</span></label>
                  <input 
                    id="email" 
                    v-model="customerForm.email" 
                    type="email" 
                    placeholder="sarah@example.com"
                    :class="{ 'input-error': formErrors.email }"
                  />
                  <span v-if="formErrors.email" class="field-error">{{ formErrors.email }}</span>
                </div>

                <!-- Address -->
                <div class="form-group full-width">
                  <label for="address">Street Address <span class="req">*</span></label>
                  <input 
                    id="address" 
                    v-model="customerForm.address" 
                    type="text" 
                    placeholder="e.g. 742 Evergreen Terrace, Suite 4B"
                    :class="{ 'input-error': formErrors.address }"
                  />
                  <span v-if="formErrors.address" class="field-error">{{ formErrors.address }}</span>
                </div>

                <!-- City -->
                <div class="form-group">
                  <label for="city">City <span class="req">*</span></label>
                  <input 
                    id="city" 
                    v-model="customerForm.city" 
                    type="text" 
                    placeholder="e.g. San Francisco"
                    :class="{ 'input-error': formErrors.city }"
                  />
                  <span v-if="formErrors.city" class="field-error">{{ formErrors.city }}</span>
                </div>

                <!-- Postal Code -->
                <div class="form-group">
                  <label for="postalCode">Postal Code <span class="req">*</span></label>
                  <input 
                    id="postalCode" 
                    v-model="customerForm.postalCode" 
                    type="text" 
                    placeholder="e.g. 94107"
                    :class="{ 'input-error': formErrors.postalCode }"
                  />
                  <span v-if="formErrors.postalCode" class="field-error">{{ formErrors.postalCode }}</span>
                </div>
              </div>

              <!-- General Submission Error Banner -->
              <div v-if="submissionError" class="error-banner">
                {{ submissionError }}
              </div>

              <!-- Submit Button -->
              <div class="modal-footer">
                <button 
                  type="submit" 
                  class="btn-cta btn-submit-order" 
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner"></span>
                  <span v-else>Confirm & Place Order (${{ grandTotal.toFixed(2) }})</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  name: 'ProductModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    products: {
      type: Array,
      required: true
    },
    selectedProduct: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  data() {
    return {
      quantities: [],
      customerForm: {
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        postalCode: ''
      },
      formErrors: {},
      isSubmitting: false,
      submissionError: '',
      orderSubmitted: false,
      successOrderId: ''
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.initQuantities();
        this.orderSubmitted = false;
        this.submissionError = '';
        this.formErrors = {};
      }
    },
    selectedProduct() {
      if (this.isOpen) {
        this.initQuantities();
      }
    }
  },
  computed: {
    grandTotal() {
      return this.quantities.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    selectedItems() {
      return this.quantities.filter(item => item.quantity > 0);
    }
  },
  methods: {
    initQuantities() {
      this.quantities = this.products.map(p => {
        let defaultQty = 0;
        if (this.selectedProduct && this.selectedProduct.id === p.id) {
          defaultQty = 1;
        }
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          quantity: defaultQty
        };
      });

      // If no product pre-selected, default first item to 1
      if (this.quantities.length > 0 && !this.quantities.some(q => q.quantity > 0)) {
        this.quantities[0].quantity = 1;
      }
    },
    increaseQty(productId) {
      const item = this.quantities.find(i => i.id === productId);
      if (item) item.quantity++;
      if (this.formErrors.items) delete this.formErrors.items;
    },
    decreaseQty(productId) {
      const item = this.quantities.find(i => i.id === productId);
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
    validateForm() {
      const errors = {};
      const form = this.customerForm;

      if (this.selectedItems.length === 0) {
        errors.items = 'Please select at least 1 product quantity above.';
      }

      if (!form.fullName.trim()) {
        errors.fullName = 'Full name is required.';
      }

      if (!form.phone.trim()) {
        errors.phone = 'Phone number is required.';
      }

      if (!form.email.trim()) {
        errors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }

      if (!form.address.trim()) {
        errors.address = 'Street address is required.';
      }

      if (!form.city.trim()) {
        errors.city = 'City is required.';
      }

      if (!form.postalCode.trim()) {
        errors.postalCode = 'Postal code is required.';
      }

      this.formErrors = errors;
      return Object.keys(errors).length === 0;
    },
    async submitOrder() {
      this.submissionError = '';
      if (!this.validateForm()) return;

      this.isSubmitting = true;

      try {
        const payload = {
          items: this.selectedItems.map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity
          })),
          totalAmount: this.grandTotal,
          fullName: this.customerForm.fullName.trim(),
          email: this.customerForm.email.trim(),
          phone: this.customerForm.phone.trim(),
          address: this.customerForm.address.trim(),
          city: this.customerForm.city.trim(),
          postalCode: this.customerForm.postalCode.trim()
        };

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Server processing error.');
        }

        this.orderSubmitted = true;
        this.successOrderId = data.orderId;
      } catch (err) {
        console.error('Order Submission Failure:', err);
        this.submissionError = err.message || 'Failed to submit order. Please check network connection.';
      } finally {
        this.isSubmitting = false;
      }
    },
    closeModal() {
      this.$emit('close');
    },
    resetAndClose() {
      this.customerForm = {
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        postalCode: ''
      };
      this.orderSubmitted = false;
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(18, 40, 29, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  background: #FFFFFF;
  border-radius: 28px;
  padding: 2.5rem;
  overflow-y: auto;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--color-sand-light);
  color: var(--color-emerald-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: var(--color-gold);
  color: var(--color-emerald-dark);
}

.modal-header {
  margin-bottom: 1.8rem;
  text-align: center;
}

.modal-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.4rem;
}

.modal-title {
  font-size: 1.8rem;
  color: var(--color-emerald-dark);
  margin-bottom: 0.3rem;
}

.modal-subtitle {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.section-box {
  background: var(--color-sand-light);
  border-radius: 18px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(26, 36, 32, 0.06);
}

.box-title {
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-emerald-dark);
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-badge {
  background: var(--color-emerald-primary);
  color: var(--color-gold);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

/* Product Selector List */
.product-selector-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.selector-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  background: #FFFFFF;
  border-radius: 14px;
  border: 1px solid rgba(26, 36, 32, 0.08);
  transition: all 0.2s ease;
}

.selector-item.item-selected {
  border-color: var(--color-emerald-primary);
  box-shadow: 0 4px 12px rgba(30, 66, 48, 0.08);
}

.selector-thumb {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  object-fit: cover;
}

.selector-info {
  flex-grow: 1;
}

.selector-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--color-emerald-dark);
}

.selector-price {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--color-sand-light);
  padding: 0.25rem 0.5rem;
  border-radius: 25px;
  border: 1px solid rgba(26, 36, 32, 0.1);
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--color-white);
  color: var(--color-emerald-dark);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.qty-btn:hover:not(:disabled) {
  background: var(--color-gold);
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-display {
  font-weight: 700;
  font-size: 0.95rem;
  min-width: 20px;
  text-align: center;
}

/* Form Styles */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-emerald-dark);
}

.req {
  color: var(--color-error);
}

.form-group input {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1.5px solid rgba(26, 36, 32, 0.15);
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  border-color: var(--color-emerald-primary);
  box-shadow: 0 0 0 3px rgba(30, 66, 48, 0.1);
}

.form-group input.input-error {
  border-color: var(--color-error);
}

.field-error {
  font-size: 0.75rem;
  color: var(--color-error);
}

.error-banner {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(217, 56, 56, 0.1);
  border: 1px solid var(--color-error);
  border-radius: 10px;
  color: var(--color-error);
  font-size: 0.85rem;
  font-weight: 600;
}

.modal-footer {
  margin-top: 1.5rem;
}

.btn-submit-order {
  width: 100%;
  padding: 1rem;
  font-size: 1.05rem;
}

/* Success State */
.modal-success-state {
  text-align: center;
  padding: 2rem 1rem;
}

.success-icon-wrap {
  width: 70px;
  height: 70px;
  background: var(--color-sage-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  border: 2px solid var(--color-emerald-primary);
}

.success-checkmark {
  font-size: 2.2rem;
  color: var(--color-emerald-primary);
  font-weight: bold;
}

.success-title {
  font-size: 2rem;
  color: var(--color-emerald-dark);
  margin-bottom: 0.8rem;
}

.success-msg {
  font-size: 1.1rem;
  color: var(--color-text-dark);
  margin-bottom: 0.5rem;
}

.order-ref {
  font-weight: 800;
  color: var(--color-emerald-primary);
  background: var(--color-sage-light);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.success-sub {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Modal Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
