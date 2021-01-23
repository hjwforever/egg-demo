# 黄俊雯 Egg.js 实践

- qq 邮箱发送邮件
- controller/tasks 中指派员工任务， 并发送邮件
- schedule/tasks 中根据任务列表， 每 24 小时发送钉钉提醒

# egg-demo

```bash
npm init egg --type=simple --registry https://registry.npm.taobao.org
npm install egg-view-nunjucks --save
```

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
npm i
npm run dev
open http://localhost:7001/
```

### Deploy

```bash
npm start
npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org
