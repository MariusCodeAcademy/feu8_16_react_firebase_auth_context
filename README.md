# Praktika

## TODO PAGE

### init

1. sukurti komponenta TodoPage.jsx
2. prideti i headeri ir route.
3. jame prideti mygtuka initTodo kuris iskviecia funkcija
4. funkcija po viena (atskirais iskvietimais) iraso i db tris irasus (colekcija 'todos'):

````js
const initTodos = [
  { title: 'Buy Eggs', done: false, date: '' },
  { title: 'Go to Shopping', done: true, date: '' },
  { title: 'Do a 100 pushups', done: false, date: '' },
];```
````

### read

1. tik uzsikrovus komponentui parsiiusti duomenis is firebase colekcios 'todos'.
2. susigeneruoti masyva su id ir irasyti i state
3. mapinti ir atvaizduoti irasus saraso pavidalu

### delete

1. prisideti mygtuka delete prie kievieno todo
2. padaryti kad paspaudus issitrintu irasas
3. atnaujinti sarasas

### add todo

1. virs formos prideti ivesties lauka su mygtuku (gali buti forma)
2. mygtuko paspaudimu paimti ivesties lauko reiksme ir sukurti nauja todo el duomenu bazeje
3. atnaujinti sarasa be perkrovimo
