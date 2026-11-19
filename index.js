let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const itemTemplate = document.getElementById("to-do__item-template");

const STORAGE_KEY = "to-do-tasks";

function loadTasks() {
	const savedTasks = localStorage.getItem(STORAGE_KEY);
	if (savedTasks) {
		return JSON.parse(savedTasks);
	}
	return items;
}

function createItem(item) {
	const clone = itemTemplate.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", function () {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener("click", function () {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener("click", function () {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", function () {
		textElement.setAttribute("contenteditable", "false");
		items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemsNamesElements.forEach((element) => {
		tasks.push(element.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

formElement.addEventListener("submit", function (event) {
	event.preventDefault();
	const newItem = createItem(inputElement.value);
	listElement.prepend(newItem);
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = "";
});

items = loadTasks();

items.forEach((item) => {
	const element = createItem(item);
	listElement.append(element);
});
