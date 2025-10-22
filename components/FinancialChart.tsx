import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface FinancialChartProps {
    data: any[];
    dataKey: string;
    name: string;
    unit?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border rounded-md p-2 shadow-lg">
          <p className="font-bold">{label}</p>
          <p style={{ color: data.color }}>{`${data.name}: ${data.value}${data.payload.unit || ''}`}</p>
        </div>
      );
    }
    return null;
};

const FinancialChart = ({ data, dataKey, name, unit = '' }: FinancialChartProps) => {
    const chartData = data.map(d => ({ ...d, unit }));

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12}
                        tickFormatter={(value) => typeof value === 'number' ? `${value}${unit}`: value}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--accent))' }} />
                    <Bar dataKey={dataKey} name={name} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FinancialChart;
