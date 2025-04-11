import { FormItemProps } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { JSONForm, JSONFormItemType } from "../component";
// import { JSONForm, JSONFormItemType } from "../component";

export default defineComponent({
  setup() {
  
    const formItems: JSONFormItemType[] = [
      {
        type: 'input',
        field: 'amount',
        label: '用户余额',
        initialValue: 200
      },
    ];
    
    return () => {
      return (
        <JSONForm formItems={formItems} />
      )
    };
  }
});