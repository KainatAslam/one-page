<template>
  <div 
    class="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full px-4 sm:px-0 pointer-events-none"
    aria-live="polite"
    aria-atomic="true"
  >
    <transition-group name="toast-slide">
      <div 
        v-for="toast in toastState.toasts" 
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-2xl border backdrop-blur-glass transition-all duration-300"
        :class="getToastClasses(toast.type)"
        role="alert"
      >
        <!-- Icon -->
        <div class="flex-shrink-0 mt-0.5">
          <!-- Success Icon -->
          <svg v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>

          <!-- Error Icon -->
          <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>

          <!-- Info / Default Icon -->
          <svg v-else class="w-5 h-5 text-indigo-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>

        <!-- Content -->
        <div class="flex-grow min-w-0">
          <h4 v-if="toast.title" class="font-heading font-bold text-sm leading-tight text-indigo-dark mb-1">
            {{ toast.title }}
          </h4>
          <p class="font-body text-xs sm:text-sm text-indigo-dark/90 leading-relaxed break-words">
            {{ toast.message }}
          </p>
        </div>

        <!-- Close Button -->
        <button 
          type="button" 
          class="flex-shrink-0 text-indigo-dark/50 hover:text-indigo-dark transition-colors p-1 -mr-1 -mt-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-primary/30"
          :aria-label="`Dismiss notification`"
          @click="removeToast(toast.id)"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { toastState, removeToast } from '../../services/toast.js';

function getToastClasses(type) {
  switch (type) {
    case 'success':
      return 'bg-white/95 border-emerald-500/40 text-indigo-dark shadow-emerald-900/10';
    case 'error':
      return 'bg-white/95 border-red-500/40 text-indigo-dark shadow-red-900/10';
    case 'info':
    default:
      return 'bg-white/95 border-indigo-primary/40 text-indigo-dark shadow-indigo-900/10';
  }
}
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}
</style>
