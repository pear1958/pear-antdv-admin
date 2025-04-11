import { FormItemProps } from "ant-design-vue";
import { defineComponent, ref, watch } from "vue";
// import { JSONForm, FormInstance, JSONFormItemType } from "../component";
import { FormInstance, JSONForm, JSONFormItemType, JSONObjectType } from "../component";

export default defineComponent({
    setup() {
        const formData = ref({});
        const formItems = ref<JSONFormItemType[]>();
        const form = ref<FormInstance>();
        const getFormInstance = (ins: FormInstance) => {
            form.value = ins;
        };
        
        const getFormItems = (formData: JSONObjectType) => {
            const items: JSONFormItemType[] = [
                {
                    type: 'select',
                    label: '字段1',
                    field: 'field1',
                    attrs: {
                        options: [
                            {
                                label: '字段2不可用',
                                value: 2,
                            },
                            {
                                label: '字段3消失',
                                value: 3,
                            },
                            {
                                label: '设置字段4的值为4',
                                value: 4,
                            },
                        ],
                    },
                    events: {
                        onChange(value: number) {
                            if (value === 4 && form.value) {
                                form.value.setFieldsValue({ field4: value });
                            }
                        },
                    },
                },
                {
                    type: 'input',
                    label: '字段2',
                    field: 'field2',
                    attrs: {
                        disabled: formData.field1 === 2,
                    },
                },
                {
                    type: 'input',
                    label: '字段3',
                    field: 'field3',
                    display: formData.field1 !== 3,
                },
                {
                    type: 'input',
                    label: '字段4',
                    field: 'field4',
                },
            ];
            formItems.value = items;
        }

        watch(() => formData.value, getFormItems, { deep: true, immediate: true });

        return () => (
            <JSONForm formItems={formItems.value} getFormInstance={getFormInstance} v-model={[formData.value, 'formData']} />
        );
    }
})