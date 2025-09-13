import "bootstrap";
import "./style.css";
/**
 *  Datos de excusas organizados por categoría.
 *  Cada categoía contienen sujetos (who), acciones (action), objeos (what), tiempos (when) y reglas para validar combinaciones.
 */

const excusas = {
  school: {
    who: ['El perro', 'Mi abuela', 'El cartero', 'Mi papá'], 
    action: ['se comió', 'orinó en', 'rompió', 'aplastó'], 
    what: ['mi tarea', 'mi celular', 'el coche', 'la computadora'], 
    when: ['antes de clase', 'mientras dormía', 'durante el almuerzo', 'cuando estaba rezando'],
    rules: {
      whoAction: {
        'El perro': ['se comió', 'orinó en'],
        'Mi abuela': ['rompió', 'aplastó'],
        'El cartero': ['se comió', 'rompió'],
        'Mi papá': ['aplastó', 'orinó en']
      },
      actionWhat: {
        'se comió': ['mi tarea', 'mi celular', 'el coche'],
        'orinó en': ['mi tarea', 'la computadora'],
        'rompió': ['mi celular', 'la computadora', 'el coche'],
        'aplastó': ['el coche', 'mi tarea']
      }
    }
  },
  work: {
    who: ['El jefe', 'La impresora', 'El colega'],
    action: ['perdió', 'no envió', 'rompió'],
    what: ['el informe', 'el correo', 'los documentos'],
    when: ['ayer', 'justo antes de la reunión', 'durante el almuerzo'],
    rules: {
      whoAction: {
        'El jefe': ['perdió', 'no envió'],
        'La impresora': ['rompió', 'no envió'],
        'El colega': ['perdió', 'rompió']
      },
      actionWhat: {
        'perdió': ['el informe', 'los documentos'],
        'no envió': ['el correo', 'los documentos'],
        'rompió': ['la impresora', 'los documentos']
      }
    }
  },
  home: {
    who: ['Mi hermano', 'La lavadora', 'El gato'],
    action: ['mojó', 'rompió', 'tiró'],
    what: ['mi ropa', 'el mando a distancia', 'la toalla'],
    when: ['anoche', 'esta mañana', 'cuando estaba cocinando'],
    rules: {
      whoAction: {
        'Mi hermano': ['mojó', 'tiró'],
        'La lavadora': ['mojó', 'rompió'], 
        'El gato': ['tiró', 'rompió']
      },
      actionWhat: {
        'mojó': ['mi ropa', 'la toalla'],
        'rompió': ['el mando a distancia', 'la toalla'],
        'tiró': ['el mando a distancia', 'la toalla']
      }
    }
  }

};


  
//Devuelve un elemento aleatorio de un array dado.
 
function obtenerElementoAleatorio(arr) { //
  return arr[Math.floor(Math.random() * arr.length)];
}

/**  
 * Genera una excusa válida de acuerdo a la categoría seleccionada.
 * Si se selecciona 'all', escoge una categoría aleatoria.
 */
function generarExcusa(categoria) {
  if (categoria === 'all') {
    const categorias = Object.keys(excusas);
    categoria = obtenerElementoAleatorio(categorias);
  }

  const { who, when, rules } = excusas[categoria];
  let whoSeleccionado, actionSeleccionado, whatSeleccionado;

  // Elegir una combinación válida usando la reglas
  do {
    whoSeleccionado = obtenerElementoAleatorio(who); //
    actionSeleccionado = obtenerElementoAleatorio(rules.whoAction[whoSeleccionado]);
    whatSeleccionado = obtenerElementoAleatorio(rules.actionWhat[actionSeleccionado]);
  } while (!whoSeleccionado || !actionSeleccionado || !whatSeleccionado);

  const whenSeleccionado = obtenerElementoAleatorio(when);

  return `${whoSeleccionado} ${actionSeleccionado} ${whatSeleccionado} ${whenSeleccionado}.`;
}

window.onload = function () {
  const excusaElemento = document.getElementById('excuse');
  const botonGenerar = document.getElementById('generate-btn');
  const selectCategoria = document.getElementById('category-select');

  // Mostrar excusa inicial (con la categoría seleccionada)
  excusaElemento.textContent = generarExcusa(selectCategoria.value);

  // Actualizar excusa al hacer click en el botón
  botonGenerar.addEventListener('click', () => {
    excusaElemento.textContent = generarExcusa(selectCategoria.value);
  });
};

