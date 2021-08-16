const fs = require('fs/promises')
const src = './src'

const buildHtml = (path) =>
  `<!DOCTYPE html>
 <html>
  <body>
    <script type='module'>
      import 'reset-css'
    </script>
    <script type='module' src='../sketches/${path}.ts'></script>
  </body>
</html>
`

const buildHtmlList = (list) =>
  `<!DOCTYPE html>
 <html>
  <body>
    <h2>p5 sketches</h2>
    <ul>
     ${list.reduce((acc, cur) => acc + `<li><a href='./${cur}.html'>${cur}</a></li>`, '')}
    <ul>
  </body>
</html>
`

const sketchList = () => {
  return fs.readdir(`${src}/sketches`, (err, files) => {
    if (err) throw err
    return files[0]
  })
}

const main = async () => {
  console.log('start.')

  const files = await sketchList()
  const fileNames = files.map((e) => e.split('.')[0])
  fileNames.forEach(async (e) => {
    await fs.writeFile(`${src}/htmls/${e}.html`, buildHtml(e))
  })

  console.log(fileNames)
  await fs.writeFile(`${src}/htmls/index.html`, buildHtmlList(fileNames))

  console.log('generated.')
}

main()
