module.exports = () => {
  return {
      name: 'unsubscribe_weather',
      description: '取消天氣預報地點',
      options: [
        {
          name: 'spot',
          type: 3,
          description: '地點',
          required: true,
        },
      ]
  }
}