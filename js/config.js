// 配置器页面 JavaScript
let selectedConfig = {
    power: null,
    spectrum: null,
    control: null,
    mount: null
};
let prices = {
    power: 0,
    spectrum: 0,
    control: 0,
    mount: 0
};
const nameMapping = {
    '100': '100W 标准款 (¥899)',
    '300': '300W Pro专业版 (¥2399)',
    '600': '600W 商用版 (¥4599)',
    'full': '全光谱标准 (免费)',
    'veg': '营养生长专用 (+¥200)',
    'flower': '开花结果专用 (+¥300)',
    'custom': '定制光谱 (+¥500)',
    'manual': '手动调光 (免费)',
    'timer': '定时控制 (+¥300)',
    'app': 'APP智能控制 (+¥600)',
    'hang': '悬挂安装 (免费)',
    'stand': '支架安装 (+¥400)',
    'clip': '夹具安装 (+¥150)'
};
// 选择选项
function selectOption(element) {
    const type = element.dataset.type;
    const value = element.dataset.value;
    const price = parseInt(element.dataset.price);
    
    // 清除同类型已选择项
    document.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(card => {
        card.classList.remove('selected');
    });
    
    // 选中当前项
    element.classList.add('selected');
    
    // 保存选择
    selectedConfig[type] = value;
    prices[type] = price;
    
    // 更新摘要
    updateSummary();
}
// 更新摘要
function updateSummary() {
    document.getElementById('summary-power').textContent = selectedConfig.power ? 
        nameMapping[selectedConfig.power] : '请选择';
    document.getElementById('summary-spectrum').textContent = selectedConfig.spectrum ? 
        nameMapping[selectedConfig.spectrum] : '请选择';
    document.getElementById('summary-control').textContent = selectedConfig.control ? 
        nameMapping[selectedConfig.control] : '请选择';
    document.getElementById('summary-mount').textContent = selectedConfig.mount ? 
        nameMapping[selectedConfig.mount] : '请选择';
    
    // 计算加价
    let addonPrice = prices.spectrum + prices.control + prices.mount;
    document.getElementById('summary-addon').textContent = `¥${addonPrice}`;
    
    // 计算总价
    let totalPrice = prices.power + addonPrice;
    
    if (prices.power === 0) {
        document.getElementById('summary-total').textContent = '请完成配置选择';
    } else {
        document.getElementById('summary-total').textContent = `¥${totalPrice}`;
    }
    
    // 显示功率估计
    if (selectedConfig.power) {
        const powerWatts = parseInt(selectedConfig.power);
        let areaMin, areaMax;
        if (powerWatts === 100) {
            areaMin = 0.5; areaMax = 1;
        } else if (powerWatts === 300) {
            areaMin = 1.5; areaMax = 3;
        } else {
            areaMin = 3; areaMax = 6;
        }
        document.getElementById('power-estimate').style.display = 'block';
        document.getElementById('estimate-text').textContent = 
            `此配置推荐种植面积约 ${areaMin} - ${areaMax} 平方米，日均耗电量约 ${(powerWatts * 12 / 1000).toFixed(2)} 度（按每天开灯12小时计算）`;
    }
}
// 重置配置
function resetConfig() {
    // 清空选择
    selectedConfig = {
        power: null,
        spectrum: null,
        control: null,
        mount: null
    };
    prices = {
        power: 0,
        spectrum: 0,
        control: 0,
        mount: 0
    };
    
    // 清除选中样式
    document.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // 更新摘要
    updateSummary();
}
// 跳转到意向表单
function goToInquiry() {
    if (!selectedConfig.power) {
        alert('请先选择功率规格');
        return;
    }
    
    // 在首页打开模态框，并预填配置信息
    const configNames = {
        '100': '标准款',
        '300': 'Pro专业版',
        '600': '商用版'
    };
    
    const selectedName = configNames[selectedConfig.power];
    const totalPrice = prices.power + prices.spectrum + prices.control + prices.mount;
    
    // 打开首页弹窗，这里直接跳转首页并带参数
    window.location.href = `index.html?config=${encodeURIComponent(selectedName)}&price=${totalPrice}`;
}
// 页面加载完成后处理URL参数
document.addEventListener('DOMContentLoaded', function() {
    // 如果从链接过来有预先选择，可以在这里处理
    const urlParams = new URLSearchParams(window.location.search);
    const prePower = urlParams.get('power');
    if (prePower) {
        const card = document.querySelector(`.option-card[data-type="power"][data-value="${prePower}"]`);
        if (card) {
            selectOption(card);
        }
    }
});