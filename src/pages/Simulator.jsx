import { useI18n, translate, getLocale } from "../i18n/index.js";
import { useState } from 'react';
import { Calculator, CheckCircle2, TriangleAlert } from 'lucide-react';
import { PageIntro, Notice, number, money } from '../components/common/UI';
import { simulateSolar, assessFeasibility } from '../lib/calculations';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SolarChart from '../components/simulator/SolarChart';
const initial = {
  profile: 'residencial',
  consumption: '350',
  bill: '320',
  city: '',
  investment: '',
  hsp: '4.5'
};
export default function Simulator() {
  useI18n();
  const [saved, save, storageError] = useLocalStorage('eva-solar-v1', initial);
  const [form, setForm] = useState({
      ...initial,
      ...saved
    }),
    [result, setResult] = useState(null),
    [snapshot, setSnapshot] = useState(null),
    [error, setError] = useState('');
  const [site, setSite] = useState({
      area: '30',
      shade: 'nenhuma',
      type: 'telhado'
    }),
    [feasibility, setFeasibility] = useState(null),
    [siteError, setSiteError] = useState('');
  function field(key) {
    return {
      value: form[key],
      onChange: e => {
        setForm({
          ...form,
          [key]: e.target.value
        });
        setResult(null);
        setFeasibility(null);
      }
    };
  }
  function calculate(e) {
    e.preventDefault();
    try {
      setResult(simulateSolar(form));
      setSnapshot({
        ...form
      });
      save(form);
      setError('');
      setFeasibility(null);
    } catch (err) {
      setError(err.message);
    }
  }
  function evaluate(e) {
    e.preventDefault();
    try {
      setFeasibility(assessFeasibility({
        ...site,
        kwp: result.kwp
      }));
      setSiteError('');
    } catch (err) {
      setSiteError(err.message);
    }
  }
  return <><PageIntro eyebrow={translate("SIMULADOR EVA")} title={translate("E se a sua energia viesse do sol?")} description={translate("Explore uma estimativa educativa de geração solar e as possibilidades do seu espaço.")} /><section className="section container"><Notice>{translate("Simula\xE7\xE3o educativa, sem promessa de economia ou retorno. Valores reais dependem de projeto, tarifas, compensa\xE7\xE3o, clima, manuten\xE7\xE3o e condi\xE7\xF5es da instala\xE7\xE3o.")}</Notice><div className="simulator-layout"><form onSubmit={calculate} className="card-eva form-card"><h2><Calculator size={23} />{translate(" Conte sobre seu consumo")}</h2><label>{translate("Perfil")}<select {...field('profile')}><option value="residencial">{translate("Residencial")}</option><option value="empresarial">{translate("Empresarial")}</option></select></label><div className="form-grid"><label>{translate("Consumo mensal (kWh)")}<input type="number" min="1" max="10000000" step="any" required {...field('consumption')} /></label><label>{translate("Conta mensal (R$)")}<input type="number" min="1" max="10000000" step="any" required {...field('bill')} /></label></div><label>{translate("Cidade (opcional)")}<input maxLength={80} placeholder={translate("Ex.: Porto Alegre, RS")} {...field('city')} /></label><label>{translate("Investimento estimado (R$, opcional)")}<input type="number" min="0" max="1000000000" step="any" placeholder={translate("Um orçamento, se tiver")} {...field('investment')} /></label><label>{translate("Horas de sol pleno por dia (premissa)")}<input type="number" min="1" max="8" step=".1" required {...field('hsp')} /><small>{translate("Valor inicial did\xE1tico: 4,5 h/dia, n\xE3o uma medi\xE7\xE3o da cidade. A cidade apenas identifica sua simula\xE7\xE3o.")}</small></label>{error && <p role="alert" className="error">{translate(error)}</p>}<button className="btn-eva" type="submit">{translate("Calcular minha estimativa \u2197")}</button>{storageError && <p role="status">{translate(storageError)}</p>}<small>{translate("As entradas s\xE3o salvas somente neste navegador.")}</small></form><div className="result-panel" aria-live="polite">{!result ? <div className="result-empty grad-eva-soft"><span className="icon-tile"><Calculator size={35} /></span><h2>{translate("Uma nova perspectiva")}<br />{translate("para sua energia.")}</h2><p>{translate("Preencha os dados para explorar pot\xEAncia, gera\xE7\xE3o e economia potencial.")}</p><span className="chip">{translate("CONHECIMENTO PARA ESCOLHER")}</span></div> : <div className="card-eva results"><span className="eyebrow">{translate("SUA ESTIMATIVA EDUCATIVA")}</span><h2>{translate("Possibilidades em n\xFAmeros.")}</h2><p>{translate("Perfil ")}{translate(snapshot.profile)}{translate(snapshot.city ? ' • ' + snapshot.city : '')}</p><div className="stats-grid">{[['Potência aproximada', number(result.kwp, 2) + ' kWp'], ['Geração mensal', number(result.generation) + ' kWh'], ['Economia mensal ilustrativa', money(result.monthlySaving)], ['Conta restante ilustrativa', money(result.remainingBill)]].map(([label, value]) => <div key={label}><span>{translate(label)}</span><strong>{translate(value)}</strong></div>)}</div><SolarChart bill={Number(snapshot.bill)} remaining={result.remainingBill} saving={result.monthlySaving} /><p>{translate("Economia anual ilustrativa: ")}<strong>{translate(money(result.annualSaving))}</strong>.</p><p>{result.payback ? translate('Retorno simples estimado: {{years}} anos. Não inclui juros, manutenção, reposições, degradação nem reajustes.', {
                years: number(result.payback)
              }) : translate('Informe um investimento para calcular o retorno simples.')}</p></div>}</div></div>
<details className="methodology card-soft"><summary>{translate("Entenda as f\xF3rmulas e premissas")}</summary><p>{translate("Pot\xEAncia (kWp) = consumo mensal (kWh) \xF7 (horas de sol pleno \xD7 30 dias \xD7 0,80 de desempenho).")}</p><p>{translate("Gera\xE7\xE3o mensal = pot\xEAncia \xD7 horas de sol pleno \xD7 30 \xD7 0,80. O sistema \xE9 dimensionado para o consumo informado, por isso a gera\xE7\xE3o calculada corresponde a esse consumo.")}</p><p>{translate("Economia ilustrativa = conta \xD7 80%. Essa fra\xE7\xE3o \xE9 uma hip\xF3tese did\xE1tica fixa, n\xE3o uma tarifa ou estimativa regulat\xF3ria. Reservamos 20% da conta; o custo residual real pode ser maior ou menor.")}</p><p>{translate("Retorno simples (anos) = investimento \xF7 economia anual. \xC1rea did\xE1tica: 6 m\xB2/kWp. N\xE3o estimamos pre\xE7o de instala\xE7\xE3o. Perfis compartilham o modelo simplificado, sem modelar demanda contratada empresarial.")}</p><a href="https://www.gov.br/aneel/pt-br/assuntos/geracao-distribuida" target="_blank" rel="noreferrer">{translate("Consulte a ANEEL sobre gera\xE7\xE3o distribu\xEDda \u2197")}</a></details>
<div className="feasibility-section"><h2>{translate("Seu espa\xE7o pode receber um sistema?")}</h2><p>{translate("Uma verifica\xE7\xE3o inicial de \xE1rea e condi\xE7\xF5es relatadas. N\xE3o \xE9 um laudo t\xE9cnico.")}</p>{!result ? <Notice>{translate("Calcule a estimativa acima para avaliar a \xE1rea dispon\xEDvel.")}</Notice> : <div className="two-columns"><form className="card-eva form-card" onSubmit={evaluate}><label>{translate("Tipo de instala\xE7\xE3o")}<select value={site.type} onChange={e => {
                setSite({
                  ...site,
                  type: e.target.value
                });
                setFeasibility(null);
              }}><option value="telhado">{translate("Telhado")}</option><option value="solo">{translate("Solo")}</option></select></label><label>{translate("\xC1rea dispon\xEDvel (m\xB2)")}<input type="number" min=".1" step="any" required value={site.area} onChange={e => {
                setSite({
                  ...site,
                  area: e.target.value
                });
                setFeasibility(null);
              }} /></label><label>{translate("Exist\xEAncia de sombras")}<select value={site.shade} onChange={e => {
                setSite({
                  ...site,
                  shade: e.target.value
                });
                setFeasibility(null);
              }}><option value="nenhuma">{translate("N\xE3o percebo sombras")}</option><option value="parcial">{translate("Sombras em parte do dia")}</option><option value="muita">{translate("Sombras frequentes")}</option><option value="incerto">{translate("N\xE3o sei avaliar")}</option></select></label><button className="btn-eva">{translate("Avaliar espa\xE7o")}</button>{siteError && <p role="alert" className="error">{translate(siteError)}</p>}</form><div aria-live="polite">{feasibility && <div className="card-soft content-card"><h3>{translate("Capacidade aproximada: ")}{translate(number(feasibility.capacity, 2))}{translate(" kWp")}</h3>{feasibility.favorable.map(t => <p className="feedback-line" key={t}><CheckCircle2 size={20} />{translate(t)}</p>)}{feasibility.limitations.map(t => <p className="feedback-line" key={t}><TriangleAlert size={20} />{translate(t)}</p>)}<Notice>{translate("Um profissional deve verificar estrutura, instala\xE7\xE3o el\xE9trica, conex\xE3o \xE0 rede e condi\xE7\xF5es ambientais antes do projeto.")}</Notice></div>}</div></div>}</div></section></>;
}
