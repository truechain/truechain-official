<template lang="pug">
div.finder-box
  .finder-box-top
    .finder-box-top-left
      div.left-logo
        img(:src="require(`~/assets/images/logo_bot.png`)")
      div
        .finder-box-top-left-title 初链
        .finder-box-top-left-descr 初链是真正快速、安全、不受限、可扩容的Minerva混合共识公链(无需许可链)，并拥有强大的全球开发者社区。
    .finder-box-top-right
      .reward-item  
        p.primary-txt 22.00 Ether
        p.second-txt 最高奖励
      .reward-item
        p.primary-txt 4 条
        p.second-txt 已认领
  .finder-box-con
    .finder-box-left
      .finder-box-left-title 测试范围
      .finder-box-left-con
        pre.
          1. TrueChain Blockchain（GitHub 地址：https://github.com/truechain/truechain-engineering-code）
          a) General Security
          i. General design or implementation flaws
          b) Network Security
          i. Message serialization/deserialization security
          ii. network connection management security
          iii. message buffer management security
          c) Protocol Security
          Conceptual or implementation security issues in the following protocols:
          i. Minerva Hybrid Consensus Protocol Security
          ii. Block Propagation Protocol Security
          iii. Transaction Propagation Protocol Security
          iv. P2P Communication Protocol Security
          v. TVM Smart Contract Virtual Machine Security
          d) Cryptographic Primitives Security
          Incorrect implementation or usage of the following cryptographic algorithms:
          i. ECDSA
          ii. SHA3
          iii. secp256
          iv. TrueHash
          v. AES
          vi. VRF
          e) Smart Contract Virtual Machine Security
          i. TVM implementation flaws
          ii. Transaction execution
          iii. Ledger Access Control
          iv. Transaction result notification security
          f) System Smart Contract Security
          i. TrueChain management system contract security
          ii. Governance system contract security
          iii. Authentication system contract security
          2. TrueChain Client App
          a) True（https://github.com/truechain/truechain-light-wallet）
    .finder-box-right
      .finder-box-right-title 奖励计划
      .finder-box-right-item
        span.dot.serious
        span.text 严重：6.00 - 22.00 Ether
      .finder-box-right-item
        span.dot.high
        span.text 高危：3.00 - 6.00 Ether
      .finder-box-right-item
        span.dot.mid
        span.text 中危：0.20 - 3.00 Ether
      .finder-box-right-item
        span.dot.low
        span.text 低危：0.05 - 0.20 Ether
        
</template>

<script>
export default {  
  data () {
    return {
      
    }
  },
  async created () {
  },
  methods: {
    
  }
}
</script>


<style lang="stylus">
@import '~@/assets/stylus/mixin.styl'
.finder-box
  max-width 1170px
  margin 100px auto
  border 1px solid #eee
  .finder-box-top
    padding 18px 40px
    margin-bottom 20px
    background-color white
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-between
    .finder-box-top-left
      display flex
      flex-direction row
      justify-content flex-start
      word-break break-all
      .left-logo
        margin-right 30px
    .finder-box-top-left-title
      font-size 20px
      line-height 40px
    .finder-box-top-left-descr
      font-size 14px
      line-height 20px
      color #798d99
    .finder-box-top-right
      .reward-item
        display inline-block
        vertical-align top
        margin 15px 15px 0px 0px
        .primary-txt
          font-size 18px
          line-height 30px          
        .second-txt
          font-size 12px
          line-height 20px
          color #798d99
  .finder-box-con
    display flex
    flex-direction row
    flex-wrap wrap
    padding 0px 40px
    justify-content space-between 
    .finder-box-left
      margin-bottom 20px
      .finder-box-left-title
        font-size 18px
        font-weight 600
        line-height 40px
      .finder-box-left-con
        font-size 13px
        line-height 22px
    .finder-box-right
      margin 0px 20px 20px
      .finder-box-right-title
        font-size 18px
        font-weight 600
        line-height 40px
      .text
        color #5e6b73
        font-size 14px
        line-height 22px
        margin-left 10px
      .dot
        dot(12px)
      .dot.serious
        background-color #e51c23
      .dot.high
        background-color #f57618
      .dot.mid
        background-color #f7c708
      .dot.low
        background-color #0bb0a8
.p
  font-size 100px
</style>