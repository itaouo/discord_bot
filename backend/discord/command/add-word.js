module.exports = () => {
  return {
    name: 'add_word',
    description: '新增單字至題庫內',
    options: [
        {
        name: 'word',
        type: 3,
        description: '單字',
        required: true,
        },
    ]
  }
}