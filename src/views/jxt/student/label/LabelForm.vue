<template>
  <PageWrapper
    title="新增/编辑学员标签信息"
    contentBackground
    content="新增/编辑学员标签信息"
    contentClass="p-4"
    @back="goback"
  >
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, ref } from 'vue';
  import { schemas } from './label.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { addLabelInfo, updateLabelInfo, detailLabelInfo } from '/@/api/jxt/student';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'FormBasicPage',
    components: { BasicForm, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const go = useGo();
      const route = useRoute();
      const id = ref(route.params?.id);
      const [register, { validate, setProps, setFieldsValue }] = useForm({
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 15,
        },
        schemas: schemas,
        actionColOptions: {
          offset: 8,
          span: 23,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          const values = await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          if (id.value && id.value !== 'undefined') {
            Object.assign(values, { id: id.value as string });
            await updateLabelInfo(values);
          } else {
            await addLabelInfo(values);
          }
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          createMessage.success('提交成功!');
          go('/student/label');
        } catch (error) {}
      }

      function goback() {
        go('/student/label');
      }

      async function getDetail(id) {
        if (id.value && id.value !== 'undefined') {
          const details = await detailLabelInfo({ id: id.value as string });
          setFieldsValue({
            ...details,
          });
        }
      }

      getDetail(id);

      return { register, goback };
    },
  });
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
    background-color: @component-background;
  }
</style>
