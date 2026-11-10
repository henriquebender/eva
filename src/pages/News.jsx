import { useI18n, translate, getLocale } from "../i18n/index.js";
import { useState } from 'react';
import { Newspaper, ArrowUpRight } from 'lucide-react';
import { PageIntro } from '../components/common/UI';
import { news } from '../data/news';
export default function News() {
  useI18n();
  const [category, setCategory] = useState('Todos'),
    categories = ['Todos', 'Energias renováveis', 'Sustentabilidade', 'Inovação ambiental', 'Transição energética', 'Educação ambiental'],
    filtered = news.filter(n => category === 'Todos' || n.category === category);
  return <><PageIntro eyebrow={translate("EVA ATUALIZA")} title={translate("Informação que movimenta.")} description={translate("Energia, sustentabilidade e educação ambiental: um olhar atento para as transformações do nosso tempo.")} /><section className="section container"><div className="filter-row" role="group" aria-label={translate("Filtrar notícias")}>{categories.map(c => <button className={category === c ? 'active' : ''} key={c} onClick={() => setCategory(c)} aria-pressed={category === c}>{translate(c)}</button>)}</div><div aria-live="polite">{filtered.length ? <div className="content-grid">{filtered.map(n => <article className="card-eva news-card" key={n.id}>{n.image && <figure><img src={n.image} alt={translate(n.imageAlt || '')} />{n.imageCredit && <figcaption>{translate(n.imageCredit)}</figcaption>}</figure>}<div className="content-card"><span className="eyebrow">{translate(n.category)}</span><h2>{translate(n.title)}</h2><p><time dateTime={n.date}>{translate(new Intl.DateTimeFormat(getLocale(), {
                    dateStyle: 'long',
                    timeZone: 'UTC'
                  }).format(new Date(n.date + 'T00:00:00Z')))}</time> • {translate(n.source)}</p><p>{translate(n.summary)}</p><a href={n.url} target="_blank" rel="noreferrer" className="text-link">{translate("Leia na fonte original ")}<ArrowUpRight size={17} /></a></div></article>)}</div> : <div className="empty-news card-eva"><Newspaper size={45} /><h2>{translate(news.length ? 'Nenhuma notícia nesta categoria.' : 'Uma boa informação começa pela apuração.')}</h2><p>{translate(news.length ? 'Escolha outra categoria para continuar.' : 'Nossa curadoria está em preparação. Este espaço receberá notícias verificadas, com data, contexto e link para a fonte original.')}</p><a className="btn-outline-eva" href="https://www.epe.gov.br/pt/imprensa/noticias" target="_blank" rel="noreferrer">{translate("Explore as not\xEDcias da EPE ")}<ArrowUpRight size={17} /></a></div>}</div></section></>;
}
