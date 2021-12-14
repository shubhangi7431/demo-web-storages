let cl = console.log;
const backdrop = document.getElementById('backdrop');
const addMovie = document.getElementById('addMovie');
const model = document.getElementById('model');
const moviebtn = document.getElementById('movieAdd');
const myclose = Array.from(document.querySelectorAll('.myclose'));
const update = document.getElementById('update');
const title = document.querySelector('#title');
const rating = document.querySelector('#rating');
const image_url = document.querySelector('#image');
const delMovbtn = document.getElementById('deleteMov');
const trailer = document.getElementById('trailer');


// main modal/movie modal functionality
const toggleMovie = () => {
    model.classList.toggle('visible');
    backdrop.classList.toggle('visible');
}
myclose.forEach((eve) => {
    eve.addEventListener('click', toggleMovie);
});
backdrop.addEventListener('click', toggleMovie);
addMovie.addEventListener('click', toggleMovie);

//edit function
const editMovData = (ele) => {
    let getId = ele.getAttribute('data-id');
    cl(getId);
    localStorage.setItem('movId', getId);
    let localdata = retrivedata();
    cl(localdata);
    let movobj = localdata.find((mov) => {
        return mov.id === getId;
    })
    cl(movobj);
    title.value = movobj.title;
    image_url.value = movobj.image;
    rating.value = movobj.rating;
    trailer.value = movobj.trailer;
    toggleMovie();
    update.style.display = "inline-block";
    moviebtn.style.display = "none";
}

//update function
const updateMovData = () => {
    let getId = localStorage.getItem('movId');
    cl(getId);
    let data = retrivedata();
    cl(data);
    data.forEach((updateMov) => {
        if (updateMov.id === getId) {
            updateMov.title = title.value;
            updateMov.image = image_url.value;
            updateMov.rating = rating.value;
            updateMov.trailer = trailer.value;
        }
    });
    cl(data);
    templating(data);
    localStorage.setItem('localMoviedata', JSON.stringify(data));
    localStorage.removeItem('movId'); // not mandetory
    update.style.display = "none";
    moviebtn.style.display = "inline-block";
    toggleMovie();
}
update.addEventListener('click', updateMovData);

const movieTrailer = (eve) => {
    let getId = eve.getAttribute('data-id');
    cl(getId);
    //let data = retrivedata();
    let mov = "";
    movieArray.forEach((eve) => {
        if (eve.id === getId) {
            mov = eve.trailer;
        }
        cl(mov);
    })
    window.open(mov, '_blank');

}

// delete function
const deleteMovData = () => {
    let getId = localStorage.getItem('movId');
    cl(getId);
    let localdata = retrivedata();
    cl(localdata);
    let delMovData = localdata.filter((del) => {
        return del.id != getId;
    });
    cl(delMovData);
    templating(delMovData);
    localStorage.setItem('localMoviedata', JSON.stringify(delMovData));
    $('#exampleModal').modal('hide');
}
delMovbtn.addEventListener('click', deleteMovData);
//templating 
const templating = (arr) => {
    let template = "";
    arr.forEach((eve) => {
        template += `<div class="col-sm-4 mt-5">
                <div class="card shadow animate__animated animate__bounceIn">
                    <div class="card-body text-center">
                        <img src="${eve.image}" alt="image" class="img-fluid">
                        <p class="title">${eve.title}</p>
                        <p class="rating">${"You Rated : " + eve.rating + "points"}</p>
                        <button class="btn btn-success shadow"  data-id="${eve.id}" onclick ="editMovData(this)">Edit</button>
                        <button class="btn btn-danger mx-3 shadow" data-id="${eve.id}" onclick="deleteonModal(this)">Delete</button>
                        <button class="btn btn-primary shadow" data-id="${eve.id}" onclick="movieTrailer(this)"> Trailer</button>
                        </div>
                </div>
            </div>`
    });
    document.getElementById('movieInfo').innerHTML = template;
    title.value = "";
    image_url.value = "";
    rating.value = "";
    trailer.value = "";
}

const movieHandler = () => {
    let movieArray = [];
    movieArray = retrivedata();
    let obj = {
        title: title.value,
        image: image_url.value,
        rating: rating.value,
        trailer: trailer.value,
        id: uuid(),
    }
    movieArray.push(obj);
    cl(movieArray);
    localStorage.setItem('localMoviedata', JSON.stringify(movieArray));
    templating(movieArray);
    toggleMovie();
}

moviebtn.addEventListener('click', movieHandler);

if (localStorage.getItem) {
    movieArray = retrivedata();
    templating(movieArray);
}

function retrivedata() {
    return JSON.parse(localStorage.getItem('localMoviedata'));
}

function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

// modal on delete button:-
function deleteonModal(ele) {
    let getId = ele.getAttribute('data-id');
    cl(getId);
    localStorage.setItem('movId', getId);
    $('#exampleModal').modal();
}

