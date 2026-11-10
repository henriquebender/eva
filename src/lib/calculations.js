// Premissas didáticas, não medições locais nem proposta comercial.
export const assumptions={days:30,hsp:4.5,performance:0.8,usableBillFraction:0.8,areaPerKwp:6};
export function simulateSolar({consumption,bill,investment=0,hsp=assumptions.hsp}){
 const c=Number(consumption),b=Number(bill),i=Number(investment),h=Number(hsp);
 if(![c,b,h].every(v=>Number.isFinite(v)&&v>0)||!Number.isFinite(i)||i<0)throw new Error('Informe consumo, conta e horas de sol positivos; investimento não pode ser negativo.');
 const kwp=c/(h*assumptions.days*assumptions.performance),generation=kwp*h*assumptions.days*assumptions.performance,monthlySaving=b*assumptions.usableBillFraction;
 return {kwp,generation,monthlySaving,annualSaving:monthlySaving*12,remainingBill:b-monthlySaving,payback:i>0?i/(monthlySaving*12):null};
}
export function assessFeasibility({area,shade,type,kwp}){
 const a=Number(area),k=Number(kwp);
 if(!Number.isFinite(a)||a<=0||!Number.isFinite(k)||k<=0)throw new Error('Informe uma área disponível maior que zero.');
 const capacity=a/assumptions.areaPerKwp,favorable=[],limitations=[];
 (capacity>=k?favorable:limitations).push(capacity>=k?'Área compatível com a potência estimada.':'A área pode limitar a potência pretendida.');
 (shade==='nenhuma'?favorable:limitations).push(shade==='nenhuma'?'Ausência de sombras relatada.':'Sombras ou incerteza exigem análise de perdas e posicionamento.');
 limitations.push(type==='telhado'?'Verifique estrutura, orientação, impermeabilização e acesso seguro ao telhado.':'Verifique ocupação do solo, drenagem, segurança e permissões locais.');
 return {capacity,favorable,limitations};
}
export function checklistSummary(selected,groups){
 const categories=groups.map(g=>({name:g.name,done:g.items.filter(([id])=>selected[id]===true).length,total:g.items.length}));
 const done=categories.reduce((n,g)=>n+g.done,0),total=categories.reduce((n,g)=>n+g.total,0);
 return {done,total,percent:Math.round(done/total*100),categories,strong:categories.filter(g=>g.done===g.total).map(g=>g.name),suggestions:groups.flatMap(g=>g.items.filter(([id])=>selected[id]!==true).map(([id,,tip])=>({id,tip}))).slice(0,3)};
}
export function mapsSearch({city,energy,profile}){
 const name=city.trim();if(!name)throw new Error('Informe uma cidade do Rio Grande do Sul.');
 return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(energy+' '+profile+' em '+name+', Rio Grande do Sul, Brasil');
}