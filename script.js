// ============================================
// AI Sentiment Analysis Tool - JavaScript
// ============================================

// Sentiment Analysis Database
const sentimentDatabase = {
    positive: {
        keywords: ['love', 'excellent', 'amazing', 'wonderful', 'fantastic', 'great', 'awesome', 'perfect', 'best', 'beautiful', 'good', 'happy', 'glad', 'pleased', 'satisfied', 'impressed', 'brilliant', 'outstanding', 'superb', 'delighted', 'thrilled', 'wonderful', 'fantastic', 'incredible', 'excellent', 'outstanding', 'remarkable', 'splendid', 'magnificent', 'marvelous', 'exceptional', 'superior', 'fine', 'nice', 'pleasant', 'enjoyable', 'delightful', 'charming', 'attractive', 'lovely', 'beautiful', 'gorgeous', 'stunning', 'brilliant', 'clever', 'smart', 'intelligent', 'wise', 'helpful', 'useful', 'beneficial', 'valuable', 'precious', 'worthwhile', 'rewarding', 'fulfilling', 'satisfying', 'gratifying', 'comforting', 'soothing', 'peaceful', 'calm', 'serene', 'tranquil', 'relaxing', 'refreshing', 'invigorating', 'energizing', 'exciting', 'thrilling', 'exhilarating'],
        weights: 0.8
    },
    negative: {
        keywords: ['hate', 'terrible', 'awful', 'horrible', 'bad', 'worst', 'poor', 'disappointing', 'useless', 'waste', 'disgusting', 'ugly', 'annoying', 'frustrating', 'angry', 'sad', 'depressed', 'miserable', 'unhappy', 'upset', 'furious', 'furious', 'enraged', 'livid', 'outraged', 'disgusted', 'repulsed', 'revolted', 'appalled', 'horrified', 'terrified', 'scared', 'frightened', 'anxious', 'worried', 'concerned', 'troubled', 'distressed', 'anguished', 'tormented', 'suffering', 'painful', 'hurtful', 'offensive', 'insulting', 'rude', 'disrespectful', 'crude', 'vulgar', 'obscene', 'profane', 'vile', 'despicable', 'contemptible', 'abominable', 'detestable', 'loathsome', 'odious', 'obnoxious', 'unpleasant', 'disagreeable', 'unwelcome', 'unwanted', 'undesirable', 'broken', 'faulty', 'defective', 'damaged', 'ruined', 'destroyed', 'wrecked', 'shattered', 'failed', 'unsuccessful', 'ineffective', 'useless', 'worthless', 'pointless', 'futile', 'vain', 'empty', 'hollow', 'meaningless', 'senseless', 'ridiculous', 'absurd', 'stupid', 'dumb', 'idiotic', 'moronic', 'pathetic', 'pitiful', 'lamentable', 'deplorable', 'regrettable', 'unfortunate', 'unlucky', 'disastrous', 'catastrophic', 'calamitous', 'dire', 'grim', 'bleak', 'dark', 'gloomy', 'depressing', 'oppressive', 'suffocating', 'stifling', 'choking', 'smothering', 'overwhelming', 'unbearable', 'intolerable', 'unacceptable', 'unforgivable', 'inexcusable', 'unjustifiable', 'indefensible'],
        weights: 0.8
    },
    neutral: {
        keywords: ['ok', 'okay', 'fine', 'average', 'normal', 'regular', 'standard', 'typical', 'common', 'ordinary', 'usual', 'expected', 'moderate', 'medium', 'fair', 'decent', 'acceptable', 'tolerable', 'passable', 'adequate', 'sufficient', 'enough', 'reasonable', 'rational', 'logical', 'sensible', 'practical', 'pragmatic', 'realistic', 'objective', 'impartial', 'unbiased', 'neutral', 'balanced', 'fair', 'just', 'equitable', 'honest', 'truthful', 'sincere', 'genuine', 'authentic', 'real', 'true', 'actual', 'factual', 'concrete', 'tangible', 'physical', 'material', 'substantial', 'solid', 'firm', 'stable', 'steady', 'constant', 'consistent', 'reliable', 'dependable', 'trustworthy', 'faithful', 'loyal', 'devoted', 'committed', 'dedicated', 'determined', 'resolute', 'steadfast', 'unwavering', 'unflinching', 'brave', 'courageous', 'bold', 'daring', 'adventurous', 'intrepid', 'fearless', 'valiant', 'heroic', 'noble', 'dignified', 'respectful', 'courteous', 'polite', 'civil', 'gracious', 'kind', 'compassionate', 'empathetic', 'sympathetic', 'understanding', 'tolerant', 'patient', 'gentle', 'mild', 'soft', 'tender', 'delicate', 'fragile', 'vulnerable', 'weak', 'frail', 'feeble', 'infirm', 'sickly', 'ill', 'unwell', 'indisposed', 'ailing', 'diseased', 'infected', 'contaminated', 'polluted', 'tainted', 'spoiled', 'rotten', 'decayed', 'decomposed', 'putrid', 'fetid', 'malodorous', 'stinking', 'smelly', 'reeking', 'rank', 'foul', 'noxious', 'toxic', 'poisonous', 'venomous', 'deadly', 'lethal', 'fatal', 'mortal', 'terminal', 'incurable', 'hopeless', 'desperate', 'lost', 'doomed', 'cursed', 'damned', 'forsaken', 'abandoned', 'deserted', 'lonely', 'isolated', 'solitary', 'secluded', 'remote', 'distant', 'far', 'near', 'close', 'adjacent', 'neighboring', 'surrounding', 'encircling', 'encompassing', 'including', 'containing', 'holding', 'bearing', 'carrying', 'supporting', 'sustaining', 'maintaining', 'preserving', 'protecting', 'defending', 'guarding', 'safeguarding', 'securing', 'ensuring', 'guaranteeing', 'promising', 'assuring', 'confirming', 'verifying', 'validating', 'authenticating', 'certifying', 'approving', 'endorsing', 'supporting', 'backing', 'sponsoring', 'funding', 'financing', 'investing', 'contributing', 'donating', 'giving', 'offering', 'providing', 'supplying', 'delivering', 'distributing', 'sharing', 'exchanging', 'trading', 'selling', 'buying', 'purchasing', 'acquiring', 'obtaining', 'getting', 'receiving', 'accepting', 'taking', 'grabbing', 'seizing', 'capturing', 'catching', 'trapping', 'snaring', 'ensnaring', 'entrapping', 'imprisoning', 'confining', 'restricting', 'limiting', 'constraining', 'binding', 'tying', 'fastening', 'securing', 'locking', 'closing', 'shutting', 'opening', 'unlocking', 'releasing', 'freeing', 'liberating', 'emancipating', 'saving', 'rescuing', 'helping', 'assisting', 'aiding', 'supporting', 'backing', 'standing', 'sitting', 'lying', 'resting', 'sleeping', 'waking', 'rising', 'falling', 'dropping', 'sinking', 'floating', 'flying', 'soaring', 'gliding', 'hovering', 'moving', 'shifting', 'changing', 'transforming', 'converting', 'turning', 'rotating', 'spinning', 'twisting', 'bending', 'flexing', 'stretching', 'extending', 'reaching', 'grasping', 'holding', 'gripping', 'clutching', 'embracing', 'hugging', 'kissing', 'touching', 'feeling', 'sensing', 'perceiving', 'observing', 'watching', 'seeing', 'looking', 'viewing', 'gazing', 'staring', 'glaring', 'glancing', 'peeking', 'peering', 'spying', 'snooping', 'eavesdropping', 'listening', 'hearing', 'overhearing', 'understanding', 'comprehending', 'grasping', 'realizing', 'recognizing', 'identifying', 'distinguishing', 'differentiating', 'separating', 'dividing', 'splitting', 'breaking', 'cracking', 'shattering', 'smashing', 'crushing', 'grinding', 'pulverizing', 'powdering', 'dusting', 'wiping', 'cleaning', 'washing', 'scrubbing', 'polishing', 'buffing', 'shining', 'gleaming', 'glowing', 'radiating', 'illuminating', 'lighting', 'brightening', 'darkening', 'dimming', 'fading', 'disappearing', 'vanishing', 'evaporating', 'dissolving', 'melting', 'thawing', 'freezing', 'chilling', 'cooling', 'heating', 'warming', 'burning', 'igniting', 'flaming', 'blazing', 'smoldering', 'smoking', 'steaming', 'boiling', 'simmering', 'cooking', 'baking', 'roasting', 'grilling', 'frying', 'sautéing', 'stirring', 'mixing', 'blending', 'combining', 'merging', 'uniting', 'joining', 'connecting', 'linking', 'bonding', 'attaching', 'affixing', 'adhering', 'sticking', 'clinging', 'grasping', 'holding', 'retaining', 'keeping', 'storing', 'preserving', 'maintaining', 'sustaining', 'supporting', 'bearing', 'carrying', 'transporting', 'conveying', 'transferring', 'moving', 'shifting', 'relocating', 'migrating', 'traveling', 'journeying', 'wandering', 'roaming', 'exploring', 'discovering', 'finding', 'locating', 'searching', 'seeking', 'hunting', 'pursuing', 'chasing', 'following', 'tracking', 'trailing', 'tracing', 'mapping', 'charting', 'plotting', 'planning', 'designing', 'creating', 'making', 'building', 'constructing', 'assembling', 'fabricating', 'manufacturing', 'producing', 'generating', 'yielding', 'bearing', 'bringing', 'causing', 'creating', 'making', 'doing', 'performing', 'executing', 'implementing', 'applying', 'using', 'utilizing', 'employing', 'engaging', 'involving', 'participating', 'joining', 'entering', 'starting', 'beginning', 'commencing', 'initiating', 'launching', 'opening', 'unveiling', 'revealing', 'disclosing', 'exposing', 'uncovering', 'unmasking', 'unraveling', 'untangling', 'clarifying', 'explaining', 'describing', 'narrating', 'recounting', 'telling', 'speaking', 'talking', 'conversing', 'discussing', 'debating', 'arguing', 'quarreling', 'fighting', 'battling', 'warring', 'conflicting', 'clashing', 'colliding', 'crashing', 'bumping', 'hitting', 'striking', 'punching', 'kicking', 'pushing', 'pulling', 'dragging', 'hauling', 'tugging', 'jerking', 'yanking', 'wrenching', 'twisting', 'turning', 'rotating', 'spinning', 'whirling', 'swirling', 'circling', 'orbiting', 'revolving', 'rotating', 'pivoting', 'tilting', 'leaning', 'inclining', 'slanting', 'angling', 'bending', 'curving', 'arching', 'bowing', 'stooping', 'crouching', 'squatting', 'kneeling', 'crawling', 'creeping', 'sneaking', 'tiptoeing', 'walking', 'running', 'jogging', 'sprinting', 'dashing', 'rushing', 'hurrying', 'scurrying', 'scampering', 'skipping', 'hopping', 'jumping', 'leaping', 'bounding', 'vaulting', 'diving', 'plunging', 'dunking', 'submerging', 'immersing', 'submerging', 'drowning', 'sinking', 'floating', 'swimming', 'wading', 'splashing', 'spraying', 'sprinkling', 'dripping', 'trickling', 'flowing', 'streaming', 'pouring', 'gushing', 'spurting', 'squirting', 'spraying', 'misting', 'foaming', 'bubbling', 'effervescing', 'fizzing', 'hissing', 'whistling', 'humming', 'buzzing', 'whirring', 'clicking', 'clacking', 'clattering', 'rattling', 'banging', 'pounding', 'thumping', 'knocking', 'rapping', 'tapping', 'patting', 'stroking', 'caressing', 'fondling', 'petting', 'massaging', 'rubbing', 'scrubbing', 'scouring', 'scraping', 'scratching', 'clawing', 'gouging', 'digging', 'excavating', 'tunneling', 'boring', 'piercing', 'puncturing', 'perforating', 'drilling', 'sawing', 'cutting', 'slicing', 'dicing', 'chopping', 'mincing', 'grinding', 'crushing', 'pounding', 'hammering', 'striking', 'hitting', 'beating', 'thrashing', 'whipping', 'lashing', 'flogging', 'spanking', 'slapping', 'smacking', 'punching', 'jabbing', 'poking', 'prodding', 'nudging', 'bumping', 'jostling', 'shoving', 'pushing', 'pulling', 'dragging', 'hauling', 'tugging', 'jerking', 'yanking', 'wrenching', 'twisting', 'turning', 'rotating', 'spinning', 'whirling', 'swirling', 'circling', 'orbiting', 'revolving'],
        weights: 0.5
    }
};

// Preset Examples
const presetExamples = {
    product: "This product is absolutely amazing! The quality is excellent and it arrived quickly. Highly recommended!",
    tweet: "Just had the worst experience ever with customer service. Completely disappointed and frustrated. #unhappy",
    feedback: "The service was okay, nothing special but acceptable. Could be better in some areas.",
    movie: "What a fantastic movie! The plot was engaging and the actors were brilliant. Definitely worth watching!"
};

// AI Explanation Templates
const explanationTemplates = {
    positive: [
        "This text expresses strong positive sentiment with enthusiastic language and favorable emotions.",
        "The content demonstrates satisfaction and approval, using words that convey happiness and contentment.",
        "Strong positive indicators suggest the author is pleased and impressed with the subject matter.",
        "The language reflects genuine appreciation and delight with multiple positive emotional markers.",
        "Clear positive sentiment expressed through words indicating satisfaction, joy, and approval."
    ],
    negative: [
        "This text conveys strong negative sentiment with critical and disapproving language.",
        "The content demonstrates dissatisfaction and frustration, using words that express disappointment.",
        "Strong negative indicators suggest the author is unhappy and displeased with the subject matter.",
        "The language reflects genuine criticism and disappointment with multiple negative emotional markers.",
        "Clear negative sentiment expressed through words indicating anger, frustration, and disapproval."
    ],
    neutral: [
        "This text maintains a neutral tone with factual and objective language.",
        "The content is balanced and neither strongly positive nor negative in sentiment.",
        "The language is measured and professional, presenting information without strong emotional bias.",
        "Neutral sentiment with descriptive language that neither praises nor criticizes.",
        "The text expresses a balanced perspective without clear emotional leaning."
    ]
};

// ============================================
// Core Sentiment Analysis Functions
// ============================================

function analyzeSentiment(text) {
    const lowerText = text.toLowerCase();
    let sentimentScores = {
        positive: 0,
        negative: 0,
        neutral: 0
    };

    // Count keyword matches
    for (const [sentiment, data] of Object.entries(sentimentDatabase)) {
        data.keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            const matches = (lowerText.match(regex) || []).length;
            sentimentScores[sentiment] += matches * data.weights;
        });
    }

    // Normalize scores
    const total = sentimentScores.positive + sentimentScores.negative + sentimentScores.neutral;
    if (total === 0) {
        sentimentScores.neutral = 1;
    } else {
        sentimentScores.positive /= total;
        sentimentScores.negative /= total;
        sentimentScores.neutral /= total;
    }

    // Determine primary sentiment
    let primarySentiment = 'neutral';
    let maxScore = sentimentScores.neutral;

    if (sentimentScores.positive > maxScore) {
        primarySentiment = 'positive';
        maxScore = sentimentScores.positive;
    }
    if (sentimentScores.negative > maxScore) {
        primarySentiment = 'negative';
        maxScore = sentimentScores.negative;
    }

    // Calculate confidence
    const confidence = Math.round(maxScore * 100);

    // Generate explanation
    const explanation = generateExplanation(primarySentiment, text);

    return {
        sentiment: primarySentiment,
        confidence: confidence,
        scores: sentimentScores,
        explanation: explanation,
        timestamp: new Date().toLocaleString()
    };
}

function generateExplanation(sentiment, text) {
    const templates = explanationTemplates[sentiment];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Extract key indicators
    const keywords = sentimentDatabase[sentiment].keywords;
    const foundKeywords = keywords.filter(keyword => 
        text.toLowerCase().includes(keyword)
    ).slice(0, 3);

    let explanation = template;
    if (foundKeywords.length > 0) {
        explanation += ` Key indicators: ${foundKeywords.join(', ')}.`;
    }

    return explanation;
}

function getSentimentBadge(sentiment) {
    const badges = {
        positive: '✅ Positive',
        negative: '❌ Negative',
        neutral: '⚪ Neutral'
    };
    return badges[sentiment] || '⚪ Neutral';
}

function getSentimentEmoji(sentiment) {
    const emojis = {
        positive: '😊',
        negative: '😞',
        neutral: '😐'
    };
    return emojis[sentiment] || '😐';
}

// ============================================
// Local Storage Management
// ============================================

function saveToHistory(result, text) {
    let history = JSON.parse(localStorage.getItem('sentimentHistory') || '[]');
    history.unshift({
        id: Date.now(),
        text: text,
        ...result
    });
    localStorage.setItem('sentimentHistory', JSON.stringify(history));
    updateHistoryDisplay();
    updateStatistics();
    updateCharts();
}

function getHistory() {
    return JSON.parse(localStorage.getItem('sentimentHistory') || '[]');
}

function deleteHistoryItem(id) {
    let history = getHistory();
    history = history.filter(item => item.id !== id);
    localStorage.setItem('sentimentHistory', JSON.stringify(history));
    updateHistoryDisplay();
    updateStatistics();
    updateCharts();
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
        localStorage.removeItem('sentimentHistory');
        updateHistoryDisplay();
        updateStatistics();
        updateCharts();
    }
}

// ============================================
// Display Functions
// ============================================

function displayResult(result, text) {
    const resultsSection = document.getElementById('resultsSection');
    const sentimentBadge = document.getElementById('sentimentBadge');
    const sentimentResult = document.getElementById('sentimentResult');
    const confidenceResult = document.getElementById('confidenceResult');
    const confidenceFill = document.getElementById('confidenceFill');
    const explanationResult = document.getElementById('explanationResult');

    sentimentBadge.textContent = getSentimentEmoji(result.sentiment) + ' ' + getSentimentBadge(result.sentiment);
    sentimentBadge.className = `sentiment-badge ${result.sentiment}`;
    sentimentResult.textContent = result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1);
    confidenceResult.textContent = result.confidence + '%';
    confidenceFill.style.width = result.confidence + '%';
    explanationResult.textContent = result.explanation;

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    const history = getHistory();
    const currentFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';

    let filteredHistory = history;

    if (currentFilter !== 'all') {
        filteredHistory = filteredHistory.filter(item => item.sentiment === currentFilter);
    }

    if (searchTerm) {
        filteredHistory = filteredHistory.filter(item => 
            item.text.toLowerCase().includes(searchTerm)
        );
    }

    if (filteredHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No analysis history found.</p>';
        return;
    }

    historyList.innerHTML = filteredHistory.map(item => `
        <div class="history-item ${item.sentiment}">
            <div class="history-item-content">
                <div class="history-item-text">${escapeHtml(item.text)}</div>
                <div class="history-item-meta">
                    <span>${getSentimentBadge(item.sentiment)}</span>
                    <span>Confidence: ${item.confidence}%</span>
                    <span>${item.timestamp}</span>
                </div>
            </div>
            <div class="history-item-actions">
                <button onclick="copyToClipboard('${escapeHtml(item.text)}')">Copy</button>
                <button onclick="deleteHistoryItem(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateStatistics() {
    const history = getHistory();
    const total = history.length;
    const positive = history.filter(item => item.sentiment === 'positive').length;
    const negative = history.filter(item => item.sentiment === 'negative').length;
    const neutral = history.filter(item => item.sentiment === 'neutral').length;
    const avgConfidence = total > 0 ? Math.round(history.reduce((sum, item) => sum + item.confidence, 0) / total) : 0;

    document.getElementById('totalAnalyses').textContent = total;
    document.getElementById('positiveCount').textContent = positive;
    document.getElementById('negativeCount').textContent = negative;
    document.getElementById('neutralCount').textContent = neutral;
    document.getElementById('avgConfidence').textContent = avgConfidence + '%';

    // Update dashboard statistics
    const positivePercent = total > 0 ? Math.round((positive / total) * 100) : 0;
    const negativePercent = total > 0 ? Math.round((negative / total) * 100) : 0;
    const neutralPercent = total > 0 ? Math.round((neutral / total) * 100) : 0;

    const positiveAvg = history.filter(item => item.sentiment === 'positive').length > 0 
        ? Math.round(history.filter(item => item.sentiment === 'positive').reduce((sum, item) => sum + item.confidence, 0) / positive)
        : 0;
    const negativeAvg = history.filter(item => item.sentiment === 'negative').length > 0
        ? Math.round(history.filter(item => item.sentiment === 'negative').reduce((sum, item) => sum + item.confidence, 0) / negative)
        : 0;
    const neutralAvg = history.filter(item => item.sentiment === 'neutral').length > 0
        ? Math.round(history.filter(item => item.sentiment === 'neutral').reduce((sum, item) => sum + item.confidence, 0) / neutral)
        : 0;

    document.getElementById('dashPositiveCount').textContent = positive;
    document.getElementById('dashPositivePercent').textContent = positivePercent + '%';
    document.getElementById('dashPositiveAvg').textContent = positiveAvg + '%';
    document.getElementById('dashNegativeCount').textContent = negative;
    document.getElementById('dashNegativePercent').textContent = negativePercent + '%';
    document.getElementById('dashNegativeAvg').textContent = negativeAvg + '%';
    document.getElementById('dashNeutralCount').textContent = neutral;
    document.getElementById('dashNeutralPercent').textContent = neutralPercent + '%';
    document.getElementById('dashNeutralAvg').textContent = neutralAvg + '%';
}

// ============================================
// Chart Functions
// ============================================

let pieChart, doughnutChart, barChart;

function updateCharts() {
    const history = getHistory();
    const positive = history.filter(item => item.sentiment === 'positive').length;
    const negative = history.filter(item => item.sentiment === 'negative').length;
    const neutral = history.filter(item => item.sentiment === 'neutral').length;

    const positiveAvg = history.filter(item => item.sentiment === 'positive').length > 0 
        ? Math.round(history.filter(item => item.sentiment === 'positive').reduce((sum, item) => sum + item.confidence, 0) / positive)
        : 0;
    const negativeAvg = history.filter(item => item.sentiment === 'negative').length > 0
        ? Math.round(history.filter(item => item.sentiment === 'negative').reduce((sum, item) => sum + item.confidence, 0) / negative)
        : 0;
    const neutralAvg = history.filter(item => item.sentiment === 'neutral').length > 0
        ? Math.round(history.filter(item => item.sentiment === 'neutral').reduce((sum, item) => sum + item.confidence, 0) / neutral)
        : 0;

    // Pie Chart
    const pieCtx = document.getElementById('pieChart')?.getContext('2d');
    if (pieCtx) {
        if (pieChart) pieChart.destroy();
        pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                    data: [positive, negative, neutral],
                    backgroundColor: ['#10b981', '#ef4444', '#6b7280'],
                    borderColor: ['#059669', '#dc2626', '#4b5563'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }

    // Doughnut Chart
    const doughnutCtx = document.getElementById('doughnutChart')?.getContext('2d');
    if (doughnutCtx) {
        if (doughnutChart) doughnutChart.destroy();
        doughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                    data: [positive, negative, neutral],
                    backgroundColor: ['#10b981', '#ef4444', '#6b7280'],
                    borderColor: ['#059669', '#dc2626', '#4b5563'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }

    // Bar Chart
    const barCtx = document.getElementById('barChart')?.getContext('2d');
    if (barCtx) {
        if (barChart) barChart.destroy();
        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                    label: 'Average Confidence Score (%)',
                    data: [positiveAvg, negativeAvg, neutralAvg],
                    backgroundColor: ['#10b981', '#ef4444', '#6b7280'],
                    borderColor: ['#059669', '#dc2626', '#4b5563'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'x',
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            padding: 15,
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }
}

// ============================================
// Export Functions
// ============================================

function exportToCSV() {
    const history = getHistory();
    if (history.length === 0) {
        alert('No history to export!');
        return;
    }

    let csv = 'Text,Sentiment,Confidence,Timestamp\n';
    history.forEach(item => {
        csv += `"${item.text.replace(/"/g, '""')}",${item.sentiment},${item.confidence},${item.timestamp}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentiment-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function exportToPDF() {
    const history = getHistory();
    if (history.length === 0) {
        alert('No history to export!');
        return;
    }

    const element = document.createElement('div');
    element.innerHTML = `
        <h1>AI Sentiment Analysis Report</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <h2>Summary Statistics</h2>
        <p>Total Analyses: ${history.length}</p>
        <p>Positive: ${history.filter(item => item.sentiment === 'positive').length}</p>
        <p>Negative: ${history.filter(item => item.sentiment === 'negative').length}</p>
        <p>Neutral: ${history.filter(item => item.sentiment === 'neutral').length}</p>
        <h2>Detailed Results</h2>
        <table border="1" cellpadding="10">
            <tr><th>Text</th><th>Sentiment</th><th>Confidence</th><th>Timestamp</th></tr>
            ${history.map(item => `
                <tr>
                    <td>${item.text}</td>
                    <td>${item.sentiment}</td>
                    <td>${item.confidence}%</td>
                    <td>${item.timestamp}</td>
                </tr>
            `).join('')}
        </table>
    `;

    const opt = {
        margin: 10,
        filename: `sentiment-analysis-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(element).save();
}

// ============================================
// Utility Functions
// ============================================

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// ============================================
// Dark Mode
// ============================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.textContent = '☀️';
    } else {
        icon.textContent = '🌙';
    }
}

function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

    // Tab navigation
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            this.classList.add('active');
            if (tabName === 'dashboard') {
                setTimeout(updateCharts, 100);
            }
        });
    });

    // Analyze button
    document.getElementById('analyzeBtn').addEventListener('click', function() {
        const text = document.getElementById('textInput').value.trim();
        if (!text) {
            alert('Please enter some text to analyze!');
            return;
        }
        const result = analyzeSentiment(text);
        displayResult(result, text);
    });

    // Clear button
    document.getElementById('clearBtn').addEventListener('click', function() {
        document.getElementById('textInput').value = '';
        document.getElementById('resultsSection').style.display = 'none';
    });

    // Batch analysis button
    document.getElementById('batchBtn').addEventListener('click', function() {
        const text = document.getElementById('textInput').value.trim();
        if (!text) {
            alert('Please enter some text to analyze!');
            return;
        }
        const texts = text.split('\n').filter(t => t.trim());
        if (texts.length === 0) {
            alert('No valid texts found!');
            return;
        }
        texts.forEach(t => {
            const result = analyzeSentiment(t);
            saveToHistory(result, t);
        });
        alert(`Batch analysis complete! Analyzed ${texts.length} texts.`);
        document.getElementById('textInput').value = '';
        document.getElementById('resultsSection').style.display = 'none';
    });

    // Add to history button
    document.getElementById('addToHistoryBtn').addEventListener('click', function() {
        const text = document.getElementById('textInput').value.trim();
        const result = analyzeSentiment(text);
        saveToHistory(result, text);
        alert('Added to history!');
        document.getElementById('textInput').value = '';
        document.getElementById('resultsSection').style.display = 'none';
    });

    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(button => {
        button.addEventListener('click', function() {
            const preset = this.dataset.preset;
            document.getElementById('textInput').value = presetExamples[preset];
        });
    });

    // Search and filter
    document.getElementById('searchInput').addEventListener('input', updateHistoryDisplay);
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateHistoryDisplay();
        });
    });

    // Export buttons
    document.getElementById('exportCsvBtn').addEventListener('click', exportToCSV);
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);

    // Initialize display
    updateStatistics();
    updateCharts();
});

// Allow Enter key to analyze
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        document.getElementById('analyzeBtn').click();
    }
});
