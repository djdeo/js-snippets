class Copy {

	// shallow copy
	static doShallow(obj) {
		if(typeof obj !== 'object') return
		let newobj = obj instanceof Array ? [] : {}

		for(let key in obj) {
			if(obj.hasOwnProperty(key)) { // to aviod coping inheried props 
				newobj[key] = obj[key]
			}
		}
		return newobj
	}

	// 深拷贝
	static doDeep(obj) {
		if(typeof obj !== 'object') return
		let newobj = obj instanceof Array ? [] : {}

		for(let key in obj) {
			if(obj.hasOwnProperty(key)) { 
				newobj[key] = typeof obj[key] === 'object'
					? this.doDeep(obj[key])
					: obj[key]
			}
		}
		return newobj
	}
}

const obj = {
	a: 1,
	b: 2,
	c: {
		ca: 'innter1',
		cb: 'innter2'
	},
	d: ['d0', 'd1']
}

const c_obj = Copy.doShallow(obj)
c_obj.a = 'hello'
c_obj.c.ca = 'changed' // nested prop change will modify the original obj
console.log(obj) // => { a: 1, b: 2, c: { ca: 'changed', cb: 'innter2' } }

const d_obj = Copy.doDeep(obj)
d_obj.c.cb = '😂changed' // nested prop change won't modify the original obj
d_obj.d[0] = '😂 d0'

console.log(obj) // => { a: 1, b: 2, c: { ca: 'changed', cb: 'innter2' }, d: [ 'd0', 'd1' ] }
console.log(d_obj) 