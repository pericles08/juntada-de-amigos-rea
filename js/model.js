'use strict';
(function(root){
  const blocks = ['Leer participantes y precio de una pizza', 'Calcular porciones necesarias: participantes × 3', 'Calcular pizzas: redondear hacia arriba porciones ÷ 8', 'Calcular costo: pizzas × precio', 'Mostrar pizzas y costo'];
  function initial(){return {version:2,people:'10',price:'8000',ideas:'',reflection:'',order:[0,3,1,4,2],checked:false,pseudo:'',python:'',testNotes:'',prediction:'',testReport:''};}
  function calculate(people,price){
    if(String(people).trim()==='' || String(price).trim()==='') throw Error('Completá participantes y precio.');
    const n=Number(people), p=Number(price);
    if(!Number.isInteger(n)||n<1||n>10000) throw Error('Usá entre 1 y 10000 participantes, sin decimales.');
    if(!Number.isFinite(p)||p<=0||p>10000000) throw Error('El precio debe ser mayor que cero y no superar 10000000.');
    const portions=n*3, pizzas=Math.ceil(portions/8);
    return {portions,pizzas,left:pizzas*8-portions,cost:Math.round(pizzas*p*100)/100};
  }
  function validate(s){
    if(!s||s.version!==2||typeof s.people!=='string'||typeof s.price!=='string'||s.people.length>30||s.price.length>30||typeof s.ideas!=='string'||s.ideas.length>10000||typeof s.reflection!=='string'||s.reflection.length>10000||!Array.isArray(s.order)||s.order.length!==5||new Set(s.order).size!==5||s.order.some(x=>!Number.isInteger(x)||x<0||x>4)||typeof s.checked!=='boolean') throw Error('El archivo no es un respaldo válido de esta etapa.');
    const extras={};for(const key of ['pseudo','python','testNotes','prediction','testReport']){if(s[key]!==undefined&&(typeof s[key]!=='string'||s[key].length>10000))throw Error('Contenido del respaldo no válido.');extras[key]=s[key]||'';}
    return {...extras,version:2,people:s.people,price:s.price,ideas:s.ideas,reflection:s.reflection,order:[...s.order],checked:s.checked};
  }
  const api={blocks,initial,calculate,validate};
  root.PizzaModel=api;
  if(typeof module!=='undefined') module.exports=api;
})(globalThis);
