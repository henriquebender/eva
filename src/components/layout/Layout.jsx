import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Instagram } from 'lucide-react';
import BrandMark from './BrandMark';
import Header from './Header';
import OdsMark from './OdsMark';
import { navigation, instagram } from '../../config/navigation';
import { useI18n, translate as t } from '../../i18n/index.js';
export default function Layout({ children }) {
  const { language } = useI18n();
  const location = useLocation(), main = useRef(null), previousPath = useRef(location.pathname);
  useEffect(() => {
    document.title = t(navigation.find(([path]) => path === location.pathname)?.[1] || 'Página não encontrada') + ' | EVA — Energia Verde';
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('EVA — Energia Verde. Conhecimento, ferramentas e atitudes para um futuro sustentável.'));
  }, [location.pathname, language]);
  useEffect(() => {
    if (previousPath.current !== location.pathname) main.current?.focus({ preventScroll: true });
    previousPath.current = location.pathname;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);
  return <>
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); main.current?.focus(); }}>{t('Pular para o conteúdo')}</a>
    <Header />
    <main id="main" tabIndex={-1} ref={main}>{children}</main>
    <footer><div className="container footer-top">
      <div><Link to="/"><BrandMark /></Link><p>{t('Conhecimento que inspira.')}<br />{t('Atitudes que transformam.')}</p><a href={instagram} target="_blank" rel="noreferrer" className="text-link"><Instagram size={18} /> @eva.energiaverde <ArrowUpRight size={15} /></a></div>
      <nav className="footer-nav" aria-label={t('Navegação do rodapé')}>{navigation.slice(1).map(([to, label]) => <Link key={to} to={to}>{t(label)}</Link>)}</nav>
      <div className="footer-note"><OdsMark /><strong>{t('Energia limpa e acessível')}</strong><p>{t('Educação e conscientização em sintonia com o ODS 7.')}</p></div>
    </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} EVA — Energia Verde</span><span>{t('Um movimento por um futuro mais sustentável.')}</span></div></footer>
  </>;
}