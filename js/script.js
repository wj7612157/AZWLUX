// Product image mapping for color selection
const productImages = {
    1: { // T15
        black: 'images/T15落地侧发光补光灯-黑色-等轴.231.png',
        white: 'images/T15落地侧发光补光灯-白色-等轴.227.png',
        silver: 'images/T15落地侧发光补光灯-银色-等轴.223.png'
    },
    2: { // Five head
        black: 'images/五头落地灯-黑-斜.png',
        white: 'images/五头落地灯-白-斜.png'
    },
    config: {
        t15: {
            black: 'images/T15落地侧发光补光灯-黑色-等轴.231.png',
            white: 'images/T15落地侧发光补光灯-白色-等轴.227.png',
            silver: 'images/T15落地侧发光补光灯-银色-等轴.223.png',
            name: 'T15落地侧发光补光灯',
            spec: '功率：66W  |  光效：2.1µmol/J'
        },
        five: {
            black: 'images/五头落地灯-黑-斜.png',
            white: 'images/五头落地灯-白-斜.png',
            name: '五头落地补光灯',
            spec: '功率：50W  |  光效：2.0µmol/J'
        }
    }
};
// Handle product 1 color selection
document.querySelectorAll('.color-option[data-product="1"]').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active from all
        document.querySelectorAll('.color-option[data-product="1"]').forEach(b => {
            b.classList.remove('active');
        });
        // Add active to clicked
        this.classList.add('active');
        // Update image
        const color = this.getAttribute('data-color');
        document.getElementById('product1-image').src = productImages[1][color];
    });
});
// Handle product 2 color selection
document.querySelectorAll('.color-option[data-product="2"]').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.color-option[data-product="2"]').forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
        const color = this.getAttribute('data-color');
        document.getElementById('product2-image').src = productImages[2][color];
    });
});
// Configurator functionality
let currentProduct = 't15';
let currentColor = 'black';
function updateConfigurator() {
    const imagePath = productImages.config[currentProduct][currentColor];
    const productName = productImages.config[currentProduct].name;
    const productSpec = productImages.config[currentProduct].spec;
    
    document.getElementById('config-image').src = imagePath;
    document.getElementById('config-product-name').textContent = productName;
    document.getElementById('config-product-spec').textContent = productSpec;
    
    const colorNames = {
        black: '黑色',
        white: '白色',
        silver: '银色'
    };
    document.getElementById('config-current-color').textContent = 
        `当前颜色：${colorNames[currentColor]}`;
    
    // Update available colors based on product
    const colorSelector = document.getElementById('color-selector');
    const colorLabel = document.getElementById('color-label');
    
    if (currentProduct === 't15') {
        colorLabel.textContent = '选择颜色（T15有黑/白/银可选）';
        // Show silver button
        document.querySelector('.color-select-btn.color-silver').style.display = 'block';
    } else {
        colorLabel.textContent = '选择颜色（五头有黑/白可选）';
        // Hide silver button, if current was silver switch to black
        document.querySelector('.color-select-btn.color-silver').style.display = 'none';
        if (currentColor === 'silver') {
            currentColor = 'black';
            document.querySelector('.color-select-btn[data-config-color="black"]').classList.add('active');
            document.querySelector('.color-select-btn[data-config-color="silver"]').classList.remove('active');
        }
    }
}
// Product selection in configurator
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.product-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentProduct = this.getAttribute('data-config-product');
        updateConfigurator();
    });
});
// Color selection in configurator
document.querySelectorAll('.color-select-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Only allow click if it's visible
        if (this.style.display === 'none') return;
        
        document.querySelectorAll('.color-select-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentColor = this.getAttribute('data-config-color');
        updateConfigurator();
    });
});
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});