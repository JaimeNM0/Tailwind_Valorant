const URL1 = 'https://valorant-api.com/v1/agents';

const xhr = new XMLHttpRequest();

xhr.open('GET', URL1);

const modeSwitching = () => {
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
}

const thumbnailInformation = (character) => {
    let img_completa = document.getElementById('img_completa');
    let nombre = document.getElementById('nombre');
    let descripcion = document.getElementById('descripcion');
    let role = document.getElementById('role');
    let role_descripcion = document.getElementById('role_descripcion');
    let habilidades = [
        { name: document.getElementById('habilidad1'), displayIcon: document.getElementById('img_habilidad1') },
        { name: document.getElementById('habilidad2'), displayIcon: document.getElementById('img_habilidad2') },
        { name: document.getElementById('habilidad3'), displayIcon: document.getElementById('img_habilidad3') },
        { name: document.getElementById('habilidad4'), displayIcon: document.getElementById('img_habilidad4') }
    ];

    img_completa.innerHTML = '';
    img_completa.style.width = '550px';
    img_completa.src = character.fullPortrait;

    nombre.innerHTML = character.displayName;
    descripcion.innerHTML = character.description;
    role.innerHTML = character.role.displayName;
    role_descripcion.innerHTML = character.role.description;

    i = 0;
    character.abilities.forEach(characterAbilities => {
        habilidades[i].name.innerHTML = characterAbilities.displayName;
        habilidades[i].displayIcon.src = characterAbilities.displayIcon;
        ++i;
    });
}

window.onload = function () {

    modeSwitching();

    xhr.onreadystatechange = (ev) => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let informacion = xhr.response.data;

            let listaImagenes = [];
            informacion.forEach(element => {
                if (element.displayIcon != null && element.fullPortrait != null) {
                    listaImagenes.push({ name: element.displayName, icon: element.displayIcon, full: element.fullPortrait });
                    let div_miniaturas = document.getElementById('miniaturas');

                    const miniatura = document.createElement('img');
                    miniatura.style.width = '80px';
                    miniatura.style.border = '1px solid #888';

                    miniatura.addEventListener('click', function () {
                        thumbnailInformation(element);
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