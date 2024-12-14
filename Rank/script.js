document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.getElementById("back-button");
  const rankingTableBody = document.querySelector("#ranking-table tbody");
  const nickName = document.getElementById("nickname");
  const savedNickname = localStorage.getItem("nickname");

  const allGameData = JSON.parse(localStorage.getItem("gameData")) || [];
  const currentNickname = localStorage.getItem("nickname");

  if (currentNickname) {
    const finalScore = parseInt(localStorage.getItem("finalScore") || "0", 10);
    const finalStage = parseInt(localStorage.getItem("finalStage") || "0", 10);

    if (finalScore > 0 && finalStage > 0) {
      const existingRecordIndex = allGameData.findIndex(record => record.name === currentNickname);

      if (existingRecordIndex !== -1) {
        allGameData[existingRecordIndex] = {
          name: currentNickname,
          stage: finalStage,
          score: finalScore,
        };
      } else {
        allGameData.push({ name: currentNickname, stage: finalStage, score: finalScore });
      }

      localStorage.setItem("gameData", JSON.stringify(allGameData));
    }
  }

  // 점수를 기준으로 내림차순 정렬
  allGameData.sort((a, b) => b.score - a.score);

  // 1~10등만 표시
  const topRanking = allGameData.slice(0, 10);

  // 랭킹 테이블에 데이터 추가
  topRanking.forEach((data, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${data.name}</td>
      <td>${data.stage}</td>
      <td>${data.score}</td>
    `;
    rankingTableBody.appendChild(row);
  });

  //홈으로 가는 버튼
  backButton.addEventListener("click", () => {
    location.href = "/Home/Home.html";
  });
});

function clearAllRanking() { // 랭킹 차트 초기화
  const currentNickname = localStorage.getItem("nickname");
  if (currentNickname === "admin") {
    localStorage.removeItem("gameData");
    localStorage.removeItem("finalScore");
    localStorage.removeItem("finalStage");
    alert("모든 랭킹 기록과 마지막 기록이 삭제되었습니다.");
    location.reload();
  } else {
    alert("랭킹을 초기화할 권한이 없습니다.");
  }
}
if(savedNickname === "admin"){
  function ShowTableReset() {
    btnBox.innerHTML = `
    <button id="clearAllRanking" class="rankReset">랭킹 초기화</button>
  `;
  const editButton = document.getElementById("clearAllRanking");
    editButton.addEventListener("click", () => {
      localStorage.removeItem("gameData");
      localStorage.removeItem("finalScore");
      localStorage.removeItem("finalStage");
      location.reload();
    });
  }
}

function TitleClick() {
  location.href = '/Home/Home.html';
}