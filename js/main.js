//Находим элементы на странице
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')


form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

// Функции
function addTask(event) {
	// Отменяем отправку формы(перезагрузка страницы)
	event.preventDefault()

	//Достаем текст задачи из ввода
	taskText = taskInput.value

	// Формируем разметку для новой задачи
	const taskHtml = `
	<li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
	`
	//Добавляем задачу на страницу
	tasksList.insertAdjacentHTML('beforeend', taskHtml)

	//Очищаем поле ввода и возвращаем на него фокус
	taskInput.value = ''
	taskInput.focus()

	//Скрываем надпись 'список дел пуст' если в списке задач болле одного элемента
	if (tasksList.children.length > 1) {
		emptyList.classList.add('none')
	}
}

function doneTask(event) {
	//Проверяем если клик был НЕ по кнопке 'Задача выполнена'
	if (event.target.dataset.action !== 'done') return

	//Проверяем если клик был НЕ по кнопке 'Задача выполнена'
	const parentNode = event.target.closest('.list-group-item')
	const taskTitle = parentNode.querySelector('.task-title')
	taskTitle.classList.toggle('task-title--done')
	console.log(taskTitle);
}

function deleteTask(event) {
	//Проверяем если клик был НЕ по кнопке 'Удалить задачу'
	if (event.target.dataset.action !== 'delete') return
	//Проверяем если клик был по кнопке 'Удалить задачу'
	const parenNode = event.target.closest('.list-group-item')
	parenNode.remove()

	//Показываем надпись 'список дел пуст' если в списке задач менее одного элемента
	if (tasksList.children.length === 1) {
		emptyList.classList.remove('none')
	}
}



