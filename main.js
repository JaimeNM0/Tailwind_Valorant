const AGENTS_URL = 'https://valorant-api.com/v1/agents';
const WEAPONS_URL = 'https://valorant-api.com/v1/weapons';

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

const loadAgents = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', AGENTS_URL);
    xhr.responseType = 'json';

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
                        loadWeapons();
                    });

                    miniature.src = element.displayIcon;
                    divCharacterMiniatures.appendChild(miniature);
                }
            });
            //console.log(listaImagenes);
        }
    }

    xhr.send();
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

const loadWeapons = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', WEAPONS_URL);
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response.data);
            let weapons = xhr.response.data;
            generaWeapons(weapons);
        }
    }

    xhr.send();
}

const generaWeapons = (weapons) => {
    let miniatureWeapons = document.getElementById('miniatureWeapons');
    miniatureWeapons.innerHTML = '';

    weapons.forEach(element => {
        const arma = document.createElement('img');
        arma.style.width = '80px';
        arma.src = element.displayIcon;

        arma.addEventListener('click', function () {
            console.log(element.uuid);
            let miniatureSkins = document.getElementById('miniatureSkins');
            miniatureSkins.innerHTML = '';
            element.skins.forEach((skin) => {
                loadAndGenerateWeaponsSkinsData(skin, miniatureSkins);
            });
        });

        miniatureWeapons.appendChild(arma);
    });

}

const loadAndGenerateWeaponsSkinsData = (skin, miniatureSkins) => {
    //https://valorant-api.com/v1/weapons/skinlevels/uuid
    const xhr = new XMLHttpRequest();
    xhr.open('GET', WEAPONS_URL + '/skinlevels/' + skin.levels[0].uuid);
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && skin.displayIcon !== null) {
            const skinDetail = xhr.response.data;
            //console.log(skinDetail);


            const imgSkin = document.createElement('img');
            imgSkin.style.width = '100px';
            imgSkin.style.height = '80px';
            imgSkin.src = skin.displayIcon;

            imgSkin.addEventListener('click', function () {
                console.log(skinDetail.streamedVideo);
                let divVideo = document.getElementById('video');
                divVideo.innerHTML = '';

                if (skinDetail.streamedVideo !== null) {
                    const iframe = document.createElement('iframe');
                    iframe.src = skinDetail.streamedVideo;
                    iframe.style.width = '1000px';
                    iframe.style.height = '570px';
                    divVideo.appendChild(iframe);
                }
            });

            miniatureSkins.appendChild(imgSkin);
        }
    }

    xhr.send();
}


window.onload = function () {
    modeSwitching();
    loadAgents();
}