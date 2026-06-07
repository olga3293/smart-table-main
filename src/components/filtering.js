import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {    
                            // @todo: создать и вернуть тег опции                    // используйте name как значение и текстовое содержимое
                           const element = document.createElement('option');
                           element.textContent = name;
                           element.value = name;
                           return element;
                      }),
        );
     });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            const inputElem = parent.querySelector('input');
            const field = action.dataset.field;

            inputElem.value = '';
            state[field] = '';
        }

        state.total = [state.totalFrom, state.totalTo]; 

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}