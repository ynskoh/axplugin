/*
document.addEventListener("DOMContentLoaded",function(){
	// setSignInButtonHandler();
	// setGroupSelect();
	// initAutoCompleteGroup()
})
*/

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
function setSignInButtonHandler() {
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

	const btnGroup = document.createElement("button");
	btnGroup.classList.add("group_add");
	btnGroup.textContent = "새그룹";
	btnGroup.addEventListener("click", (event) => {
		const btn = event.currentTarget;
		const wrap = btn.closest('.select_wrap');
		wrap.classList.add("new_wrap");
		const newInput = wrap.querySelector('.select_new');
		newInput.focus();
	});

	/*
	// fetch통해 받아온 그룹1 데이터 -> data1
	const data1 = dummyData;

	// fetch통해 받아온 그룹2 데이터 -> data2
	const data2 = dummyData;

	// fetch통해 받아온 그룹3 데이터 -> data3
	const data3 = dummyData;
	*/



	// 그룹1 자동완성 검색 옵션
	const config1 = {
		selector: "#groupCombo1",
		placeHolder: "선택",
		wrapper: true,
		data: {
			src: ["1차그룹111", "1차그룹222", "1차그룹333","1차그룹444", "1차그룹555", "1차그룹666"],
			cache: true,
		},
		trigger: (query) => { return true },
		resultsList: {
			tag: "div",
			noResults: true,
			maxResults: 20,
			tabSelect: true,
			element: (list, data) => {
				list.classList.add('select_list');
				list.appendChild(btnGroup);
			},
		},
		resultItem: {
			tag: "div",
			element: (item, data) => {
				item.classList.add('select_option');
			},
		},
		events: {
			input: {
				focus: () => {
					autoCompleteJS1.start()
				}
			}
		},

	}


	// 그룹2 자동완성 검색 옵션
	const config2 = {
		selector: "#groupCombo2",
		placeHolder: "선택",
		data: {
			src: ["2차그룹111", "2차그룹222", "2차그룹333"]
		},
		trigger: (query) => { return true },
		resultsList: {
			tag: "div",
			noResults: true,
			maxResults: 20,
			tabSelect: true,
			element: (list, data) => {
				list.classList.add('select_list');
				list.appendChild(btnGroup);
			},
		},
		resultItem: {
			tag: "div",
			element: (item, data) => {
				item.classList.add('select_option');
			},
		},
		events: {
			input: {
				focus: () => {
					autoCompleteJS2.start()
				}
			}
		},
	}

	// 그룹3 자동완성 검색 옵션
	const config3 = {
		selector: "#groupCombo3",
		placeHolder: "선택",
		data: {
			src: ["검수제목11", "검수제목22", "검수제목33","검수제목44", "검수제목55", "검수제목66"],
		},
		trigger: (query) => { return true },
		resultsList: {
			tag: "div",
			noResults: true,
			maxResults: 20,
			tabSelect: true,
			element: (list, data) => {
				list.classList.add('select_list');
				list.appendChild(btnGroup);
			},
		},
		resultItem: {
			tag: "div",
			element: (item, data) => {
				item.classList.add('select_option');
			},
		},
		events: {
			input: {
				focus: () => {
					autoCompleteJS3.start()
				}
			}
		},
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


// group  가져오기
async function getGroups(param){

	const url = 'https://staging-ax.beusable.net/api/dashboard/lnb/getLnbAll';
	let result = {};

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(param)
	});
	/*	// dummy data 출력 주석처리
	if (!response.ok) {
		throw new Error('네트워크 응답이 올바르지 않습니다');
	}
	const responseData = await response.json();
	return responseData;
	*/
	
	// return dummyData;

}


// group 데이터 그룹별 출력
function setGroupData(group) {
	const groupData = getGroups();
	console.log(groupData);
}



// 새그룹 이벤트 리스너
function setNewGroupInputHandler() {
	const newInputs = document.querySelectorAll(".select_new");

	newInputs.forEach(newInput => {
		newInput.addEventListener("blur", (event) => {	// 새그룹 작성 중 다른 포커스 아웃 (취소)
			newGroupCancelEvent(event);
		});

		newInput.addEventListener("keydown", (event) => {
			if (event.key === 'Escape' || event.keyCode === 27) {	// 새그룹 작성 중 esc 키 입력 (취소)
				newGroupCancelEvent(event);
			}

			if (event.key === 'Enter' || event.keyCode === 13) {	// 새그룹 작성 후 enter 키 입력 (추가하기)
				const newName = newInput.value;
				if(validateNewGroup(newName)) newGroupSubmitEvent(newName);
			}
		})
	})
}




// 새 그룹이름 유효성 검사
function validateNewGroup(name) {
	if(name === "") {
		return false;
	}
	return true;
}

// 새 그룹 취소
function newGroupCancelEvent(event) {
	const thisInput = event.target;
	const wrap = thisInput.closest('.select_wrap');
	const autoInput = wrap.querySelector(".select_box");
	thisInput.value = "";
	autoInput.value = "";
	wrap.classList.remove("new_wrap");
	event.stopPropagation();
}

// 새 그룹 추가
function newGroupSubmitEvent(name){
	const check = confirm("["+name+"] 그룹을 새롭게 추가하시겠습니까?");
	if(check) { // 추가하기
		alert("추가완료")
	}
}





// 진단 제외 요소 체크 박스 이벤트
function setCheckDisableHandler() {
	const checkBoxes = document.querySelectorAll(".checkForm");
	if(!checkBoxes.length) {
		return false;
	}
	checkBoxes.forEach(checkBox => {

		checkBox.addEventListener('change', function() {
			const formId = checkBox.getAttribute("data-control");
			const checkForm = document.getElementById(formId);
			if(!checkForm) return false;
			if (checkBox.checked) {
				checkForm.disabled = false;
			} else {
				checkForm.disabled = true;
			}
		})

	})
}






// console.log(dummyData)

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

