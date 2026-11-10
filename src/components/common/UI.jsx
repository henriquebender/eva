import { useI18n, translate, getLocale } from "../../i18n/index.js";
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sun, Wind, Droplets, Sprout, Info } from 'lucide-react';
const icons = {
  Sun,
  Wind,
  Droplets,
  Sprout
};
export function Icon({
  name,
  ...props
}) {
  useI18n();
  const C = icons[name] || Sprout;
  return <C {...props} />;
}
export function PageIntro({
  eyebrow,
  title,
  description
}) {
  useI18n();
  return <header className="page-intro hero-mesh"><div className="container"><span className="chip">{translate(eyebrow)}</span><h1>{translate(title)}</h1><p>{translate(description)}</p></div></header>;
}
export function SectionTitle({
  eyebrow,
  title,
  description
}) {
  useI18n();
  return <div className="section-title"><span className="eyebrow">{translate(eyebrow)}</span><h2>{translate(title)}</h2>{description && <p>{translate(description)}</p>}</div>;
}
export function Notice({
  children
}) {
  useI18n();
  return <div className="notice"><Info size={20} aria-hidden="true" /><div>{translate(children)}</div></div>;
}
export function EnergyCard({
  energy: e
}) {
  useI18n();
  return <Link className={'energy-card card-eva ' + e.color} to={'/energias?fonte=' + e.id}><span className="icon-tile"><Icon name={e.icon} size={27} /></span><h3>{translate(e.name)}</h3><p>{translate(e.tagline)}</p><span className="text-link">{translate("Conhe\xE7a essa energia ")}<ArrowUpRight size={17} /></span></Link>;
}
export const number = (v, d = 1) => new Intl.NumberFormat(getLocale(), {
  maximumFractionDigits: d
}).format(v);
export const money = v => new Intl.NumberFormat(getLocale(), {
  style: 'currency',
  currency: 'BRL'
}).format(v);
