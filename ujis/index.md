---
title: Ujis
layout: uji
nav:
  order: 4
  tooltip: Learn more about the Ujis
---

<div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
      <a href="1echan"><li class="glide__slide"><img src="images/1EthanChan.png"></li></a>
      <a href="2ndang"><li class="glide__slide"><img src="images/2NicholasDang.png"></li></a>
      <a href="3sdupiano"><li class="glide__slide"><img src="images/3SeanDupiano.png"></li></a>
      <a href="4khoang"><li class="glide__slide"><img src="images/4KentHoang.png"></li></a>
      <a href="5anguyen"><li class="glide__slide"><img src="images/5AlexNguyen.png"></li></a>
      <a href="7tnguyen"><li class="glide__slide"><img src="images/7TraceNguyen.png"></li></a>
      <a href="8wnguyen"><li class="glide__slide"><img src="images/8WesleyNguyen.png"></li></a>
      <a href="9tsison"><li class="glide__slide"><img src="images/9TagSison.png"></li></a>
      <a href="10jta"><li class="glide__slide"><img src="images/10JerryTa.png"></li></a>
      <a href="11ktruong"><li class="glide__slide"><img src="images/11KennyT.png"></li></a>
      <a href="12kvo"><li class="glide__slide"><img src="images/12KennyVo.png"></li></a>
    </ul>
  </div>
  <div data-glide-el="controls">
  <button data-glide-dir="<<">Start</button>
  <button data-glide-dir=">>">End</button>
</div>

  <div class="glide__arrows" data-glide-el="controls">
    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
  </div>
</div>

<script>
    const config = {
        type: 'carousel',
        perView: 3
    }
  new Glide('.glide', config).mount()
</script>