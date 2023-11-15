const AGENTS_URL = 'https://valorant-api.com/v1/agents';
const WEAPONS_URL = 'https://valorant-api.com/v1/weapons';

const modeSwitching = () => {
    let buttonMode = document.getElementById('mode');

    buttonMode.addEventListener('click', function () {
        let html = document.getElementById('html');
        let imgMode = document.getElementById('imgMode');
        let imgCharacter = document.getElementById("imgCharacter");
        let imgSkin = document.getElementById("imgSkin");
        let imgVideo = document.getElementById("imgVideo");
        if (html.className === 'dark') {
            html.className = 'light';
            document.documentElement.classList.remove('dark');
            imgMode.src = './img/sol.png';
            imgCharacter.src = './img/character_black.png';
            imgSkin.src = './img/skin_black.png';
            imgVideo.src = './img/video_black.png';
        } else {
            html.className = 'dark';
            document.documentElement.classList.add('dark');
            imgMode.src = './img/luna.png';
            imgCharacter.src = './img/character_white.png';
            imgSkin.src = './img/skin_white.png';
            imgVideo.src = './img/video_white.png';
        }
    });
}

const appearCharacters = () => {
    let buttonCharacter = document.getElementById("buttonCharacter");
    buttonCharacter.addEventListener('click', () => {
        backgroundButtons(buttonCharacter);
        let spanSelector = document.getElementById("selector");
        let divCharacters = document.getElementById("characters");
        let divSkins = document.getElementById("skins");
        let divVideo = document.getElementById("video");
        spanSelector.innerHTML = 'CHARACTER SELECTOR';
        divCharacters.classList.remove("hidden");
        divSkins.classList.add("hidden");
        divVideo.classList.add("hidden");
    });
}

const appearSkins = () => {
    let buttonSkin = document.getElementById("buttonSkin");
    buttonSkin.addEventListener('click', () => {
        backgroundButtons(buttonSkin);
        let spanSelector = document.getElementById("selector");
        let divCharacters = document.getElementById("characters");
        let divSkins = document.getElementById("skins");
        let divVideo = document.getElementById("video");
        spanSelector.innerHTML = 'SKIN SELECTOR';
        divSkins.classList.remove("hidden");
        divCharacters.classList.add("hidden");
        divVideo.classList.add("hidden");
    });
}

const appearDirectSkins = () => {
    let buttonSkin = document.getElementById("buttonSkin");
    backgroundButtons(buttonSkin);
    let spanSelector = document.getElementById("selector");
    let divCharacters = document.getElementById("characters");
    let divSkins = document.getElementById("skins");
    let divVideo = document.getElementById("video");
    spanSelector.innerHTML = 'SKIN SELECTOR';
    divSkins.classList.remove("hidden");
    divCharacters.classList.add("hidden");
    divVideo.classList.add("hidden");
}

const appearVideo = () => {
    let buttonVideo = document.getElementById("buttonVideo");
    buttonVideo.addEventListener('click', () => {
        backgroundButtons(buttonVideo);
        let spanSelector = document.getElementById("selector");
        let divCharacters = document.getElementById("characters");
        let divSkins = document.getElementById("skins");
        let divVideo = document.getElementById("video");
        spanSelector.innerHTML = 'SKIN VIDEO';
        divVideo.classList.remove("hidden");
        divCharacters.classList.add("hidden");
        divSkins.classList.add("hidden");
    });
}

const appearDirectVideo = () => {
    let buttonVideo = document.getElementById("buttonVideo");
    backgroundButtons(buttonVideo);
    let spanSelector = document.getElementById("selector");
    let divCharacters = document.getElementById("characters");
    let divSkins = document.getElementById("skins");
    let divVideo = document.getElementById("video");
    spanSelector.innerHTML = 'SKIN VIDEO';
    divVideo.classList.remove("hidden");
    divCharacters.classList.add("hidden");
    divSkins.classList.add("hidden");
}

const backgroundButtons = (button) => {
    let buttonCharacter = document.getElementById("buttonCharacter");
    let buttonSkin = document.getElementById("buttonSkin");
    let buttonVideo = document.getElementById("buttonVideo");
    buttonCharacter.classList.remove('bg-red-400');
    buttonCharacter.classList.remove('dark:bg-blue-400');
    buttonSkin.classList.remove('bg-red-400');
    buttonSkin.classList.remove('dark:bg-blue-400');
    buttonVideo.classList.remove('bg-red-400');
    buttonVideo.classList.remove('dark:bg-blue-400');

    button.classList.add('bg-red-400');
    button.classList.add('dark:bg-blue-400');
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
                        characterInformation(element);
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

const characterInformation = (character) => {
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
            generateWeapons(weapons);
        }
    }

    xhr.send();
}

const generateWeapons = (weapons) => {
    let miniatureWeapons = document.getElementById('miniatureWeapons');
    miniatureWeapons.innerHTML = '';

    weapons.forEach(element => {
        const imgWeapon = document.createElement('img');
        imgWeapon.style.width = '80px';
        //imgWeapon.style.height = '80px';
        imgWeapon.src = element.displayIcon;

        imgWeapon.addEventListener('click', function () {
            let divVideo = document.getElementById('video');
            divVideo.innerHTML = '';
            spanVideo(divVideo);
            console.log(element.uuid);
            weaponsInformation(element);
            let miniatureSkins = document.getElementById('miniatureSkins');
            miniatureSkins.innerHTML = '';
            element.skins.forEach((skin) => {
                loadAndGenerateWeaponsSkinsData(skin, miniatureSkins);
            });
            appearDirectSkins();
        });

        miniatureWeapons.appendChild(imgWeapon);
    });

}

const weaponsInformation = (weapon) => {
    let imgFullPictureSkin = document.getElementById('imgFullPictureSkin');
    let nameWeapon = document.getElementById('nameWeapon');
    let categoryWeapon = document.getElementById('categoryWeapon');

    let shotgunPelletCount = document.getElementById('shotgunPelletCount');
    let fireRate = document.getElementById('fireRate');
    let firstBulletAccuracy = document.getElementById('firstBulletAccuracy');
    let runSpeedMultiplier = document.getElementById('runSpeedMultiplier');
    let equipTimeSeconds = document.getElementById('equipTimeSeconds');
    let magazineSize = document.getElementById('magazineSize');
    let reloadTimeSeconds = document.getElementById('reloadTimeSeconds');
    let costWeapon = document.getElementById('costWeapon');

    let bodyDamage = document.getElementById('bodyDamage');
    let headDamage = document.getElementById('headDamage');
    let legDamage = document.getElementById('legDamage');
    let rangeStartMeters = document.getElementById('rangeStartMeters');
    let rangeEndMeters = document.getElementById('rangeEndMeters');

    imgFullPictureSkin.innerHTML = '';
    imgFullPictureSkin.style.width = '512px';
    //imgFullPictureSkin.style.height = '200px';
    imgFullPictureSkin.src = weapon.displayIcon;
    nameWeapon.innerHTML = weapon.displayName;

    if (weapon.weaponStats !== null) {
        categoryWeapon.innerHTML = weapon.shopData.category;

        shotgunPelletCount.innerHTML = weapon.weaponStats.shotgunPelletCount;
        fireRate.innerHTML = weapon.weaponStats.fireRate;
        firstBulletAccuracy.innerHTML = weapon.weaponStats.firstBulletAccuracy;
        runSpeedMultiplier.innerHTML = weapon.weaponStats.runSpeedMultiplier;
        equipTimeSeconds.innerHTML = weapon.weaponStats.equipTimeSeconds;
        magazineSize.innerHTML = weapon.weaponStats.magazineSize;
        reloadTimeSeconds.innerHTML = weapon.weaponStats.reloadTimeSeconds;
        costWeapon.innerHTML = weapon.shopData.cost;

        bodyDamage.innerHTML = weapon.weaponStats.damageRanges[0].bodyDamage;
        headDamage.innerHTML = weapon.weaponStats.damageRanges[0].headDamage;
        legDamage.innerHTML = weapon.weaponStats.damageRanges[0].legDamage;
        rangeStartMeters.innerHTML = weapon.weaponStats.damageRanges[0].rangeStartMeters;
        rangeEndMeters.innerHTML = weapon.weaponStats.damageRanges[0].rangeEndMeters;
    }
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
            imgSkin.style.border = '1px solid #888';
            imgSkin.src = skin.displayIcon;

            imgSkin.addEventListener('click', function () {
                //console.log(skinDetail);
                let imgFullPictureSkin = document.getElementById('imgFullPictureSkin');
                imgFullPictureSkin.src = skinDetail.displayIcon;
                let divVideo = document.getElementById('video');
                divVideo.innerHTML = '';

                if (skinDetail.streamedVideo !== null) {
                    const iframe = document.createElement('iframe');
                    iframe.src = skinDetail.streamedVideo;
                    iframe.style.width = '1000px';
                    iframe.style.height = '570px';
                    divVideo.appendChild(iframe);
                    appearDirectVideo();
                } else {
                    spanVideo(divVideo);
                }
            });

            miniatureSkins.appendChild(imgSkin);
        }
    }

    xhr.send();
}

const spanVideo = (divVideo) => {
    const span = document.createElement('span');
    span.innerHTML = 'There isn\'t a video';
    span.classList.add('text-2xl');
    span.classList.add('text-black');
    span.classList.add('dark:text-white');
    divVideo.appendChild(span);
}

window.onload = function () {
    modeSwitching();
    appearCharacters();
    appearSkins();
    appearVideo();
    loadAgents();
}