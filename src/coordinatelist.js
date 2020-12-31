class CoordinateList {
	//textArea: self-descriptive
	constructor(textArea) {
		textArea.value = '';
		this.textArea = textArea;
		this.coordinates = [];
		this.dictionary = {};
		this.options = {
			formatting: 0,
			sign: 0,
			permutation: 0,
		};
	}
	
	//coord: Point | Point[]
	push(coord) {
		let _this = this;
		iterate(coord, (coord) => {_this._push(coord);});
	}
	
	//coord: Point
	_push(coord) {
		const str = CoordinateList._toString(coord);
		if(!this.dictionary[str]) {
			this.coordinates.push(coord);
			this.textArea.value += str + '\n';
			this.dictionary[str] = true;
		}
	}
	
	//coord: Point | Point[]
	add(coord) {
		let _this = this;
		iterate(coord, (coord) => {_this._add(coord);});
	}
	
	//coord: Point
	_add(coord) {
		switch(this.options.sign) {
			//All
			case 1:
				coord = allSignChanges(coord);
				break;
			//Even
			case 2:
				coord = evenSignChanges(coord);
				break;
			//Odd
			case 3:
				coord = oddSignChanges(coord);
				break;
		}
		
		switch(this.options.permutation) {
			//None
			case 0:
				this.push(coord);
				break;
			//All
			case 1:
				this.push(permutations(coord));
				break;
			//Even
			case 2:
				this.push(evenPermutations(coord));
				break;
			//Odd
			case 3:
				this.push(oddPermutations(coord));
				break;					
		}
	}
	
	//returns: void
	clear() {
		this.coordinates = [];
		this.textArea.value = '';
		this.dictionary = {};
	}
	
	//coord: Point
	static _toString(coord) {
		let str = '(';
		let i;
		for(i = 0; i < coord.length - 1; i++)
			str += coord[i] + ', ';
		return str + coord[i] + ')';
	}
}

//str: string
//returns: Point
function parse(str) {
	str = str.trim();
	str = str.substr(1, str.length - 2).split(',');
	const res = [];
	
	for(let i = 0; i < str.length; i++)
		res.push(eval(str[i]));
	
	return res;
}

var coordinates = new CoordinateList(out_txt);