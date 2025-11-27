/**
 * SwipeCarousel Class
 * Extends base Carousel with swipe gesture support
 * Handles both touch events (mobile) and mouse events (desktop)
 */

import { Carousel } from './core.js';

export class SwipeCarousel extends Carousel {
  /**
   * Creates a new SwipeCarousel instance
   * @param {Object} options - Configuration options (inherited from Carousel)
   */
  constructor(options = {}) {
    super(options);

    // Swipe detection properties
    this.#startX = 0;
    this.#endX = 0;
    this.#swipeThreshold = 100; // Minimum distance for swipe detection (pixels)
  }

  // Private fields for swipe detection
  #startX;
  #endX;
  #swipeThreshold;

  /**
   * Initialize the carousel with swipe support
   * Calls parent init() and adds swipe listeners
   */
  init() {
    super.init();
    this.#setSwipeListeners();
  }

  /**
   * Set up swipe event listeners for both touch and mouse events
   * @private
   */
  #setSwipeListeners() {
    // Touch events for mobile devices
    this.container.addEventListener('touchstart', this.#touchStartHandler, { passive: true });
    this.container.addEventListener('touchend', this.#touchEndHandler, { passive: true });

    // Mouse events for desktop
    this.container.addEventListener('mousedown', this.#mouseDownHandler);
    this.container.addEventListener('mouseup', this.#mouseUpHandler);
  }

  /**
   * Handle touch start event
   * Records the starting X coordinate
   * @private
   * @param {TouchEvent} e - Touch event
   */
  #touchStartHandler = (e) => {
    this.#startX = e.changedTouches[0].pageX;
  };

  /**
   * Handle touch end event
   * Records the ending X coordinate and processes swipe
   * @private
   * @param {TouchEvent} e - Touch event
   */
  #touchEndHandler = (e) => {
    this.#endX = e.changedTouches[0].pageX;
    this.#handleSwipe();
  };

  /**
   * Handle mouse down event
   * Records the starting X coordinate
   * @private
   * @param {MouseEvent} e - Mouse event
   */
  #mouseDownHandler = (e) => {
    this.#startX = e.pageX;
  };

  /**
   * Handle mouse up event
   * Records the ending X coordinate and processes swipe
   * @private
   * @param {MouseEvent} e - Mouse event
   */
  #mouseUpHandler = (e) => {
    this.#endX = e.pageX;
    this.#handleSwipe();
  };

  /**
   * Process swipe gesture
   * Determines swipe direction and triggers appropriate navigation
   * @private
   */
  #handleSwipe() {
    const difference = this.#startX - this.#endX;

    // Check if swipe distance exceeds threshold
    if (Math.abs(difference) < this.#swipeThreshold) {
      return;
    }

    // Determine swipe direction
    if (difference > 0) {
      // Swipe left - go to next slide
      this.next();
    } else {
      // Swipe right - go to previous slide
      this.prev();
    }
  }
}