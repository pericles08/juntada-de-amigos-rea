from pathlib import Path
from html import escape
out=Path('pizza-party-rea/assets')
def text(x,y,t,size=24,color='#234753'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}">{escape(t)}</text>'
def box(x,y,w,h,fill='#deeaec'):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{fill}"/>'
def pizza(x,y,r=54):
 import math
 s=f'<circle cx="{x}" cy="{y}" r="{r}" fill="#e6bd58" stroke="#705b35" stroke-width="4"/>'
 for i in range(8):
  a=i*math.pi/4;s+=f'<path d="M{x} {y} L{x+r*math.cos(a)} {y+r*math.sin(a)}" stroke="#705b35" stroke-width="2"/>'
 return s
scenes=[]
s=text(28,42,'¿Qué sabemos? ¿Qué buscamos?',27)+pizza(95,143)+text(174,125,'Una pizza: 8 porciones')+text(174,165,'Una persona: 3 porciones')
s+=box(24,230,552,140)+text(44,268,'DATOS',18)+text(44,305,'Personas · Precio de cada pizza')+text(44,345,'BUSCAMOS: pizzas y costo total',22)
scenes.append(s)
s=text(28,42,'Cada paso usa el anterior',28)
for i,(title,sub) in enumerate([('1. Leer','personas y precio'),('2. Calcular','porciones, pizzas y costo'),('3. Mostrar','pizzas y presupuesto')]):
 y=72+i*105;s+=box(24,y,552,88, ['#deeaec','#eee3cc','#e0e9df'][i])+text(44,y+34,title)+text(44,y+65,sub,21)
scenes.append(s)
s=text(28,42,'Una variable guarda un valor',28)+box(24,75,552,80,'#234753')+text(44,122,'porciones = personas × 3',25,'#ffffff')
for x,label,value in [(24,'personas','8'),(318,'porciones','24')]:
 s+=box(x,185,258,145)+text(x+22,224,label,23)+text(x+22,295,value,54)
s+=text(28,380,'Si personas cambia, recalculamos.',23);scenes.append(s)
s=text(28,42,'Probá cerca de un cambio',28)
for y,n,por,piz in [(78,8,24,3),(226,9,27,4)]:
 s+=box(24,y,552,126,'#deeaec' if n==8 else '#eee3cc')+text(42,y+34,f'{n} personas · {por} porciones',24)
 for i in range(piz):s+=pizza(66+i*90,y+83,27)
 s+=text(424,y+88,f'{piz} pizzas',23)
s+=text(28,394,'Una persona más necesita otra pizza.',22);scenes.append(s)
s=text(28,42,'La misma cuenta, otro lenguaje',27)
s+=box(24,78,552,110)+text(44,112,'PSEUDOCÓDIGO EDUCATIVO',18)+text(44,156,'porciones = personas × 3',25)
s+=box(24,218,552,110,'#234753')+text(44,252,'PYTHON',18,'#c7dde1')+text(44,296,'porciones = personas * 3',25,'white')+text(28,385,'En Python, * significa multiplicar.',23);scenes.append(s)
s=text(28,42,'Mirar lo que cambió',28)
for y,title,body in [(76,'Mi primera idea','¿Qué pensé al comenzar?'),(182,'Lo que probé','¿Qué resultado me hizo revisar?'),(288,'Mi nueva explicación','¿Qué haría en otro problema?')]:
 s+=box(24,y,552,88)+text(44,y+35,title,24)+text(44,y+67,body,21)
scenes.append(s)
for i,s in enumerate(scenes,1):
 (out/f'estacion-{i}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420"><rect width="600" height="420" rx="16" fill="#f4f2ec"/><g font-family="Arial, sans-serif">{s}</g></svg>',encoding='utf-8')
p=Path('pizza-party-rea/js/app.js');s=p.read_text(encoding='utf-8')
s=s.replace('<span class="station-arrow" aria-hidden="true">→</span>','').replace('Mi portafolio →','Mi portafolio').replace('class="portfolio-link"','class="btn secondary portfolio-link"').replace('← Volver a las estaciones','Ver las estaciones').replace('← Inicio','Volver al inicio').replace('↑ Subir','Subir').replace('↓ Bajar','Bajar')
s=s.replace('>← Estación ${prev.id}</a>','>Anterior: ${prev.title}</a>').replace('>Estación ${next.id} →</a>','>Siguiente: ${next.title}</a>')
s=s.replace('<div class="breadcrumbs"><a ', '<div class="breadcrumbs"><a class="btn secondary" ')
s=s.replace('<section class="panel"><h2>Para pensar</h2>','<section class="panel">${stationVisual(s.id)}<h2>Para pensar</h2>')
idx=s.index('function station(s)')
s=s[:idx]+'''const visualDescriptions = [
 'Una pizza tiene ocho porciones y cada persona necesita tres. Los datos son la cantidad de personas y el precio; buscamos pizzas y costo total.',
 'Secuencia: primero leer personas y precio; después calcular porciones, pizzas y costo; al final mostrar pizzas y presupuesto.',
 'Ejemplo de variable: personas vale 8. Al calcular personas por 3, porciones guarda 24. Si cambia personas, hay que recalcular.',
 'Comparación de pruebas: 8 personas necesitan 24 porciones y 3 pizzas. 9 personas necesitan 27 porciones y 4 pizzas.',
 'Comparación de una multiplicación: en notación educativa usamos el signo de multiplicar; en Python usamos el asterisco. No es una ejecución.',
 'Tres momentos para reflexionar: mi primera idea, lo que probé y mi nueva explicación.'
];
function stationVisual(id){return `<figure class="learning-figure"><img src="assets/estacion-${id}.svg" width="600" height="420" alt="${visualDescriptions[id-1]}"><figcaption>${['Los datos del problema','El orden de las operaciones','Ejemplo: seguir el valor de una variable','Dos casos para comparar','Una operación en dos representaciones','Revisar el propio recorrido'][id-1]}</figcaption></figure>`;}
'''+s[idx:]
# Make the station index a real destination rather than rerendering the full home.
s=s.replace("if(route==='inicio'||route==='estaciones'){html=home()}","if(route==='inicio'){html=home()}else if(route==='estaciones'){html=simplePage('Las seis estaciones',`<ol class=\"station-list\">${stations.map(card).join('')}</ol><a class=\"btn secondary portfolio-link\" href=\"#portafolio\">Mi portafolio</a>`)}")
p.write_text(s,encoding='utf-8')
p=Path('pizza-party-rea/index.html');s=p.read_text(encoding='utf-8').replace('Menú <span aria-hidden="true">☰</span>','Menú de navegación').replace('data-route="portafolio">Portafolio','data-route="portafolio">Mi portafolio');p.write_text(s,encoding='utf-8')
