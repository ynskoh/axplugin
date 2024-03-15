document.addEventListener("DOMContentLoaded",function(){
	// setSignInButtonHandler();
	// setGroupSelect();
	// initAutoCompleteGroup()
})



/*
common
*/
// 폼 오류 메세지 출력
function bindValidateMsg(form, text) {
	const msger = form.nextElementSibling?.classList.contains('validate_msg') ? form.nextElementSibling : null;
	if(msger) msger.textContent = text;
}


/*
login form page
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


/*
diagnosis form page
*/
// 자동완성 실행
function setAutoComplete(req, data) {
	const newGroupBtn = createNewGroupBtn(req.gNum);
	const mapGroup = mapGroupData(req, data);
	// const comboArr = mapGroup.map(item => item.name);
	// console.log(req);
	
	const config = {
		selector: req.comboId,
		placeHolder: "선택",
		wrapper: true,
		data: {
			src: mapGroup,
			keys: ["name"],
		},
		trigger: (query) => { return true },
		resultsList: {
			tag: "div",
			noResults: true,
			maxResults: 20,
			tabSelect: true,
			element: (list, data) => {
				list.classList.add('select_list');
				list.appendChild(newGroupBtn);
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
					autoCompleteJS.start()
				}
			}
		},

	}

	const autoCompleteJS = new autoComplete(config);
	
	autoCompleteJS.input.addEventListener("selection", function (event) {
		const feedback = event.detail;
		const group2 = document.getElementById("groupCombo2");
		const group3 = document.getElementById("groupCombo3");
		const group1Seq = document.getElementById("gSeq1");
		const group2Seq = document.getElementById("gSeq2");
		const group3Seq = document.getElementById("gSeq3");
		// console.log(feedback.selection);
		if(req.gNum && req.gNum != 3) {
			const comboId = req.gNum == 1 ? "#groupCombo2" : "#groupCombo3";
			const reqData = {
				comboId : comboId,
				gNum : req.gNum + 1,
				g1Seq : feedback.selection.value.g1Seq,
				g2Seq : feedback.selection.value.g2Seq ? feedback.selection.value.g2Seq : '',
			}

			setAutoComplete(reqData, data);

			if(req.gNum == 1) {
				group2.disabled = false;
				group3.disabled = true;
				group2.value = '';
				group3.value = '';
				group2Seq.value = '';
				group3Seq.value = '';
				group1Seq.value = feedback.selection.value.g1Seq;
			}
			if(req.gNum == 2) {
				group3.disabled = false;
				group3.value = '';
				group3Seq.value = '';
				group2Seq.value = feedback.selection.value.g2Seq;
			}
		}

		if(req.gNum == 3) {
			group3Seq.value = feedback.selection.value.g3Seq;
		}
		
		autoCompleteJS.input.blur();
		const selection = feedback.selection.match;
		autoCompleteJS.input.value = selection;
	});
}



// group api 데이터 가져오기
async function fetchGroupData(param) {

	const url = 'https://staging-ax.beusable.net/api/dashboard/lnb/getLnbAll';
	// let result = {};

	/*
	const response = fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(param)
	});
		// dummy data 출력 주석처리
	if (!response.ok) {
		throw new Error('네트워크 응답이 올바르지 않습니다');
	}
	// const responseData = await response.json();
	groupData = await response.json(); // 전역변수 groupData 에 fetch 데이터 삽입
	*/

	groupData = dummyData; // 삭제 예정
}


// 자동완성용 group 데이터로 가공 처리
function mapGroupData(req, data) {
	let result = data;
	if(req.gNum === 1) {
		result = result[0].g1.map(item => {
			return {name: item.g1_title, g1Seq: item.g1Seq}
		});
	}
	if(req.gNum === 2) {
		const g1Data = result[0].g1.find(item => item.g1Seq === req.g1Seq);
		result = g1Data.g2.map(item => {
			return {name: item.g2_title, g1Seq: g1Data.g1Seq, g2Seq: item.g2Seq}
		});
	}
	if(req.gNum === 3) {
		const g1Data = result[0].g1.find(item => item.g1Seq === req.g1Seq);
		const g2Data = g1Data.g2.find(item => item.g2Seq === req.g2Seq);
		result = g2Data.g3.map(item => {
			return {name: item.g3_title, g1Seq: g1Data.g1Seq, g2Seq: g2Data.g1Seq, g3Seq: item.g3Seq}
		});
	}
	// console.log(result);
	return result;
}


// 새그룹 버튼 생성
function createNewGroupBtn(gNum) {
	const btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.classList.add("group_add");
	btn.textContent = "새그룹";
	btn.addEventListener("click", (event) => {
		const btn = event.currentTarget;
		const wrap = btn.closest('.select_wrap');
		wrap.classList.add("new_wrap");
		const newInput = wrap.querySelector('.select_new');
		newInput.focus();

		const group2 = document.getElementById("groupCombo2");
		const group3 = document.getElementById("groupCombo3");
		const group2Seq = document.getElementById("gSeq2");
		const group3Seq = document.getElementById("gSeq3");

		if(gNum == 1) {
			group2.disabled = true;
			group3.disabled = true;
			group2.value = '';
			group3.value = '';
			group2Seq.value = '';
			group3Seq.value = '';
		}
		if(gNum == 2) {
			group3.disabled = true;
			group3.value = '';
			group3Seq.value = '';
		}
	});
	return btn;
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
				if(validateNewGroup(newName)) {
					newGroupSubmitEvent(newName, event);
				} else {
					alert("그룹명이 잘못됐습니다.")
				}
			}
		})
	})
}


// 새그룹 이름 유효성 검사
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

// 새 그룹 추가 처리
function newGroupSubmitEvent(name){
	const check = confirm("["+name+"] 그룹을 새롭게 추가하시겠습니까?");
	if(check) { // 추가하기
		alert("추가완료")
	}
}


// 진단 제외/진단할 요소 체크 박스 이벤트
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

// 진단 start 버튼 이벤트
function setStartBtnHandler() {
	const submitBtn = document.getElementById("formSubmit");
	submitBtn.addEventListener("click", () => {
		const form = document.getElementById("diagnosisForm");

		const formData = new FormData(form);
		const jsonObject = {};
		for (const [key, value] of formData.entries()) {
			jsonObject[key] = value;
		}
		const jsonString = JSON.stringify(jsonObject);

		// 진단 start 버튼 이벤트 처리
		console.log(jsonObject)
		console.log(jsonString)
		console.log("diagnosis start");
	})
}
