<template>
  <header class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-container">
      <a href="#hero" class="brand-logo">
        <span class="logo-icon">🌿</span>
        <span class="logo-text">AURA</span>
        <span class="logo-subtext">BOTANICAL</span>
      </a>

      <nav class="nav-menu" :class="{ 'is-active': mobileMenuOpen }">
        <a href="#hero" @click="closeMenu">Overview</a>
        <a href="#about" @click="closeMenu">About</a>
        <a href="#products" @click="closeMenu">Products</a>
        <a href="#contact" @click="closeMenu">Contact</a>
      </nav>

      <div class="navbar-actions">
        <button class="btn-cta btn-nav-cta" @click="$emit('open-modal')">
          <span>Order Now</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>

        <button class="mobile-toggle" @click="toggleMenu" aria-label="Toggle Navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
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
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 0;
  transition: all 0.3s ease;
  background: rgba(250, 248, 245, 0.6);
  backdrop-filter: blur(10px);
}

.navbar.scrolled {
  padding: 0.85rem 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(18, 40, 29, 0.08);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-emerald-dark);
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.logo-subtext {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 2.5px;
  color: var(--color-gold);
  margin-top: 4px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-menu a {
  text-decoration: none;
  color: var(--color-text-dark);
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  position: relative;
}

.nav-menu a:hover {
  color: var(--color-emerald-light);
}

.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--color-gold);
  transition: width 0.25s ease;
}

.nav-menu a:hover::after {
  width: 100%;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-nav-cta {
  padding: 0.65rem 1.4rem;
  font-size: 0.9rem;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-toggle span {
  width: 24px;
  height: 2px;
  background-color: var(--color-emerald-dark);
  transition: all 0.3s ease;
}

@media (max-width: 868px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-white);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-150%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu.is-active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
}
</style>
