// 1 isEmailBasic
// isEmailBasic only checks if there's a @

function isEmailBasic(text) {
  if (!text || typeof text != "string") 
    return false;
	
  if (text.indexOf("@") == -1) 
    return false;
  
  return true;
}

QUnit.module("isEmailBasic", function () {
	QUnit.test("string with @", function (assert) {
		assert.equal(isEmailBasic("epost@epost"), true);
	});

	QUnit.test("string without @", function (assert) {
		assert.equal(isEmailBasic("epostepost"), false);
	});

	QUnit.test("no input", function (assert) {
		assert.equal(isEmailBasic(), false);
	});

	QUnit.test("number", function (assert) {
		assert.equal(isEmailBasic(1), false);
	});
});

// 2 isEmailSimple
// isEmailSimple checks if there's a @ and no whitespace

function isEmailSimple(text) {
  if (!text || typeof text != "string") 
    return false;

  if (text.indexOf(" ") != -1) 
    return false;

	if (text.indexOf("@") == -1) 
    return false;

	return true;
}

QUnit.module("isEmailSimple", function () {
	QUnit.test("string with @", function (assert) {
		assert.equal(isEmailSimple("epost@epost"), true);
	});

	QUnit.test("string without @", function (assert) {
		assert.equal(isEmailSimple("epostepost"), false);
	});

	QUnit.test("string with @ and whitespace", function (assert) {
		assert.equal(isEmailSimple("epostepost"), false);
	});

	QUnit.test("no input", function (assert) {
		assert.equal(isEmailSimple(), false);
	});

	QUnit.test("number", function (assert) {
		assert.equal(isEmailSimple(1), false);
	});
});

// 3 isEmailAdvanced
// isEmailSimple checks if there's a dot before and after @ sign and no whitespace

function isEmailAdvanced(text) {
  if (!text || typeof text != "string") 
    return false;

  if (text.indexOf(" ") != -1) 
    return false;
    
  let firstDotIndex = text.indexOf(".");

  if(!firstDotIndex || firstDotIndex == -1) 
    return false;

  let adressSignIndex = text.indexOf('@');
  if (adressSignIndex == -1 || firstDotIndex > adressSignIndex) 
    return false;
  
  let secondDotIndex = text.indexOf('.', adressSignIndex-1);
  if(secondDotIndex == -1) 
    return false;
  
	return true;
}

QUnit.module("isEmailAdvanced", function () {
	QUnit.test("string with only @", function (assert) {
		assert.equal(isEmailAdvanced("epost@epost"), false);
	});

	QUnit.test("string without @", function (assert) {
		assert.equal(isEmailAdvanced("epostepost"), false);
	});

	QUnit.test("string with @ and whitespace", function (assert) {
		assert.equal(isEmailAdvanced("epostepost"), false);
	});

  QUnit.test("string with dot before and after @ ", function (assert) {
		assert.equal(isEmailAdvanced("epost.epost@epost.no"), true);
	});

  QUnit.test("string with dot before @ ", function (assert) {
		assert.equal(isEmailAdvanced("epost.epost@epostno"), false);
	});

	QUnit.test("no input", function (assert) {
		assert.equal(isEmailAdvanced(), false);
	});

	QUnit.test("number", function (assert) {
		assert.equal(isEmailAdvanced(1), false);
	});
});

