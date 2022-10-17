<template>
  <div class="MapView">
    <div id="viewDiv">
      <div id="el-select-theme">
        <el-select
          v-model="theme"
          placeholder="请选择"
          @change="BasemapChangeFun"
        >
          <el-option
            v-for="item in Selectoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="textareaoutbox">
      <mycpt
        :codes="'123'"
        :current="{
          a: 1,
          b: 2,
        }"
      >
      </mycpt>
      <MonacoEditor
        width="300"
        height="350"
        theme="vs-dark"
        language="javascript"
        :options="options"
        @change="onChange"
        class="monaco-edit"
      >
      </MonacoEditor>
      <el-button @click="CaptureArcgisMapFun">截图</el-button>
    </div>
  </div>
</template>
<script>
import "@arcgis/core/assets/esri/themes/light/main.css";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Bus from "./Bus";
import MonacoEditor from "monaco-editor-vue";
import html2canvas from "html2canvas";
export default {
  name: "MapView",
  components: {
    MonacoEditor,
  },
  data() {
    return {
      Selectoptions: [
        {
          value: "dark-gray-vector",
          label: "vector",
        },
        {
          value: "hybrid",
          label: "hybrid",
        },
        {
          value: "topo",
          label: "topo",
        },
        {
          value: "streets",
          label: "streets",
        },
        {
          value: "dark-gray",
          label: "dark-gray",
        },
        {
          value: "osm",
          label: "osm",
        },
        {
          value: "oceans",
          label: "海洋",
        },
      ],
      theme: "",
      mapview: "",
      /////
      code: "// Type away! \n",
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false,
        glyphMargin: true,
      },
    };
  },
  mounted() {
    this.loadArcgisMap();
  },
  beforeDestroy() {
    this.DestroyArcgisMap();
  },
  methods: {
    loadArcgisMap() {
      const map = new Map({
        basemap: {
          portalItem: {
            id: "8d91bd39e873417ea21673e0fee87604", // nova basemap
          },
        },
      });

      // center the view over 48 states
      this.mapview = new MapView({
        container: "viewDiv",
        map: map,
        center: [-100, 35],
        zoom: 2,
        constraints: {
          snapToZoom: false,
        },
      });

      this.mapview.ui.components = []; //清空所有ESRI自带的组件

      this.mapview.popup.dockEnabled = false;
      this.mapview.popup.collapseEnabled = false;
      this.mapview.popup.dockOptions = {
        buttonEnabled: false,
        breakpoint: false,
        position: "bottom-left",
      }; //禁用停靠
      this.mapview.popup.actions = null;
      this.mapview.popup = null;
      this.mapview.ui.add("el-select-theme", "top-right");
        //解决html2canvas截图空白问题
    HTMLCanvasElement.prototype.getContext = function (origFn) {
      return function (type, attributes) {
        if (type === 'webgl') {
          attributes = Object.assign({}, attributes, {
            preserveDrawingBuffer: true,
          });
        }
        return origFn.call(this, type, attributes);
      };
    }(HTMLCanvasElement.prototype.getContext);
    },
    BasemapChangeFun(val) {
      this.mapview.map.basemap = val;
    },
    DestroyArcgisMap() {
      this.mapview.destroy();
      this.mapview = null;
    },
    ArcgisMapFinishHook(code) {
      this.mapview.when(
        () => {
          try {
            //this.mapview.zoom=36
            let mapview = this.mapview;

            console.log("monaco-editor-vue");
            //  eval("(" + code + ")");
            eval(code);
          } catch (error) {}
        },
        (error) => {
          // Use the errback function to handle when the view doesn't load properly
          console.log("The view's resources failed to load: ", error);
        }
      );
    },
    /////
    onChange(value) {
      console.log("onChange", value);
      this.ArcgisMapFinishHook(value);
    },
    CaptureArcgisMapFun() {
      const element = document.getElementById("app");
      const options = {};
      html2canvas(element, options).then((canvas) => {
        const png = canvas.toDataURL("image/png"); //拿到截图后转换为png图片

        const img = document.createElement("img");
        img.setAttribute("src", png);
        window.document.body.appendChild(img); //将png图片添加到页面验证
        console.log(png);
        this.downLoadFile(`CaptureArcgisMap${Math.random()}.png`,png);
      });
    },
    downLoadFile(fileName, canvasImg) {
      //创建一个a标签
      var a = document.createElement("a");
      //指定下载文件名称
      a.href = canvasImg;
      a.download = fileName;
      //a 标签 需要点击触发。所以强制给他分派一个点击事件
      //创建一个鼠标事件
      let event = document.createEvent("MouseEvents");
      // 初始化鼠标事件
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      // 指定元素对象触发事件
      a.dispatchEvent(event);
    },
    fetchSourceData(callback) {
      return new Promise((resolve, reject) => {
        resolve((this.sourceData = this.$refs.ht.hotInstance.getSourceData()));
      });
    },
    cutExcelData() {
      this.fetchSourceData()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.MapView {
  width: 100%;
  height: 100%;
  position: relative;
  #viewDiv {
    width: 100%;
    height: 100%;
  }
  .textareaoutbox {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 30%;
    height: 360px;
  }
}
.monaco-editor {
  text-align: left;
  border: 0.5px solid var(--primary-text-color);
}
</style>