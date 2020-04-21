var app = new Vue({
  el: "#player",
  data: {
    query: "",
    musicList: [],
    musicSrc: "",
    picSrc: "",
    hotComments: [],
    //动画播放状态
    isPlaying: false,
    //是否显示遮罩层
    mvSrc: "",
    isShow: false,
  },
  methods: {
    searchMusic: function () {
      axios
        .get("https://autumnfish.cn/search?keywords=" + this.query)
        .then((res) => {
          this.musicList = res.data.result.songs;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    playMusic: function (musicId) {
      axios
        .get("https://autumnfish.cn/song/url?id=" + musicId)
        .then((res) => {
          // console.log(musicId)
          this.musicSrc = res.data.data[0].url;
        })
        .catch((err) => {
          console.error(err);
        });

      this.getPic(musicId);

      axios
        .get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
        .then((res) => {
          // console.log(res)
          this.hotComments = res.data.hotComments;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    play: function () {
      this.isPlaying = true;
    },
    pause: function () {
      this.isPlaying = false;
    },
    playMv: function (mvid,musicId) {
      axios
        .get("https://autumnfish.cn/mv/url?id=" + mvid)
        .then((res) => {
          this.isShow = true;
          this.mvSrc = res.data.data.url;
          this.isPlaying = false;
          this.musicSrc = "";
          this.pause;
          this.getPic(musicId);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    hide: function () {
      this.isShow = false;
      this.mvSrc = "";
      this.$refs.videoRef.pause();
    },
    getPic(musicId) {
      axios
        .get("https://autumnfish.cn/song/detail?ids=" + musicId)
        .then((res) => {
          // console.log(res.data.songs[0].al.picUrl)
          this.picSrc = res.data.songs[0].al.picUrl;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
