const URL1 = 'https://valorant-api.com/v1/agents';

const xhr = new XMLHttpRequest();

xhr.open('GET', URL1);

const modeSwitching = () => {
    let buttonMode = document.getElementById('mode');

    buttonMode.addEventListener('click', function () {
        let html = document.getElementById('html');
        let imgMode = document.getElementById('imgMode');
        if (html.className === 'dark') {
            html.className = 'light';
            document.documentElement.classList.remove('dark');
            imgMode.src = './img/sol.png';
        } else {
            html.className = 'dark';
            document.documentElement.classList.add('dark');
            imgMode.src = './img/luna.png';
        }
    });
}

const characterThumbnailInformation = (character) => {
    let imgFullPictureCharacter = document.getElementById('imgFullPictureCharacter');
    let nameCharacter = document.getElementById('nameCharacter');
    let descriptionCharacter = document.getElementById('descriptionCharacter');
    let roleCharacter = document.getElementById('roleCharacter');
    let roleDescriptionCharacter = document.getElementById('roleDescriptionCharacter');
    let abilities = [
        { name: document.getElementById('abilityCharacter1'), displayIcon: document.getElementById('imgAbilityCharacter1') },
        { name: document.getElementById('abilityCharacter2'), displayIcon: document.getElementById('img_habilidad2') },
        { name: document.getElementById('habilidad3'), displayIcon: document.getElementById('img_habilidad3') },
        { name: document.getElementById('habilidad4'), displayIcon: document.getElementById('img_habilidad4') }
    ];

    imgFullPictureCharacter.innerHTML = '';
    imgFullPictureCharacter.style.width = '550px';
    imgFullPictureCharacter.src = character.fullPortrait;

    nameCharacter.innerHTML = character.displayName;
    descriptionCharacter.innerHTML = character.description;
    roleCharacter.innerHTML = character.role.displayName;
    roleDescriptionCharacter.innerHTML = character.role.description;

    i = 0;
    character.abilities.forEach(characterAbilities => {
        abilities[i].name.innerHTML = characterAbilities.displayName;
        abilities[i].displayIcon.src = characterAbilities.displayIcon;
        ++i;
    });
}

window.onload = function () {

    modeSwitching();

    xhr.onreadystatechange = (ev) => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let dataCharacters = xhr.response.data;

            //let listaImagenes = [];
            dataCharacters.forEach(element => {
                if (element.displayIcon != null && element.fullPortrait != null) {
                    //listaImagenes.push({ name: element.displayName, icon: element.displayIcon, full: element.fullPortrait });
                    let divCharacterMiniatures = document.getElementById('characterMiniatures');

                    const miniature = document.createElement('img');
                    miniature.style.width = '80px';
                    miniature.style.border = '1px solid #888';

                    miniature.addEventListener('click', function () {
                        characterThumbnailInformation(element);
                    });

                    miniature.src = element.displayIcon;
                    divCharacterMiniatures.appendChild(miniature);
                }
            });
            //console.log(listaImagenes);
        }
    }

    xhr.send();
    xhr.responseType = 'json';
}