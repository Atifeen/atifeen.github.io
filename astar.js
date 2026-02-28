 

// Min-Heap Priority Queue for efficient node selection
class MinHeap {
    constructor() {
        this.heap = [];
        this.nodeIndexMap = new Map();
    }
    
    parent(i) {
        return Math.floor((i - 1) / 2);
    }
    
    leftChild(i) {
        return 2 * i + 1;
    }
    
    rightChild(i) {
        return 2 * i + 2;
    }
    
    swap(i, j) {
        // Update index map
        this.nodeIndexMap.set(this.heap[i].nodeId, j);
        this.nodeIndexMap.set(this.heap[j].nodeId, i);
        
        // Swap in heap
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    bubbleUp(i) {
        while (i > 0 && this.heap[this.parent(i)].priority > this.heap[i].priority) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    
    bubbleDown(i) {
        let minIndex = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);
        
        if (left < this.heap.length && this.heap[left].priority < this.heap[minIndex].priority) {
            minIndex = left;
        }
        
        if (right < this.heap.length && this.heap[right].priority < this.heap[minIndex].priority) {
            minIndex = right;
        }
        
        if (i !== minIndex) {
            this.swap(i, minIndex);
            this.bubbleDown(minIndex);
        }
    }
    
    // Insert a new element into the heap
    insert(nodeId, priority) {
        this.heap.push({ nodeId, priority });
        const index = this.heap.length - 1;
        this.nodeIndexMap.set(nodeId, index);
        this.bubbleUp(index);
    }
    
    // Extract the element with minimum priority
    extractMin() {
        if (this.heap.length === 0) return null;
        
        const min = this.heap[0].nodeId;
        const last = this.heap.pop();
        this.nodeIndexMap.delete(min);
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.nodeIndexMap.set(last.nodeId, 0);
            this.bubbleDown(0);
        }
        
        return min;
    }
    
    // Update the priority of an existing node
    updatePriority(nodeId, newPriority) {
        const index = this.nodeIndexMap.get(nodeId);
        if (index === undefined) return;
        
        const oldPriority = this.heap[index].priority;
        this.heap[index].priority = newPriority;
        
        if (newPriority < oldPriority) {
            this.bubbleUp(index);
        } else {
            this.bubbleDown(index);
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    contains(nodeId) {
        return this.nodeIndexMap.has(nodeId);
    }
    
    size() {
        return this.heap.length;
    }
}

// Calculate geographic distance using Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
             Math.cos(φ1) * Math.cos(φ2) *
             Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c;
}

// Heuristic function for A* (straight-line distance)
function heuristic(nodeId1, nodeId2, roadNetwork) {
    const node1 = roadNetwork.nodes[nodeId1];
    const node2 = roadNetwork.nodes[nodeId2];
    return haversineDistance(node1.lat, node1.lon, node2.lat, node2.lon);
}

// Reconstruct path by backtracking through cameFrom map
function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        path.unshift(current);
    }
    return path;
}

// A* Pathfinding Algorithm - finds shortest path between two nodes
function aStarPathfinding(startNodeId, endNodeId, roadNetwork) {
    console.log(`\n🚀 A* PATHFINDING: ${startNodeId} → ${endNodeId}`);
    const startTime = performance.now();
    
    const openSet = new MinHeap();
    openSet.insert(startNodeId, heuristic(startNodeId, endNodeId, roadNetwork));
    
    const cameFrom = new Map();
    const gScore = new Map();
    gScore.set(startNodeId, 0);
    
    const fScore = new Map();
    fScore.set(startNodeId, heuristic(startNodeId, endNodeId, roadNetwork));
    
    let nodesExplored = 0;
    let iterations = 0;
    const maxIterations = 100000;
    
    while (!openSet.isEmpty() && iterations < maxIterations) {
        iterations++;
        
        const current = openSet.extractMin();
        
        nodesExplored++;
        
        if (current === endNodeId) {
            const path = reconstructPath(cameFrom, current);
            const endTime = performance.now();
            
            console.log(`✅ PATH FOUND! Length: ${path.length} nodes, Distance: ${gScore.get(endNodeId).toFixed(2)}m, Time: ${(endTime - startTime).toFixed(2)}ms`);
            
            return {
                path: path,
                time: endTime - startTime,
                nodesExplored: nodesExplored,
                distance: gScore.get(endNodeId)
            };
        }
        
        const currentNode = roadNetwork.nodes[current];
        if (!currentNode) {
            console.error(`❌ Node ${current} not found in roadNetwork!`);
            continue;
        }
        
        for (let neighbor of currentNode.neighbors) {
            const tentativeG = (gScore.get(current) ?? Infinity) + neighbor.distance;
            const oldG = gScore.get(neighbor.nodeId) ?? Infinity;
            
            if (tentativeG < oldG) {
                cameFrom.set(neighbor.nodeId, current);
                gScore.set(neighbor.nodeId, tentativeG);
                
                const h = heuristic(neighbor.nodeId, endNodeId, roadNetwork);
                const f = tentativeG + h;
                fScore.set(neighbor.nodeId, f);
                
                if (openSet.contains(neighbor.nodeId)) {
                    openSet.updatePriority(neighbor.nodeId, f);
                } else {
                    openSet.insert(neighbor.nodeId, f);
                }
            }
        }
    }
    
    const endTime = performance.now();
    console.log(`❌ NO PATH FOUND after ${iterations} iterations`);
    console.log(`Nodes explored: ${nodesExplored}`);
    console.log(`OpenSet exhausted: ${openSet.isEmpty()}`);
    
    return {
        path: null,
        time: endTime - startTime,
        nodesExplored: nodesExplored,
        distance: 0
    };
}
