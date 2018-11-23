<template lang="pug">
div.finder-box
  .finder-box-top
    .finder-box-top-left
      div.left-logo
        i(class="icon font_family icon-truelogo")
        //- img(:src="require(`~/assets/images/logo_bot.png`)")
      div
        .finder-box-top-left-title {{ $t('bugfinder.pageTitle') }}
        .finder-box-top-left-descr {{ $t('bugfinder.pageDescr') }}
    .finder-box-top-right
      .reward-item
        p.second-txt {{ $t('bugfinder.highestRewardLabel') }}
        p.primary-txt 10000 TRUE
      //- .reward-item
      //-   p.primary-txt 4 条
      //-   p.second-txt 已认领
  .finder-box-con
    .finder-box-left
      .finder-box-left-title {{ $t('bugfinder.testPlan') }}
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
      .finder-box-left-title {{ $t('bugfinder.seriousBugLabel') }}
      .finder-box-left-con
        pre.
          {{ $t('bugfinder.seriousBugText1') }}
          {{ $t('bugfinder.seriousBugText2') }}
          {{ $t('bugfinder.seriousBugText3') }}
          {{ $t('bugfinder.seriousBugText4') }}
      .finder-box-left-title {{ $t('bugfinder.highRiskBugLabel') }}
      .finder-box-left-con
        pre.
          {{ $t('bugfinder.highRiskBugText') }}

      .finder-box-left-title {{ $t('bugfinder.midRiskBugLabel') }}
      .finder-box-left-con
        pre.
          {{ $t('bugfinder.midRiskBugText') }}

      .finder-box-left-title {{ $t('bugfinder.lowRiskBugLabel') }}
      .finder-box-left-con
        pre.
          {{ $t('bugfinder.lowRiskBugText') }}

      .finder-box-left-title {{ $t('bugfinder.noticeLabel') }}
      .finder-box-left-con
        pre.
          {{ $t('bugfinder.noticeText') }}
    .finder-box-right
      .finder-box-right-title
        span {{ $t('bugfinder.rewardPlan') }}
        a.btn(href="https://dvpnet.io/company/company-info/id/99#item-three") {{ $t('bugfinder.submitBug') }}
      .finder-box-right-item
        span.dot.serious
        span.text {{ $t('bugfinder.seriousBugLabel') }}：2700 - 10000 TRUE
      .finder-box-right-item
        span.dot.high
        span.text {{ $t('bugfinder.highRiskBugLabel') }}：1300 - 2700 TRUE
      .finder-box-right-item
        span.dot.mid
        span.text {{ $t('bugfinder.midRiskBugLabel') }}：80 - 1300 TRUE
      .finder-box-right-item
        span.dot.low
        span.text {{ $t('bugfinder.lowRiskBugLabel') }}：20 - 80 TRUE

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
        .font_family
          color #1073B9
          font-size 100px
    .finder-box-top-left-title
      font-size 20px
      line-height 40px
    .finder-box-top-left-descr
      font-size 14px
      line-height 20px
      color #798d99
      max-width 700px
    .finder-box-top-right
      margin 0px 20px
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
      max-width 750px
      .finder-box-left-title
        font-size 18px
        font-weight 600
        line-height 40px
      .finder-box-left-con
        font-size 13px
        line-height 22px
        margin-bottom 25px
    .finder-box-right
      margin 0px 20px 20px
      .finder-box-right-title
        font-size 18px
        font-weight 600
        line-height 40px
        .btn
          margin 0px 15px
          padding 7px 15px
          background-color $dark-blue
          color white
          font-size 14px
          font-weight 400
      .text
        color #5e6b73
        font-size 14px
        line-height 22px
        margin-left 10px
      .finder-box-right-item
        margin 6px 0px
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
pre
  white-space pre-wrap
  white-space -moz-pre-wrap
  white-space -pre-wrap
  white-space -o-pre-wrap
  word-wrap break-word
  word-bread break-all

@media screen and (max-width 860px)
  .finder-box
    // display none
    .finder-box-top
      padding 18px 15px
      flex-direction column
      .finder-box-top-left
        flex-direction column
        .left-logo
          flex-shrink 0
          text-align center
          img
            width auto
            height auto
        .finder-box-top-left-title
          text-align center
          display none
        .finder-box-top-left-descr
          margin-top 20px
      .finder-box-top-right
        text-align center
    .finder-box-con
      padding 0px 20px
      justify-content center
      .finder-box-left
        order 2
        .finder-box-left-con
          word-break break-all
      .finder-box-right
        order 1

</style>
