import "bootstrap";
import "./style.css";

const excusas = {
  // Categoría "school" con listas de sujetos, acciones, objetos y tiempos
  school: {
    who: ['El perro', 'Mi abuela', 'El cartero', 'Mi papá'], // Quién causa la excusa
    action: ['se comió', 'orinó en', 'rompió', 'aplastó'], // Acción realizada
    what: ['mi tarea', 'mi celular', 'el coche', 'la computadora'], // Qué fue afectado
    when: ['antes de clase', 'mientras dormía', 'durante el almuerzo', 'cuando estaba rezando'], // Momento en que ocurrió
    rules: {
      // Reglas que relacionan quién puede hacer qué acción (para evitar combinaciones ilógicas)
      whoAction: {
        'El perro': ['se comió', 'orinó en'],
        'Mi abuela': ['rompió', 'aplastó'],
        'El cartero': ['se comió', 'rompió'],
        'Mi papá': ['aplastó', 'orinó en']
      },
      // Reglas que relacionan qué acción puede aplicarse a qué objeto
      actionWhat: {
        'se comió': ['mi tarea', 'mi celular', 'el coche'],
        'orinó en': ['mi tarea', 'la computadora'],
        'rompió': ['mi celular', 'la computadora', 'el coche'],
        'aplastó': ['el coche', 'mi tarea']
      }
    }
  },

  // Categoría "work" con sus propios sujetos, acciones, objetos, tiempos y reglas
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

  // Categoría "home" con sus propios datos y reglas
  home: {
    who: ['Mi hermano', 'La lavadora', 'El gato'],
    action: ['mojó', 'rompió', 'tiró'],
    what: ['mi ropa', 'el mando a distancia', 'la toalla'],
    when: ['anoche', 'esta mañana', 'cuando estaba cocinando'],
    rules: {
      whoAction: {
        'Mi hermano': ['mojó', 'tiró'],
        'La lavadora': ['mojó', 'rompió'], // Nota: La lavadora no "tira", por eso no está esa opción aquí
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


// Función para escoger un elemento aleatorio de un array
function aleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Función para generar excusa con reglas
function generarExcusa(categoria) {
  if (categoria === 'all') {
    const categorias = Object.keys(excusas);
    categoria = aleatorio(categorias);
  }

  let whoArr = excusas[categoria].who;
  let actionArr = excusas[categoria].action;
  let whatArr = excusas[categoria].what;
  let whenArr = excusas[categoria].when;
  let rules = excusas[categoria].rules;

  let whoSeleccionado, actionSeleccionado, whatSeleccionado;

  // Elegir una combinación válida
  do {
    whoSeleccionado = aleatorio(whoArr);
    actionSeleccionado = aleatorio(rules.whoAction[whoSeleccionado]);
    whatSeleccionado = aleatorio(rules.actionWhat[actionSeleccionado]);
  } while (!whoSeleccionado || !actionSeleccionado || !whatSeleccionado);

  let whenSeleccionado = aleatorio(whenArr);

  return `${whoSeleccionado} ${actionSeleccionado} ${whatSeleccionado} ${whenSeleccionado}.`;
}

window.onload = function () {
  const excusaElemento = document.getElementById('excuse');
  const boton = document.getElementById('generate-btn');
  const select = document.getElementById('category-select');

  // Mostrar excusa inicial (con la categoría seleccionada)
  excusaElemento.innerHTML = generarExcusa(select.value);

  // Actualizar excusa al hacer click en el botón
  boton.addEventListener('click', () => {
    excusaElemento.innerHTML = generarExcusa(select.value);
  });
};

