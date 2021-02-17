'use strict'
const wordInput = document.getElementById('word');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもをすべて削除する
 * @param {HTMLElement} element
 */
function removeAllChildren(element){
    while(element.firstChild){
        // 子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const word = wordInput.value;
    if(word.length === 0){
        //名前が空の時は処理を終了する
        return;
    }

    // TODO診断結果表示エリアの作成
    removeAllChildren(resultDivided);
        //子供の要素がある限り削除
    const paragraph = document.createElement('p');
    paragraph.className = 'serif'
    const result = assessment(word);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag='+
    encodeURI('嫌いな物を伊坂幸太郎風に語る')+
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
    
};


const words =[
'「凄いよね。{word}と五十年って、修行か刑罰だよ、まるで」',
'「陣内が口にするたび、『{word}』の価値は下落していく」',
'「いいか、俺は理由なんて知らねえけどな、とにかく、{word}なんてしたら、ぶっ殺すからな」',
'「世の中の悲劇は、{word}と政治家の自信から起きるんだ」',
'「あ、俺の耳ってさ、{word}とか嫌味を濾過しちゃうから」',
'「生きるのを楽しむコツは二つだけ」河崎が軽快に言った。「クラクションを鳴らさないことと、{word}を気にしないこと」',
'「たぶん、僕がついたのは、嘘というよりは{word}に近いんですよ」',
'「{word}から悲劇は起こるんだ」',
'「{word}がいるくらいなら生まれてこないほうが良かったって、後悔して泣くよ」',
'人間が作ったもので一番素晴らしいのはミュージックで、もっとも醜いのは、{word}だ。',
'「そもそも、{word}が恰好良ければ、子供はぐれねえんだよ」',
'「世の中の不幸の大半は、{word}が原因なんだってば」',
'「とりあえず、{word}にも、許せる{word}と、許せない{word}がいることだけは分かってきた。何事も経験だね」',
];

word.onkeydown = event =>{
    if(event.key ==='Enter'){
        assessmentButton.onclick();
    }
}

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} word ユーザーの名前
 * @return {string} 診断結果
 * 
 */

function assessment(word){
    //word{文字列}を数値に変換
    let sumOfCharCode =  Math.floor( Math.random() * 100);
    console.log(sumOfCharCode);
    //5桁の数値を回答結果の範囲（0~15)に変換
    const index = sumOfCharCode % words.length;
    console.log(index)
    let result = words[index];

    result = result.replace(/\{word\}/g,word);
    return result; //診断結果
}
