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
    BwinFontColor: '000000',
    BhtmlBack: 'FFFFFF',

    BlineRowColor: 'B8D993',
    BlineColColor: 'ff8c82',

    BtitleBack: 'FEF896',
    BtitleFontColor: '000000',

    BbtnHover: '999999',
    BbtnHoverfontColor: '000000',

    //size & line
    BwinWidth: '456',
    BwinHeight: null,

    BlineRowWeight: '1.5',
    BlineColWeight: '1.5',

    //tap & title font
    BwinFontSize: '13',
    BwinFontWeight: 0,
    BwinFontFamily: 1,
    BwinFontStyle: 0,

    BtitleFontSize: '13',
    BtitleFontWeight: 0,
    BtitleFontFamily: 1,
    BtitleFontStyle: 0,

    BtapArray: [
        null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null,
    ],

    //line
    //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
}
function checkValue(ob) {
    let color = [
        'BwinBack', 'BwinFontColor', 'BhtmlBack',
        'BlineRowColor', 'BlineColColor',
        'BtitleBack', 'BtitleFontColor',
        'BbtnHover', 'BbtnHoverfontColor'
    ]
    let number = [
        'BwinWidth', 'BwinHeight',
        'BlineRowWeight', 'BlineColWeight',
        'BwinFontSize', 'BwinFontWeight',
        'BtitleFontSize', 'BtitleFontWeight'
    ]

    for (i = 0; i < color.length; i++) {
        if (ob[`${color[i]}`].charAt(0) != '#') {
            ob[`${color[i]}`] = `#${ob[`${color[i]}`]}`
        }
    }

    for (i = 0; i < number.length; i++) {
        if (isNaN(ob[`${number[i]}`]) == false) {
            ob[`${number[i]}`] = `${ob[`${number[i]}`]}px`
        }
    }

    ob.BwinFontWeight = fontWeight[ob.BwinFontWeight];
    ob.BwinFontFamily = fontFamily[ob.BwinFontFamily];
    ob.BwinFontStyle = fontStyle[ob.BwinFontStyle];

    ob.BtitleFontWeight = fontWeight[ob.BtitleFontWeight];
    ob.BtitleFontFamily = fontFamily[ob.BtitleFontFamily];
    ob.BtitleFontStyle = fontStyle[ob.BtitleFontStyle];

    ob.BrowLine = `${ob.BlineRowWeight} solid ${ob.BlineRowColor}`;
    ob.BcolLine = `${ob.BlineColWeight} solid ${ob.BlineColColor}`;
    ob.BbtnClassName = `${ob.BclassName}_btn:${ob.BbtnHover}:${ob.BwinBack}:${ob.BbtnHoverfontColor}:${ob.BwinFontColor}`;
    ob.BtitleBtnClassName = `${ob.BclassName}_btn:${ob.BbtnHover}:${ob.BtitleBack}:${ob.BbtnHoverfontColor}:${ob.BtitleFontColor}`;
    return ob;
}

function wBmatchWinArray(option, array) {
    if (option == 'makeSetToArray') {
        if (array == null) {
            return null;
        }
        let wArray = [];
        for (key in array) {
            if (key != 'BrowLine' && key != 'BcolLine' && key != 'BbtnClassName') {
                wArray.push(array[key]);
            }
        }
        return wArray;
    } else if (option == 'makeArrayToSet') {

        set = copyReturn();
        let ii = 0;
        for (key in set) {
            set[key] = array[ii];
            ii++;
        }
        set.BrowLine = `borderBottom:${set.BlineRowWeight}px solid #${set.BlineRowColor}`;
        set.BcolLine = `borderRight:${set.BlineColWeight}px solid #${set.BlineColColor}`;
        set.BbtnClassName = `${set.BclassName}_btn:#${set.BbtnHover}:#${set.BwinBack}:#${set.BbtnHoverfontColor}:#${set.BwinFontColor}`;
        return set;
    }
}

//배경색 #FEF896, 가로선 #B8D993, 세로선 #FFDD8D
function copyReturn() { //윈도우 기본 객체
    let clone = {};                                //tap [class,name] array
    for (let key in wB) {
        clone[key] = wB[key];
    }
    return clone;
}

//=============================== basic option 

let Mwindow = {
    length: 10,
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
                for (i = 0; i < this.length; i++) {
                    if (getSave[i] != null) {
                        getSave[i] = wBmatchWinArray('makeArrayToSet', getSave[i]);
                        getSave[i].BclassName = `w${i}`;
                    }
                }
                return getSave;
            }
        } else if (option == 'plusNew') {
            let copy1 = copyReturn();
            let newWin = this.save('new');
            let num;
            for (i = 0; i < this.length; i++) {
                if (newWin[i] == null) {
                    copy1.Btitle = `w${i}`;
                    copy1.BclassName = `w${i}`;
                    num = i;
                    break
                }
            }
            newWin[num] = copy1;
            for (k = 0; k < this.length; k++) {
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
            for (i = 0; i < this.length; i++) {
                win[i] = wBmatchWinArray('makeSetToArray', win[i]);
            }
            localStorage.setItem('winArray', JSON.stringify(win));
        } else if (option == 'newTap') {//newnewnew
            let win = this.save('new');
            let nn = set.target;
            let tapAraay = win[nn].BtapArray;
            let lastN = null;
            for (i = 0; i < tapAraay.length; i++) {
                if (tapAraay[i] != null) {
                    if (lastN <= tapAraay[i][2]) {
                        lastN = tapAraay[i][2];
                    }
                }
            }
            if (lastN == null) {
                lastN = 0;
            } else {
                lastN += 1;
            }
            for (i = 0; i < tapAraay.length; i++) {
                if (tapAraay[i] == null) {
                    tapAraay[i] = [
                        `w${set.target}_${i}_${set.tapType}`,
                        `${set.name}`,
                        lastN
                    ];
                    break;
                }
            }
            for (i = 0; i < this.length; i++) {
                win[i] = wBmatchWinArray('makeSetToArray', win[i]);
            }
            localStorage.setItem('winArray', JSON.stringify(win));
        }
    },
}

function re(value) {
    return value;
}
//window table =======================
function newTapBtn(text, option) {
    td = {
        type: 'td',
        style_BrowLine_borderBottom: `${wB.BrowLine}`,
        style_border: 'borderCollapse:collapse',
        style_width: 'width:50px',
        className: 'row',
        btn1: btn = {
            type: 'button',
            innerText: `${text}`,
            style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
            style_textAlign: 'textAlign:left',
            style_width: 'width:100%',
            style_height: 'height:20px',
            style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
            style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
            style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
            style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
            className_BbtnClassName: `${wB.BbtnClassName}`,
            event_out: 'mouseoverEvent:mouseover',
            event_in: 'mouseoutEvent:mouseout',
        }
    }
    if (option != null) {
        for (const key in option) {
            td.btn1[key] = option[key];
        }
    }
    return td;
}

//style:'fontSize:1em', style_2:'border:0', style_3:'appearance:none',
function returnSelectOb(array, option) {
    let select = {
        type: 'select',
        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
        className_BbtnClassName: `${wB.BbtnClassName}`,
    };
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
    style_BwinWidth_width: `width:${wB.BwinWidth}px`,
    style_padding: 'padding:3px',
    window_n: div = {
        type: 'div', //className_BclassName: this.basic.BclassName,
        style_BtitleBack_backgroundColor: `background-color:#${wB.BwinBack}`,
        table_winTitle: table = {
            type: 'table', style_border: 'borderCollapse:collapse', style_1: 'width:100%',

            tr_winTitle: tr = {
                type: 'tr',
                td_plussBtn: td = {
                    type: 'td', style_width: 'width:30px',
                    style_BrowLine_borderBottom: `${wB.BrowLine}`,
                    style_BcolLine_borderRight: `${wB.BcolLine}`,
                    style_border: 'borderCollapse:collapse',
                    className: 'title_rowCol',
                    plussBtn: btn1 = {
                        type: 'button',
                        innerText: ' + ',
                        event: 'NextNextNextShowEvent:click',
                        style_width: 'width:20px',
                        style_height: 'height:20px',
                        style_BtitleBack_backgroundColor: `background-color:#${wB.BwinBack}`,
                        className_BtitleBtnClassName: `winTitle_plsBtn:#${wB.BbtnHover}:#${wB.BwinBack}`,
                        event_out: 'mouseoverEvent:mouseover',
                        event_in: 'mouseoutEvent:mouseout',
                        style_BwinFontColor_color: '',
                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                        className_BbtnClassName: `${wB.BbtnClassName}`,
                    },
                },
                td_titleBtn: td = {
                    type: 'td', style_width: 'width:100%',
                    style_BrowLine_borderBottom: `borderBottom:${wB.BlineRowWeight}px solid #${wB.BlineRowColor}`,
                    style_border: 'borderCollapse:collapse',
                    style_BtitleBack_backgroundColor: `background-color:#${wB.BtitleBack}`,
                    className: 'title_row',
                    titleBtn: btn2 = {
                        type: 'button',
                        style_width: 'width:100%',
                        style_height: 'heigth:20px',
                        innerText_Btitle: `${wB.Btitle}`,
                        event: 'NextShowEvent2:dblclick',
                        style_BtitleBack_backgroundColor: `background-color:#${wB.BtitleBack}`,
                        style_textAlign: 'textAlign:left',
                        className: 'winTitle_titleBtn',
                        style_BtitleFontSize_fontSize: `${wB.BwinFontSize}`,
                        style_BtitleFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                        style_BtitleFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                        style_BtitleFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                        className_BbtnClassName: `${wB.BbtnClassName}`,
                    },
                    titleEditForm: form1 = {
                        type: 'form',
                        style_display: 'display:none',
                        className: 'winTitle_titleEditForm',
                        event: 'titleNameChange:submit',
                        input: input_1 = {
                            type: 'input',
                            style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                            style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                            style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                            style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
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
                style_BwinBack_backgroundColor: `#${wB.BwinBack}`,

                //style_1: 'width:100%',
                tr_plsTap: tr = {
                    type: 'tr',
                    td_winEditBtn: td = {
                        type: 'td',
                        style_width: 'width:20px',
                        style_BrowLine_borderBottom: `${wB.BrowLine}`,
                        style_BcolLine_borderRight: `${wB.BcolLine}`,
                        style_border: 'borderCollapse:collapse',
                        className: 'rowCol',
                        winEditBtn: btn1 = {
                            type: 'button',
                            innerText: 'e',
                            event: 'NextNextNextShowEvent:click',
                            style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
                            style_width: 'width:20px',
                            style_height: 'height:20px',
                            className_BbtnClassName: `${wB.BbtnClassName}`,
                            event_out: 'mouseoverEvent:mouseover',
                            event_in: 'mouseoutEvent:mouseout',
                            style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                            style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                            style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                            style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                            className_BbtnClassName: `${wB.BbtnClassName}`,
                        },
                    },
                    td1: td = newTapBtn('윈도', { event: 'newWindow:click', }),
                    td2: td = newTapBtn('메모', { event: 'newTapEvent:click', value: 's1' }),//newenw
                    td3: td = newTapBtn('계산'),
                    td4: td = newTapBtn('링크'),
                    td5: td = newTapBtn('달력'),
                    td6: td = newTapBtn('타임'),
                    td7: td = newTapBtn('그림'),
                    td8: td = newTapBtn('랜덤'),
                    td9: td = {
                        type: 'td',
                        style_BrowLine_borderBottom: `${wB.BrowLine}`,
                        style_border: 'borderCollapse:collapse',
                        className: 'row',
                    },
                },
            },
            editPage_Table: winEdit = {
                type: 'table', style_display: 'display:none',
                style_BrowLine_borderBottom: `${wB.BrowLine}`,
                className: 'row',
                style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,

                winEdit_Tr: backColor = {
                    type: 'tr',
                    tr1: tr = {
                        type: 'tr',
                        td1: td = {
                            type: 'td',
                            style_BcolLine_borderRight: `${wB.BcolLine}`,
                            className: 'col',
                            beforeBtn: button = {
                                type: 'button',
                                innerText: '<',
                                style_2: 'border:0',
                                style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
                                className_BbtnClassName: `${wB.BbtnClassName}`,
                                event_out: 'mouseoverEvent:mouseover',
                                event_in: 'mouseoutEvent:mouseout',
                                event_2: 'selectBeforAfterBtn:click',
                                style_width: 'width:20px',
                                style_height: 'height:20px',
                                style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
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
                                style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
                                className_BbtnClassName: `${wB.BbtnClassName}`,
                                event_out: 'mouseoverEvent:mouseover',
                                event_in: 'mouseoutEvent:mouseout',
                                style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                            }),
                            nextBtn: button = {
                                type: 'button',
                                innerText: ' > ',
                                style_border: 'border:0',
                                style_width: 'width:30px',
                                style_height: 'height:20px',
                                style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
                                className_BbtnClassName: `${wB.BbtnClassName}`,
                                event: 'mouseoverEvent:mouseover',
                                event_1: 'mouseoutEvent:mouseout',
                                event_2: 'selectBeforAfterBtn:click',
                                style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                            },
                        },
                    },
                    tr2: tr = {
                        type: 'tr',
                        td1: td = {
                            type: 'td',
                            style_BcolLine_borderRight: `${wB.BcolLine}`,
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
                                    event: 'editWin:submit',

                                    pre1: winBackColor = {
                                        type: 'pre', innerText: 'background color : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input1: winBackColor = {
                                        type: 'input',
                                        kind: 'color',
                                        style: 'display:inline-block',
                                        event_1: 'editWin:input',
                                        className: 'wBackColor',
                                        value_BwinBack: `#${wB.BwinBack}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br33: br = { type: 'span', innerText: '\n' },
                                    pre33: fontColor = {
                                        type: 'pre', innerText: 'font color : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input33: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'wFontColor',
                                        event_1: 'editWin:input',
                                        value_BwinFontColor: `#${wB.BwinFontColor}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br_htmlBack: br = { type: 'span', innerText: '\n' },
                                    pre_htmlBack: pre = {
                                        type: 'pre',
                                        innerText: 'html background color : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input_htmlBack: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'htmlBackColor',
                                        event_1: 'editWin:input',
                                        value_BhtmlBack: `#${wB.BhtmlBack}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br_rowLine: br = { type: 'span', innerText: '\n' },
                                    pre_rowLine: rowLineColor = {
                                        type: 'pre', innerText: 'row line color : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input_rowLine: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'wRowLineColor',
                                        event_1: 'editWin:input',
                                        value_BlineRowColor: `#${wB.BlineRowColor}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br_colLineLine: br = { type: 'span', innerText: '\n' },
                                    pre_colLine: rowLineColor = {
                                        type: 'pre', innerText: 'col line color : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input_colLine: input = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'wColLineColor',
                                        event_1: 'editWin:input',
                                        value_BlineColColor: `#${wB.BhtmlBack}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br2: br = { type: 'span', innerText: '\n' },
                                    pre3: titleBack = {
                                        type: 'pre',
                                        innerText: 'title background color : ', style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input3: titleback = {
                                        type: 'input',
                                        kind: 'color',
                                        className: 'wTitleBackColor',
                                        event_1: 'editWin:input',
                                        value_BtitleBack: `#${wB.BtitleBack}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br_title: br = { type: 'span', innerText: '\n' },
                                    pre_title: titleBack = {
                                        type: 'pre',
                                        innerText: 'title font color : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input_title: titleFontColor = {
                                        type: 'input', kind: 'color',
                                        className: 'wTitleFontColor',
                                        event_1: 'editWin:input',
                                        value_BtitleFontColor: `#${wB.BtitleFontColor}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br11: br = { type: 'span', innerText: '\n' },
                                    pre22: btnHoverColor = {
                                        type: 'pre',
                                        innerText: 'button hover color : ', style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input22: HoverBackColor = {
                                        type: 'input', kind: 'color',
                                        event_1: 'editWin:input',
                                        className: 'wBtnHoverBackColor',
                                        value_BbtnHover: `#${wB.BbtnHover}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br1: br = { type: 'span', innerText: '\n' },
                                    pre2: btnHoverFontColor = {
                                        type: 'pre',
                                        innerText: 'button hover font color : ', style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input2: input = {
                                        type: 'input', kind: 'color',
                                        className: 'wBtnHoverFontColor',
                                        event_1: 'editWin:input',
                                        value_BbtnHoverfontColor: `#${wB.BbtnHoverfontColor}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    br4: br = { type: 'span', innerText: '\n' },
                                    pre4: basicColor = {
                                        type: 'pre', innerText: 'basic design : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    basicColor1: select = {
                                        type: 'select',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                        option1: op = { type: 'option', innerText: 'right mode' },
                                        option2: op = { type: 'option', innerText: 'dark mode' },
                                        option3: op = { type: 'option', innerText: 'other window color' },
                                    },
                                    basicColor2: select = {
                                        type: 'select',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                        option1: op = { type: 'option', innerText: 'yellow memo' },
                                        option2: op = { type: 'option', innerText: 'blue memo' },
                                    },
                                    basicColor3: select = {
                                        type: 'select',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                        option1: op = { type: 'option', innerText: 'w0' },
                                        option2: op = { type: 'option', innerText: 'w1' },
                                    },

                                    br3: br = { type: 'span', innerText: '\n' },
                                    sub1: saveBtn = {
                                        type: 'input', kind: 'submit',
                                        value: 'save option',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                },
                                form2: sizeAndLine = {
                                    type: 'form', style: 'display:none',
                                    className: 'wForm2',
                                    event: 'editWin:submit',
                                    pre1: basicWidth = {
                                        type: 'pre',
                                        innerText: 'basic width size : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input1: width = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        event: 'editWin:input',
                                        className: 'wWidthSize',
                                        value_BwinWidth: `${wB.BwinWidth}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    br1: br = { type: 'span', innerText: '\n' },

                                    pre2: basicHeight = {
                                        type: 'pre',
                                        innerText: 'basic height size : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input2: height = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        event: 'editWin:input',
                                        className: 'wHeightSize',
                                        value_BwinHeight: `${wB.BwinHeight}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    br2: br = { type: 'span', innerText: '\n' },

                                    pre3: basicRow = {
                                        type: 'pre', innerText: 'basic row line Thickness : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input4: rowLine = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        event: 'editWin:input',
                                        className: 'wRowLineThik', step: '0.1',
                                        value_BlineRowWeight: `${wB.BlineRowWeight}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    br3: br = { type: 'span', innerText: '\n' },

                                    pre4: basicCol = {
                                        type: 'pre', innerText: 'basic col line Thickness : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input6: colLine = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        event: 'editWin:input',
                                        className: 'wColLineThik', step: '0.1',
                                        value_BlineColWeight: `${wB.BlineColWeight}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    br4: br = { type: 'span', innerText: '\n' },

                                    sub1: sub = {
                                        type: 'input', kind: 'submit',
                                        value: 'save option',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                },
                                //3333
                                form3: textSize = {
                                    type: 'form', style: 'display:none',
                                    className: 'wForm3',
                                    event: 'editWin:submit',
                                    pre1: basicSizeWeight = {
                                        type: 'pre',
                                        innerText: 'basic text size & weight : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input1: size = {
                                        type: 'input',
                                        kind: 'number',
                                        style_width: 'width:40px',
                                        className: 'wTextSize',
                                        event: 'editWin:input',
                                        value_BwinFontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input11: weight = returnSelectOb(fontWeight, {
                                        className: 'wTextWeight',
                                        event: 'editWin:input',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    }),
                                    br1: br = { type: 'span', innerText: '\n' },

                                    pre2: basicFontStyle = {
                                        type: 'pre',
                                        innerText: 'basic font family & style : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                    select2: family = returnSelectOb(fontFamily, {
                                        className: 'wFontType',
                                        event: 'editWin:input',
                                        selectedIndex_BwinFontFamily: '',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    }),
                                    select22: style = returnSelectOb(fontStyle, {
                                        className: 'wFontKind',
                                        event: 'editWin:input',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    }),
                                    br2: br = { type: 'span', innerText: '\n' },

                                    pre3: titleFontSizeWeight = {
                                        type: 'pre',
                                        innerText: 'title text size & weight : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input3: titleFontSize = {
                                        type: 'input', kind: 'number',
                                        style_width: 'width:40px',
                                        className: 'tFontSize',
                                        event: 'editWin:input',
                                        value_BtitleFontSize: `${wB.BtitleFontSize}`,
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    input33: weight = returnSelectOb(fontWeight, {
                                        className: 'tFontWeight',
                                        event: 'editWin:input',
                                    }),
                                    br3: br = { type: 'span', innerText: '\n' },

                                    pre4: titleFontKind = {
                                        type: 'pre',
                                        innerText: 'title font type & kind : ',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    select4: family = returnSelectOb(fontFamily, {
                                        className: 'tFontFamily',
                                        event: 'editWin:change',
                                    }),
                                    select44: style = returnSelectOb(fontStyle, {
                                        className: 'tFontStyle',
                                        event: 'editWin:change',
                                    }),
                                    br4: br = { type: 'span', innerText: '\n' },

                                    sub1: sub = {
                                        type: 'input',
                                        kind: 'submit',
                                        value: 'save option',
                                        className: 'wForm3_submit',
                                        event: 'editWin:submit',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },

                                },
                                form4: delWin = {
                                    type: 'form', style: 'display:none',
                                    className: 'wForm4',
                                    pre1: tapText = {
                                        type: 'pre', innerText: 'del this window',
                                        style: 'display:inline-block',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                    br4: br = { type: 'span', innerText: '\n' },
                                    sub1: sub = {
                                        type: 'input', kind: 'submit',
                                        value: 'del this window',
                                        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
                                        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
                                        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
                                        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
                                    },
                                }
                            },
                        },
                    }
                }
            }
        }
    },
    div : tapPlace = {
        type: 'div',
        table : tapBtnTable = {
            type: 'table',
            tr : tapBtnTr = {
                type: 'tr',
                className :'tapBtnTr',
            }
        },
        div : tapDiv = {
            type: 'div',
            className:'tapDiv',
        }
    }
}

//pluss function =======================
function newWindow(event) {
    let newWin = Mwindow.save('plusNew');

    let set = copyReturn();

    for (key in set) {
        if (set[key] != null && newWin[key] != null) {
            set[key] = newWin[key];
        }
    }
    set = checkValue(set);
    let aaaa = makeHtml(w, set);

    main.appendChild(aaaa);
}

function newTapEvent(event) {
    let winName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className
    let set = {};
    let n = winName.charAt(1);
    set.target = Number(n);
    set.tapType = event.target.value;
    set.name = event.target.innerText;
    Mwindow.save('newTap', set);
}

function editWin(event) {
    const inputValue = event.target.value;
    const inputOption = event.target.className;
    const winName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className;

    event.preventDefault();
    let form = document.querySelector(`.${winName} .${inputOption}`);
    let Bw = {};
    const wName = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className;
    let regex = /[^0-9]/g;
    let winN = wName.replace(regex, "");

    function style(obArray, key, value,) {
        for (i = 0; i < obArray.length; i++) {
            obArray[i].style[`${key}`] = value;
        }
    }
    function className(obArray, value) {
        for (i = 0; i < obArray.length; i++) {
            obArray[i].className = value;
        }
    }
    function colorValue(value) {
        let regex = /#/g;
        let change = value.replace(regex, "");
        console.log(change);
        return change;
    }


    if (inputOption == 'wBackColor') {
        let table = document.querySelectorAll(`.${winName} table`);
        style(table, 'backgroundColor', inputValue);

        let btn = document.querySelectorAll(`.${winName} button`);
        const btnColor = btn[0].className.split(':');
        let line = `${winName}_btn:${btnColor[1]}:${inputValue}:${btnColor[3]}:${btnColor[4]}`;
        let select = document.querySelectorAll(`.${winName} select`);

        const titleColorInput = document.querySelector(`.${winName} .wTitleBackColor`);
        titleColorInput.value = inputValue;

        style(btn, 'backgroundColor', inputValue);
        className(btn, line);

        style(select, 'backgroundColor', inputValue);
        className(select, line);

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
        const btnColor = btn[1].className.split(':');
        let line = `${winName}_btn:${btnColor[1]}:${btnColor[2]}:${btnColor[3]}:${inputValue}`;
        style(pre, 'color', inputValue);

        style(btn, 'color', inputValue);
        className(btn, line);

        style(select, 'color', inputValue);
        className(select, line);

    } else if (inputOption == 'htmlBackColor') {
        //htmlBackColor
        const html = document.querySelector(`body`);
        html.style.backgroundColor = inputValue;

    } else if (inputOption == 'wRowLineColor') {
        let row = document.querySelectorAll(`.${winName} .row`);
        let rowCol = document.querySelectorAll(`.${winName} .rowCol`);
        let line = `${1.5}px solid ${inputValue}`;
        style(row, 'borderBottom', line);
        style(rowCol, 'borderBottom', line);

        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_row = document.querySelector(`.${winName} .title_row`);
        title_row.style.borderBottom = line;
        title_rowCol.style.borderBottom = line;

    } else if (inputOption == 'wColLineColor') {
        let col = document.querySelectorAll(`.${winName} .col`);
        let rowCol = document.querySelectorAll(`.${winName} .rowCol`);
        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let line = `${1.5}px solid ${inputValue}`;
        title_rowCol.style.borderRight = line;
        style(col, 'borderRight', line);
        style(rowCol, 'borderRight', line);

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
        const btnColor = text2[3].className.split(':');
        let line = `${winName}_btn:${inputValue}:${btnColor[2]}:${btnColor[3]}:${btnColor[4]}`;

        for (i = 0; i < text2.length; i++) {
            text2[i].className = line;
        }
        for (i = 0; i < text3.length; i++) {
            text3[i].className = line;
        }
        //`${winName}_btn:${hover}:${back}:{hoverFont}:{basicFont}`
    } else if (inputOption == 'wBtnHoverFontColor') {
        let text2 = document.querySelectorAll(`.${winName} button`);
        let text3 = document.querySelectorAll(`.${winName} select`);
        const btnColor = text2[3].className.split(':');
        let line = `${winName}_btn:${btnColor[1]}:${btnColor[2]}:${inputValue}:${btnColor[4]}`;

        className(text2, line);
        className(text3, line);

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
        let line = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;

        style(row, 'borderBottom', line);
        style(rowCol, 'borderBottom', line);

        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        let title_row = document.querySelector(`.${winName} .title_row`);
        title_row.style.borderBottom = line;
        title_rowCol.style.borderBottom = line;

    } else if (inputOption == 'wColLineThik') {
        let col = document.querySelectorAll(`.${winName} .col`);
        let rowCol = document.querySelectorAll(`.${winName} .rowCol`);
        let before = col[0].style.borderRight;
        let beforeSet = before.split(' ');
        let line = `${inputValue}px solid ${beforeSet[2]} ${beforeSet[3]} ${beforeSet[4]}`;

        let title_rowCol = document.querySelector(`.${winName} .title_rowCol`);
        title_rowCol.style.borderRight = line;

        style(col, 'borderRight', line);
        style(rowCol, 'borderRight', line);

    } else if (inputOption == 'wTextSize') {
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);
        let input = document.querySelectorAll(`.${winName} input`);

        let value;
        if (inputValue.length >= 0 && inputValue >= 5) {
            value = inputValue;
        } else {
            value = 10
        }
        style(pre, 'fontSize', `${value}px`);
        style(btn, 'fontSize', `${value}px`);
        style(select, 'fontSize', `${value}px`);
        style(input, 'fontSize', `${value}px`);

    } else if (inputOption == 'wTextWeight') {
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);
        let input = document.querySelectorAll(`.${winName} input`);
        let tt = [pre, btn, select, input];

        for (j = 0; j < tt.length; j++) {
            style(tt[j], 'fontWeight', inputValue);
        }

    } else if (inputOption == 'wFontType') {
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);
        let input = document.querySelectorAll(`.${winName} input`);

        let target = [pre, btn, select, input];
        for (j = 0; j < target.length; j++) {
            style(target[j], 'fontFamily', inputValue);
        }

    } else if (inputOption == 'wFontKind') {
        let pre = document.querySelectorAll(`.${winName} pre`);
        let btn = document.querySelectorAll(`.${winName} button`);
        let select = document.querySelectorAll(`.${winName} select`);
        let input = document.querySelectorAll(`.${winName} input`);

        let target = [pre, btn, select, input];
        for (j = 0; j < target.length; j++) {
            style(target[j], 'fontStyle', inputValue);
        }

    } else if (inputOption == 'tFontSize') {
        let btn = document.querySelectorAll(`.${winName} button`);
        let value;
        if (inputValue.length >= 0 && inputValue >= 5) {
            value = inputValue;
        } else {
            value = 10
        }
        btn[0].style.fontSize = `${value}px`;
        btn[1].style.fontSize = `${value}px`;
    } else if (inputOption == 'tFontWeight') {
        let btn = document.querySelectorAll(`.${winName} button`);
        btn[0].style.fontFamily = inputValue;
        btn[1].style.fontFamily = inputValue;
    } else if (inputOption == 'tFontFamily') {
        let btn = document.querySelectorAll(`.${winName} button`);
        btn[0].style.fontFamily = inputValue;
        btn[1].style.fontFamily = inputValue;
    } else if (inputOption == 'tFontStyle') {
        let btn = document.querySelectorAll(`.${winName} button`);
        btn[0].style.fontStyle = inputValue;
        btn[1].style.fontStyle = inputValue;

    } else if (inputOption == 'wForm1') {
        Bw.target = Number(winN);
        Bw.BwinBack = colorValue(form.elements[0].value);
        Bw.BwinFontColor = colorValue(form.elements[1].value);
        //Bw.BhtmlBack        = colorValue(form.elements[2].value);
        Bw.BlineRowColor = colorValue(form.elements[3].value);
        Bw.BlineColColor = colorValue(form.elements[4].value);
        Bw.BtitleBack = colorValue(form.elements[5].value);
        Bw.BtitleFontColor = colorValue(form.elements[6].value);
        Bw.BbtnHover = colorValue(form.elements[7].value);
        Bw.BbtnHoverfontColor = colorValue(form.elements[8].value);
        Mwindow.save('editSave', Bw);
    } else if (inputOption == 'wForm2') {
        Bw.target = Number(winN);
        Bw.BwinWidth = form.elements[0].value;
        Bw.BwinHeight = form.elements[1].value;
        Bw.BlineRowWeight = form.elements[2].value;
        Bw.BlineColWeight = form.elements[3].value;
        Mwindow.save('editSave', Bw);
    } else if (inputOption == 'wForm3') {
        Bw.target = Number(winN);
        Bw.BwinFontSize = form.elements[0].value;
        Bw.BwinFontWeight = form.elements[1].selectedIndex;
        Bw.BwinFontFamily = form.elements[2].selectedIndex;
        Bw.BwinFontStyle = form.elements[3].selectedIndex;

        Bw.BtitleFontSize = form.elements[4].value;
        Bw.BtitleFontWeight = form.elements[5].selectedIndex;
        Bw.BtitleFontFamily = form.elements[6].selectedIndex;
        Bw.BtitleFontStyle = form.elements[7].selectedIndex;

        Mwindow.save('editSave', Bw);
    }
    //wRowLineColor
    //wColLineColor

    //wTitleBackColor
    //wTitleFontColor

    //wBtnHoverBackColor
    //wBtnHoverFontColor
}

function titleNameChange(event) {
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
    } else if (option1 == 'NextShowEvent2') {
        ob.addEventListener(`${clickOption}`, NextShowEvent2);
    } else if (option1 == 'NextNextNextShowEvent') {
        ob.addEventListener(`${clickOption}`, NextNextNextShowEvent);
    } else if (option1 == 'newWindow') {
        ob.addEventListener(`${clickOption}`, newWindow);
    } else if (option1 == 'mouseoverEvent') {
        ob.addEventListener(`${clickOption}`, mouseoverEvent);
    } else if (option1 == 'mouseoutEvent') {
        ob.addEventListener(`${clickOption}`, mouseoutEvent);
    } else if (option1 == 'selectAndNextObShow') {
        ob.addEventListener(`${clickOption}`, selectAndNextObShow);
    } else if (option1 == 'selectBeforAfterBtn') {
        ob.addEventListener(`${clickOption}`, selectBeforAfterBtn);
    } else if (option1 == 'editWin') {
        ob.addEventListener(`${clickOption}`, editWin);
    } else if (option1 == 'titleNameChange') {
        ob.addEventListener(`${clickOption}`, titleNameChange);
    } else if (option1 == 'newTapEvent') {
        ob.addEventListener(`${clickOption}`, newTapEvent);
    }
    return ob;
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
function makeValue(ob, key) {
    ob.value = key;
    return ob;
}
function makeInnerText(ob, text) {
    ob.innerText = text;
    return ob;
}
function makeFunction(ob, option, value) {
    ob[`${option}`] = value;
    return ob;
}
function makeStyle(ob, option, value) {
    ob.style[option] = value;
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
        //makeFunction(ob, option, value)
        if (target == 'object') {
            if (key == 'basic') {
                continue
            }
            child = makeHtml(ob[key], set);
            newOb = makeAppend(newOb, child);
        } else if (target == 'string' && keyy == 'type') {
            newOb = makeOb(ob[key]);
        } else if (target == 'string' && keyy == 'kind') {
            newOb = makeFunction(newOb, 'type', ob[key]);
        } else if (target == 'string' && keyy == 'value') {
            if (sett != null && sett.charAt(0) == 'B') {
                if (newOb.type == 'number') {
                    let val = set[sett];
                    let regex = /[^0-9.]/g; let va;
                    if (val != null) {
                        va = val.replace(regex, "");
                    } else {
                        va = set[sett];
                    }
                    newOb = makeFunction(newOb, keyy, va);
                } else {
                    newOb = makeFunction(newOb, keyy, set[sett]);
                }
            } else {
                newOb = makeFunction(newOb, keyy, ob[key]);
            }
        } else if (target == 'string' && keyy == 'event') {
            newOb = makeEvent(newOb, ob[key]);
        } else if (target == 'string' && keyy == 'style') {

            if (sett != null && sett.charAt(0) == 'B') {
                let setOp = keySorce.split('_')[2];
                newOb = makeStyle(newOb, setOp, set[sett]);
            } else {
                let op = ob[key].split(':')[0];
                let va = ob[key].split(':')[1];
                newOb = makeStyle(newOb, op, va);
            }

        } else {
            if (sett != null && sett.charAt(0) == 'B') {
                newOb = makeFunction(newOb, keyy, set[sett]);
            } else {
                newOb = makeFunction(newOb, keyy, ob[key]);
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

        for (key in set) {
            if (set[key] != null && array2[i][key] != null) {
                set[key] = array2[i][key];
            }
        }
        set = checkValue(set);
        let aaaa = makeHtml(w, set);
        main.appendChild(aaaa);

        
        let q = document.querySelector(`.${set.BclassName} .tapBtnTr`);
        let tapTable = tapBtnMake(set);
        let tapReal = makeHtml(tapTable, set);
        q.appendChild(tapReal);

        let tapEdit = {
            type:'table',
            tr:tr ={
                type:'tr',
                td : td= {
                    type:'td',
                    input:inputName={
                        type:'input',
                    }
                }
            }
        }
        let tapReal2 = makeHtml(tapEdit);
        q.appendChild(tapReal2);

    }
}
function tapBtnMake(set){
    let table = {
        type:'table',
        tr : tr = {
            type:'tr',
            td : tapEdit ={
                type:'td',
                button1:beforeBtn = {
                    type:'button',
                    innerText:'d'
                },
            },
        },
        tr2 : tapNameEdit = {
            type:'tr',
        }
    }
    for(j=0;j<set.BtapArray.length;j++){
        if(set.BtapArray[j]!=null){
            let td = {
                type:'td',
                button1:beforeBtn = {
                    type:'button',
                    innerText:'<'
                },
                radio : tapRadio = {
                    type:'input',
                    kind:'radio',
                    id:set.BtapArray[j][0],
                    name:`${set.BclassName}_tapBtn`,
                    value:`${set.BtapArray[j][0]}`,
                    style:'display:none',
                },
                label : tapLabel = {
                    type:'label',
                    htmlFor:set.BtapArray[j][0],
                    innerText:set.BtapArray[j][1]
                },
                button2:nextBtn = {
                    type:'button',
                    innerText:'>'
                },
                button3:delBtn = {
                    type:'button',
                    innerText:'x',
                    style:'display:none'
                },
            }
            table.tr[`td${j}`] = td;
        }
    }
    return table;
}


//tap-memo
let TmemoOb = {
    Btitle: 'w0',
    BclassName: 'w0',
    Bshow: true,

    //color
    BwinBack: 'FEF896',
    BwinFontColor: '000000',
    BhtmlBack: 'FFFFFF',

    BlineRowColor: 'B8D993',
    BlineColColor: 'ff8c82',

    BtitleBack: 'FEF896',
    BtitleFontColor: '000000',

    BbtnHover: '999999',
    BbtnHoverfontColor: '000000',

    //size & line
    BwinWidth: '456',
    BwinHeight: null,

    BlineRowWeight: '1.5',
    BlineColWeight: '1.5',

    //tap & title font
    BwinFontSize: '13',
    BwinFontWeight: 0,
    BwinFontFamily: 1,
    BwinFontStyle: 0,

    BtitleFontSize: '13',
    BtitleFontWeight: 0,
    BtitleFontFamily: 1,
    BtitleFontStyle: 0,
}

let Tmemo = {
    save: function (option, set) {
        if (option == 'pluss') {
            //let getSave = localStorage.getItem('winArray');
            //localStorage.setItem('winArray', JSON.stringify(newWinArray));
            //getSave = JSON.parse(getSave);

        } else if (option == '') {

        } else if (option == 'plusNew') {
            let copy1 = copyReturn();
            let newWin = this.save('new');
            let num;
            for (i = 0; i < this.length; i++) {
                if (newWin[i] == null) {
                    copy1.Btitle = `w${i}`;
                    copy1.BclassName = `w${i}`;
                    num = i;
                    break
                }
            }
            newWin[num] = copy1;
            for (k = 0; k < this.length; k++) {
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
                    console.log(key, setOb[key], set[key]);
                    setOb[key] = set[key];
                }
            }
            win[nn] = setOb;
            newWin = [];
            for (i = 0; i < this.length; i++) {
                win[i] = wBmatchWinArray('makeSetToArray', win[i]);
            }
            localStorage.setItem('winArray', JSON.stringify(win));
        }
    },
}