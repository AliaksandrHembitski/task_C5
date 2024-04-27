// новый экземпляр DOMParser
const parserDOM = new DOMParser()

// объект(строка) для парсинга
const strXML = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`

// объявление переменной результата
const result = new Object()
result.list = []
// парсинг XML
const xmlDom = parserDOM.parseFromString(strXML, 'text/xml')
const listNode = xmlDom.querySelector('list')
// цикл для формирования объект и добавления объект в переменную result
for (key in listNode.children) {
	const student = new Object()
	if (key < listNode.children.length) {
		student.name = `${
			listNode.children[key].querySelector('name').querySelector('first')
				.textContent
		} ${
			listNode.children[key].querySelector('name').querySelector('second')
				.textContent
		}`
		student.age = Number(
			listNode.children[key].querySelector('age').textContent
		)
		student.prof = listNode.children[key].querySelector('prof').textContent
		student.lang = listNode.children[key]
			.querySelector('name')
			.getAttribute('lang')
		result.list.push(student)
	}
}
console.log(result)
