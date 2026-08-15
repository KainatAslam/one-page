<template>
  <section id="products" class="products-section section-padding">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Handcrafted Formulations</span>
        <h2 class="section-title">Explore Our Botanical Collection</h2>
        <p class="section-subtitle">
          Pure organic elixirs and active botanicals for your daily skincare ritual. Click any product to customize your order.
        </p>
      </div>

      <div class="products-grid">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-card glass-card"
          @click="$emit('select-product', product)"
        >
          <div class="product-badge">{{ product.tag }}</div>
          <div class="product-image-container">
            <img :src="product.image" :alt="product.name" class="product-image" />
            <div class="quick-view-overlay">
              <span class="btn-cta btn-quick-order">
                <span>Order Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
              </span>
            </div>
          </div>

          <div class="product-info">
            <div class="product-meta">
              <span class="product-volume">{{ product.volume }}</span>
              <span class="product-rating">5.0 ★</span>
            </div>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-footer">
              <div class="product-price">${{ product.price.toFixed(2) }}</div>
              <button 
                class="btn-cta btn-card-action"
                @click.stop="$emit('select-product', product)"
              >
                Select & Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Highlighted CTA Banner below products -->
      <div class="collection-cta-banner glass-card">
        <div class="banner-content">
          <h3>Need a custom skincare bundle or special order?</h3>
          <p>Select multiple products together in our fast checkout modal for combined order savings.</p>
        </div>
        <button class="btn-cta btn-cta-emerald banner-btn" @click="$emit('open-modal')">
          <span>Open Order Form</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductsSection',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  emits: ['select-product', 'open-modal']
};
</script>

<style scoped>
.products-section {
  background: linear-gradient(180deg, var(--color-sand-light) 0%, var(--color-cream) 100%);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.2rem;
  margin-bottom: 4rem;
}

.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(18, 40, 29, 0.12);
  border-color: var(--color-gold);
}

.product-badge {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 2;
  background: var(--color-emerald-dark);
  color: var(--color-gold);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 0.35rem 0.85rem;
  border-radius: 30px;
  text-transform: uppercase;
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-top: 85%;
  overflow: hidden;
  background-color: var(--color-sage-light);
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .product-image {
  transform: scale(1.06);
}

.quick-view-overlay {
  position: absolute;
  inset: 0;
  background: rgba(18, 40, 29, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .quick-view-overlay {
  opacity: 1;
}

.btn-quick-order {
  padding: 0.7rem 1.4rem;
  font-size: 0.85rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.product-info {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.product-rating {
  color: var(--color-gold);
  font-weight: 700;
}

.product-name {
  font-size: 1.35rem;
  margin-bottom: 0.6rem;
  color: var(--color-emerald-dark);
}

.product-description {
  font-size: 0.92rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(26, 36, 32, 0.08);
}

.product-price {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-emerald-dark);
}

.btn-card-action {
  padding: 0.65rem 1.2rem;
  font-size: 0.85rem;
}

/* Banner Styling */
.collection-cta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.2rem 3rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 241, 233, 0.95) 100%);
  border: 1.5px solid var(--color-gold);
}

.banner-content h3 {
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.banner-content p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.banner-btn {
  white-space: nowrap;
}

@media (max-width: 968px) {
  .products-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto 3rem auto;
  }
  .collection-cta-banner {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
  }
}
</style>
