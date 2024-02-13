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
            let tapArray = win[nn].BtapArray;
            let lastN = null;
            for (i = 0; i < tapArray.length; i++) {
                if (tapArray[i] != null) {
                    if (lastN <= tapArray[i][2]) {
                        lastN = tapArray[i][2];
                    }
                }
                if (tapArray[i] != null) {
                    tapArray[i][3] = 0;
                }
            }
            if (lastN == null) {
                lastN = 0;
            } else {
                lastN += 1;
            }
            let tap = {};
            for (i = 0; i < tapArray.length; i++) {
                if (tapArray[i] == null) {
                    tapArray[i] = [
                        `w${set.target}_${i}_${set.tapType}`,
                        `${set.name}`,
                        lastN,//fakeIndex,
                        1,    //checked,
                        i,    //incex,
                        //[backGround-color, text color]
                    ];
                    tap.tapArray = tapArray[i];
                    break;
                }
            }
            for (i = 0; i < this.length; i++) {
                win[i] = wBmatchWinArray('makeSetToArray', win[i]);
            }
            localStorage.setItem('winArray', JSON.stringify(win));
            tap.set = wBmatchWinArray('makeArrayToSet', win[nn]);
            return tap;

        } else if (option == 'editTap') {
            let win = this.save('new');
            let setOb = win[set.target];

            if (set.option == 'tapChecked') {
                for (i = 0; i < setOb.BtapArray.length; i++) {
                    if (setOb.BtapArray[i] != null && setOb.BtapArray[i][0] == set.tapName) {
                        setOb.BtapArray[i][3] = 1;
                    } else if (setOb.BtapArray[i] != null && setOb.BtapArray[i][0] != set.tapName) {
                        setOb.BtapArray[i][3] = 0;
                    }
                }
            } else if (set.option == 'tapChange') {
                let tapIndex; let realIndex; let newTapIndex; let basicArray=new Array(setOb.BtapArray.length);
                let array2 = tapArraySort(setOb.BtapArray, 'fakeInex');
                for (i = 0; i < array2.length; i++) {
                    if (array2[i] != null && array2[i][0] == set.tapName) {
                        tapIndex = array2[i][2];
                    }
                }
                if (set.beforeOrNext == '<') {
                    newTapIndex = tapIndex - 1;
                    if (newTapIndex < 0) { newTapIndex = array2.length-1 };
                } else if (set.beforeOrNext == '>') {
                    newTapIndex = tapIndex + 1;
                    if (newTapIndex > array2.length-1) { newTapIndex = 0 };
                }
                array2[tapIndex][2] = newTapIndex;
                array2[newTapIndex][2] = tapIndex;
                let sortArray = array2.sort((a, b) => a[2] - b[2]);
                for (i = 0; i < sortArray.length; i++) {
                    sortArray[i][2] = i;
                    basicArray[sortArray[i][4]] = sortArray[i];
                }
                setOb.BtapArray = basicArray;
            }if (set.option == 'tapNameEdit') {//ddd
                for (i = 0; i < setOb.BtapArray.length; i++) {
                    if (setOb.BtapArray[i] != null && setOb.BtapArray[i][0] == set.tapName) {
                        setOb.BtapArray[i][1] = set.newTapName;
                    }
                }
            }
            win[set.target] = setOb;
            for (i = 0; i < this.length; i++) {
                win[i] = wBmatchWinArray('makeSetToArray', win[i]);
            }
            localStorage.setItem('winArray', JSON.stringify(win));
            return setOb;

        }
    },

    tapToArrayOrOb: function (option, array) {
        if (array == null) {
            return null;
        }
        if (option == 'makeToOb') {
            let ob = {
                tapClassName: array[0],
                tapName: array[1],
                tapIndex: array[2],
                tapChecked: array[3],
            }
            return ob;
        } else if (option == 'makeToArray') {
            let ob = [
                array.tapClassName,
                array.tapName,
                array.tapIndex,
                array.tapChecked,
            ]
            return ob;
        }
    }
}

function re(value) {
    return value;
}
//window table ==========================================================
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

function returnSelectOb(array, option) {
    let select = {
        type: 'select',
        event_out: 'mouseoverEvent:mouseover',
        event_in: 'mouseoutEvent:mouseout',
        className_BbtnClassName: `${wB.BbtnClassName}`,
        style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,

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
function titleBtn(option) {
    let tbtn = {
        type: 'button',
        style_BtitleBack_backgroundColor: `background-color:#${wB.BwinBack}`,
        className_BtitleBtnClassName: `winTitle_plsBtn:#${wB.BbtnHover}:#${wB.BwinBack}`,
        event_out: 'mouseoverEvent:mouseover',
        event_in: 'mouseoutEvent:mouseout',
        style_BwinFontColor_color: '',
        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
        className_BbtnClassName: ``,
    }
    if (option != null) {
        for (const key in option) {
            tbtn[key] = option[key];
        }
    }
    return tbtn;
}
function input(option) {
    let input = {
        type: 'input',
        style_border: 'border:none',
        placeholder: 'text input',
        style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
        style_BwinFontColor_color: '',
        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
        className_BbtnClassName: ``,
    }
    if (option != null) {
        for (const key in option) {
            input[key] = option[key];
        }
    }
    return input;
}
function pre(option) {
    let pre = {
        type: 'pre',
        innerText: 'background color : ',
        style: 'display:inline-block',
        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
    }
    if (option != null) {
        for (const key in option) {
            pre[key] = option[key];
        }
    }
    return pre;
}
function button(option) {
    let button = {
        type: 'button',
        className_BbtnClassName: ``,
        event_out: 'mouseoverEvent:mouseover',
        event_in: 'mouseoutEvent:mouseout',
        style_height: 'height:20px',
        style_width: 'width:20px',
        style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
    }
    if (option != null) {
        for (const key in option) {
            button[key] = option[key];
        }
    }
    return button;
}
function radio(option) {
    let radio = {
        type: 'button',
        className_BbtnClassName: ``,
        event_out: 'mouseoverEvent:mouseover',
        event_in: 'mouseoutEvent:mouseout',
        style_BwinBack_backgroundColor: `background-color:#${wB.BwinBack}`,
        style_BwinFontSize_fontSize: `${wB.BwinFontSize}`,
        style_BwinFontWeight_fontWeight: `${wB.BwinFontWeight}`,
        style_BwinFontFamily_fontFamily: `${wB.BwinFontFamily}`,
        style_BwinFontStyle_fontStyle: `${wB.BwinFontStyle}`,
    }
    if (option != null) {
        for (const key in option) {
            radio[key] = option[key];
        }
    }
    return radio;
}

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
                    type: 'td',
                    style_BrowLine_borderBottom: `${wB.BrowLine}`,
                    style_BcolLine_borderRight: `${wB.BcolLine}`,
                    style_border: 'borderCollapse:collapse',
                    className: 'title_rowCol',
                    plussBtn: btn1 = titleBtn({
                        innerText: ' + ',
                        style_width: 'width:20px',
                        style_height: 'height:20px',
                        event: 'NextNextNextShowEvent:click',
                    }),
                },
                td_titleBtn: td = {
                    type: 'td', style_width: 'width:100%',
                    style_BrowLine_borderBottom: `borderBottom:${wB.BlineRowWeight}px solid #${wB.BlineRowColor}`,
                    style_border: 'borderCollapse:collapse',
                    style_BtitleBack_backgroundColor: `background-color:#${wB.BtitleBack}`,
                    className: 'title_row',
                    titleBtn: btn1 = titleBtn({
                        event_2: 'NextShowEvent2:dblclick',
                        innerText_Btitle: `${wB.Btitle}`,
                        style_width: 'width:100%',
                        style_height: 'heigth:20px',
                        style_textAlign: 'textAlign:left',
                    }),
                    titleEditForm: form1 = {
                        type: 'form',
                        style_display: 'display:none',
                        className: 'winTitle_titleEditForm',
                        event: 'titleNameChange:submit',
                        input: input({
                            value_Btitle: `${wB.Btitle}`,
                        })
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
                        winEditBtn: button({
                            innerText: 'e',
                            event: 'NextNextNextShowEvent:click',
                        }),
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
                            beforeBtn: button({
                                innerText: '<',
                                style_2: 'border:0',
                                event: 'selectBeforAfterBtn:click',
                            }),
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
                            }),
                            nextBtn: button({
                                innerText: ' > ',
                                event_2: 'selectBeforAfterBtn:click',
                            }),

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

                                    pre1: pre({ innerText: 'background color : ' }),
                                    input1: input({
                                        value_BwinBack: `#${wB.BwinBack}`,
                                        className: 'wBackColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),

                                    br33: br = { type: 'span', innerText: '\n' },
                                    pre33: pre({ innerText: 'font color : ' }),
                                    input33: input({
                                        value_BwinFontColor: `#${wB.BwinFontColor}`,
                                        className: 'wFontColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),

                                    br_htmlBack: br = { type: 'span', innerText: '\n' },
                                    pre_htmlBack: pre({ innerText: 'html background color : ', }),
                                    input_htmlBack: input({
                                        value_BhtmlBack: `#${wB.BhtmlBack}`,
                                        className: 'htmlBackColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),

                                    br_rowLine: br = { type: 'span', innerText: '\n' },
                                    pre_rowLine: pre({ innerText: 'row line color : ', }),
                                    input_rowLine: input({
                                        value_BlineRowColor: `#${wB.BhtmlBack}`,
                                        className: 'wRowLineColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),

                                    br_colLineLine: br = { type: 'span', innerText: '\n' },
                                    pre_colLine: pre({ innerText: 'col line color : ', }),
                                    input_colLine: input({
                                        value_BlineColColor: `#${wB.BhtmlBack}`,
                                        className: 'wColLineColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),

                                    br_titleBack: br = { type: 'span', innerText: '\n' },
                                    pre_titleBack: pre({ innerText: 'title background color : ', }),
                                    input_titleback: input({
                                        value_BtitleBack: `#${wB.BhtmlBack}`,
                                        className: 'wTitleBackColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),


                                    br_titleFontColor: br = { type: 'span', innerText: '\n' },
                                    pre_titleFontColor: pre({ innerText: 'title font color : ', }),
                                    input_titleFontColor: input({
                                        value_BtitleFontColor: `#${wB.BhtmlBack}`,
                                        className: 'wTitleFontColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),


                                    br_btnHoberColor: br = { type: 'span', innerText: '\n' },
                                    pre_btnHoberColor: pre({ innerText: 'button hover color : ', }),
                                    input_btnHoberColor: input({
                                        value_BbtnHover: `#${wB.BhtmlBack}`,
                                        className: 'wBtnHoverBackColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),

                                    br_btnHoverFontColor: br = { type: 'span', innerText: '\n' },
                                    pre_btnHoverFontColor: pre({ innerText: 'button hover font color : ', }),
                                    input_btnHoverFontColor: input({
                                        value_BbtnHoverfontColor: `#${wB.BhtmlBack}`,
                                        className: 'wBtnHoverFontColor', kind: 'color',
                                        event_1: 'editWin:input',
                                    }),

                                    br_basicColor: br = { type: 'span', innerText: '\n' },
                                    pre_basicColor: pre({ innerText: 'basic design : ', }),
                                    select_basicColor: returnSelectOb([
                                        'right mode', 'dark mode', 'other window color'
                                    ]),
                                    select_basicColor2: returnSelectOb([
                                        'yellow memo', 'blue memo'
                                    ]),
                                    select_basicColor2: returnSelectOb([
                                        'w0', 'w1'
                                    ]),

                                    br3: br = { type: 'span', innerText: '\n' },
                                    sub1: input({
                                        kind: 'submit', value: 'save option',
                                    }),

                                },
                                form2: sizeAndLine = {
                                    type: 'form', style: 'display:none',
                                    className: 'wForm2',
                                    event: 'editWin:submit',

                                    pre_basicWidth: pre({ innerText: 'basic width size : ', }),
                                    input_basicWidth: input({
                                        value_BwinWidth: `#${wB.BhtmlBack}`,
                                        className: 'wWidthSize', kind: 'number',
                                        event_1: 'editWin:input',
                                    }),
                                    br_basicWidth: br = { type: 'span', innerText: '\n' },

                                    pre_basicHeight: pre({ innerText: 'basic height size : ', }),
                                    input_basicHeight: input({
                                        value_BwinHeight: `#${wB.BhtmlBack}`,
                                        className: 'wHeightSize', kind: 'number',
                                        event_1: 'editWin:input',
                                    }),
                                    br_basicHeight: br = { type: 'span', innerText: '\n' },

                                    pre_rowLine: pre({ innerText: 'basic row line Thickness : ', }),
                                    input_rowLine: input({
                                        value_BlineRowWeight: `#${wB.BhtmlBack}`,
                                        className: 'wRowLineThik', kind: 'number', step: '0.1',
                                        event_1: 'editWin:input',
                                    }),
                                    br_rowLine: br = { type: 'span', innerText: '\n' },

                                    pre_colLine: pre({ innerText: 'basic col line Thickness : ', }),
                                    input_colLine: input({
                                        value_BlineColWeight: `#${wB.BhtmlBack}`,
                                        className: 'wColLineThik', kind: 'number', step: '0.1',
                                        event_1: 'editWin:input',
                                    }),
                                    br_colLine: br = { type: 'span', innerText: '\n' },

                                    sub1: input({
                                        kind: 'submit', value: 'save option',
                                    }),
                                },
                                //3333
                                form3: textSize = {
                                    type: 'form', style: 'display:none',
                                    className: 'wForm3',
                                    event: 'editWin:submit',

                                    pre_basicSizeWeight: pre({ innerText: 'basic text size & weight : ', }),
                                    input_BwinFontSize: input({
                                        value_BwinFontSize: `#${wB.BhtmlBack}`,
                                        className: 'wTextSize', kind: 'number',
                                        event_1: 'editWin:input',
                                    }),
                                    input_wTextWeight: input({
                                        value_BwinFontWeight: `#${wB.BhtmlBack}`,
                                        className: 'wTextWeight', kind: 'number',
                                        event_1: 'editWin:input',
                                    }),
                                    br_basicSizeWeight: br = { type: 'span', innerText: '\n' },

                                    pre_basicFontStyle: pre({ innerText: 'basic font family & style : ', }),
                                    select_family: returnSelectOb(fontFamily, {
                                        className: 'wFontType',
                                        event: 'editWin:input',
                                        selectedIndex_BwinFontFamily: '',
                                    }),
                                    select_style: returnSelectOb(fontStyle, {
                                        className: 'wFontKind',
                                        event: 'editWin:input',
                                        selectedIndex_BwinFontFamily: '',
                                    }),
                                    br_basicFontStyle: br = { type: 'span', innerText: '\n' },

                                    pre_titleFontSize: pre({ innerText: 'title text size & weight : ', }),
                                    input_titleFontSize: input({
                                        value_BtitleFontSize: `#${wB.BhtmlBack}`,
                                        className: 'tFontSize', kind: 'number',
                                        event_1: 'editWin:input',
                                    }),
                                    input_weight: returnSelectOb(fontWeight, {
                                        className: 'tFontWeight',
                                        event: 'editWin:input',
                                    }),
                                    br_titleFontSize: br = { type: 'span', innerText: '\n' },

                                    pre_titleFontKind: pre({ innerText: 'title font type & kind : ', }),
                                    select4: family = returnSelectOb(fontFamily, {
                                        className: 'tFontFamily',
                                        event: 'editWin:change',
                                    }),
                                    select44: style = returnSelectOb(fontStyle, {
                                        className: 'tFontStyle',
                                        event: 'editWin:change',
                                    }),
                                    br_titleFontKind: br = { type: 'span', innerText: '\n' },

                                    sub1: input({
                                        kind: 'submit', value: 'save option', className: 'wForm3_submit',
                                    }),
                                },

                                form4: delWin = {
                                    type: 'form', style: 'display:none',
                                    className: 'wForm4',

                                    pre_delWin: pre({ innerText: 'del this window', }),
                                    br_delWin: br = { type: 'span', innerText: '\n' },
                                    sub1: input({
                                        kind: 'submit', value: 'del this window', className: 'wForm3_submit',
                                    }),
                                }
                            },
                        },
                    }
                }
            }
        }
    },
    div: tapPlace = {
        type: 'div', className: 'tapBtnTr',
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
    //let n = winName.charAt(1);
    let regex = /[^0-9]/g;
    let n = winName.replace(regex, "");
    set.target = Number(n);
    set.tapType = event.target.value;
    set.name = event.target.innerText;
    let tap = Mwindow.save('newTap', set);
    tap.set = checkValue(tap.set);

    let tapBtnDiv = document.querySelector(`.${winName} .tapBtnTr`);

    let len = tapBtnDiv.childNodes[0].childNodes[0].childNodes.length;
    for (i = 1; i < len; i++) {
        tapBtnDiv.childNodes[0].childNodes[0].childNodes[1].remove();
    }
    for (i = 0; i < tap.set.BtapArray.length; i++) {
        if (tap.set.BtapArray[i] != null) {
            let td;
            let tdHtml;
            if (tap.tapArray[2] == i) {
                td = tapBtnTd(tap.set.BtapArray[i], 'checked');
            } else {
                td = tapBtnTd(tap.set.BtapArray[i], 'not checked');
            }
            tdHtml = makeHtml(td, tap.set);
            tapBtnDiv.childNodes[0].childNodes[0].appendChild(tdHtml);
        }
    }

    let tdLast = {
        type: 'td',
        style_BrowLine_borderBottom: `${wB.BrowLine}`,
    }
    tdLast = makeHtml(tdLast, tap.set);
    tapBtnDiv.childNodes[0].childNodes[0].appendChild(tdLast);

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

function tapNameInputShow(event) {
    if (event.target.innerText == 'x') {
        let nameTr = event.target.parentNode.parentNode.parentNode.previousSibling.childNodes[0];

        for (i = 1; i < nameTr.childNodes.length - 1; i++) {
            let display;
            if (nameTr.childNodes[i].childNodes[4].style.display == 'none') {
                nameTr.childNodes[i].childNodes[4].style.display = "inline-block";
            } else {
                nameTr.childNodes[i].childNodes[4].style.display = "none";
            }
        }
        return;
    }
    let nameTable;
    let trNextBeforeBtns;
    let innerValue;
    nameTable = event.target.parentNode.parentNode.parentNode.nextSibling;
    trNextBeforeBtns = event.target.parentNode.parentNode;
    if (nameTable.style.display == "none") {
        nameTable.style.display = "block";

        for (i = 1; i < trNextBeforeBtns.childNodes.length - 1; i++) {
            if (trNextBeforeBtns.childNodes[i].childNodes[1].checked == true) {
                innerValue = trNextBeforeBtns.childNodes[i].childNodes[2].innerText;
            }
            trNextBeforeBtns.childNodes[i].childNodes[0].style.display = "inline-block";
            trNextBeforeBtns.childNodes[i].childNodes[3].style.display = "inline-block";

        }
        nameTable.childNodes[0].childNodes[1].childNodes[0].childNodes[0].value = innerValue;
    } else {
        nameTable.style.display = "none";
        for (i = 1; i < trNextBeforeBtns.childNodes.length - 1; i++) {
            trNextBeforeBtns.childNodes[i].childNodes[0].style.display = "none";
            trNextBeforeBtns.childNodes[i].childNodes[3].style.display = "none";
            trNextBeforeBtns.childNodes[i].childNodes[4].style.display = "none";
        }
    }
}
function tapMouseInEvent(event) {
    const beforeBtn = event.target.childNodes[0]
    const nextBtn = event.target.childNodes[3]
    beforeBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
    mouseoverEvent(event);
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
    } else if (option1 == 'tapNameInputShow') {
        ob.addEventListener(`${clickOption}`, tapNameInputShow);
    } else if (option1 == 'tapMouseInEvent') {
        ob.addEventListener(`${clickOption}`, tapMouseInEvent);
    } else if (option1 == 'tapRadioChangeEvent') {
        ob.addEventListener(`${clickOption}`, tapRadioChangeEvent);
    } else if(option1 == 'tapNameEditEvent'){
        ob.addEventListener(`${clickOption}`,tapNameEditEvent);
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
//tapMemo ddd start

let memoOb = {
    type:'div',
    memoHead : table1 = {
        type:'table',
        tr:tr = {
            type:'td',
            td1:td={
                type:'td',
                btn:btn={
                    type:'button',
                    innerText:'b',
                }
            },
            td2:td={
                type:'td',
                form:txt={
                    type:'form',
                    textarea:txt={
                        type:'textarea',
                        rows:'5', cols:'50',style:'display:block',style:'display:block',
                    },
                    select:color={
                        type:'select',style:'float:right',
                        op:option={
                            type:'option', value:'type1'
                        },
                        op2:option={
                            type:'option', value:'type2'
                        }
                    },
                    submit:ind={
                        type:'input',kind:'submit',style_1:'float:right',
                        style:'display:inline-block',
                    }
                }
            }
        }
    },
    //momo
}
//tapMemo ddd end

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


        let tapEdit = tapNameEditTable();
        let tapReal2 = makeHtml(tapEdit, set);
        q.appendChild(tapReal2);

        let win = document.querySelector(`.${set.BclassName}`);
        let tapDiv = document.createElement('div');
        tapDiv.className = 'tapDiv';
        win.appendChild(tapDiv);

        
        for(j=0;j<set.BtapArray.length;j++){
            console.log(set.BtapArray[j])
            let tapName = set.BtapArray[j][0];
            if(tapName!=null&&tapName.split('_')[2]=='s1'){
                let tapMemoHtml = makeHtml(memoOb, set);
                let tapDiv = document.querySelector(`.${set.BclassName} .tapDiv`);
                tapDiv.appendChild(tapMemoHtml);
            }
        }
    }
}
//tap btn ===========================================================

//ddd
function tapBtnMake(set) {
    let table = {
        type: 'table', style_border: 'borderCollapse:collapse', style: 'width:100%',
        style_BwinBack_backgroundColor: '',

        tr: tr = {
            type: 'tr',
            td: tapEdit = {
                type: 'td', style_border: 'borderCollapse:collapse', style_width: 'width:20px',
                style_BrowLine_borderBottom: `${wB.BrowLine}`,
                style_BcolLine_borderRight: `${wB.BcolLine}`,
                button_showEditTap: button({ innerText: ' ', event: 'tapNameInputShow:click' }),
            },
        },
    }
    let fakeArray = tapArraySort(set.BtapArray, 'fakeInex');
    for (j = 0; j < fakeArray.length; j++) {
        if (fakeArray[j] != null) {//set.BtapArray[j]
            let td;
            if (fakeArray[j][3] == 1) {
                td = tapBtnTd(fakeArray[j], 'checked');
            } else {
                td = tapBtnTd(fakeArray[j], 'not checked');
            }
            table.tr[`td${j}`] = td;
        }
    }
    table.tr.tdLast = {
        type: 'td',
        style_BrowLine_borderBottom: `${wB.BrowLine}`,
    }
    return table;
}
function tapBtnTd(array, check, buttonShow) {
    let td = {
        type: 'td', event:'tapRadioChangeEvent:click',
        button_before: button({
            innerText: '<', style: 'display:none',//tapRadioChangeEvent
            style_width: 'width:15px', style_height: 'height:20px',
            event: 'tapRadioChangeEvent:click',
        }),
        radio: tapRadio = {
            type: 'input',
            kind: 'radio',
            id: array[0],
            name_BclassName: `${set.BclassName}_tapBtn`,
            value: `${array[0]}`,
            style: 'display:none',
            event: 'tapRadioChangeEvent:change'
        },
        label: radio({
            type: 'label',
            htmlFor: array[0],
            innerText: array[1],
            event_tapclick: 'tapNameInputShow:dblclick',
            style_paddingLeft: 'paddingLeft:5px',
            //event:'tapRadioChangeEvent:click'
        }),
        button_next: button({
            innerText: '>', style: 'display:none',
            style_width: 'width:15px', style_height: 'height:20px',
            event: 'tapRadioChangeEvent:click',
        }),
        button_x: button({ innerText: 'x', style: 'display:none' }),
    }
    if (check == 'checked') {
        //td.style_BrowLine_borderBottom= `${wB.BrowLine}`;
        td.style_BcolLine_borderRight = `${wB.BcolLine}`;
        td.style_BcolLine_borderLeft = `${wB.BcolLine}`;
        td.radio.checked = 'true';
    } else {
        td.style_BrowLine_borderBottom = `${wB.BrowLine}`;
    }
    if (buttonShow != null && buttonShow[0] == '<' && buttonShow[1] == '>') {
        td.button_before.style = 'inline-block';
        td.button_next.style = 'inline-block';
        if (buttonShow[2] == 'x') {
            td.button_x.style = 'inline-block';
        }
    }

    return td;
}

function tapNameEditTable() {
    let tapEdit = {
        type: 'table', style: 'width:100%', style_display: 'display:none', style_BwinBack_backgroundColor: '',
        tr: tr = {
            type: 'tr',
            td: td = {
                type: 'td',
                style_border: 'borderCollapse:collapse',
                style_BrowLine_borderBottom: `${wB.BrowLine}`,
                style_BcolLine_borderRight: `${wB.BcolLine}`,
                btn: button({
                    innerText: 'x', style_width: 'width:20px',
                    style_height: 'height:20px',
                    event_tapclick: 'tapNameInputShow:click',
                }),
            },
            td2: td = {
                type: 'td', style_width: 'width:100%',
                style_BrowLine_borderBottom: `${wB.BrowLine}`,
                form: form = {
                    type: 'form', event:'tapNameEditEvent:submit',
                    input: input({ className: 'tapNameInput', style_width: 'width:89%' }),
                    sub: input({ kind: 'submit', value: 'sub' }),
                }

            }
        }
    }
    return tapEdit;
}
function tapRadioChangeEvent(event) {//ddd
    let input = event.target;
    if(event.target.type == null){
        input = event.target.childNodes[1];
    }

    let regex = /[^0-9]/g;
    if(input == null){
        return;
    }
    let winName = input.name;
    let n = winName.replace(regex, "");
    let set = {};
    set.target = Number(n);
    set.tapName = input.id;

    if (event.target.type == 'radio' || event.target.type == null) {
        let radioAll = document.querySelectorAll(`input[name=${input.name}]`);

        set.option = 'tapChecked';
        let setOb = Mwindow.save('editTap', set);
        setOb = checkValue(setOb);

        for (i = 0; i < radioAll.length; i++) {
            let td = radioAll[i].parentNode;
            if (radioAll[i].id == input.id) {
                td.style.borderRight = setOb.BcolLine;
                td.style.borderLeft = setOb.BcolLine;
                td.style.borderBottom = 'none';
            } else {
                td.style.borderRight = 'none';
                td.style.borderLeft = 'none';
                td.style.borderBottom = setOb.BrowLine;
            }
        }
    } else if(event.target.type =='submit'){
        let winName = event.target.parentNode.childNodes[1].name;
        let n = winName.replace(regex, "");
        let set2 = {};
        set2.target = Number(n);
        set2.tapName = event.target.parentNode.childNodes[1].id;
        set2.option = 'tapChange'

        if (event.target.innerText == '<') {
            set2.beforeOrNext = '<';
        } else {
            set2.beforeOrNext = '>';
        }

        let setOb = Mwindow.save('editTap', set2);
        setOb = checkValue(setOb);

        let tapBtnDiv = document.querySelector(`.${winName} .tapBtnTr`);

        let len = tapBtnDiv.childNodes[0].childNodes[0].childNodes.length;
        for (i = 1; i < len; i++) {
            tapBtnDiv.childNodes[0].childNodes[0].childNodes[1].remove();
        }
        let fakeArray = tapArraySort(setOb.BtapArray, 'fakeInex');
        for (i = 0; i < fakeArray.length; i++) {
            if (fakeArray[i] != null) {
                let td;
                let tdHtml;
                if (fakeArray[i][3] == 1) {
                    td = tapBtnTd(fakeArray[i], 'checked', ['<', '>']);
                } else {
                    td = tapBtnTd(fakeArray[i], 'not checked', ['<', '>']);
                }
                tdHtml = makeHtml(td, setOb);
                tapBtnDiv.childNodes[0].childNodes[0].appendChild(tdHtml);
            }
        }
        let tdLast = {
            type: 'td',
            style_BrowLine_borderBottom: `${wB.BrowLine}`,
        }
        tdLast = makeHtml(tdLast, setOb);
        tapBtnDiv.childNodes[0].childNodes[0].appendChild(tdLast);
    }
}
function tapNameEditEvent(event){//tapNeme
    event.preventDefault();
    let tr = event.target.parentNode.parentNode.parentNode.previousSibling.childNodes[0];
    let regex = /[^0-9]/g;
    let winName = tr.childNodes[1].childNodes[1].name;
    let n = winName.replace(regex, "");
    let text = event.target.childNodes[0].value;
    let set = {};
    set.target = Number(n);
    set.newTapName = text;
    set.option = 'tapNameEdit';

    let change;
    let radioAll = document.querySelectorAll(`input[name=${winName}]`);
    for(i=0;i<radioAll.length;i++){
        if(radioAll[i].checked == true){
            change = radioAll[i];
        }
    }
    set.tapName = change.id;
    let setOb = Mwindow.save('editTap', set);
}

function tapArraySort(array, option) {//ddd
    let basicArray = [];
    let array2 = [];
    for (i = 0; i < array.length; i++) {
        if (array[i] != null) {
            array2.push(array[i]);
        }
        basicArray.push(null);
    }
    let sortArray = array2.sort((a, b) => a[2] - b[2]);
    if(option == 'fakeInex'){
        return sortArray;
    }
    for (i = 0; i < sortArray.length; i++) {
        sortArray[i][2] = i;
        basicArray[sortArray[i][4]] = sortArray[i];
    }
    return basicArray;
}

//tap btn ===========================================================

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
        if (option == 'firstNew') {
            let tapArray = [
                [1,0], // [ 0:sort[1:new 0:old, 1:color], 
                       //   1:view[0:all, 1<=:count], 
                       //   2:highlight[0:colo1, 1:colo2, 2:colo3] ],

                []     //textArray [0:check, 
                //                  1:text, 
                //                  2:mark 0~2-color 3-none]
            ];
            localStorage.setItem(`${set.tapClassName}`, JSON.stringify(tapArray));
            //let getSave = localStorage.getItem('winArray');
            //localStorage.setItem('winArray', JSON.stringify(newWinArray));
            //getSave = JSON.parse(getSave);

        } else if (option == 'openNew') {
            let getSave = localStorage.getItem(`${set.tapClassName}`);
            getSave = JSON.parse(getSave);

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
        }
    },
}
