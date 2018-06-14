<template lang="pug">
  .jd-container
    .jd-head
      .jd-head-title {{ $t('join.title') }}
      .jd-head-subhead Go语言开发工程师
      .jd-head-detail
        div
          div 工作职责：
          div
            ul
              li(
                v-for="(item, index) in currentJob.duty"
              ) {{index + 1 +  '、' + item}}
        div
          div 职位要求：
          div
            ul
              li(
                v-for="(item, index) in currentJob.duty"
              ) {{index + 1 +  '、' + item}}
      .jd-head-mail 简历投递邮箱: hr@truechain.pro
</template>

<script>
export default {
  data() {
    return {
      currentJob: {},
      jobArr: [
        {
          duty: [
            '使用Go语言设计并开发初链区块链的产品。',
            '参与区块链平台的软件架构设计，研究区块链基础设施的关键技术。',
            '负责区块链核心层（交易、消息、虚拟机EVM）相关的开发。',
            '与产品/设计/前端开发/测试团队紧密合作，按时保质交付区块链开发任务；',
            '其它上级领导安排的工作',
          ],
          require: [
            '有2年以上的项目开发经验;',
            '熟悉golang语言编程，掌握多线程；',
            '具有高负载、高并发开发设计经验值者优先考虑；',
            '拥有扎实的计算机编程能力，尤其在数据结构、算法和代码、软件设计方面有较好的功底；',
            '熟悉 fabric 或者以太坊开发的优先。',
          ]
        },
        {
          duty: [
            '啊啊啊啊啊啊啊啊啊啊啊',
            '参与区块链平台的软件架构设计，研究区块链基础设施的关键技术。',
            '负责区块链核心层（交易、消息、虚拟机EVM）相关的开发。',
            '与产品/设计/前端开发/测试团队紧密合作，按时保质交付区块链开发任务；',
            '其它上级领导安排的工作',
          ],
          require: [
            '有2年以上的项目开发经验;',
            '熟悉golang语言编程，掌握多线程；',
            '具有高负载、高并发开发设计经验值者优先考虑；',
            '拥有扎实的计算机编程能力，尤其在数据结构、算法和代码、软件设计方面有较好的功底；',
            '熟悉 fabric 或者以太坊开发的优先。',
          ]
        },
        {
          duty: [
            '的点点滴滴多多多多多多多多',
            '参与区块链平台的软件架构设计，研究区块链基础设施的关键技术。',
            '负责区块链核心层（交易、消息、虚拟机EVM）相关的开发。',
            '与产品/设计/前端开发/测试团队紧密合作，按时保质交付区块链开发任务；',
            '其它上级领导安排的工作',
          ],
          require: [
            '有2年以上的项目开发经验;',
            '熟悉golang语言编程，掌握多线程；',
            '具有高负载、高并发开发设计经验值者优先考虑；',
            '拥有扎实的计算机编程能力，尤其在数据结构、算法和代码、软件设计方面有较好的功底；',
            '熟悉 fabric 或者以太坊开发的优先。',
          ]
        },
        {
          duty: [
            '啛啛喳喳错错错错错错错错',
            '参与区块链平台的软件架构设计，研究区块链基础设施的关键技术。',
            '负责区块链核心层（交易、消息、虚拟机EVM）相关的开发。',
            '与产品/设计/前端开发/测试团队紧密合作，按时保质交付区块链开发任务；',
            '其它上级领导安排的工作',
          ],
          require: [
            '有2年以上的项目开发经验;',
            '熟悉golang语言编程，掌握多线程；',
            '具有高负载、高并发开发设计经验值者优先考虑；',
            '拥有扎实的计算机编程能力，尤其在数据结构、算法和代码、软件设计方面有较好的功底；',
            '熟悉 fabric 或者以太坊开发的优先。',
          ]
        },
        {
          duty: [
            '吧吧吧吧吧吧吧吧吧吧吧吧v吾问无为谓',
            '参与区块链平台的软件架构设计，研究区块链基础设施的关键技术。',
            '负责区块链核心层（交易、消息、虚拟机EVM）相关的开发。',
            '与产品/设计/前端开发/测试团队紧密合作，按时保质交付区块链开发任务；',
            '其它上级领导安排的工作',
          ],
          require: [
            '有2年以上的项目开发经验;',
            '熟悉golang语言编程，掌握多线程；',
            '具有高负载、高并发开发设计经验值者优先考虑；',
            '拥有扎实的计算机编程能力，尤其在数据结构、算法和代码、软件设计方面有较好的功底；',
            '熟悉 fabric 或者以太坊开发的优先。',
          ]
        },
        {
          duty: [
            '柔柔弱弱若若若若若若若若若若若若',
            '参与区块链平台的软件架构设计，研究区块链基础设施的关键技术。',
            '负责区块链核心层（交易、消息、虚拟机EVM）相关的开发。',
            '与产品/设计/前端开发/测试团队紧密合作，按时保质交付区块链开发任务；',
            '其它上级领导安排的工作',
          ],
          require: [
            '有2年以上的项目开发经验;',
            '熟悉golang语言编程，掌握多线程；',
            '具有高负载、高并发开发设计经验值者优先考虑；',
            '拥有扎实的计算机编程能力，尤其在数据结构、算法和代码、软件设计方面有较好的功底；',
            '熟悉 fabric 或者以太坊开发的优先。',
          ]
        },
        {
          duty: [
            '吞吞吐吐拖拖拖拖拖拖拖拖拖拖拖拖',
            '参与区块链平台的软件架构设计，研究区块链基础设施的关键技术。',
            '负责区块链核心层（交易、消息、虚拟机EVM）相关的开发。',
            '与产品/设计/前端开发/测试团队紧密合作，按时保质交付区块链开发任务；',
            '其它上级领导安排的工作',
          ],
          require: [
            '有2年以上的项目开发经验;',
            '熟悉golang语言编程，掌握多线程；',
            '具有高负载、高并发开发设计经验值者优先考虑；',
            '拥有扎实的计算机编程能力，尤其在数据结构、算法和代码、软件设计方面有较好的功底；',
            '熟悉 fabric 或者以太坊开发的优先。',
          ]
        },
      ]
    }
  },
  created () {
    this.currentJob = this.jobArr[this.$route.params.id] || {};
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
  /* 覆盖分页样式 */
.jd-head
  display flex
  flex-direction column
  margin 0 auto
  width 750px
  // background red
  padding-top 50px
  padding-bottom 25px
  position relative
.jd-head-title
  color $font-dark
  text-align center
  font-size 26px
  font-weight bold
  position relative
  padding-bottom 30px
  &:after
    content ''
    width 60px
    height 2px
    background rgba(30,100,180,1)
    position absolute
    left 50%
    bottom 0
    transform translate(-50%, -50%)
.jd-head-subhead
  // background red
  color $font-dark
  margin-top 15px
  font-weight bold
  line-height 50px
  font-size 22px
.jd-head-detail
  margin-top 10px
  color #456C99
  line-height 30px
  font-size 14px
  div
    div
      color #456C99
    ul
      li
        color #456C99
.jd-head-mail
  color #456C99
  // background red
  padding-top 20px
  padding-bottom 30px
  font-weight bold
</style>
