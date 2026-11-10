import { useI18n, translate, getLocale } from "../i18n/index.js";
import { useState } from 'react';
import { energies, comparisonFields } from '../data/energies';
import { PageIntro, Notice, Icon } from '../components/common/UI';
export default function Compare() {
  useI18n();
  const [left, setLeft] = useState('solar'),
    [right, setRight] = useState('eolica'),
    a = energies.find(e => e.id === left),
    b = energies.find(e => e.id === right);
  function choose(side, v) {
    if (side === 'left') {
      if (v === right) setRight(left);
      setLeft(v);
    } else {
      if (v === left) setLeft(right);
      setRight(v);
    }
  }
  return <><PageIntro eyebrow={translate("COMPARADOR DE ENERGIAS")} title={translate("Lado a lado, fica mais claro.")} description={translate("Compare duas fontes e descubra como elas podem atender a necessidades diferentes.")} /><section className="section container"><div className="compare-selects">{[['left', left, 'Primeira fonte'], ['right', right, 'Segunda fonte']].map(([side, v, label]) => <label key={side}>{translate(label)}<select value={v} onChange={e => choose(side, e.target.value)}>{energies.map(e => <option key={e.id} value={e.id}>{translate(e.name)}</option>)}</select></label>)}<button className="btn-outline-eva" onClick={() => {
          setLeft(right);
          setRight(left);
        }}>{translate("Inverter fontes \u21C4")}</button></div><div className="table-wrap" tabIndex={0} aria-label={translate("Tabela de comparação; role horizontalmente em telas pequenas")}><table><caption>{translate("Compara\xE7\xE3o educativa entre ")}{translate(a.name)}{translate(" e ")}{translate(b.name)}</caption><thead><tr><th scope="col">{translate("O que comparar")}</th>{[a, b].map(e => <th scope="col" key={e.id}><Icon name={e.icon} size={23} />{translate(e.name)}</th>)}</tr></thead><tbody>{comparisonFields.map(([f, label]) => <tr key={f}><th scope="row">{translate(label)}</th><td>{translate(a[f])}</td><td>{translate(b[f])}</td></tr>)}</tbody></table></div><Notice>{translate("Fontes podem se complementar. Esta compara\xE7\xE3o n\xE3o substitui estudos t\xE9cnicos ou ambientais. Conte\xFAdo baseado na EPE; consulte Refer\xEAncias.")}</Notice></section></>;
}
