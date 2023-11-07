const URL1 = 'https://valorant-api.com/v1/agents';

const xhr = new XMLHttpRequest();

xhr.open('GET', URL1);

window.onload = function () {
    let boton = document.getElementById('modo');

    boton.addEventListener('click', function () {
        let html = document.getElementById('html');
        let img_modo = document.getElementById('img_modo');
        if (html.className === 'dark') {
            html.className = 'light';
            document.documentElement.classList.remove('dark');
            img_modo.src = './img/sol.png';
        } else {
            html.className = 'dark';
            document.documentElement.classList.add('dark');
            img_modo.src = './img/luna.png';
        }
    });

    xhr.onreadystatechange = (ev) => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.response);
            console.log(xhr.response.data);
            // 1.
            let informacion = xhr.response.data;
            console.log(informacion);

            let unNombre = informacion[2].displayName;
            console.log(unNombre);
            // 2. Forma de Alejandro:
            const nombres = informacion.map((informacion) => informacion.displayName);
            // 2. Mi forma:
            let listaNombres = [];
            informacion.forEach(element => {
                listaNombres.push(element.displayName);
            });
            console.log('listaNombres: ' + listaNombres);
            // 2. Mi forma mejorada:
            //TODO No funciona.
            /*let listaNombre = informacion.forEach(element => { listaNombres.push(element.displayName) });
            console.log('listaNombre: ' + listaNombre);*/
            // 3.
            let listaImagenes = [];
            informacion.forEach(element => {
                if (element.displayIcon != null && element.fullPortrait != null) {
                    listaImagenes.push({ name: element.displayName, icon: element.displayIcon, full: element.fullPortrait });
                    let div_miniaturas = document.getElementById('miniaturas');

                    const miniatura = document.createElement('img');
                    miniatura.style.width = '80px';
                    miniatura.style.border = '1px solid #888';

                    miniatura.addEventListener('click', function () {
                        let div_imagen_completa = document.getElementById('imagen_completa');
                        let nombre = document.getElementById('nombre');
                        let descripcion = document.getElementById('descripcion');
                        let role = document.getElementById('role');
                        let role_descripcion = document.getElementById('role_descripcion');
                        let habilidad1 = document.getElementById('habilidad1');
                        let habilidad2 = document.getElementById('habilidad2');
                        let habilidad3 = document.getElementById('habilidad3');
                        let habilidad4 = document.getElementById('habilidad4');
                        let img_habilidad1 = document.getElementById('img_habilidad1');
                        let img_habilidad2 = document.getElementById('img_habilidad2');
                        let img_habilidad3 = document.getElementById('img_habilidad3');
                        let img_habilidad4 = document.getElementById('img_habilidad4');
                        let habilidades = [
                            { name: habilidad1, displayIcon: img_habilidad1 },
                            { name: habilidad2, displayIcon: img_habilidad2 },
                            { name: habilidad3, displayIcon: img_habilidad3 },
                            { name: habilidad4, displayIcon: img_habilidad4 }
                        ];

                        div_imagen_completa.innerHTML = '';
                        const completa = document.createElement('img');
                        completa.style.width = '550px';
                        completa.src = element.fullPortrait;
                        div_imagen_completa.appendChild(completa);

                        nombre.innerHTML = element.displayName;
                        descripcion.innerHTML = element.description;
                        role.innerHTML = element.role.displayName;
                        role_descripcion.innerHTML = element.role.description;

                        i = 0;
                        element.abilities.forEach(element_abilities => {
                            habilidades[i].name.innerHTML = element_abilities.displayName;
                            habilidades[i].displayIcon.src = element_abilities.displayIcon;
                            ++i;
                        });
                    });

                    miniatura.src = element.displayIcon;
                    div_miniaturas.appendChild(miniatura);
                }
            });
            console.log(listaImagenes);
        }
    }


    xhr.send();
    xhr.responseType = 'json';
}