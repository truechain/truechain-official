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
        p.primary-txt 10000 TRUE
        p.second-txt 最高奖励
      //- .reward-item
      //-   p.primary-txt 4 条
      //-   p.second-txt 已认领
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
      .finder-box-left-title 严重漏洞
      .finder-box-left-con
        pre.
          直接获取业务服务器权限的漏洞以及获取重要数据的漏洞，包括但不限于任意命令执行、上传webshell、任意代码执行、SQL注入获得大量数据；
          严重影响系统业务安全的逻辑漏洞，包括但不限于任意帐号密码重置或更改漏洞，大量获取用户身份认证信息的漏洞，越权访问漏洞，未授权访问后台管理系统等；
          可通过一定手段导致公链出现分叉；
          当前阶段正在大规模爆发应引起足够重视的安全漏洞等。
      .finder-box-left-title 高危漏洞
      .finder-box-left-con
        pre.
          可通过一定手段严重影响业务运行，可能给客户带来巨大损失的，如关键业务操作可被Dos，登录接口可被撞库，业务系统可被轻易薅羊毛等；
          需要用户交互才能获取用户身份信息的漏洞，包常规存储型／反射型XSS漏洞，核心关键业务操作的CSRF漏洞等；
          任意文件读取、修改、覆盖、删除、下载；
          绕过限制修改用户个人资料、个人信息、强制用户执行某些操作；
          能够对目标系统带来危害的严重信息泄漏，敏感信息文件备份或源码泄露等（如存储密钥泄露，数据库连接密码泄露，SVN／Git帐号泄露，VPN帐号泄露等）。
          能直接造成代币合约或用户资金损失的漏洞，如：能造成代币价值归零的数值溢出漏洞、能造成交易所损失代币的假充值漏洞、能造成合约账户损失ETH或代币的重入漏洞等；
          能造成代币合约归属权丢失的漏洞，如：关键函数的访问控制缺陷、call注入导致关键函数访问控制绕过等；
          能造成代币合约无法正常工作的漏洞，如：因向恶意地址发送ETH导致的拒绝服务漏洞、因gas耗尽导致的拒绝服务漏洞。

      .finder-box-left-title 中危漏洞
      .finder-box-left-con
        pre.
          能够对目标系统的安全造成影响但无法直接证实可被利用的；
          能够获取目标网络设备权限但确定无法进一步利用的；
          非重要信息泄露、开放的URL跳转漏洞、有一定限制且确定较难利用的XSS漏洞、非核心关键业务操作的CSRF漏洞等。
          需要特定地址才能触发的高风险漏洞，如代币合约拥有者才能触发的数值溢出漏洞等；非关键函数的访问控制缺陷、不能造成直接资金损失的逻辑设计缺陷等。

      .finder-box-left-title 低危漏洞
      .finder-box-left-con
        pre.
          无法确定是否能够对目标系统的安全造成影响的，如目标系统管理端口向公网开放但无法直接利用，目标系统Banner信息可被识别，以及其他渗透测试人员认定，较难利用但可能会存在潜在安全威胁的漏洞。
          难以被触发的漏洞、触发之后危害有限的漏洞，如需要大量ETH或代币才能触发的数值溢出漏洞、触发数值溢出后攻击者无法直接获利的漏洞、通过指定高gas触发的事务顺序依赖风险等。

      .finder-box-left-title 注意事项
      .finder-box-left-con
        pre.
          • 客户端包括所有通过官方途径发布的客户端程序；
          • 提交在其他漏洞披露平台已提交的漏洞不计奖励。
          • 开放平台的第三方应用漏洞不计奖励；
          • 同一漏洞最早提交者得奖励。
    .finder-box-right
      .finder-box-right-title
        span 奖励计划
        a.btn(href="https://dvpnet.io/company/company-info/id/99#item-three") 提交漏洞
      .finder-box-right-item
        span.dot.serious
        span.text 严重：2700 - 10000 TRUE
      .finder-box-right-item
        span.dot.high
        span.text 高危：1300 - 2700 TRUE
      .finder-box-right-item
        span.dot.mid
        span.text 中危：80 - 1300 TRUE
      .finder-box-right-item
        span.dot.low
        span.text 低危：20 - 80 TRUE
        
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