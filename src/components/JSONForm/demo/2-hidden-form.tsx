import { FormItemProps } from "ant-design-vue";
import { defineComponent, ref, watch } from "vue";
import { FormInstance, JSONForm, JSONFormItemType, JSONObjectType } from "../component";
// import { JSONForm, FormInstance, JSONFormItemType } from "../component";

export default defineComponent({
  setup() {
    const res = ref("");
    const form = ref<FormInstance>();
    const formItems = ref<JSONFormItemType[]>();
    const formData = ref({});
    const getFormInstance = (ins: FormInstance) => {
      form.value = ins;
    };
    const getFormItems = (formData: JSONObjectType) => {
      const items: JSONFormItemType[] = [
        {
          type: "radio",
          label: "字段控制",
          field: "control",
          attrs: {
            options: [
              {
                label: "显示字段",
                value: 0,
              },
              {
                label: "将字段1的visible属性设置为false",
                value: 1,
              },
              {
                label: "将字段1的display属性设置为false",
                value: 2,
              },
            ],
          },
        },
        {
          formItemAttrs: {},
          initialValue: 1,
          field: "field1",
          label: "字段1",
          type: "input",
          visible: formData.control !== 1,
          display: formData.control !== 2,
        },
        {
          type: "daterange",
          label: "日期范围选择",
          field: "daterange",
          startFieldName: "startDate",
          endFieldName: "endDate",
          attrs: {
            // ...
          },
          events: {
            // ...
          },
        },
      ];
      formItems.value = items;
    };
    const submit = () => {
      if (form.value) {
        form.value.validate().then((value) => {
          res.value = JSON.stringify(formData.value);
        });
      }
    };
    watch(formData, getFormItems, { deep: true, immediate: true });
    return () => {
      return (
        <div>
          <JSONForm
            formItems={formItems.value}
            getFormInstance={getFormInstance}
            v-model={[formData.value, "formData"]}
          />
          <div>提交后的表单值： {res.value}</div>
          <a-button type="primary" onClick={submit}>
            提交
          </a-button>
        </div>
      );
    };
  },
});