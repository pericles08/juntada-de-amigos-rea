'use strict';
(function(root){
 const example='Algoritmo JuntadaDePizzas\n    Definir personas, porciones, pizzas Como Entero;\n    Definir precio, costo Como Real;\n    Leer personas;\n    Leer precio;\n    porciones <- personas * 3;\n    pizzas <- TRUNC((porciones + 7) / 8);\n    costo <- pizzas * precio;\n    Escribir "Pizzas: ", pizzas;\n    Escribir "Costo: ", costo;\nFinAlgoritmo';
 const python='from math import ceil\n\n# personas y precio vienen de los datos del problema\nporciones = personas * 3\npizzas = ceil(porciones / 8)\ncosto = pizzas * precio\nprint("Pizzas:", pizzas)\nprint("Costo:", costo)';
 function expression(source,vars){
  source=source.toLowerCase();
  const tokens=source.match(/\d+(?:\.\d+)?|[a-zA-Z_][a-zA-Z_0-9]*|[()+*/-]/g)||[];
  if(tokens.join('')!==source.replace(/\s/g,''))throw Error('Expresión no admitida. Usá números, variables, +, -, *, / y TRUNC().');
  let i=0;
  function atom(){const t=tokens[i++];if(t==='-')return -atom();if(t==='+')return atom();if(t==='('){const n=sum();if(tokens[i++]!==')')throw Error('Falta cerrar un paréntesis.');return n;}if(t==='trunc'){if(tokens[i++]!=='(')throw Error('Usá TRUNC(expresión).');const n=sum();if(tokens[i++]!==')')throw Error('Falta cerrar TRUNC().');return Math.trunc(n);}if(/^\d/.test(t||''))return Number(t);if(t&&Object.hasOwn(vars,t))return vars[t];throw Error(`Variable sin valor o expresión incompleta: ${t||'fin de línea'}.`);}
  function product(){let n=atom();while(tokens[i]==='*'||tokens[i]==='/'){const op=tokens[i++],v=atom();if(op==='/'&&v===0)throw Error('No se puede dividir por cero.');n=op==='*'?n*v:n/v;}return n;}
  function sum(){let n=product();while(tokens[i]==='+'||tokens[i]==='-'){const op=tokens[i++],v=product();n=op==='+'?n+v:n-v;}return n;}
  const n=sum();if(i!==tokens.length||!Number.isFinite(n))throw Error('Expresión incompleta o resultado fuera de rango.');return n;
 }
 function run(code,inputs){
  if(code.length>10000)throw Error('El programa supera 10000 caracteres.');
  const vars=Object.create(null),types=Object.create(null),trace=[],output=[];
  const lines=code.split(/\r?\n/);if(lines.length>150)throw Error('Usá hasta 150 líneas.');
  let opened=false,closed=false,closing='';
  const reserved=new Set(['algoritmo','finalgoritmo','proceso','finproceso','definir','como','entero','real','leer','escribir','trunc','si','entonces','sino','finsi','para','mientras','segun','repetir','hasta','y','o','no','verdadero','falso','constructor','prototype','__proto__']);
  function assign(name,value){if(!Object.hasOwn(types,name))throw Error(`Definí ${name} antes de usarla.`);if(!Number.isFinite(value))throw Error('El valor debe ser numérico y finito.');if(types[name]==='entero'&&!Number.isInteger(value))throw Error(`${name} es Entero y recibió un valor con decimales.`);vars[name]=value;}
  function clean(line){let quoted=false;for(let j=0;j<line.length;j++){if(line[j]==='"')quoted=!quoted;if(!quoted&&line.slice(j,j+2)==='//')return line.slice(0,j);}return line;}
  function parts(text){let quoted=false,depth=0,start=0,result=[];for(let j=0;j<text.length;j++){if(text[j]==='"')quoted=!quoted;if(!quoted){if(text[j]==='(')depth++;if(text[j]===')')depth--;if(text[j]===','&&depth===0){result.push(text.slice(start,j).trim());start=j+1;}}}if(quoted)throw Error('Falta cerrar una comilla.');result.push(text.slice(start).trim());return result;}
  for(let i=0;i<lines.length;i++){const line=clean(lines[i]).trim().replace(/;\s*$/,'').trim();if(!line)continue;try{let m;
   if(!opened){m=/^(Algoritmo|Proceso)\s+([a-z][a-z0-9_]*)$/i.exec(line);if(!m)throw Error('Comenzá con Algoritmo JuntadaDePizzas. Si tenés código de la versión anterior, conservá un respaldo y adaptalo con la ayuda.');opened=true;closing=m[1].toLowerCase()==='algoritmo'?'finalgoritmo':'finproceso';continue;}
   if(closed)throw Error('Hay instrucciones después del cierre del algoritmo.');
   if(line.toLowerCase()===closing){closed=true;continue;}
   if(m=/^Definir\s+(.+)\s+Como\s+(Entero|Real)$/i.exec(line)){for(const raw of m[1].split(',')){const name=raw.trim().toLowerCase();if(!/^[a-z][a-z0-9_]*$/.test(name)||reserved.has(name))throw Error('Nombre de variable no admitido.');if(Object.hasOwn(types,name))throw Error(`La variable ${name} ya está definida.`);types[name]=m[2].toLowerCase();}continue;}
   if(m=/^Leer\s+(.+)$/i.exec(line)){for(const raw of m[1].split(',')){const name=raw.trim().toLowerCase();if(!['personas','precio'].includes(name))throw Error('En este recurso Leer solo toma personas y precio de los datos compartidos.');assign(name,inputs[name]);}}
   else if(m=/^Escribir\s+(.+)$/i.exec(line)){output.push(parts(m[1]).map(part=>/^"[^"\n]*"$/.test(part)?part.slice(1,-1):String(expression(part,vars))).join(''));}
   else if(m=/^([a-z][a-z0-9_]*)\s*<-\s*(.+)$/i.exec(line)){assign(m[1].toLowerCase(),expression(m[2],vars));}
   else throw Error('Instrucción no admitida. Usá Definir, Leer, asignación con <- o Escribir. No se admiten decisiones ni repeticiones.');
   trace.push({line:i+1,instruction:line,vars:{...vars},output:[...output]});
  }catch(e){throw Error(`Línea ${i+1}: ${e.message}`);}}
  if(!opened)throw Error('Escribí al menos una instrucción dentro de Algoritmo y FinAlgoritmo.');
  if(!closed)throw Error(`Falta ${closing==='finalgoritmo'?'FinAlgoritmo':'FinProceso'}.`);
  if(!trace.length)throw Error('Agregá instrucciones entre el inicio y el cierre.');return {vars:{...vars},trace,output};
 }
 root.PizzaLearning={example,python,run,expression};if(typeof module!=='undefined')module.exports=root.PizzaLearning;
})(globalThis);
