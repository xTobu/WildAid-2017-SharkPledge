//表單驗證 validate.js
var Validation = {
	//規則

	Rule: {
		zh: {
			category: {
				presence: true,
				exclusion: {
					within: ['0'],
					message: '^【企業類別】請選擇企業類別',
				},
			},
			name: {
				presence: {
					allowEmpty: false,
					message: '^【企業名稱】不可為空白',
				},
			},
			shortname: {
				presence: {
					allowEmpty: false,
					message: '^【企業簡稱】不可為空白',
				},
				length: {
					maximum: 18,
					message: '^【企業簡稱】必須在18個字以內',
				},
			},
		},
		en: {
			category: {
				presence: true,
				exclusion: {
					within: ['0'],
					message: '^·Please select a Business Category',
				},
			},
			name: {
				presence: {
					allowEmpty: false,
					message: '^·Please type in your Company Name',
				},
			},
			shortname: {
				presence: {
					allowEmpty: false,
					message: '^·Please type in your Company Abbreviation',
				},
				length: {
					maximum: 18,
					message:
						'^·Company abbreviation must be less than 18 words',
				},
			},
		},
	},

	GetFormData: function() {
		var FormVal = {};
		var $form = Index.Element.join.form;

		for (var prop in $form) {
			FormVal[prop] = $form[prop].val();
		}

		return FormVal;
	},
	//回傳結果 格式：json
	Result: function() {
		//Youtube Reg
		var GetFormData = this.GetFormData();

		var req = {};
		var CheckData = validate(GetFormData, this.Rule[vueApp.$route.name]);
		if (CheckData) {
			req.Status = false;
			req.Resp = CheckData;
		} else {
			req.Status = true;
			req.Data = GetFormData;
		}

		return req;
	},
};
