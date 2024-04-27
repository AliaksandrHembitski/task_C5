// находим элементы HTML файла
const formBox = document.querySelector('.p_box')
const btn = document.querySelector('.form_button')
const imgBox = document.querySelector('.img_box')
const btnRestart = document.querySelector('.form_button_restart')
// функция обновления страницы
function otherwise() {
	formBox.style.display = 'block'
	setTimeout(function () {
		location.reload()
	}, 3000)
}
// функция проверки вводимых данных
function checkingPrameter(param) {
	param = Number(param.value)

	if (!isNaN(param) && Number.isInteger(param)) {
		if (99 < param && param < 301) {
			return param
		}
	}
}
// функция отправки запроса
function sendRequest(width, height) {
	let url = `https://picsum.photos/${width}/${height}`

	return fetch(url)
		.then(response => {
			return response.url
		})
		.catch(() => {
			console.log('error')
		})
}

// отслеживание клика по кнопке "отправить"
btn.addEventListener('click', async () => {
	let width = document.querySelector('.j-form_input_width')
	let height = document.querySelector('.j-form_input_height')
	width = checkingPrameter(width)
	height = checkingPrameter(height)
	if (width && height) {
		const imgs = document.querySelector('.img_box')
		const div = document.createElement('div')
		const img = document.createElement('img')
		img.src = await sendRequest(width, height)
		div.className = 'card'
		img.setAttribute('style', `width:${width}px; height:${height}px`)
		div.append(img)
		imgs.append(div)
	} else {
		otherwise()
	}
})
// отслеживание клика по кнопке "обновить"
btnRestart.addEventListener('click', () => {
	setTimeout(function () {
		location.reload()
	}, 200)
})
