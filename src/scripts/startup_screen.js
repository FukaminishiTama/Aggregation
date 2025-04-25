document.addEventListener('DOMContentLoaded', async () => {
  // index.htmlのJS
  const form = document.getElementById('projectForm');
  if (form) {
  form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const input = document.getElementById('form__projectInput');
    const projectId = input.value.trim();
    if (!projectId) return alert('プロジェクトIDを入力してください');

    // 作成中ローディング表示
    const loadingText = document.getElementById('loadingText');
    loadingText.textContent = ' 作成中...';
    // 「作成」を非表示 
    e.setAttribute('aria-expanded', String('false'));
    loadingText.classList.add('loading-animation'); // CSSアニメーション用

    localStorage.setItem('projectId', projectId);

    function generateProjectId(length = 16) {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789こんにちわどうされましたかもうすぐ雨が降りますね';
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
    const randam_text = generateProjectId();

  // MongoDB にプロジェクトを登録
  const res = await fetch('/api/create-project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectId, token: randam_text })
  });

  const result = await res.json();
  if (!result.success) return alert('プロジェクトの作成に失敗しました: ' + result.error);

  localStorage.setItem('projectId', projectId);
  const baseUrl = window.location.origin;
  const adminUrl = `${baseUrl}/admin.html?project=${encodeURIComponent(projectId)}&token=${encodeURIComponent(randam_text)}`;
  window.location.href = adminUrl;
  });
  return; // index.htmlは終了
}

// admin.html、projectIdとtokenが必要な処理
  // URLからprojectIdとtokenを取得
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('project');
  const token = urlParams.get('token');

  // 管理画面のタイトル変更
  const title = document.getElementById('section__admin-title');
  if (title) {
    title.innerHTML = `${projectId}<h3 class="section__admin-text">管理</h3>`;
  }

// 14日後の削除日を表示
const resDataDate = await fetch(`/api/create-auto-delete?projectId=${projectId}&token=${token}`);
if (!resDataDate.ok) {
  // 403などが返ってきたら強制リダイレクトまたはエラーページへ
  alert('このプロジェクトは存在しないか、すでに削除されています');
  window.location.href = '/index.html';
  return;
}

const dataAutoDeleteDate = await resDataDate.json();

// createdAt を元に削除日を計算
const createdAt = new Date(dataAutoDeleteDate.createdAt);
const deletionDate = new Date(createdAt);
  deletionDate.setDate(deletionDate.getDate() + 14);

  const yyyy = deletionDate.getFullYear();
  const mm = String(deletionDate.getMonth() + 1).padStart(2, '0');
  const dd = String(deletionDate.getDate()).padStart(2, '0');

  const formattedDate = `${yyyy}/${mm}/${dd}`;
  document.getElementById('deletion-date').textContent = formattedDate;  

  // URL表示
  const baseUrl = window.location.origin;
  // 投票画面のURLを表示
  document.getElementById('voteUrl').value =
  `${baseUrl}/main.html?project=${encodeURIComponent(projectId)}&token=${encodeURIComponent(token)}`;
  // 結果画面のURLを表示
  document.getElementById('resultUrl').value =
  `${baseUrl}/results.html?project=${encodeURIComponent(projectId)}&token=${encodeURIComponent(token)}`;
  // 管理画面のURLを表示
  document.getElementById('adminUrl').value =
  `${baseUrl}/admin.html?project=${encodeURIComponent(projectId)}&token=${encodeURIComponent(token)}`;


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
  document.getElementById('button__text-resultUrlCopy')?.addEventListener('click', () => copyToClipboard('resultUrl'));
  document.getElementById('button__text-adminUrlCopy')?.addEventListener('click', () => copyToClipboard('adminUrl'));

  // ユーザー一覧取得
    const res = await fetch(`/api/results?projectId=${projectId}&token=${token}`);
    const data = await res.json();
    // ユーザデータ
    const nicknames = Object.keys(data);

    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    // 投票ユーザ一覧表示
    if (nicknames){
      nicknames.forEach(nickname => {
      // ラッパーdivを用意
      const wrapper = document.createElement('div');
      wrapper.className = 'user-row';

      const span = document.createElement('span');
      span.textContent = nickname;
      span.className = 'container__reset-nickname';

      const resetBtn = document.createElement('button');
      resetBtn.className = 'button__reset-nickname';
      resetBtn.type = 'button';
      resetBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
              <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M28,9c-1.105,0 -2,0.895 -2,2v1h-12c-1.104,0 -2,0.896 -2,2c0,1.104 0.896,2 2,2h36c1.104,0 2,-0.896 2,-2c0,-1.104 -0.896,-2 -2,-2h-12v-1c0,-1.105 -0.895,-2 -2,-2zM15,18v28c0,3.309 2.691,6 6,6h22c3.309,0 6,-2.691 6,-6v-28zM22.5,22c0.828,0 1.5,0.671 1.5,1.5v21c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-21c0,-0.829 0.672,-1.5 1.5,-1.5zM32,22c1.104,0 2,0.896 2,2v20c0,1.104 -0.896,2 -2,2c-1.104,0 -2,-0.896 -2,-2v-20c0,-1.104 0.896,-2 2,-2zM41.5,22c0.828,0 1.5,0.671 1.5,1.5v21c0,0.829 -0.672,1.5 -1.5,1.5c-0.828,0 -1.5,-0.671 -1.5,-1.5v-21c0,-0.829 0.672,-1.5 1.5,-1.5z"></path></g></g>
              </svg>`;

      resetBtn.addEventListener('click', async () => {
        if (!confirm(`${nickname} の投票データを削除しますか？`)) return;

        const res = await fetch(
          `/api/admin/reset-user?projectId=${projectId}&token=${token}&nickname=${encodeURIComponent(nickname)}`,
          { method: 'DELETE' }
        );
        const result = await res.json();
        if (result.success) {
          alert(`${nickname} の投票データを削除しました`);
          location.reload();
        } else {
          alert('エラー: ' + result.error);
        }
      });

      // spanとbuttonを同じdivにまとめて横並びに
      wrapper.appendChild(span);
      wrapper.appendChild(resetBtn);
      userList.appendChild(wrapper);
    });
  }
  // ユーザがいない場合 
  if (nicknames.length === 0 || !data) {
    const div = document.createElement('div');
    div.textContent = '投票ユーザーなし';
    userList.appendChild(div);
  };

// プロジェクト全体削除
document.getElementById('deleteProjectButton')?.addEventListener('click', async () => {
  if (!confirm('本当にこのプロジェクトを完全に削除しますか？この操作は元に戻せません。')) return;

  try {
    const res = await fetch(`/api/admin/delete-project?projectId=${projectId}&token=${token}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    result.success
      ? (alert('プロジェクトを完全に削除しました'), location.href = '/')  // TOP画面にリダイレクト等もOK
      : alert('エラーが発生しました: ' + result.error);
  } catch (err) {
    alert('通信エラー: ' + err.message);
  }
});


});
