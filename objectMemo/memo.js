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
//font option
let fontFamily = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong']
let fontStyle = ['normal', 'italic', 'oblique'];
let fontWeight = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
let winEditPage = ['this window color', 'this window size & line', 'this window tap & title font', 'del window'];

let wB = {
    Btitle: 'w0',
    BclassName: 'w0',
    Bshow: true,

    //color
    BwinBack: 'FEF896',
    BwinFontColor: 'black',
    BhtmlBack: 'white',

    BlineRowColor: 'B8D993',
    BlineColColor: 'ff8c82',

    BtitleBack: 'FEF896',
    BtitleFontColor: 'black',

    BbtnHover: '999999',
    BbtnHoverfontColor: '000000',

    //size & line
    BwinWidth: 456,
    BwinHeight: null,

    BlineRowWeight: 1.5,
    BlineColWeight: 1.5,

    //tap & title font
    BwinFontSize: 1,
    BwinFontWeight: 100,
    BwinFontFamily: 'serif',
    BwinFontStyle: 'normal',

    BtitleFontSize: 1,
    BtitleFontWeight: 100,
    BtitleFontFamily: 'serif',
    BtitleFontStyle: 'normal',

    //line
    //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
}
wB.BrowLine = `borderBottom:${wB.BlineRowWeight}px solid #${wB.BlineRowColor}`;
wB.BcolLine = `borderRight:${wB.BlineColWeight}px solid #${wB.BlineColColor}`;
wB.BbtnClassName = `${wB.BclassName}_btn:#${wB.BbtnHover}:#${wB.BwinBack}:#${wB.BbtnHoverfontColor}:#${wB.BwinFontColor}`;


function wBmatchWinArray(option, array) {
    if (option == 'makeSetToArray') {
        if(array == null){
            return null;
        }
        let wArray = [];
        for(key in array){
            wArray.push(array[key]);
        }
        return wArray;
    } else if(option =='makeArrayToSet') {

        set = copyReturn();
        let ii=0;
        for(key in set){
            set[key] = array[ii];
            ii++;
        }
        set.BrowLine = `borderBottom:${set.BlineRowWeight}px solid #${set.BlineRowColor}`;
        set.BcolLine = `borderRight:${set.BlineColWeight}px solid #${set.BlineColColor}`;
        set.BbtnClassName = `${set.BclassName}_btn:${set.BbtnHover}:${set.BwinBack}:${set.BbtnHoverfontColor}:${set.BwinFontColor}`;       
        return set;
    }
}

//배경색 #FEF896, 가로선 #B8D993, 세로선 #FFDD8D
function copyReturn() { //윈도우 기본 객체
    let clone = {};                                //tap [class,name] array
    for(let key in wB){
        clone[key] = wB[key];
    }
    return clone;
}

//=============================== basic option 

let Mwindow = {
    pk: null,
    length:10,

    //winArray : { 0 : {title:'win0', backColor:['black','black','black'], text:['10pt','white',null,'h3'], tap:[null] }
    winArray: {
        0: copyReturn(),
        1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null
    },

    save: function (option, set) {
        if (option == 'new') {
            let getSave = localStorage.getItem('winArray');
            if (getSave == null) {
                let newWinArray = this.winArray;
                let Array = wBmatchWinArray('makeSetToArray', newWinArray[0]);
                newWinArray[0] = Array;
                localStorage.setItem('winArray', JSON.stringify(newWinArray));
                return newWinArray;
            } else {
                getSave = JSON.parse(getSave);
                let saveWin = [];
                for(i=0;i<this.length;i++){
                    if(getSave[i]!=null){
                        getSave[i] = wBmatchWinArray('makeArrayToSet',getSave[i]);
                        getSave[i].BclassName = `w${i}`;
                    }
                }
                return getSave;
            }
        } else if (option == 'plusNew') {
            let copy1 = copyReturn();
            let newWin = this.save('new');
            let num;
            for(i=0;i<this.length;i++){
                if(newWin[i]==null){
                    copy1.Btitle = `w${i}`;
                    copy1.BclassName = `w${i}`;
                    num = i;
                    break
                }
            }
            newWin[num] = copy1;
            for(k=0;k<this.length;k++){
                newWin[k] = wBmatchWinArray('makeSetToArray', newWin[k]);
            }
            localStorage.setItem('winArray', JSON.stringify(newWin));
            return copy1;

        } else if (option == 'editSave') {
            let win = this.save('new');
            
            let nn = set.target;
            let setOb = win[nn];
            for (let key in set) {
                if (setOb[key] != null && key != 'target') {
                    setOb[key] = set[key];
                }
            }
            win[nn] = setOb;

            newWin = [];
            for(i=0;i<this.length;i++){
                win[i] = wBmatchWinArray('makeSetToArray', win[i]);
            }

            localStorage.setItem('winArray', JSON.stringify(win));
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
//window table =======================
function newTapBtn(text) {
    td = {
        type: 'td',
        style_BrowLine: `${wB.BrowLine}`,
        style_border: 'borderCollapse:collapse',
        style_width: 'width:50px',
        className: 'row',
        btn1: btn = {
            type: 'button',
            innerText: `${text}`,
            event: 'newWindow:click',
            style_BbtnBack: `background-color:#${wB.BwinBack}`,
            style_textAlign: 'textAlign:left',
            style_width: 'width:100%',
            style_height: 'height:20px',
            className_BbtnClassName: `${wB.BbtnClassName}`,
            event_out: 'mouseoverEvent:mouseover',
            event_in: 'mouseoutEvent:mouseout',
        }
    }
    return td;
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
/*
input11: weight = returnSelectOb(fontWeight, {
    className: 'wTextWeight',
    event: 'editWin:input',
}),
*/


let w = {
    type: 'div', className_BclassName: `${wB.BclassName}`,
    style_display: 'display:inlie-block',
    style_BwinWidth: `width:${wB.BwinWidth}px`,
    style_padding: 'padding:3px',
    window_n: div = {
        type: 'div', //className_BclassName: this.basic.BclassName,
        style_BwinBack: `background-color:#${wB.BwinBack}`,
        table_winTitle: table = {
            type: 'table', style_border: 'borderCollapse:collapse', style_1: 'width:100%',

            tr_winTitle: tr = {
                type: 'tr',
                td_plussBtn: td = {
                    type: 'td', style_width: 'width:30px',
                    style_BrowLine: `${wB.BrowLine}`,
                    style_BcolLine: `${wB.BcolLine}`,
                    style_border: 'borderCollapse:collapse',
                    className: 'title_rowCol',
                    plussBtn: btn1 = {
                        type: 'button',
                        innerText: ' + ',
                        event: 'NextNextNextShowEvent:click',
                        style_width: 'width:20px',
                        style_height: 'height:20px',
                        style_BbtnBack: `background-color:#${wB.BwinBack}`,
                        className_BbtnClassName: `winTitle_plsBtn:#${wB.BbtnHover}:#${wB.BwinBack}`,
                        event_out: 'mouseoverEvent:mouseover',
                        event_in: 'mouseoutEvent:mouseout',
                    },
                },
                td_titleBtn: td = {
                    type: 'td', style_width: 'width:100%',
                    style_BrowLine: `borderBottom:${wB.BlineRowWeight}px solid #${wB.BlineRowColor}`,
                    style_border: 'borderCollapse:collapse',
                    style_BtitleBack: `background-color:#${wB.BtitleBack}`,
                    className: 'title_row',
                    titleBtn: btn2 = {
                        type: 'button',
                        style_width: 'width:100%',
                        style_height: 'heigth:20px',
                        innerText_Btitle: `${wB.Btitle}`,
                        event: 'NextShowEvent2:dblclick',
                        style_BtitleBack: `background-color:#${wB.BtitleBack}`,
                        style_textAlign: 'textAlign:left',
                        className: 'winTitle_titleBtn',
                    },
                    titleEditForm: form1 = {
                        type: 'form',
                        style_display: 'display:none',
                        className: 'winTitle_titleEditForm',
                        event: 'titleNameChange:submit',
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
                style_back: `background-color:#${wB.BwinBack}`,

                //style_1: 'width:100%',
                tr_plsTap: tr = {
                    type: 'tr',
                    td_winEditBtn: td = {
                        type: 'td',
                        style_width: 'width:20px',
                        style_BrowLine: `${wB.BrowLine}`,
                        style_BcolLine: `${wB.BcolLine}`,
                        style_border: 'borderCollapse:collapse',
                        className: 'rowCol',
                        winEditBtn: btn1 = {
                            type: 'button',
                            innerText: 'e',
                            event: 'NextNextNextShowEvent:click',
                            style_BbtnBack: `background-color:#${wB.BwinBack}`,
                            style_width: 'width:20px',
                            style_height: 'height:20px',
                            className_BbtnClassName: `${wB.BbtnClassName}`,
                            event_out: 'mouseoverEvent:mouseover',
                            event_in: 'mouseoutEvent:mouseout',
                        },
                    },
                    td1: td = newTapBtn('윈도'),
                    td2: td = newTapBtn('메모'),
                    td3: td = newTapBtn('계산'),
                    td4: td = newTapBtn('링크'),
                    td5: td = newTapBtn('달력'),
                    td6: td = newTapBtn('타임'),
                    td7: td = newTapBtn('그림'),
                    td8: td = newTapBtn('랜덤'),
                    td9: td = {
                        type: 'td',
                        style_BrowLine: `${wB.BrowLine}`,
                        style_border: 'borderCollapse:collapse',
                        className: 'row',
                    },
                },
            },
            editPage_Table: winEdit = {
                type: 'table', style_display: 'display:none',
                style_BrowLine: `${wB.BrowLine}`,
                className: 'row',
                style_BbtnBack: `background-color:#${wB.BwinBack}`,

                winEdit_Tr: backColor = {
                    type: 'tr',
                    tr1: tr = {
                        type: 'tr',
                        td1: td = {
                            type: 'td',
                            style_BcolLine: `${wB.BcolLine}`,
                            className: 'col',
                            beforeBtn: button = {
                                type: 'button',
                                innerText: '<',
                                style_2: 'border:0',
                                style_BbtnBack: `background-color:#${wB.BwinBack}`,
                                className_BbtnClassName: `${wB.BbtnClassName}`,
                                event_out: 'mouseoverEvent:mouseover',
                                event_in: 'mouseoutEvent:mouseout',
                                event_2: 'selectBeforAfterBtn:click',
                                style_width: 'width:20px',
                                style_height: 'height:20px',
                            },
                        },
                        td2: td = {
                            type: 'td',
                            style_padding: 'padding:0 0 0 3px',
                            menuSelect: select = returnSelectOb(winEditPage, {
                                style_border: 'border:0',
                                style_appearance: 'appearance:none',
                                style_padding: 'padding:0px 5px',
                                style_height: 'height:20px',
                                event: 'selectAndNextObShow:change',
                                style_BwinBack: `background-color:#${wB.BwinBack}`,
                                className_BbtnClassName: `${wB.BbtnClassName}`,
                                event_out: 'mouseoverEvent:mouseover',
                                event_in: 'mouseoutEvent:mouseout',
                            }),
                            nextBtn: button = {
                                type: 'button',
                                innerText: ' > ',
                                style_border: 'border:0',
                                style_width: 'width:30px',
                                style_height: 'height:20px',
                                style_BwinBack: `background-color:#${wB.BwinBack}`,
                                className_BbtnClassName: `${wB.BbtnClassName}`,
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
                            style_BcolLine: `${wB.BcolLine}`,
                            className: 'col'
                        },
                        td2: td = {
                            type: 'td',
                            style_padding: 'padding:0 0 0 8px',
                            style_width: 'width:100%',

                            formDiv: div = {
                                type: 'div',
                                form1: backColor = {
                                    type: 'form',
                                    style: 'display:block',
                                    className: 'wForm1',

                                    pre1: winBackColor = { type: 'pre', innerText: 'background color : ', style: 'display:inline-block' },
                                    input1: input = {
                                        type: 'input',
                                        kind: 'color',
                                        style: 'display:inline-block',
                                        event_1: 'editWin:input',
                                        className: 'wBackColor',
                                    },

                                    br33: br = { type: 'span', innerText: '\n' },
                                    pre33: fontColor = { type: 'pre', innerText: 'font color : ', style: 'display:inline-block' },
                                    input33: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'wFontColor',
                                        event_1: 'editWin:input',
                                    },

                                    br_htmlBack: br = { type: 'span', innerText: '\n' },
                                    pre_htmlBack: pre = {
                                        type: 'pre',
                                        innerText: 'html background color : ', style: 'display:inline-block'
                                    },
                                    input_htmlBack: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'htmlBackColor',
                                        event_1: 'editWin:input',
                                    },

                                    br_rowLine: br = { type: 'span', innerText: '\n' },
                                    pre_rowLine: rowLineColor = { type: 'pre', innerText: 'row line color : ', style: 'display:inline-block', },
                                    input_rowLine: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'wRowLineColor',
                                        event_1: 'editWin:input',
                                    },

                                    br_colLineLine: br = { type: 'span', innerText: '\n' },
                                    pre_colLine: rowLineColor = { type: 'pre', innerText: 'col line color : ', style: 'display:inline-block' },
                                    input_colLine: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'wColLineColor',
                                        event_1: 'editWin:input',
                                    },

                                    br2: br = { type: 'span', innerText: '\n' },
                                    pre3: titleBack = {
                                        type: 'pre',
                                        innerText: 'title background color : ', style: 'display:inline-block',
                                    },
                                    input3: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'wTitleBackColor',
                                        event_1: 'editWin:input',
                                    },

                                    br_title: br = { type: 'span', innerText: '\n' },
                                    pre_title: titleBack = {
                                        type: 'pre',
                                        innerText: 'title font color : ',
                                        style: 'display:inline-block',
                                    },
                                    input_title: input = {
                                        type: 'input', kind: 'color',
                                        className: 'wTitleFontColor',
                                        event_1: 'editWin:input',
                                    },

                                    br11: br = { type: 'span', innerText: '\n' },
                                    pre22: btnHoverColor = {
                                        type: 'pre',
                                        innerText: 'button hover color : ', style: 'display:inline-block',
                                    },
                                    input22: input = {
                                        type: 'input', kind: 'color',
                                        event_1: 'editWin:input',
                                        className: 'wBtnHoverBackColor',
                                    },

                                    br1: br = { type: 'span', innerText: '\n' },
                                    pre2: btnHoverFontColor = {
                                        type: 'pre',
                                        innerText: 'button hover font color : ', style: 'display:inline-block'
                                    },
                                    input2: input = {
                                        type: 'input', kind: 'color',
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
                                    className: 'wForm2',
                                    pre1: basicWidth = {
                                        type: 'pre',
                                        innerText: 'basic width size : ',
                                        style: 'display:inline-block',
                                    },
                                    input1: width = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        event: 'editWin:input',
                                        className: 'wWidthSize'

                                    },
                                    br1: br = { type: 'span', innerText: '\n' },

                                    pre2: basicHeight = {
                                        type: 'pre',
                                        innerText: 'basic height size : ',
                                        style: 'display:inline-block',

                                    },
                                    input2: height = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        event: 'editWin:input',
                                        className: 'wHeightSize'
                                    },
                                    br2: br = { type: 'span', innerText: '\n' },

                                    pre3: basicRow = { type: 'pre', innerText: 'basic row line Thickness : ', style: 'display:inline-block' },
                                    input4: rowLine = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        event: 'editWin:input',
                                        className: 'wRowLineThik'
                                    },
                                    br3: br = { type: 'span', innerText: '\n' },

                                    pre4: basicCol = { type: 'pre', innerText: 'basic col line Thickness : ', style: 'display:inline-block' },
                                    input6: colLine = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        event: 'editWin:input',
                                        className: 'wColLineThik',
                                    },
                                    br4: br = { type: 'span', innerText: '\n' },

                                    sub1: sub = { type: 'input', kind: 'submit', value: 'save option' },
                                },
                                form3: textSize = {
                                    type: 'form', style: 'display:none',
                                    className: 'wForm3',
                                    event: 'editWin:submit',


                                    pre1: titleSizeWeight = { type: 'pre', innerText: 'title text size & weight : ', style: 'display:inline-block' },
                                    input1: size = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        className: 'wTextSize',
                                        event: 'editWin:input',
                                    },
                                    input11: weight = returnSelectOb(fontWeight, {
                                        className: 'wTextWeight',
                                        event: 'editWin:input',
                                    }),
                                    br1: br = { type: 'span', innerText: '\n' },

                                    pre2: titleFontKind = {
                                        type: 'pre',
                                        innerText: 'title font type & kind : ',
                                        style: 'display:inline-block'
                                    },
                                    select2: family = returnSelectOb(fontFamily, {
                                        className: 'wFontType',
                                        event: 'editWin:input',
                                    }),
                                    select22: style = returnSelectOb(fontStyle, {
                                        className: 'wFontKind',
                                        event: 'editWin:input',
                                    }),
                                    br2: br = { type: 'span', innerText: '\n' },

                                    pre3: basicFontSizeWeight = { type: 'pre', innerText: 'basic text size & weight : ', style: 'display:inline-block' },
                                    input3: size = { type: 'input', kind: 'number', style_width: 'width:40px' },
                                    input33: weight = returnSelectOb(fontWeight),
                                    br3: br = { type: 'span', innerText: '\n' },

                                    pre4: basicFontKind = { type: 'pre', innerText: 'basic font type & kind : ', style: 'display:inline-block' },
                                    select4: family = returnSelectOb(fontFamily),
                                    select44: style = returnSelectOb(fontStyle),
                                    br4: br = { type: 'span', innerText: '\n' },

                                    sub1: sub = { 
                                        type: 'input', 
                                        kind: 'submit', 
                                        value: 'save option',
                                        className: 'wForm3_submit',
                                        event: 'editWin:submit',
                                    },

                                },
                                form4: delWin = {
                                    type: 'form', style: 'display:none',
                                    className: 'wForm4',
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

//pluss function =======================
function newWindow(event) {
    let newWin = Mwindow.save('plusNew');
    wB.BclassName = newWin.BclassName;
    wB.Btitle = newWin.Btitle; 
    let aaaa = makeHtml(w, newWin);
    main.appendChild(aaaa);
}

function editWin(event) {
    const inputValue = event.target.value;
    const inputOption = event.target.className;
    const winName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className;
    
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
    } else if (inputOption == 'wFontColor') {//winName
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

    } else if (inputOption == 'htmlBackColor') {
        //htmlBackColor
        const html = document.querySelector(`body`);
        html.style.backgroundColor = inputValue;
    } else if (inputOption == 'wRowLineColor') {
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

    } else if (inputOption == 'wColLineColor') {
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

    } else if (inputOption == 'wTitleBackColor') {
        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_plsBtn = title_rowCol.childNodes[0];
        let title_row = document.querySelector(`.${winName} .title_row`);
        let title_titleBtn = title_row.childNodes[0];

        title_row.style.backgroundColor = inputValue;
        title_rowCol.style.backgroundColor = inputValue;
        title_plsBtn.style.backgroundColor = inputValue;
        title_titleBtn.style.backgroundColor = inputValue;

    } else if (inputOption == 'wTitleFontColor') {
        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_plsBtn = title_rowCol.childNodes[0];
        let title_row = document.querySelector(`.${winName} .title_row`);
        let title_titleBtn = title_row.childNodes[0];

        title_plsBtn.style.color = inputValue;
        title_titleBtn.style.color = inputValue;

    } else if (inputOption == 'wBtnHoverBackColor') {
        let text2 = document.querySelectorAll(`.${winName} button`);
        let text3 = document.querySelectorAll(`.${winName} select`);

        const btnColor = text2[0].className.split(':');

        for (i = 0; i < text2.length; i++) {
            text2[i].className = `${winName}_btn:${inputValue}:${btnColor[2]}:${btnColor[3]}:${btnColor[4]}`;            //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
        }
        for (i = 0; i < text3.length; i++) {
            text3[i].className = `${winName}_btn:${inputValue}:${btnColor[2]}:${btnColor[3]}:${btnColor[4]}`;
        }
        //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
    } else if (inputOption == 'wBtnHoverFontColor') {
        let text2 = document.querySelectorAll(`.${winName} button`);
        let text3 = document.querySelectorAll(`.${winName} select`);

        const btnColor = text2[0].className.split(':');

        for (i = 0; i < text2.length; i++) {
            text2[i].className = `${winName}_btn:${btnColor[1]}:${btnColor[2]}:${inputValue}:${btnColor[4]}`;
        }
        //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
        for (i = 0; i < text3.length; i++) {
            text3[i].className = `${winName}_btn:${btnColor[1]}:${btnColor[2]}:${inputValue}:${btnColor[4]}`;
        }

    } else if (inputOption == 'wWidthSize') {
        let widthValue = event.target.value;
        const div = document.querySelector(`.${winName}`);
        if (widthValue.length <= 0 || widthValue <= 50) {
            widthValue = 456;
            div.style.removeProperty('overflow');
        } else if (widthValue > 10) {
            div.style.overflow = 'auto';
        }
        div.style.width = `${widthValue}px`;


    } else if (inputOption == 'wHeightSize') {
        let widthValue = event.target.value;
        let div = document.querySelector(`.${winName}`);
        if (widthValue.length <= 0 || widthValue <= 50) {
            div.style.removeProperty('height');
            div.style.removeProperty('overflow');
        } else if (widthValue > 10) {
            div.style.height = `${widthValue}px`;
            div.style.overflow = 'auto';
        }
    } else if (inputOption == 'wRowLineThik') {
        let row = document.querySelectorAll(`.${winName} .row`);
        let rowCol = document.querySelectorAll(`.${winName} .rowCol`);
        let before = row[0].style.borderBottom;
        let beforeSet = before.split(' ');

        for (i = 0; i < row.length; i++) {
            row[i].style.borderBottom = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;
        }
        for (i = 0; i < rowCol.length; i++) {
            rowCol[i].style.borderBottom = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;
        }

        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_row = document.querySelector(`.${winName} .title_row`);

        title_row.style.borderBottom = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;
        title_rowCol.style.borderBottom = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;

    } else if (inputOption == 'wColLineThik') {
        let col = document.querySelectorAll(`.${winName} .col`);
        let rowCol = document.querySelectorAll(`.${winName} .rowCol`);
        let before = col[0].style.borderRight;
        let beforeSet = before.split(' ');

        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        title_rowCol.style.borderRight = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;

        for (i = 0; i < col.length; i++) {
            col[i].style.borderRight = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;
        }

        for (i = 0; i < rowCol.length; i++) {
            rowCol[i].style.borderRight = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;
        }
    } else if (inputOption == 'wTextSize') {
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);
        let value;
        if (inputValue.length >= 0 && inputValue >= 5) {
            value = inputValue;
        } else {
            value = 10
        }
        for (i = 0; i < pre.length; i++) {
            pre[i].style.fontSize = `${value}px`;
        }
        for (i = 0; i < btn.length; i++) {
            btn[i].style.fontSize = `${value}px`;
        }
        for (i = 0; i < select.length; i++) {
            select[i].style.fontSize = `${value}px`;
        }
    } else if (inputOption == 'wTextWeight') {
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);

        for (i = 0; i < pre.length; i++) {
            pre[i].style.fontWeight = inputValue;
        }
        for (i = 0; i < btn.length; i++) {
            btn[i].style.fontWeight = inputValue;
        }
        for (i = 0; i < select.length; i++) {
            select[i].style.fontWeight = inputValue;
        }
    } else if (inputOption == 'wFontType') {
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);

        for (i = 0; i < pre.length; i++) {
            pre[i].style.fontFamily = inputValue;
        }
        for (i = 0; i < btn.length; i++) {
            btn[i].style.fontFamily = inputValue;
        }
        for (i = 0; i < select.length; i++) {
            select[i].style.fontFamily = inputValue;
        }
    } else if (inputOption == 'wFontKind') {
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);

        for (i = 0; i < pre.length; i++) {
            pre[i].style['fontStyle'] = inputValue;
        }
        for (i = 0; i < btn.length; i++) {
            btn[i].style['fontStyle'] = inputValue;
        }
        for (i = 0; i < select.length; i++) {
            select[i].style['fontStyle'] = inputValue;
        }
    }  else if(inputOption == 'wForm3'){
        event.preventDefault();
        let form = document.querySelector(`.${winName} .${inputOption}`);
        let Bw = {};
        const wName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className;
        let regex = /[^0-9]/g;
        let n = wName.replace(regex, "");

        Bw.target = Number(n);
        Bw.BwinFontSize = form.elements[0].value;
        Bw.BwinFontWeight = form.elements[1].value;
        Bw.BwinFontFamily = form.elements[2].value;
        Bw.BwinFontStyle = form.elements[3].value;
        Mwindow.save('editSave', Bw);
    }
    //wRowLineColor
    //wColLineColor

    //wTitleBackColor
    //wTitleFontColor

    //wBtnHoverBackColor
    //wBtnHoverFontColor
}

function titleNameChange(event){
    event.preventDefault();
    let wName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.className;

    let form = document.querySelector(`.${wName} .${event.target.className}`);
    let Bw = {};
    let regex = /[^0-9]/g;
    let n = wName.replace(regex, "");
    Bw.target = Number(n);
    Bw.Btitle = form.elements[0].value;
    Mwindow.save('editSave', Bw);

    let title = event.target.previousSibling;
    title.innerText = Bw.Btitle;
    form.style.display = 'none';


    console.log(form);
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
    } else if(option1 == 'titleNameChange'){
        ob.addEventListener(`${clickOption}`, titleNameChange);
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
            newOb = makeStyle(newOb, ob[key]);
        } else if (target == 'string' && keyy == 'className') {
            if (sett != null && sett.charAt(0) == 'B') {
                if (sett == 'BclassName') {
                    newOb = makeClassName(newOb, set[sett]);
                } else if (sett == 'BbtnClassName') {
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
        let set = copyReturn();

        set.Btitle = array2[i].Btitle;
        set.BclassName = array2[i].BclassName;

        set.BbtnClassName = `${array2[i].BbtnClassName}`;
        set.BrowLine = `borderBottom:${array2[i].BlineRowWeight}px solid #${array2[i].BlineRowColor}`;
        set.BcolLine = `borderRight:${array2[i].BlineColWeight}px solid #${array2[i].BlineColColor}`;
        let aaaa = makeHtml(w, set);
        main.appendChild(aaaa);
    }
}
