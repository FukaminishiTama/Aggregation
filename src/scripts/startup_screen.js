document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('projectForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const input = document.getElementById('form__projectInput');
      const projectId = input.value.trim();
      if (!projectId) return alert('プロジェクトIDを入力してください');

      localStorage.setItem('projectId', projectId);

      function generateProjectId(length = 8) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789こんにちわどうされましたか';
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      }
      const randam_text = generateProjectId();

      const baseUrl = window.location.origin;
      const adminUrl = `${baseUrl}/admin.html?project=${encodeURIComponent(projectId)}&token=${encodeURIComponent(randam_text)}`;
      window.location.href = adminUrl;
    });
  }

  // URLからprojectIdとtokenを取得
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('project');
  const token = urlParams.get('token');

  // 管理画面のタイトル変更
  if (projectId) {
    const title = document.getElementById('section__admin-title');
    if (title) {
      title.textContent = `${projectId}：管理画面`;
    }

    // URL表示
    const baseUrl = window.location.origin;
    document.getElementById('voteUrl').value = `${baseUrl}/main.html?project=${encodeURIComponent(projectId)}`;
    document.getElementById('adminUrl').value = token
      ? `${baseUrl}/admin.html?project=${encodeURIComponent(projectId)}&token=${encodeURIComponent(token)}`
      : `${baseUrl}/admin.html?project=${encodeURIComponent(projectId)}`;
  }

  // コピー処理
  function copyToClipboard(id) {
    const input = document.getElementById(id);
    if (!input) return;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('コピーしました: ' + input.value);
  }

  document.getElementById('button__text-voteUrlCopy')?.addEventListener('click', () => copyToClipboard('voteUrl'));
  document.getElementById('button__text-adminUrlCopy')?.addEventListener('click', () => copyToClipboard('adminUrl'));

  // 投票リセット
  document.getElementById('resetProjectButton')?.addEventListener('click', async () => {
    if (!projectId) return alert('プロジェクトIDが見つかりません');
    if (!confirm('本当にこのプロジェクトの投票データを削除しますか？')) return;

    try {
      const res = await fetch(`/api/admin/reset?projectId=${projectId}`, { method: 'DELETE' });
      const result = await res.json();
      result.success
        ? alert('✅ プロジェクトデータをリセットしました')
        : alert('❌ エラーが発生しました: ' + result.error);
    } catch (err) {
      alert('❌ 通信エラー: ' + err.message);
    }
  });

  // ユーザー一覧取得
    const res = await fetch(`/api/results?projectId=${projectId}`);
    const data = await res.json();
    // ユーザデータ
    const nicknames = Object.keys(data);

    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    // 投票ユーザ一覧表示
    if (nicknames){
      nicknames.forEach(nickname => {
        const li = document.createElement('li');
        li.textContent = nickname;
        userList.appendChild(li);
      });
    }
    // 投票ページで投票ボタンを押してresult.htmlが作成されていない場合
    if (data.error === 'Project not found') {
      const li = document.createElement('li');
      li.textContent = '投票データはまだありません';
      userList.appendChild(li);
    }
    // ユーザがいない場合 
    if (nicknames.length === 0) {
      const li = document.createElement('li');
      li.textContent = '投票ユーザーなし';
      userList.appendChild(li);
    };
});
