exports = module.exports = {
  news : {
    rule : `
          <div class="item">
            <div class="Q-tpList">
              <div class="text">
                <em>
                  <a>
          `,
    prop : false
  },
  newsImg : {
    rule : `
          <div class="item">
            <div class="Q-tpList">
              <a class="pic">
                <img class="picto">
          `,
    prop : true,
    propValue : 'src'
  }
}