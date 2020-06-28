document.addEventListener('DOMContentLoaded', () => {
    let covidST;
    let covidActive = false;
    let authorizationCheckboxActive = true;
    let date = [
        ['Месяц', 31],
        ['Января', 31],
        ['Февраля', 29],
        ['Марта', 31],
        ['Апреля', 30],
        ['Мая', 31],
        ['Июня', 30],
        ['июля', 31],
        ['Августа', 31],
        ['Сентября', 30],
        ['Октября', 31],
        ['Ноября', 30],
        ['Декабря', 31],
    ]
    let listItemActive = {
        day: 0,
        month: 0,
        year: 0,
    }
    let listItemSelect = {
        day: 0,
        month: 0,
        year: 0,
    }
    let listPosition = {
        day: 0,
        month: 0,
        year: 0,
    }
    let yearsRange = [1902, 2006];
    let listInputActive = null;
    let listDisabled = false;


    // Forms send request
    let searchSendRequest = (value) => {
        if(value != ''){
            console.log(`search: '${value}'`);
        }
    };

    let authorizationSendRequest = () => {
        let login = document.forms.authorization.login;
        let password = document.forms.authorization.password;
        if(login.value == '' && password.value == '' || login.value == '' && password.value != ''){
            login.classList.remove('run-animation');
            void login.offsetWidth;
            login.classList.add('run-animation');
            login.focus();
        } else if(login.value != '' && password.value == ''){
            password.classList.remove('run-animation');
            void password.offsetWidth;
            password.classList.add('run-animation');
            password.focus();
        } else{
            authorizationCheckboxActive = false;
            document.getElementById('authorizationCheckbox').classList.add('disabled');
            login.setAttribute('disabled', 'true');
            password.setAttribute('disabled', 'true');
            document.forms.authorization.button.setAttribute('disabled', 'true');
            document.forms.authorization.button.classList.add('active');
            console.log(`Login: '${login.value}'; Passowrd: '${password.value}'`);
        }
    };

    let registrationSendRequest = () => {
        let name = document.forms.registration.name;
        let surname = document.forms.registration.surname;
        
        if(name.value == '' && surname.value == '' || name.value == '' && surname.value != ''){
            document.getElementById('registrationPopUpNameSurname-1').style.opacity = 1;
            document.getElementById('registrationPopUpNameSurname-2').style.opacity = 0;
            document.getElementById('registrationPopUpBirthday').style.opacity = 0;
            document.getElementById('registrationPopUpSex').style.opacity = 0;
            name.classList.remove('run-animation');
            void name.offsetWidth;
            name.classList.add('run-animation');
            name.focus();
        } else if(name.value != '' && surname.value == ''){
            document.getElementById('registrationPopUpNameSurname-1').style.opacity = 0;
            document.getElementById('registrationPopUpNameSurname-2').style.opacity = 1;
            document.getElementById('registrationPopUpBirthday').style.opacity = 0;
            document.getElementById('registrationPopUpSex').style.opacity = 0;
            surname.classList.remove('run-animation');
            void surname.offsetWidth;
            surname.classList.add('run-animation');
            surname.focus();
        } else{
            let proceed = true;
            for(let i = 0; i < 3; i++){
                if(i == 0) list = 'Day';
                if(i == 1) list = 'Month';
                if(i == 2) list = 'Year';
                if(document.querySelectorAll('.birthdayInput')[i].getAttribute('aria-label') == document.querySelectorAll(`#list${list} .listItem`)[0].innerHTML){
                    proceed = false;
                    document.querySelectorAll('.birthdayInput input')[i].classList.remove('run-animation');
                    void document.querySelectorAll('.birthdayInput input')[i].offsetWidth;
                    document.querySelectorAll('.birthdayInput input')[i].classList.add('run-animation');
                    document.getElementById('registrationPopUpNameSurname-1').style.opacity = 0;
                    document.getElementById('registrationPopUpNameSurname-2').style.opacity = 0;
                    document.getElementById('registrationPopUpBirthday').style.opacity = 1;
                    document.getElementById('registrationPopUpSex').style.opacity = 0;
                }
            }
            if(proceed){
                document.getElementById('sex').classList.add('active');
                if(document.forms.registration.sex.value != ''){
                    document.getElementById('registrationPopUpNameSurname-1').style.opacity = 0;
                    document.getElementById('registrationPopUpNameSurname-2').style.opacity = 0;
                    document.getElementById('registrationPopUpBirthday').style.opacity = 0;
                    document.getElementById('registrationPopUpSex').style.opacity = 0;
                    name.setAttribute('disabled', 'true');
                    surname.setAttribute('disabled', 'true');
                    document.forms.registration.button.setAttribute('disabled', 'true');
                    for(let i = 0; i < 3; i++){
                        if(i == 0) list = 'Day';
                        if(i == 1) list = 'Month';
                        if(i == 2) list = 'Year';
                        document.querySelectorAll('.birthdayInput input')[i].value = document.querySelectorAll(`#list${list} .listItem`)[listItemActive[list.toLowerCase()]].innerHTML;
                        document.getElementById(`list${list}`).classList.remove('active');
                        listDisabled = true;
                        document.querySelectorAll('.birthdayInput input')[i].setAttribute('disabled', 'true');
                    }
                    console.log(`Name: '${name.value}'; Surname: '${surname.value}'; Birthday date: '${document.forms.registration.birthdayDay.value} ${document.forms.registration.birthdayMonth.value} ${document.forms.registration.birthdayYear.value}'; Sex: '${document.forms.registration.sex.value}'`);
                } else{
                    document.getElementById('registrationPopUpNameSurname-1').style.opacity = 0;
                    document.getElementById('registrationPopUpNameSurname-2').style.opacity = 0;
                    document.getElementById('registrationPopUpBirthday').style.opacity = 0;
                    document.getElementById('registrationPopUpSex').style.opacity = 1;
                }
            }
        }
    };
    // /Forms send request

    let showCovid = (a) => {
        clearTimeout(covidST);
        document.getElementById('covid').style.display = 'flex';
        covidST = setTimeout(() => {
            document.getElementById('covid').style.opacity = 1;
            covidActive = true;
        }, a ? 0 : 1000);
        
    };
    let hideCovid = () => {
        clearTimeout(covidST);
        document.getElementById('covid').style.opacity = 0;
        covidST = setTimeout(() => {
            document.getElementById('covid').style.display = 'none';
            covidActive = false;
        }, 250);
    };

    // Logo & covid
    document.getElementById('logo').addEventListener('mouseenter', () => {
        covidActive ? showCovid(true) : showCovid();
    });
    document.getElementById('logo').addEventListener('mouseleave', () => {
        document.getElementById('logo').style.paddingTop = '0';
        hideCovid();
    });
    document.getElementById('logo').addEventListener('mousedown', () => {
        document.getElementById('logo').style.paddingTop = '5px';
    });
    document.getElementById('logo').addEventListener('mouseup', () => {
        document.getElementById('logo').style.paddingTop = '0';
    });

    document.getElementById('covid').addEventListener('mouseenter', () => {
        covidActive ? showCovid(true) : null;
    });
    document.getElementById('covid').addEventListener('mouseleave', () => {
        hideCovid();
    });


    // Search
    document.getElementById('searchInput').onfocus = () => {
        document.getElementById('search').classList.add('active');

    };
    document.getElementById('searchInput').onblur = () => {
        document.getElementById('search').classList.remove('active');
    };
    document.forms.search.onsubmit = () => {
        searchSendRequest(document.getElementById('searchInput').value);
        return false;
    }

    // Content inputs
    for(let input of document.querySelectorAll('.contentInput')){
        input.children[0].onfocus = () => {
            input.classList.add('active');
        };
        input.children[0].onblur = () => {
            input.classList.remove('active');
        };
    }

    // Checkbox
    document.getElementById('authorizationCheckbox').addEventListener('click', () => {
        if(authorizationCheckboxActive) document.getElementById('authorizationCheckbox').classList.toggle('active');
    });

    // Authorization form
    document.forms.authorization.onsubmit = () => {
        authorizationSendRequest();
        return false;
    };

    // ==============
    // Birthday
    // ==============
    // Icon
    document.getElementById('birthdayIcon').addEventListener('mouseenter', () => {
        document.getElementById('helper').style.opacity = 1;
    });
    document.getElementById('birthdayIcon').addEventListener('mouseleave', () => {
        document.getElementById('helper').style.opacity = 0;
    });

    // Functions
    let setListStyle = () => {
        for(let i = 0; i < 3; i++){
            if(document.documentElement.clientHeight - document.querySelectorAll('.birthdayInput input')[i].getBoundingClientRect().bottom <  document.querySelectorAll('.list')[i].getBoundingClientRect().height){
                document.querySelectorAll('.list')[i].style.top = '';
                document.querySelectorAll('.list')[i].style.bottom = '100%';
                document.querySelectorAll('.list')[i].style.borderRadius = '3px';
                document.querySelectorAll('.list')[i].style.borderBottomLeftRadius = 0;
                document.querySelectorAll('.list')[i].style.borderBottomRightRadius = 0;
                document.querySelectorAll('.birthdayInput input')[i].style.borderRadius = '3px';
                document.querySelectorAll('.birthdayInput input')[i].style.borderTopLeftRadius = 0;
                document.querySelectorAll('.birthdayInput input')[i].style.borderTopRightRadius = 0;
            } else{
                document.querySelectorAll('.list')[i].style.top = '100%';
                document.querySelectorAll('.list')[i].style.bottom = '0';
                document.querySelectorAll('.list')[i].style.borderRadius = '3px';
                document.querySelectorAll('.list')[i].style.borderTopLeftRadius = 0;
                document.querySelectorAll('.list')[i].style.borderTopRightRadius = 0;
                document.querySelectorAll('.birthdayInput input')[i].style.borderRadius = '3px';
                document.querySelectorAll('.birthdayInput input')[i].style.borderBottomLeftRadius = 0;
                document.querySelectorAll('.birthdayInput input')[i].style.borderBottomRightRadius = 0;
            }
        }
    };

    let setListItemSelected = (k, select) => {
        let list;
        if(k == 0) list = 'Day';
        if(k == 1) list = 'Month';
        if(k == 2) list = 'Year';
        for(let i = 0; i < document.querySelectorAll(`#list${list} .listItem`).length; i++){
            document.querySelectorAll(`#list${list} .listItem`)[i].classList.remove('active');
        }
        document.querySelectorAll(`#list${list} .listItem`)[select].classList.add('active');
    };

    let clearListInputValue = () => {
        for(let i = 0; i < 3; i++){
            document.querySelectorAll('.birthday input')[i].value = '';
        }
    };

    let setListItemActive = () => {
        for(let i = 0; i < 3; i++){
            let list;
            if(i == 0) list = 'Day';
            if(i == 1) list = 'Month';
            if(i == 2) list = 'Year';

            for(let j = 0; j < document.querySelectorAll(`#list${list} .listItem`).length; j++){
                document.querySelectorAll(`#list${list} .listItem`)[j].classList.remove('active');
            }
            document.querySelectorAll(`#list${list} .listItem`)[listItemActive[list.toLowerCase()]].classList.add('active');
            listPosition[list.toLowerCase()] = listItemActive[list.toLowerCase()];
        }
    };

    let selectListItems = () => {
        for(let i = 0; i < 3; i++){
            let list;
            if(i == 0) list = 'Day';
            if(i == 1) list = 'Month';
            if(i == 2) list = 'Year';
            document.getElementById(`list${list}`).addEventListener('mouseover', (e) => {
                let index = Array.apply(null, document.querySelectorAll(`#list${list} .listItem`)).indexOf(e.target);
                setListItemSelected(i, index);
                listPosition[list.toLowerCase()] = index;
            });
            document.getElementById(`list${list}`).addEventListener('mousedown', (e) => {
                listItemActive[list.toLowerCase()] = e.target.getAttribute('data-index');
                if(i == 1){
                    createListItems();
                } else{
                    setListItemActive();
                    setListInputValue();
                    document.querySelectorAll('.birthdayInput')[i].classList.remove('active');
                    clearListInputValue();
                }
            });
        }
    };

    let setListInputValue = () => {
        for(let i = 0; i < 3; i++){
            let list;
            if(i == 0) list = 'Day';
            if(i == 1) list = 'Month';
            if(i == 2) list = 'Year';
            document.querySelectorAll('.birthdayInput')[i].setAttribute('aria-label', document.querySelectorAll(`#list${list} .listItem`)[listItemActive[list.toLowerCase()]].innerHTML);
            if(listItemActive[list.toLowerCase()] != 0){
                document.querySelectorAll('.birthdayInput')[i].classList.add('--black');  
            } else{
                document.querySelectorAll('.birthdayInput')[i].classList.remove('--black');
            }
        }
    };

    let createListItems = () => {
        document.getElementById('listDay').innerHTML = '';
        document.getElementById('listMonth').innerHTML = '';
        document.getElementById('listYear').innerHTML = '';

        if(listItemActive.day > date[listItemActive.month][1]){
            listItemActive.day = 0;
        }

        // Day
        for(let i = 0; i <= date[listItemActive.month][1]; i++){
            let elem = document.createElement('li');
            elem.classList.add('list__item');
            elem.classList.add('listItem');
            elem.setAttribute('data-index', `${i}`);
            elem.innerHTML = i == 0 ? 'День' : i;
            document.getElementById('listDay').appendChild(elem);
        }

        // Month
        for(let i = 0; i <= 12; i++){
            let elem = document.createElement('li');
            elem.classList.add('list__item');
            elem.classList.add('listItem');
            elem.setAttribute('data-index', `${i}`);
            elem.innerHTML = date[i][0];
            document.getElementById('listMonth').appendChild(elem);
        }

        // Year
        for(let i = yearsRange[1] + 1, j = 0; i >= yearsRange[0]; i--, j++){
            let elem = document.createElement('li');
            elem.classList.add('list__item');
            elem.classList.add('listItem');
            elem.setAttribute('data-index', `${j}`);
            if(i == yearsRange[1] + 1){
                elem.innerHTML = 'Год';
            } else{
                elem.innerHTML = i;
            }
            document.getElementById('listYear').appendChild(elem);
        }
        setListInputValue();
        setListItemActive();
        selectListItems();
    };
    createListItems();

    // Click to input. Show/hide list
    window.addEventListener('mousedown', (e) => {
        for(let i = 0; i < 3; i++){
            if(!listDisabled && (e.target == document.querySelectorAll('.birthdayInput')[i] || document.querySelectorAll('.birthdayInput')[i].contains(e.target))){
                if(e.target == document.querySelectorAll('.list')[i] || document.querySelectorAll('.list')[i].contains(e.target)){
                    
                } else{
                    if(listInputActive != null && listInputActive != i){
                        document.querySelectorAll('.birthdayInput')[listInputActive].classList.remove('active');
                    }
                    listInputActive = i;
                    document.querySelectorAll('.birthdayInput')[i].classList.toggle('active');
                    setListStyle();
                    setListItemActive();
                }
            } else{
                document.querySelectorAll('.birthdayInput')[i].classList.remove('active');
                clearListInputValue();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        // Arrows. Select list item
        if(e.code == 'ArrowDown'){
            let list, k;
            for(let i = 0; i < 3; i++){
                if(document.activeElement == document.querySelectorAll('.birthday input')[i]){
                    if(i == 0) list = 'Day';
                    if(i == 1) list = 'Month';
                    if(i == 2) list = 'Year';
                    k = i;
                }
            }
            if(!listDisabled && document.querySelectorAll(`#list${list} .listItem`)[listPosition[list.toLowerCase()] + 1] != null){
                listPosition[list.toLowerCase()]++;
                setListItemSelected(k, listPosition[list.toLowerCase()]);
                listItemSelect[list.toLowerCase()] = listPosition[list.toLowerCase()];
                document.querySelectorAll(`#list${list} .listItem`)[listPosition[list.toLowerCase()]].scrollIntoView();
            }
        }
        if(e.code == 'ArrowUp'){
            let list, k;
            for(let i = 0; i < 3; i++){
                if(document.activeElement == document.querySelectorAll('.birthday input')[i]){
                    if(i == 0) list = 'Day';
                    if(i == 1) list = 'Month';
                    if(i == 2) list = 'Year';
                    k = i;
                }
            }
            if(!listDisabled && document.querySelectorAll(`#list${list} .listItem`)[listPosition[list.toLowerCase()] - 1] != null){
                listPosition[list.toLowerCase()]--;
                setListItemSelected(k, listPosition[list.toLowerCase()]);
                listItemSelect[list.toLowerCase()] = listPosition[list.toLowerCase()];
                document.querySelectorAll(`#list${list} .listItem`)[listPosition[list.toLowerCase()]].scrollIntoView();
            }
        }
        // Backspace and Enter. Clear/set active list item
        if(!listDisabled && e.code == 'Backspace'){
            clearListInputValue();
        }
        if(!listDisabled && e.code == 'Enter'){
            for(let i = 0; i < 3; i++){
                let list;
                if(i == 0) list = 'Day';
                if(i == 1) list = 'Month';
                if(i == 2) list = 'Year';
                if(document.activeElement == document.querySelectorAll('.birthday input')[i]){
                    listItemActive[list.toLowerCase()] = listItemSelect[list.toLowerCase()];
                    setListItemActive();
                    setListInputValue();
                    document.querySelectorAll('.birthdayInput')[i].classList.remove('active');
                }
            }
        }
    });

    // Enter value in listDay input
    document.querySelectorAll('.birthday input')[0].addEventListener('input', () => {
        if(Array.apply(null, document.querySelectorAll('.birthdayInput')[0].classList).indexOf('active') >= 0 && document.querySelectorAll('.birthdayInput input')[0].value != ''){
            let result = document.querySelectorAll('.birthdayInput input')[0].value.match(/\d/g);
            if(result != null){
                if(result.length != 0){
                    result = result.join('');
                    if(result <= date[listItemActive.month][1]){
                        listItemSelect.day = result;
                        document.querySelectorAll('#listDay .listItem')[result].scrollIntoView();
                        setListItemSelected(0, result);
                    }
                }
            }
        }
    });

    // Enter value in listMonth input
    document.querySelectorAll('.birthday input')[1].addEventListener('input', () => {
        if(Array.apply(null, document.querySelectorAll('.birthdayInput')[1].classList).indexOf('active') >= 0 && document.querySelectorAll('.birthdayInput input')[1].value != ''){
            let result = document.querySelectorAll('.birthdayInput input')[1].value.match(/[а-яА-Я]/g);
            if(result != null){
                if(result.length != 0){
                    result = result.join('').toLowerCase();
                    for(let i = 0; i < 13; i++){
                        if(date[i][0].toLowerCase().startsWith(result)){
                            result = i;
                            break;
                        }
                    }
                    if(typeof result == 'number'){
                        listItemSelect.month = result;
                        document.querySelectorAll('#listMonth .listItem')[result].scrollIntoView();
                        setListItemSelected(1, result);
                    }
                }
            }
        }
    });

    // Enter value in listYear input
    document.querySelectorAll('.birthday input')[2].addEventListener('input', () => {
        if(Array.apply(null, document.querySelectorAll('.birthdayInput')[2].classList).indexOf('active') >= 0 && document.querySelectorAll('.birthdayInput input')[2].value != ''){
            let result = document.querySelectorAll('.birthdayInput input')[2].value.match(/\d/g);
            if(result != null){
                if(result.length != 0){
                    result = result.join('');
                    for(let i = 0; i < document.querySelectorAll('#listYear .listItem').length; i++){
                        if(document.querySelectorAll('#listYear .listItem')[i].innerHTML.startsWith(result.toString())){
                            result = i;
                            break;
                        }
                    }
                    if(typeof result == 'number'){
                        listItemSelect.year = result;
                        document.querySelectorAll('#listYear .listItem')[result].scrollIntoView();
                        setListItemSelected(2, result);
                    }
                }
            }
        }
    });

    document.forms.registration.onsubmit = () => {
        registrationSendRequest();
        return false;
    }

    // Focus on list
    for(let i = 0; i < 3; i++){
        if(i == 0) list = 'Day';
        if(i == 1) list = 'Month';
        if(i == 2) list = 'Year';
        document.querySelectorAll('.birthdayInput input')[i].onfocus = () => {
            document.querySelectorAll('.birthdayInput')[i].classList.add('active');
            listInputActive = i;
        };
        document.querySelectorAll('.birthdayInput input')[i].onblur = () => {
            document.querySelectorAll('.birthdayInput')[i].classList.remove('active');
        };
    }
    // ==============
    // /Birthday
    // ==============

    // Registration red popUp hide
    document.addEventListener('click', () => {
        document.getElementById('registrationPopUpNameSurname-1').style.opacity = 0;
        document.getElementById('registrationPopUpNameSurname-2').style.opacity = 0;
        document.getElementById('registrationPopUpBirthday').style.opacity = 0;
        document.getElementById('registrationPopUpSex').style.opacity = 0;
    });

    // Content Btn mousedown translate
    let jumpingBtn = () => {
        let standartPaddingTop = [];
        let standartPaddingBottom = [];
        let href = [];
        
        for(let i = 0; i < document.querySelectorAll('.jumpingBtn').length; i++){
            standartPaddingTop[i] = window.getComputedStyle(document.querySelectorAll('.jumpingBtn')[i]).paddingTop;
            standartPaddingBottom[i] = window.getComputedStyle(document.querySelectorAll('.jumpingBtn')[i]).paddingBottom;
            document.querySelectorAll('.jumpingBtn')[i].addEventListener('mousedown', () => {
                document.querySelectorAll('.jumpingBtn')[i].style.paddingTop = `${window.getComputedStyle(document.querySelectorAll('.jumpingBtn')[i]).paddingTop.slice(0, -2)*1 + 2}px`;
                document.querySelectorAll('.jumpingBtn')[i].style.paddingBottom = `${window.getComputedStyle(document.querySelectorAll('.jumpingBtn')[i]).paddingBottom.slice(0, -2)*1 - 2}px`;
            });
        }

        for(let i = 0; i < document.querySelectorAll('.jumpingBtnWithClass').length; i++){
            document.querySelectorAll('.jumpingBtnWithClass')[i].addEventListener('mousedown', () => {
                document.querySelectorAll('.jumpingBtnWithClass')[i].classList.add('active');
                href[i] = document.querySelectorAll('.jumpingBtnWithClassLink')[i].getAttribute('href');
                document.querySelectorAll('.jumpingBtnWithClassLink')[i].removeAttribute('href');
            });
        }

        document.addEventListener('mouseup', () => {
            for(let i = 0; i < document.querySelectorAll('.jumpingBtn').length; i++){
                document.querySelectorAll('.jumpingBtn')[i].style.paddingTop = standartPaddingTop[i];
                document.querySelectorAll('.jumpingBtn')[i].style.paddingBottom = standartPaddingBottom[i];
            }
            for(let i = 0; i < document.querySelectorAll('.jumpingBtnWithClass').length; i++){
                document.querySelectorAll('.jumpingBtnWithClass')[i].classList.remove('active');
                for(let j = 0; j < document.querySelectorAll('.jumpingBtnWithClassLink').length; j++){
                    if(!document.querySelectorAll('.jumpingBtnWithClassLink')[j].hasAttribute('href')){
                        document.querySelectorAll('.jumpingBtnWithClassLink')[j].setAttribute('href', `${href[j]}`);
                    }
                }
            }
        });
    };
    jumpingBtn();

    // Facebook link
    setTimeout(() => {
        document.getElementById('registrationUseFacebook').style.height = '55px';
    }, 500);

    // function Update called evry screen render
    let update = () => {
        // Search
        if(document.getElementById('searchInput').value != ''){
            document.getElementById('search').classList.add('hideAfter');
        } else{
            document.getElementById('search').classList.remove('hideAfter');
        }

        // Content inputs
        for(let input of document.querySelectorAll('.contentInput')){
            if(input.children[0].value != ''){
                input.classList.add('hideAfter');
            } else{
                input.classList.remove('hideAfter');
            }
        }

        // checkbox
        if(document.forms.authorization.password.value != ''){
            document.getElementById('authorizationForgot').style.display = 'none';
            document.getElementById('authorizationCheckbox').style.display = 'block';
        } else{
            document.getElementById('authorizationForgot').style.display = 'block';
            document.getElementById('authorizationCheckbox').style.display = 'none';
        }

        requestAnimationFrame(update);
    };
    update();
});