function addQuestion() {
  const questionText = document.getElementById('question').value.trim();
  const inputType = document.getElementById('input-type').value;
  if (!questionText) return;

  const li = document.createElement('li');

  let inputElement = '';
  if (inputType === 'text') {
    inputElement = `<input type="text" placeholder="Your answer..." />`;
  } else if (inputType === 'radio') {
    inputElement = `
      <label><input type="radio" name="${questionText}"> Option 1</label>
      <label><input type="radio" name="${questionText}"> Option 2</label>
    `;
  } else if (inputType === 'checkbox') {
    inputElement = `
      <label><input type="checkbox"> Option A</label>
      <label><input type="checkbox"> Option B</label>
    `;
  }

  li.innerHTML = `
    <div><strong>${questionText}</strong></div>
    <div class="form-preview">${inputElement}</div>
  `;

  document.getElementById('survey-list').appendChild(li);
  document.getElementById('question').value = '';
}
