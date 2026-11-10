import { useI18n, translate, getLocale } from "../i18n/index.js";
import { useSearchParams, Link } from 'react-router-dom';
import { energies } from '../data/energies';
import { Icon, PageIntro, Notice } from '../components/common/UI';
export default function Energies() {
  useI18n();
  const [params, setParams] = useSearchParams(),
    active = energies.find(e => e.id === params.get('fonte')) || energies[0];
  const fields = [['operation', 'Como funciona'], ['applications', 'Onde é utilizada'], ['advantages', 'Vantagens'], ['limitations', 'Limitações'], ['impacts', 'Impactos ambientais'], ['example', 'Na prática'], ['curiosity', 'Você sabia?']];
  return <><PageIntro eyebrow={translate("CONHECER PARA TRANSFORMAR")} title={translate("Renováveis por natureza.")} description={translate("Entenda as fontes que aproveitam os ciclos da natureza e os cuidados necessários em cada uma.")} /><section className="section container"><Notice>{translate("Renov\xE1vel n\xE3o significa impacto zero. A escolha de uma fonte depende do local, da escala, das necessidades e do planejamento ambiental.")}</Notice><div className="energy-tabs" role="group" aria-label={translate("Escolha uma fonte")}>{energies.map(e => <button key={e.id} aria-pressed={active.id === e.id} className={active.id === e.id ? 'selected' : ''} onClick={() => setParams({
          fonte: e.id
        })}><Icon name={e.icon} size={21} />{translate(e.short)}</button>)}</div><article className={'energy-article ' + active.color}><div className="article-lead"><span className="icon-tile"><Icon name={active.icon} size={34} /></span><div><span className="eyebrow">{translate(active.tagline)}</span><h2>{translate(active.name)}</h2><p>{translate(active.definition)}</p></div></div><div className="content-grid">{fields.map(([field, label]) => <section className="card-soft content-card" key={field}><h3>{translate(label)}</h3><p>{translate(active[field])}</p></section>)}</div><p className="article-source">{translate("Para aprofundar: ")}<a href="https://www.epe.gov.br/pt/abcdenergia/fontes-de-energia" target="_blank" rel="noreferrer">{translate("EPE \u2014 Fontes de Energia \u2197")}</a>. <Link to="/referencias">{translate("Veja nossas refer\xEAncias.")}</Link></p></article><div className="button-row"><Link className="btn-eva" to="/comparador">{translate("Compare duas fontes")}</Link><Link className="btn-outline-eva" to="/simulador">{translate("Explore a energia solar")}</Link></div></section></>;
}
