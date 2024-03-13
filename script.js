document.addEventListener("DOMContentLoaded",function(){
	
	// setSignInButtonEvent();
	// setGroupSelect();
	// initAutoCompleteGroup()


})



// 로그인 유효성 확인
function setSignFormValidate() {
	const idInput = document.getElementById("loginId");
	const pwInput = document.getElementById("loginPw");
	
	// 아이디 체크
	if(idInput) {
		const idValue = idInput.value?.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if(idValue === '') { // 아이디 미입력
			bindValidateMsg(idInput, "아이디를 입력해주세요");
			return false;

		} else if(!emailRegex.test(idValue)) {  // 아이디 이메일 형식 x
			bindValidateMsg(idInput, "아이디는 이메일 형식으로 입력해주세요");
			return false;
		} else {
			bindValidateMsg(idInput, "");
		}

	}

	// 비밀번호 체크
	if(pwInput) {
		const pwValue = pwInput.value?.trim();	// 입력한 비번 값
		const auth = true;

		if(!auth) { // 잘못된 비밀번호
			bindValidateMsg(pwInput, "아이디 또는 비밀번호를 잘못 입력했습니다.");
			return false;
		} else {
			bindValidateMsg(pwInput, "");
		}

	}

	return true;
}

// 로그인 버튼 이벤트
function setSignInButtonEvent() {
	const btn = document.getElementById("loginBtn");
	if(btn) {
		btn.addEventListener("click", () => {
			const validate = setSignFormValidate();
			if(validate) {	// 유효성 통과
				console.log(1111)
			} else {	// 유효성 실패
				console.log(2222)
			}
		})
	}
}

// 오류 메세지 출력
function bindValidateMsg(form, text) {
	const msger = form.nextElementSibling?.classList.contains('validate_msg') ? form.nextElementSibling : null;
	if(msger) msger.textContent = text;
}



// autocomplete 자동완성 실행
function initAutoCompleteGroup() {

	const config1 = {
		selector: "#groupCombo1",
		placeHolder: "선택",
		data: {
			src: ["1차그룹111", "1차그룹222", "1차그룹333","1차그룹444", "1차그룹555", "1차그룹666"],
			cache: true,
		},
		trigger: (query) => { return true },
		resultsList: {
			noResults: true,
			maxResults: 20,
			tabSelect: true
		},
		events: {
			input: {
				focus: () => {
					autoCompleteJS1.start()
				}
			}
		},

	}



	const config2 = {
		selector: "#groupCombo2",
		placeHolder: "선택",
		data: {
			src: ["2차그룹111", "2차그룹222", "2차그룹333"]
		},
		trigger: (query) => { return true },
		resultsList: {
			noResults: true,
			maxResults: 20,
			tabSelect: true
		},
		events: {
			input: {
				focus: () => {
					autoCompleteJS2.start();
				}
			}
		},
		trigger: (query) => { return true }
	}


	const config3 = {
		selector: "#groupCombo3",
		placeHolder: "선택",
		data: {
			src: ["검수제목11", "검수제목22", "검수제목33","검수제목44", "검수제목55", "검수제목66"],
		},
		trigger: (query) => { return true },
		resultsList: {
			noResults: true,
			maxResults: 20,
			tabSelect: true
		},
		events: {
			input: {
				focus: () => {
					autoCompleteJS3.start();
				}
			}
		}
	}

	const autoCompleteJS1 = new autoComplete(config1);
	const autoCompleteJS2 = new autoComplete(config2);
	const autoCompleteJS3 = new autoComplete(config3);

	autoCompleteJS1.input.addEventListener("selection", function (event) {
		const feedback = event.detail;
		autoCompleteJS1.input.blur();
		const selection = feedback.selection.value;
		autoCompleteJS1.input.value = selection;
	});

	autoCompleteJS2.input.addEventListener("selection", function (event) {
		const feedback = event.detail;
		autoCompleteJS2.input.blur();
		const selection = feedback.selection.value;
		autoCompleteJS2.input.value = selection;
	});

	autoCompleteJS3.input.addEventListener("selection", function (event) {
		const feedback = event.detail;
		autoCompleteJS3.input.blur();
		const selection = feedback.selection.value;
		autoCompleteJS3.input.value = selection;
	});
}




/*
function setGroupSelect() {
	const combos = document.querySelectorAll(".select_wrap");
	if(combos.length) {
		combos.forEach(combo => {
			setComboEvent(combo);
		})	
	}
	
}


function setComboEvent(combo) {
	const box = combo.querySelector(".select_box");
	const list = combo.querySelector(".select_list");

	if(box && list) {

		const listWrap = list.querySelector("ul");
		box.setAttribute('tabindex','0')

		box.addEventListener("keypress", (event) => {
			console.log(event);
			if (event.key === 'Enter' || event.keyCode === 13 || event.keyCode === 32) {
				comboEventHandler(combo ,list);
			}
		})

		box.addEventListener("click", () => {
			comboEventHandler(combo ,list);
		})

		document.body.addEventListener('click', event => {
			if (!list.contains(event.target) && event.target !== box) {
		        combo.classList.remove('select_active');
		    }
		});
	}
	
}


function comboEventHandler(combo ,list) {
	
	const listWrap = list.querySelector("ul");
	combo.classList.toggle('select_active');

	if(!combo.classList.contains('data-load')) {

		// api 호출로 목록 호출 데이터
		const groupList = ['group1', 'group2', 'group3', 'group4444']; // dummy data

		if(groupList.length) {
			
			groupList.forEach(data => {
				const listElement = document.createElement('li');
				listElement.classList.add('select_option');
				listElement.setAttribute('role', 'option');
				listElement.innerText = data;
				listWrap.appendChild(listElement);
			})
		}
		combo.classList.add('data-load');	
	}
		

}*/