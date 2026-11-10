import { useI18n, translate, getLocale } from "../../i18n/index.js";
import { habitGroups } from '../../data/habits';
import { checklistSummary } from '../../lib/calculations';
import { useLocalStorage } from '../../hooks/useLocalStorage';
export default function Checklist() {
  useI18n();
  const [selected, save, error] = useLocalStorage('eva-habits-v1', {}),
    s = checklistSummary(selected, habitGroups);
  return <section id="checklist" className="checklist-section"><div className="section-title"><span className="eyebrow">{translate("SEU PR\xD3XIMO PASSO")}</span><h2>{translate("Meu checklist sustent\xE1vel.")}</h2><p>{translate("Marque os h\xE1bitos que fazem parte da sua rotina. O progresso fica salvo neste navegador.")}</p></div><div className="checklist-layout"><div className="content-grid">{habitGroups.map(g => <fieldset className="card-soft content-card" key={g.name}><legend>{translate(g.name)}</legend>{g.items.map(([id, label]) => <label className="checkbox-row" key={id}><input type="checkbox" checked={selected[id] === true} onChange={e => save({
              ...selected,
              [id]: e.target.checked
            })} /><span>{translate(label)}</span></label>)}</fieldset>)}</div><aside className="card-eva progress-card" aria-live="polite"><span className="eyebrow">{translate("CADA ATITUDE CONTA")}</span><strong className="progress-number">{translate(s.percent)}%</strong><p>{translate(s.done)}{translate(" de ")}{translate(s.total)}{translate(" h\xE1bitos adotados")}</p><progress value={s.done} max={s.total} aria-label={translate("Progresso dos hábitos sustentáveis")} />{s.categories.map(c => <div className="category-progress" key={c.name}><span>{translate(c.name)}</span><strong>{translate(c.done)}/{translate(c.total)}</strong></div>)}<h3>{translate("Seus pontos fortes")}</h3><p>{s.strong.length ? translate('{{categories}}: todos os hábitos propostos marcados.', {
            categories: s.strong.map(category => translate(category)).join(', ')
          }) : translate('Cada hábito marcado é um começo. Continue construindo sua rotina.')}</p><h3>{translate("Que tal o pr\xF3ximo passo?")}</h3>{s.suggestions.length ? s.suggestions.map(t => <p key={t.id} className="suggestion">{translate(t.tip)}</p>) : <p>{translate("Voc\xEA adotou todos os h\xE1bitos propostos! Compartilhe suas pr\xE1ticas e veja como mant\xEA-las.")}</p>}<small>{translate("O progresso representa h\xE1bitos marcados, n\xE3o uma medida de impacto ambiental.")}</small>{error && <p role="status">{translate(error)}</p>}</aside></div></section>;
}
