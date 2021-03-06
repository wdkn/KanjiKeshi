
// グローバル  div要素を格納
tiles = [];

// 初期表示
window.onload = function() {
  var panel = document.getElementById("panel");
  var hdn_panel = document.getElementById("hdn_panel");
  var hdn_flg = document.getElementById("hdn_flg");

  var txtArea = document.getElementById("txt");
  var tileNum = document.getElementById("tileNum");
  var flgCount = document.getElementById("flgCount");
  var corNum = document.getElementById("corNum");

  var tileSum = 0;
  flgCount.value = 0;
  corNum.value = "0";

  // パネル、回答エリア表示
  var pnlArea = document.getElementById("pnlArea");
  var tmArea = document.getElementById("tmArea");
  var btnDef = document.getElementById("btnDef");
  pnlArea.style.display = "none";
  txtArea.style.display = "none";
  tmArea.style.display = "none";
  btnDef.style.display = "none";

  // 回答読み込み
  var q001 = document.getElementById("Q001");
  var lines = q001.textContent.split(',');

    //1単語ずつに分割
    for(var word = 0; word < lines.length; word++){

      var arr = lines[word].split('/');
      // console.log(lines[word]);

      //words[word] = words[word].substr(0, 1), words[word].substr(1, 3);
      // console.log(arr[0]);console.log(arr[1]);
      var flg_div = document.createElement('div');
      flg_div.index = word;
      flg_div.className = 'flg_tile';
      flg_div.textContent = 0;
      hdn_flg.appendChild(flg_div);

      var r_div = document.createElement('div');
      r_div.index = word;
      r_div.className = 'r_tile';
      r_div.textContent = arr[1];
      hdn_panel.appendChild(r_div);

      var div = document.createElement('div');
      div.className = 'tile';
      div.index = tileSum;
      div.textContent = arr[0];
      div.onclick = click;
      panel.appendChild(div);

      tiles.push(div);
      tileSum += 1;
    }

    tileNum.value = String(tileSum);

    // 回答数の格納
    var a001 = document.getElementById("A001");
    var words = a001.textContent.split(',');
    var corSum = document.getElementById("corSum");
    corSum.value = words.length;
  }

var timer;

// タイルクリック時の処理
function click(e) {

  // 要素を取得
  var panel = document.getElementById("panel");
  var hdn_flg = document.getElementById("hdn_flg");
  var flgCount = document.getElementById("flgCount");

  var hdn_panel = document.getElementsByClassName("r_tile");
  var flg_tile = document.getElementsByClassName("flg_tile");

  var tileNum = document.getElementById("tileNum");

  // 選択タイル
  var tileNo = e.target.index;
  // 選択タイルの活性フラグ
  var flg = flg_tile[tileNo].textContent;
  // 上下左右のタイルNo
  var flgUp = tileNo - 4;
  var flgDw = tileNo + 4;
  var flgLe = tileNo - 1;
  var flgRi = tileNo + 1;

  var word1 = document.getElementById("word1");
  var word2 = document.getElementById("word2");
  var word3 = document.getElementById("word3");
  var read1 = document.getElementById("read1");
  var read2 = document.getElementById("read2");
  var read3 = document.getElementById("read3");

  // タイルの選択
  if (flg == "0"){
    switch (parseInt(flgCount.value)) {
      case 0:
        flg = "1";
        flgCount.value = String(parseInt(flgCount.value) + 1);
        e.target.style.backgroundColor = 'yellow';
        break;

      case 3:
        flg = "0";
        // flgCount.value = String(parseInt(flgCount.value) - 1);
        e.target.style.backgroundColor = 'white';
        break;

      default:
        // 選択したタイルの上下左右のいずれかのタイルが活性の場合
        if ((flgUp > -1 && flg_tile[flgUp].textContent == 1)
         || (flgDw < parseInt(tileNum.value) && flg_tile[flgDw].textContent == 1)
         || (flgLe > -1 && flg_tile[flgLe].textContent == 1)
         || (flgRi < parseInt(tileNum.value) && flg_tile[flgRi].textContent == 1)) {
           flg = "1";
           flgCount.value = String(parseInt(flgCount.value) + 1);
           e.target.style.backgroundColor = 'yellow';
        }
    }
    flg_tile[tileNo].textContent = String(flg);
  } else if (flg == "1"){
    flg = "0";
    flgCount.value = String(parseInt(flgCount.value) - 1);
    e.target.style.backgroundColor = 'white';
    flg_tile[tileNo].textContent = String(flg);
  }
};

// 決定ボタンクリック時
function btnDefClick() {
  var word1 = document.getElementById("word1");
  var word2 = document.getElementById("word2");
  var word3 = document.getElementById("word3");
  var read1 = document.getElementById("read1");
  var read2 = document.getElementById("read2");
  var read3 = document.getElementById("read3");
  var index = [];

  var pnlArea = document.getElementById("pnlArea");
  var tile = document.getElementsByClassName("tile");
  var r_tile = document.getElementsByClassName("r_tile");
  var flg_tile = document.getElementsByClassName("flg_tile");
  var tmArea = document.getElementById("tmArea");
  var clearArea = document.getElementById("clearArea");

  var tileNum = document.getElementById("tileNum");
  var corNum = document.getElementById("corNum");
  var corSum = document.getElementById("corSum");
  var flgCount = document.getElementById("flgCount");
  var txt = document.getElementById("txt");

  // 選択タイル情報の取得
  for (var i = 0; i < tileNum.value; i++) {
    if (flg_tile[i].textContent == "1"){
      // 選択されている場合、タイル情報を取得
      if (word1.value == ""){

        word1.value = tile[i].textContent;
        read1.value = r_tile[i].textContent;
        index.push(i);
      }else if (word2.value == "") {
        word2.value = tile[i].textContent;
        read2.value = r_tile[i].textContent;
        index.push(i);
      }else if (word3.value == "") {
        word3.value = tile[i].textContent;
        read3.value = r_tile[i].textContent;
        index.push(i);
      }
    }
  }

  // 判定処理
  var selKanji = word1.value + word2.value + word3.value;
  var selYomi = read1.value + read2.value + read3.value;
  var ansWord = txt.value;
  var corWord = "";

  console.log("選択タイル：" + selKanji + "/" + selYomi);
  console.log("回答：" + ansWord);

  // 回答とタイルの読みが異なる場合はスキップ
  if (ansWord == selYomi){

    // 回答読み込み
    var a001 = document.getElementById("A001");
    var words = a001.textContent.split(',');

    for (var j = 0; j < words.length; j++){
      // console.log(words[j]);
      var arr = words[j].split('/');

      // 選択したタイルの組み合わせが回答リストに存在
      if (selKanji == arr[0]){
        if (selYomi == arr[1]){
          for (var k = 0; k < index.length; k++){
            tile[index[k]].textContent = "";
            tile[index[k]].style.backgroundColor = 'lightgray';
            tiles[index[k]].style.border = '1px solid lightgray';
            tiles[index[k]].style.cursor = "default"
            // tiles[index[k]].style.borderradius = '0px';
            flg_tile[index[k]].textContent = "2";
            flgCount.value = "0";
            txt.value = "";
          }
          // ステータスを一時表示
          var status = document.getElementById("status");
          timer = setTimeout(statusAct, 3000);
          status.textContent = "ナイス！";

          // 正答数をカウント
          corNum.value = String(parseInt(corNum.value) + 1);

          if (corNum.value == corSum.value) {
            status.textContent = "クリア！";
            pnlArea.style.display = "none";
            tmArea.style.display = "none";
            clearArea.style.display = "inline-block";
          }
        }
      }
    }
  }

  // クリア処理
  word1.value = ""
  word2.value = ""
  word3.value = ""
  read1.value = ""
  read2.value = ""
  read3.value = ""

};

var tmCount;

// 初級ボタンクリック時
function btnModeAClick() {
  var topArea = document.getElementById("areaTop");
  var pnlArea = document.getElementById("pnlArea");
  var txtArea = document.getElementById("txt");
  var tmArea = document.getElementById("tmArea");
  var btnDef = document.getElementById("btnDef");
  var version = document.getElementById("version");
  topArea.style.display = "none";
  pnlArea.style.display = "inline-block";
  txtArea.style.display = "inline-block";
  tmArea.style.display = "inline-block";
  btnDef.style.display = "inline-block";
  version.style.display = "none";
  // location.reload();

  // カウウントダウンタイマー
  document.getElementById("min").textContent = "3";
  document.getElementById("sec").textContent = "0";
  tmCount=setInterval("countDown()",1000);

};

// ステータスをクリア
function statusAct() {
  clearTimeout(timer);
  var status = document.getElementById("status");
  status.textContent = "";
};

//カウントダウン関数
function countDown()
{
  var min=document.getElementById("min").textContent;
  var sec=document.getElementById("sec").textContent;

  // if( (min=="") && (sec=="") )
  // {
  //   alert("時刻を設定してください！");
  //   reSet();
  // }
  // else
  // {
    if (min=="") min=0;
    min=parseInt(min);

    if (sec=="") sec=0;
    sec=parseInt(sec);

    tmWrite(min*60+sec-1);
  // }
};

//残り時間を書き出す関数
function tmWrite(int)
{
  int=parseInt(int);

  if (int<=0)
  {
    reSet();
    // alert("ゲームオーバー");
    var endArea = document.getElementById("endArea");
    var pnlArea = document.getElementById("pnlArea");
    var tmArea = document.getElementById("tmArea");
    endArea.style.display = "inline-block";
    pnlArea.style.display = "none";
    tmArea.style.display = "none";
  }
  else
  {
    //残り分数はintを60で割って切り捨てる
    document.getElementById("min").textContent=Math.floor(int/60);
    //残り秒数はintを60で割った余り
    document.getElementById("sec").textContent=int % 60;
  }
};

// フォームを初期状態に戻す（リセット）関数
function reSet()
{
  document.getElementById("min").textContent="0";
  document.getElementById("min").textContent="0";
  clearInterval(tmCount);
}
