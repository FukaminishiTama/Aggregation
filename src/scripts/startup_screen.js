
document.addEventListener('DOMContentLoaded', async() => {
  const form = document.getElementById('projectForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();


      // 保存
      localStorage.setItem('projectId', projectId);

      const baseUrl = window.location.origin;
      const adminUrl = `${baseUrl}/admin.html?project=${encodeURIComponent(projectId)}`;
  
      // ページ遷移
      window.location.href = adminUrl;
    });
  }
  
  // 投票用URLと管理画面URLの表示（admin.html 側）
  if (document.getElementById('voteUrl') && document.getElementById('adminUrl')) {
    const projectId = new URLSearchParams(window.location.search).get('project');
    if (projectId) {
      const baseUrl = window.location.origin;
      document.getElementById('voteUrl').value = `${baseUrl}/main.html?project=${encodeURIComponent(projectId)}`;
      document.getElementById('adminUrl').value = `${baseUrl}/admin.html?project=${encodeURIComponent(projectId)}`;
    }
  }
  
  // コピー機能
  function copyToClipboard(id) {
    const input = document.getElementById(id);
    if (!input) return;
    input.select();
    input.setSelectionRange(0, 99999); // for mobile devices
    document.execCommand('copy');
    alert('コピーしました: ' + input.value);
  }
  
  // コピーイベント登録
  document.getElementById('button__text-voteUrlCopy')?.addEventListener('click', () => {
    copyToClipboard('voteUrl');
  });
  document.getElementById('button__text-adminUrlCopy')?.addEventListener('click', () => {
    copyToClipboard('adminUrl');
  });

  // 投票データのリセット
  document.getElementById('resetProjectButton').addEventListener('click', async () => {
    const projectId = new URLSearchParams(window.location.search).get('project');
  
    if (!projectId) return alert('プロジェクトIDが見つかりません');
  
    if (!confirm('本当にこのプロジェクトの投票データを削除しますか？')) return;
  
    try {
      const res = await fetch(`/api/admin/reset?projectId=${projectId}`, {
        method: 'DELETE',
      });
  
      const result = await res.json();
      if (result.success) {
        alert('✅ プロジェクトデータをリセットしました');
      } else {
        alert('❌ エラーが発生しました: ' + result.error);
      }
    } catch (err) {
      alert('❌ 通信エラー: ' + err.message);
    }
  });
  
// 投票ユーザー一覧表示
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('project');

if (!projectId) return;

try {
  const res = await fetch(`/api/results?projectId=${projectId}`);
  const data = await res.json();

  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // 初期化

  const nicknames = Object.keys(data);

  if (nicknames.length === 0) {
    const li = document.createElement('li');
    li.textContent = '投票ユーザーなし';
    userList.appendChild(li);
  } else {
    nicknames.forEach(nickname => {
      const li = document.createElement('li');
      li.textContent = nickname;
      userList.appendChild(li);
    });
  }

} catch (err) {
  console.error('❌ ユーザー一覧取得エラー:', err);
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  const li = document.createElement('li');
  li.textContent = '投票ユーザーなし';
  userList.appendChild(li);
}
});