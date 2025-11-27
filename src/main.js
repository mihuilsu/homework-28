/**
 * Main Application Entry Point
 * Initializes and configures the carousel
 */

import SwipeCarousel from './carousel/index.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize carousel with custom configuration
  const carousel = new SwipeCarousel({
    containerId: '#carousel',
    slideId: '.slide',
    interval: 5000,
    isPlaying: true,
    pauseOnHover: true
  });

  // Initialize the carousel
  carousel.init();

  // Optional: Expose carousel instance to window for debugging
  if (typeof window !== 'undefined') {
    window.carousel = carousel;
  }
});