function fixText(text = '') {
  let trimmedText = text.trim();
  let upperCaseChar = trimmedText.charAt(0).toUpperCase();
  if(!upperCaseChar) return trimmedText;
  let lowerCaseString = trimmedText.slice(1).toLowerCase();
  return upperCaseChar + lowerCaseString;
}




QUnit.test("fix - 'terje'", function (assert) {
  const actual = fixText('terje');
  const expected = 'Terje';
  assert.equal(actual, expected);
});

QUnit.test("fix - 'terje '", function (assert) {
  const actual = fixText('terje ');
  const expected = 'Terje';
  assert.equal(actual, expected);
});

QUnit.test("fix - ' terje'", function (assert) {
  const actual = fixText(' terje');
  const expected = 'Terje';
  assert.equal(actual, expected);
});

QUnit.test("fix - ' terje '", function (assert) {
  const actual = fixText(' terje ');
  const expected = 'Terje';
  assert.equal(actual, expected);
});

QUnit.test("fix - ' TeRjE '", function (assert) {
  const actual = fixText(' TeRjE ');
  const expected = 'Terje';
  assert.equal(actual, expected);
});

QUnit.test("fix - ' OstKake '", function (assert) {
  const actual = fixText(' OstKake ');
  const expected = 'Ostkake';
  assert.equal(actual, expected);
});