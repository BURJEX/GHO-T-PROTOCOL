// 1. Cursor Glow Effect
const cursor = document.getElementById('cursor-glow');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.background = 'radial-gradient(circle, rgba(255, 0, 0, 0.15) 0%, transparent 70%)';
    });
}

// 2. Particle Background (Canvas)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 100;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class FloatingSymbol {
        constructor() {
            this.symbols = ['$', '👻', '📈', '📉', '💰', '💸', '📊', '₿', 'Ξ', '◈', '⚖️', '⛓️', '🏦', '💎', 'GHO$T', 'TRADING', 'BUY', 'SELL', 'PROFIT', '0x777', 'VOID'];
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
            this.isText = this.symbol.length > 2;
            this.size = this.isText ? Math.random() * 15 + 10 : Math.random() * 25 + 15;
            this.speedX = Math.random() * 1.2 - 0.6;
            this.speedY = Math.random() * 1.2 - 0.6;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.fadeDir = 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            // Pulsing opacity
            this.opacity += this.fadeSpeed * this.fadeDir;
            if (this.opacity > 0.4 || this.opacity < 0.05) this.fadeDir *= -1;

            if (this.x > canvas.width + 100) this.x = -100;
            if (this.x < -100) this.x = canvas.width + 100;
            if (this.y > canvas.height + 100) this.y = -100;
            if (this.y < -100) this.y = canvas.height + 100;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.font = `${this.isText ? 'bold ' : ''}${this.size}px ${this.isText ? 'Space Grotesk' : 'serif'}`;
            
            const r = 255;
            const g = this.isText ? 0 : Math.floor(Math.random() * 30);
            const b = this.isText ? 0 : Math.floor(Math.random() * 30);
            
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
            if (this.isText) {
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.strokeText(this.symbol, 0, 0);
            }
            
            ctx.shadowBlur = this.isText ? 12 : 5;
            ctx.shadowColor = `rgba(255, 0, 0, 0.5)`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.symbol, 0, 0);
            ctx.restore();
        }
    }

    class DataStream {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.chars = '01GHOST$#%&*';
            this.length = Math.floor(Math.random() * 10) + 5;
            this.speed = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.15 + 0.05;
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.font = '10px monospace';
            ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
            for(let i = 0; i < this.length; i++) {
                const char = this.chars[Math.floor(Math.random() * this.chars.length)];
                ctx.fillText(char, this.x, this.y - (i * 12));
            }
        }
    }

    class TradingLine {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.points = [];
            this.length = Math.floor(Math.random() * 15) + 8;
            this.opacity = Math.random() * 0.2 + 0.05;
            this.speed = Math.random() * 2.5 + 1.5;
            
            for(let i = 0; i < this.length; i++) {
                this.points.push({
                    x: this.x - (i * 25),
                    y: this.y + (Math.random() * 60 - 30)
                });
            }
        }

        update() {
            this.x += this.speed;
            
            // Shift points
            for(let i = this.points.length - 1; i > 0; i--) {
                this.points[i].x = this.points[i-1].x;
                this.points[i].y = this.points[i-1].y;
            }
            
            this.points[0].x = this.x;
            this.points[0].y += (Math.random() * 12 - 6);

            if (this.x > canvas.width + (this.length * 25)) {
                this.init();
                this.x = -(this.length * 25);
            }
        }

        draw() {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 0, 0, ${this.opacity})`;
            ctx.lineWidth = 1.5;
            ctx.lineJoin = 'round';
            ctx.moveTo(this.points[0].x, this.points[0].y);
            for(let i = 1; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
            ctx.stroke();

            // Glow effect for the current "price" point
            ctx.beginPath();
            ctx.arc(this.points[0].x, this.points[0].y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity * 2})`;
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'red';
            ctx.fill();
        }
    }

    class Candlestick {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.w = 12;
            this.h = Math.random() * 40 + 10;
            this.wick = Math.random() * 20 + 5;
            this.isGreen = Math.random() > 0.5;
            this.speed = Math.random() * 0.8 + 0.2;
            this.opacity = Math.random() * 0.2 + 0.05;
        }

        update() {
            this.x -= this.speed;
            if (this.x < -20) {
                this.x = canvas.width + 20;
                this.y = Math.random() * canvas.height;
            }
        }

        draw() {
            const color = this.isGreen ? 'rgba(0, 255, 136, ' : 'rgba(255, 0, 0, ';
            ctx.fillStyle = color + this.opacity + ')';
            ctx.strokeStyle = color + this.opacity + ')';
            
            // Body
            ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
            
            // Wick
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.h/2 - this.wick);
            ctx.lineTo(this.x, this.y + this.h/2 + this.wick);
            ctx.stroke();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let floatingSymbols = [];
    const symbolCount = 50;
    for (let i = 0; i < symbolCount; i++) {
        floatingSymbols.push(new FloatingSymbol());
    }

    let tradingLines = [];
    const lineCount = 15;
    for (let i = 0; i < lineCount; i++) {
        tradingLines.push(new TradingLine());
    }

    let dataStreams = [];
    const streamCount = 20;
    for (let i = 0; i < streamCount; i++) {
        dataStreams.push(new DataStream());
    }

    let candlesticks = [];
    const candleCount = 25;
    for (let i = 0; i < candleCount; i++) {
        candlesticks.push(new Candlestick());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.03)';
        ctx.lineWidth = 1;
        const step = 50;
        for(let x = 0; x < canvas.width; x += step) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for(let y = 0; y < canvas.height; y += step) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        candlesticks.forEach(c => {
            c.update();
            c.draw();
        });

        dataStreams.forEach(d => {
            d.update();
            d.draw();
        });

        tradingLines.forEach(l => {
            l.update();
            l.draw();
        });

        floatingSymbols.forEach(s => {
            s.update();
            s.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// 3. Live Price Ticker
async function fetchPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        updateTickerItem('btc', data.bitcoin.usd, data.bitcoin.usd_24h_change);
        updateTickerItem('eth', data.ethereum.usd, data.ethereum.usd_24h_change);
        updateTickerItem('sol', data.solana.usd, data.solana.usd_24h_change);
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}

function updateTickerItem(id, price, change) {
    const priceEl = document.getElementById(`${id}-price`);
    const changeEl = document.getElementById(`${id}-change`);
    
    if(priceEl) priceEl.textContent = `$${price.toLocaleString()}`;
    if(changeEl) {
        const isPos = change >= 0;
        changeEl.textContent = `${isPos ? '+' : ''}${change.toFixed(2)}%`;
        changeEl.classList.toggle('pos', isPos);
    }
}
fetchPrices();
setInterval(fetchPrices, 60000);

// 4. Reveal Animations
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 5. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// 6. Live Terminal Logic (Home)
const terminalBody = document.getElementById('terminal-output');
if (terminalBody) {
    const logs = [
        "EXECUTING SHORT AT 96,240...",
        "LONG POSITION FILLED: 0.42 BTC",
        "LIQUIDITY HUNT IN PROGRESS...",
        "VOLATILITY SPIKE DETECTED [!]",
        "ENCRYPTING TRADE HASH...",
        "NEW SIGNAL: ETH/USDT SCALP (50X)",
        "API LATENCY: 12ms [OPTIMIZED]",
        "SYSTEM STATUS: FULLY OPERATIONAL",
        "BLOCKCHAIN SYNC: 99.99%",
        "DATA PACKET RECEIVED: NODE-777",
        "SENTIMENT SCORE: 84 (BULLISH)"
    ];

    function updateTerminal() {
        const line = document.createElement('div');
        line.className = 'line';
        const logText = logs[Math.floor(Math.random() * logs.length)];
        line.textContent = `> ${logText}`;
        terminalBody.appendChild(line);

        if (terminalBody.childNodes.length > 8) {
            terminalBody.removeChild(terminalBody.firstChild);
        }
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    setInterval(updateTerminal, 2500);
}

// 7. Stat Counter Animation
const stats = document.querySelectorAll('.stat-value');
let started = false;
function startCounting() {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const increment = target / 100;
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(startCounting, 20);
        } else {
            stat.innerText = target.toLocaleString();
        }
    });
}
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.classList.contains('stats-section') && !started) {
                startCounting();
                started = true;
            }
        }
    });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => enhancedObserver.observe(el));

// 8. Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });
}

// 9. Command Center Toggle
const ccToggle = document.getElementById('cc-toggle');
const ccMenu = document.getElementById('cc-menu');
if (ccToggle && ccMenu) {
    ccToggle.addEventListener('click', () => {
        const isVisible = ccMenu.style.display === 'flex';
        ccMenu.style.display = isVisible ? 'none' : 'flex';
        ccToggle.textContent = isVisible ? 'G' : 'X';
        ccToggle.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
    });
    document.addEventListener('click', (e) => {
        if (!ccToggle.contains(e.target) && !ccMenu.contains(e.target)) {
            ccMenu.style.display = 'none';
            ccToggle.textContent = 'G';
            ccToggle.style.transform = 'rotate(0deg)';
        }
    });
}

// 10. Dynamic Uplink Status
const uplinkMs = document.getElementById('uplink-ms');
const uplinkId = document.getElementById('uplink-id');
if (uplinkMs && uplinkId) {
    setInterval(() => {
        const ms = Math.floor(Math.random() * 15) + 5;
        uplinkMs.textContent = `${ms}ms`;
        if (Math.random() > 0.95) {
            const nodes = ['CONNECTED', 'STABLE', 'ENCRYPTED', 'GHO$T-NODE-777'];
            uplinkId.textContent = nodes[Math.floor(Math.random() * nodes.length)];
            uplinkId.style.color = 'var(--accent-color)';
            setTimeout(() => uplinkId.style.color = '', 500);
        }
    }, 3000);
}

// 11. Protocol DNA (About Page)
const dnaOutput = document.getElementById('dna-output');
if (dnaOutput) {
    const dnaSequence = `GHO$T_PROTOCOL_SEQUENCE_INITIATED...
[OK] DECRYPTING_IDENTITY_MATRIX...
[OK] LOADING_CORE_VALUES...
    >> SPEED: UNMATCHED
    >> PRECISION: SURGICAL
    >> VISION: EXPONENTIAL
Identity Verified: SYSTEM_ADMIN_LEVEL_0
    ...
    ...
    ...
Welcome to the inner circle.`;
    let i = 0;
    function typeDNA() {
        if (i < dnaSequence.length) {
            dnaOutput.innerHTML += dnaSequence.charAt(i);
            i++;
            setTimeout(typeDNA, 50);
        }
    }
    typeDNA();
}

// 12. Raw Hex Dump (Specs Page)
const hexStream = document.getElementById('hex-stream');
if (hexStream) {
    function generateHex() {
        let hex = '';
        for (let i = 0; i < 50; i++) {
            hex += Math.floor(Math.random() * 16).toString(16).toUpperCase() + ' ';
        }
        return hex;
    }
    setInterval(() => {
        const line = document.createElement('div');
        line.textContent = `0x${Math.floor(Math.random()*10000)}: ` + generateHex();
        hexStream.appendChild(line);
        if (hexStream.childNodes.length > 20) {
            hexStream.removeChild(hexStream.firstChild);
        }
        hexStream.scrollTop = hexStream.scrollHeight;
    }, 100);
}

// 13. Singularity Countdown (Evolution Page)
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
    const targetDate = new Date().getTime() + (14 * 24 * 60 * 60 * 1000);
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownEl.innerHTML = `
            <div class="countdown-unit"><span>${days}</span><span class="unit-label">DAYS</span></div>
            <div class="countdown-unit"><span>${hours}</span><span class="unit-label">HRS</span></div>
            <div class="countdown-unit"><span>${minutes}</span><span class="unit-label">MIN</span></div>
            <div class="countdown-unit"><span>${seconds}</span><span class="unit-label">SEC</span></div>
        `;
    }, 1000);
}

// 14. Community Feed Simulation
const communityFeed = document.getElementById('community-feed');
if (communityFeed) {
    const communityMessages = [
        "ALPHA: New whale activity detected on SOL.",
        "SYSTEM: Node #442 syncing complete.",
        "USER_777: Signal hit TP3! 420% ROE.",
        "MOD: Weekly strategy call recording uploaded.",
        "SYSTEM: AES-256 rotation successful.",
        "USER_X: Anyone looking at the ETH/BTC pair?",
        "ALPHA: Liquidity sweep incoming. Watch the 1h candle."
    ];
    setInterval(() => {
        const item = document.createElement('div');
        item.className = 'feed-item';
        const msg = communityMessages[Math.floor(Math.random() * communityMessages.length)];
        const user = msg.split(':')[0];
        const content = msg.split(':')[1];
        item.innerHTML = `<span class="f-user">${user}:</span>${content}`;
        communityFeed.appendChild(item);
        
        if (communityFeed.childNodes.length > 15) {
            communityFeed.removeChild(communityFeed.firstChild);
        }
        communityFeed.scrollTop = communityFeed.scrollHeight;
    }, 4000);
}

// 15. Node Access Terminal (Community Page)
const walletInput = document.getElementById('wallet-input');
const accessOutput = document.getElementById('access-output');

window.verifyWallet = function() {
    if (!walletInput || !accessOutput) return;
    
    const wallet = walletInput.value.trim();
    if (wallet === "") {
        accessOutput.textContent = "ERROR: INPUT_REQUIRED";
        accessOutput.className = "terminal-response";
        return;
    }
    
    accessOutput.textContent = "SCANNING_LEDGER...";
    accessOutput.className = "terminal-response";
    
    setTimeout(() => {
        if (Math.random() > 0.5) {
            accessOutput.textContent = "ACCESS_DENIED: INSUFFICIENT_GHO$T_BALANCE";
            accessOutput.className = "terminal-response";
        } else {
            accessOutput.textContent = "ACCESS_GRANTED: WELCOME_NODE_OPERATOR";
            accessOutput.className = "terminal-response success";
        }
    }, 1500);
};
