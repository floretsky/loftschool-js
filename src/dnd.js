/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

homeworkContainer.style.width = '100vw';
homeworkContainer.style.height = '100vh';

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const newDiv = document.createElement('div'),
        randomColor = Math.floor(Math.random()*16777215).toString(16),
        randomWidth = Math.random() * 101,
        randomHeight = Math.random() * 101,
        top = Math.random() * 101,
        left = Math.random() * 101;

    newDiv.classList.add('draggable-div');
    newDiv.style.background = `#${randomColor}`;
    newDiv.style.width = `${randomWidth}%`;
    newDiv.style.height = `${randomHeight}%`;
    newDiv.style.position = 'absolute';
    newDiv.style.top = `${top}%`;
    newDiv.style.left = `${left}%`;
    newDiv.draggable = true;

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('dragstart', (e) => {
        var style = window.getComputedStyle(e.target, null);
        e.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"),10) - e.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - e.clientY));
    })

    document.body.addEventListener('dragover', (e) => {
        e.preventDefault();
    })

    document.body.addEventListener('drop', (e) => {
        var offset = e.dataTransfer.getData("text/plain").split(',');
        var dm = document.querySelector('.draggable-div');
        dm.style.left = (e.clientX + parseInt(offset[0],10)) + 'px';
        dm.style.top = (e.clientY + parseInt(offset[1],10)) + 'px';
        e.preventDefault();
        return false;
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
