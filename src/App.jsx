import { useI18n, translate, getLocale } from "./i18n/index.js";
import { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
const Energies = lazy(() => import('./pages/Energies'));
const Compare = lazy(() => import('./pages/Compare'));
const Simulator = lazy(() => import('./pages/Simulator'));
const Connect = lazy(() => import('./pages/Connect'));
const Sustainability = lazy(() => import('./pages/Sustainability'));
const Kids = lazy(() => import('./pages/Kids'));
const News = lazy(() => import('./pages/News'));
const References = lazy(() => import('./pages/References'));
const About = lazy(() => import('./pages/About'));
export default function App() {
  useI18n();
  return <Layout><Suspense fallback={<div className="container loading-page" role="status">{translate("Preparando uma nova energia\u2026")}</div>}><Routes><Route path="/" element={<Home />} /><Route path="/energias" element={<Energies />} /><Route path="/comparador" element={<Compare />} /><Route path="/simulador" element={<Simulator />} /><Route path="/conecta" element={<Connect />} /><Route path="/sustentabilidade" element={<Sustainability />} /><Route path="/kids" element={<Kids />} /><Route path="/atualiza" element={<News />} /><Route path="/referencias" element={<References />} /><Route path="/sobre" element={<About />} /><Route path="*" element={<section className="container final-cta"><h1>{translate("Esse caminho ainda n\xE3o existe.")}</h1><p>{translate("Continue sua jornada por uma energia mais verde.")}</p><Link to="/" className="btn-eva">{translate("Voltar ao in\xEDcio")}</Link></section>} /></Routes></Suspense></Layout>;
}
