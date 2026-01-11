/* ==================== 飘字效果配置对象 ==================== */
const config = {

    textList: [
        "与你共度朝暮",
        "有你便是晴天",
        "余生有你足矣",
        "偏爱只予你一人",
        "为你倾尽温柔",
        "携手岁岁年年",
        "你是心之所向",
        "温柔皆因有你",
        "伴你春夏秋冬",
        "爱意藏于朝夕",
        "想你不分昼夜",
		"每天都要元气满满的",
		"愿所有烦恼都消失",
		"今天辛苦了",
		"祝你顺利",
		"保持好心情",
		"早点休息",
		"梦想总会实现",
		"适当休息一下",
		"好好爱自己",
		"记得给自己放松",
		"记得吃水果",
		"天气冷了,多穿衣服",
		
    ],
    // 增加更多颜色选择，提高视觉效果
    colorList: [
        "#ffffff", "#e6f7ff", "#fff1e6", "#f0f8ff", "#fef6e7", "#e8f4f8",
        "#f5f5f5", "#f0ffff", "#fffaf0", "#f8f8ff", "#fafad2", "#ffe4e1",
        "#e0ffff", "#f0f8ff", "#f5fffa", "#fff0f5", "#f0fff0", "#fffacd"
    ],
    createInterval: 100, // 大幅减小创建间隔，从300ms减少到100ms，增加密度
    // 字体大小范围会根据设备类型调整
    fontSizeRange: null, // 初始设为null，将在设备检测后设置
    speedRange: [5, 25], // 扩大速度范围，从6-15扩大到5-25，增加变化性
    maxTextCount: null, // 设为null，将在设备检测后设置
    // 添加新配置参数
    initialTextCount: null, // 设为null，将在设备检测后设置
    rotateRange: [-15, 15] // 添加随机旋转角度范围
};

// 设备检测函数
function isMobileDevice() {
    // 检测设备类型
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // 检测移动设备
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent);
    
    // 检测屏幕尺寸
    const isSmallScreen = window.innerWidth <= 768;
    
    // 检测触摸屏
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // 如果任何条件为真，则认为是移动设备
    return isMobile || isSmallScreen || hasTouchScreen;
}

// 检测设备类型（手机/平板/PC）
function getDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const screenWidth = window.innerWidth;
    
    // 检测平板设备
    const tabletRegex = /iPad|Tablet|PlayBook|Silk|Kindle/i;
    const isTablet = tabletRegex.test(userAgent);
    
    // 检测手机设备
    const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent) && !isTablet;
    
    // 检测屏幕尺寸
    const isSmallScreen = screenWidth <= 768;
    const isMediumScreen = screenWidth > 768 && screenWidth <= 1024;
    
    // 判断设备类型
    if (isMobile || (isSmallScreen && !isTablet)) {
        return 'mobile'; // 手机设备
    } else if (isTablet || isMediumScreen) {
        return 'tablet'; // 平板设备
    } else {
        return 'desktop'; // PC设备
    }
}

// 根据设备类型调整配置
function adjustConfigForDevice() {
    const deviceType = getDeviceType();
    
    // PC设备配置
    if (deviceType === 'desktop') {
        config.fontSizeRange = [14, 28]; // PC设备保持14-28
        config.maxTextCount = 120;
        config.initialTextCount = 30;
        console.log('检测到PC设备，使用默认配置');
    }
    // 平板设备配置（使用电脑配置）
    else if (deviceType === 'tablet') {
        config.fontSizeRange = [14, 28]; // 平板设备使用电脑的字体大小
        config.maxTextCount = 120;
        config.initialTextCount = 30;
        console.log('检测到平板设备，使用电脑配置');
    }
    // 手机设备配置
    else if (deviceType === 'mobile') {
        // 手机设备：减少飘字数量，让显示不那么密集
        config.maxTextCount = 60; // 手机设备最大飘字数减少到60
        config.initialTextCount = 15; // 手机设备初始飘字数减少到15
        
        // 如果需要调整字体大小，取消下面的注释
        // config.fontSizeRange = [12, 22]; // 手机设备字体小一点：从14-28调整为12-22
        
        // 如果使用上面的字体调整，注释掉下面这行
        config.fontSizeRange = [14, 28]; // 暂时保持字体大小不变
        
        console.log('检测到手机设备，减少飘字数量，保持字体大小');
    }
    
    // 如果没有设置fontSizeRange，设置默认值
    if (!config.fontSizeRange) {
        config.fontSizeRange = [14, 28];
    }
    
    console.log(`设备类型: ${deviceType}, 最大飘字数: ${config.maxTextCount}, 初始飘字数: ${config.initialTextCount}`);
}

// 获取飘字容器DOM元素
const container = document.getElementById('container');
// 当前飘字计数
let currentTextCount = 0;
// 飘字创建定时器
let floatTextInterval = null;

/* ==================== 工具函数 ==================== */
/**
 * 生成指定范围内的随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机数
 */
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 生成随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机整数
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ==================== 飘字创建函数 ==================== */
/**
 * 创建单个飘字元素并添加到页面
 */
function createFloatText() {
    // 如果当前飘字数已达上限，则不再创建
    if (currentTextCount >= config.maxTextCount) return;

    // 创建飘字div元素
    const textEl = document.createElement('div');
    textEl.className = 'float-text';
    
    // 随机选择飘字内容
    const randomText = config.textList[Math.floor(Math.random() * config.textList.length)];
    textEl.innerText = randomText;
    
    // 随机选择飘字颜色
    const randomColor = config.colorList[Math.floor(Math.random() * config.colorList.length)];
    textEl.style.color = randomColor;
    
    // 随机设置字体大小（使用调整后的范围）
    const fontSize = getRandom(...config.fontSizeRange);
    textEl.style.fontSize = `${fontSize}px`;
    
    // 随机设置水平起始位置，确保文字不会超出屏幕右侧
    const left = getRandom(0, window.innerWidth - fontSize * randomText.length);
    textEl.style.left = `${left}px`;
    
    // 随机设置飘落动画持续时间（速度）
    const duration = getRandom(...config.speedRange);
    textEl.style.animationDuration = `${duration}s`;
    
    // 随机设置动画延迟开始时间
    const delay = getRandom(0, 3);
    textEl.style.animationDelay = `${delay}s`;
    
    // 随机设置水平偏移量，增加自然感
    const randomX = getRandomInt(-100, 100);
    textEl.style.setProperty('--random-x', `${randomX}px`);
    
    // 随机设置旋转角度
    const randomRotate = getRandom(...config.rotateRange);
    textEl.style.setProperty('--random-rotate', `${randomRotate}deg`);
    
    // 根据速度添加不同层级类名，增加视觉效果
    if (duration < 10) {
        textEl.classList.add('fast');
    } else if (duration > 20) {
        textEl.classList.add('slow');
    }
    
    // 添加轻微摆动效果
    const rotateAmount = getRandom(-3, 3);
    textEl.style.setProperty('--rotate-amount', `${rotateAmount}deg`);
    
    // 随机透明度，增加层次感
    const opacity = getRandom(0.6, 1);
    textEl.style.opacity = opacity;

    // 将飘字添加到容器中
    container.appendChild(textEl);
    currentTextCount++; // 飘字计数增加

    /* 动画结束事件监听器
       当飘字动画播放完毕，从DOM中移除该元素 */
    textEl.addEventListener('animationend', () => {
        if (textEl.parentNode === container) {
            container.removeChild(textEl);
            currentTextCount--; // 飘字计数减少
        }
    });
}

/* ==================== 窗口大小变化处理 ==================== */
// 当窗口大小改变时，清空所有飘字并重新开始
window.addEventListener('resize', () => {
    // 清空容器内的所有飘字
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    currentTextCount = 0; // 重置飘字计数
    
    // 重新调整设备配置
    adjustConfigForDevice();
    
    // 如果已经开始了飘字效果，重新开始
    if (floatTextInterval) {
        clearInterval(floatTextInterval);
        floatTextInterval = setInterval(createFloatText, config.createInterval);
    }
});

/* ==================== 欢迎页面控制 ==================== */
// 获取欢迎页面和开始按钮元素
const welcomePage = document.getElementById('welcomePage');
const startBtn = document.getElementById('startBtn');

// 开始按钮点击事件监听器
startBtn.addEventListener('click', () => {
    // 隐藏欢迎页面
    welcomePage.style.display = 'none';
    
    // 显示音乐控制按钮
    if (musicBtn) {
        musicBtn.style.display = 'flex';
    }
    
    // 开始播放背景音乐
    playBackgroundMusic();
    
    // 开始飘字效果
    floatTextInterval = setInterval(createFloatText, config.createInterval); // 定时创建新飘字
    
    // 初始创建一批飘字，错开时间创建
    for (let i = 0; i < config.initialTextCount; i++) {
        setTimeout(createFloatText, i * 50); // 减小间隔时间，增加初始密度
    }
});

/* ==================== 音乐播放控制模块 ==================== */
// 获取音乐相关DOM元素
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
// 音乐播放状态标志
let isMusicPlaying = false;
// 音乐初始化标志，确保只初始化一次
let musicInitialized = false;

/**
 * 背景音乐播放控制主函数
 * 处理自动播放策略和用户交互
 */
function playBackgroundMusic() {
    // 如果已经初始化过，直接返回
    if (musicInitialized) return;
    musicInitialized = true;
    
    // 设置音量
    bgMusic.volume = 0.7;
    
    // 尝试播放音乐
    bgMusic.play().then(() => {
        // 播放成功
        isMusicPlaying = true;
        if (musicBtn) {
            musicBtn.innerHTML = '<span>🎵</span>';
            musicBtn.classList.add('playing');
        }
        console.log('音乐开始播放');
    }).catch(e => {
        // 播放失败，可能是用户拒绝了自动播放
        console.log('自动播放被阻止:', e);
        // 显示静音图标，提示用户手动播放
        if (musicBtn) {
            musicBtn.innerHTML = '<span>🔇</span>';
        }
    });
    
    /* 音乐控制按钮点击事件
       切换播放/暂停状态 */
    if (musicBtn) {
        musicBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡，避免触发其他点击事件
            
            if (isMusicPlaying) {
                // 当前正在播放，点击后暂停
                bgMusic.pause();
                musicBtn.innerHTML = '<span>🔇</span>';
                isMusicPlaying = false;
                musicBtn.classList.remove('playing'); // 移除播放状态样式
            } else {
                // 当前暂停中，点击后播放
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicBtn.innerHTML = '<span>🎵</span>';
                    musicBtn.classList.add('playing'); // 添加播放状态样式
                }).catch(error => {
                    // 播放失败处理
                    console.log('播放失败:', error);
                    musicBtn.innerHTML = '<span>❌</span>';
                });
            }
        });
    }
    
    /* 页面可见性变化处理
       当页面被隐藏（切换标签页、最小化）时暂停音乐
       当页面恢复显示时继续播放 */
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面隐藏时暂停音乐
            if (!bgMusic.paused) {
                bgMusic.pause();
                bgMusic.wasPlaying = true; // 记录播放状态
            }
        } else {
            // 页面恢复显示时继续播放
            if (bgMusic.wasPlaying && isMusicPlaying) {
                bgMusic.play();
            }
        }
    });
}

/* ==================== 页面初始化 ==================== */
// DOM加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    // 根据设备类型调整配置
    adjustConfigForDevice();
    
    // 延迟1秒后初始化音乐播放，确保页面完全加载
    setTimeout(playBackgroundMusic, 1000);
});
