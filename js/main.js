//Находим элементы на странице
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')
const removeDoneTasks = document.querySelector('#removeDoneTasks')
const focusTask = document.querySelector('.task-item')
const checkedAllTask = document.querySelector('#checkedAll')

let tasks = []


if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'))
	tasks.forEach((task) => renderTask(task))
}
checkEmptyList()

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)
tasksList.addEventListener('click', importantTask)
removeDoneTasks.addEventListener('click', removeDoneTask)
checkedAllTask.addEventListener('click', chackedAllTasks)

// Функции
function addTask(event) {
	// Отменяем отправку формы(перезагрузка страницы)
	event.preventDefault()
	if (taskInput.value.trim() === '') return

	//Достаем текст задачи из поля ввода
	const taskText = taskInput.value

	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
		important: false
	}

	//Добавляем задачу в массив с задачами
	tasks.push(newTask)

	//Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage()

	renderTask(newTask)


	//Очищаем поле ввода и возвращаем на него фокус
	taskInput.value = ''
	taskInput.focus()
	checkEmptyList()

}

function doneTask(event) {
	//Проверяем если клик был НЕ по кнопке 'Задача выполнена'
	if (event.target.dataset.action !== 'done') return

	//Проверяем если клик был по кнопке 'Задача выполнена'
	const parentNode = event.target.closest('.list-group-item')

	//Определяем Id задачи
	const id = Number(parentNode.id)

	//Сокращенная запись 
	/**
	 * const task = tasks.find((task) => task.id === id)
	 */
	const task = tasks.find((task) => {
		if (task.id === id) {
			return true
		}
	})

	task.done = !task.done

	//Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage()

	const taskTitle = parentNode.querySelector('.task-title')
	taskTitle.classList.toggle('task-title--done')

}

function deleteTask(event) {
	//Проверяем если клик был НЕ по кнопке 'Удалить задачу'
	if (event.target.dataset.action !== 'delete') return

	//Проверяем если клик был по кнопке 'Удалить задачу'
	const parenNode = event.target.closest('.list-group-item')

	//Определяем ID задачи 
	const id = Number(parenNode.id)

	//Находим индекс задачи в массиве
	/**
	 * Короткая запись
	 * const index = tasks.findIndex((task) => task.id === id)
	 */

	/**
		* const index = tasks.findIndex((task) => {
	 * if (task.id === id) {
	 * return true
	 * }
	 })
	*/

	//Удаляем задачу из массива с задачами
	// tasks.splice(index, 1)

	//Удаляем задачу через фильтрацию массива

	/**
	 * Короткая запись
	 * tasks = tasks.filter((task) => task.id !== id)
	 */
	tasks = tasks.filter((task) => {
		if (task.id === id) {
			return false
		} else {
			return true
		}
	})

	//Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage()

	//Удаляем задачу из разметки
	parenNode.remove()
	checkEmptyList()


}

function removeDoneTask() {
	const removeTask = tasks.filter((el) => el.done !== true)
	tasks = removeTask

	saveToLocalStorage()
	location.reload()
}

function chackedAllTasks() {
	const checkedTask= tasks.filter((el)=> el.done = true)
	tasks = checkedTask

	saveToLocalStorage()
	location.reload()
	console.log(checkedTask)
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `
			<li id="emptyList" class="list-group-item empty-list">
				<img src="./img/task.svg" alt="Empty" width="48" class="mt-3">
				<div class="empty-list__title">Список пуст, ему грустно:(</div>
			</li>
		`
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
	}

	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList')
		emptyListEl ? emptyListEl.remove() : null
	}
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	//Формируем CSS класс
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title'
	const cssClassImportant = task.important ? 'task-title important' : 'task-title'
	// Формируем разметку для новой задачи
	const taskHTML = `
	<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass} ${cssClassImportant}">${task.text}</span>
					<div class="task-item__buttons">
					<button type="button" data-action="important" class="btn-action btn-important">
					<img src="./img/iconmonstr-warning-thin.svg" alt="Done" width="18" height="18">
					</button>
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
	tasksList.insertAdjacentHTML('beforeend', taskHTML)
}
function importantTask(event) {
	//Проверяем если клик был НЕ по кнопке 'Задача выполнена'
	if (event.target.dataset.action !== 'important') return

	//Проверяем если клик был по кнопке 'Задача выполнена'
	const importantTask = event.target.closest('.list-group-item')

	//Определяем Id задачи
	const id = Number(importantTask.id)

	//Сокращенная запись 
	/**
	 * const task = tasks.find((task) => task.id === id)
	 */
	const task = tasks.find((task) => {
		if (task.id === id) {
			return true
		}
	})

	task.important = !task.important

	//Сохраняем список задач в хранилище браузера localStorage
	saveToLocalStorage()

	const taskTitle = importantTask.querySelector('.task-title')
	taskTitle.classList.toggle('important')
}

