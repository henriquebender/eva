import { useI18n, translate, getLocale } from "../i18n/index.js";
import { ArrowUpRight } from 'lucide-react';
import { references } from '../data/references';
import { PageIntro, Notice } from '../components/common/UI';
export default function References() {
  useI18n();
  return <><PageIntro eyebrow={translate("REFERÊNCIAS")} title={translate("Conhecimento com fundamento.")} description={translate("Fontes institucionais para aprofundar a leitura e conferir as informações que orientam o EVA.")} /><section className="section container"><div className="reference-list">{references.map(r => <article className="card-soft content-card" key={r.url}><span className="eyebrow">{translate(r.category)} • {translate(r.institution)}</span><h2>{translate(r.title)}</h2><p>{translate(r.description)}</p><a href={r.url} target="_blank" rel="noreferrer" className="text-link">{translate("Acessar fonte original ")}<ArrowUpRight size={17} /></a><small>{translate("Consulta editorial: 9 de novembro de 2026.")}</small></article>)}</div><Notice>{translate("Os conte\xFAdos s\xE3o s\xEDnteses educativas. Premissas num\xE9ricas do simulador s\xE3o did\xE1ticas e descritas na ferramenta; n\xE3o s\xE3o atribu\xEDdas \xE0s institui\xE7\xF5es acima. Consulte as fontes para contexto e atualiza\xE7\xF5es.")}</Notice></section></>;
}
