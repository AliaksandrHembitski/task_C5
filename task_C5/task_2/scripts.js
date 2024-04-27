// JSON строка для парсинга
const jsonString = `{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`
// парсинг jsonString
const data = JSON.parse(jsonString)

// объявление переменной результата
const result = new Object()
result.list = []

// цикл для формирования объект и добавления объект в переменную result
for (key in data) {
	if (data[key].length) {
		for (i in data[key]) {
			const obj = {
				name: data[key][i].name,
				age: Number(data[key][i].age),
				prof: data[key][i].prof,
			}
			result.list.push(obj)
		}
	}
}

console.log(result)
