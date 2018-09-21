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
      .finder-box-left-title 严重漏洞
      .finder-box-left-con
        pre.
          严重的漏洞是指，发生在核心系统业务系统（核心控制系统、域控、业务分发系统、堡垒机等可管理大量系统的管控系统），
          可造成大面积影响的，获取大量（依据实际情况酌情限定）业务系统控制权限，获取核心系统管理人员权限并且可控制核心系统。
      .finder-box-left-title 高危漏洞
      .finder-box-left-con
        pre.
          •系统的权限获得（getshell、命令执行等）
          •任意⽂件读取
          • 核心后台超级管理员权限获取且造成大范围企业核心数据泄露，可造成巨大影响
          •涉及金钱的越权操作、支付逻辑绕过（需最终利用成功）
          •严重的逻辑设计缺陷和流程缺陷。包括但不仅限于批量修改任意账号密码漏洞、涉及企业核心业务的逻辑漏洞等，验证码爆破除外
          •智能合约权限控制缺陷
          包括但不限于：
          • 智能合约溢出、条件竞争漏洞
      .finder-box-left-title 中危漏洞
      .finder-box-left-con
        pre.
          •需交互方可影响用户的漏洞。包括但不仅限于一般页面的存储型 XSS，涉及核心业务的 CSRF 等
          •系统的 SQL 注入（后台漏洞降级，打包提交酌情提升）
          •普通越权操作。包括但不限于绕过限制修改用户资料、执行用户操作等
          •拒绝服务漏洞。包括但不限于导致网站应用拒绝服务等造成影响的远程拒绝服务漏洞等
          •由验证码逻辑导致任意账户登陆、任意密码找回等系统敏感操作可被爆破成功造成的漏洞
          •本地保存的敏感认证密钥信息泄露，需能做出有效利用
          •敏感信息越权访问。包括但不仅限于绕过认证直接访问管理后台、重要后台弱密码、获取大量内网敏感信息的 SSRF 等）
          •可获取任意信息的 XXE 漏洞
      .finder-box-left-title 低危漏洞
      .finder-box-left-con
        pre.
          •本地拒绝服务漏洞。包括但不仅限于客户端本地拒绝服务（解析文件格式、网络协议产生的崩溃），由 Android 组件权限暴露、普通应用权限引起的问题等
          •普通信息泄露。包括但不限于 Web 路径遍历、系统路径遍历、目录浏览等
          •反射型 XSS（包括 DOM XSS / Flash XSS）
          •普通 CSRF
          •URL 跳转漏洞
          •短信炸弹、邮件炸弹（每个系统只收一个此类型漏洞）
          •其他危害较低、不能证明危害的漏洞（如无法获取到敏感信息的 CORS 漏洞）
          •无回显的且没有深入利用成功的 SSRF
          •任意用户登录漏洞
          •大范围影响用户的其他漏洞。包括但不仅限于重要页面可自动传播的存储型 XSS、可获取管理员认证信息且成功利用的存储型 XSS 等
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
.p
  font-size 100px
</style>