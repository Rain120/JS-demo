// 异步使用场景：
// 可能发生等待的情况 ==> 定时任务：setTimeout， setInterval
//                      网络请求：ajax请求，动态img加载
//                      事件绑定
{
  console.log(100);

  setTimeout(() => {
    console.log(200);
  }, 1000);

  console.log(300);
}

{
  console.log(10);

  setTimeout(() => {
    console.log(20);
  });

  console.log(30);
}

{
  console.log(1);

  setTimeout(() => {
    console.log(2);
    setTimeout(() => {
      console.log(3);
    }, 1000);
  }, 1000);
}

// ajax请求
{
  console.log('get Start');

  $.get('../test.json', function(data) {
    console.log(data);
  })

  console.log('get End');
}
// 动态img加载
{
  console.log('img Start');

  var img = document.createElement('img');

  img.onload = function() {
    console.log('img loaded');
  }

  img.src = 'https://avatars1.githubusercontent.com/u/1961952?v=4';
  
  // document.body.appendChild(img);

  console.log('img End');
}
// 事件绑定
{
  console.log('btn Start');

  var btn = document.getElementById('btn');
  btn.addEventListener('click', function() {
    console.log('Button clicked')
  })

  console.log('btn End');
}