const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Gzip compression to minimize load times and optimize speed
app.use(compression());

// Parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve optimized static assets from the public folder (CSS, Images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Define Page Routes with dynamic SEO titles and navigation states
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Architectural Roofing Excellence',
        activePage: 'home'
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Premium Roofing Services',
        activePage: 'services'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Our Architectural Heritage & Standards',
        activePage: 'about'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Architectural Portfolio & Showcase',
        activePage: 'projects'
    });
});

app.get('/testimonials', (req, res) => {
    res.render('testimonials', {
        title: 'Verified Client Experiences',
        activePage: 'testimonials'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Request An Architectural Consultation',
        activePage: 'contact'
    });
});

// 404 Fallback routing - Redirects back to homepage gracefully
app.use((req, res) => {
    res.status(404).redirect('/');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 SteelCrest Roofing server running successfully!`);
    console.log(`  Local Port: http://localhost:${PORT}`);
    console.log(`==================================================`);
});

// Export app for serverless deployment platforms like Vercel
module.exports = app;
