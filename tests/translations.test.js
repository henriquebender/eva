import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {energies,comparisonFields} from '../src/data/energies.js';
import {habitGroups} from '../src/data/habits.js';
import {news} from '../src/data/news.js';
import {references} from '../src/data/references.js';
const en=JSON.parse(readFileSync(new URL('../src/i18n/locales/en.json',import.meta.url),'utf8'));
const pt=JSON.parse(readFileSync(new URL('../src/i18n/locales/pt-BR.json',import.meta.url),'utf8'));
test('catálogos têm as mesmas chaves e preservam o português',()=>{
 assert.deepEqual(Object.keys(en).sort(),Object.keys(pt).sort());
 for(const [key,value] of Object.entries(en)){assert.equal(typeof value,'string');assert.ok(value.length>0);assert.equal(pt[key],key);}
});
test('conteúdo de todas as fontes e critérios tem tradução',()=>{
 const fields=['name','short','tagline','definition','operation','availability','applications','advantages','limitations','impacts','natural','scale','example','curiosity'];
 for(const energy of energies)for(const field of fields)assert.ok(en[energy[field]],energy.id+': '+field);
 for(const [,label] of comparisonFields)assert.ok(en[label],label);
});
test('hábitos, sugestões, notícias e referências têm tradução',()=>{
 for(const group of habitGroups){assert.ok(en[group.name]);for(const [,label,tip] of group.items){assert.ok(en[label],label);assert.ok(en[tip],tip);}}
 for(const item of news)for(const field of ['title','summary','category'])assert.ok(en[item[field]],item[field]);
 for(const item of references)for(const field of ['title','description','category'])assert.ok(en[item[field]],item[field]);
});