<template>
  <header class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-container">
      <a href="#hero" class="brand-logo" @click="closeMenu">
        <span class="logo-icon">💧</span>
        <div class="flex flex-col leading-none">
          <span class="logo-text">Clean &amp; Cool</span>
          <span class="logo-subtext">WATER CARE</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex gap-8 items-center">
        <a href="#hero" class="nav-link">Overview</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#products" class="nav-link">Products</a>
        <a href="#contact" class="nav-link">Contact</a>
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

        <!-- Mobile Menu Toggle Button -->
        <AppButton
          variant="ghost"
          size="sm"
          class="md:hidden"
          :aria-label="mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'"
          :aria-expanded="mobileMenuOpen"
          @click="toggleMenu"
        >
          <template #icon-left>
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </template>
        </AppButton>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition name="mobile-menu">
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-indigo-lg border-b border-indigo-dark/10 py-4 px-6 flex flex-col gap-2"
      >
        <a href="#hero" @click="closeMenu" class="nav-link py-2.5 text-base border-b border-indigo-dark/5">Overview</a>
        <a href="#about" @click="closeMenu" class="nav-link py-2.5 text-base border-b border-indigo-dark/5">About</a>
        <a href="#products" @click="closeMenu" class="nav-link py-2.5 text-base border-b border-indigo-dark/5">Products</a>
        <a href="#contact" @click="closeMenu" class="nav-link py-2.5 text-base">Contact</a>
      </div>
    </transition>
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
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
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
  @apply text-indigo-dark font-semibold text-sm transition-colors duration-200 hover:text-indigo-primary relative;
}

.nav-link::after {
  @apply absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-accent transition-all duration-200;
  content: '';
}

.nav-link:hover::after {
  @apply w-full;
}

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.25s ease-out;
}

.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
