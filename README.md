# destinyoooo.github.io

个人 GitHub Pages 站点，用来放一些日常会用到的小工具。

## 在线访问

- 站点首页：[https://destinyoooo.github.io/](https://destinyoooo.github.io/)
- 金价换算工具：[https://destinyoooo.github.io/goldprice/](https://destinyoooo.github.io/goldprice/)

## 金价换算工具

这个工具用于在国际金价和国内金价之间做快速换算。

支持：

- 国际金价 `美元/盎司` 转国内金价 `人民币/克`
- 国内金价 `人民币/克` 转国际金价 `美元/盎司`
- 自动获取 `USD/CNY` 汇率
- 自动汇率不可用时手动输入汇率

换算依据：

```text
1 金衡盎司 = 31.1034768 克

国内金价 = 国际金价 * 美元兑人民币汇率 / 31.1034768
国际金价 = 国内金价 * 31.1034768 / 美元兑人民币汇率
```

> 说明：计算结果是理论换算值。国内品牌金价、回收价可能包含工费、税费、品牌溢价或回收折价，和理论值会有差异。

## 目录结构

```text
.
├── index.html              # 站点首页
├── goldprice/              # 金价换算工具
│   ├── index.html
│   ├── styles.css
│   ├── converter.js
│   └── app.js
└── .github/workflows/
    └── deploy-pages.yml    # GitHub Pages 自动部署
```

## 部署

本仓库通过 GitHub Actions 部署到 GitHub Pages。

推送到 `main` 分支后，会自动执行：

1. 打包当前仓库静态文件
2. 上传 Pages artifact
3. 发布到 [https://destinyoooo.github.io/](https://destinyoooo.github.io/)

## 本地预览

可以直接用浏览器打开 `index.html`，也可以启动一个静态服务：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://localhost:8080/
```
