import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Stock } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BrainCircuit } from 'lucide-react';

interface AIInsightsBoxProps {
    stock: Stock;
}

const AIInsightsBox = ({ stock }: AIInsightsBoxProps) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateSummary = async () => {
        setLoading(true);
        setError('');
        setSummary('');

        if (!process.env.API_KEY) {
            setError('API key is not set. Please configure it in your environment.');
            setLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const prompt = `
                You are a senior financial analyst providing a summary for an investor.
                Analyze the following user-provided information for ${stock.name} (${stock.ticker}).

                **Business Model:**
                ${stock.business_model}

                **Growth Engine:**
                ${stock.growth_engine}

                **Moat / Competitive Advantage:**
                ${stock.moat}

                Please provide a concise summary of the company's investment profile based *only* on the information provided above.
                Structure your response with the following markdown sections:
                - **Thesis Summary**: 1-2 sentences summarizing the core investment thesis.
                - **Strengths**: Key strengths based on the provided text.
                - **Potential Weaknesses**: Implied weaknesses or areas needing more research based on the text.
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setSummary(response.text);

        } catch (e) {
            console.error(e);
            setError('Failed to generate summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="rounded-xl">
            <CardHeader>
                <CardTitle className="flex items-center"><BrainCircuit className="h-5 w-5 mr-2" /> AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
                {summary ? (
                     <div className="text-sm prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ) : (
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                            Generate an AI summary of your investment thesis.
                        </p>
                        <Button onClick={generateSummary} disabled={loading} size="sm">
                            {loading ? 'Generating...' : 'Generate Summary'}
                        </Button>
                    </div>
                )}
                {error && <p className="text-destructive text-sm mt-4 text-center">{error}</p>}
            {/* FIX: Corrected typo from PCardContent to CardContent */}
            </CardContent>
        </Card>
    );
};

export default AIInsightsBox;