import { FormItemProps } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { JSONForm, JSONFormItemType } from "../component";
// import { JSONForm, JSONFormItemType } from "../component";

export default defineComponent({
    setup() {
        const formItems: JSONFormItemType[] = [
            {
              type: 'group',
              container: <div style={{
                border: '1px solid #ccc', padding: '10px', borderRadius: '4px', margin: '10px', width: '100%',
              }}
              />,
              children: [
                {
                  type: 'input',
                  label: '姓名',
                  field: 'name',
                },
                {
                  type: 'input',
                  label: '年龄',
                  field: 'age',
                },
                {
                  type: 'input',
                  label: '姓名1',
                  field: 'name1',
                },
                {
                  type: 'input',
                  label: '年龄1',
                  field: 'age1',
                },
                {
                  type: 'input',
                  label: '姓名2',
                  field: 'name2',
                },
                {
                  type: 'input',
                  label: '年龄2',
                  field: 'age2',
                },
              ],
            },
            {
              type: 'group',
              container: <div style={{
                border: '1px solid #ccc', padding: '10px', borderRadius: '4px', margin: '10px', width: '100%',
              }}
              />,
              children: [
                {
                  type: 'input',
                  label: '姓名1',
                  field: 'name3',
                },
                {
                  type: 'input',
                  label: '年龄1',
                  field: 'age3',
                },
              ],
            },
          ];
          return () => (
            <JSONForm formItems={formItems} columns={2} />
          );
    }
})