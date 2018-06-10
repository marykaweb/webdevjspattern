$(document).ready(function(){

	var checkRegistration = (function(){
		// переменные
		var _emailField = $('[data-field-mail]');
		var _passField = $('[data-field-pass]');
		var _adminemail = 'mail@mail.ru';
		var _adminpass = '123';
		var _formReg = $("#formRegistration");
		var _pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		var _errEmail = $('<div class="error err-email-hide"></div>');
		var _errFormatMail = $('<div class="error err-format-email-hide" data-error-format-email="Неверный формат email"></div>');
		var _errPass = $('<div class="error err-email-hide"></div>');
		var _errLogin = $('<div class="error error--with-desc">Данный email уже занят</div>'
			+ '<div class="error-description">'
			+ '<p>Используйте другой email чтобы создать новый аккаунт.</p>'
			+ '<p>Или воспользуйтесь <a href="#">восстановлением пароля</a>, чтобы войти на сайт.</p>');

		var init = function(){
			_formValidate();
		}

		var _formValidate = function() {

			// Отлавливаем события - клик на кнопке “Войти”
			_formReg.on('submit', function(e){
				e.preventDefault();

			// Получаем данные которые ввел пользователь в поля формы
			var _email = _emailField.val().trim().toLowerCase();
			var _password = _passField.val().trim();

			function _errorLogin() {
				_errEmail.text(_emailField.attr('data-field-mail'));
				_emailField.before(_errEmail);	
				_errEmail.fadeIn(1000);
				_emailField.on('focus', function(){
					_errEmail.fadeOut(1000);
				});
			}

			function _errorPass() {
				_errPass.text(_passField.attr('data-field-pass'));
				_emailField.before(_errPass);	
				_errPass.fadeIn(1000);
				_passField.on('focus', function(){
					_errPass.fadeOut(1000);
				});
			}

			function _errorLoginPass() {
				_emailField.before(_errLogin); // добавляем ошибку перед вводом логина
				
				_errLogin.fadeIn(1000); // плавно ее показываем

				_passField.on('focus', function(){
					_errLogin.fadeOut(1000);
				});

				$_emailField.on('focus', function(){
					_errLogin.fadeOut(1000);
				});
			}

			function _errorFormatMail() {
				var _errorFormatMailText = _errFormatMail.data('error-format-email'); // берем текст ошибки из data

				_errFormatMail = _errFormatMail.text(_errorFormatMailText); // добавляем текст в тег

				_emailField.before(_errFormatMail); // добавляем ошибку перед вводом логина

				_errFormatMail.fadeIn(1000);

				_emailField.on('focus', function(){
					_errFormatMail.fadeOut(1000);
				});
			}

				// Делаем проверку

			if ( _email == "" || _password == "" ) {
				if ( _email == "" ) {
					_errorLogin();
				} else if ( !_pattern.test( _email ) ) {
					_errorFormatMail();
				} else if ( _email == "mail@mail.com" ) {
					_errorLoginPass();
				}
				if ( _password == "" ) {
					_errorPass();
				}
			} else {
					if ( _email == "mail@mail.com"  ) {
						_errorLoginPass();
					} else if ( _pattern.test( _email ) &&  _password != '' ) {
							$(_formReg).unbind('submit').submit();
						} 	
				}


			});

		}


		return {
			init
		}

	}());

	checkRegistration.init();

});