class human{
public name: string;
public age: number;
public gender: string;
constructor(name:string, age:number, gender:string){
    this.name = name;
    this.age = age;
    this.gender = gender;
}
}
const HoJoon = new human("HoJoon",26,"male");

const sayHello = (person: human):string =>{
    return `hello ${person.name}, you are ${person.age}, you are a ${person.gender}`
};

console.log(sayHello(HoJoon))
export {};