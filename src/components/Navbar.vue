<template>
  <header class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-container">
      <a href="#hero" class="brand-logo">
        <span class="logo-icon">💧</span>
        <div class="flex flex-col leading-none">
          <span class="logo-text">Clean &amp; Cool</span>
          <span class="logo-subtext">WATER CARE</span>
        </div>
      </a>

      <nav class="nav-menu" :class="{ 'is-active': mobileMenuOpen }">
        <a href="#hero" @click="closeMenu" class="nav-link">Overview</a>
        <a href="#about" @click="closeMenu" class="nav-link">About</a>
        <a href="#products" @click="closeMenu" class="nav-link">Products</a>
        <a href="#contact" @click="closeMenu" class="nav-link">Contact</a>
      </nav>

      <div class="navbar-actions">
        <AppButton
          variant="primary"
          size="sm"
          label="Order Now"
          @click="$emit('open-modal')"
        >
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </template>
        </AppButton>

        <AppButton
          variant="ghost"
          size="sm"
          aria-label="Toggle Navigation"
          @click="toggleMenu"
        >
          <template #icon-left>
            <span class="mobile-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </template>
        </AppButton>
      </div>
    </div>
  </header>
</template>

<script>
import AppButton from './ui/AppButton.vue';

export default {
  name: 'Navbar',
  components: { AppButton },
  emits: ['open-modal'],
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 30;
    },
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMenu() {
      this.mobileMenuOpen = false;
    }
  }
};
</script>

<style scoped>
.nav-link {
  @apply text-indigo-dark font-semibold text-sm transition-colors duration-200 hover:text-indigo-light relative;
}

.nav-link::after {
  @apply absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-accent transition-all duration-200;
  content: '';
}

.nav-link:hover::after {
  @apply w-full;
}
</style>
