import { Radio } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
import { JSONForm, JSONFormItemType, NumberRange } from "../component";
import LabelComponent from "./LabelComponent";

const radioStyle = { marginRight: "10px", marginBottom: "10px" };

export default defineComponent({
  setup() {
    const formItems: JSONFormItemType[] = [
      {
        visible: false,
        field: "id",
      },
      {
        type: "input", // 控件类型，可选值件下方API列表 （通用描述字段，后续不在赘述）
        label: <LabelComponent></LabelComponent>, // 字段中文描述（通用描述字段，后续不在赘述）
        field: "input",
        span: 24, // 如果不指定，则默认根据JSONForm组件的columns(默认为1)计算生成。 （通用描述字段，后续不在赘述）
        spanTimes: 1, // 指定占用span属性的倍数，如果不指定，则默认为1, 如果span属性和spanTimes属性同时指定，则span生效。 （通用描述字段，后续不在赘述）
        attrs: {
          // 所有的ant-design中Input的属性值均通过该API传递，如placeholder （通用描述字段，后续不在赘述）
          addonAfter: "元",
        },
        events: {
          // 所有的ant-design中的事件通过该API传递，其他类型的组件同理，如onChange （通用描述字段，后续不在赘述）
          onChange: () => null,
        },
        rules: [
          // 指定控件的规则 （通用描述字段，后续不在赘述）
          {
            required: true,
          },
          {
            max: 10,
            message: "最多输入10个字符",
          },
          {
            min: 5,
            message: "至少输入5个字符",
          },
        ],
        formItemAttrs: {
          extra: "",
        },
      },
      {
        type: "password",
        label: "密码",
        field: "password",
      },
      {
        type: "textarea",
        label: "文本域",
        field: "textarea",
        attrs: {
          showCount: true,
          maxlength: 1000,
        },
      },
      {
        type: "text",
        label: "纯文本",
        value: "Hello World",
        field: "text",
      },
      {
        type: "number",
        label: "数字输入框",
        field: "number",
      },
      {
        type: "select",
        label: "单选下拉框",
        field: "select",
        events: {
          onChange(e: string) {
            // console.log("onChange: ", e);
          },
        },
        attrs: {
          allowClear: true,
          // 指定下拉列表框的选项值，注意： 必须是形如{value: any, label: string}格式才能正常展示，
          // 如果遇到需要请求后端的时候，后端不是该格式的，需要手动转换成为该格式。
          options: (() => {
            let temp = [
              {
                value: 1,
                label: "男",
              },
              {
                value: 2,
                label:
                  "这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的 onFilter 和 sorter 函数，而是在把筛选和排序的参数发到服务端来处理。当使用 rowSelection 时，请设置 rowSelection.preserveSelectedRowKeys 属性以保留 key。",
              },
            ];
            for (let i = 0; i <= 5; i++) {
              temp = temp.concat(
                temp.map((v) => ({
                  label: Math.random().toString(32).slice(2),
                  value: Math.random(),
                }))
              );
            }
            return temp;
          })(),
        },
      },
      {
        type: "select",
        label: "多选下拉框",
        field: "mutlSelect",
        attrs: {
          mode: "multiple",
          allowClear: true,
          options: [
            {
              label: "香蕉",
              value: 1,
            },
            {
              label: "苹果",
              value: 2,
            },
          ],
        },
      },
      {
        type: "cascader",
        label: "下拉级联",
        field: "cascader",
        attrs: {
          showSearch: true,
          multiple: true,
          placeholder: "请选择下拉级联",
          options: [
            {
              label: "Little",
              value: "little",
              children: [
                {
                  label: "Toy Fish",
                  value: "fish",
                },
                {
                  label: "Toy Cards",
                  value: "cards",
                },
                {
                  label: "Toy Bird",
                  value: "bird",
                },
              ],
            },
          ],
        },
      },
      {
        type: "search",
        label: "单选搜索框",
        field: "urlSearch",
        attrs: {
          allowClear: true,
          placeholder: "输入姓氏进行搜索",
        },
        formItemAttrs: {
          extra: "自定义labelField和valueField",
        },
        url: "https://www.fastmock.site/mock/76448441b6f1caece6ebb31ae6d324f9/fixedx/user/list", // 通过url自动搜索，搜索结果将会自动注入到options当中。
        searchKey: "s", // 必填字段，否则将不会进行搜索操作。
        labelField: "name", // 如果后端接口中返回的字段列表中中文的字段名字不是label, 则可通过该API指定。
        valueField: "id", // 如果后端接口中返回的字段列表中value字段名不是value, 则可通过该API指定。
      },
      {
        type: "search",
        label: "多选搜索框",
        field: "multipleUrlSearch",
        attrs: {
          mode: "multiple",
          placeholder: "输入姓氏进行搜索",
        },
        formItemAttrs: {
          extra: "自定义labelField和valueField",
        },
        url: "https://www.fastmock.site/mock/76448441b6f1caece6ebb31ae6d324f9/fixedx/user/list", // 通过url自动搜索，搜索结果将会自动注入到options当中。
        searchKey: "s", // 必填字段，否则将不会进行搜索操作。
        labelField: "name", // 如果后端接口中返回的字段列表中中文的字段名字不是label, 则可通过该API指定。
        valueField: "id", // 如果后端接口中返回的字段列表中value字段名不是value, 则可通过该API指定。
      },
      {
        type: "search",
        label: "搜索框1",
        field: "urlSearch1",
        attrs: {
          placeholder: "输入姓氏进行搜索",
        },
        formItemAttrs: {
          extra: "使用labelField支持格式化label",
        },
        url: "https://www.fastmock.site/mock/76448441b6f1caece6ebb31ae6d324f9/fixedx/user/list", // 通过url自动搜索，搜索结果将会自动注入到options当中。
        searchKey: "s", // 必填字段，否则将不会进行搜索操作。
        labelField: "{id} - {name}", // 通过labelField字段指定格式，其中{}中的名字对应为接口数据中的字段的名字。
        valueField: "id",
      },
      {
        type: "search",
        label: "自定义搜索框",
        field: "customSearch",
        notAllowEmptySearch: false,
        attrs: {
          placeholder: "输入单个字母或数字搜索",
        },
        // 自定义搜索方法，key为搜索关键字
        search(key: string) {
          const items = [];
          for (let i = 0; i <= 100; i++) {
            const str = Math.random().toString(32).slice(2);
            // 每一个option的键值对必须是{label: string, value: any}的形式;
            items.push({
              label: str,
              value: str,
            });
          }
          // 注意： 该搜索方法必须返回一个符合条件的对象数组
          return items.filter((item) => item.value.indexOf(key) >= 0);
        },
        events: {
          onSearch() {
            // console.log("custon onSearch");
          },
        },
      },
      {
        type: "date",
        label: "日期选择",
        field: "date",
        attrs: {
          // ...
        },
        events: {
          // ...
        },
      },
      {
        type: "date",
        label: "日期时间选择",
        field: "datetime",
        attrs: {
          showTime: true,
          // ...
        },
        events: {
          // ...
        },
      },
      {
        type: "daterange",
        label: "日期范围选择",
        field: "daterange",
        attrs: {
          // ...
        },
        events: {
          // ...
        },
      },
      {
        type: "date",
        label: "月份选择",
        field: "month",
        attrs: {
          picker: "month",
          // ...
        },
        events: {
          // ...
        },
      },
      {
        type: "time",
        label: "时间选择",
        field: "time",
      },
      {
        type: "date",
        label: "周选择",
        field: "week",
        attrs: {
          picker: "week",
        },
      },
      {
        type: "date",
        label: "年选择",
        field: "year",
        attrs: {
          picker: "year",
        },
      },
      {
        type: "radio",
        label: "单选框",
        field: "radio",
        attrs: {
          options: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 2,
            },
          ],
        },
        events: {
          // ...
        },
      },
      {
        type: "checkbox",
        label: "复选框",
        field: "checkbox",
        attrs: {
          options: [
            {
              label: "苹果",
              value: 1,
            },
            {
              label: "香蕉",
              value: 2,
            },
            {
              label: "梨",
              value: 3,
            },
          ],
        },
        events: {
          // ...
        },
      },
      {
        type: "component",
        component: NumberRange, // 具体的组件
        label: "自定义组件",
        field: "component",
        params: {
          // 组件参数列表
        },
      },
    ];
    const columns = ref(1);
    const labelAlign = ref<"left" | "right" | undefined>("right");
    const layout = ref<"horizontal" | "vertical" | undefined>("horizontal");
    const labelInset = ref<boolean>(true);
    return () => {
      return (
        <div>
          <fieldset
            style={{
              border: "1px solid #efefef",
              padding: "0 20px",
              marginBottom: "20px",
            }}
          >
            <legend
              style={{ width: "auto", fontSize: "14px", margin: "0 10px" }}
            >
              属性演示
            </legend>
            <Radio.Group
              onChange={(e) => (columns.value = Number(e.target.value))}
              style={radioStyle}
              v-model={[columns.value, "value"]}
            >
              <Radio.Button value={1}>1列</Radio.Button>
              <Radio.Button value={2}>2列</Radio.Button>
              <Radio.Button value={3}>3列</Radio.Button>
              <Radio.Button value={4}>4列</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={(e) => (labelAlign.value = e.target.value)}
              style={radioStyle}
              v-model={[labelAlign.value, "value"]}
            >
              <Radio.Button value="left">文本左对齐</Radio.Button>
              <Radio.Button value="right">文本右对齐</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={(e) => (layout.value = e.target.value)}
              style={radioStyle}
              v-model={[layout.value, "value"]}
            >
              <Radio.Button value="horizontal">水平排列</Radio.Button>
              <Radio.Button value="vertical">垂直排列</Radio.Button>
            </Radio.Group>
            <Radio.Group
              onChange={(e) => (labelInset.value = e.target.value)}
              style={radioStyle}
              v-model={[labelInset.value, "value"]}
            >
              <Radio.Button value={true}>labelInset</Radio.Button>
              <Radio.Button value={false}>labelOut</Radio.Button>
            </Radio.Group>
          </fieldset>
          <JSONForm
            formItems={formItems}
            columns={columns.value}
            labelWidth={150}
            labelInset={labelInset.value}
            formAttrs={{ labelAlign: labelAlign.value, layout: layout.value }}
          />
        </div>
      );
    };
  },
});