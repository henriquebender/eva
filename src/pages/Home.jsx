import { useI18n, translate, getLocale } from "../i18n/index.js";
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Leaf, Calculator, GitCompareArrows, MapPin, Instagram, Sparkles, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { energies } from '../data/energies';
import { news } from '../data/news';
import { instagram } from '../config/navigation';
import { EnergyCard, SectionTitle } from '../components/common/UI';
import EnergyLandscape from '../components/home/EnergyLandscape';
export default function Home() {
  useI18n();
  const reduced = useReducedMotion();
  return <>
<section className="hero hero-mesh"><div className="container hero-layout"><motion.div initial={reduced ? false : {
          opacity: 0,
          y: 16
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: .65
        }}><span className="chip"><span className="status-dot" />{translate(" UM MOVIMENTO POR UM NOVO AMANH\xC3")}</span><h1>{translate("A energia que")}<br />{translate("transforma o ")}<span className="text-grad-eva">{translate("futuro.")}</span></h1><p>{translate("Conhecer \xE9 o primeiro passo para mudar. Explore as energias renov\xE1veis e descubra como suas escolhas podem mover um mundo mais sustent\xE1vel.")}</p><div className="button-row"><Link to="/energias" className="btn-eva">{translate("Explore as energias ")}<ArrowUpRight size={18} /></Link><Link to="/simulador" className="btn-outline-eva">{translate("Conhe\xE7a as ferramentas ")}<ArrowRight size={17} /></Link></div><div className="hero-foot"><span className="leaf-circle"><Leaf size={19} /></span><span>{translate("Mais consci\xEAncia. Mais possibilidades.")}<br /><strong>{translate("Uma nova energia para o planeta.")}</strong></span></div></motion.div><EnergyLandscape /></div><div className="container hero-strip"><span><b className="sun-mark">✳</b>{translate(" CONHECER PARA TRANSFORMAR")}</span><span><Check size={17} />{translate(" Educa\xE7\xE3o ambiental acess\xEDvel")}</span><span><Check size={17} />{translate(" Ferramentas para o dia a dia")}</span><span><Check size={17} />{translate(" Um futuro constru\xEDdo juntos")}</span></div></section>
<section className="section container"><div className="section-heading-row"><SectionTitle eyebrow={translate("A NATUREZA TEM A FORÇA. A GENTE TEM A ESCOLHA.")} title={translate("De onde vem a energia do futuro?")} description={translate("Quatro fontes. Diferentes possibilidades. Um mesmo propósito: transformar nossa relação com o planeta.")} /><Link to="/energias" className="text-link">{translate("Explore todas ")}<ArrowUpRight size={18} /></Link></div><div className="energy-grid">{energies.map(e => <EnergyCard key={e.id} energy={e} />)}</div></section>
<section className="section tools-section"><div className="container"><SectionTitle eyebrow={translate("DO CONHECIMENTO À AÇÃO")} title={translate("Sua próxima mudança começa aqui.")} description={translate("Ferramentas simples para entender possibilidades e fazer escolhas mais conscientes.")} /><div className="tools-grid">{[{
            icon: Calculator,
            title: 'Simulador EVA',
            text: 'Explore o potencial da energia solar para sua casa ou empresa.',
            to: '/simulador',
            tag: 'DESCUBRA SEU POTENCIAL'
          }, {
            icon: GitCompareArrows,
            title: 'Comparador de energias',
            text: 'Compare fontes renováveis e entenda suas diferenças.',
            to: '/comparador',
            tag: 'COLOQUE LADO A LADO'
          }, {
            icon: MapPin,
            title: 'EVA Conecta',
            text: 'Encontre caminhos para a energia renovável no Rio Grande do Sul.',
            to: '/conecta',
            tag: 'CONECTE-SE À MUDANÇA'
          }].map(({
            icon: C,
            title,
            text,
            to,
            tag
          }) => <Link className="tool-card card-eva" to={to} key={to}><C size={29} /><span className="eyebrow">{translate(tag)}</span><h3>{translate(title)}</h3><p>{translate(text)}</p><span className="round-arrow"><ArrowUpRight size={20} /></span></Link>)}</div></div></section>
<section className="section container"><div className="action-banner grad-eva"><div className="orbit-art" aria-hidden="true"><Leaf size={82} /><span /><span /></div><div><span className="eyebrow">{translate("PEQUENAS ATITUDES, GRANDES MUDAN\xC7AS")}</span><h2>{translate("Sustentabilidade \xE9 algo")}<br />{translate("que a gente pratica.")}</h2><p>{translate("Da luz que voc\xEA apaga ao consumo que repensa: cada escolha conta. Descubra h\xE1bitos poss\xEDveis para a sua rotina.")}</p><Link className="btn-light" to="/sustentabilidade">{translate("Monte seu checklist sustent\xE1vel ")}<ArrowUpRight size={18} /></Link></div></div></section>
<section className="section container split-features"><div className="kids-feature card-eva"><span className="chip"><Sparkles size={15} />{translate(" EVA KIDS")}</span><h2>{translate("Pequenas descobertas.")}<br />{translate("Grandes transforma\xE7\xF5es.")}</h2><p>{translate("O cuidado com o planeta tamb\xE9m \xE9 coisa de crian\xE7a. Conhe\xE7a nossa proposta para aprender com curiosidade e imagina\xE7\xE3o.")}</p><Link to="/kids" className="btn-dark">{translate("Conhe\xE7a o EVA Kids ")}<ArrowUpRight size={17} /></Link><span className="kids-sun" aria-hidden="true">☀</span></div><div className="news-feature"><span className="eyebrow">{translate("EVA ATUALIZA")}</span><h2>{translate("Informa\xE7\xE3o que")}<br />{translate("movimenta.")}</h2><p>{translate("Energia, sustentabilidade e educa\xE7\xE3o ambiental com fontes confi\xE1veis.")}</p><div className="home-news">{news.slice(0, 2).map(n => <Link to="/atualiza" key={n.id}><small>{translate(new Intl.DateTimeFormat(getLocale(), {
                timeZone: 'UTC'
              }).format(new Date(n.date + 'T00:00:00Z')))} • {translate(n.source)}</small><strong>{translate(n.title)}</strong><ArrowUpRight size={17} /></Link>)}</div><Link to="/atualiza" className="text-link">{translate("Conhe\xE7a o EVA Atualiza ")}<ArrowUpRight size={18} /></Link></div></section>
<section className="section container"><div className="instagram-banner"><Instagram size={32} /><div><h3>{translate("O movimento continua por l\xE1.")}</h3><p>{translate("Mais ideias, consci\xEAncia e energia no nosso Instagram.")}</p></div><a href={instagram} target="_blank" rel="noreferrer" className="btn-outline-eva">{translate("Acompanhe @eva.energiaverde ")}<ArrowUpRight size={17} /></a></div></section>
<section className="final-cta container"><span className="eyebrow">{translate("O FUTURO SE CONSTR\xD3I NO PRESENTE")}</span><h2>{translate("Fa\xE7a parte dessa energia.")}</h2><p>{translate("Conhe\xE7a o movimento e encontre seu jeito de transformar.")}</p><Link to="/sobre" className="btn-eva">{translate("Somos EVA. E voc\xEA tamb\xE9m pode ser. ")}<ArrowUpRight size={18} /></Link></section></>;
}
