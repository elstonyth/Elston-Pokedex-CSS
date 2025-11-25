# Elston's Pokémon Card Collection

A beautiful, interactive Pokémon card collection viewer featuring realistic holographic effects powered entirely by CSS.

🌐 **[Live Demo](https://elstonyth.github.io/Elston-Pokedex-CSS/)**

<p align="center">
  <img src="public/pokemon-cards-demo.gif" alt="Holographic Card Effects Demo" />
  <br/>
  <em>Showcase View - Realistic holographic effects with cursor-aware lighting</em>
</p>

---

## ✨ Features

### Three Viewing Experiences

| View | Description |
|------|-------------|
| **Showcase** | Browse 90+ cards with 14 different foil effects |
| **Kanto 151** | Complete Pokémon 151 set with search & filters |
| **Fan View** | Swipeable card deck with Type & Rarity filters |

### Highlights

- 🎴 **207 Cards** from the Pokémon 151 set
- 🌈 **14 Foil Effects** - Holo, Cosmos, Radiant, V, VMAX, Rainbow, and more
- 🔍 **Smart Search** - Search by name, type, or rarity
- 🎨 **Dark/Light Mode** - Toggle between themes
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ⚡ **60fps Animations** - Smooth, GPU-accelerated interactions
- 🎯 **Type & Rarity Filters** - Filter cards by Pokémon type or card rarity

---

## 🛠️ Tech Stack

- **Framework**: [Svelte](https://svelte.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Pure CSS with CSS Variables
- **Animations**: CSS Transforms, Gradients, Blend-modes & Filters
- **Hosting**: GitHub Pages

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/elstonyth/Elston-Pokedex-CSS.git

# Navigate to directory
cd Elston-Pokedex-CSS

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the app.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── experiences/
│   ├── holo/          # Showcase experience
│   ├── kanto/         # Kanto 151 experience  
│   └── fan/           # Fan View experience
├── lib/
│   ├── components/    # Reusable components
│   └── stores/        # Svelte stores
└── App.svelte         # Main app component
```

---

## 🎨 Card Effects

| Effect | Description |
|--------|-------------|
| Basic | Standard card without effects |
| Reverse Holo | Holographic body with regular artwork |
| Regular Holo | Classic holographic artwork |
| Cosmos Holo | Galaxy pattern overlay |
| Amazing Rare | Colorful border gradient |
| Radiant | Shimmering radiant effect |
| V / V Full Art | Modern V card styling |
| VMAX | Dynamic VMAX effects |
| V Star | Premium star holographic |
| Trainer Gallery | Special trainer artwork |
| Rainbow Rare | Rainbow gradient foil |
| Secret Rare / Gold | Golden border effects |

---

## 📱 Responsive Design

- **Desktop**: Full card grid with hover interactions
- **Tablet**: Adaptive grid layout
- **Mobile**: Touch-optimized with swipe gestures in Fan View

---

## 🙏 Acknowledgments

- **Card Data**: [Pokémon TCG API](https://pokemontcg.io/)
- **Holographic Textures**: [aschefield101](https://www.deviantart.com/aschefield101/art/HoloSheet-2012-313543843)
- **Background Assets**: [Vecteezy](https://www.vecteezy.com/free-photos)
- **Inspiration**: CSS holographic techniques from the web dev community

---

## 📄 License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/elstonyth">Elston.Y</a>
</p>
