/**
 * Base Carousel Class
 * Implements core carousel functionality including navigation,
 * auto-play, keyboard controls, and visual indicators
 */

const DEFAULT_SETTINGS = {
  containerId: '#carousel',
  slideId: '.slide',
  interval: 5000,
  isPlaying: true,
  pauseOnHover: true
};

export class Carousel {
  /**
   * Creates a new Carousel instance
   * @param {Object} options - Configuration options
   * @param {string} options.containerId - CSS selector for carousel container
   * @param {string} options.slideId - CSS selector for slides
   * @param {number} options.interval - Auto-play interval in milliseconds
   * @param {boolean} options.isPlaying - Whether to start auto-play on init
   * @param {boolean} options.pauseOnHover - Whether to pause on mouse hover
   */
  constructor(options = {}) {
    // Merge default settings with user options
    const settings = {
      ...DEFAULT_SETTINGS,
      ...options
    };

    // Core properties
    this.container = document.querySelector(settings.containerId);
    
    if (!this.container) {
      throw new TypeError(`Container not found: ${settings.containerId}`);
    }

    this.slides = this.container.querySelectorAll(settings.slideId);
    this.TIMER_INTERVAL = settings.interval;
    this.isPlaying = settings.isPlaying;
    this.pauseOnHover = settings.pauseOnHover;

    // Private properties
    this.#SLIDES_COUNT = this.slides.length;
    this.#currentSlide = 0;
    this.#timerId = null;

    // DOM elements (will be created on init)
    this.#pauseBtn = null;
    this.#prevBtn = null;
    this.#nextBtn = null;
    this.#indicatorsContainer = null;
    this.#pauseIcon = null;
    this.#playIcon = null;
  }

  // Private fields
  #SLIDES_COUNT;
  #currentSlide;
  #timerId;
  #pauseBtn;
  #prevBtn;
  #nextBtn;
  #indicatorsContainer;
  #pauseIcon;
  #playIcon;

  /**
   * Initialize the carousel
   * Sets up controls, indicators, event listeners, and starts auto-play if enabled
   */
  init() {
    this.#createControls();
    this.#createIndicators();
    this.#setListeners();
    
    if (this.isPlaying) {
      this.#startTimer();
    }
  }

  /**
   * Navigate to the next slide
   * Stops the timer and moves forward
   */
  next() {
    this.pause();
    this.#gotoNth(this.#currentSlide + 1);
  }

  /**
   * Navigate to the previous slide
   * Stops the timer and moves backward
   */
  prev() {
    this.pause();
    this.#gotoNth(this.#currentSlide - 1);
  }

  /**
   * Pause auto-play
   * Stops the timer and updates playing state
   */
  pause() {
    if (this.#timerId) {
      clearInterval(this.#timerId);
      this.#timerId = null;
    }
    this.isPlaying = false;
  }

  /**
   * Start auto-play
   * Begins automatic slide rotation
   */
  play() {
    this.#startTimer();
    this.isPlaying = true;
  }

  /**
   * Toggle between pause and play states
   * Updates button icons accordingly
   */
  pausePlay() {
    if (this.isPlaying) {
      this.pause();
      this.#pauseIcon.style.opacity = '0';
      this.#playIcon.style.opacity = '1';
    } else {
      this.play();
      this.#pauseIcon.style.opacity = '1';
      this.#playIcon.style.opacity = '0';
    }
  }

  /**
   * Navigate to a specific slide by index
   * Handles cyclic navigation (wrapping around)
   * @private
   * @param {number} n - Target slide index
   */
  #gotoNth(n) {
    // Remove active class from current slide and indicator
    this.slides[this.#currentSlide].classList.remove('active');
    this.#indicatorsContainer.children[this.#currentSlide].classList.remove('active');

    // Calculate new slide index with cyclic wrapping
    this.#currentSlide = (n + this.#SLIDES_COUNT) % this.#SLIDES_COUNT;

    // Add active class to new slide and indicator
    this.slides[this.#currentSlide].classList.add('active');
    this.#indicatorsContainer.children[this.#currentSlide].classList.add('active');
  }

  /**
   * Handle indicator click events
   * Converts string dataset value to number
   * @private
   * @param {Event} e - Click event
   */
  #indicatorClick(e) {
    const target = e.target;
    
    if (target && target.classList.contains('indicator')) {
      this.pause();
      // Convert string from dataset to number using unary plus
      this.#gotoNth(+target.dataset.slideTo);
    }
  }

  /**
   * Handle previous button click
   * @private
   */
  #prevClickHandler = () => {
    this.prev();
  };

  /**
   * Handle next button click
   * @private
   */
  #nextClickHandler = () => {
    this.next();
  };

  /**
   * Handle pause/play button click
   * @private
   */
  #pauseClickHandler = () => {
    this.pausePlay();
  };

  /**
   * Handle keyboard navigation
   * @private
   * @param {KeyboardEvent} e - Keyboard event
   */
  #keydownHandler = (e) => {
    switch (e.code) {
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case 'Space':
        e.preventDefault();
        this.pausePlay();
        break;
    }
  };

  /**
   * Handle mouse enter event (pause on hover)
   * @private
   */
  #mouseenterHandler = () => {
    if (this.pauseOnHover && this.isPlaying) {
      this.pause();
    }
  };

  /**
   * Handle mouse leave event (resume on leave)
   * @private
   */
  #mouseleaveHandler = () => {
    if (this.pauseOnHover && !this.isPlaying) {
      this.play();
    }
  };

  /**
   * Set up all event listeners
   * @private
   */
  #setListeners() {
    // Control buttons
    this.#prevBtn.addEventListener('click', this.#prevClickHandler);
    this.#nextBtn.addEventListener('click', this.#nextClickHandler);
    this.#pauseBtn.addEventListener('click', this.#pauseClickHandler);

    // Indicators
    this.#indicatorsContainer.addEventListener('click', (e) => this.#indicatorClick(e));

    // Keyboard navigation
    document.addEventListener('keydown', this.#keydownHandler);

    // Pause on hover
    if (this.pauseOnHover) {
      this.container.addEventListener('mouseenter', this.#mouseenterHandler);
      this.container.addEventListener('mouseleave', this.#mouseleaveHandler);
    }
  }

  /**
   * Create control buttons (prev, pause/play, next)
   * @private
   */
  #createControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('carousel-controls');

    // Previous button
    this.#prevBtn = document.createElement('button');
    this.#prevBtn.id = 'prev-btn';
    this.#prevBtn.classList.add('control-btn', 'prev-btn');
    this.#prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    this.#prevBtn.setAttribute('aria-label', 'Previous slide');

    // Pause/Play button
    this.#pauseBtn = document.createElement('button');
    this.#pauseBtn.id = 'pause-btn';
    this.#pauseBtn.classList.add('control-btn', 'pause-btn');
    this.#pauseBtn.setAttribute('aria-label', 'Pause/Play');

    this.#pauseIcon = document.createElement('i');
    this.#pauseIcon.id = 'fa-pause-icon';
    this.#pauseIcon.classList.add('fas', 'fa-pause');
    this.#pauseIcon.style.opacity = this.isPlaying ? '1' : '0';

    this.#playIcon = document.createElement('i');
    this.#playIcon.id = 'fa-play-icon';
    this.#playIcon.classList.add('fas', 'fa-play');
    this.#playIcon.style.opacity = this.isPlaying ? '0' : '1';

    this.#pauseBtn.appendChild(this.#pauseIcon);
    this.#pauseBtn.appendChild(this.#playIcon);

    // Next button
    this.#nextBtn = document.createElement('button');
    this.#nextBtn.id = 'next-btn';
    this.#nextBtn.classList.add('control-btn', 'next-btn');
    this.#nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    this.#nextBtn.setAttribute('aria-label', 'Next slide');

    // Append buttons to container
    controlsContainer.appendChild(this.#prevBtn);
    controlsContainer.appendChild(this.#pauseBtn);
    controlsContainer.appendChild(this.#nextBtn);

    this.container.appendChild(controlsContainer);
  }

  /**
   * Create indicator dots for slide navigation
   * @private
   */
  #createIndicators() {
    // Check if indicators already exist in the DOM
    this.#indicatorsContainer = this.container.querySelector('#indicators-container');
    
    if (this.#indicatorsContainer) {
      // Indicators already exist, just ensure first one is active
      const existingIndicators = this.#indicatorsContainer.querySelectorAll('.indicator');
      if (existingIndicators.length > 0) {
        existingIndicators.forEach((ind, idx) => {
          if (idx === 0) {
            ind.classList.add('active');
          } else {
            ind.classList.remove('active');
          }
        });
      }
      return;
    }

    // Create new indicators
    this.#indicatorsContainer = document.createElement('ol');
    this.#indicatorsContainer.classList.add('indicators');
    this.#indicatorsContainer.id = 'indicators-container';

    for (let i = 0; i < this.#SLIDES_COUNT; i++) {
      const indicator = document.createElement('li');
      indicator.classList.add('indicator');
      indicator.setAttribute('data-slide-to', i);
      indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
      
      if (i === 0) {
        indicator.classList.add('active');
      }

      this.#indicatorsContainer.appendChild(indicator);
    }

    this.container.appendChild(this.#indicatorsContainer);
  }

  /**
   * Start the auto-play timer
   * @private
   */
  #startTimer() {
    if (this.#timerId) {
      clearInterval(this.#timerId);
    }

    this.#timerId = setInterval(() => {
      this.#gotoNth(this.#currentSlide + 1);
    }, this.TIMER_INTERVAL);
  }
}