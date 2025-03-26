module.exports = slashCommand = () => {
  return {
    name: 'ai',
    description: '問 AI 一個問題',
    options: [
        {
        name: 'prompt',
        type: 3,
        description: '問題',
        required: true,
        },
    ]
  }
}