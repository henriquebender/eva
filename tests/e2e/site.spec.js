import {test,expect} from '@playwright/test';
test('dez páginas carregam sem erros e sem transbordamento horizontal',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const route of ['/','/energias','/comparador','/simulador','/conecta','/sustentabilidade','/kids','/atualiza','/referencias','/sobre']){
  await page.goto('./#'+route);await expect(page.locator('h1')).toBeVisible();
  await page.reload();await expect(page.locator('h1')).toBeVisible();
  if(route==='/'){expect(await page.evaluate(()=>window.scrollY)).toBe(0);await page.screenshot({path:test.info().outputPath('inicio.png'),fullPage:true});}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 }
 expect(errors).toEqual([]);
});
test('menus permitem navegar e fechar com Escape',async({page})=>{
 await page.goto('./');
 if(page.viewportSize().width<=850){
  await page.getByRole('button',{name:'Abrir menu',exact:true}).click();
  await expect(page.getByRole('navigation',{name:'Navegação móvel'})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation',{name:'Navegação móvel'})).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Abrir menu',exact:true})).toBeFocused();
  await page.getByRole('button',{name:'Abrir menu',exact:true}).click();
  await page.getByRole('navigation',{name:'Navegação móvel'}).getByRole('link',{name:'Comparador de Energias',exact:true}).click();
 }else{
  const tools=page.getByRole('button',{name:'Ferramentas',exact:true});
  await tools.focus();await page.keyboard.press('ArrowDown');
  await expect(page.locator('#tools-links').getByRole('link').first()).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#tools-links').getByRole('link',{name:'Simulador EVA',exact:true})).toBeFocused();
  await page.keyboard.press('Escape');await expect(tools).toBeFocused();
  await tools.click();await page.locator('#tools-links').getByRole('link',{name:'Comparador de Energias',exact:true}).click();
 }
 await expect(page.getByRole('heading',{level:1})).toHaveText('Lado a lado, fica mais claro.');
 await page.getByLabel('Primeira fonte').selectOption('biomassa');await expect(page.locator('thead')).toContainText('Biomassa');
 if(page.viewportSize().width<=850){
  await page.getByRole('button',{name:'Abrir menu',exact:true}).click();
  await page.getByRole('navigation',{name:'Navegação móvel'}).getByRole('link',{name:'EVA Kids',exact:true}).click();
 }else{
  await page.getByRole('button',{name:'Ferramentas',exact:true}).click();
  await page.getByRole('heading',{level:1}).click();
  await expect(page.locator('#tools-links')).toHaveCount(0);
  await page.getByRole('button',{name:'O movimento',exact:true}).click();
  await page.locator('#movement-links').getByRole('link',{name:'EVA Kids',exact:true}).click();
 }
 await expect(page).toHaveURL(/#\/kids$/);
 await expect(page.getByRole('heading',{level:1})).toHaveText('Pequenas descobertas, grandes transformações.');
});
test('simulador, retorno e viabilidade respondem às entradas',async({page})=>{
 await page.goto('./#/simulador');
 await page.getByLabel('Consumo mensal (kWh)').fill('360');await page.getByLabel('Conta mensal (R$)').fill('300');
 await page.getByLabel('Investimento estimado').fill('14400');await page.getByRole('button',{name:'Calcular minha estimativa'}).click();
 await expect(page.locator('.results')).toContainText('3,33 kWp');await expect(page.locator('.results')).toContainText('5 anos');
 await page.getByLabel('Área disponível').fill('6');await page.getByLabel('Existência de sombras').selectOption('parcial');
 await page.getByRole('button',{name:'Avaliar espaço'}).click();await expect(page.locator('.feasibility-section')).toContainText('A área pode limitar');
 await page.reload();await expect(page.getByLabel('Consumo mensal (kWh)')).toHaveValue('360');
});
test('checklist persiste e personaliza feedback',async({page})=>{
 await page.goto('./#/sustentabilidade');await page.getByLabel('Troco lâmpadas por LED').check();
 await expect(page.locator('.progress-card')).toContainText('1 de 12');await expect(page.locator('.progress-number')).toHaveText('8%');
 await page.reload();await expect(page.getByLabel('Troco lâmpadas por LED')).toBeChecked();
});
test('Conecta codifica a busca e notícias têm fonte original',async({page})=>{
 await page.goto('./#/conecta');await page.getByLabel('Cidade do Rio Grande do Sul').fill('São Leopoldo');
 await page.getByRole('button',{name:'Preparar pesquisa'}).click();
 const href=await page.getByRole('link',{name:'Pesquisar no Google Maps'}).getAttribute('href');expect(decodeURIComponent(href)).toContain('São Leopoldo, Rio Grande do Sul, Brasil');
 await page.goto('./#/atualiza');await expect(page.getByRole('link',{name:'Leia na fonte original'})).toHaveCount(3);
 await page.getByRole('button',{name:'Transição energética',exact:true}).click();await expect(page.getByRole('link',{name:'Leia na fonte original'})).toHaveCount(1);
});