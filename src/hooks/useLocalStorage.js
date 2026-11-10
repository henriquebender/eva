import {useState} from 'react';
export function useLocalStorage(key,initial){
 const [error,setError]=useState('');
 const [value,setValue]=useState(()=>{try{const data=JSON.parse(localStorage.getItem(key));return data&&typeof data==='object'&&!Array.isArray(data)?data:initial;}catch{return initial;}});
 function save(next){setValue(next);try{localStorage.setItem(key,JSON.stringify(next));setError('');}catch{setError('Seu navegador não permitiu salvar. O progresso continua disponível nesta sessão.');}}
 return [value,save,error];
}