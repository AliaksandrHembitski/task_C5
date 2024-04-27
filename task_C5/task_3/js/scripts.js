// находим элементы HTML файла
const formBox = document.querySelector('.p_box')
const btn = document.querySelector('.form_button')
let imgBox = document.querySelector('.img_box')
// функция перезапуска страницы
function otherwise() {
	formBox.style.display = 'block'
	setTimeout(function () {
		location.reload()
	}, 3000)
}
// функция запроса и добавления элемента в HTML
function sendRequest(method, url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open(method, url)
		xhr.responseType = 'json'

		xhr.onload = () => {
			if (xhr.status != 200) {
				reject(xhr.response)
			} else {
				resolve(
					xhr.response.forEach(e => {
						const imgs = document.querySelector('.img_box')
						const div = document.createElement('div')
						const img = document.createElement('img')
						img.src = e.download_url
						div.className = 'card'
						div.append(img)
						imgs.append(div)
					})
				)
			}
		}
		xhr.onerror = () => {
			reject(xhr.response)
		}
		xhr.send()
	})
}
// отслеживание клика по кнопке
btn.addEventListener('click', () => {
	let value = document.querySelector('.form_input')
	// проверка значения input
	value = Number(value.value)
	if (!isNaN(value) && Number.isInteger(value)) {
		if (0 < value && value < 11) {
			let url = `https://picsum.photos/v2/list?page=2&limit=${value}`
			imgBox.innerHTML = ''
			sendRequest('GET', url)
		} else {
			// перезапуск страницы
			otherwise()
		}
	} else {
		// перезапуск страницы
		otherwise()
	}
})
