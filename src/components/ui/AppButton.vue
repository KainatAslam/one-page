<template>
  <component
    :is="resolvedTag"
    v-bind="resolvedBindings"
    :disabled="isLink ? undefined : isDisabled"
    :aria-disabled="isLink && isDisabled ? 'true' : undefined"
    :tabindex="isLink && isDisabled ? -1 : undefined"
    :aria-label="resolvedAriaLabel"
    :aria-busy="loading || undefined"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="inline-flex items-center justify-center">
      <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.35" stroke-width="2" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </span>

    <template v-else>
      <span v-if="showLeftIcon" class="inline-flex items-center justify-center">
        <slot name="icon-left" />
      </span>

      <!-- Label Prop -->
      <span v-if="hasLabel" class="inline-flex items-center justify-center whitespace-nowrap">
        {{ label }}
      </span>

      <!-- Default Slot Content -->
      <span v-else-if="hasDefaultSlot" class="inline-flex items-center justify-center whitespace-nowrap">
        <slot />
      </span>

      <span v-if="showRightIcon" class="inline-flex items-center justify-center">
        <slot name="icon-right" />
      </span>
    </template>
  </component>
</template>

<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  label: { type: String, default: '' },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: Boolean,
  loading: Boolean,
  ariaLabel: String,
  href: String,
  to: [String, Object],
  target: String,
  rel: String,
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  }
});

const emit = defineEmits(['click']);
const slots = useSlots();

const isLink = computed(() => Boolean(props.href || props.to));
const resolvedTag = computed(() => (isLink.value ? 'a' : 'button'));
const isDisabled = computed(() => props.disabled || props.loading);

const hasLeftIcon = computed(() => !!slots['icon-left']);
const hasRightIcon = computed(() => !!slots['icon-right']);
const hasDefaultSlot = computed(() => !!slots.default);
const hasLabel = computed(() => Boolean(props.label && props.label.trim()));
const iconOnly = computed(() => !hasLabel.value && !hasDefaultSlot.value && (hasLeftIcon.value || hasRightIcon.value));
const showLeftIcon = computed(() => props.iconPosition === 'left' && hasLeftIcon.value);
const showRightIcon = computed(() => props.iconPosition === 'right' && hasRightIcon.value);
const resolvedAriaLabel = computed(() => props.ariaLabel || (iconOnly.value ? 'Action button' : undefined));

const resolvedBindings = computed(() => {
  const bindings = {};

  if (isLink.value) {
    if (props.href) bindings.href = props.href;
    if (props.to) bindings.to = props.to;
    if (props.target) bindings.target = props.target;
    if (props.rel) bindings.rel = props.rel;
    return bindings;
  }

  bindings.type = props.type;
  return bindings;
});

const variantClasses = {
  primary: 'bg-indigo-primary text-white border-indigo-primary hover:bg-indigo-dark focus:ring-indigo-primary/40',
  secondary: 'bg-indigo-bg text-indigo-primary border-indigo-primary/20 hover:bg-indigo-light/80 focus:ring-indigo-primary/20',
  outline: 'bg-transparent text-indigo-primary border-indigo-primary hover:bg-indigo-primary hover:text-white focus:ring-indigo-primary/30',
  ghost: 'bg-transparent text-indigo-primary border-transparent hover:bg-indigo-bg focus:ring-indigo-primary/20',
  danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-200'
};

const sizeClasses = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center gap-2 font-body font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed border border-sm select-none no-underline',
  sizeClasses[props.size] || sizeClasses.md,
  variantClasses[props.variant] || variantClasses.primary,
  isLink.value ? (isDisabled.value ? 'pointer-events-none opacity-60' : 'cursor-pointer') : 'cursor-pointer'
].join(' '));

function handleClick(event) {
  if (isDisabled.value) {
    event.preventDefault?.();
    event.stopPropagation?.();
    return;
  }

  emit('click', event);
}
</script>
