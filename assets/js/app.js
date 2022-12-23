console.log("Random User API");

const select = document.querySelector('.select-gender');
const female = document.querySelector('.female');
const male = document.querySelector('.male');



//const getRandomInt = (min, max) => {
    //return Math.floor(Math.random()*(max - min)) + min;
//}
select.addEventListener('change',  (event)=> {

    female.addEventListener('click', (event) => {
        selectFemale();
    })

    male.addEventListener('click', (event) => {
        selectMale();
    })

    if(event.target.value === 'female'){
        selectFemale();
    }else if(event.target.value === 'male'){
        selectMale();
    }
})
    

const selectFemale = async () => {
    const res = await fetch(`https://randomuser.me/api/?gender=female`)
    const data = await res.json();
    fetchData(data);
}
const selectMale = async () => {
    const res = await fetch(`https://randomuser.me/api/?gender=male`)
    const data = await res.json();
    fetchData(data);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

const fetchData = async (id) =>{
    try {
        const res = await fetch(`https://randomuser.me/api/?gender=${id}`);
        const data = await res.json();

        console.log(data);

        const user = {
            img : data.results[0].picture.large,
            nombre : data.results[0].name.first,
            apellido : data.results[0].name.last,
            genero : data.results[0].gender,
            cumpleanos : data.results[0].dob.date,
            email : data.results[0].email,
            telefono : data.results[0].phone
        }
        
        pintarCard(user);
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (user) => {
    const flex = document.querySelector('.flex');
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.imagen').setAttribute('src', user.img);
    clone.querySelector('.nombre').textContent = user.nombre + " " + user.apellido;
    clone.querySelector('.genero').textContent = user.genero;
    clone.querySelector('.cumple').textContent = user.cumpleanos;
    clone.querySelector('.email').textContent = user.email;
    clone.querySelector('.telefono').textContent = user.telefono;

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}