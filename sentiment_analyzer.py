#!/usr/bin/env python3
"""
AI Sentiment Analysis Tool - Python Backend
Advanced sentiment analysis with NLP capabilities
"""

import json
import re
from collections import Counter
from typing import Dict, List, Tuple
import statistics

class SentimentAnalyzer:
    """Advanced sentiment analyzer using NLP techniques"""
    
    def __init__(self):
        """Initialize the sentiment analyzer with keyword databases"""
        
        # Comprehensive sentiment keywords
        self.positive_keywords = {
            'love', 'excellent', 'amazing', 'wonderful', 'fantastic', 'great', 'awesome',
            'perfect', 'best', 'beautiful', 'good', 'happy', 'glad', 'pleased', 'satisfied',
            'impressed', 'brilliant', 'outstanding', 'superb', 'delighted', 'thrilled',
            'incredible', 'remarkable', 'splendid', 'magnificent', 'marvelous', 'exceptional',
            'superior', 'fine', 'nice', 'pleasant', 'enjoyable', 'delightful', 'charming',
            'attractive', 'lovely', 'gorgeous', 'stunning', 'clever', 'smart', 'intelligent',
            'wise', 'helpful', 'useful', 'beneficial', 'valuable', 'precious', 'worthwhile',
            'rewarding', 'fulfilling', 'satisfying', 'gratifying', 'comforting', 'soothing',
            'peaceful', 'calm', 'serene', 'tranquil', 'relaxing', 'refreshing', 'invigorating',
            'energizing', 'exciting', 'thrilling', 'exhilarating', 'wonderful', 'fantastic'
        }
        
        self.negative_keywords = {
            'hate', 'terrible', 'awful', 'horrible', 'bad', 'worst', 'poor', 'disappointing',
            'useless', 'waste', 'disgusting', 'ugly', 'annoying', 'frustrating', 'angry',
            'sad', 'depressed', 'miserable', 'unhappy', 'upset', 'furious', 'enraged',
            'livid', 'outraged', 'disgusted', 'repulsed', 'revolted', 'appalled', 'horrified',
            'terrified', 'scared', 'frightened', 'anxious', 'worried', 'concerned', 'troubled',
            'distressed', 'anguished', 'tormented', 'suffering', 'painful', 'hurtful',
            'offensive', 'insulting', 'rude', 'disrespectful', 'crude', 'vulgar', 'obscene',
            'profane', 'vile', 'despicable', 'contemptible', 'abominable', 'detestable',
            'loathsome', 'odious', 'obnoxious', 'unpleasant', 'disagreeable', 'unwelcome',
            'unwanted', 'undesirable', 'broken', 'faulty', 'defective', 'damaged', 'ruined',
            'destroyed', 'wrecked', 'shattered', 'failed', 'unsuccessful', 'ineffective',
            'worthless', 'pointless', 'futile', 'vain', 'empty', 'hollow', 'meaningless',
            'senseless', 'ridiculous', 'absurd', 'stupid', 'dumb', 'idiotic', 'moronic',
            'pathetic', 'pitiful', 'lamentable', 'deplorable', 'regrettable', 'unfortunate',
            'unlucky', 'disastrous', 'catastrophic', 'calamitous', 'dire', 'grim', 'bleak',
            'dark', 'gloomy', 'depressing', 'oppressive', 'suffocating', 'stifling'
        }
        
        self.neutral_keywords = {
            'ok', 'okay', 'fine', 'average', 'normal', 'regular', 'standard', 'typical',
            'common', 'ordinary', 'usual', 'expected', 'moderate', 'medium', 'fair', 'decent',
            'acceptable', 'tolerable', 'passable', 'adequate', 'sufficient', 'enough',
            'reasonable', 'rational', 'logical', 'sensible', 'practical', 'pragmatic',
            'realistic', 'objective', 'impartial', 'unbiased', 'neutral', 'balanced',
            'just', 'equitable', 'honest', 'truthful', 'sincere', 'genuine', 'authentic',
            'real', 'true', 'actual', 'factual', 'concrete', 'tangible', 'physical',
            'material', 'substantial', 'solid', 'firm', 'stable', 'steady', 'constant',
            'consistent', 'reliable', 'dependable', 'trustworthy', 'faithful', 'loyal'
        }
        
        # Intensifiers and modifiers
        self.intensifiers = {
            'very': 1.5, 'extremely': 2.0, 'absolutely': 2.0, 'incredibly': 2.0,
            'so': 1.3, 'really': 1.5, 'quite': 1.2, 'rather': 1.2, 'fairly': 1.1,
            'somewhat': 0.8, 'slightly': 0.7, 'barely': 0.5, 'hardly': 0.5
        }
        
        # Negation words
        self.negations = {'not', 'no', 'never', 'neither', 'nobody', 'nothing', 'nowhere'}
    
    def preprocess_text(self, text: str) -> str:
        """Preprocess text for analysis"""
        # Convert to lowercase
        text = text.lower()
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def tokenize(self, text: str) -> List[str]:
        """Tokenize text into words"""
        # Remove punctuation and split
        words = re.findall(r'\b\w+\b', text.lower())
        return words
    
    def extract_features(self, text: str) -> Dict:
        """Extract linguistic features from text"""
        words = self.tokenize(text)
        
        features = {
            'word_count': len(words),
            'unique_words': len(set(words)),
            'avg_word_length': sum(len(w) for w in words) / len(words) if words else 0,
            'exclamation_marks': text.count('!'),
            'question_marks': text.count('?'),
            'capital_letters': sum(1 for c in text if c.isupper()),
            'all_caps_words': len([w for w in words if w.isupper() and len(w) > 1])
        }
        
        return features
    
    def find_keywords(self, text: str) -> Tuple[List[str], List[str], List[str]]:
        """Find sentiment keywords in text"""
        words = self.tokenize(text)
        
        positive = [w for w in words if w in self.positive_keywords]
        negative = [w for w in words if w in self.negative_keywords]
        neutral = [w for w in words if w in self.neutral_keywords]
        
        return positive, negative, neutral
    
    def calculate_sentiment_score(self, text: str) -> Dict:
        """Calculate detailed sentiment score"""
        words = self.tokenize(text)
        positive, negative, neutral = self.find_keywords(text)
        
        # Base scores
        pos_score = len(positive)
        neg_score = len(negative)
        neu_score = len(neutral)
        
        # Apply intensifiers
        for i, word in enumerate(words):
            if word in self.intensifiers:
                # Check next word
                if i + 1 < len(words):
                    next_word = words[i + 1]
                    multiplier = self.intensifiers[word]
                    if next_word in self.positive_keywords:
                        pos_score += multiplier - 1
                    elif next_word in self.negative_keywords:
                        neg_score += multiplier - 1
        
        # Handle negations
        for i, word in enumerate(words):
            if word in self.negations:
                if i + 1 < len(words):
                    next_word = words[i + 1]
                    if next_word in self.positive_keywords:
                        pos_score -= 1
                        neg_score += 0.5
                    elif next_word in self.negative_keywords:
                        neg_score -= 1
                        pos_score += 0.5
        
        # Normalize scores
        total = pos_score + neg_score + neu_score
        if total == 0:
            return {
                'positive': 0.0,
                'negative': 0.0,
                'neutral': 1.0,
                'primary': 'neutral',
                'confidence': 0
            }
        
        pos_norm = pos_score / total
        neg_norm = neg_score / total
        neu_norm = neu_score / total
        
        # Determine primary sentiment
        if pos_norm > neg_norm and pos_norm > neu_norm:
            primary = 'positive'
            confidence = int(pos_norm * 100)
        elif neg_norm > pos_norm and neg_norm > neu_norm:
            primary = 'negative'
            confidence = int(neg_norm * 100)
        else:
            primary = 'neutral'
            confidence = int(neu_norm * 100)
        
        return {
            'positive': round(pos_norm, 3),
            'negative': round(neg_norm, 3),
            'neutral': round(neu_norm, 3),
            'primary': primary,
            'confidence': confidence
        }
    
    def generate_detailed_explanation(self, text: str, sentiment_score: Dict) -> str:
        """Generate detailed AI-style explanation"""
        words = self.tokenize(text)
        positive, negative, neutral = self.find_keywords(text)
        features = self.extract_features(text)
        
        explanation = f"Analysis of '{text[:50]}{'...' if len(text) > 50 else ''}': "
        
        if sentiment_score['primary'] == 'positive':
            explanation += f"This text expresses positive sentiment (confidence: {sentiment_score['confidence']}%). "
            if positive:
                explanation += f"Positive indicators include: {', '.join(positive[:3])}. "
            if features['exclamation_marks'] > 0:
                explanation += "The use of exclamation marks suggests enthusiasm. "
        
        elif sentiment_score['primary'] == 'negative':
            explanation += f"This text expresses negative sentiment (confidence: {sentiment_score['confidence']}%). "
            if negative:
                explanation += f"Negative indicators include: {', '.join(negative[:3])}. "
            if features['exclamation_marks'] > 0:
                explanation += "The use of exclamation marks suggests strong emotion. "
        
        else:
            explanation += f"This text expresses neutral sentiment (confidence: {sentiment_score['confidence']}%). "
            explanation += "The language is factual and balanced without strong emotional indicators. "
        
        # Add feature-based insights
        if features['word_count'] > 50:
            explanation += "The text is detailed and comprehensive. "
        elif features['word_count'] < 10:
            explanation += "The text is brief and concise. "
        
        if features['capital_letters'] > len(text) * 0.2:
            explanation += "Multiple capital letters suggest emphasis or strong emotion. "
        
        return explanation
    
    def analyze(self, text: str) -> Dict:
        """Complete sentiment analysis"""
        if not text or not text.strip():
            return {
                'error': 'Empty text provided',
                'sentiment': 'neutral',
                'confidence': 0,
                'scores': {'positive': 0, 'negative': 0, 'neutral': 1},
                'explanation': 'No text to analyze.'
            }
        
        preprocessed = self.preprocess_text(text)
        sentiment_score = self.calculate_sentiment_score(preprocessed)
        explanation = self.generate_detailed_explanation(text, sentiment_score)
        features = self.extract_features(preprocessed)
        
        return {
            'text': text,
            'sentiment': sentiment_score['primary'],
            'confidence': sentiment_score['confidence'],
            'scores': {
                'positive': sentiment_score['positive'],
                'negative': sentiment_score['negative'],
                'neutral': sentiment_score['neutral']
            },
            'explanation': explanation,
            'features': features
        }
    
    def batch_analyze(self, texts: List[str]) -> List[Dict]:
        """Analyze multiple texts"""
        results = []
        for text in texts:
            results.append(self.analyze(text))
        return results
    
    def get_statistics(self, results: List[Dict]) -> Dict:
        """Calculate statistics from batch analysis"""
        if not results:
            return {
                'total': 0,
                'positive': 0,
                'negative': 0,
                'neutral': 0,
                'avg_confidence': 0,
                'positive_avg_confidence': 0,
                'negative_avg_confidence': 0,
                'neutral_avg_confidence': 0
            }
        
        total = len(results)
        positive = len([r for r in results if r['sentiment'] == 'positive'])
        negative = len([r for r in results if r['sentiment'] == 'negative'])
        neutral = len([r for r in results if r['sentiment'] == 'neutral'])
        
        confidences = [r['confidence'] for r in results]
        avg_confidence = int(statistics.mean(confidences)) if confidences else 0
        
        positive_confidences = [r['confidence'] for r in results if r['sentiment'] == 'positive']
        positive_avg = int(statistics.mean(positive_confidences)) if positive_confidences else 0
        
        negative_confidences = [r['confidence'] for r in results if r['sentiment'] == 'negative']
        negative_avg = int(statistics.mean(negative_confidences)) if negative_confidences else 0
        
        neutral_confidences = [r['confidence'] for r in results if r['sentiment'] == 'neutral']
        neutral_avg = int(statistics.mean(neutral_confidences)) if neutral_confidences else 0
        
        return {
            'total': total,
            'positive': positive,
            'negative': negative,
            'neutral': neutral,
            'avg_confidence': avg_confidence,
            'positive_avg_confidence': positive_avg,
            'negative_avg_confidence': negative_avg,
            'neutral_avg_confidence': neutral_avg,
            'positive_percentage': round((positive / total * 100), 2) if total > 0 else 0,
            'negative_percentage': round((negative / total * 100), 2) if total > 0 else 0,
            'neutral_percentage': round((neutral / total * 100), 2) if total > 0 else 0
        }


def main():
    """Main function for testing"""
    analyzer = SentimentAnalyzer()
    
    # Test examples
    test_texts = [
        "This product is absolutely amazing! I love it!",
        "Terrible experience, worst purchase ever.",
        "It's okay, nothing special.",
        "Fantastic service and excellent quality!",
        "I hate this, completely disappointed."
    ]
    
    print("=" * 60)
    print("AI SENTIMENT ANALYSIS TOOL - PYTHON BACKEND")
    print("=" * 60)
    
    results = analyzer.batch_analyze(test_texts)
    
    for i, result in enumerate(results, 1):
        print(f"\n[Analysis {i}]")
        print(f"Text: {result['text']}")
        print(f"Sentiment: {result['sentiment'].upper()}")
        print(f"Confidence: {result['confidence']}%")
        print(f"Scores: Positive={result['scores']['positive']:.2f}, "
              f"Negative={result['scores']['negative']:.2f}, "
              f"Neutral={result['scores']['neutral']:.2f}")
        print(f"Explanation: {result['explanation']}")
    
    # Statistics
    stats = analyzer.get_statistics(results)
    print("\n" + "=" * 60)
    print("BATCH STATISTICS")
    print("=" * 60)
    print(f"Total Analyses: {stats['total']}")
    print(f"Positive: {stats['positive']} ({stats['positive_percentage']}%)")
    print(f"Negative: {stats['negative']} ({stats['negative_percentage']}%)")
    print(f"Neutral: {stats['neutral']} ({stats['neutral_percentage']}%)")
    print(f"Average Confidence: {stats['avg_confidence']}%")


if __name__ == '__main__':
    main()
