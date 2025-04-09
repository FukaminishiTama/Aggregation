document.addEventListener('DOMContentLoaded', () => {
    const result = localStorage.getItem('voteResult') || '選択結果が見つかりません';
    document.getElementById('result').textContent = result;
});