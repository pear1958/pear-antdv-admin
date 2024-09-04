async function test() {
  await Promise.resolve(25)
  return true
}

const res = test()

res.then(aa => {
  console.log(888)
  console.log(aa)
})

console.log('res', res)