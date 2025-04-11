// import { JSONForm, FormInstance, JSONFormItemType } from "../component";
import { FormInstance, JSONForm, JSONFormItemType } from "../component";
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { FormItemProps } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const form = ref<FormInstance>();
    const getFormInstance = (ins: FormInstance) => {
      form.value = ins;
    };
  
    onMounted(() => {
      // 使用setTimeout模拟异步
      setTimeout(() => {
        if (form.value) {
          form.value.setFieldsValue({ amount: 200 });
        }
      }, 2000);
    });
  
    const formItems: JSONFormItemType[] = [
      {
        type: 'input',
        field: 'amount',
        label: '用户余额',
      },
    ];
    
    return () => {
      return (
        <JSONForm formItems={formItems} getFormInstance={getFormInstance} />
      )
    };
  }
});