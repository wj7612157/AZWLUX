// AZWLUX 官网 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const modal = document.getElementById('purchaseModal');
    const openFormBtn = document.getElementById('openFormBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const purchaseForm = document.getElementById('purchaseForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // 打开模态框
    openFormBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // 关闭模态框
    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // 重置表单
        if (purchaseForm) {
            purchaseForm.reset();
            purchaseForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }
    }
    
    // 表单提交
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(purchaseForm);
            const data = Object.fromEntries(formData);
            
            // 这里仅做前端展示，实际项目中会发送到后端服务器
            console.log('提交的表单数据：', data);
            
            // 显示成功信息
            purchaseForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // 3秒后自动关闭模态框
            setTimeout(function() {
                closeModal();
            }, 3000);
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
});
// 选择配置函数
function selectConfig(configName, price) {
    const modal = document.getElementById('purchaseModal');
    const configSelect = document.getElementById('config');
    
    // 设置选中的配置
    if (configSelect) {
        // 根据名称匹配选项
        for (let i = 0; i < configSelect.options.length; i++) {
            if (configSelect.options[i].text.includes(configName)) {
                configSelect.selectedIndex = i;
                break;
            }
        }
    }
    
    // 打开表单
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 滚动到表单第一个输入框
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 300);
}