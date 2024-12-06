(self["webpackChunk"] = self["webpackChunk"] || []).push([[392],{

/***/ 60250:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ timer; }
});

// EXTERNAL MODULE: ./node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(15558);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);
// EXTERNAL MODULE: ./node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(82092);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);
// EXTERNAL MODULE: ./node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/objectSpread2.js
var objectSpread2 = __webpack_require__(26068);
var objectSpread2_default = /*#__PURE__*/__webpack_require__.n(objectSpread2);
// EXTERNAL MODULE: ./node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(48305);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(75271);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/typography/index.js + 20 modules
var typography = __webpack_require__(32570);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/message/index.js
var message = __webpack_require__(67198);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/button/index.js + 9 modules
var es_button = __webpack_require__(35298);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/modal/index.js + 1 modules
var modal = __webpack_require__(31582);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/list/index.js + 3 modules
var list = __webpack_require__(34970);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/card/index.js + 30 modules
var card = __webpack_require__(16901);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/space/index.js + 3 modules
var space = __webpack_require__(77051);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/PlusOutlined.js
var PlusOutlined = __webpack_require__(49165);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/DeleteOutlined.js + 1 modules
var DeleteOutlined = __webpack_require__(48439);
// EXTERNAL MODULE: ./node_modules/.pnpm/@dnd-kit+sortable@10.0.0_@dnd-kit+core@6.3.1_react@18.3.1/node_modules/@dnd-kit/sortable/dist/sortable.esm.js
var sortable_esm = __webpack_require__(99546);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/DownloadOutlined.js + 1 modules
var DownloadOutlined = __webpack_require__(23129);
;// CONCATENATED MODULE: ./src/pages/timer/consts/index.js
// 环节选项
var SECTIONS = [{
  value: 'warmup',
  label: '暖场破冰'
}, {
  value: 'saaReminder',
  label: 'SAA会前提醒'
}, {
  value: 'chairmanSpeech',
  label: '主席致辞-头马+俱乐部介绍'
}, {
  value: 'hostIntro',
  label: '主持人发言-今日议程介绍'
}, {
  value: 'evaluationTeam',
  label: '总评团队介绍'
}, {
  value: 'timerIntro',
  label: '时间官介绍'
}, {
  value: 'ahCounter',
  label: '哼哈官介绍'
}, {
  value: 'grammarian',
  label: '语法官介绍'
}, {
  value: 'guestShare',
  label: '嘉宾分享'
}, {
  value: 'tableTopics',
  label: '即兴演讲'
}, {
  value: 'guestIntro',
  label: '来宾介绍'
}, {
  value: 'break',
  label: '茶歇'
}, {
  value: 'prepared',
  label: '备稿'
}, {
  value: 'topicsEval',
  label: '即兴评估'
}, {
  value: 'preparedEval',
  label: '备稿评估'
}, {
  value: 'meetingEval',
  label: '会议评估'
}, {
  value: 'voteAndSummary',
  label: '投票&会议小结'
}, {
  value: 'announcement',
  label: '通告'
}, {
  value: 'awards',
  label: '颁奖&总结'
}];

// 环节默认时间范围（分钟）
var DEFAULT_DURATIONS = {
  warmup: {
    min: 3,
    max: 5
  },
  saaReminder: {
    min: 2,
    max: 3
  },
  chairmanSpeech: {
    min: 3,
    max: 5
  },
  hostIntro: {
    min: 2,
    max: 3
  },
  evaluationTeam: {
    min: 2,
    max: 3
  },
  timerIntro: {
    min: 1,
    max: 2
  },
  ahCounter: {
    min: 1,
    max: 2
  },
  grammarian: {
    min: 2,
    max: 3
  },
  guestShare: {
    min: 3,
    max: 5
  },
  // 默认值，但允许手动修改
  tableTopics: {
    min: 1.5,
    max: 2.5
  },
  guestIntro: {
    min: 2,
    max: 3
  },
  "break": {
    min: 10,
    max: 15
  },
  prepared: {
    min: 5,
    max: 7
  },
  topicsEval: {
    min: 2,
    max: 3
  },
  preparedEval: {
    min: 2.5,
    max: 3.5
  },
  meetingEval: {
    min: 3,
    max: 5
  },
  voteAndSummary: {
    min: 3,
    max: 5
  },
  announcement: {
    min: 2,
    max: 3
  },
  awards: {
    min: 5,
    max: 7
  }
};

// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/row/index.js
var row = __webpack_require__(1431);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/col/index.js
var col = __webpack_require__(54984);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/input-number/index.js + 17 modules
var input_number = __webpack_require__(89018);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/statistic/index.js + 5 modules
var statistic = __webpack_require__(25315);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(52676);
;// CONCATENATED MODULE: ./src/pages/timer/components/StatisticsCards.tsx




var StatisticsCards = function StatisticsCards(_ref) {
  var stats = _ref.stats,
    tableTopicsTotal = _ref.tableTopicsTotal,
    onTableTopicsTotalChange = _ref.onTableTopicsTotalChange,
    calculateAvailableSpeakers = _ref.calculateAvailableSpeakers;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(row/* default */.Z, {
    gutter: [16, 16],
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(col/* default */.Z, {
      span: 8,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(card/* default */.Z, {
        title: "\u5373\u5174\u6F14\u8BB2\u65F6\u95F4\u8BBE\u7F6E",
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)(space/* default */.Z, {
          direction: "vertical",
          style: {
            width: '100%'
          },
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(input_number/* default */.Z, {
            style: {
              width: '100%'
            },
            min: 0,
            value: tableTopicsTotal,
            onChange: function onChange(value) {
              return onTableTopicsTotalChange(value || 0);
            },
            addonBefore: "\u603B\u65F6\u957F\uFF08\u5206\u949F\uFF09"
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(statistic/* default */.Z, {
            title: "\u53EF\u7528\u6F14\u8BB2\u4EBA\u6570\uFF08\u6BCF\u4EBA2.5\u5206\u949F\uFF09",
            value: calculateAvailableSpeakers(),
            suffix: "\u4EBA"
          })]
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(col/* default */.Z, {
      span: 16,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(card/* default */.Z, {
        title: "\u4F1A\u8BAE\u7EDF\u8BA1",
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)(row/* default */.Z, {
          gutter: 16,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(col/* default */.Z, {
            span: 8,
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(statistic/* default */.Z, {
              title: "\u8BA1\u5212\u603B\u65F6\u957F",
              value: stats.plannedTotal
            })
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(col/* default */.Z, {
            span: 8,
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(statistic/* default */.Z, {
              title: "\u5B9E\u9645\u603B\u65F6\u957F",
              value: stats.actualTotal
            })
          })]
        })
      })
    })]
  });
};
// EXTERNAL MODULE: ./node_modules/.pnpm/@babel+runtime@7.23.6/node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(67825);
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties);
// EXTERNAL MODULE: ./node_modules/.pnpm/@dnd-kit+modifiers@9.0.0_@dnd-kit+core@6.3.1_react@18.3.1/node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js
var modifiers_esm = __webpack_require__(12606);
// EXTERNAL MODULE: ./node_modules/.pnpm/@dnd-kit+core@6.3.1_react-dom@18.3.1_react@18.3.1/node_modules/@dnd-kit/core/dist/core.esm.js + 1 modules
var core_esm = __webpack_require__(5574);
// EXTERNAL MODULE: ./node_modules/.pnpm/@dnd-kit+utilities@3.2.2_react@18.3.1/node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var utilities_esm = __webpack_require__(78434);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/select/index.js + 39 modules
var es_select = __webpack_require__(4382);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/input/index.js + 5 modules
var input = __webpack_require__(73186);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/tooltip/index.js + 3 modules
var tooltip = __webpack_require__(61193);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/popconfirm/index.js + 6 modules
var popconfirm = __webpack_require__(31089);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/table/index.js + 162 modules
var table = __webpack_require__(77708);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/HolderOutlined.js
var HolderOutlined = __webpack_require__(42890);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/CheckCircleOutlined.js + 1 modules
var CheckCircleOutlined = __webpack_require__(2503);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js + 1 modules
var ClockCircleOutlined = __webpack_require__(64485);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/CloseCircleOutlined.js + 1 modules
var CloseCircleOutlined = __webpack_require__(78876);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/BellOutlined.js + 1 modules
var BellOutlined = __webpack_require__(59794);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/PlayCircleOutlined.js + 1 modules
var PlayCircleOutlined = __webpack_require__(32646);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/ReloadOutlined.js + 1 modules
var ReloadOutlined = __webpack_require__(72351);
;// CONCATENATED MODULE: ./src/utils/timeFormat.ts

var formatDateTime = function formatDateTime(date) {
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
};
var formatDuration = function formatDuration(minutes) {
  var hours = Math.floor(minutes / 60);
  var mins = Math.floor(minutes % 60);
  var secs = Math.round(minutes * 60 % 60);
  return "".concat(hours, ":").concat(mins.toString().padStart(2, '0'), ":").concat(secs.toString().padStart(2, '0'));
};
var formatTimeInput = function formatTimeInput(minutes) {
  if (!minutes) return '';
  var mins = Math.floor(minutes);
  var secs = Math.round((minutes - mins) * 60);
  return secs ? "".concat(mins, ":").concat(secs.toString().padStart(2, '0')) : mins.toString();
};
var parseTimeInput = function parseTimeInput() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!input) return 0;
  if (input.includes('.')) {
    return parseFloat(input);
  }
  if (input.includes(':')) {
    var _input$split$map = input.split(':').map(Number),
      _input$split$map2 = slicedToArray_default()(_input$split$map, 2),
      mins = _input$split$map2[0],
      secs = _input$split$map2[1];
    return mins + secs / 60;
  }
  return parseInt(input, 10);
};
// EXTERNAL MODULE: ./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/debounce.js
var debounce = __webpack_require__(66292);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);
;// CONCATENATED MODULE: ./src/pages/timer/components/TimerTable.tsx



var _excluded = ["children"];












var Title = typography/* default */.Z.Title;
var Option = es_select/* default */.Z.Option;
// 独立的输入框组件
var EditableCell = /*#__PURE__*/react.memo( /*#__PURE__*/react.forwardRef(function (_ref, ref) {
  var id = _ref.id,
    initialValue = _ref.value,
    field = _ref.field,
    onUpdate = _ref.onUpdate;
  var _React$useState = react.useState(initialValue),
    _React$useState2 = slicedToArray_default()(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  var debouncedUpdate = (0,react.useRef)(debounce_default()(function (value) {
    onUpdate(id, field, value);
  }, 2000)).current;
  react.useEffect(function () {
    if (document.activeElement !== (ref === null || ref === void 0 ? void 0 : ref.current)) {
      setValue(initialValue);
    }
  }, [initialValue]);
  var handleChange = react.useCallback(function (e) {
    var newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  }, [debouncedUpdate]);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(input/* default */.Z.TextArea, {
    ref: ref,
    value: value,
    onChange: handleChange,
    placeholder: field === 'overtimeReason' ? '请输入超时原因...' : '请输入改进建议...',
    autoSize: {
      minRows: 1,
      maxRows: 3
    }
  });
}));
var TimerTable = function TimerTable(_ref2) {
  var records = _ref2.records,
    onDragEnd = _ref2.onDragEnd,
    onUpdateRecord = _ref2.onUpdateRecord,
    onStartTimer = _ref2.onStartTimer,
    onEndTimer = _ref2.onEndTimer,
    onResetTimer = _ref2.onResetTimer,
    onDeleteRecord = _ref2.onDeleteRecord,
    onUpdateStatus = _ref2.onUpdateStatus,
    onStartTimerUpdates = _ref2.onStartTimerUpdates;
  var sensor = (0,core_esm/* useSensor */.VT)(core_esm/* PointerSensor */.we, {
    activationConstraint: {
      distance: 8 // 增加激活距离
    }
  });
  console.log('records:', records);
  var DraggableRow = function DraggableRow(_ref3) {
    var children = _ref3.children,
      props = objectWithoutProperties_default()(_ref3, _excluded);
    var _useSortable = (0,sortable_esm/* useSortable */.nB)({
        id: props['data-row-key']
      }),
      attributes = _useSortable.attributes,
      listeners = _useSortable.listeners,
      setNodeRef = _useSortable.setNodeRef,
      transform = _useSortable.transform,
      transition = _useSortable.transition,
      isDragging = _useSortable.isDragging;
    var style = objectSpread2_default()(objectSpread2_default()({}, props.style), {}, {
      transform: utilities_esm/* CSS */.ux.Transform.toString(transform),
      transition: transition
    }, isDragging ? {
      position: 'relative',
      zIndex: 9999
    } : {});
    return /*#__PURE__*/(0,jsx_runtime.jsx)("tr", objectSpread2_default()(objectSpread2_default()({}, props), {}, {
      ref: setNodeRef,
      style: style,
      children: react.Children.map(children, function (child) {
        if (child.key === 'sort') {
          return /*#__PURE__*/(0,jsx_runtime.jsx)("td", objectSpread2_default()(objectSpread2_default()(objectSpread2_default()(objectSpread2_default()({}, child.props), attributes), listeners), {}, {
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(HolderOutlined/* default */.Z, {
              style: {
                cursor: 'move',
                fontSize: '16px'
              }
            })
          }));
        }
        return child;
      })
    }));
  };
  var getTimerStatusIcon = function getTimerStatusIcon(status) {
    switch (status) {
      case 'green':
        return /*#__PURE__*/(0,jsx_runtime.jsx)(CheckCircleOutlined/* default */.Z, {
          style: {
            color: '#52c41a',
            fontSize: 24
          }
        });
      case 'yellow':
        return /*#__PURE__*/(0,jsx_runtime.jsx)(ClockCircleOutlined/* default */.Z, {
          style: {
            color: '#faad14',
            fontSize: 24
          }
        });
      case 'red':
        return /*#__PURE__*/(0,jsx_runtime.jsx)(CloseCircleOutlined/* default */.Z, {
          style: {
            color: '#f5222d',
            fontSize: 24
          }
        });
      case 'bell':
        return /*#__PURE__*/(0,jsx_runtime.jsx)(BellOutlined/* default */.Z, {
          style: {
            color: '#f5222d',
            fontSize: 24
          }
        });
      default:
        return null;
    }
  };

  // 使用 useMemo 缓存 columns 定义
  var columns = (0,react.useMemo)(function () {
    return [{
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      // 添加 key
      width: 50,
      className: 'drag-handle',
      // 修改类名
      render: function render() {
        return null;
      }
    },
    // 在 columns 数组中修改 section 列的 render 函数
    {
      title: '环节',
      dataIndex: 'section',
      width: 150,
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)(es_select/* default */.Z, {
          style: {
            width: '100%'
          },
          value: record.section,
          onChange: function onChange(value) {
            // 更新环节
            onUpdateRecord(record.id, 'section', value);

            // 如果不是嘉宾分享环节，设置默认时间范围
            if (value !== 'guestShare') {
              var defaultDuration = DEFAULT_DURATIONS[value];
              if (defaultDuration) {
                onUpdateRecord(record.id, 'plannedDurationMin', defaultDuration.min);
                onUpdateRecord(record.id, 'plannedDurationMax', defaultDuration.max);
              }
            }
          },
          children: SECTIONS.map(function (option) {
            return /*#__PURE__*/(0,jsx_runtime.jsx)(Option, {
              value: option.value,
              children: option.label
            }, option.value);
          })
        });
      }
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
      width: 150,
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)(input/* default */.Z, {
          value: record.roleName,
          onChange: function onChange(e) {
            return onUpdateRecord(record.id, 'roleName', e.target.value);
          }
        });
      }
    }, {
      title: '角色昵称',
      dataIndex: 'roleNickname',
      width: 150,
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)(input/* default */.Z, {
          value: record.roleNickname,
          onChange: function onChange(e) {
            return onUpdateRecord(record.id, 'roleNickname', e.target.value);
          }
        });
      }
    }, {
      title: '计划用时(分钟)',
      dataIndex: 'plannedDuration',
      width: 200,
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)(tooltip/* default */.Z, {
          title: "\u652F\u6301\u683C\u5F0F\uFF1A2.5\u30012:30\u30013",
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)(input/* default */.Z.Group, {
            compact: true,
            children: [/*#__PURE__*/(0,jsx_runtime.jsx)(input_number/* default */.Z, {
              style: {
                width: 65
              },
              value: formatTimeInput(record.plannedDurationMin),
              onChange: function onChange(newValue) {
                var value = parseTimeInput(String(newValue));
                onUpdateRecord(record.id, 'plannedDurationMin', value);
                onUpdateStatus(record);
              },
              placeholder: "0:00",
              step: 0.5,
              min: 0
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(input/* default */.Z, {
              style: {
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
                textAlign: 'center'
              },
              placeholder: "~",
              disabled: true
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(input_number/* default */.Z, {
              style: {
                width: 65
              },
              value: formatTimeInput(record.plannedDurationMax),
              onChange: function onChange(newValue) {
                var value = parseTimeInput(String(newValue));
                onUpdateRecord(record.id, 'plannedDurationMax', value);
                onUpdateStatus(record);
              },
              placeholder: "0:00",
              step: 0.5 // 添加 0.5 分钟（30秒）的步进
              ,
              min: 0 // 防止负数输入
              ,
              precision: 1 // 允许一位小数，以支持0.5分钟的输入
            })]
          })
        });
      }
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      width: 180
    }, {
      title: '倒计时',
      dataIndex: 'countdown',
      width: 50,
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          style: {
            color: record.timerStatus === 'red' || record.timerStatus === 'bell' ? '#f5222d' : record.timerStatus === 'yellow' ? '#faad14' : record.timerStatus === 'green' ? '#52c41a' : 'inherit',
            fontWeight: 'bold',
            fontSize: '16px'
          },
          children: record.countdown || '--:--'
        });
      }
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 180
    }, {
      title: '已用时间',
      dataIndex: 'elapsedTime',
      width: 100,
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
          style: {
            fontSize: '16px'
          },
          children: record.elapsedTime || '--:--:--'
        });
      }
    }, {
      title: '用时情况',
      dataIndex: 'status',
      width: 120
    }, {
      title: '指示牌',
      dataIndex: 'timerStatus',
      width: 80,
      render: function render(_, record) {
        return getTimerStatusIcon(record.timerStatus);
      }
    }, {
      title: '操作',
      width: 300,
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsxs)(space/* default */.Z, {
          children: [!record.isRunning && !record.isPaused && !record.endTime && /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
            type: "primary",
            icon: /*#__PURE__*/(0,jsx_runtime.jsx)(PlayCircleOutlined/* default */.Z, {}),
            onClick: function onClick() {
              return onStartTimer(record.id);
            },
            children: "\u5F00\u59CB"
          }), !record.isRunning && record.isPaused && /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
            type: "primary",
            icon: /*#__PURE__*/(0,jsx_runtime.jsx)(PlayCircleOutlined/* default */.Z, {}),
            onClick: function onClick() {
              var now = new Date();
              var pausedTime = new Date(record.pausedTime);
              var additionalPausedTime = (now.getTime() - pausedTime.getTime()) / (1000 * 60);
              onUpdateRecord(record.id, 'isRunning', true);
              onUpdateRecord(record.id, 'isPaused', false);
              onUpdateRecord(record.id, 'totalPausedTime', (record.totalPausedTime || 0) + additionalPausedTime);
              onStartTimerUpdates(record.id, record.plannedDurationMax, true, record.startTime);
            },
            children: "\u7EE7\u7EED"
          }), record.isRunning && /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
            type: "primary",
            danger: true,
            onClick: function onClick() {
              return onEndTimer(record.id);
            },
            children: "\u7ED3\u675F"
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
            icon: /*#__PURE__*/(0,jsx_runtime.jsx)(ReloadOutlined/* default */.Z, {}),
            onClick: function onClick() {
              return onResetTimer(record.id);
            },
            children: "\u91CD\u7F6E"
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(popconfirm/* default */.Z, {
            title: "\u5220\u9664\u786E\u8BA4",
            description: "\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u8BB0\u5F55\u5417\uFF1F",
            onConfirm: function onConfirm() {
              return onDeleteRecord(record.id);
            },
            okText: "\u786E\u5B9A",
            cancelText: "\u53D6\u6D88",
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
              danger: true,
              icon: /*#__PURE__*/(0,jsx_runtime.jsx)(DeleteOutlined/* default */.Z, {}),
              disabled: record.isRunning // 运行中的记录不能删除
              ,
              children: "\u5220\u9664"
            })
          })]
        });
      }
    }, {
      title: '超时原因',
      dataIndex: 'overtimeReason',
      width: 200,
      shouldCellUpdate: function shouldCellUpdate(record, prevRecord) {
        return record.overtimeReason !== prevRecord.overtimeReason;
      },
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)(EditableCell, {
          id: record.id,
          value: record.overtimeReason || '',
          field: "overtimeReason",
          onUpdate: onUpdateRecord
        }, "overtime-".concat(record.id));
      }
    }, {
      title: '改进建议',
      dataIndex: 'improvement',
      width: 200,
      render: function render(_, record) {
        return /*#__PURE__*/(0,jsx_runtime.jsx)(EditableCell, {
          id: record.id,
          value: record.improvement || '',
          field: "improvement",
          onUpdate: onUpdateRecord,
          maxLength: 500
        }, "improvement-".concat(record.id));
      }
    }];
  }, [onUpdateRecord]);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(core_esm/* DndContext */.LB, {
    sensors: [sensor],
    modifiers: [modifiers_esm/* restrictToVerticalAxis */.DL],
    onDragEnd: onDragEnd,
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(sortable_esm/* SortableContext */.Fo, {
      items: records.map(function (r) {
        return r.id;
      }),
      strategy: sortable_esm/* verticalListSortingStrategy */.qw,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(table/* default */.Z, {
        components: {
          body: {
            row: DraggableRow
          }
        },
        rowKey: "id",
        columns: columns,
        dataSource: records,
        pagination: false,
        onRow: function onRow(record) {
          return {
            'data-row-key': record.id,
            index: records.findIndex(function (x) {
              return x.id === record.id;
            })
          };
        }
      })
    })
  });
};
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+plots@2.3.2_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/plots/es/components/column/index.js + 940 modules
var column = __webpack_require__(23189);
;// CONCATENATED MODULE: ./src/pages/timer/components/StatisticsChart.tsx





var StatisticsChart = function StatisticsChart(_ref) {
  var records = _ref.records,
    type = _ref.type,
    title = _ref.title;
  var getChartData = function getChartData() {
    return records.filter(function (record) {
      return record.section === type && record.elapsedTime;
    }).map(function (record) {
      return {
        name: record.roleNickname || record.roleName,
        elapsedTime: record.elapsedTime,
        actualMinutes: record.actualMinutes
      };
    }).sort(function (a, b) {
      return b.actualMinutes - a.actualMinutes;
    });
  };
  var config = {
    data: getChartData(),
    xField: 'name',
    yField: 'elapsedTime',
    label: {
      position: 'top',
      style: {
        fill: '#000000',
        opacity: 1
      }
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
      maxWidth: 100
    }
  };
  return /*#__PURE__*/(0,jsx_runtime.jsx)(card/* default */.Z, {
    title: title,
    style: {
      marginTop: 16
    },
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(column/* default */.Z, objectSpread2_default()({}, config))
  });
};
// EXTERNAL MODULE: ./node_modules/.pnpm/xlsx@0.18.5/node_modules/xlsx/xlsx.mjs
var xlsx = __webpack_require__(64221);
;// CONCATENATED MODULE: ./src/pages/timer/hooks/useExportToExcel.ts


var useExportToExcel = function useExportToExcel(records, stats) {
  var exportToExcel = function exportToExcel() {
    var timerStatusColorDesc = {
      green: '绿色正常',
      yellow: '黄色警告',
      red: '红色超时',
      bell: '铃声结束'
    };
    // 准备导出数据
    var exportData = records.map(function (record) {
      var _SECTIONS$find;
      return {
        '环节': ((_SECTIONS$find = SECTIONS.find(function (s) {
          return s.value === record.section;
        })) === null || _SECTIONS$find === void 0 ? void 0 : _SECTIONS$find.label) || '',
        '角色名称': record.roleName,
        '角色昵称': record.roleNickname,
        '计划最短时间(分钟)': record.plannedDurationMin,
        '计划最长时间(分钟)': record.plannedDurationMax,
        '开始时间': record.startTime,
        '结束时间': record.endTime,
        '已用时间': record.elapsedTime || '',
        '用时情况': record.status,
        '提示牌': timerStatusColorDesc[record.timerStatus] || '',
        '超时原因': record.overtimeReason || '',
        '改进建议': record.improvement || ''
      };
    });

    // 准备统计数据
    var summaryData = [{
      '统计项': '计划总时长',
      '数值': stats.plannedTotal
    }, {
      '统计项': '实际总时长',
      '数值': stats.actualTotal
    }, {
      '统计项': '超时环节数',
      '数值': stats.overtime.length
    }, {
      '统计项': '不足环节数',
      '数值': stats.undertime.length
    }];

    // 超时详情
    var overtimeData = stats.overtime.map(function (item) {
      return {
        '环节': item.section,
        '超时时长': item.duration
      };
    });

    // 不足详情
    var undertimeData = stats.undertime.map(function (item) {
      return {
        '环节': item.section,
        '不足时长': item.duration
      };
    });

    // 创建工作簿
    var wb = xlsx/* utils */.P6.book_new();

    // 添加主数据表
    var ws = xlsx/* utils */.P6.json_to_sheet(exportData);
    xlsx/* utils */.P6.book_append_sheet(wb, ws, '会议记录');

    // 添加统计数据表
    var summaryWs = xlsx/* utils */.P6.json_to_sheet(summaryData);
    xlsx/* utils */.P6.book_append_sheet(wb, summaryWs, '统计概要');

    // 添加超时详情表（如果有数据）
    if (overtimeData.length > 0) {
      var overtimeWs = xlsx/* utils */.P6.json_to_sheet(overtimeData);
      xlsx/* utils */.P6.book_append_sheet(wb, overtimeWs, '超时详情');
    }

    // 添加不足详情表（如果有数据）
    if (undertimeData.length > 0) {
      var undertimeWs = xlsx/* utils */.P6.json_to_sheet(undertimeData);
      xlsx/* utils */.P6.book_append_sheet(wb, undertimeWs, '不足详情');
    }

    // 生成文件名
    var now = new Date();
    var fileName = "\u8BB0\u5F55_".concat(now.getFullYear()).concat((now.getMonth() + 1).toString().padStart(2, '0')).concat(now.getDate().toString().padStart(2, '0'), ".xlsx");

    // 导出文件
    xlsx/* writeFile */.NC(wb, fileName);
  };
  return {
    exportToExcel: exportToExcel
  };
};

// EXTERNAL MODULE: ./node_modules/.pnpm/antd@5.14.1_react-dom@18.3.1_react@18.3.1/node_modules/antd/es/tag/index.js + 5 modules
var tag = __webpack_require__(37492);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/ArrowDownOutlined.js + 1 modules
var ArrowDownOutlined = __webpack_require__(58652);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/ArrowUpOutlined.js + 1 modules
var ArrowUpOutlined = __webpack_require__(78344);
// EXTERNAL MODULE: ./node_modules/.pnpm/@ant-design+icons@5.2.6_react-dom@18.3.1_react@18.3.1/node_modules/@ant-design/icons/es/icons/CheckOutlined.js
var CheckOutlined = __webpack_require__(92852);
;// CONCATENATED MODULE: ./src/pages/timer/components/TimerSummary.tsx





var TimerSummary = function TimerSummary(_ref) {
  var records = _ref.records;
  // 计算总体延迟/超前时间
  var calculateTotalDeviation = function calculateTotalDeviation() {
    return records.reduce(function (total, record) {
      if (record.actualMinutes) {
        var planned = (record.plannedDurationMin + record.plannedDurationMax) / 2;
        return total + (record.actualMinutes - planned);
      }
      return total;
    }, 0);
  };

  // 判断时间状态
  var getTimeStatus = function getTimeStatus(actual, min, max) {
    if (actual < min) {
      return {
        type: 'insufficient',
        color: 'blue',
        icon: /*#__PURE__*/(0,jsx_runtime.jsx)(ArrowDownOutlined/* default */.Z, {}),
        text: '不足'
      };
    } else if (actual > max) {
      return {
        type: 'overtime',
        color: 'red',
        icon: /*#__PURE__*/(0,jsx_runtime.jsx)(ArrowUpOutlined/* default */.Z, {}),
        text: '超时'
      };
    }
    return {
      type: 'normal',
      color: 'success',
      icon: /*#__PURE__*/(0,jsx_runtime.jsx)(CheckOutlined/* default */.Z, {}),
      text: '合理'
    };
  };

  // 按环节汇总数据
  var calculateSectionSummaries = function calculateSectionSummaries() {
    var summaries = {};
    records.forEach(function (record) {
      if (!summaries[record.section]) {
        var sectionInfo = SECTIONS.find(function (s) {
          return s.value === record.section;
        });
        summaries[record.section] = {
          section: record.section,
          sectionName: (sectionInfo === null || sectionInfo === void 0 ? void 0 : sectionInfo.label) || record.section,
          plannedDuration: 0,
          plannedDurationMin: 0,
          plannedDurationMax: 0,
          actualDuration: 0,
          deviation: 0,
          records: 0
        };
      }
      var planned = (record.plannedDurationMin + record.plannedDurationMax) / 2;
      summaries[record.section].plannedDuration += planned;
      summaries[record.section].plannedDurationMin += record.plannedDurationMin;
      summaries[record.section].plannedDurationMax += record.plannedDurationMax;
      if (record.actualMinutes) {
        summaries[record.section].actualDuration += record.actualMinutes;
        summaries[record.section].deviation += record.actualMinutes - planned;
      }
      summaries[record.section].records += 1;
    });

    // 新的排序逻辑
    return Object.values(summaries).sort(function (a, b) {
      // 获取两个记录的状态
      var statusA = getTimeStatus(a.actualDuration, a.plannedDurationMin, a.plannedDurationMax);
      var statusB = getTimeStatus(b.actualDuration, b.plannedDurationMin, b.plannedDurationMax);

      // 定义状态优先级
      var getPriority = function getPriority(status) {
        switch (status.type) {
          case 'overtime':
            return 0;
          // 超时优先级最高
          case 'insufficient':
            return 1;
          // 不足优先级最低
          case 'normal':
            return 2;
          // 正常其次
          default:
            return 1;
        }
      };
      var priorityA = getPriority(statusA);
      var priorityB = getPriority(statusB);

      // 首先按状态优先级排序
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // 同一状态内按偏差绝对值大小排序
      return Math.abs(b.deviation) - Math.abs(a.deviation);
    });
  };
  var totalDeviation = calculateTotalDeviation();
  var sectionSummaries = calculateSectionSummaries();

  // 将分钟数转换为 HH:MM:SS 格式
  var formatTimeHMS = function formatTimeHMS(minutes) {
    var showSign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var sign = showSign ? minutes < 0 ? '-' : '+' : '';
    var absMinutes = Math.abs(minutes);
    var hours = Math.floor(absMinutes / 60);
    var mins = Math.floor(absMinutes % 60);
    var secs = Math.round(absMinutes * 60 % 60);
    return "".concat(sign).concat(hours.toString().padStart(2, '0'), ":").concat(mins.toString().padStart(2, '0'), ":").concat(secs.toString().padStart(2, '0'));
  };

  // 渲染偏差标签和时间
  var renderDeviationWithBadge = function renderDeviationWithBadge(deviation, actual, min, max) {
    var formattedTime = formatTimeHMS(deviation, true);
    var status = getTimeStatus(actual, min, max);
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "flex items-center gap-2",
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(tag/* default */.Z, {
        color: status.color,
        children: [status.icon, status.text]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)("span", {
        style: {
          color: status.color === 'red' ? '#ff4d4f' : status.color === 'blue' ? '#1890ff' : '#52c41a'
        },
        children: formattedTime
      })]
    });
  };
  var columns = [{
    title: '环节',
    dataIndex: 'sectionName',
    key: 'sectionName'
  }, {
    title: '计划时长',
    dataIndex: 'plannedDuration',
    key: 'plannedDuration',
    render: function render(_, record) {
      return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(ClockCircleOutlined/* default */.Z, {}), formatTimeHMS(record.plannedDurationMin), " ~ ", formatTimeHMS(record.plannedDurationMax)]
      });
    }
  }, {
    title: '实际时长',
    dataIndex: 'actualDuration',
    key: 'actualDuration',
    render: function render(value) {
      return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(ClockCircleOutlined/* default */.Z, {}), formatTimeHMS(value)]
      });
    }
  }, {
    title: '偏差',
    dataIndex: 'deviation',
    key: 'deviation',
    render: function render(value, record) {
      return renderDeviationWithBadge(value, record.actualDuration, record.plannedDurationMin, record.plannedDurationMax);
    },
    sorter: function sorter(a, b) {
      return Math.abs(b.deviation) - Math.abs(a.deviation);
    }
  }, {
    title: '记录数',
    dataIndex: 'records',
    key: 'records',
    render: function render(value) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(tag/* default */.Z, {
        children: value
      });
    }
  }];
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(card/* default */.Z, {
    className: "mt-4",
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "flex items-center justify-between mb-4",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(typography/* default */.Z.Title, {
        level: 3,
        className: "mb-0",
        children: "\u6570\u636E\u6C47\u603B"
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(typography/* default */.Z.Text, {
          strong: true,
          children: "\u6574\u4F53\u65F6\u95F4\u504F\u5DEE\uFF1A"
        }), renderDeviationWithBadge(totalDeviation, sectionSummaries.reduce(function (sum, section) {
          return sum + section.actualDuration;
        }, 0), sectionSummaries.reduce(function (sum, section) {
          return sum + section.plannedDurationMin;
        }, 0), sectionSummaries.reduce(function (sum, section) {
          return sum + section.plannedDurationMax;
        }, 0))]
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(table/* default */.Z, {
      columns: columns,
      dataSource: sectionSummaries,
      rowKey: "section",
      pagination: false
    })]
  });
};
/* harmony default export */ var components_TimerSummary = (TimerSummary);
;// CONCATENATED MODULE: ./src/pages/timer/index.tsx









var timer_Title = typography/* default */.Z.Title;






// 生成默认记录


var generateDefaultRecord = function generateDefaultRecord(section) {
  var _SECTIONS$find;
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var defaultDuration = DEFAULT_DURATIONS[section];
  return {
    id: "".concat(section, "-").concat(Date.now(), "-").concat(index),
    section: section,
    roleName: section === 'tableTopics' ? "\u5373\u5174\u6F14\u8BB2\u8005".concat(index + 1) : section === 'prepared' ? "\u5907\u7A3F\u6F14\u8BB2\u8005".concat(index + 1) : ((_SECTIONS$find = SECTIONS.find(function (s) {
      return s.value === section;
    })) === null || _SECTIONS$find === void 0 ? void 0 : _SECTIONS$find.label) || '',
    roleNickname: '',
    startTime: '',
    endTime: '',
    plannedDurationMin: (defaultDuration === null || defaultDuration === void 0 ? void 0 : defaultDuration.min) || 0,
    plannedDurationMax: (defaultDuration === null || defaultDuration === void 0 ? void 0 : defaultDuration.max) || 0,
    status: '',
    isRunning: false,
    overtimeReason: '',
    improvement: ''
  };
};

// 生成初始记录列表
var generateInitialRecords = function generateInitialRecords() {
  var records = [];

  // 为每个环节创建一条记录
  SECTIONS.forEach(function (section) {
    if (section.value === 'tableTopics' || section.value === 'prepared') {
      // 即兴演讲和备稿演讲各创建5条记录
      for (var i = 0; i < 5; i++) {
        records.push(generateDefaultRecord(section.value, i));
      }
    } else {
      // 其他环节各创建1条记录
      records.push(generateDefaultRecord(section.value));
    }
  });
  return records;
};
var ToastmastersTimer = function ToastmastersTimer() {
  var _useState = (0,react.useState)(function () {
      var savedData = localStorage.getItem('timerRecords');
      return savedData ? JSON.parse(savedData) : generateInitialRecords();
    }),
    _useState2 = slicedToArray_default()(_useState, 2),
    records = _useState2[0],
    setRecords = _useState2[1];
  var _useState3 = (0,react.useState)({
      plannedTotal: '0:00:00',
      actualTotal: '0:00:00',
      overtime: [],
      undertime: []
    }),
    _useState4 = slicedToArray_default()(_useState3, 2),
    stats = _useState4[0],
    setStats = _useState4[1];
  var _useState5 = (0,react.useState)(0),
    _useState6 = slicedToArray_default()(_useState5, 2),
    tableTopicsTotal = _useState6[0],
    setTableTopicsTotal = _useState6[1];
  // 在组件顶部添加新的状态
  var _useState7 = (0,react.useState)([]),
    _useState8 = slicedToArray_default()(_useState7, 2),
    deletedRecords = _useState8[0],
    setDeletedRecords = _useState8[1];
  var timerRefs = (0,react.useRef)({});

  // 格式化时长
  var formatDuration = function formatDuration(minutes) {
    var hours = Math.floor(minutes / 60);
    var mins = Math.floor(minutes % 60);
    var secs = Math.round(minutes * 60 % 60);
    return "".concat(hours, ":").concat(mins.toString().padStart(2, '0'), ":").concat(secs.toString().padStart(2, '0'));
  };

  // 更新统计信息
  var updateStatistics = function updateStatistics() {
    var plannedTotal = 0;
    var actualTotal = 0;
    var overtime = [];
    var undertime = [];
    records.forEach(function (record) {
      plannedTotal += (record.plannedDurationMin + record.plannedDurationMax) / 2;
      if (record.actualMinutes) {
        actualTotal += record.actualMinutes;
        if (record.actualMinutes > record.plannedDurationMax) {
          var _SECTIONS$find2;
          overtime.push({
            section: ((_SECTIONS$find2 = SECTIONS.find(function (s) {
              return s.value === record.section;
            })) === null || _SECTIONS$find2 === void 0 ? void 0 : _SECTIONS$find2.label) || record.section,
            duration: formatDuration(record.actualMinutes - record.plannedDurationMax)
          });
        } else if (record.actualMinutes < record.plannedDurationMin) {
          var _SECTIONS$find3;
          undertime.push({
            section: ((_SECTIONS$find3 = SECTIONS.find(function (s) {
              return s.value === record.section;
            })) === null || _SECTIONS$find3 === void 0 ? void 0 : _SECTIONS$find3.label) || record.section,
            duration: formatDuration(record.plannedDurationMin - record.actualMinutes)
          });
        }
      }
    });
    console.log('actualTotal', actualTotal, formatDuration(actualTotal));
    setStats({
      plannedTotal: formatDuration(plannedTotal),
      actualTotal: formatDuration(actualTotal),
      overtime: overtime,
      undertime: undertime
    });
  };

  // 本地存储相关
  (0,react.useEffect)(function () {
    var savedData = localStorage.getItem('timerRecords');
    if (savedData) {
      setRecords(JSON.parse(savedData));
    }
  }, []);
  (0,react.useEffect)(function () {
    localStorage.setItem('timerRecords', JSON.stringify(records));
    updateStatistics();
  }, [records]);

  // 在组件初始化时加载删除历史
  (0,react.useEffect)(function () {
    var savedDeletedRecords = localStorage.getItem('deletedTimerRecords');
    if (savedDeletedRecords) {
      setDeletedRecords(JSON.parse(savedDeletedRecords));
    }
  }, []);

  // 当删除历史改变时保存
  (0,react.useEffect)(function () {
    localStorage.setItem('deletedTimerRecords', JSON.stringify(deletedRecords));
  }, [deletedRecords]);

  // 格式化日期时间
  var formatDateTime = function formatDateTime(date) {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
  };

  // 更新记录
  var updateRecord = function updateRecord(id, field, value) {
    console.log('updateRecord', id, field, value);
    setRecords(function (prev) {
      return prev.map(function (record) {
        if (record.id === id) {
          return objectSpread2_default()(objectSpread2_default()({}, record), {}, defineProperty_default()({}, field, value));
        }
        return record;
      });
    });
  };

  // 继续下一部分代码...
  // 更新状态
  var updateStatus = function updateStatus(record) {
    if (!record.actualMinutes) return;
    var status = '';
    if (record.actualMinutes < record.plannedDurationMin) {
      var diff = record.plannedDurationMin - record.actualMinutes;
      status = "\u4E0D\u8DB3 ".concat(formatDuration(diff));
    } else if (record.actualMinutes > record.plannedDurationMax) {
      var _diff = record.actualMinutes - record.plannedDurationMax;
      status = "\u8D85\u65F6 ".concat(formatDuration(_diff));
    } else {
      status = '正常';
    }
    updateRecord(record.id, 'status', status);
  };

  // 开始定时器更新
  // 修改 startTimerUpdates 函数，添加倒计时更新
  var startTimerUpdates = function startTimerUpdates(id, maxDuration) {
    var isPaused = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var startTimeStr = arguments.length > 3 ? arguments[3] : undefined;
    var record = records.find(function (r) {
      return r.id === id;
    });
    if (!record) return;
    var startTime = new Date(startTimeStr);
    var initialPausedTime = record.totalPausedTime || 0;
    timerRefs.current[id] = setInterval(function () {
      var now = new Date();
      var totalElapsed = (now.getTime() - startTime.getTime()) / (1000 * 60);
      var elapsedMinutes = totalElapsed - initialPausedTime;
      var remainingMinutes = maxDuration - elapsedMinutes;

      // 创建更新对象，只包含需要更新的字段
      var updates = {
        actualMinutes: elapsedMinutes
      };

      // 更新已用时间显示
      var elapsedHours = Math.floor(elapsedMinutes / 60);
      var elapsedMins = Math.floor(elapsedMinutes % 60);
      var elapsedSecs = Math.floor(elapsedMinutes * 60 % 60);
      updates.elapsedTime = "".concat(elapsedHours, ":").concat(elapsedMins.toString().padStart(2, '0'), ":").concat(elapsedSecs.toString().padStart(2, '0'));

      // 更新倒计时显示
      var remainingMins = Math.floor(Math.abs(remainingMinutes));
      var remainingSecs = Math.floor(Math.abs(remainingMinutes) % 1 * 60);
      updates.countdown = remainingMinutes >= 0 ? "".concat(remainingMins, ":").concat(remainingSecs.toString().padStart(2, '0')) : "-".concat(remainingMins, ":").concat(remainingSecs.toString().padStart(2, '0'));

      // 更新用时情况
      if (elapsedMinutes < record.plannedDurationMin) {
        var diff = record.plannedDurationMin - elapsedMinutes;
        updates.status = "\u4E0D\u8DB3 ".concat(record.plannedDurationMin, "\u5206\u949F \u8FD8\u5DEE").concat(formatDuration(diff));
      } else if (elapsedMinutes > record.plannedDurationMax) {
        var _diff2 = elapsedMinutes - record.plannedDurationMax;
        updates.status = "\u8D85\u65F6 ".concat(formatDuration(_diff2));
      } else {
        updates.status = '正常';
      }

      // 更新指示牌状态
      var isLongDuration = maxDuration > 3;
      if (isLongDuration) {
        if (remainingMinutes <= 2 && remainingMinutes > 1) {
          updates.timerStatus = 'green';
        } else if (remainingMinutes <= 1 && remainingMinutes > 0) {
          updates.timerStatus = 'yellow';
        } else if (remainingMinutes <= 0 && remainingMinutes > -0.5) {
          updates.timerStatus = 'red';
        } else if (remainingMinutes <= -0.5) {
          updates.timerStatus = 'bell';
        }
      } else {
        if (remainingMinutes <= 1 && remainingMinutes > 0.5) {
          updates.timerStatus = 'green';
        } else if (remainingMinutes <= 0.5 && remainingMinutes > 0) {
          updates.timerStatus = 'yellow';
        } else if (remainingMinutes <= 0 && remainingMinutes > -0.5) {
          updates.timerStatus = 'red';
        } else if (remainingMinutes <= -0.5) {
          updates.timerStatus = 'bell';
        }
      }

      // 批量更新记录
      setRecords(function (prev) {
        return prev.map(function (r) {
          if (r.id === id) {
            return objectSpread2_default()(objectSpread2_default()({}, r), updates);
          }
          return r;
        });
      });
    }, 1000);
  };

  // 添加辅助函数
  var formatTimeInput = function formatTimeInput(minutes) {
    if (!minutes) return '';
    var mins = Math.floor(minutes);
    var secs = Math.round((minutes - mins) * 60);
    return secs ? "".concat(mins, ":").concat(secs.toString().padStart(2, '0')) : mins.toString();
  };

  // 创建一个单独的开始计时函数
  var startTimer = function startTimer(id) {
    var now = new Date();
    var startTimeStr = formatDateTime(now);
    setRecords(function (prevRecords) {
      var newRecords = prevRecords.map(function (record) {
        if (record.id === id) {
          return objectSpread2_default()(objectSpread2_default()({}, record), {}, {
            startTime: startTimeStr,
            isRunning: true,
            isPaused: false,
            totalPausedTime: 0,
            endTime: '' // 清除可能存在的结束时间
          });
        }
        return record;
      });
      var record = newRecords.find(function (r) {
        return r.id === id;
      });
      if (record) {
        startTimerUpdates(id, record.plannedDurationMax, false, startTimeStr);
      }
      return newRecords;
    });
  };

  // 修改结束计时器函数
  // 修改结束计时器函数
  var endTimer = function endTimer(id) {
    var record = records.find(function (r) {
      return r.id === id;
    });
    if (!record) return;
    var now = new Date();
    var endTimeStr = formatDateTime(now);

    // 计算最终的实际用时
    var startTime = new Date(record.startTime);
    var totalElapsed = (now.getTime() - startTime.getTime()) / (1000 * 60);
    var finalActualMinutes = totalElapsed - (record.totalPausedTime || 0);
    setRecords(function (prev) {
      return prev.map(function (r) {
        if (r.id === id) {
          return objectSpread2_default()(objectSpread2_default()({}, r), {}, {
            isRunning: false,
            isPaused: true,
            pausedTime: endTimeStr,
            endTime: endTimeStr,
            actualMinutes: finalActualMinutes // 保存最终的实际用时
          });
        }
        return r;
      });
    });
    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id]);
      delete timerRefs.current[id];
    }
  };

  // 重置计时器
  // 修改 resetTimer 函数，重置倒计时
  // 修改重置计时器函数
  var resetTimer = function resetTimer(id) {
    setRecords(function (prev) {
      return prev.map(function (record) {
        if (record.id === id) {
          return objectSpread2_default()(objectSpread2_default()({}, record), {}, {
            startTime: '',
            endTime: '',
            pausedTime: '',
            totalPausedTime: 0,
            actualMinutes: undefined,
            elapsedTime: '',
            status: '',
            isRunning: false,
            isPaused: false,
            timerStatus: null,
            countdown: undefined,
            overtimeReason: '',
            improvement: ''
          });
        }
        return record;
      });
    });
    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id]);
      delete timerRefs.current[id];
    }
  };
  // 拖拽排序相关

  var onDragEnd = function onDragEnd(_ref) {
    var active = _ref.active,
      over = _ref.over;
    if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
      setRecords(function (prev) {
        var activeIndex = prev.findIndex(function (i) {
          return i.id === active.id;
        });
        var overIndex = prev.findIndex(function (i) {
          return i.id === (over === null || over === void 0 ? void 0 : over.id);
        });
        return (0,sortable_esm/* arrayMove */.Rp)(prev, activeIndex, overIndex);
      });
    }
  };
  var _useExportToExcel = useExportToExcel(records, stats),
    exportToExcel = _useExportToExcel.exportToExcel;

  // 计算即兴演讲可用人数
  var calculateAvailableSpeakers = function calculateAvailableSpeakers() {
    if (!tableTopicsTotal) return 0;
    // 统计records数据中即兴演讲环节的已用时间
    var tableTopicsUsed = records.filter(function (record) {
      return record.section === 'tableTopics';
    }).reduce(function (acc, cur) {
      return acc + (cur.actualMinutes || 0);
    }, 0);
    // 计算即兴演讲环节剩余时间

    console.log('tableTopicsUsed', tableTopicsUsed);
    var tableTopicsRemaining = tableTopicsTotal - tableTopicsUsed;
    return "\u5DF2\u7528\u65F6\u957F\uFF1A".concat(formatTimeInput(tableTopicsUsed), "; \n    \u5269\u4F59\u65F6\u957F\uFF1A").concat(formatTimeInput(tableTopicsRemaining), ";\n    \u5269\u4F59\u4EBA\u6570\uFF1A").concat(Math.floor(tableTopicsRemaining / 2.5));
  };

  // 修改删除函数
  var deleteRecord = function deleteRecord(id) {
    var recordToDelete = records.find(function (record) {
      return record.id === id;
    });
    if (recordToDelete) {
      // 删除记录
      setRecords(function (prev) {
        return prev.filter(function (record) {
          return record.id !== id;
        });
      });
      // 保存到删除历史
      setDeletedRecords(function (prev) {
        return [recordToDelete].concat(toConsumableArray_default()(prev)).slice(0, 50);
      }); // 只保留最近10条删除记录

      // 显示可撤销消息
      message/* default */.ZP.info( /*#__PURE__*/(0,jsx_runtime.jsxs)("span", {
        children: ["\u5DF2\u5220\u9664\u8BB0\u5F55", /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
          type: "link",
          size: "small",
          onClick: function onClick() {
            return undoDelete(recordToDelete);
          },
          style: {
            marginLeft: 8
          },
          children: "\u64A4\u9500"
        })]
      }), 3 // 3秒后自动关闭
      );
    }
  };

  // 添加撤销删除函数
  var undoDelete = function undoDelete(record) {
    // 恢复记录
    setRecords(function (prev) {
      return [].concat(toConsumableArray_default()(prev), [record]);
    });
    // 从删除历史中移除
    setDeletedRecords(function (prev) {
      return prev.filter(function (r) {
        return r.id !== record.id;
      });
    });
    message/* default */.ZP.success('已恢复删除的记录');
  };

  // 添加查看删除历史函数
  var showDeleteHistory = function showDeleteHistory() {
    modal/* default */.Z.info({
      title: '删除历史记录',
      width: 600,
      content: /*#__PURE__*/(0,jsx_runtime.jsx)(list/* default */.Z, {
        dataSource: deletedRecords,
        renderItem: function renderItem(record) {
          var _SECTIONS$find4;
          return /*#__PURE__*/(0,jsx_runtime.jsx)(list/* default */.Z.Item, {
            actions: [/*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
              type: "link",
              onClick: function onClick() {
                undoDelete(record);
                modal/* default */.Z.destroyAll();
              },
              children: "\u6062\u590D"
            })],
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(list/* default */.Z.Item.Meta, {
              title: "".concat(((_SECTIONS$find4 = SECTIONS.find(function (s) {
                return s.value === record.section;
              })) === null || _SECTIONS$find4 === void 0 ? void 0 : _SECTIONS$find4.label) || '', " - ").concat(record.roleName),
              description: "\u5220\u9664\u65F6\u95F4: ".concat(record.endTime || '未完成')
            })
          });
        },
        locale: {
          emptyText: '暂无删除记录'
        }
      }),
      okText: '关闭'
    });
  };
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    style: {
      padding: 24
    },
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(timer_Title, {
      level: 2,
      children: "\u6807\u9898"
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(StatisticsCards, {
      stats: stats,
      tableTopicsTotal: tableTopicsTotal,
      onTableTopicsTotalChange: setTableTopicsTotal,
      calculateAvailableSpeakers: calculateAvailableSpeakers
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(card/* default */.Z, {
      style: {
        marginTop: 16
      },
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(space/* default */.Z, {
        style: {
          marginBottom: 16
        },
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
          type: "primary",
          icon: /*#__PURE__*/(0,jsx_runtime.jsx)(PlusOutlined/* default */.Z, {}),
          onClick: function onClick() {
            var newRecord = generateDefaultRecord(''); // 空环节
            setRecords([].concat(toConsumableArray_default()(records), [newRecord]));
          },
          children: "\u6DFB\u52A0\u73AF\u8282"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
          icon: /*#__PURE__*/(0,jsx_runtime.jsx)(DownloadOutlined/* default */.Z, {}),
          onClick: exportToExcel,
          disabled: records.length === 0,
          children: "\u5BFC\u51FA\u6570\u636E"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(es_button/* default */.ZP, {
          icon: /*#__PURE__*/(0,jsx_runtime.jsx)(DeleteOutlined/* default */.Z, {}),
          onClick: showDeleteHistory,
          disabled: deletedRecords.length === 0,
          children: "\u5220\u9664\u5386\u53F2"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(TimerTable, {
        records: records,
        onDragEnd: onDragEnd,
        onUpdateRecord: updateRecord,
        onStartTimer: startTimer,
        onEndTimer: endTimer,
        onResetTimer: resetTimer,
        onDeleteRecord: deleteRecord,
        onUpdateStatus: updateStatus,
        onStartTimerUpdates: startTimerUpdates
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(components_TimerSummary, {
      records: records
    }), records.some(function (r) {
      return r.section === 'tableTopics' && r.elapsedTime;
    }) && /*#__PURE__*/(0,jsx_runtime.jsx)(StatisticsChart, {
      records: records,
      type: "tableTopics",
      title: "\u5373\u5174\u6F14\u8BB2"
    }), records.some(function (r) {
      return r.section === 'prepared' && r.elapsedTime;
    }) && /*#__PURE__*/(0,jsx_runtime.jsx)(StatisticsChart, {
      records: records,
      type: 'prepared',
      title: "\u5907\u7A3F\u6F14\u8BB2"
    })]
  });
};
/* harmony default export */ var timer = (ToastmastersTimer);

/***/ }),

/***/ 24863:
/***/ (function() {

/* (ignored) */

/***/ })

}]);