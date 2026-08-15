<template>
  <section id="products" class="section-padding bg-indigo-bg">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Our Product</span>
        <h2 class="section-title">Clean &amp; Cool Water Tank Cleaner Powder</h2>
        <p class="section-subtitle">
          An effective, easy-to-use solution that removes sludge, algae, bacteria, and odor to keep stored water fresh, clean, and safe.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="glass-card overflow-hidden cursor-pointer transition-all duration-normal hover:shadow-lg border border-white/80 border-sm"
          @click="$emit('select-product', product)"
        >
          <!-- Badge -->
          <div class="absolute top-4 right-4 z-10 bg-indigo-accent text-indigo-dark font-bold text-xs px-3 py-1.5 border-sm">
            {{ product.tag }}
          </div>

          <!-- Image -->
          <div class="relative w-full h-72 overflow-hidden group bg-indigo-bg">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-indigo-dark/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <AppButton size="sm" variant="primary" label="Order Now" @click.stop="$emit('select-product', product)">
                <template #icon-right>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </template>
              </AppButton>
            </div>
          </div>

          <!-- Info -->
          <div class="p-6">
            <div class="flex justify-between items-start mb-3 pb-3 border-b border-indigo-dark/10">
              <span class="text-xs text-indigo-primary font-semibold">{{ product.volume }}</span>
              <span class="text-sm text-indigo-primary font-semibold">5.0 ★</span>
            </div>
            
            <h3 class="font-heading font-bold text-lg text-indigo-dark mb-2">{{ product.name }}</h3>
            <p class="text-sm text-indigo-primary mb-4 leading-relaxed">{{ product.description }}</p>
            
            <div class="flex justify-between items-center">
              <span class="font-heading text-2xl font-bold text-indigo-primary">${{ product.price.toFixed(2) }}</span>
              <AppButton size="sm" variant="primary" label="Select" @click.stop="$emit('select-product', product)" />
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div class="glass-card p-8 text-center bg-gradient-to-r from-indigo-bg to-indigo-bg border border-white/60 border-sm">
        <h3 class="font-heading text-2xl font-bold text-indigo-dark mb-2">Need a reliable tank cleaning solution?</h3>
        <p class="text-indigo-primary mb-6">Order Clean &amp; Cool powder for easier cleaning, stronger hygiene, and safer household water.</p>
        <AppButton variant="secondary" label="Open Order Form" @click="$emit('open-modal')">
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </template>
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from './ui/AppButton.vue';

export default {
  name: 'ProductsSection',
  components: { AppButton },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  emits: ['select-product', 'open-modal']
};
</script>
