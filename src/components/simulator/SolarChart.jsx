import { useI18n, translate, getLocale } from "../../i18n/index.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useReducedMotion } from 'framer-motion';
export default function SolarChart({
  bill,
  remaining,
  saving
}) {
  useI18n();
  const reduced = useReducedMotion();
  return <div className="chart" role="img" aria-label={translate("Comparação mensal ilustrativa; valores detalhados nos resultados")}><ResponsiveContainer width="100%" height={240}><BarChart data={[{
        name: translate('Conta atual'),
        residual: bill,
        economy: 0
      }, {
        name: translate('Com solar'),
        residual: remaining,
        economy: saving
      }]} margin={{
        left: 8,
        right: 8,
        top: 15
      }}><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis unit=" R$" width={75} tickLine={false} axisLine={false} /><Tooltip formatter={v => new Intl.NumberFormat(getLocale(), {
          style: 'currency',
          currency: 'BRL'
        }).format(v)} /><Legend /><Bar name={translate("Custo restante")} dataKey="residual" stackId="a" fill="var(--eva-chart-cost)" isAnimationActive={!reduced} /><Bar name={translate("Economia ilustrativa")} dataKey="economy" stackId="a" fill="var(--eva-chart-saving)" radius={[7, 7, 0, 0]} isAnimationActive={!reduced} /></BarChart></ResponsiveContainer></div>;
}
