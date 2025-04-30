document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const fileInput = document.getElementById('fileInput');
    const loadFileButton = document.getElementById('loadFileButton');
    const loadSampleButton = document.getElementById('loadSampleButton');
    const mindmapContainer = document.getElementById('mindmap');

    // Sample mindmap data
    const sampleMindmap = {
        name: "XMind Mark Demo",
        children: [
            {
                name: "Features",
                children: [
                    { name: "Display mindmaps" },
                    { name: "Zoom in/out" },
                    { name: "Pan around" },
                    { name: "Full customization" }
                ]
            },
            {
                name: "Uses",
                children: [
                    { name: "Project planning" },
                    { name: "Brainstorming" },
                    { name: "Note taking" },
                    { name: "Concept mapping" }
                ]
            },
            {
                name: "Benefits",
                children: [
                    { name: "Visual organization" },
                    { name: "Enhanced creativity" },
                    { name: "Better memory retention" },
                    { name: "Improved problem solving" }
                ]
            }
        ]
    };

    // Initialize mindmap variables
    let svg, g, zoom;
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Colors for different levels
    const colors = {
        root: '#729bea',
        level1: '#8dcd8a',
        level2: '#f7ca83'
    };
    
    // Create mindmap using D3.js
    function createMindmap(data) {
        // Clear existing content
        mindmapContainer.innerHTML = '';
        
        // Create SVG container
        svg = d3.select('#mindmap')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');
            
        // Add zoom behavior
        zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });
            
        svg.call(zoom);
        
        // Create a group to hold the mindmap
        g = svg.append('g')
            .attr('transform', `translate(${width/2 + margin.left},${height/2 + margin.top})`);
            
        // Create a tree layout
        const tree = d3.tree()
            .size([height, width])
            .nodeSize([80, 200]);
            
        // Root hierarchy
        const root = d3.hierarchy(data);
        
        // Compute the tree layout
        tree(root);
        
        // Add links between nodes
        const link = g.selectAll('.link')
            .data(root.links())
            .enter().append('path')
            .attr('class', 'link')
            .attr('d', d => {
                return `M${d.source.y},${d.source.x}
                        C${(d.source.y + d.target.y) / 2},${d.source.x}
                         ${(d.source.y + d.target.y) / 2},${d.target.x}
                         ${d.target.y},${d.target.x}`;
            })
            .style('fill', 'none')
            .style('stroke', '#ccc')
            .style('stroke-width', '2px');
            
        // Add nodes
        const node = g.selectAll('.node')
            .data(root.descendants())
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`);
            
        // Add node rectangles with rounded corners
        node.append('rect')
            .attr('rx', 6)
            .attr('ry', 6)
            .attr('x', d => d.depth === 0 ? -50 : -90)
            .attr('y', -20)
            .attr('width', d => d.depth === 0 ? 100 : 180)
            .attr('height', 40)
            .style('fill', d => {
                if (d.depth === 0) return colors.root;
                if (d.depth === 1) return colors.level1;
                return colors.level2;
            })
            .style('stroke', d => {
                if (d.depth === 0) return '#5079c8';
                if (d.depth === 1) return '#63ad5f';
                return '#efac4c';
            })
            .style('stroke-width', '2px');
            
        // Add node labels
        node.append('text')
            .attr('dy', '.3em')
            .attr('text-anchor', 'middle')
            .text(d => d.data.name)
            .style('fill', 'white')
            .style('font-family', 'Arial, sans-serif')
            .style('font-size', d => d.depth === 0 ? '14px' : '12px');
            
        // Center the view
        svg.call(zoom.transform, d3.zoomIdentity
            .translate(width/2 + margin.left, height/2 + margin.top)
            .scale(0.8));
    }

    // Load sample mindmap
    function loadSampleMindmap() {
        try {
            createMindmap(sampleMindmap);
            console.log('Sample mindmap loaded');
        } catch (error) {
            console.error('Error loading sample mindmap:', error);
            alert('Error loading sample mindmap. See console for details.');
        }
    }

    // Load XMind file (simplified version that just shows an alert)
    function loadXMindFile(file) {
        alert('XMind file loading is not supported in this version. Using D3.js instead of XMindMark library.');
    }

    // Event Listeners
    loadSampleButton.addEventListener('click', () => {
        loadSampleMindmap();
    });

    loadFileButton.addEventListener('click', () => {
        if (fileInput.files.length > 0) {
            loadXMindFile(fileInput.files[0]);
        } else {
            alert('Please select an XMind file first.');
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            loadXMindFile(fileInput.files[0]);
        }
    });

    // Load sample mindmap on page load
    loadSampleMindmap();
}); 