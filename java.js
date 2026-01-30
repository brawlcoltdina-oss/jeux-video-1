// VARIABLES GLOBALES
let cookies = 0;
let totalCookiesProduced = 0;
let cookiesPerSecond = 0;
let clickPower = 1;
let currentMultiplier = 1;
let multiplierTimeLeft = 0;

// SAUVEGARDE
function saveGame() {
    const gameData = {
        cookies,
        totalCookiesProduced,
        clickPower,
        buildings: buildings.map(b => ({ count: b.count })),
        upgrades: upgrades.map(u => ({ purchased: u.purchased })),
        achievements: achievements.map(a => ({ unlocked: a.unlocked }))
    };
    localStorage.setItem('cookieClickerSave', JSON.stringify(gameData));
}

function loadGame() {
    const saved = localStorage.getItem('cookieClickerSave');
    if (saved) {
        const data = JSON.parse(saved);
        cookies = data.cookies || 0;
        totalCookiesProduced = data.totalCookiesProduced || 0;
        clickPower = data.clickPower || 1;
        
        if (data.buildings) {
            data.buildings.forEach((b, i) => {
                if (buildings[i]) buildings[i].count = b.count;
            });
        }
        
        if (data.upgrades) {
            data.upgrades.forEach((u, i) => {
                if (upgrades[i]) upgrades[i].purchased = u.purchased;
            });
        }
        
        if (data.achievements) {
            data.achievements.forEach((a, i) => {
                if (achievements[i]) achievements[i].unlocked = a.unlocked;
            });
        }
    }
}

// BÂTIMENTS
const buildings = [
    {
        name: "Grand-mère",
        icon: "👵",
        baseCost: 15,
        baseProduction: 0.1,
        count: 0,
        description: "Une gentille grand-mère qui cuit des cookies"
    },
    {
        name: "Ferme de cookies",
        icon: "🏠",
        baseCost: 100,
        baseProduction: 1,
        count: 0,
        description: "Une ferme pour cultiver des cookies frais"
    },
    {
        name: "Mine de chocolat",
        icon: "⛏️",
        baseCost: 1100,
        baseProduction: 8,
        count: 0,
        description: "Extrait du chocolat pur de la terre"
    },
    {
        name: "Usine automatique",
        icon: "🏭",
        baseCost: 12000,
        baseProduction: 47,
        count: 0,
        description: "Production industrielle de cookies"
    },
    {
        name: "Laboratoire",
        icon: "🔬",
        baseCost: 130000,
        baseProduction: 260,
        count: 0,
        description: "Recherche sur les cookies génétiquement modifiés"
    },
    {
        name: "Portail dimensionnel",
        icon: "🌀",
        baseCost: 1400000,
        baseProduction: 1400,
        count: 0,
        description: "Import de cookies d'autres dimensions"
    },
    {
        name: "Machine temporelle",
        icon: "⏰",
        baseCost: 20000000,
        baseProduction: 7800,
        count: 0,
        description: "Ramène des cookies du futur"
    },
    {
        name: "Condenseur quantique",
        icon: "⚛️",
        baseCost: 330000000,
        baseProduction: 44000,
        count: 0,
        description: "Matérialise des cookies à partir du vide quantique"
    }
];

// AMÉLIORATIONS
const upgrades = [
    {
        name: "Doigts renforcés",
        icon: "💪",
        cost: 100,
        effect: () => { clickPower += 1; },
        description: "Double ta puissance de clic",
        purchased: false
    },
    {
        name: "Super doigts",
        icon: "👊",
        cost: 500,
        effect: () => { clickPower += 5; },
        description: "Clics encore plus puissants",
        purchased: false
    },
    {
        name: "Doigts mega ultra",
        icon: "🔥",
        cost: 10000,
        effect: () => { clickPower += 25; },
        description: "Tes doigts sont en feu !",
        purchased: false
    },
    {
        name: "Grand-mères motivées",
        icon: "👵💨",
        cost: 1000,
        effect: () => { buildings[0].baseProduction *= 2; },
        description: "Les grand-mères travaillent 2x plus vite",
        purchased: false
    },
    {
        name: "Fermes optimisées",
        icon: "🏠⚡",
        cost: 11000,
        effect: () => { buildings[1].baseProduction *= 2; },
        description: "Fermes 2x plus productives",
        purchased: false
    },
    {
        name: "Foreuses diamant",
        icon: "💎",
        cost: 120000,
        effect: () => { buildings[2].baseProduction *= 2; },
        description: "Mines 2x plus efficaces",
        purchased: false
    },
    {
        name: "IA de production",
        icon: "🤖",
        cost: 1300000,
        effect: () => { buildings[3].baseProduction *= 2; },
        description: "Usines automatisées avec IA",
        purchased: false
    },
    {
        name: "Cookie doré",
        icon: "🪙",
        cost: 50000,
        effect: () => { 
            buildings.forEach(b => b.baseProduction *= 1.5);
        },
        description: "Tous les bâtiments +50% production",
        purchased: false
    }
];

// MULTIPLICATEURS
const multipliers = [
    { name: "x2 (30s)", multiplier: 2, duration: 30, cost: 500 },
    { name: "x5 (20s)", multiplier: 5, duration: 20, cost: 2000 },
    { name: "x10 (10s)", multiplier: 10, duration: 10, cost: 5000 },
    { name: "x100 (5s)", multiplier: 100, duration: 5, cost: 50000 }
];

// SUCCÈS
const achievements = [
    { name: "Premier cookie", icon: "🍪", description: "Clique ton premier cookie", condition: () => totalCookiesProduced >= 1, unlocked: false },
    { name: "Bébé cliqueur", icon: "👶", description: "Produis 100 cookies", condition: () => totalCookiesProduced >= 100, unlocked: false },
    { name: "Cliqueur confirmé", icon: "😎", description: "Produis 1 000 cookies", condition: () => totalCookiesProduced >= 1000, unlocked: false },
    { name: "Maître du cookie", icon: "👑", description: "Produis 10 000 cookies", condition: () => totalCookiesProduced >= 10000, unlocked: false },
    { name: "Dieu du cookie", icon: "⚡", description: "Produis 100 000 cookies", condition: () => totalCookiesProduced >= 100000, unlocked: false },
    { name: "Cookie cosmique", icon: "🌌", description: "Produis 1 000 000 cookies", condition: () => totalCookiesProduced >= 1000000, unlocked: false },
    { name: "Première grand-mère", icon: "👵", description: "Achète ta première grand-mère", condition: () => buildings[0].count >= 1, unlocked: false },
    { name: "Armée de grand-mères", icon: "👵👵👵", description: "Possède 10 grand-mères", condition: () => buildings[0].count >= 10, unlocked: false },
    { name: "Investisseur", icon: "💰", description: "Achète ton premier bâtiment", condition: () => buildings.some(b => b.count > 0), unlocked: false },
    { name: "Magnat du cookie", icon: "🏰", description: "Possède 50 bâtiments au total", condition: () => buildings.reduce((sum, b) => sum + b.count, 0) >= 50, unlocked: false },
    { name: "Améliorateur", icon: "⬆️", description: "Achète une amélioration", condition: () => upgrades.some(u => u.purchased), unlocked: false },
    { name: "Productivité", icon: "📈", description: "Produis 100 cookies/sec", condition: () => cookiesPerSecond >= 100, unlocked: false },
    { name: "Hyper productivité", icon: "🚀", description: "Produis 1 000 cookies/sec", condition: () => cookiesPerSecond >= 1000, unlocked: false }
];

// INITIALISATION
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    initializeParticles();
    initializeMultipliers();
    initializeBuildings();
    initializeUpgrades();
    initializeAchievements();
    setupEventListeners();
    updateDisplay();
    
    // Boucle de jeu
    setInterval(gameLoop, 100);
    setInterval(saveGame, 10000); // Sauvegarde toutes les 10 secondes
});

// PARTICULES D'ARRIÈRE-PLAN
function initializeParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// MULTIPLICATEURS
function initializeMultipliers() {
    const container = document.getElementById('multipliers');
    multipliers.forEach((mult, index) => {
        const btn = document.createElement('button');
        btn.className = 'multiplier-btn';
        btn.innerHTML = `
            <div>${mult.name}</div>
            <div class="mult-cost">💰 ${formatNumber(mult.cost)}</div>
        `;
        btn.onclick = () => activateMultiplier(index);
        container.appendChild(btn);
    });
}

function activateMultiplier(index) {
    const mult = multipliers[index];
    if (cookies >= mult.cost && multiplierTimeLeft <= 0) {
        cookies -= mult.cost;
        currentMultiplier = mult.multiplier;
        multiplierTimeLeft = mult.duration;
        
        const buttons = document.querySelectorAll('.multiplier-btn');
        buttons[index].classList.add('active');
        
        showFloatingCookie('🔥 BOOST x' + mult.multiplier + ' !');
        updateDisplay();
    }
}

// BÂTIMENTS
function initializeBuildings() {
    const container = document.getElementById('buildingsList');
    buildings.forEach((building, index) => {
        const item = createShopItem(building, index, 'building');
        container.appendChild(item);
    });
}

// AMÉLIORATIONS
function initializeUpgrades() {
    const container = document.getElementById('upgradesList');
    upgrades.forEach((upgrade, index) => {
        const item = createShopItem(upgrade, index, 'upgrade');
        container.appendChild(item);
    });
}

function createShopItem(item, index, type) {
    const div = document.createElement('div');
    div.className = 'shop-item';
    
    const cost = type === 'building' ? calculateCost(item.baseCost, item.count) : item.cost;
    const production = type === 'building' ? item.baseProduction : 0;
    
    div.innerHTML = `
        <div class="shop-item-header">
            <span class="shop-item-icon">${item.icon}</span>
            <div class="shop-item-info">
                <div class="shop-item-name">${item.name}</div>
                ${type === 'building' ? `<div class="shop-item-count">${item.count}</div>` : ''}
            </div>
        </div>
        <div class="shop-item-description">${item.description}</div>
        <div class="shop-item-stats">
            ${type === 'building' ? `<span class="shop-item-production">📈 +${formatNumber(production)}/sec</span>` : ''}
            <span class="shop-item-cost">💰 ${formatNumber(cost)}</span>
        </div>
    `;
    
    div.onclick = () => {
        if (type === 'building') {
            buyBuilding(index);
        } else {
            buyUpgrade(index);
        }
    };
    
    return div;
}

function buyBuilding(index) {
    const building = buildings[index];
    const cost = calculateCost(building.baseCost, building.count);
    
    if (cookies >= cost) {
        cookies -= cost;
        building.count++;
        showFloatingCookie(building.icon);
        updateDisplay();
        checkAchievements();
    }
}

function buyUpgrade(index) {
    const upgrade = upgrades[index];
    
    if (!upgrade.purchased && cookies >= upgrade.cost) {
        cookies -= upgrade.cost;
        upgrade.purchased = true;
        upgrade.effect();
        showFloatingCookie(upgrade.icon);
        updateDisplay();
        checkAchievements();
    }
}

function calculateCost(baseCost, count) {
    return Math.floor(baseCost * Math.pow(1.15, count));
}

// SUCCÈS
function initializeAchievements() {
    const container = document.getElementById('achievementsList');
    achievements.forEach(achievement => {
        const div = document.createElement('div');
        div.className = 'achievement' + (achievement.unlocked ? ' unlocked' : '');
        div.innerHTML = `
            <div class="achievement-header">
                <span class="achievement-icon">${achievement.icon}</span>
                <span class="achievement-name">${achievement.name}</span>
            </div>
            <div class="achievement-description">${achievement.description}</div>
        `;
        container.appendChild(div);
    });
}

function checkAchievements() {
    let newUnlocks = 0;
    achievements.forEach((achievement, index) => {
        if (!achievement.unlocked && achievement.condition()) {
            achievement.unlocked = true;
            newUnlocks++;
            showAchievementUnlock(achievement, index);
        }
    });
    
    if (newUnlocks > 0) {
        updateAchievementDisplay();
    }
}

function showAchievementUnlock(achievement, index) {
    const elements = document.querySelectorAll('.achievement');
    elements[index].classList.add('unlocked');
    
    // Animation de notification
    showFloatingCookie(`🏆 ${achievement.name} débloqué !`);
}

function updateAchievementDisplay() {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    document.getElementById('achievementCount').textContent = unlockedCount + '/' + achievements.length;
}

// CLIC SUR LE COOKIE
document.getElementById('cookieBtn').addEventListener('click', (e) => {
    const power = clickPower * currentMultiplier;
    cookies += power;
    totalCookiesProduced += power;
    
    // Animation du texte
    const clickText = document.getElementById('clickValue');
    clickText.textContent = '+' + formatNumber(power);
    clickText.classList.remove('show');
    void clickText.offsetWidth; // Force reflow
    clickText.classList.add('show');
    
    // Cookie flottant aléatoire
    if (Math.random() < 0.3) {
        createFloatingCookie(e.clientX, e.clientY);
    }
    
    updateDisplay();
    checkAchievements();
});

// COOKIES FLOTTANTS
function createFloatingCookie(x, y) {
    const cookie = document.createElement('div');
    cookie.className = 'floating-cookie';
    cookie.textContent = '🍪';
    cookie.style.left = x + 'px';
    cookie.style.top = y + 'px';
    document.getElementById('floatingCookies').appendChild(cookie);
    
    setTimeout(() => cookie.remove(), 2000);
}

function showFloatingCookie(text) {
    const cookie = document.createElement('div');
    cookie.className = 'floating-cookie';
    cookie.textContent = text;
    cookie.style.left = '50%';
    cookie.style.top = '30%';
    cookie.style.fontSize = '2em';
    cookie.style.transform = 'translateX(-50%)';
    document.getElementById('floatingCookies').appendChild(cookie);
    
    setTimeout(() => cookie.remove(), 2000);
}

// BOUCLE DE JEU
function gameLoop() {
    // Production passive
    cookiesPerSecond = 0;
    buildings.forEach(building => {
        cookiesPerSecond += building.baseProduction * building.count;
    });
    
    const production = (cookiesPerSecond * currentMultiplier) / 10;
    cookies += production;
    totalCookiesProduced += production;
    
    // Multiplicateur
    if (multiplierTimeLeft > 0) {
        multiplierTimeLeft -= 0.1;
        if (multiplierTimeLeft <= 0) {
            currentMultiplier = 1;
            document.querySelectorAll('.multiplier-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
    }
    
    updateDisplay();
}

// MISE À JOUR AFFICHAGE
function updateDisplay() {
    document.getElementById('cookieCount').textContent = formatNumber(Math.floor(cookies));
    document.getElementById('cookiesPerSecond').textContent = formatNumber(cookiesPerSecond * currentMultiplier);
    document.getElementById('totalCookies').textContent = formatNumber(Math.floor(totalCookiesProduced));
    
    updateShopDisplay();
}

function updateShopDisplay() {
    // Bâtiments
    const buildingItems = document.querySelectorAll('#buildingsList .shop-item');
    buildings.forEach((building, index) => {
        const cost = calculateCost(building.baseCost, building.count);
        const item = buildingItems[index];
        
        if (item) {
            item.querySelector('.shop-item-count').textContent = building.count;
            item.querySelector('.shop-item-cost').textContent = '💰 ' + formatNumber(cost);
            
            if (cookies >= cost) {
                item.classList.add('affordable');
            } else {
                item.classList.remove('affordable');
            }
        }
    });
    
    // Améliorations
    const upgradeItems = document.querySelectorAll('#upgradesList .shop-item');
    upgrades.forEach((upgrade, index) => {
        const item = upgradeItems[index];
        
        if (item) {
            if (upgrade.purchased) {
                item.style.opacity = '0.5';
                item.style.pointerEvents = 'none';
                item.querySelector('.shop-item-name').textContent = upgrade.name + ' ✅';
            } else if (cookies >= upgrade.cost) {
                item.classList.add('affordable');
            } else {
                item.classList.remove('affordable');
            }
        }
    });
}

// ONGLETS
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.shop-category').forEach(cat => cat.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
    });
});

// PANNEAU SUCCÈS
document.getElementById('toggleAchievements').addEventListener('click', () => {
    document.getElementById('achievementsPanel').classList.toggle('open');
});

// EVENT LISTENERS
function setupEventListeners() {
    updateAchievementDisplay();
}

// FORMATAGE NOMBRES
function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return Math.floor(num).toString();
}

// SAUVEGARDE AUTOMATIQUE
window.addEventListener('beforeunload', saveGame);