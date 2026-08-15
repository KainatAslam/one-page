<template>
  <section id="hero" class="hero-section">
    <div class="container hero-container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          100% Organic & Cold-Pressed Botanicals
        </div>
        <h1 class="hero-title">
          Pure Botanical Science for <span class="highlight">Radiant, Healthy Skin</span>
        </h1>
        <p class="hero-description">
          Handcrafted in micro-batches with pure botanical extracts, rich elixirs, and restorative hydrosols designed for clean skincare purists seeking glowing results.
        </p>
        <div class="hero-actions">
          <a href="#products" class="btn-cta hero-cta">
            <span>Explore Products</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
          </a>
          <button class="btn-secondary hero-secondary" @click="$emit('open-modal')">
            <span>Quick Order</span>
          </button>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">Clean Ingredients</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">0%</span>
            <span class="stat-label">Synthetics or Toxins</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">4.9★</span>
            <span class="stat-label">User Rating</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="image-wrapper glass-card">
          <img src="/images/aura_hero.png" alt="AURA Botanical Skincare Products" class="hero-img" />
          <div class="floating-card glass-card">
            <div class="card-icon">🍃</div>
            <div class="card-text">
              <strong>Sustainable Packaging</strong>
              <span>Recyclable UV Glass Bottles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  emits: ['open-modal']
};
</script>

<style scoped>
.hero-section {
  padding-top: 8.5rem;
  padding-bottom: 5rem;
  background: radial-gradient(circle at 10% 20%, rgba(91, 122, 106, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 90% 80%, rgba(200, 157, 75, 0.08) 0%, transparent 60%);
  position: relative;
  overflow: hidden;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3.5rem;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-sage-light);
  color: var(--color-emerald-primary);
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 30px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(45, 94, 70, 0.15);
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-emerald-primary);
}

.hero-title {
  font-size: 3.2rem;
  margin-bottom: 1.25rem;
  letter-spacing: -0.5px;
}

.hero-title .highlight {
  color: var(--color-gold);
  font-style: italic;
  font-weight: 600;
}

.hero-description {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  margin-bottom: 2.2rem;
  max-width: 540px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 3rem;
}

.hero-cta {
  padding: 1rem 2.2rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  padding-top: 1.8rem;
  border-top: 1px solid rgba(26, 36, 32, 0.1);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-emerald-primary);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 35px;
  background-color: rgba(26, 36, 32, 0.1);
}

/* Visual Styling */
.hero-visual {
  position: relative;
}

.image-wrapper {
  position: relative;
  padding: 12px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(18, 40, 29, 0.12);
}

.hero-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 20px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-wrapper:hover .hero-img {
  transform: scale(1.02);
}

.floating-card {
  position: absolute;
  bottom: 25px;
  left: 25px;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1.4rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 1.6rem;
}

.card-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.card-text strong {
  font-size: 0.9rem;
  color: var(--color-emerald-dark);
}

.card-text span {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .hero-title {
    font-size: 2.5rem;
  }
}
</style>
