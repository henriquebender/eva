import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Settings, ChevronDown, ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';
import { useI18n, translate as t } from '../../i18n/index.js';
import { toolNavigation, movementNavigation, primaryNavigation } from '../../config/navigation';

export default function Header() {
  const { language, theme, storageError, setPreferences } = useI18n();
  const [panel, setPanel] = useState(null);
  const header = useRef(null);
  const lastTrigger = useRef(null);
  const location = useLocation();
  useEffect(() => setPanel(null), [location.pathname]);
  useEffect(() => {
    function outside(event) { if (!header.current?.contains(event.target)) setPanel(null); }
    function keyboard(event) {
      if (event.key === 'Escape') { setPanel(null); lastTrigger.current?.focus(); }
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', keyboard);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', keyboard); };
  }, []);
  function toggle(name, event) { lastTrigger.current = event.currentTarget; setPanel(panel === name ? null : name); }
  function arrowKeys(event) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const container = event.currentTarget.closest('.nav-dropdown');
    const items = [...container.querySelectorAll('.nav-popover a')];
    if (!items.length) return;
    event.preventDefault();
    const index = items.indexOf(document.activeElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
    items[next].focus();
  }
  return <header className="site-header" ref={header} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPanel(null); }}>
    <div className="container header-inner">
      <Link to="/" aria-label={t('EVA — página inicial')}><BrandMark /></Link>
      <nav className="desktop-nav" aria-label={t('Navegação principal')}>
        {primaryNavigation.map(([to, label]) => <NavLink key={to} to={to} end>{t(label)}</NavLink>)}
        <NavDropdown id="tools" label="Ferramentas" items={toolNavigation} panel={panel} toggle={toggle} arrowKeys={arrowKeys} openByKeyboard={(id,trigger)=>{lastTrigger.current=trigger;setPanel(id);}} />
        <NavDropdown id="movement" label="O movimento" items={movementNavigation} panel={panel} toggle={toggle} arrowKeys={arrowKeys} openByKeyboard={(id,trigger)=>{lastTrigger.current=trigger;setPanel(id);}} />
      </nav>
      <div className="header-actions">
        <button type="button" className="menu-button mobile-menu-button" aria-expanded={panel === 'mobile'} aria-controls="mobile-navigation" aria-label={t(panel === 'mobile' ? 'Fechar menu' : 'Abrir menu')} onClick={event => toggle('mobile', event)}>
          {panel === 'mobile' ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="settings-container">
          <button type="button" className="settings-button" aria-label={t('Configurações')} aria-expanded={panel === 'settings'} aria-controls="settings-panel" onClick={event => toggle('settings', event)}><Settings size={21} aria-hidden="true" /></button>
          {panel === 'settings' && <section className="settings-panel nav-popover" id="settings-panel" aria-label={t('Configurações')}>
            <label htmlFor="eva-language">{t('Idioma')}<select id="eva-language" value={language} onChange={event => setPreferences({ language: event.target.value })}><option value="pt-BR" lang="pt-BR">Português do Brasil</option><option value="en" lang="en">English</option></select></label>
            <label htmlFor="eva-theme">{t('Aparência')}<select id="eva-theme" value={theme} onChange={event => setPreferences({ theme: event.target.value })}><option value="light">{t('Claro')}</option><option value="dark">{t('Escuro')}</option></select></label>
            {storageError && <p role="status">{t('Não foi possível salvar as preferências. Elas serão mantidas nesta sessão.')}</p>}
          </section>}
        </div>
      </div>
    </div>
    {panel === 'mobile' && <nav id="mobile-navigation" className="mobile-navigation container" aria-label={t('Navegação móvel')}>
      {primaryNavigation.map(([to, label]) => <NavLink key={to} to={to} end>{t(label)}</NavLink>)}
      {[['Ferramentas', toolNavigation], ['O movimento', movementNavigation]].map(([label, items]) => <div className="mobile-nav-group" key={label}><span className="eyebrow">{t(label)}</span>{items.map(([to, text]) => <NavLink key={to} to={to}>{t(text)}<ArrowUpRight size={14} /></NavLink>)}</div>)}
    </nav>}
  </header>;
}
function NavDropdown({id,label,items,panel,toggle,arrowKeys,openByKeyboard}) {
  const location=useLocation();
  const active=items.some(([path])=>location.pathname===path);
  return <div className="nav-dropdown" onKeyDown={arrowKeys}>
    <button type="button" className={'nav-trigger'+(active?' active':'')} aria-expanded={panel===id} aria-controls={id+'-links'} onClick={event=>toggle(id,event)}
      onKeyDown={event=>{if(event.key==='ArrowDown'&&panel!==id){event.preventDefault();openByKeyboard(id,event.currentTarget);requestAnimationFrame(()=>document.getElementById(id+'-links')?.querySelector('a')?.focus());}}}>
      {t(label)} <ChevronDown size={14} aria-hidden="true"/>
    </button>
    {panel===id&&<div id={id+'-links'} className="nav-popover">{items.map(([to,text])=><NavLink key={to} to={to}>{t(text)}<ArrowUpRight size={14} aria-hidden="true"/></NavLink>)}</div>}
  </div>;
}