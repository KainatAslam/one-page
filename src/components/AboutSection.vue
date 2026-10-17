<template>
  <section id="about" class="section-padding bg-white">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Image / Quote Card -->
        <div class="glass-card p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-indigo-primary to-indigo-dark text-white shadow-indigo-lg border-sm">
          <div class="flex flex-col">
            <span class="font-heading text-7xl sm:text-8xl leading-none text-indigo-accent -mb-4 block">"</span>
            <p class="font-heading text-xl sm:text-2xl leading-relaxed italic mb-8 text-indigo-bg">
              A clean tank means safer water for every family, every meal, and every day. Clean &amp; Cool makes that protection simple and effective.
            </p>
            <div class="flex flex-col">
              <strong class="block text-lg text-indigo-accent">Clean &amp; Cool</strong>
              <span class="text-sm text-white/70">Water Tank Care Experts</span>
            </div>
          </div>
        </div>

        <!-- Text -->
        <div>
          <div class="section-tag">About Us</div>
          <h2 class="section-title text-left">Your trusted solution for cleaner, safer water storage</h2>
          
          <p class="text-base sm:text-lg text-indigo-primary mb-4 leading-relaxed">
            Clean &amp; Cool is a trusted brand offering high-quality Water Tank Cleaner Powder. Our powder helps remove sludge, algae, bacteria, and bad odor that build up on tank walls and floors, making water safer for daily use.
          </p>
         
          <!-- Pillars -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-indigo-dark/10">
            <div class="flex flex-col gap-2">
              <div class="text-3xl">🧼</div>
              <h4 class="font-body font-bold text-sm text-indigo-dark">Fast Cleaning</h4>
              <p class="text-xs text-indigo-primary leading-relaxed">Apply powder, scrub with a brush, and remove dirt and stains instantly.</p>
            </div>
            <div class="flex flex-col gap-2">
              <div class="text-3xl">🛡️</div>
              <h4 class="font-body font-bold text-sm text-indigo-dark">Safe Water</h4>
              <p class="text-xs text-indigo-primary leading-relaxed">Helps fight algae, bacteria, and bad odor for healthier stored water.</p>
            </div>
            <div class="flex flex-col gap-2">
              <div class="text-3xl">🏠</div>
              <h4 class="font-body font-bold text-sm text-indigo-dark">Every Space</h4>
              <p class="text-xs text-indigo-primary leading-relaxed">Suitable for homes, offices, schools, and commercial tanks of all sizes.</p>
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
