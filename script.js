function ClickLogo() {  
  location.href = "/index.html";
}
function ClickStart() {
  location.href = "/Game/Game.html";
}
function ClickRank() {
  location.href = "/Rank/Rank.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("nickname-container");

  const savedNickname = localStorage.getItem("nickname");
  if (savedNickname) {
    showNickname(savedNickname);
  } else {
    showInputField();
  }
  

  function showNickname(nickname) {
    container.innerHTML = `
      <div id="nickname-display" style="font-size: 35px; margin-right: 20px;">${nickname}</div>
      <button id="edit-button">수정</button>
    `;

    const editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", () => {
      localStorage.removeItem("nickname");
      showInputField();
    });
  }

  function showInputField() {
    container.innerHTML = `
      <form id="nickname-form">
        <input type="text" id="nickname-input" maxlength="10" placeholder="닉네임을 입력해주세요" />
        <button id="save-button" type="submit">Save</button>
      </form>
    `;

    const form = document.getElementById("nickname-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputField = document.getElementById("nickname-input");
      const nickname = inputField.value.trim();
      if (nickname) {
        localStorage.setItem("nickname", nickname);
        showNickname(nickname);
      } else {
        alert("닉네임을 입력해주세요!");
      }
    });
  }
});
