console.log("Random User API");

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

//const getRandomInt = (min, max) => {
    //return Math.floor(Math.random()*(max - min)) + min;
//}

const fetchData = async (genero) =>{
    try {
        const res = await fetch(`https://randomuser.me/api/?gender=${genero}`);
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