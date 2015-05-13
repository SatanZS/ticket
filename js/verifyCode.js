var code; //在全局 定义验证码
function createCode() {
	code = new Array();
	var codeLength = 4; //验证码的长度
	var checkCode = document.getElementById("checkCode");
	checkCode.innerHTML = "";

	var selectChar = new Array(2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

	for (var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 32);
		code += selectChar[charIndex];
	}
	if (code.length != codeLength) {
		createCode();
	}
	checkCode.innerHTML = code;
}

function validate() {
	var inputCode = document.getElementById("codeText").value.toUpperCase();
	if (inputCode.length <= 0) {
		alert("请输入验证码！");
		return false;
	} else if (inputCode != code) {
		alert("验证码输入错误！");
		createCode();
		return false;
	} else {
//		alert("成功！");
		return true;
	}
}
function validateForm(jsonData){
	var userName = $("#userName").val();
	var pwd = $("#pwd").val();
	var userNameArray = new Array();
	var pwdArray = new Array();
	var inputCode = document.getElementById("codeText").value.toUpperCase();
	if (userName.length <= 0) {
		alert("请输入用户名！");
		return false;
	} else {
		if (pwd.length <= 0) {
			alert("请输入密码！");
		} else {
			if (inputCode.length <= 0) {
				alert("请输入验证码！");
				return false;
			} else if (inputCode != code) {
				alert("验证码输入错误！");
				createCode();
				return false;
			} else {
				for (var i = 0;i<jsonData.length;i++) {
					userNameArray.push(jsonData[i].userName);
					pwdArray.push(jsonData[i].pwd);
				}
				if($.inArray(userName, userNameArray) > -1){
					if(pwd == pwdArray[$.inArray(userName, userNameArray)]){
						return true;
					}else{
						alert("密码不正确");
						createCode();
						return false;
					}
				}else{
					alert("用户名不存在");
					createCode();
					return false;
				}
				
			}
		}
	}
}