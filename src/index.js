/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }

    return result;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var index = 0; 

    if (!initial) {
        initial = array[0];
        index = 1;
    }

    for (let i = index; i < array.length; i++) {
        initial = fn(initial, array[i], i, array);
    }

    return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    const newArray = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newArray.push(key.toUpperCase());
        }
    }

    return newArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    const newArray = [], 
        absoluteFrom = Math.abs(from), 
        absoluteTo = Math.abs(to);

    if (from < 0) {
        absoluteFrom < array.length ? from = array.length + from : from = 0
    } else if (absoluteFrom > array.length) {
        absoluteFrom < array.length ? from = 0 : from = array.length
    }

    if (to < 0) {
        to = array.length + to;
    } else if (absoluteTo > array.length) {
        to = array.length
    }

    if (from < to) {
        for (let i = from; i < to; i++) {
            newArray.push(array[i]);
        }
    }

    return newArray;
}

/* let array = [1, 2, 3, 4, 5, 6, 7];
console.log(slice(array,9999));  */

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let handler = {
        set: function(target, name) {
            return target[name] * target[name];
        }
    };

    var newObject = new Proxy(obj, handler);

    return newObject;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
