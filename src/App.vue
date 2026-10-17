<template>
  <div id="app-root">

    <!-- Navigation Bar -->
    <Navbar @open-modal="handleOpenModal(null)" />

    <!-- 1. Hero Overview Section -->
    <HeroSection @open-modal="handleOpenModal(null)" />

    <!-- Order Modal Dialog -->
    <ProductModal 
      :is-open="isModalOpen" 
      :products="products"
      :selected-product="activeSelectedProduct"
      @close="handleCloseModal"
    />
  

    <!-- 3. Products Section -->
    <ProductsSection 
      :products="products" 
      @select-product="handleOpenModal"
      @open-modal="handleOpenModal(null)"
    />

  <!-- 2. About Section -->
    <AboutSection />
    <!-- 4. Contact Section -->
    <ContactSection />



    <!-- Global Toast Notification Container -->
    <AppToast />

    <!-- Footer -->
    <footer class="app-footer">
      <div class="container footer-container">
        <div class="footer-brand">
          <div class="brand-title">
            <span>💧 CLEAN &amp; COOL</span>
          </div>
          <p class="brand-desc">
            Your trusted water tank cleaner powder for safer, healthier water storage. Easy to use, effective on sludge, algae, odor, and bacteria.
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
            <AppButton
              variant="primary"
              size="sm"
              label="Order Now"
              class="w-full sm:w-auto"
              @click="handleOpenModal(null)"
            />
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container copyright-row">
          <p>© 2026 Clean &amp; Cool. All rights reserved.</p>
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
import AppButton from './components/ui/AppButton.vue';
import AppToast from './components/ui/AppToast.vue';
import productsData from './data/products.json';

export default {
  name: 'App',
  components: {
    Navbar,
    HeroSection,
    AboutSection,
    ProductsSection,
    ContactSection,
    ProductModal,
    AppButton,
    AppToast
  },
  data() {
    return {
      isModalOpen: false,
      activeSelectedProduct: null,
      products: productsData
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
