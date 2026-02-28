# A* Pathfinding on Khulna Road Network

An interactive web application demonstrating the A* pathfinding algorithm on real-world road network data from Khulna, Bangladesh using OpenStreetMap data.

## 🚀 Live Demo

**GitHub Pages (Easiest - No Setup Required)**

This project is hosted on GitHub Pages. Visit the live demo at:
```
https://[your-username].github.io/[repository-name]/
```

**Local Development**

To run locally, use a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

**VS Code Users**: Install "Live Server" extension → right-click `index.html` → "Open with Live Server"

**Note**: Opening `index.html` directly (double-click) won't work due to CORS restrictions.

## ✨ Features

- **Optimal A* Pathfinding** - Finds shortest path between any two points on the map
- **Binary Min-Heap** - Efficient priority queue with O((V+E) log V) time complexity
- **Interactive Map** - Click to select start/end points and visualize the path
- **Real-time Performance Metrics** - Shows computation time, nodes explored, and total distance
- **Real-world Data** - Uses actual OpenStreetMap road network with 30,000+ nodes

## 🛠️ Technology Stack

- **JavaScript (ES6+)** - Core algorithm implementation
- **Leaflet.js** - Interactive map visualization
- **OpenStreetMap** - Real-world geographic data
- **GeoJSON** - Road network data format

## 📁 Project Structure

```
├── index.html              # Main application
├── astar.js               # A* algorithm & min-heap implementation
├── khulna.json            # Full road network data (~30,000 nodes)
└── khulna_simplified.json # Simplified version
```

## 🎯 How to Use

1. **Start a local server** (see Live Demo section above)
2. **Open** the application in your browser (e.g., `http://localhost:8000`)
3. **Click** anywhere on the map to set starting point (red marker)
4. **Click again** to set destination (blue marker)
5. **View** the calculated shortest path (green line) and performance metrics

**Optional**: Use the checkboxes to visualize all graph nodes and edges.

## 🧮 Algorithm Details

**Algorithm**: A* (A-star) with Haversine heuristic  
**Data Structure**: Binary min-heap priority queue  
**Time Complexity**: O((V+E) log V)  
**Space Complexity**: O(V)

### Core Components

- **MinHeap Class** - Custom binary heap for optimal node selection
- **Haversine Distance** - Geographic distance calculation for lat/lon coordinates
- **Graph Construction** - Automatic conversion from GeoJSON to adjacency list
- **Path Reconstruction** - Backtracking through optimal path

## 📊 Performance

Typical performance on Khulna road network:
- **Graph Size**: ~30,000 nodes, bidirectional edges
- **Computation Time**: < 500ms for most routes
- **Path Optimality**: Guaranteed shortest path

## 🎓 Academic Context

This project was developed as part of the KUET Bus Tracking System initiative, demonstrating the routing component that will be integrated into the larger transportation system.

## 🎥 Demo

Watch the algorithm in action:
1. Interactive point selection on real map
2. Instant path calculation
3. Visual route display with performance metrics

## 🌐 Deploying to GitHub Pages

1. **Create a new repository** on GitHub
2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: A* pathfinding implementation"
   git branch -M main
   git remote add origin https://github.com/[your-username]/[repo-name].git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch → `main` → `/ (root)`
   - Click Save
4. **Access your live site** at `https://[your-username].github.io/[repo-name]/`

Your supervisor can now access it directly without any setup!

## 📝 Implementation Highlights

- **Custom Min-Heap** - Full binary heap implementation from scratch (bubble up/down, extract min, update priority)
- **Efficient Graph Build** - Processes 30,000+ nodes from GeoJSON in < 1 second
- **No External Dependencies** - Pure JavaScript algorithm (only Leaflet for visualization)
- **Clean Code Structure** - Modular design with separate algorithm file

## ⚠️ Common Issues

**JSON file not loading locally**: Use a local server (see Live Demo section) or deploy to GitHub Pages. Opening `index.html` directly won't work due to browser CORS restrictions.

**Map tiles not loading**: Requires internet connection to load OpenStreetMap tiles.

## 📚 References

- Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). "A Formal Basis for the Heuristic Determination of Minimum Cost Paths"
- OpenStreetMap data © OpenStreetMap contributors, available under ODbL
- Leaflet.js mapping library

---

**Developed at**: Khulna University of Engineering & Technology (KUET)  
**Last Updated**: February 28, 2026
