<template>
  <div id="app-root">
    <!-- Navigation Bar -->
    <Navbar @open-modal="handleOpenModal(null)" />

    <!-- 1. Hero Overview Section -->
    <HeroSection @open-modal="handleOpenModal(null)" />

    <!-- 2. About Section -->
    <AboutSection />

    <!-- 3. Products Section -->
    <ProductsSection 
      :products="products" 
      @select-product="handleOpenModal"
      @open-modal="handleOpenModal(null)"
    />

    <!-- 4. Contact Section -->
    <ContactSection />

    <!-- Order Modal Dialog -->
    <ProductModal 
      :is-open="isModalOpen" 
      :products="products"
      :selected-product="activeSelectedProduct"
      @close="handleCloseModal"
    />

    <!-- Footer -->
    <footer class="app-footer">
      <div class="container footer-container">
        <div class="footer-brand">
          <div class="brand-title">
            <span>🌿 AURA BOTANICAL</span>
          </div>
          <p class="brand-desc">
            Handcrafted micro-batch organic skincare, elixirs, and hydrosols. Formulated with ethical bio-actives for pure radiant skin.
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <h4>Navigation</h4>
            <a href="#hero">Overview</a>
            <a href="#about">About Us</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact</a>
          </div>

          <div class="footer-col">
            <h4>Direct Action</h4>
            <button class="btn-cta btn-footer-cta" @click="handleOpenModal(null)">
              <span>Order Skincare</span>
            </button>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container copyright-row">
          <p>© 2026 AURA Botanical Studio. All rights reserved. Server Excel Order Logging Active.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProductsSection from './components/ProductsSection.vue';
import ContactSection from './components/ContactSection.vue';
import ProductModal from './components/ProductModal.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    HeroSection,
    AboutSection,
    ProductsSection,
    ContactSection,
    ProductModal
  },
  data() {
    return {
      isModalOpen: false,
      activeSelectedProduct: null,
      products: [
        {
          id: 'serum',
          name: 'Rosehip Radiance Facial Serum',
          tag: 'Best Seller',
          volume: '30ml / 1.0 fl oz',
          price: 48.00,
          image: '/images/aura_serum.png',
          description: 'Cold-pressed Rosehip, Marula oil, and Vitamin C lipid formula for collagen restoration and luminous skin complexion.'
        },
        {
          id: 'elixir',
          name: 'Night Renewal Elixir',
          tag: 'Restorative',
          volume: '50ml / 1.7 fl oz',
          price: 56.00,
          image: '/images/aura_elixir.png',
          description: 'Potent nocturnal treatment with natural Bakuchiol and Blue Tansy to diminish fine lines while you sleep.'
        },
        {
          id: 'mist',
          name: 'Botanical Hydrating Mist',
          tag: 'Refreshing',
          volume: '100ml / 3.4 fl oz',
          price: 32.00,
          image: '/images/aura_mist.png',
          description: 'Soothing organic Cucumber & Rose Damascena hydrosol mist that calms redness and locks in vital hydration.'
        }
      ]
    };
  },
  methods: {
    handleOpenModal(product = null) {
      this.activeSelectedProduct = product;
      this.isModalOpen = true;
    },
    handleCloseModal() {
      this.isModalOpen = false;
      this.activeSelectedProduct = null;
    }
  }
};
</script>

<style scoped>
.app-footer {
  background: var(--color-emerald-dark);
  color: #E2EBE5;
  padding-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-container {
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  padding-bottom: 3.5rem;
}

.footer-brand {
  max-width: 420px;
}

.brand-title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.brand-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

.footer-links {
  display: flex;
  gap: 4rem;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-col h4 {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-gold);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.footer-col a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: var(--color-gold);
}

.btn-footer-cta {
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 2rem;
  }
  .footer-links {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
