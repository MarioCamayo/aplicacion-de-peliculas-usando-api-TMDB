let pagina = 1;
const botonAnterior = document.getElementById('botonAnterior')
const botonSiguiente = document.getElementById('botonSiguiente')

botonSiguiente.addEventListener('click', ()=>{
    if(pagina < 100){
        pagina += 1;
        verPeliculas();
    }
});

botonAnterior.addEventListener('click', ()=>{
    if(pagina > 1){
        pagina -= 1;
        verPeliculas();
    }
});



const verPeliculas = async()=>{
    try{
        const traerPeliculas = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0a6558b0d28ce6724388ae6a6ee843a1&page=${pagina}`);
        if(traerPeliculas.status === 200){
            const datos = await traerPeliculas.json()
            let peliculas='';
            console.log(datos);
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.title}</h3>
                </div>`

            });
            
            
            document.getElementById('contenedor').innerHTML = peliculas;
        } else if(traerPeliculas.status === 401){
            console.log('key incorrecto');
        }else if( traerPeliculas.status === 404){
            console.log('La pelicula no existe');
        }else{
            console.log('Error');
        }

    }catch(e){
        console.log(e);
    }
};

verPeliculas();
    
