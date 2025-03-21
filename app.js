document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const fileInput = document.getElementById('fileInput');
    const loadFileButton = document.getElementById('loadFileButton');
    const loadSampleButton = document.getElementById('loadSampleButton');
    const mindmapContainer = document.getElementById('mindmap');

    // Sample mindmap data (simple example)
    const sampleMindmap = {
        rootTopic: {
            title: "XMind Mark Demo",
            children: {
                attached: [
                    {
                        title: "Features",
                        children: {
                            attached: [
                                { title: "Display mindmaps" },
                                { title: "Zoom in/out" },
                                { title: "Pan around" },
                                { title: "Full customization" }
                            ]
                        }
                    },
                    {
                        title: "Uses",
                        children: {
                            attached: [
                                { title: "Project planning" },
                                { title: "Brainstorming" },
                                { title: "Note taking" },
                                { title: "Concept mapping" }
                            ]
                        }
                    },
                    {
                        title: "Benefits",
                        children: {
                            attached: [
                                { title: "Visual organization" },
                                { title: "Enhanced creativity" },
                                { title: "Better memory retention" },
                                { title: "Improved problem solving" }
                            ]
                        }
                    }
                ]
            }
        }
    };

    // Initialize XMind Mark instance
    let mindmap = null;

    // Function to initialize the mindmap
    function initMindmap() {
        if (mindmap) {
            mindmap.destroy();
        }
        
        mindmap = new XMindMark.Viewer({
            el: mindmapContainer,
            theme: {
                root: {
                    fill: '#729bea',  // Root topic background color
                    borderColor: '#5079c8',  // Root topic border color
                    borderWidth: 2,  // Root topic border width
                    textColor: '#ffffff',  // Root topic text color
                },
                primary: {
                    fill: '#8dcd8a',  // Main topic background color
                    borderColor: '#63ad5f',  // Main topic border color
                    borderWidth: 2,  // Main topic border width
                    textColor: '#ffffff',  // Main topic text color
                },
                secondary: {
                    fill: '#f7ca83',  // Subtopic background color
                    borderColor: '#efac4c',  // Subtopic border color
                    borderWidth: 2,  // Subtopic border width
                    textColor: '#ffffff',  // Subtopic text color
                },
            }
        });
    }

    // Load a sample mindmap
    function loadSampleMindmap() {
        initMindmap();
        mindmap.render(sampleMindmap);
    }

    // Load XMind file from user input
    function loadXMindFile(file) {
        const reader = new FileReader();
        
        reader.onload = async (event) => {
            try {
                // Initialize the mindmap
                initMindmap();
                
                // Parse and load the XMind file
                const data = await XMindMark.load(new Uint8Array(event.target.result));
                mindmap.render(data);
            } catch (error) {
                console.error('Error loading XMind file:', error);
                alert('Unable to load the XMind file. Please make sure it is a valid XMind file.');
            }
        };
        
        reader.readAsArrayBuffer(file);
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