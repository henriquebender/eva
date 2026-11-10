import {test,expect} from '@playwright/test';
import english from '../../src/i18n/locales/en.json' with {type:'json'};
import portuguese from '../../src/i18n/locales/pt-BR.json' with {type:'json'};
async function preferences(page,language='en',theme='dark'){
 await page.locator('.settings-button').click();
 await page.locator('#eva-language').selectOption(language);
 await page.locator('#eva-theme').selectOption(theme);
 await page.keyboard.press('Escape');
}
test('preferências mudam sem recarregar e preservam os resultados',async({page})=>{
 await page.goto('/#/simulador');
 await expect(page.locator('html')).toHaveAttribute('lang','pt-BR');await expect(page.locator('html')).not.toHaveClass(/dark/);
 await page.getByLabel('Consumo mensal (kWh)').fill('360');await page.getByLabel('Conta mensal (R$)').fill('300');
 await page.getByLabel('Investimento estimado').fill('14400');await page.getByRole('button',{name:'Calcular minha estimativa'}).click();
 const marker=await page.evaluate(()=>{window.evaSessionMarker=Math.random();return window.evaSessionMarker;});
 await preferences(page);
 await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.locator('html')).toHaveClass(/dark/);
 await expect(page.getByRole('heading',{level:1})).toHaveText('What if your energy came from the sun?');
 await expect(page.locator('.results')).toContainText('3.33 kWp');await expect(page.locator('.results')).toContainText('5 years');
 await expect(page.locator('.results')).toContainText('R$');await expect(page.locator('.chart')).toContainText('Current bill');
 expect(await page.evaluate(()=>window.evaSessionMarker)).toBe(marker);
 await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.locator('html')).toHaveClass(/dark/);
 await expect(page.locator('input').first()).toHaveValue('360');
 await preferences(page,'pt-BR','light');await expect(page.locator('html')).not.toHaveClass(/dark/);
 await expect(page.getByRole('heading',{level:1})).toHaveText('E se a sua energia viesse do sol?');
});
test('dez páginas em inglês e escuro sem conteúdo esquecido nem transbordamento',async({page})=>{
 await page.goto('/');await preferences(page);
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 for(const route of ['/','/energias','/comparador','/simulador','/conecta','/sustentabilidade','/kids','/atualiza','/referencias','/sobre']){
  await page.goto('/#'+route);await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const untranslated=await page.evaluate(({english,portuguese})=>{
   const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),found=[];let node;
   while(node=walker.nextNode()){if(['SCRIPT','STYLE'].includes(node.parentElement?.tagName))continue;const text=node.textContent.trim();if(text in portuguese&&english[text]!==text)found.push(text);}
   return [...new Set(found)];
  },{english,portuguese});
  expect(untranslated,route).toEqual([]);
  if(route==='/')await page.screenshot({path:test.info().outputPath('inicio-en-dark.png'),fullPage:true});
 }
 expect(errors).toEqual([]);
});
test('inglês mantém os dados brasileiros e as ferramentas funcionais',async({page})=>{
 await page.goto('/#/conecta');await preferences(page);
 await page.getByLabel('City in Rio Grande do Sul').fill('São Leopoldo');await page.getByRole('button',{name:'Prepare search'}).click();
 const url=await page.getByRole('link',{name:'Search on Google Maps'}).getAttribute('href');
 expect(decodeURIComponent(url)).toContain('São Leopoldo, Rio Grande do Sul, Brasil');expect(decodeURIComponent(url)).toContain('residencial');
 await page.getByLabel('City in Rio Grande do Sul').fill('constructor');await page.getByRole('button',{name:'Prepare search'}).click();await expect(page.locator('.search-result')).toContainText('constructor');
 await page.goto('/#/sustentabilidade');await page.getByLabel('I switch to LED bulbs').check();
 await expect(page.locator('.progress-card')).toContainText('1 of 12 habits adopted');
 await page.reload();await expect(page.getByLabel('I switch to LED bulbs')).toBeChecked();
 await page.goto('/#/comparador');await page.getByLabel('First source').selectOption('biomassa');await expect(page.locator('thead')).toContainText('Biomass');
 await page.goto('/#/energias');await page.getByRole('button',{name:'Wind',exact:true}).click();
 await expect(page.getByRole('heading',{level:2,name:'Wind energy',exact:true})).toBeVisible();
 await expect(page.locator('.energy-article')).toContainText('Wind turbines have minimum and maximum wind limits');
});
test('preferências inválidas ou indisponíveis têm fallback seguro',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('eva-preferences-v1','{"language":"invalid","theme":"invalid"}'));
 await page.goto('/');await expect(page.locator('html')).toHaveAttribute('lang','pt-BR');await expect(page.locator('html')).not.toHaveClass(/dark/);
 await page.evaluate(()=>{Storage.prototype.setItem=()=>{throw new Error('blocked');};});
 await page.locator('.settings-button').click();await page.locator('#eva-language').selectOption('en');await page.locator('#eva-theme').selectOption('dark');
 await expect(page.locator('#settings-panel')).toContainText('Your preferences could not be saved');
 await expect(page.locator('html')).toHaveClass(/dark/);
});
test('imagens oficiais estão carregadas e referências ficam no rodapé',async({page})=>{
 await page.goto('/');
 const logo=page.locator('header img.brand-image');await expect(logo).toBeVisible();
 expect(await logo.evaluate(img=>img.complete&&img.naturalWidth===2048)).toBe(true);
 await expect(page.locator('header').getByRole('link',{name:'Referências',exact:true})).toHaveCount(0);
 await expect(page.getByRole('navigation',{name:'Navegação do rodapé'}).getByRole('link',{name:'Referências',exact:true})).toBeVisible();
 await page.goto('/#/sobre');await expect(page.locator('.ods-banner img.ods-image')).toBeVisible();
 expect(await page.locator('.ods-banner img.ods-image').evaluate(img=>img.complete&&img.naturalWidth===1600)).toBe(true);
});