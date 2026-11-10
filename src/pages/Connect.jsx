import { useI18n, translate, getLocale } from "../i18n/index.js";
import { useState } from 'react';
import { MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PageIntro, Notice } from '../components/common/UI';
import { mapsSearch } from '../lib/calculations';
export default function Connect() {
  useI18n();
  const [form, setForm] = useState({
      city: '',
      energy: 'instalador de energia solar',
      profile: 'residencial'
    }),
    [url, setUrl] = useState(''),
    [error, setError] = useState('');
  const update = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
    setUrl('');
  };
  return <><PageIntro eyebrow={translate("EVA CONECTA • RIO GRANDE DO SUL")} title={translate("A mudança pode estar perto.")} description={translate("Busque empresas e profissionais de energias renováveis na sua cidade. Seu próximo passo começa com uma boa pesquisa.")} /><section className="section container two-columns"><form className="card-eva form-card" onSubmit={e => {
        e.preventDefault();
        try {
          setUrl(mapsSearch(form));
          setError('');
        } catch (err) {
          setError(err.message);
        }
      }}><h2><MapPin size={24} />{translate(" Encontre possibilidades")}</h2><label>{translate("Cidade do Rio Grande do Sul")}<input required maxLength={80} value={form.city} onChange={e => update('city', e.target.value)} placeholder={translate("Ex.: Santa Maria")} /></label><label>{translate("Tipo de energia")}<select value={form.energy} onChange={e => update('energy', e.target.value)}><option value="instalador de energia solar">{translate("Solar")}</option><option value="empresa de energia eólica">{translate("E\xF3lica")}</option><option value="consultoria de energia hidrelétrica">{translate("Hidrel\xE9trica")}</option><option value="empresa de biomassa e biogás">{translate("Biomassa e biog\xE1s")}</option></select></label><label>{translate("Perfil")}<select value={form.profile} onChange={e => update('profile', e.target.value)}><option value="residencial">{translate("Residencial")}</option><option value="empresarial">{translate("Empresarial")}</option></select></label><button className="btn-eva">{translate("Preparar pesquisa ")}<ArrowUpRight size={18} /></button>{error && <p className="error" role="alert">{translate(error)}</p>}<div aria-live="polite">{url && <div className="search-result"><h3>{translate("Sua pesquisa est\xE1 pronta.")}</h3><p>{translate("Busque op\xE7\xF5es para ")}{form.city.trim()}{translate(", RS, com o perfil selecionado.")}</p><a href={url} target="_blank" rel="noreferrer" className="btn-dark">{translate("Pesquisar no Google Maps ")}<ArrowUpRight size={17} /></a></div>}</div></form><div><span className="eyebrow">{translate("ESCOLHA COM CONSCI\xCANCIA")}</span><h2>{translate("Uma boa contrata\xE7\xE3o")}<br />{translate("come\xE7a com boas perguntas.")}</h2>{['Compare propostas completas: equipamentos, escopo e pagamento.', 'Verifique reputação, referências de clientes e histórico da empresa.', 'Peça identificação e responsabilidade técnica do profissional habilitado.', 'Confira garantias, manutenção, prazos e suporte após a instalação.', 'Desconfie de promessas de economia total ou retorno garantido.'].map(t => <p className="feedback-line" key={t}><CheckCircle2 size={21} />{translate(t)}</p>)}<Notice>{translate("Resultados fornecidos pelo Google Maps. A presen\xE7a de uma empresa n\xE3o representa recomenda\xE7\xE3o ou certifica\xE7\xE3o do EVA. Op\xE7\xF5es variam conforme cidade e tecnologia.")}</Notice></div></section></>;
}
