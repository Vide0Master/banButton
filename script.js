const overlay = document.querySelector('.settings-overlay')
const settingsBlock = document.querySelector('.settings-block')

document.querySelector('.settings-icon').addEventListener('click', () => {
    loadUserList()
    overlay.classList.remove('hidden')
    settingsBlock.classList.remove('hidden')
})

document.querySelector('.settings-overlay').addEventListener('click', () => {
    overlay.classList.add('hidden')
    settingsBlock.classList.add('hidden')
})

const userListElem = document.querySelector('.users-list')

function loadUserList() {
    const localstorageUsers = JSON.parse(localStorage.getItem('usersList') || '[]')

    while (userListElem.firstChild) {
        userListElem.removeChild(userListElem.firstChild);
    }

    const addRow = document.createElement('div')
    userListElem.appendChild(addRow)
    addRow.classList.add('user-line')

    const textInput = document.createElement('input')
    addRow.appendChild(textInput)
    textInput.type = 'text'

    const addInput = document.createElement('div')
    addRow.appendChild(addInput)
    addInput.classList.add('add-btn')
    addInput.innerHTML = '+'
    addInput.addEventListener('click', () => {
        if (!localstorageUsers.includes(textInput.value)) {
            localstorageUsers.push(textInput.value)
            localStorage.setItem('usersList', JSON.stringify(localstorageUsers))
            loadUserList()
        }
    })

    for (const user of localstorageUsers) {
        const elem = document.createElement('div')
        userListElem.appendChild(elem)
        elem.classList.add('user-line')

        const text = document.createElement('div')
        elem.appendChild(text)
        text.innerHTML = user

        const remove = document.createElement('div')
        elem.appendChild(remove)
        remove.classList.add('remove')
        remove.innerText = '✖'

        remove.addEventListener('click', () => {
            localStorage.setItem('usersList', JSON.stringify(localstorageUsers.filter(item => item !== user)))
            loadUserList()
        })
    }
}

document.querySelector('.button').addEventListener('click', () => {
    const localstorageUsers = JSON.parse(localStorage.getItem('usersList') || '[]')
    if (localstorageUsers.length == 0) {
        alert('No users, set them in settings')
        return
    }
    createBreakingBlock(localstorageUsers[Math.floor(Math.random() * localstorageUsers.length)])
})

function createBreakingBlock(text) {
    const block = document.createElement('div');
    block.className = 'breaking-block';
    block.textContent = text;

    block.style.left = '0px';
    block.style.top = '0px';
    block.style.visibility = 'hidden';
    document.querySelector('.break-container').appendChild(block);

    const rect = block.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const maxX = window.innerWidth - w;
    const maxY = window.innerHeight - h;
    const x = Math.random() * (maxX > 0 ? maxX : 0);
    const y = Math.random() * (maxY > 0 ? maxY : 0);

    block.style.left = x + 'px';
    block.style.top = y + 'px';
    block.style.visibility = 'visible';

    setTimeout(() => {
        block.classList.add('red');
    }, 500);

    setTimeout(() => {
        _breakBlock(block, w, h);
    }, 1200);

}

function _breakBlock(block, w, h) {
    const rect = block.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;

    const left = document.createElement('div');
    left.className = 'breaking-half left';
    left.style.width = (w / 2) + 'px';
    left.style.height = h + 'px';
    left.style.left = x + 'px';
    left.style.top = y + 'px';
    document.querySelector('.break-container').appendChild(left);

    const right = document.createElement('div');
    right.className = 'breaking-half right';
    right.style.width = (w / 2) + 'px';
    right.style.height = h + 'px';
    right.style.left = (x + w / 2) + 'px';
    right.style.top = y + 'px';
    document.querySelector('.break-container').appendChild(right);

    setTimeout(() => {
        left.classList.add('open');
        right.classList.add('open');
    }, 2)


    block.remove();

    _createSparks(x + w / 2, y + h / 2);

    setTimeout(() => {
        left.remove();
        right.remove();
    }, 1000);
}

function _createSparks(cx, cy) {
    const sparkCount = 25;
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'breaking-spark';
        spark.style.left = (cx - 3) + 'px';
        spark.style.top = (cy - 3) + 'px';

        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        spark.style.setProperty('--dx', dx + 'px');
        spark.style.setProperty('--dy', dy + 'px');

        document.querySelector('.break-container').appendChild(spark);

        setTimeout(() => { spark.remove() }, 1000)
    }
}