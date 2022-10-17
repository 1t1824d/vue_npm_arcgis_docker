<template>
  <div class="MapView">
    <div id="viewDiv">
      <!-- <div id="el-select-theme">
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
      </div> -->
    </div>
    <button
      id="screenshotBtn"
      class="action-button"
      aria-label="Select screenshot area"
      title="Select screenshot area"
    >
      Select screenshot area
    </button>
    <div id="screenshotDiv" class="hide">
      <img class="js-screenshot-image" />
      <div>
        <label>Set a text to be displayed on the image: </label
        ><input type="text" placeholder="Image text" id="textInput" autofocus />
      </div>
      <button
        id="downloadBtn"
        class="Down-button"
        aria-label="Download image"
        title="Download image"
      >
        Download image
      </button>
      <button
        id="closeBtn"
        class="Close-button"
        aria-label="Back to webscene"
        title="Back to webscene"
      >
        Back to webscene
      </button>
    </div>
    <div id="maskDiv" class="hide screenshotCursor"></div>
    <!--  -->
    <div class="textareaoutbox">
      <mycpt
        :codes="'123'"
        :current="{
          a: 1,
          b: 2,
        }"
      >
      </mycpt>
      <el-button @click="CaptureArcgisMapFun">截图</el-button>
      <div class="NowTime">{{ NowDate }}</div>
    </div>
  </div>
</template>
<script>
import "@arcgis/core/assets/esri/themes/light/main.css";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import QueryTask from "@arcgis/core/tasks/QueryTask";
import Query from "@arcgis/core/rest/support/Query";
import Bus from "./Bus";
import html2canvas from "html2canvas";
export default {
  name: "MapView",
  components: {},
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
      NowDate: "",
      NowStaustimerH: null,
    };
  },
  created() {
    this.getTimeNowStausfun();
  },
  mounted() {
    this.loadArcgisMap();
  },
  beforeDestroy() {
    this.DestroyArcgisMap();
  },
  methods: {
    getTimeNowStausfun() {
      this.NowDate = this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.NowStaustimerH = setInterval(() => {
        this.NowDate = this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        console.log("清除定时器NowStaustimerH");
        window.clearInterval(this.NowStaustimerH);
        this.NowStaustimerH = null;
      });
    },
    loadArcgisMap() {
      const basemap = new Basemap({
        baseLayers: [
          new TileLayer({
            url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer",
            title: "MyBasemap",
            id: "MyBaseMap_TileLayerId",
          }),
        ],
        title: "mybasemap",
        id: "MyBaseMapId",
      });
      const map = new Map({
        basemap: basemap,
      });

      // center the view over 48 states
      this.mapview = new MapView({
        container: "viewDiv",
        map: map,
        center: [111.491328, 36.121039],
        zoom: 6,
        constraints: {
          snapToZoom: false,
          minZoom: 6,
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
      this.HandleArcgisMapCapture(); //解决html2canvas截图空白问题
      //this.mapview.ui.add("el-select-theme", "top-right");
      this.mapview.when(
        () => {
          this.OriginArcgisCaptureFun(); //Arcgis原生组件截图
          //this.QueryTaskFun();//属性查询
          this.TileLayerFun();
          this.FeatureLayerFun();
          this.MapImageLayerFun();
          this.DrawGraphicFun();
        },
        (error) => {
          console.log("The view's resources failed to load: ", error);
        }
      );
    },
    //动态图层
    MapImageLayerFun() {
      const citiesRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          size: 3,
          color: "white",
          style: "circle",
          outline: {
            width: 0.5,
            color: "gray",
          },
        },
        label: "Cities",
      };

      const statesRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          style: "none",
          outline: {
            width: 0.5,
            color: "gray",
          },
        },
        label: "State boundaries",
      };

      const highwaysRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-line", // autocasts as new SimpleLineSymbol()
          style: "none",
          width: 0.7,
          color: "white",
        },
        label: "Interstate highway",
      };
      const layer = new MapImageLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
        sublayers: [
          {
            id: 2,
            renderer: statesRenderer,
            opacity: 0.4,
          },
          {
            id: 1,
            renderer: highwaysRenderer,
            opacity: 0.8,
          },
          {
            id: 0,
            renderer: citiesRenderer,
            opacity: 0.6,
          },
        ],
      });

      this.mapview.map.add(layer);
    },
    //切片图层
    TileLayerFun() {
      let tileLayer = new TileLayer({
        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        id: "MyTileLayerId",
      });
      this.mapview.map.add(tileLayer);
    },
    //要素图层
    FeatureLayerFun() {
      let renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "picture-marker", //"picture-fill",
          url: require(`@/assets/img/f1.png`), //"https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
          width: "60px",
          height: "60px",
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.5,
            color: "white",
            style: "solid",
          },
        },
      };
      let featureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Places_of_Worship_India/FeatureServer/0",
        id: "MyFeatureLayerId",
        renderer: renderer,
      });
      this.mapview.map.add(featureLayer);
    },
    //属性查询
    QueryTaskFun() {
      let queryTask = new QueryTask({
        url: "http://www.arcgisonline.cn/server/rest/services/Hosted/XZQH/FeatureServer/0",
      });
      let query = new Query();
      //query.outSpatialReference = { wkid: 102100 };
      query.returnGeometry = false;
      query.outFields = ["*"];
      query.where = "1=1";
      queryTask.execute(query).then((results) => {
        console.log(results.features);
      });
    },
    //Arcgis原生组件截图
    OriginArcgisCaptureFun() {
      // the button that triggers area selection mode
      const screenshotBtn = document.getElementById("screenshotBtn");

      // the orange mask used to select the area
      const maskDiv = document.getElementById("maskDiv");

      // element where we display the print preview
      const screenshotDiv = document.getElementById("screenshotDiv");

      // the button that triggers download
      const downloadBtn = document.getElementById("downloadBtn");

      // the button to hide the print preview html element
      const closeBtn = document.getElementById("closeBtn");

      // replace the navigation elements with screenshot area selection button
      this.mapview.ui.empty("top-right");
      //this.mapview.ui.add(screenshotBtn, "right");

      // add an event listener to trigger the area selection mode
      screenshotBtn.addEventListener("click", () => {
        screenshotBtn.classList.add("active");
        this.mapview.container.classList.add("screenshotCursor");
        let area = null;

        // listen for drag events and compute the selected area
        const dragHandler = this.mapview.on("drag", (event) => {
          // prevent navigation in the view
          event.stopPropagation();

          // when the user starts dragging or is dragging
          if (event.action !== "end") {
            // calculate the extent of the area selected by dragging the cursor
            const xmin = clamp(
              Math.min(event.origin.x, event.x),
              0,
              this.mapview.width
            );
            const xmax = clamp(
              Math.max(event.origin.x, event.x),
              0,
              this.mapview.width
            );
            const ymin = clamp(
              Math.min(event.origin.y, event.y),
              0,
              this.mapview.height
            );
            const ymax = clamp(
              Math.max(event.origin.y, event.y),
              0,
              this.mapview.height
            );
            area = {
              x: xmin,
              y: ymin,
              width: xmax - xmin,
              height: ymax - ymin,
            };
            // set the position of the div element that marks the selected area
            setMaskPosition(area);
          }
          // when the user stops dragging
          else {
            // remove the drag event listener from the SceneView
            dragHandler.remove();
            // the screenshot of the selected area is taken
            this.mapview
              .takeScreenshot({ area: area, format: "png" })
              .then((screenshot) => {
                // display a preview of the image
                showPreview(screenshot);

                // create the image for download
                downloadBtn.onclick = () => {
                  const text = document.getElementById("textInput").value;
                  // if a text exists, then add it to the image
                  if (text) {
                    const dataUrl = getImageWithText(screenshot, text);
                    downloadImage(`OriginArcgis${Math.random()}.png`, dataUrl);
                  }
                  // otherwise download only the webscene screenshot
                  else {
                    downloadImage(
                      `OriginArcgis${Math.random()}.png`,
                      screenshot.dataUrl
                    );
                  }
                };

                // the screenshot mode is disabled
                screenshotBtn.classList.remove("active");
                this.mapview.container.classList.remove("screenshotCursor");
                setMaskPosition(null);
              });
          }
        });

        function setMaskPosition(area) {
          if (area) {
            maskDiv.classList.remove("hide");
            maskDiv.style.left = `${area.x}px`;
            maskDiv.style.top = `${area.y}px`;
            maskDiv.style.width = `${area.width}px`;
            maskDiv.style.height = `${area.height}px`;
          } else {
            maskDiv.classList.add("hide");
          }
        }

        function clamp(value, from, to) {
          return value < from ? from : value > to ? to : value;
        }
      });

      // creates an image that will be appended to the DOM
      // so that users can have a preview of what they will download
      function showPreview(screenshot) {
        screenshotDiv.classList.remove("hide");
        // add the screenshot dataUrl as the src of an image element
        const screenshotImage = document.getElementsByClassName(
          "js-screenshot-image"
        )[0];
        screenshotImage.width = screenshot.data.width;
        screenshotImage.height = screenshot.data.height;
        screenshotImage.src = screenshot.dataUrl;
      }

      // returns a new image created by adding a custom text to the webscene image
      function getImageWithText(screenshot, text) {
        const imageData = screenshot.data;

        // to add the text to the screenshot we create a new canvas element
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = imageData.height;
        canvas.width = imageData.width;

        // add the screenshot data to the canvas
        context.putImageData(imageData, 0, 0);
        context.font = "20px Arial";
        context.fillStyle = "#000";
        context.fillRect(
          0,
          imageData.height - 40,
          context.measureText(text).width + 20,
          30
        );

        // add the text from the textInput element
        context.fillStyle = "#fff";
        context.fillText(text, 10, imageData.height - 20);

        return canvas.toDataURL();
      }

      function downloadImage(filename, dataUrl) {
        // the download is handled differently in Microsoft browsers
        // because the download attribute for <a> elements is not supported
        if (!window.navigator.msSaveOrOpenBlob) {
          // in browsers that support the download attribute
          // a link is created and a programmatic click will trigger the download
          const element = document.createElement("a");
          element.setAttribute("href", dataUrl);
          element.setAttribute("download", filename);
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        } else {
          // for MS browsers convert dataUrl to Blob
          const byteString = atob(dataUrl.split(",")[1]);
          const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });

          // download file
          window.navigator.msSaveOrOpenBlob(blob, filename);
        }
      }
      // hide the print preview html element on click
      closeBtn.addEventListener("click", () => {
        screenshotDiv.classList.add("hide");
      });
    },
    HandleArcgisMapCapture() {
      //解决html2canvas截图空白问题
      HTMLCanvasElement.prototype.getContext = (function (origFn) {
        return function (type, attributes) {
          if (type === "webgl") {
            attributes = Object.assign({}, attributes, {
              preserveDrawingBuffer: true,
            });
          }
          return origFn.call(this, type, attributes);
        };
      })(HTMLCanvasElement.prototype.getContext);
    },
    DrawGraphicFun() {
      let AllPointData = [
        {
          x: 106.192907,
          y: 38.515788,
          Type: 1,
        },
        {
          x: 116.378972,
          y: 39.920912,
          Type: 2,
        },
        {
          x: 101.740761,
          y: 36.641724,
          Type: 3,
        },
        {
          x: 117.120901,
          y: 36.745439,
          Type: 4,
        },
        {
          x: 123.375982,
          y: 41.721085,
          Type: 5,
        },
        {
          x: 125.326095,
          y: 43.888275,
          Type: 6,
        },
        {
          x: 113.607017,
          y: 34.826786,
          Type: 0,
        },
        {
          x: 115.777898,
          y: 32.924032,
          Type: 1,
        },
        {
          x: 118.813452,
          y: 32.113466,
          Type: 2,
        },
        {
          x: 121.517855,
          y: 31.279766,
          Type: 3,
        },
        {
          x: 106.57925,
          y: 29.589954,
          Type: 0,
        },
        {
          x: 113.192907,
          y: 29.589954,
          Type: 0,
        },
      ];
      let graphicsLayer = new GraphicsLayer({
        id: `MyGraphicsLayer`,
      });
      AllPointData.map((ele) => {
        const point = {
          type: "point",
          longitude: ele.x,
          latitude: ele.y,
        };
        const fillSymbol = {
          type: "picture-marker", //"picture-fill",
          url: require(`@/assets/img/${
            !!ele.Type ? "fish" + ele.Type + ".gif" : "logo.png"
          }`), //"https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
          width: "106px",
          height: "106px",
          outline: {
            style: "solid",
          },
        };
        const pointGraphic = new Graphic({
          geometry: point,
          symbol: fillSymbol,
        });

        graphicsLayer.add(pointGraphic);
      });
      this.mapview.map.add(graphicsLayer);
    },
    BasemapChangeFun(val) {
      this.mapview.map.basemap = val;
    },
    DestroyArcgisMap() {
      this.mapview.map.basemap.destroy();
      this.mapview.map.layers.destroy();
      this.mapview.map.destroy();
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
        this.downLoadFile(`CaptureArcgisMap${Math.random()}.png`, png);
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
    ///////////
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

<style lang="scss" scoped>
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
    .NowTime {
      background: #0079c1;
      font-size: 28px;
      font-weight: bold;
      color: white;
      padding: 5px;
      margin-top: 10px;
    }
  }
  ////
  .action-button {
    padding: 0.6em;
    border: 1px solid #0079c1;
    text-align: center;
    background-color: white;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    &:hover {
      background: #0079c1;
      color: white;
    }
    &:focus {
      background: #0079c1;
      color: white;
    }
  }
  #screenshotDiv {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .hide {
    display: none;
  }
  #screenshotDiv > * {
    margin: 0.5em;
  }

  .screenshotCursor {
    cursor: crosshair;
  }

  #maskDiv {
    position: absolute;
    background: rgba(255, 51, 0, 0.1);
    border: 2px dashed rgb(255, 51, 0);
  }
  .Down-button {
    padding: 0.6em;
    border: 1px solid #0079c1;
    text-align: center;
    background-color: white;
    cursor: pointer;
    &:hover {
      background: #0079c1;
      color: white;
    }
    &:focus {
      background: #0079c1;
      color: white;
    }
  }
  .Close-button {
    padding: 0.6em;
    border: 1px solid #0079c1;
    text-align: center;
    background-color: white;
    cursor: pointer;
    &:hover {
      background: #0079c1;
      color: white;
    }
    &:focus {
      background: #0079c1;
      color: white;
    }
  }
}
.monaco-editor {
  text-align: left;
  border: 0.5px solid var(--primary-text-color);
}
</style>
