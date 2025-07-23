import * as THREE from 'three';

// Canvas for loading screen animation
const canvasContainer = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);

camera.position.z = 5;

// Create a simple 3D character (box with basic features)
const characterGroup = new THREE.Group();

// Body
const bodyGeometry = new THREE.BoxGeometry(0.5, 1, 0.3);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 0.5;
characterGroup.add(body);

// Head
const headGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 1.2;
characterGroup.add(head);

// Legs
const legGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.2);
const legMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.15, 0.25, 0);
const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
rightLeg.position.set(0.15, 0.25, 0);
characterGroup.add(leftLeg, rightLeg);

// Arms
const armGeometry = new THREE.BoxGeometry(0.15, 0.5, 0.15);
const armMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
const leftArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.position.set(-0.35, 0.75, 0);
const rightArm = new THREE.Mesh(armGeometry, armMaterial);
rightArm.position.set(0.35, 0.75, 0);
characterGroup.add(leftArm, rightArm);

scene.add(characterGroup);

// Animation variables
let time = 0;
const walkSpeed = 0.05;
const strideFrequency = 2;
const bobAmplitude = 0.05;
const legSwingAmplitude = 0.4;
const armSwingAmplitude = 0.3;
const screenWidth = 8; // Approximate width of the screen in Three.js units

function animate() {
    requestAnimationFrame(animate);
    
    time += walkSpeed;
    
    // Linear movement across the screen (left to right)
    let xPosition = ((time * walkSpeed) % 1) * screenWidth - screenWidth / 2;
    characterGroup.position.x = xPosition;
    
    // Bobbing motion for body
    characterGroup.position.y = bobAmplitude * Math.sin(time * strideFrequency);
    
    // Animate legs to simulate walking (alternating forward/backward)
    leftLeg.rotation.x = legSwingAmplitude * Math.sin(time * strideFrequency);
    rightLeg.rotation.x = legSwingAmplitude * Math.sin(time * strideFrequency + Math.PI);
    
    // Animate arms (opposite to legs for natural walking)
    leftArm.rotation.x = -armSwingAmplitude * Math.sin(time * strideFrequency + Math.PI);
    rightArm.rotation.x = -armSwingAmplitude * Math.sin(time * strideFrequency);
    
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Simulate loading and transition to main content
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 1s';
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 1s';
        setTimeout(() => {
            mainContent.style.opacity = '1';
            
            // Animations for hero links using vanilla JS
            const links = document.querySelectorAll('.hero-links a');
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                    link.style.transition = 'opacity 1s, transform 1s';
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 300 + Math.random() * 1000);
            });
        }, 50);
    }, 1000);
}, 3000);

// Filter projects
window.filterProjects = function(category) {
    const projectGrid = document.getElementById('projectGrid');
    const projects = projectGrid.getElementsByClassName('project-card');
    const livePreview = projectGrid.getElementsByClassName('live-preview-container')[0];

    for (let project of projects) {
        if (category === 'all') {
            project.style.display = 'block';
            livePreview.style.display = 'block';
        } else {
            project.style.display = (project.dataset.category === category) ? 'block' : 'none';
            livePreview.style.display = (category === 'web') ? 'block' : 'none';
        }
    }
};

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted! (This is a placeholder)');
});