<template>
  <div class="tinyMCE">
    <Editor
      v-model="content"
      :key="showKey"
      ref="editor"
      :api-key="apiKey"
      :init="editorInit"
    />
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { useAppTheme } from "@vben/hooks";
import {unref} from "vue";

const { isDark } = useAppTheme()

export default {
  name: "TinyMCE",
  components: {
    Editor,
  },
  props: ["echoData"],
  data() {
    return {
      content: "",
      apiKey: "4y9t8if1rdketjbt5m8mfjotp6zsd2uxgasaexrmdo6ny3qh",
      editorInit: {
        language: "zh_CN",
        selector: 'textarea#open-source-plugins',
        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
        editimage_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [
          { title: 'My page 1', value: 'https://www.tiny.cloud' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_list: [
          { title: 'My page 1', value: 'https://www.tiny.cloud' },
          { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Some class', value: 'class-name' }
        ],
        importcss_append: true,
        file_picker_callback: (callback, value, meta) => {
          /* Provide file and text for the link dialog */
          if (meta.filetype === 'file') {
            callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === 'image') {
            callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
          }
        },
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image table',
        skin: unref(isDark) ? 'oxide-dark' : 'oxide',
        content_css: unref(isDark) ? 'dark' : 'default',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
      },
      showKey: new Date().getTime(),
    };
  },
  watch: {
    content(newVal) {
      this.$emit("content", newVal);
    },
    echoData: {
      handler(newVal) {
        if (newVal) {
          this.content = newVal;
        } else {
          this.content = "";
          this.showKey = new Date().getTime();
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

