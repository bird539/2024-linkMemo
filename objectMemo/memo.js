let memo = {
    num: 0,
    text: "",
    check: false,


    save: function () {

    },
    make: function () {

    },
    edit: function () {

    },
    copy: function () {

    }
}

let basicTap = {
    pk: null,
    tapSelect: true,

    withSize: 456,
    heightSize: 123,

    titel: 'tapTitel',
    bacGroundColor: 'black',
    buttonColor: 'blue',


    save: function () {

    },
    make: function () {

    },
    edit: function () {

    },
    copy: function () {

    }
}
//basic option ===============================

//color

let Bshow = true;
let BhtmlBack = 'white';
let BwinBack = 'FEF896';
let BbtnBack = 'FEF896';
let BbtnHover = '999999';
let BtitleBack = 'FEF896';
//font
let BwinFontSize = 1;
let BwinFontWeight = 100;
let BwinFontColor = 'black';
let BwinFontType = 'serif';
let BwinFontKind = 'normal';

let BtitleFontSize = 1;
let BtitleFontWeight = 100;
let BtitleFontColor = 'black';
let BtitleFontType = 'serif';
let BtitleFontKind = 'normal';
//line
let BlineRowColor = 'B8D993';
let BlineRowWeight = 1.5;
let BlineColColor = 'ff8c82';
let BlineColWeight = 1.5;
//win size
let BwinWidth = 456;
let BwinHeight = null;

//font option
let fontFamily = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong']
let fontStyle = ['normal', 'litalic', 'oblique'];
let fontWeight = ['100', '200', '300', '400_normal', '500', '600', '700_bold', '800', '900'];
let winEditPage = ['this window color', 'this window size & line', 'this window tap & title font', 'del window'];
//=============================== basic option 

let Mwindow = {
    pk: null,
    title: 'w0',
    show: true,
    backColor: ['FEF896', 'FEF896', 'gray', 'FEF896'], ////윈 배경, 버튼 배경, 버튼 호버색, 타이틀 배경
    tapFont: [10, 'white', 'normal'],               //탭  폰트 사이즈, 색, 두께, 글꼴
    winTitleFont: [10, 'white', 'normal'],          //윈도 폰트 사이즈, 색, 두께, 글꼴
    line: [['B8D993', 1.5], ['ff8c82', 1.5]],             //본문 가로 라인[컬러, 두께], 본문 세로 라인[컬러, 두께],
    basicSize: [370, null],                         //win with, height
    tap: null,

    //winArray : { 0 : {title:'win0', backColor:['black','black','black'], text:['10pt','white',null,'h3'], tap:[null] }
    winArray: {
        0: copyReturn(),
        1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null
    },

    saveArray: [null, null, null, null, null, null, null, null, null, null],
    makeSaveArray: function (option, array) {
        if (option == true) {
            for (i = 0; i < 10; i++) {
                if (this.winArray[i] != null) {
                    let newArr = [
                        this.winArray[i].title,
                        this.winArray[i].show,
                        this.winArray[i].backColor,
                        this.winArray[i].tapFont,
                        this.winArray[i].winTitleFont,
                        this.winArray[i].line,
                        this.winArray[i].basicSize,
                        this.winArray[i].tap
                    ]
                    this.saveArray[i] = newArr;
                }
            }
            return this.saveArray;
        } else if (option == false) {
            for (i = 0; i < 10; i++) {
                if (array[i] != null) {
                    let copy = copyReturn();
                    let newArr = array[i];
                    this.winArray[i] = copy;

                    this.winArray[i].title = newArr[0];
                    this.winArray[i].show = newArr[1];
                    this.winArray[i].backColor = newArr[2];
                    this.winArray[i].tapFont = newArr[3];
                    this.winArray[i].winTitleFont = newArr[4];
                    this.winArray[i].line = newArr[5];
                    this.winArray[i].basicSize = newArr[6];
                    this.winArray[i].tap = newArr[7];
                }
            }
            return this.winArray;
        }
    },

    save: function (option) {
        if (option == 'new') {
            let getSave = localStorage.getItem('winArray');
            if (getSave == null) {
                let newWinArray = this.makeSaveArray(true, this.winArray);
                localStorage.setItem('winArray', JSON.stringify(newWinArray));
                return this.winArray;
            } else {
                getSave = JSON.parse(getSave);
                let newWinArray = this.makeSaveArray(false, getSave);
                this.winArray = newWinArray;
                return this.winArray;
            }
        } else if (option == 'plusNew') {
            let copy = copyReturn(this.winArray[0]);
            for (i = 0; i < 10; i++) {
                if (this.winArray[i] == null) {
                    copy.title = `w${i}`;
                    this.winArray[i] = copy;
                    let newWinArray = this.makeSaveArray(true, this.winArray);
                    localStorage.setItem('winArray', JSON.stringify(newWinArray));
                    return copy;
                }
            }

        }

    },

    make: function (option, winArray) {

    },
    edit: function () {

    },
    copy: function () {

    }
}

function re(value) {
    return value;
}

//배경색 #FEF896, 가로선 #B8D993, 세로선 #FFDD8D
function copyReturn() { //윈도우 기본 객체
    let clone = {
        title: 'w0',
        show: true,
        backColor: ['FEF896', 'FEF896', 'gray', 'FEF896'], ////윈 배경, 버튼 배경, 버튼 호버색, 타이틀 배경
        tapFont: [10, 'white', 'normal'],               //탭  폰트 사이즈, 색, 두께, 글꼴
        winTitleFont: [10, 'white', 'normal'],          //윈도 폰트 사이즈, 색, 두께, 글꼴
        line: [['B8D993', 1], ['FFDD8D', 1]],             //본문 가로 라인[컬러, 두께], 본문 세로 라인[컬러, 두께],
        basicSize: [370, null],                         //win with, height
        tap: null                                       //tap [class,name] array
    }
    return clone;
}
const kj = document.createElement('button');
kj.style.button
//window table =======================
let w = {
    basic: basic = {
        Btitle: 'w0',
        BclassName: 'w0',
        BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`,
        //color

        Bshow: true,
        BhtmlBack: 'white',
        BwinBack: 'FEF896',
        BbtnBack: 'FEF896',
        BbtnHover: '999999',
        BtitleBack: 'FEF896',
        //font
        BwinFontSize: 1,
        BwinFontWeight: 100,
        BwinFontColor: 'black',
        BwinFontType: 'serif',
        BwinFontKind: 'normal',

        BtitleFontSize: 1,
        BtitleFontWeight: 100,
        BtitleFontColor: 'black',
        BtitleFontType: 'serif',
        BtitleFontKind: 'normal',
        //line
        BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
        BcolLine: `borderRight:${BlineColWeight}px solid #${BlineColColor}`,

        BlineRowColor: 'B8D993',
        BlineRowWeight: 1.5,
        BlineColColor: 'ff8c82',
        BlineColWeight: 1.5,
        //win size
        BwinWidth: 456,
        BwinHeight: null,
    },
    type: 'div', className_BclassName: `${this.basic.BclassName}`,
    style_display: 'display:inlie-block',
    style_BwinWidth: `width:${this.basic.BwinWidth}px`,
    style_padding: 'padding:3px',
    window_n: div = {
        type: 'div', className_BclassName: this.basic.BclassName,
        style_BwinBack: `background-color:#${this.basic.BwinBack}`,
        table_winTitle: table = {
            type: 'table', style_border: 'borderCollapse:collapse', style_1: 'width:100%',

            tr_winTitle: tr = {
                type: 'tr',
                td_plussBtn: td = {
                    type: 'td', style_width: 'width:30px',
                    style_BrowLine: `borderBottom:${this.basic.BlineRowWeight}px solid #${this.basic.BlineRowColor}`,
                    style_BcolLine: `borderRight:${this.basic.BlineColWeight}px solid #${this.basic.BlineColColor}`,
                    style_border: 'borderCollapse:collapse',
                    className: 'title_rowCol',
                    plussBtn: btn1 = {
                        type: 'button', innerText: ' + ', 
                        event: 'NextNextNextShowEvent:click',
                        style_width:'width:20px',
                        style_height:'height:20px',
                        style_BbtnBack: `background-color:#${this.basic.BbtnBack}`,
                        className_BbtnClassName: `winTitle_plsBtn:#${this.basic.BbtnHover}:#${this.basic.BbtnBack}`, 
                        event_out: 'mouseoverEvent:mouseover', 
                        event_in: 'mouseoutEvent:mouseout',
                    },
                },
                td_titleBtn: td = {
                    type: 'td', style_width: 'width:100%',
                    style_BrowLine: `borderBottom:${this.basic.BlineRowWeight}px solid #${this.basic.BlineRowColor}`,
                    style_border: 'borderCollapse:collapse',
                    style_BtitleBack: `background-color:#${BtitleBack}`,
                    className: 'title_row',
                    titleBtn: btn2 = {
                        type: 'button',
                        style_width: 'width:100%',
                        style_height:'heigth:20px',
                        innerText_Btitle: `${this.basic.BclassName}`,
                        event: 'NextShowEvent2:dblclick',
                        style_BtitleBack: `background-color:#${BtitleBack}`,
                        style_textAlign: 'textAlign:left',
                        className: 'winTitle_titleBtn',
                    },
                    titleEditForm: form1 = {
                        type: 'form',
                        style_display: 'display:none',
                        className: 'winTitle_titleEditForm',
                        input: input_1 = {
                            type: 'input',
                        }
                    },
                }
            }
        },


        div_plsTap: headDiv = {
            type: 'div',
            style_display: 'display:none',
            table_plsTap: newWinTapBtn = {
                type: 'table', style_border: 'borderCollapse:collapse', style_width: 'width:100%',
                style_back: `background-color:#${BbtnBack}`,
                
                //style_1: 'width:100%',
                tr_plsTap: tr = {
                    type: 'tr',
                    td_winEditBtn: td = {
                        type: 'td',
                        style_width: 'width:20px',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_BcolLine: `borderRight:${BlineColWeight}px solid #${BlineColColor}`,
                        style_border: 'borderCollapse:collapse',
                        className:'rowCol',
                        winEditBtn: btn1 = {
                            type: 'button', innerText: 'e', event: 'NextNextNextShowEvent:click',
                            style_BbtnBack: `background-color:#${BbtnBack}`,
                            style_width: 'width:20px',
                            style_height: 'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, 
                            event_out: 'mouseoverEvent:mouseover', 
                            event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td1: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_border: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        className:'row',
                        btn1: wBtn = {
                            type: 'button', innerText: '윈도', event: 'newWindow:click',
                            style_BbtnBack: `background-color:#${BbtnBack}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            style_height: 'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td2: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_border: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        className:'row',
                        btn2: tapBtn = {
                            type: 'button',
                            innerText: '메모',
                            style_BbtnBack: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            style_height:'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td3: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_border_: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        className:'row',
                        btn3: tapBtn = {
                            type: 'button',
                            innerText: '계산',
                            style_BbtnBack: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            style_height:'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td4: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        className:'row',
                        btn4: tapBtn = {
                            type: 'button',
                            innerText: '링크',
                            style_BbtnBack: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            style_height:'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td5: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_border: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        className:'row',
                        btn5: tapBtn = {
                            type: 'button', innerText: '달력',
                            style_BbtnBack: `background-color:#${Mwindow.backColor[3]}`,
                            style_textAlign: 'textAlign:left',
                            style_width: 'width:100%',
                            style_height:'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td6: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_border: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        className:'row',
                        btn6: tapBtn = {
                            type: 'button', innerText: '타임',
                            style_BbtnBack: `background-color:#${Mwindow.backColor[3]}`,
                            style_width: 'width:100%',
                            style_textAlign: 'textAlign:left',
                            style_height:'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td7: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_border: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        className:'row',
                        btn7: tapBtn = {
                            type: 'button', innerText: '그림',
                            style_BbtnBack: `background-color:#${Mwindow.backColor[3]}`,
                            style_width: 'width:100%',
                            style_textAlign: 'textAlign:left',
                            style_height:'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td8: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_border: 'borderCollapse:collapse',
                        style_width: 'width:50px',
                        className:'row',
                        btn8: tapBtn = {
                            type: 'button', innerText: '랜덤',
                            style_BbtnBack: `background-color:#${Mwindow.backColor[3]}`,
                            style_width: 'width:100%',
                            style_textAlign: 'textAlign:left',
                            style_height:'height:20px',
                            className_BbtnClassName: `w0_btn:#${BbtnHover}:#${BbtnBack}`, event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td9: td = {
                        type: 'td',
                        style_BrowLine: `borderBottom:${BlineRowWeight}px solid #${BlineRowColor}`,
                        style_border: 'borderCollapse:collapse',
                        className:'row',
                        //style_width: 'width:40px',
                    },
                },
            },
            editPage_Table: winEdit = {
                type: 'table', style_display: 'display:none',
                style_BrowLine: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`,
                className: 'row',
                style_BbtnBack: `background-color:#${Mwindow.backColor[1]}`,

                winEdit_Tr: backColor = {
                    type: 'tr',
                    tr1: tr = {
                        type: 'tr',
                        td1: td = {
                            type: 'td', //style_width:'width:6.3%',
                            //style_row: `borderBottom:${Mwindow.line[0][1]}px solid #${Mwindow.line[0][0]}`, 
                            style_BcolLine: `borderRight:${Mwindow.line[1][1]}px solid #${Mwindow.line[1][0]}`,
                            className: 'col',
                            beforeBtn: button = {
                                type: 'button',
                                innerText: '<', style_2: 'border:0',
                                style_BbtnBack: `background-color:#${Mwindow.backColor[1]}`,
                                className_BbtnClassName: `w0_btn:gray:#${Mwindow.backColor[1]}`,
                                //BbtnClassName: `winTitle_plsBtn:#${this.basic.BbtnHover}:#${this.basic.BbtnBack}`, 
                                event_out: 'mouseoverEvent:mouseover', 
                                event_in: 'mouseoutEvent:mouseout',
                                event_2: 'selectBeforAfterBtn:click',
                                style_width:'width:20px',
                                style_height:'height:20px',
                            },

                        },
                        td2: td = {
                            type: 'td',
                            style_padding: 'padding:0 0 0 3px',

                            menuSelect: select = returnSelectOb(winEditPage, {
                                style_2: 'border:0',
                                style_3: 'appearance:none',
                                style_4: 'padding:0px 5px',
                                style_height:'height:20px',
                                event: 'selectAndNextObShow:change',
                                style_BwinBack: `background-color:#${Mwindow.backColor[1]}`,
                                className_BbtnClassName: `w0_btn:gray:#${Mwindow.backColor[1]}`,
                                event_out: 'mouseoverEvent:mouseover', event_in: 'mouseoutEvent:mouseout',
                            }),
                            nextBtn: button = {
                                type: 'button',
                                innerText: ' > ', style_2: 'border:0', style_3: 'width:30px',
                                style_height:'height:20px',
                                style_BwinBack: `background-color:#${Mwindow.backColor[1]}`,
                                className_BbtnClassName: `w0_btn:gray:#${Mwindow.backColor[1]}`, 
                                event: 'mouseoverEvent:mouseover', 
                                event_1: 'mouseoutEvent:mouseout', 
                                event_2: 'selectBeforAfterBtn:click'
                            },
                        },
                    },
                    tr2: tr = {
                        type: 'tr',
                        td1: td = {
                            type: 'td',
                            style_BcolLine: `borderRight:${Mwindow.line[1][1]}px solid #${Mwindow.line[1][0]}`,
                            className: 'col'
                        },
                        td2: td = {
                            type: 'td',
                            style_padding: 'padding:0 0 0 8px',
                            style_width: 'width:100%',

                            formDiv: div = {
                                type: 'div',
                                form1: backColor = {
                                    type: 'form', style: 'display:block',

                                    pre1: winBackColor = { type: 'pre', innerText: 'background color : ', style: 'display:inline-block' },
                                    input1: input = {
                                        type: 'input',
                                        kind: 'color',
                                        style: 'display:inline-block',
                                        event_1: 'editWin:input',
                                        className: 'wBackColor',
                                    },
                                    br33: br = { type: 'span', innerText: '\n' },
                                    pre33: fontColor = { type: 'pre', 
                                    innerText: 'font color : ', style: 'display:inline-block' },
                                    input33: input = { type: 'input', 
                                    kind: 'color', 
                                    className: 'wFontColor', 
                                    event_1: 'editWin:input',
                                    },

                                    br_htmlBack: br = { type: 'span', innerText: '\n' },
                                    pre_htmlBack: pre = { type: 'pre', 
                                    innerText: 'html background color : ', style: 'display:inline-block', className: 'htmlBackColor', },
                                    input_htmlBack: input = { 
                                        type: 'input', 
                                        kind: 'color' ,
                                        className:'htmlBackColor',
                                        event_1: 'editWin:input',
                                    },

                                    br_rowLine: br = { type: 'span', innerText: '\n' },
                                    pre_rowLine: rowLineColor = { type: 'pre', innerText: 'row line color : ', style: 'display:inline-block', className: 'wRowLineColor', },
                                    input_rowLine: input = { 
                                        type: 'input', 
                                        kind: 'color' ,
                                        className:'wRowLineColor',
                                        event_1: 'editWin:input',
                                    },

                                    br_colLineLine: br = { type: 'span', innerText: '\n' },
                                    pre_colLine: rowLineColor = { type: 'pre', innerText: 'col line color : ', style: 'display:inline-block', className: 'wColLineColor', },
                                    input_colLine: input = { 
                                        type: 'input', 
                                        kind: 'color', 
                                        className:'wColLineColor',
                                        event_1: 'editWin:input',
                                    },

                                    br2: br = { type: 'span', innerText: '\n' },
                                    pre3: titleBack = { type: 'pre', 
                                    innerText: 'title background color : ', style: 'display:inline-block', className: 'wTitleBackColor', },
                                    input3: input = { 
                                        type: 'input', 
                                        kind: 'color',
                                        className:'wTitleBackColor',
                                        event_1: 'editWin:input',
                                    },

                                    br_title: br = { type: 'span', innerText: '\n' },
                                    pre_title: titleBack = { type: 'pre', 
                                    innerText: 'title font color : ', 
                                    style: 'display:inline-block', },
                                    input_title: input = { 
                                        type: 'input', kind: 'color',
                                        className: 'wTitleFontColor', 
                                    event_1: 'editWin:input',
                                },

                                    br11: br = { type: 'span', innerText: '\n' },
                                    pre22: btnHoverColor = { type: 'pre', 
                                    innerText: 'button hover color : ', style: 'display:inline-block', className: 'wBtnHoverBackColor', },
                                    input22: input = { 
                                        type: 'input', kind: 'color',
                                        event_1: 'editWin:input',
                                        className: 'wBtnHoverBackColor', 
                                    },

                                    br1: br = { type: 'span', innerText: '\n' },
                                    pre2: btnHoverFontColor = { type: 'pre', 
                                    innerText: 'button hover font color : ', style: 'display:inline-block', className: 'wBtnHoverFontColor', },
                                    input2: input = { type: 'input', kind: 'color',
                                    className: 'wBtnHoverFontColor', 
                                    event_1: 'editWin:input',
                                },

                                    br4: br = { type: 'span', innerText: '\n' },
                                    pre4: basicColor = { type: 'pre', innerText: 'basic design : ', style: 'display:inline-block' },
                                    basicColor1: select = {
                                        type: 'select',
                                        option1: op = { type: 'option', innerText: 'right mode' },
                                        option2: op = { type: 'option', innerText: 'dark mode' },
                                        option3: op = { type: 'option', innerText: 'other window color' },
                                    },
                                    basicColor2: select = {
                                        type: 'select',
                                        option1: op = { type: 'option', innerText: 'yellow memo' },
                                        option2: op = { type: 'option', innerText: 'blue memo' },
                                    },
                                    basicColor3: select = {
                                        type: 'select',
                                        option1: op = { type: 'option', innerText: 'w0' },
                                        option2: op = { type: 'option', innerText: 'w1' },
                                    },

                                    br3: br = { type: 'span', innerText: '\n' },
                                    sub1: saveBtn = { type: 'input', kind: 'submit', value: 'save option' },
                                },
                                form2: sizeAndLine = {
                                    type: 'form', style: 'display:none',
                                    pre1: basicWidth = { type: 'pre', innerText: 'basic width size : ', style: 'display:inline-block' },
                                    input1: width = { type: 'input', kind: 'number', style_width:'width:40px' },
                                    br1: br = { type: 'span', innerText: '\n' },

                                    pre2: basicHeight = { type: 'pre', innerText: 'basic height size : ', style: 'display:inline-block' },
                                    input2: width = { type: 'input', kind: 'number', style_width:'width:40px' },
                                    br2: br = { type: 'span', innerText: '\n' },

                                    pre3: basicRow = { type: 'pre', innerText: 'basic row line Thickness : ', style: 'display:inline-block' },
                                    input4: width = { type: 'input', kind: 'number', style_width:'width:40px' },
                                    br3: br = { type: 'span', innerText: '\n' },

                                    pre4: basicCol = { type: 'pre', innerText: 'basic col line Thickness : ', style: 'display:inline-block' },
                                    input6: width = { type: 'input', kind: 'number', style_width:'width:40px' },
                                    br4: br = { type: 'span', innerText: '\n' },

                                    sub1: sub = { type: 'input', kind: 'submit', value: 'save option' },
                                },
                                form3: textSize = {
                                    type: 'form', style: 'display:none',

                                    pre1: titleSizeWeight = { type: 'pre', innerText: 'title text size & weight : ', style: 'display:inline-block' },
                                    input1: size = { type: 'input', kind: 'number', style_width:'width:40px' },
                                    input11: weight = returnSelectOb(fontWeight),
                                    br1: br = { type: 'span', innerText: '\n' },

                                    pre2: titleFontKind = { type: 'pre', innerText: 'title font type & kind : ', style: 'display:inline-block' },
                                    select2: family = returnSelectOb(fontFamily),
                                    select22: style = returnSelectOb(fontWeight),
                                    br2: br = { type: 'span', innerText: '\n' },

                                    pre3: basicFontSizeWeight = { type: 'pre', innerText: 'basic text size & weight : ', style: 'display:inline-block' },
                                    input3: size = { type: 'input', kind: 'number', style_width:'width:40px' },
                                    input33: weight = returnSelectOb(fontWeight),
                                    br3: br = { type: 'span', innerText: '\n' },

                                    pre4: basicFontKind = { type: 'pre', innerText: 'basic font type & kind : ', style: 'display:inline-block' },
                                    select4: family = returnSelectOb(fontFamily),
                                    select44: style = returnSelectOb(fontStyle),
                                    br4: br = { type: 'span', innerText: '\n' },

                                    sub1: sub = { type: 'input', kind: 'submit', value: 'save option' },

                                },
                                form4: delWin = {
                                    type: 'form', style: 'display:none',
                                    pre1: tapText = { type: 'pre', innerText: 'del this window', style: 'display:inline-block' },
                                    br4: br = { type: 'span', innerText: '\n' },
                                    sub1: sub = { type: 'input', kind: 'submit', value: 'del this window' },
                                }
                            }

                        },
                    }
                }
            }
        }
    }
}
function reW(v1) {
    w.basic.BclassName = v1;
    w.basic.Btitle = v1;
    return w;
}

//style:'fontSize:1em', style_2:'border:0', style_3:'appearance:none',
function returnSelectOb(array, option) {
    let select = { type: 'select' };
    if (option != null) {
        for (const key in option) {
            select[key] = option[key];
        }
    }
    for (i = 0; i < array.length; i++) {
        let op = { type: 'option', innerText: array[i] };
        select[`op${i}`] = op;
    }
    return select;
}

//pluss function =======================
function newWindow(event) {
    let newWin = Mwindow.save('plusNew');
    let n = reW(newWin.title)
    n.basic.setset(newWin.title);
    let aaaa = makeHtml(n);
    main.appendChild(aaaa);
}

function editWin(event) {
    const inputValue = event.target.value;
    const inputOption = event.target.className;
    const winName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className;
    let BbtnHover = 'blue';
    if (inputOption == 'wBackColor') {
        //wBackColor
        let table = document.querySelectorAll(`.${winName} table`);
        for (i = 0; i < table.length; i++) {
            table[i].style.backgroundColor = inputValue;
        }

        let btn = document.querySelectorAll(`.${winName} button`);
        const btnColor = btn[0].className.split(':');
        for (i = 0; i < btn.length; i++) {
            btn[i].style.backgroundColor = inputValue;
            btn[i].className = `${winName}_btn:${btnColor[1]}:${inputValue}:${btnColor[3]}:${btnColor[4]}`;
        }

        let select = document.querySelectorAll(`.${winName} select`);
        for (i = 0; i < select.length; i++) {
            select[i].style.backgroundColor = inputValue;
            select[i].className = `${winName}_btn:${btnColor[1]}:${inputValue}:${btnColor[3]}:${btnColor[4]}`;
        }

        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_plsBtn = title_rowCol.childNodes[0];
        let title_row = document.querySelector(`.${winName} .title_row`);
        let title_titleBtn = title_row.childNodes[0];
        
        title_row.style.backgroundColor = inputValue;
        title_rowCol.style.backgroundColor = inputValue;
        title_plsBtn.style.backgroundColor = inputValue;
        title_titleBtn.style.backgroundColor = inputValue;
    }else if(inputOption == 'wFontColor') {//winName
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);

        const btnColor = btn[0].className.split(':');

        for (i = 0; i < pre.length; i++) {
            pre[i].style.color = inputValue;

        }
        for (i = 0; i < btn.length; i++) {
            btn[i].style.color = inputValue;
            btn[i].className = `${winName}_btn:${btnColor[1]}:${btnColor[2]}:${btnColor[3]}:${inputValue}`;

        }
        for (i = 0; i < select.length; i++) {
            select[i].style.color = inputValue;
            select[i].className = `${winName}_btn:${btnColor[1]}:${btnColor[2]}:${btnColor[3]}:${inputValue}`;

        }

        //text.style.color = 'blue';
        //wFontColor

    }else if (inputOption == 'htmlBackColor') {
        //htmlBackColor
        const html = document.querySelector(`body`);
        html.style.backgroundColor = inputValue;
    }else if(inputOption =='wRowLineColor'){
        let row = document.querySelectorAll(`.${winName} .row`);
        let rowCol = document.querySelectorAll(`.${winName} .rowCol`);
        for (i = 0; i < row.length; i++) {
            row[i].style.borderBottom = `${1.5}px solid ${inputValue}`;
        }
        for (i = 0; i < rowCol.length; i++) {
            rowCol[i].style.borderBottom = `${1.5}px solid ${inputValue}`;
        }

        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_row = document.querySelector(`.${winName} .title_row`);
        
        title_row.style.borderBottom = `${1.5}px solid ${inputValue}`;
        title_rowCol.style.borderBottom = `${1.5}px solid ${inputValue}`;

    }else if(inputOption=='wColLineColor'){
        let col = document.querySelectorAll(`.${winName} .col`);
        let rowCol = document.querySelectorAll(`.${winName} .rowCol`);
        
        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        title_rowCol.style.borderRight = `${1.5}px solid ${inputValue}`;

        for (i = 0; i < col.length; i++) {
            col[i].style.borderRight = `${1.5}px solid ${inputValue}`;
        }
        
        for (i = 0; i < rowCol.length; i++) {
            rowCol[i].style.borderRight = `${1.5}px solid ${inputValue}`;
        }
    }else if(inputOption =='wTitleBackColor'){
        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_plsBtn = title_rowCol.childNodes[0];
        let title_row = document.querySelector(`.${winName} .title_row`);
        let title_titleBtn = title_row.childNodes[0];
        
        title_row.style.backgroundColor = inputValue;
        title_rowCol.style.backgroundColor = inputValue;
        title_plsBtn.style.backgroundColor = inputValue;
        title_titleBtn.style.backgroundColor = inputValue;

    }else if(inputOption=='wTitleFontColor'){
        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_plsBtn = title_rowCol.childNodes[0];
        let title_row = document.querySelector(`.${winName} .title_row`);
        let title_titleBtn = title_row.childNodes[0];

        title_plsBtn.style.color = inputValue;
        title_titleBtn.style.color = inputValue;
    }else if(inputOption=='wBtnHoverBackColor'){
        let text2 = document.querySelectorAll(`.${winName} button`);
        let text3 = document.querySelectorAll(`.${winName} select`);

        const btnColor = text2[0].className.split(':');
        
        for(i=0;i<text2.length;i++){
            text2[i].className = `${winName}_btn:${inputValue}:${btnColor[2]}:${btnColor[3]}:${btnColor[4]}`;            //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
        }
        for(i=0;i<text3.length;i++){
            text3[i].className = `${winName}_btn:${inputValue}:${btnColor[2]}:${btnColor[3]}:${btnColor[4]}`;
        }
        //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
    }else if(inputOption=='wBtnHoverFontColor'){
        let text2 = document.querySelectorAll(`.${winName} button`);
        let text3 = document.querySelectorAll(`.${winName} select`);

        const btnColor = text2[0].className.split(':');
        
        for(i=0;i<text2.length;i++){
            text2[i].className = `${winName}_btn:${btnColor[1]}:${btnColor[2]}:${inputValue}:${btnColor[4]}`;            
            
        }
        //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
        for(i=0;i<text3.length;i++){
            text3[i].className = `${winName}_btn:${btnColor[1]}:${btnColor[2]}:${inputValue}:${btnColor[4]}`;
        }
    }else if(inputOption=='wWidthSize'){

    }else if(inputOption=='wHeightSize'){

    }else if(inputOption=='wRowLineThik'){

    }else if(inputOption=='wColLineThik'){

    }
    //wRowLineColor
    //wColLineColor

    //wTitleBackColor
    //wTitleFontColor

    //wBtnHoverBackColor
    //wBtnHoverFontColor
}

function NextNextNextShowEvent(event) {
    let target = event.target.parentNode.parentNode.parentNode.nextSibling;

    if (target.style.display != 'none') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}

function selectAndNextObShow(event) {
    let index = event.target.selectedIndex;
    let nextOb = event.target.parentNode.parentNode.nextSibling.childNodes[1].childNodes[0];
    for (i = 0; i < nextOb.childNodes.length; i++) {
        nextOb.childNodes[i].style.display = 'none';
    }
    nextOb.childNodes[index].style.display = 'block';
}
function selectBeforAfterBtn(event) {
    let target = event.target;
    let select; let nextOb; let newIndex;
    if (target.innerText == '<') {
        select = event.target.parentNode.nextSibling.childNodes[0];
        nextOb = event.target.parentNode.parentNode.nextSibling.childNodes[1].childNodes[0];
        newIndex = select.selectedIndex - 1;
        if (newIndex < 0) { newIndex = select.childNodes.length - 1; }
        select.selectedIndex = newIndex;
    } else if (target.innerText == '>') {
        select = event.target.previousSibling;
        nextOb = event.target.parentNode.parentNode.nextSibling.childNodes[1].childNodes[0];
        newIndex = select.selectedIndex + 1;
        if (newIndex > select.childNodes.length - 1) { newIndex = 0; }
        select.selectedIndex = newIndex;
    }
    for (i = 0; i < nextOb.childNodes.length; i++) {
        nextOb.childNodes[i].style.display = 'none';
    }
    nextOb.childNodes[newIndex].style.display = 'block';
}

function NextShowEvent(event) {
    let target = event.target.parentNode.parentNode.parentNode.nextSibling;
    if (target.style.display != 'none') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}
function NextShowEvent2(event) {
    let target = event.target.nextSibling;
    if (target.style.display != 'none') {
        target.style.display = 'none';
    } else {
        target.style.display = 'block';
    }
}

function mouseoverEvent(event) {
    const target = event.target;
    let className = target.className;
    let color = className.split(':')[1];
    target.style.backgroundColor = color;
    
    let fontColor = className.split(':')[3];
    target.style.color = fontColor;
}
function mouseoutEvent(event) {
    const target = event.target;
    let className = target.className;
    let color = className.split(':')[2];
    target.style.backgroundColor = color;

    let fontColor = className.split(':')[4];
    target.style.color = fontColor;
}
//make html function =======================
function makeEvent(ob, option) {
    let option1 = option.split(':')[0];
    let clickOption = option.split(':')[1];
    if (option1 == 'NextShowEvent') {
        ob.addEventListener(`${clickOption}`, NextShowEvent);
        return ob;
    } else if (option1 == 'NextShowEvent2') {
        ob.addEventListener(`${clickOption}`, NextShowEvent2);
        return ob;
    } else if (option1 == 'NextNextNextShowEvent') {
        ob.addEventListener(`${clickOption}`, NextNextNextShowEvent);
        return ob;
    } else if (option1 == 'newWindow') {
        ob.addEventListener(`${clickOption}`, newWindow);
        return ob;
    } else if (option1 == 'mouseoverEvent') {
        ob.addEventListener(`${clickOption}`, mouseoverEvent);
        return ob;
    } else if (option1 == 'mouseoutEvent') {
        ob.addEventListener(`${clickOption}`, mouseoutEvent);
        return ob;
    } else if (option1 == 'selectAndNextObShow') {
        ob.addEventListener(`${clickOption}`, selectAndNextObShow);
        return ob;
    } else if (option1 == 'selectBeforAfterBtn') {
        ob.addEventListener(`${clickOption}`, selectBeforAfterBtn);
        return ob;
    } else if (option1 == 'editWin') {
        ob.addEventListener(`${clickOption}`, editWin);
        return ob;
    }
}

function makeOb(ob) {
    let newOb = document.createElement(ob);
    return newOb;
}
function makeAppend(parents, child) {
    let dd = parents;
    let bb = child;
    dd.appendChild(bb);
    return dd;
}
function makeClassName(ob, name) {
    ob.className = `${name}`;
    return ob;
}
function makeType(ob, kind) {
    ob.type = kind;
    return ob;
}
function makeValue(ob, value) {
    ob.value = value;
    return ob;
}
function makeInnerText(ob, text) {
    ob.innerText = text;
    return ob;
}
function makeStyle(ob, option) {
    let option2 = option.split(':')[0];
    let value = option.split(':')[1];
    if (option2 == 'width') {
        //value = Number(value);
        ob.style.width = value;

    } else if (option2 == 'height') {
        ob.style.height = value;
    } else if (option2 == 'display') {
        ob.style.display = value;
    } else if (option2 == 'background-color') {
        ob.style.backgroundColor = value;
    } else if (option2 == 'color') {
        ob.style.color = value;
    } else if (option2 == 'all') {
        ob.style.all = value;
    } else if (option2 == 'float') {
        ob.style.float = value;
    } else if (option2 == 'fontSize') {
        ob.style.fontSize = value;
    } else if (option2 == 'border') {
        ob.style.border = value;
    } else if (option2 == 'appearance') {
        ob.style.appearance = value;
    } else if (option2 == 'padding') {
        ob.style.padding = value;
    } else if (option2 == 'borderBottom') {
        ob.style.borderBottom = value;
    } else if (option2 == 'borderLeft') {
        ob.style.borderLeft = value;
    } else if (option2 == 'borderRight') {
        ob.style.borderRight = value;
    } else if (option2 == 'borderCollapse') {
        ob.style.borderCollapse = value;
    } else if (option2 == 'textAlign') {
        ob.style.textAlign = value;
    }
    return ob;
}
//main make html =======================
function makeHtml(ob, set) {
    let newOb;
    let child;

    for (const key in ob) {
        let keySorce = `${key}`
        let keyy = keySorce.split('_')[0];
        let sett = keySorce.split('_')[1];
        const target = typeof ob[key];
        if (target == 'object') {
            if (key == 'basic') {
                continue
            }
            child = makeHtml(ob[key], set);
            newOb = makeAppend(newOb, child);

        } else if (target == 'string' && keyy == 'type') {
            newOb = makeOb(ob[key]);
        } else if (target == 'string' && keyy == 'kind') {
            newOb = makeType(newOb, ob[key]);
        } else if (target == 'string' && keyy == 'value') {
            if (sett != null && sett.charAt(0) == 'B') {
                newOb = makeValue(newOb, set[`${sett}`]);
            } else {
                newOb = makeValue(newOb, ob[key]);
            }
        } else if (target == 'string' && keyy == 'event') {
            newOb = makeEvent(newOb, ob[key]);
        } else if (target == 'string' && keyy == 'innerText') {
            if (sett != null && sett.charAt(0) == 'B') {
                newOb = makeInnerText(newOb, set[`${sett}`]);
            } else {
                newOb = makeInnerText(newOb, ob[key]);
            }
        } else if (target == 'string' && keyy == 'style') {

            if (sett != null && sett.charAt(0) == 'B') {
                if (sett != 'BcolLine' && sett != 'BrowLine') {
                    newOb = makeStyle(newOb, `${ob[key].split(':')[0]}:${set[sett]}`);
                } else {
                    newOb = makeStyle(newOb, set[sett]);
                }


            } else {
                newOb = makeStyle(newOb, ob[key]);
            }
        } else if (target == 'string' && keyy == 'className') {
            if (sett != null && sett.charAt(0) == 'B') {
                if(sett == 'BclassName'){
                    newOb = makeClassName(newOb, set[sett]);
                }else if(sett == 'BbtnClassName'){
                    newOb = makeClassName(newOb, set.BbtnClassName);
                }
            } else {
                newOb = makeClassName(newOb, ob[key]);
            }
        }
    }
    return newOb;
}
//main make =======================


const main = document.querySelector('.main');


let array2 = Mwindow.save('new');

for (let i = 0; i < 10; i++) {
    if (array2[i] != null) {
        let set = {
            Btitle: `${array2[i].title}`,
            BclassName: `w${i}`,

            //color
            Bshow: true,
            BhtmlBack: 'white',
            BwinBack: '#FEF896',
            BbtnBack: '#FEF896',
            BbtnHover: '#999999',
            BtitleBack: '#FEF896',

            BbtnClassName: `w${i}_btn:#${this.BbtnHover}:#${this.BbtnBack}:#000000:#000000`,
            //font
            BwinFontSize: 1,
            BwinFontWeight: 100,
            BwinFontColor: 'black',
            BwinFontType: 'serif',
            BwinFontKind: 'normal',

            BtitleFontSize: 1,
            BtitleFontWeight: 100,
            BtitleFontColor: 'black',
            BtitleFontType: 'serif',
            BtitleFontKind: 'normal',
            //line

            BlineRowColor: 'B8D993',
            BlineRowWeight: 1.5,
            BlineColColor: 'ff8c82',
            BlineColWeight: 1.5,

            //win size
            BwinWidth: '456px',
            BwinHeight: null,
        }
        set.BbtnClassName = `w${i}_btn:${set.BbtnHover}:${set.BbtnBack}:#000000:#000000`;
        set.BrowLine = `borderBottom:${set.BlineRowWeight}px solid #${set.BlineRowColor}`;
        set.BcolLine = `borderRight:${set.BlineColWeight}px solid #${set.BlineColColor}`;
        let aaaa = makeHtml(w, set);
        main.appendChild(aaaa);
    }

}
