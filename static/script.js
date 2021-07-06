/* 영역 변수 */
var body = document.getElementsByTagName('body')[0];
var chatBox = document.getElementsByClassName('chat-box')[0];
var chat = document.getElementById('cat-chat');
var cat = document.getElementById('cat');
var sun = document.getElementById('sun');
var btn = document.getElementById('chat-btn');

/* 숫자 변수 */
var follow = 0, reverse = 0, angry = 0, key = 0;

/* 대화 변수 */
var json = [
    {question:'안녕', answer1:'안냥!'},
    {question:'이름이 뭐야?', answer1:'내 이름은', answer2:' <span id="chamsae">참새</span>다냥~!'},
    {question:'참새야', answer1:'왜 부르냥~'},
    {question:'지금 뭐해?', answer1:'당신 생각하고 있다냥~'},
    {question:'배고파?', answer1:'완전완전 배고프다냥!', answer2:' (꼬르륵)'}
]

/* 타이핑 함수 */
function typing(text1, text2) {
    var typewriter = new Typewriter(chat, {
        loop: false,
        delay: 50
    });
    typewriter
        .typeString(text1)
        .pauseFor(700)
        .typeString(text2)
        .start();
}

/* 시작 메시지 출력 */
typing('냐앙~', '(챗봇 시작)');

/* 채팅 함수 */
function chatting() {
    var input = document.getElementById('input-box').value;
    var date = new Date;
    
    // 대답 학습하기 조건문
    if (key == 1) {
        if (input == '응') {
            key = 2;
            typing('뭐라고 대답해야 되냥?');
        } else {
            key = 0;
            typing('냐앙~');
        }
        document.getElementById('input-box').value = '';
        return;
    }
    if (key == 2) {
        key = 0;
        answer = input;
        json.push({question: `${question}`, answer1: `${answer}`});
        typing('말을 배웠다', ' 냥!');
        document.getElementById('input-box').value = '';
        return;
    }
    
    // 말 따라하기 조건문
    if (follow == 1) {
        if (input == '그만해') {
            follow = 0;
            typing('냥 냐라 냥~', '(따라하기 종료)');
        } else {
            typing(input, ' 냥!');
        }
        document.getElementById('input-box').value = '';
        return;
    }
    
    // 말 거꾸로 따라하기 조건문
    if (reverse == 1) {
        if (input == '해만그') {
            reverse = 0;
            cat.src = './static/images/cat.png';
            typing('냥 냐라 냥~', '(거꾸로 따라하기 종료)');
        } else {
            var revStr = ' '+input.split('').reverse().join('');
            typing('!냥', revStr);
        }
        document.getElementById('input-box').value = '';
        return;
    }
    
    // 명령 거부하기 조건문
    if (angry == 1) {
        if (input.indexOf('미안해') != -1) {
            angry = 0;
            chat.style.color = '#000000';
            body.style.background = '#FFFFFF';
            chatBox.style.background = '#FFFFFF';
            cat.src = './static/images/cat.png';
            typing('흥...', ' 특별히 봐주겠다냥!');
        } else {
            typing('그르르르릉...', '(명령 거부)');
        }
        document.getElementById('input-box').value = '';
        return;
    }

    for (let i = 0; i < json.length; i++) {
        if (input == json[i].question) {
            typing(json[i].answer1, json[i].answer2);
            document.getElementById('input-box').value = '';
            return;
        }
    }

    switch (input) {
        case "오늘 날짜 알려줘":
            getToday(date);
            break;
        case "지금 시간 알려줘":
            getTime(date);
            break;
        case "불 켜줘":
            switchOn();
            break;
        case "불 꺼줘":
            switchOff();
            break;
        case "나 따라해봐":
            follow = 1;
            typing('냥 냐라 냥~', '(따라하기 시작)');
            break;
        case "거꾸로 따라해봐":
            reverse = 1;
            cat.src = './static/images/cat-reverse.png';
            typing('냥 라냐 냥~', '(거꾸로 따라하기 시작)');
            break;
        case "바보 고양이":
        case "참새 바보":
            angry = 1;
            angryCat();
            break;
        case "잘 자":
            sleepCat();
            break;
        default:
            key = 1;
            question = input;
            typing('대답을 가르쳐 줄 거냥?', ' (응 or 아니)');
            break;
    }
    document.getElementById('input-box').value = '';
}

function getToday(x) { // 오늘 날짜 함수
    year = x.getFullYear();
    month = x.getMonth() + 1;
    day = x.getDate();
    today = ' '+year+'년 '+month+'월 '+day+'일이다냥~';
    typing('오늘은', today);
}

function getTime(x) { // 현재 시간 함수
    hour = x.getHours();
    min = x.getMinutes();
    time = ' '+hour+'시 '+min+'분이다냥~';
    typing('지금은', time);
}

function switchOn() { // 조명 스위치 On 함수
    chat.style.color = '#000000';
    body.style.background = '#FFFFFF';
    chatBox.style.background = '#FFFFFF';
    typing('불을 켜주겠다냥~', '');
}

var light = 0;
function switchOff() { // 조명 스위치 Off 함수
    if (light == 0) {
        light++;
        chat.style.color = '#DFDFDF';
        chatBox.style.background = '#303030';
        typing('이거 맞냥?', ' ㅋㅋㅋ');
    } else {
        chat.style.color = '#DFDFDF';
        body.style.background = '#303030';
        chatBox.style.background = '#303030';
        typing('불을 꺼주겠다냥~');
    }
}

function angryCat() { // 놀리기 함수
    chat.style.color = "#FFFFFF";
    body.style.background = '#222222';
    chatBox.style.background = '#222222';
    cat.src = './static/images/cat-angry.png';
    typing('그르르르릉...');
}

function sleepCat() { // 종료 함수
    body.style.background = '#808080';
    chatBox.style.background = '#808080';
    typing('Zzz...', '(챗봇 종료)');
    window.setTimeout(function() {
        btn.style.display = 'none';
        sun.style.display = 'block';
    }, 300);
}

function restartCat() { // 재시작 함수
    body.style.background = '#FFFFFF';
    chatBox.style.background = '#FFFFFF';
    typing('냐앙~', '(챗봇 시작)');
    window.setTimeout(function() {
        sun.style.display = 'none';
        btn.style.display = 'block';
    }, 300);

}

/* 버튼 클릭시 채팅 이벤트 발생 */
btn.addEventListener('click', function() {chatting();});
sun.addEventListener('click', function() {restartCat();});