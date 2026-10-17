<template>
  <section id="hero" class="pt-32 pb-20 hero-radial-bg">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-14 items-center">
        <!-- Content -->
        <div class="lg:col-span-6">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-indigo-bg text-indigo-primary font-bold text-xs px-4 py-2 border border-indigo-primary/15 border-sm mb-6">
            <span class="w-2 h-2 rounded-full bg-indigo-primary"></span>
            Trusted Water Tank Cleaning Solution
          </div>

          <!-- Title -->
          <h1 class="text-4xl sm:text-5xl font-heading font-bold text-indigo-dark mb-5 leading-tight -tracking-wide">
            Every Drop Clean, <span class="text-indigo-accent italic font-semibold">Every Home Safe</span>
          </h1>

          <!-- Description -->
          <p class="text-base sm:text-lg text-indigo-primary mb-9 max-w-xl leading-relaxed">
            Clean &amp; Cool Water Tank Cleaner Powder removes sludge, algae, bacteria, and unpleasant odor from tank walls and floors — helping protect your household from water-borne diseases with a simple, affordable cleaning routine.
          </p>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
            <AppButton href="#products" variant="primary" size="lg" label="Explore Products">
              <template #icon-right>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
              </template>
            </AppButton>
            <AppButton variant="secondary" size="lg" label="Quick Order" @click="$emit('open-modal')" />
          </div>

          <!-- Stats -->
          <div class="flex items-center gap-6 sm:gap-7 pt-5 border-t border-indigo-dark/10">
            <div class="flex flex-col">
              <span class="font-heading text-2xl font-bold text-indigo-primary">Fast</span>
              <span class="text-xs text-indigo-primary font-medium">Deep Cleaning</span>
            </div>
            <div class="w-px h-9 bg-indigo-dark/10"></div>
            <div class="flex flex-col">
              <span class="font-heading text-2xl font-bold text-indigo-primary">Safe</span>
              <span class="text-xs text-indigo-primary font-medium">Household Use</span>
            </div>
            <div class="w-px h-9 bg-indigo-dark/10"></div>
            <div class="flex flex-col">
              <span class="font-heading text-2xl font-bold text-indigo-primary">4.9★</span>
              <span class="text-xs text-indigo-primary font-medium">Customer Trust</span>
            </div>
          </div>
        </div>

        <!-- Visual -->
        <div class="lg:col-span-5">
          <div class="glass-card p-3 shadow-indigo-lg relative group border-sm">
            <img src="/images/product-placeholder.png" alt="Clean & Cool water tank cleaner powder" class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 border-sm" />
            <div class="glass-card absolute bottom-6 left-6 flex items-center gap-3 px-5 py-2.5 shadow-2xl border-sm">
              <div class="text-2xl">💧</div>
              <div class="flex flex-col leading-tight">
                <strong class="text-sm text-indigo-dark">Tank Ready</strong>
                <span class="text-xs text-indigo-primary">Fresh, clean water in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from './ui/AppButton.vue';

export default {
  name: 'HeroSection',
  components: { AppButton },
  emits: ['open-modal']
};
</script>
