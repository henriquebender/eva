module.exports={
 darkMode:['class'],content:['./index.html','./src/**/*.{ts,tsx,js,jsx}'],
 theme:{extend:{
 opacity:Object.fromEntries(Array.from({length:101},(_,i)=>[i,String(i/100)])),
 borderRadius:{lg:'var(--radius)',md:'calc(var(--radius) - 2px)',sm:'calc(var(--radius) - 4px)'},
 colors:{
 ...Object.fromEntries(['background','foreground','border','input','ring'].map(k=>[k,'hsl(var(--'+k+'))'])),
 ...Object.fromEntries(['card','popover','primary','secondary','muted','accent','destructive'].map(k=>[k,{DEFAULT:'hsl(var(--'+k+'))',foreground:'hsl(var(--'+k+'-foreground))'}])),
 chart:Object.fromEntries([1,2,3,4,5].map(k=>[k,'hsl(var(--chart-'+k+'))'])),
 eva:{green:'#14AA78',teal:'#16B8C6',solar:'#FFD43B',ink:'#252629',deep:'#0a5f45'},
 ink:{DEFAULT:'#252629',soft:'#4d5257'},mint:'#EEF9F4',mist:'#F5F8F7',hair:'#E4EBE8',
 sidebar:{DEFAULT:'hsl(var(--sidebar-background))',foreground:'hsl(var(--sidebar-foreground))',primary:'hsl(var(--sidebar-primary))','primary-foreground':'hsl(var(--sidebar-primary-foreground))',accent:'hsl(var(--sidebar-accent))','accent-foreground':'hsl(var(--sidebar-accent-foreground))',border:'hsl(var(--sidebar-border))',ring:'hsl(var(--sidebar-ring))'}},
 fontFamily:{heading:['var(--font-heading)'],body:['var(--font-body)'],display:['var(--font-display)'],mono:['var(--font-mono)']},
 keyframes:{'accordion-down':{from:{height:'0'},to:{height:'var(--radix-accordion-content-height)'}},'accordion-up':{from:{height:'var(--radix-accordion-content-height)'},to:{height:'0'}}},
 animation:{'accordion-down':'accordion-down 0.2s ease-out','accordion-up':'accordion-up 0.2s ease-out'}
 }},plugins:[require('tailwindcss-animate')]
};