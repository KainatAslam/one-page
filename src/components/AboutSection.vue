<template>
  <section id="about" class="about-section section-padding">
    <div class="container">
      <div class="about-grid">
        <div class="about-image-column">
          <div class="about-visual-card glass-card">
            <div class="quote-box">
              <span class="quote-mark">“</span>
              <p class="quote-text">
                Nature has already perfected the art of nourishment. Our job is simply to bottle it with integrity, purity, and clinical elegance.
              </p>
              <div class="quote-author">
                <strong>Elena Vance</strong>
                <span>Master Botanist & Founder</span>
              </div>
            </div>
          </div>
        </div>

        <div class="about-text-column">
          <div class="section-tag">Our Story & Mission</div>
          <h2 class="section-title">Rooted in Organic Purity, Crafted with Botanical Mastery</h2>
          <p class="about-paragraph">
            Founded in 2021 in the heart of coastal Pacific bio-regions, <strong>AURA Botanical</strong> was born out of a desire to eliminate synthetic fillers, artificial fragrances, and watered-down formulas from high-performance skincare.
          </p>
          <p class="about-paragraph">
            We source wild-harvested cold-pressed oils, active bakuchiol, bioactive rosehip, and steam-distilled hydrosols directly from sustainable organic farms. Every batch is formulated in micro-lots to ensure peak nutrient density and freshness for your skin's microbiome.
          </p>

          <div class="about-pillars">
            <div class="pillar-card">
              <div class="pillar-icon">🌱</div>
              <h4>Pure Botanical Actives</h4>
              <p>Formulated without silicone, parabens, synthetic dyes, or artificial fragrances.</p>
            </div>
            <div class="pillar-card">
              <div class="pillar-icon">🧪</div>
              <h4>Micro-Batch Integrity</h4>
              <p>Hand-poured in small batches to preserve bioactive antioxidant potency.</p>
            </div>
            <div class="pillar-card">
              <div class="pillar-icon">🌍</div>
              <h4>Ethical Sustainability</h4>
              <p>Cruelty-free, vegan certified, housed in 100% recyclable dark violet glass.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection'
};
</script>

<style scoped>
.about-section {
  background-color: var(--color-white);
  position: relative;
}

.about-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 4rem;
  align-items: center;
}

.about-visual-card {
  padding: 3.5rem 2.5rem;
  background: linear-gradient(135deg, var(--color-emerald-dark) 0%, var(--color-emerald-primary) 100%);
  color: var(--color-white);
  border-radius: 28px;
  position: relative;
  box-shadow: var(--shadow-lg);
}

.quote-mark {
  font-family: var(--font-heading);
  font-size: 5rem;
  line-height: 1;
  color: var(--color-gold);
  display: block;
  margin-bottom: -1rem;
}

.quote-text {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 2rem;
  color: #E2EBE5;
}

.quote-author strong {
  display: block;
  font-size: 1.1rem;
  color: var(--color-gold);
}

.quote-author span {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.about-text-column .section-title {
  text-align: left;
  margin-bottom: 1.5rem;
}

.about-paragraph {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  margin-bottom: 1.25rem;
  line-height: 1.75;
}

.about-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(26, 36, 32, 0.1);
}

.pillar-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pillar-icon {
  font-size: 1.8rem;
}

.pillar-card h4 {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-emerald-dark);
}

.pillar-card p {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

@media (max-width: 968px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .about-pillars {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
