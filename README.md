# 🎠 Interactive Carousel Slider

![HTML](https://img.shields.io/badge/HTML-5-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-3-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![OOP](https://img.shields.io/badge/Paradigm-OOP-blue?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-Vitest-green?style=flat-square&logo=vitest)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat-square&logo=vite)
![npm](https://img.shields.io/badge/npm-Package_Manager-CB3837?style=flat-square&logo=npm)
![Status](https://img.shields.io/badge/Status-Production-success?style=flat-square)

A modern, feature-rich carousel slider implementation using Object-Oriented Programming principles in JavaScript. Built with extensibility, accessibility, and performance in mind.

## ✨ Features

- 🎯 **Object-Oriented Design** - Clean class-based architecture
- 📱 **Touch & Swipe Support** - Works on mobile and desktop devices
- ⌨️ **Keyboard Navigation** - Arrow keys and spacebar controls
- ⏯️ **Auto-play Controls** - Configurable auto-rotation with pause/play
- 🎨 **Visual Indicators** - Active slide and navigation indicators
- 🔄 **Infinite Loop** - Seamless cycling through slides
- 🎭 **Pause on Hover** - Optional pause when user hovers over carousel
- ⚙️ **Highly Configurable** - Extensive customization options
- 🧪 **Fully Tested** - Comprehensive test coverage with Vitest

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mihuilsu/homework-28

# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build
```

## 🚀 Quick Start

### Basic HTML Structure

```html
<div id="carousel">
  <div class="slides">
    <div class="slide active">
      <img src="image1.jpg" alt="Slide 1">
    </div>
    <div class="slide">
      <img src="image2.jpg" alt="Slide 2">
    </div>
    <div class="slide">
      <img src="image3.jpg" alt="Slide 3">
    </div>
  </div>
</div>
```

### JavaScript Implementation

```javascript
import { SwipeCarousel } from './carousel/index.js';

const carousel = new SwipeCarousel({
  containerId: '#carousel',
  slideId: '.slide',
  interval: 3000,
  isPlaying: true,
  pauseOnHover: true
});

carousel.init();
```

## 📚 API Documentation

### Classes

#### `Carousel`

Base carousel class with core functionality.

```javascript
import { Carousel } from './carousel/index.js';

const carousel = new Carousel(options);
```

##### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | `'#carousel'` | CSS selector for container |
| `slideId` | string | `'.slide'` | CSS selector for slides |
| `interval` | number | `5000` | Auto-play interval (ms) |
| `isPlaying` | boolean | `true` | Start auto-play on init |
| `pauseOnHover` | boolean | `true` | Pause on mouse hover |

##### Methods

| Method | Description |
|--------|-------------|
| `init()` | Initialize the carousel |
| `next()` | Go to next slide |
| `prev()` | Go to previous slide |
| `pause()` | Stop auto-play |
| `play()` | Start auto-play |
| `pausePlay()` | Toggle pause/play state |

#### `SwipeCarousel`

Extended carousel class with swipe support.

```javascript
import { SwipeCarousel } from './carousel/index.js';

const carousel = new SwipeCarousel(options);
```

Inherits all options and methods from `Carousel` and adds:

- Touch swipe support (mobile devices)
- Mouse swipe support (desktop)
- Configurable swipe threshold (100px default)

## 🎮 Controls

### Mouse/Touch
- **Click** navigation buttons to change slides
- **Click** indicators to jump to specific slide
- **Swipe left/right** to navigate (touch & mouse)
- **Hover** over carousel to pause (if enabled)

### Keyboard
- **← Arrow Left** - Previous slide
- **→ Arrow Right** - Next slide
- **Space** - Toggle pause/play

## 🏗️ Project Structure

```
carousel-slider/
├── carousel/
│   ├── core.js          # Base Carousel class
│   ├── swipe.js         # SwipeCarousel extension
│   └── index.js         # Module exports
├── main.js              # Application entry point
├── styles.css           # Carousel styles
├── tests/
│   └── carousel.test.js # Test suite
├── package.json
└── README.md
```

## 🧪 Testing

The project includes comprehensive tests covering:

- ✅ Initialization and DOM setup
- ✅ Navigation controls (next/prev)
- ✅ Pause/play functionality
- ✅ Indicator navigation
- ✅ Keyboard controls
- ✅ Swipe gestures (touch & mouse)
- ✅ Auto-play timer
- ✅ Cyclic navigation
- ✅ Custom configurations
- ✅ Edge cases and error handling

Run tests with:

```bash
npm test
```

## 🎨 Styling

The carousel comes with minimal default styles. Customize by modifying `styles.css` or override classes:

```css
.carousel-container { /* Container styles */ }
.slides { /* Slides wrapper */ }
.slide { /* Individual slide */ }
.slide.active { /* Active slide */ }
.carousel-controls { /* Controls container */ }
.indicator { /* Navigation dots */ }
.indicator.active { /* Active indicator */ }
```

## 🔧 Advanced Usage

### Multiple Carousels

```javascript
const carousel1 = new SwipeCarousel({
  containerId: '#carousel-1',
  interval: 3000
});

const carousel2 = new SwipeCarousel({
  containerId: '#carousel-2',
  interval: 5000,
  pauseOnHover: false
});

carousel1.init();
carousel2.init();
```

### Custom Event Handling

```javascript
const carousel = new SwipeCarousel({
  containerId: '#carousel',
  isPlaying: false
});

carousel.init();

// Manual control
document.getElementById('custom-play').addEventListener('click', () => {
  carousel.play();
});

document.getElementById('custom-pause').addEventListener('click', () => {
  carousel.pause();
});
```

## 🌟 Key Features Explained

### Swipe Detection

The carousel detects swipes on both touch and mouse devices:
- **Touch**: Uses `touchstart` and `touchend` events
- **Mouse**: Uses `mousedown` and `mouseup` events
- **Threshold**: 100px minimum movement required

### Cyclic Navigation

Seamless infinite loop navigation:
- Last slide → First slide (forward)
- First slide → Last slide (backward)

### Type Safety

Proper type handling for all data attributes:
- String to number conversion for slide indices
- Validation of numeric inputs
- Error handling for invalid values

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

Made with ❤️ using vanilla JavaScript and OOP principles
