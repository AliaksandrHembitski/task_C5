// находим элементы HTML файла
const pBox = document.querySelector('.p_box')
const btn = document.querySelector('.form_button')
const btnRestart = document.querySelector('.form_button_restart')
const page = document.querySelector('.j-form_input_page')
const limit = document.querySelector('.j-form_input_limit')
const imgs = document.querySelector('.img_box')

// функция обновления страницы
function otherwise() {
	pBox.style.display = 'block'
	setTimeout(function () {
		location.reload()
	}, 1000)
}
// функция проверки вводимых данных
function checkingPrameter(param) {
	param = Number(param.value)
	if (!isNaN(param) && Number.isInteger(param)) {
		if (0 < param && param < 11) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}
// функция отправки запроса
async function sendRequest(page, limit) {
	let url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`

	try {
		const response = await fetch(url)
		let result = await response.json()
		return result
	} catch {
		console.log('error')
	}
}

// отслеживание клика по кнопке "отправить"
btn.addEventListener('click', async () => {
	let pageValue = checkingPrameter(page)
	let limitValue = checkingPrameter(limit)
	if (pageValue && limitValue) {
		let result = await sendRequest(page.value, limit.value)
		result.forEach(element => {
			const imgs = document.querySelector('.img_box')
			const div = document.createElement('div')
			const img = document.createElement('img')
			img.src = element.download_url
			div.className = 'card'
			div.append(img)
			imgs.append(div)
		})
	} else {
		pBox.style.display = 'block'
		if (!pageValue && limitValue) {
			pBox.innerHTML += 'Номер страницы вне диапазона от 1 до 10.'
		} else if (pageValue && !limitValue) {
			pBox.innerHTML += 'Лимит вне диапазона от 1 до 10.'
		} else {
			pBox.innerHTML += 'Номер страницы и лимит вне диапазона от 1 до 10.'
		}
	}
})
// отслеживание клика по кнопке "обновить"
btnRestart.addEventListener('click', () => {
	setTimeout(function () {
		location.reload()
	}, 200)
})
